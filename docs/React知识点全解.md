# React 高级前端面试全解（P0–P3 共 98 题）

> 面向高级前端 / 前端负责人面试。每题给出核心结论 + 关键原理 + 代码示例，回答时结合项目经验即可构建亮点。

---

## React 渲染流程（Fiber 工作循环）

React 的一次完整渲染可拆分为 5 个阶段，类组件/函数组件的生命周期钩子就分布在这些阶段中。

**1. 触发渲染**

以下任一情况都会触发一次渲染：

- 首次挂载（`createRoot` / `ReactDOM.render`）
- `setState`
- `useState` 的 setter
- 父组件重渲染（导致子组件重渲染）
- `Context` 值变化
- `useReducer` 的 `dispatch`
- `useSyncExternalStore` 检测到外部 store 变化
- `useTransition` / `useDeferredValue`（内部本质也是 setState，只是标记为低优先级）
- `Suspense` 的 Promise resolve（子组件从 fallback 切换到内容）

**2. 调度阶段（Scheduler）**

为任务分配优先级（lane 模型），按优先级排序后出队。高优先级任务可以插队，低优先级任务会被推迟。

**3. render 阶段（可中断）**

此阶段在内存中进行，可被高优先级任务打断，是 React 时间切片（Time Slicing）的基础。

- 调用组件函数（执行 `render`），得到新的 **Fiber 树**（俗称的"虚拟 DOM"）
- 执行 reconciliation（Diff 算法）：reconciliation 是 render 阶段的核心算法，负责对比新旧 Fiber，计算出需要做的 DOM 操作
  - 对比新旧 Fiber 节点
  - 复用 / 生成新的 Fiber 树，在 Fiber 节点上标记 **flags**（`Placement` / `Update` / `Deletion` / `ChildDeletion` 等）
  - 通过 `subtreeFlags` 聚合子树是否有副作用，便于后续跳过无副作用的子树
- 此阶段可被高优先级任务打断：因为有 `workInProgress` 树托底，中断后可从断点继续；但如果**优先级发生变化**，未完成的工作会被丢弃并从 root 重新调度（render 阶段的工作是纯计算、无副作用，因此可以安全丢弃）

**4. commit 阶段（同步，不可中断）**

为什么不可中断？——DOM 写操作是真实世界的副作用，一旦中断会导致界面状态不一致（部分节点已更新、部分未更新）。

- commit 阶段的入口函数是 `commitRoot`。**React 18 起不再使用 effect list**，而是遍历整棵 Fiber 树，通过节点的 `flags` / `subtreeFlags` 判断该节点（及其子树）是否有副作用需要处理，没有副作用的子树会被跳过
- commit 阶段会一次性、不可中断地把所有变更应用到真实 DOM 上
- 内部又分为三个子阶段（Before Mutation → Mutation → Layout），每个子阶段都会遍历一次 Fiber 树，但整体是同步的：
  - **Before Mutation**：读取 DOM 快照（如 class 组件的 `getSnapshotBeforeUpdate`）
  - **Mutation**：执行 DOM 操作（增 / 删 / 改），并 **detach ref**（解绑旧 ref）
  - **Layout**：`useLayoutEffect` 同步执行（对应 class 组件的 `componentDidMount` / `componentDidUpdate`），并 **attach ref**（绑定新 ref）

**5. 被动副作用执行（Passive Effects）**

- useEffect 的**调度**在 commit 阶段完成后才发起（scheduleCallback，经 scheduler 以宏任务排队），**真正执行**发生在浏览器 Paint 之后（异步）
- 在下一次渲染的 `useEffect` 回调执行之前，会先执行上一次的清理函数（清除订阅、定时器等），再执行本次 `useEffect` 回调（两者都在 paint 之后异步执行，只是顺序上清理函数先于本次回调）；组件卸载时也会执行清理函数

> 副作用主要指 `useEffect`、类组件的 `componentDidMount` / `componentDidUpdate` 等。
>
> - `useEffect` 在 commit 阶段完成后异步延迟执行，不阻塞浏览器绘制
> - `useLayoutEffect` 在 commit 阶段的 Layout 子阶段同步执行，会阻塞绘制

---

## Fiber 架构是什么？

### 一句话回答

Fiber 是 React 16 引入的新一代协调器（Reconciler）。它的核心目的是把过去不可中断的递归同步渲染，改造为可中断、可恢复、分时间片执行的渲染流程，从而让浏览器能在渲染间隙处理高优先级任务（如用户输入、动画），避免长任务阻塞主线程导致的卡顿和掉帧。严格说，Fiber 是协调器（Reconciler）的重新实现，而不是"协调算法"。Diff 策略（同层比较 + type + key）从 React 15 到 16 基本没变，变的是执行架构。

本质是把同步递归渲染改成异步可中断的渲染。

**它解决的核心问题是：大组件渲染时同步阻塞主线程，导致掉帧和交互卡顿。**

**实现上有三个关键点：**

1. **数据结构**——把虚拟 DOM 改成链表 Fiber 节点，用 `child、sibling、return` 三指针连接，能随时中断和恢复。
2. **时间切片**——引入 Scheduler 调度器，每 5ms 检查一次是否需要让出主线程，用 MessageChannel 继续调度，避免阻塞渲染。
3. **优先级**——Scheduler 层区分 Immediate、UserBlocking、Normal、Low、Idle 五级；这五级在 React 内部会映射到更细粒度的 **Lane 模型**（31 条 lane 位）来做批次调度，用户输入等高优先级任务可以打断低优先级渲染。

**整个流程分两阶段：Render 阶段做 diff、打 flags 标记（可中断）；Commit 阶段一次性操作 DOM（不可中断）。通过 current 与 workInProgress 双缓冲切换指针，零成本切换 UI。**

**这也是 React 18 并发特性的基础。**

# P0 核心 10 个

## P0-1. React 组件渲染流程是什么？

**核心结论**：React 渲染 = 触发渲染 → Render 阶段（生成/对比虚拟 DOM，构建 Fiber 树）→ Commit 阶段（把变更同步到真实 DOM）→ 执行 layout / passive effect。

**详细流程**：
1. **触发（Trigger）**：setState / props 变化 / context 变化 / forceUpdate 触发一次渲染。
2. **Render 阶段（可中断）**：从根节点或触发的 Fiber 开始，递归调用组件的 Render（函数组件执行函数体 / 类组件执行 render），生成新的 React 元素树，并与旧的 Fiber 树做 Diff（Reconciliation），标记出需要增删改的节点（在 Fiber 上打 `flags`；React 16/17 会串成 **effect list**，React 18 起改用 `flags` / `subtreeFlags` 遍历，不再维护 effect list）。该阶段是纯计算、无副作用、可被中断。
3. **Commit 阶段（不可中断）**：同步执行 DOM 操作（插入、更新、删除），然后同步执行 `useLayoutEffect`，最后 `useEffect` 在浏览器 paint 之后异步执行（由 Scheduler 调度，非微任务）。
4. **浏览器绘制**：Commit 完成后浏览器才真正绘制。

```
state/props 变化
      ↓
  Render Phase (reconcile, 可中断)
      ↓
  Commit Phase (DOM 变更, 不可中断)
      ↓
  useLayoutEffect → 浏览器 paint → useEffect
```

> 面试亮点：对比 Vue3 的渲染管线（依赖收集 → 组件级 effect 调度 → patch），React 是整树（或 Fiber 子树）重新 render + Diff，靠 Fiber 的可中断性解决长任务卡顿。

---

## P0-2. state 和 props 的区别？

| 维度 | state | props |
|------|-------|-------|
| 拥有者 | 组件自己管理（内部可变） | 父组件传入（外部只读） |
| 可变性 | 通过 setState / useState 更新 | 子组件**不能直接修改** |
| 用途 | 组件自身的、随时间变化的数据 | 父 → 子的数据传递、配置 |
| 数据流 | 单向：state → props → 子组件 | 父传子，子通过回调改父 state |

核心原则：**props 是只读的（Top-Down 单向数据流）**。组件像函数，props 是参数，state 是函数内部变量。

```jsx
function Child({ name }) {        // props.name 只读
  const [count, set] = useState(0); // state 内部可变
  return <button onClick={() => set(count + 1)}>{name}: {count}</button>;
}
```

---

## P0-3. 为什么不能直接修改 state？

**核心结论**：直接改 `state.x = 1` 不会触发 re-render，且会破坏不可变性（immutability），导致 React 的 Diff / 引用比较失效、并发模式下的状态追踪出错。

**原因**：
1. **不触发渲染**：React 通过 `setState` 这个“通知函数”才知道要重新渲染；直接赋值绕过了通知。
2. **破坏浅比较**：`React.memo`、依赖数组、Diff 都靠引用变化判断。直接改对象属性，引用没变 → memo 失效、组件不更新。
3. **并发模式隐患**：React 18 会保留旧状态的快照做并发渲染，可变 state 会让快照与当前值混淆，产生难以排查的 bug。
4. **难以调试与回滚**：可变 state 没有"旧值→新值"的清晰转移记录，难以可靠回滚；也无法依赖不可变性做优化判断（时间旅行 / 状态回溯依赖"状态不可变"约定——如 Redux 的 reducer 必须返回新对象，才能形成可追溯的 state 快照序列）。

```jsx
// ❌ 错误：直接修改
this.state.count = 1;        // 类组件
list.push(item);             // 函数组件（list 由 useState 解构得到）

// ✅ 正确：返回新引用
this.setState({ count: 1 });
setList([...list, item]);    // 或 setState(prev => [...prev, item])
```

---

## P0-4. setState / useState 是同步还是异步？为什么马上读可能不是最新？

**核心结论**：**setState 看起来是"异步"的，本质是批处理（batching）——React 会把同一轮里的多次更新合并成一次渲染**。React 18 起所有场景都默认批处理；React 17 及之前只有合成事件和生命周期内批处理，setTimeout / 原生事件 / Promise.then 中是同步执行的。

**为什么马上读不是最新**：
- setState 只是把更新“入队（enqueue）”，不是立刻改 state 变量。
- React 会在合适的时机**合并多次更新、批量 flush**，然后才重新执行组件函数，生成新的 state。
- 所以在 `setState` 之后的同一函数作用域内，`state` 变量仍是旧值（闭包捕获的是渲染时的旧 state）。

```jsx
// 事件处理函数内：批量、异步
function handle() {
  setCount(count + 1);
  setCount(count + 1);
  console.log(count); // 旧值，两次 setCount 被批处理，结果 +1 而非 +2
  // 想要 +2 用函数式更新：
  setCount(c => c + 1); setCount(c => c + 1); // 结果 +2
}

// setTimeout 内：React 18 仍批处理；17 及之前是同步
setTimeout(() => { setCount(c => c + 1); console.log(count); }, 0);
```

**批处理（batching）**：React 18 把 setTimeout / Promise / 原生事件里的多次 setState 也合并为一次渲染（自动批处理）。需要强制同步刷新用 `flushSync`。

**进阶：setState 的更新队列与合并规则**（高级岗追问）：
- 每次 `setState` 会生成一个 `update` 对象，挂到该 hook 的 `updateQueue` 上（环状链表）。React 在下次渲染时遍历这条队列算出最终 state。
- 合并规则基于 **`Object.is`**：`setState(value)` 这类"直接赋值"按入队顺序后者覆盖前者；`setState(prev => next)` 函数式更新会**串起来**——前一个的返回值作为后一个的 `prev`。
- **eagerState 优化（bail-out）**：若在事件处理函数内、且队列里只有这一个 update，React 会**提前用 `Object.is` 比较新旧 state**，相等则直接跳过这次渲染（这就是"setState 相同值不触发渲染"的底层原因）。但该优化仅在"无并发、无其他待处理更新"时才触发，不能依赖它做性能保障，显式 `memo` 仍需要。

这也解释了上面为什么连续 `setCount(count + 1)` 只 +1：两次入队的更新都基于同一渲染快照的旧 `count` 算出同一个值（都是旧值 +1），渲染时遍历队列最终就得到该值；而 `setCount(c => c + 1)` 把两次更新串起来——前一次的返回值作为后一次的入参，才 +2。

---

## P0-5. React 事件机制和原生 DOM 事件有什么区别？如何阻止冒泡和默认行为？

**区别**：
1. **合成事件（SyntheticEvent）**：React 把原生事件封装成跨浏览器统一的合成事件对象，挂载在 **root 容器** 上（事件委托），而非每个节点。
2. **绑定位置**：React 17+ 委托到 root（`ReactDOM.createRoot` 的容器）；17 之前委托到 `document`。
3. **事件名**：驼峰命名 `onClick`，原生全小写 `onclick`。
4. **this 绑定**：类组件需手动绑定 `this`（或箭头函数 / 类字段）。
5. **阻止行为 API 一致**：`e.stopPropagation()`、`e.preventDefault()`。React 17+ 合成事件的 `stopPropagation` 会调用原生 event 的同名方法。**触发顺序**（常见陷阱）：React 把事件委托在 **root 容器**，原生事件冒泡路径是 `target → root → document`，所以 **React 合成事件先触发，document 上的原生监听后触发**；若在合成事件里调用 `e.stopPropagation()`，会阻止事件继续冒泡到 document，从而让 document 上的原生监听不再触发。

```jsx
function handle(e) {
  e.preventDefault();      // 阻止默认行为（如表单提交刷新）
  e.stopPropagation();     // 阻止 React 合成事件冒泡
}
```

**注意**：React 17 前事件委托在 `document`，17 起改为 root 容器——这是常见面试陷阱。混用原生监听与 React 事件时，务必先想清楚冒泡路径与 `stopPropagation` 的作用边界。

---

## P0-6. 什么是受控组件和非受控组件？value 和 defaultValue 的区别？

**受控组件（Controlled）**：表单值由 React state 驱动，value 来自 state，`onChange` 同步更新 state。单一数据源、完全可控。

```jsx
const [val, setVal] = useState('');
<input value={val} onChange={e => setVal(e.target.value)} />
```

**非受控组件（Uncontrolled）**：值由 DOM 自己维护，用 `ref` 读取。使用 `defaultValue` / `defaultChecked`。

```jsx
const ref = useRef();
<input defaultValue="初始值" ref={ref} />
// 读取：ref.current.value
```

| | value | defaultValue |
|---|---|---|
| 含义 | 受控当前值（必须配合 onChange） | 非受控初始值（只设一次） |
| 后续变更 | 由 state 决定，不读 DOM | DOM 内部维护，state 不参与 |

**选用原则**：表单需要实时校验、联动、提交时统一收集 → 受控；一次性读取（如上传组件、性能敏感的大表单）→ 非受控 + ref。混合场景：受控为主，个别字段非受控。

---

## P0-7. key 的作用是什么？为什么不推荐用数组下标？

**作用**：`key` 是 React 在 Diff 列表时**识别元素身份**的稳定标识，用于判断“是同一个节点（更新）还是新节点（插入/删除）”。

**为什么不用 index**：
- index 会随元素增删而改变。例如列表 `[A,B,C]` 删除 B 变成 `[A,C]`，index 视角下 `index=1` 从 B 变成 C，React 误以为“C 替换了 B”，导致错误复用、状态错乱、性能下降、动画/输入 bug。
- index 仅在**列表静态、永不重排、无状态**时才可接受。

```jsx
// ✅ 用稳定唯一 id
{list.map(item => <li key={item.id}>{item.name}</li>)}

// ❌ 危险
{list.map((item, i) => <li key={i}>{item.name}</li>)}
```

---

## P0-8. React 为什么需要虚拟 DOM？diff 算法大致怎么工作？

**为什么需要 VDOM**：
- 真实 DOM 操作昂贵（重排重绘）。VDOM 是 JS 对象，diff 在内存中完成，只把最小变更同步到真实 DOM（**批量 + 最小化 DOM 操作**）。
- 提供声明式编程模型：开发者写“UI 应该是什么样”，React 自己算差异。
- 跨平台（React Native 复用同样的协调逻辑，只是 target 不同）。

**Diff 算法核心（O(n) 启发式）**：
1. **同类型才复用**：新旧节点 type 不同 → 整棵卸载重建；相同 → 复用实例，只更新属性。
2. **列表用 key**：见 P0-7，按 key 复用，避免 index 错位。
3. **分层比较（树 diff）**：只比较同级节点，不跨层移动（跨层移动视为删除+新增）。
4. **属性 diff**：同节点比较 props，生成属性补丁。
5. **单向遍历 + lastPlacedIndex 定位移动**（React 用「按 key 建映射」+ 单向遍历，在 `reconcileChildren` 中通过 `lastPlacedIndex` 判断节点是否需要移动；注意 React 不做 Vue 那样的双端对比）。

**单节点 diff vs 多节点 diff**：
- **单节点**：新节点只有一个，比较 type 和 key，匹配则复用（打 Update），不匹配则新建并删除旧的。
- **多节点**（列表）diff 分两轮遍历：
  1. **第一轮**：从左到右逐个对比新旧，key 相同则复用更新；遇到 key 不匹配立即停止。若第一轮走完时**新节点已耗尽**（旧节点还有剩余），直接把剩余旧节点标记删除。
  2. **第二轮**：处理第一轮未消费的部分——把旧节点剩余项按 key 建成 Map，遍历新节点剩余项：能在 Map 找到则复用并删除映射，**找不到则新建（标记 Placement 插入）**；若**旧节点先耗尽而新节点仍有剩余**，这部分剩余新节点同样标记 Placement 插入。最后 Map 里没被消费的旧节点全部删除。
  3. **移动判断**：复用节点时维护 `lastPlacedIndex`（上次复用节点在旧列表中的最大下标），若当前节点的旧下标 `< lastPlacedIndex` 说明它需要移动，否则更新 `lastPlacedIndex`。

> 面试亮点：Vue3 用双端 Diff + 最长递增子序列优化移动；React 用 key + lastPlacedIndex 单向遍历，思路不同但都基于“同层、同类型、key 复用”的启发式假设。

---

## P0-9. 函数组件和类组件的区别？

| 维度 | 函数组件 | 类组件 |
|------|---------|--------|
| 写法 | `function C() {}` + Hooks | `class C extends React.Component` |
| this | 无 this，靠闭包 | 用 this.state / this.props |
| 状态 | useState / useReducer | this.state + setState |
| 生命周期 | useEffect 等 Hooks 模拟 | componentDidMount 等 |
| 性能 | 无实例，开销小 | 有实例开销（this、生命周期绑定），实例仅在挂载时创建一次 |
| 逻辑复用 | 自定义 Hook（推荐） | HOC / Render Props |
| 存在感 | React 18+ 主流 | 官方仍支持，新代码用函数组件 |

**关键差异**：
- 函数组件每次渲染都执行，捕获的是**当次渲染的 props/state 快照**（闭包），天然避免 this 指向问题。
- 类组件的 `this.state` 在异步回调里可能是旧值（需 `setState(fn)` 或读取 `this.props`）。
- 官方推荐函数组件 + Hooks；类组件在旧代码库仍存在。
- 类组件独有：`componentDidCatch` / `getDerivedStateFromError`（Error Boundary 至今只能用类组件实现，React 未提供函数组件的等价 API；`use` hook 与错误边界无关，不要混淆）。

---

## P0-10. useEffect 的执行时机、依赖数组、cleanup、如何避免死循环？

**执行时机**：在浏览器绘制**之后**异步执行（passive effect），不会阻塞 paint。

**依赖数组**：
- `useEffect(fn)`：每次渲染后都执行。
- `useEffect(fn, [])`：仅挂载后执行一次（类似 componentDidMount）。
- `useEffect(fn, [a, b])`：a/b 变化时才执行。

**cleanup**：返回的函数在**下次 effect 执行前**和**组件卸载时**调用，用于清除订阅、定时器、取消请求。

```jsx
useEffect(() => {
  const id = setInterval(() => {}, 1000);
  return () => clearInterval(id); // cleanup
}, []);
```

**死循环常见原因与避免**：
1. **依赖里放了每次渲染都新建的对象/数组/函数** → 引用总变 → effect 反复跑。解决：用 `useMemo`/`useCallback` 稳定引用，或只依赖基本类型。
2. **effect 内 setState 且没有正确依赖约束** → 触发渲染 → effect 再跑。解决：确保 setState 的值来自稳定依赖，或用函数式更新。
3. **把对象拆成原语依赖**：`useEffect(fn, [obj.id])` 而非 `[obj]`。
4. **无限轮询接口**：用 `AbortController` + cleanup 取消。

```jsx
// ❌ 死循环：obj 每次渲染都是新引用
const obj = { a: 1 };
useEffect(() => {...}, [obj]);

// ✅ 方案 A：用 useMemo 稳定引用
const obj = useMemo(() => ({ a: 1 }), []);
useEffect(() => {...}, [obj]);
// ✅ 方案 B：只依赖其中的基本类型字段
useEffect(() => {...}, [somePrimitive]);
```

---

# P0 扩展高频 13 个

## P0-扩展-1. React 组件如何通信？

1. **父 → 子**：props 传值。
2. **子 → 父**：props 传回调函数。
3. **兄弟**：提升状态到共同父组件（状态提升）。
4. **跨层级（远亲）**：Context / 状态管理（Redux/Zustand）。
5. **命令式调用子组件方法**：`useRef` + `forwardRef` + `useImperativeHandle`。
6. **发布订阅 / 事件总线**：轻量全局通信（小项目）。
7. **URL 参数**：路由传参。

## P0-扩展-2. 条件渲染怎么写？

```jsx
// 1. && 短路
{isLogin && <User />}
// 2. 三元
{isLogin ? <User /> : <Login />}
// 3. 变量存储
let content; if (x) content = <A />; else content = <B />;
// 4. 函数返回
function render() { if (!x) return null; return <Main />; }
// 5. 隐藏式（保持挂载）：style={{ display: 'none' }}
```
> 注意：不要在条件里**改变 hooks 调用顺序**（见 P1-6）。

## P0-扩展-3. 列表渲染怎么写？

```jsx
<ul>
  {list.map(item => <li key={item.id}>{item.name}</li>)}
</ul>
```
要点：必须给 `key`（稳定唯一）、避免在 map 里定义内联函数过多（性能）、空数组返回 `null`。

## P0-扩展-4. children 是什么？使用场景？

`props.children` 是组件标签之间的内容，可以是任意 React 节点。

```jsx
function Card({ children }) { return <div className="card">{children}</div>; }
<Card><h1>标题</h1><p>内容</p></Card>
```
**场景**：布局容器（Card/Modal/Layout）、插槽、组合（Composition）模式替代多重 HOC。React.Children / React.cloneElement 可遍历/增强 children。

## P0-扩展-5. React 中 render 的触发条件有哪些？

1. 组件自身 `setState` / `useState` 更新。
2. 父组件重新渲染（默认子组件也重渲染，除非 memo）。
3. Context 的 Provider value 变化 → 所有消费组件重渲染。
4. `forceUpdate()`（类组件，极少用）。
5. hooks 依赖变化导致重渲染（本质是 1/2）。

（与 P1-3 为同一问题的不同问法，避免不必要的 re-render 见 P1-3。）

## P0-扩展-6. React 中如何绑定事件？

```jsx
// 1. 直接传函数引用
<button onClick={handleClick} />

// 2. 内联箭头函数（需传参时用；每次新建函数，传给 memo 子组件要小心）
<button onClick={() => handle(id)} />

// 3. 类组件：类字段 + 箭头函数（自动绑定 this）
class C extends Component {
  handle = () => { /* this 已绑定 */ };
  render() {
    return <button onClick={this.handle} />;          // 或 onClick={this.handle.bind(this)}
  }
}
```

## P0-扩展-7. React 中事件对象是什么？

`SyntheticEvent`（合成事件），跨浏览器统一封装，拥有与原生事件一致的接口（`preventDefault`、`stopPropagation`、`target` 等），且**池化在 React 17 之前**（见下一题）。

## P0-扩展-8. React 事件还会池化吗？

**React 17 起事件不再池化（no pooling）**，事件对象用完不回收，可放心在异步里访问 `e.target`、保留 `e` 引用。17 之前 `e` 会被复用，异步访问需 `e.persist()`。

## P0-扩展-9. 表单中 onChange 和原生 DOM 的 change 区别？

- React 的 `onChange` 实际等价于原生 `input` 事件（实时输入即触发），不是原生 `change`（失焦/回车才触发）。
- 这是 React 为“受控组件实时同步”做的语义映射。

## P0-扩展-10. 如何设置 className 和 style？

```jsx
<div className={`a ${active ? 'on' : ''}`} />
<div style={{ color: 'red', fontSize: 14, marginTop: '10px' }} />
```
注意：style 用对象、驼峰属性名、数值默认加 px。

## P0-扩展-11. 如何渲染 HTML？有什么风险？

```jsx
<div dangerouslySetInnerHTML={{ __html: htmlString }} />
```
**风险**：XSS 注入攻击。必须先用 `DOMPurify` 等清洗 HTML，且来源可信。

## P0-扩展-12. 组件为什么必须返回单个根节点？React 16 之后有什么变化？

- React 16 之前要求单一根（因为 `render` 返回一个 React 元素树，真实 DOM 必须单根）。
- React 16 引入 **Fragment**：`<>...</>` / `<React.Fragment>` 允许返回多个子节点而**不在 DOM 增加额外节点**。
- 现代 React 也允许直接返回数组、字符串、数字、null、boolean。

## P0-扩展-13. 如何处理空节点（null / false / undefined）？

React 渲染时会**忽略** `null`、`false`、`undefined`、`true`（不渲染任何 DOM）。常用 `condition && <C/>` 模式返回 `false` 实现条件隐藏。注意：`0` 和 `''` 会渲染成内容，条件渲染里要小心 `0` 被误当 false。

---

# P1 核心 10 个

## P1-1. useMemo、useCallback、React.memo 分别解决什么问题？

| API | 作用 | 缓存什么 |
|-----|------|---------|
| `useMemo(fn, deps)` | 缓存**计算结果**，避免每次渲染重复计算 | 函数的返回值 |
| `useCallback(fn, deps)` | 缓存**函数引用**，避免子组件因函数引用变化重渲染 | 函数本身 |
| `React.memo(Comp)` | 缓存**组件渲染结果**，props 浅比较不变则跳过重渲染 | 组件输出 |

三者都是**引用相等（referential equality）**优化手段。

```jsx
const heavy = useMemo(() => compute(list), [list]);
const onClick = useCallback(() => doSomething(id), [id]);
const MemoChild = React.memo(Child);
```

> 注意：它们有自身成本（比较 deps），不要无脑包。小计算包了反而更慢。

## P1-2. React 如何做性能优化？

1. 减少不必要的 re-render：`React.memo` / `useMemo` / `useCallback` / 拆分状态。
2. 列表虚拟化（react-window）处理大数据。
3. 代码分割：`React.lazy` + `Suspense`、路由懒加载。
4. 稳定 key、避免内联对象 / 函数传给 memo 子组件。
5. 防抖节流输入类交互。
6. 并发特性：`useDeferredValue` / `useTransition` 让非紧急更新让路。
7. 避免在 render 中做重计算 / 副作用。

## P1-3. 什么情况下组件会重新渲染？如何避免不必要的 re-render？

**会重渲染**：自身 setState、父组件重渲染、Context 变化、hooks 状态变化。

**避免**：
- 用 `React.memo` 包裹纯展示组件。
- 用 `useCallback` / `useMemo` 稳定传给子组件的引用。
- 拆分 state（大对象拆小，局部更新）。
- 把不变的子树提到父组件外 / 用 `children` 透传避免受影响。
- Context 拆细，或用 `useContextSelector`（社区库）避免全量消费。
- 状态下沉：把频繁变化的状态放到它真正影响的子组件里，而非根。

## P1-4. useRef 有哪些用途？和 useState 的区别？

**用途**：
1. 访问 DOM 节点 / 组件实例（`ref.current`）。
2. 保存可变值（如定时器 id、上一次值、上一次 props），**变化不触发渲染**。
3. 跨渲染保存“最新值”解决闭包陷阱（如 `const latest = useRef(); latest.current = x`）。

**vs useState**：

| | useRef | useState |
|---|---|---|
| 变化是否触发渲染 | 否 | 是 |
| 访问方式 | `ref.current` | 直接变量 |
| 用途 | DOM 引用、可变缓存 | 视图相关数据 |

## P1-5. useLayoutEffect 和 useEffect 的区别？

| | useLayoutEffect | useEffect |
|---|---|---|
| 执行时机 | Commit 之后、浏览器 paint **之前**（同步） | paint **之后**（异步） |
| 是否会阻塞视觉 | 会（同步执行，可读取布局） | 不阻塞 |
| 用途 | 读取/修改 DOM 布局、避免闪烁 | 数据请求、订阅、大部分副作用 |

```jsx
useLayoutEffect(() => {
  // 读取 DOM 尺寸、同步调整，避免闪烁
  ref.current.style.top = getTop() + 'px';
}, []);
```
> 规则：默认用 useEffect；只有需要“在用户看到之前同步修改布局（如测量后定位）”才用 useLayoutEffect。

## P1-6. Hooks 为什么不能写在条件语句里？

**原因**：Hooks 依赖**调用顺序（call order）** 来正确关联 state/effect 与组件实例。条件、循环、嵌套函数会让每次渲染的 hooks 数量/顺序不一致，React 无法匹配上一次的 hook，报错 `Rendered fewer hooks than expected`。

```jsx
// ❌ 错误
if (cond) { useEffect(() => {}, []); }

// ✅ 正确：把条件放进 hook 内部
useEffect(() => { if (cond) {...} }, [cond]);
```
React 内部用“链表”按调用顺序记录每个 hook，顺序必须稳定。

## P1-7. 自定义 Hook 怎么设计？

原则：**以 `use` 开头命名**、封装可复用状态逻辑、返回所需状态/方法、保持单一职责。

```jsx
function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = useCallback(() => setOn(v => !v), []);
  return [on, toggle];
}
```
设计要点：参数可配置、返回值语义清晰、内部用其他 hooks 组合、不返回 JSX（那是组件职责）。

## P1-8. Context 的使用场景和缺点？为什么导致大面积 re-render？

**场景**：主题、 locale、当前用户、权限等“全局但变化不频繁”的数据。

**缺点 / 大面积 re-render 原因**：Context value 一旦变化，**所有消费该 Context 的组件无论是否用到该字段都会重渲染**（React 无法做字段级订阅）。

**优化**：
- 拆成多个细粒度 Context。
- 把“变化频繁的值”和“不变的 API”分开（value 中稳定函数、变化数据分离）。
- 用 `useMemo` 稳定 Provider value。
- 用状态库（Zustand）或 `useContextSelector` 做选择器订阅。

## P1-9. Redux / Zustand / MobX 这类状态管理解决了什么问题？

**解决的问题**：
- 跨组件/跨层级的全局状态共享（避免 props 透传地狱）。
- 状态变更可预测、可追踪（单一数据源、action → reducer）。
- 调试能力（时间旅行、DevTools）、中间件（异步/thunk/saga）。
- 大型应用的状态组织与团队协作规范。

**对比**：
- **Redux**：严格单向流、样板代码多、适合超大型/强规范团队；RTK 已大幅简化。
- **Zustand**：轻量、hook 式、按需订阅、无 Provider 嵌套、性能好；现代首选。
- **MobX**：响应式、可变状态、心智简单但约束弱。

## P1-10. React Router 的核心用法和原理？

**核心**：把 URL 映射到组件，提供声明式路由与导航。

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/user/:id" element={<User />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```
**导航**：`<Link to>` / `useNavigate()`。
**读参**：`useParams()` / `useSearchParams()` / `useLocation()`。
**原理**：`BrowserRouter` 监听 `history`/`popstate` 变化，匹配路由表渲染对应组件；`HashRouter` 用 `#` 路径（兼容静态部署）。

---

# P1 扩展高频 15 个

## P1-扩展-1. useCallback 什么时候没必要用？

- 子组件没被 `React.memo` 包裹（引用变了也没意义）。
- 函数创建成本极低（简单回调）。
- 依赖频繁变化导致每次都重建（失去意义）。
- 传给不需要 referential equality 的普通元素（如 `<div onClick>`）。

## P1-扩展-2. React.memo 为什么有时不生效？

1. 父组件每次渲染传入**新的对象/数组/函数**作为 props → 浅比较失败。
2. 组件内部有 `useState`/`context` 变化，自身仍会渲染。
3. 传给它的 children 是内联 JSX（每次新引用）。
4. 用错了比较：需要自定义 `areEqual` 但默认浅比较不够。

## P1-扩展-3. 父组件传对象、数组、函数给子组件的问题？

每次父渲染这些引用都新建 → 即便子组件 memo 也会重渲染（浅比较发现引用变了）。解决：`useMemo`/`useCallback` 稳定引用，或把对象拆成基本类型 props。

## P1-扩展-4. useReducer 适合什么场景？

- 多个 state 相互关联、依赖前一个状态。
- 复杂状态逻辑（如表单多字段、状态机）。
- 想把“状态变更逻辑”从组件抽离（可测试、可复用）。
- 配合 `useContext` 做局部 Redux 式状态。

## P1-扩展-5. useReducer 和 useState 的区别？

| | useState | useReducer |
|---|---|---|
| 适合 | 独立、简单状态 | 多字段/复杂状态转移 |
| 更新方式 | setState(value/updater) | dispatch(action) → reducer |
| 逻辑位置 | 散落在组件 | 集中 reducer（可测试） |
| 批量复杂联动 | 难 | 易 |

## P1-扩展-6. Suspense 是什么？

React 用于**在子组件“挂起”（如异步加载、懒加载）时显示 fallback** 的边界组件。

```jsx
<Suspense fallback={<Spinner />}>
  <LazyComp />
</Suspense>
```
用于代码分割（`React.lazy`）、Data Fetching（结合 `use`（React 19）/ suspense-enabled 资源）、并发渲染。

## P1-扩展-7. Error Boundary 是什么？函数组件能不能直接实现？

**Error Boundary**：捕获子树渲染期/生命周期内的 JS 错误，显示降级 UI，防止整页白屏。

```jsx
class EB extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(err, info) { logError(err, info); }
  render() { return this.state.hasError ? <Fallback /> : this.props.children; }
}
```
**函数组件不能直接实现**：React 至今未提供 `getDerivedStateFromError`/`componentDidCatch` 的 hooks 等价物，错误边界仍需类组件（或基于类组件的库 `react-error-boundary`）。注意 React 19 的 `use` 是用来读取 Promise/Context 的，与错误边界无关。

## P1-扩展-8. forwardRef 和 useImperativeHandle 是什么？

- `forwardRef`：让函数组件接收父组件的 ref，转发到内部 DOM/组件。
- `useImperativeHandle`：自定义暴露给父组件的实例方法（只暴露必要 API，而非整个 DOM）。

```jsx
const Input = forwardRef((props, ref) => {
  const domRef = useRef();
  useImperativeHandle(ref, () => ({ focus: () => domRef.current.focus() }), []);
  return <input ref={domRef} {...props} />;
});
```

## P1-扩展-9. 表单性能优化怎么做？

- 大表单用非受控 + ref 减少 re-render，或拆分子表单各自管理状态。
- 用 `React.memo` 包裹表单项。
- 输入节流/防抖（搜索框）。
- 受控输入避免每次 setState 触发整表单重渲染（拆字段、状态下沉到单项组件）。
- 用受控库的不可变更新或字段级订阅（Formik / React Hook Form，后者靠 ref 不触发渲染）。

## P1-扩展-10. useEffect 中请求接口如何避免重复请求？

- `[]` 依赖 + `AbortController` 在 cleanup 取消。
- 加 `ignore`/`cancelled` flag 防止卸载后 setState。
- 用 `useRef` 防重复调用。
- 用数据请求库（React Query）自带去重/缓存。

## P1-扩展-11. useEffect 中 async 函数怎么写？

```jsx
useEffect(() => {
  let ignore = false;
  async function load() {
    const res = await fetch(url);
    if (!ignore) setData(await res.json());
  }
  load();
  return () => { ignore = true; };
}, [url]);
// 注意：useEffect 回调本身不能是 async（返回的 Promise 无法被当作 cleanup）
```

## P1-扩展-12. 如何取消请求，避免组件卸载后 setState？

用 `AbortController` 或 `ignore` flag（见上）。React 18 严格模式下双重挂载，cleanup 必写。

## P1-扩展-13. Context 如何优化性能？

与 **P1-8** 同一问题。核心手段：拆分多个细粒度 Context（按更新频率）、`useMemo` 稳定 value、分离“稳定 API”与“变化数据”到不同 Provider、或改用 Zustand / `useContextSelector` 做字段级订阅。

补充根因：Context 的消费者**无法只订阅 value 的某个字段**——value 引用一变，所有消费组件都会重渲染，这是它天生导致大面积重渲染的原因，因此拆分 Context 或把状态外迁到按需订阅的 store 才是治本之策。

## P1-扩展-14. 状态应该放在父组件、子组件还是全局？

- **子组件独有、父不需要** → 放子组件（状态下沉）。
- **多个子组件共享** → 提升到最近共同父组件（状态提升）。
- **跨页面/全局、变化不频繁** → Context / 全局 store。
- 原则：**Colocation（就近原则）**：状态放在最靠近使用它的地方，减少无关重渲染。

## P1-扩展-15. React Router 中嵌套路由、动态路由、路由守卫怎么做？

```jsx
<Route path="user" element={<Layout />}>      // 嵌套：Layout 里 <Outlet/>
  <Route path=":id" element={<User />} />       // 动态路由 :id
</Route>
```
- **嵌套路由**：父路由 element 渲染 `<Outlet/>`，子路由填充。
- **动态路由**：`path=":id"`，`useParams()` 读取。
- **路由守卫**：用 `<Navigate>` 重定向 + 自定义 `<RequireAuth>` 包裹：

```jsx
function RequireAuth({ children }) {
  const ok = useAuth();
  return ok ? children : <Navigate to="/login" replace />;
}
<Route path="/admin" element={<RequireAuth><Admin/></RequireAuth>} />
```

---

# P2 核心 10 个

## P2-1. React Fiber 是什么？解决了什么问题？

**Fiber**：React 16 引入的**新的协调引擎 / 虚拟栈帧**，把渲染任务拆成可中断、可恢复的小单元（Fiber 节点）。

**解决的问题**：旧 Stack Reconciler 是**同步递归**，大组件树渲染会长时间占用主线程，导致动画卡顿、输入无响应。Fiber 把工作切片，**可暂停让出主线程**给高优任务（如用户输入），解决“掉帧/卡顿”。

每个 Fiber 节点对应一个组件/DOM 节点，构成 `child / sibling / return` 三向链表而非递归栈。**Fiber 节点的关键字段**（面试常追问）：

| 字段 | 含义 |
|---|---|
| `tag` | 节点类型（FunctionComponent / ClassComponent / HostComponent 即 DOM 等） |
| `type` | 组件函数 / 类 / DOM 标签名 |
| `pendingProps` / `memoizedProps` | 本次待处理 / 上次渲染用到的 props |
| `memoizedState` | 上次渲染后的 state（hooks 链表头） |
| `updateQueue` | 待处理的更新队列（state 更新、回调等） |
| `flags` / `subtreeFlags` | 本节点 / 子树的副作用标记（Placement/Update/Deletion） |
| `lanes` | 该节点待处理的优先级（Lane 位） |
| `alternate` | 指向**双缓冲**中对侧的那棵 Fiber（current ↔ workInProgress） |
| `stateNode` | 对应的真实 DOM / 类实例 |

**双缓冲（Double Buffering）**：React 同时维护两棵 Fiber 树——`current`（屏幕上当前显示的）和 `workInProgress`（内存中正在构建的），通过 `alternate` 指针互相指向。render 阶段在 `workInProgress` 上算，commit 完成后只需把 root 的 `current` 指针拨到 `workInProgress`，即完成切换、无需重建——这就是所谓"零成本切换 UI"。

## P2-2. React 渲染阶段和提交阶段分别做什么？

| 阶段 | 做什么 | 可否中断 | 能否副作用 |
|------|--------|---------|-----------|
| **Render / Reconcile** | 计算新树、Diff、在 Fiber 上标记 flags（React 18 前串成 effect list） | ✅ 可中断 | ❌ 不能（纯计算） |
| **Commit** | 执行 DOM 增删改、调用 layout/passive effect | ❌ 不可中断（同步） | ✅ 执行副作用 |

详见 P0-1。

## P2-3. React 18 并发渲染是什么？是不是多线程？

- **并发渲染（Concurrent Rendering）**：React 可以**同时准备多棵 UI 版本**，根据优先级中断低优渲染、先做高优更新，让 UI 保持响应。
- **不是多线程**：仍是**单线程（JS 主线程）**，靠 Fiber 的可中断调度 + 时间切片（time slicing）模拟“并发”，用让出主线程（yield）的方式协作式多任务。

## P2-4. Fiber 为什么可以中断和恢复？

- Fiber 用**链表 + 指针（child/sibling/return）** 结构替代递归调用栈，渲染进度保存在 Fiber 节点上（不依赖 JS 调用栈）。
- React 每处理一个 Fiber 单元后检查时间片是否用完（`shouldYield`），用完就把控制权交还浏览器，下次从保存的 Fiber 指针继续 → **中断 + 恢复**。

## P2-5. React 的优先级调度是什么？

React 区分更新优先级（ Lane 模型）：
- **同步优先级**（如 click 事件）：立即执行。
- **用户输入 / 连续动画**：高优。
- **普通 state 更新**：中优。
- **Suspense / transition**：低优，可让路。

Scheduler 用 `MessageChannel`（而非 `setTimeout`，可规避嵌套定时器 4ms 最小延迟）把任务切成宏任务片，按优先级决定先执行哪个更新、是否打断低优渲染。

## P2-6. useTransition、startTransition 和 useDeferredValue 有什么用？

都是**把更新标记为非紧急（低优）**，让紧急更新（输入、点击）先走。

```jsx
const [isPending, startTransition] = useTransition();
const deferred = useDeferredValue(value);

startTransition(() => { setHeavyState(next); }); // 主动把这段更新标记为低优
```

**`useTransition` vs `useDeferredValue` 怎么选**（高频追问）：

| | useTransition | useDeferredValue |
|---|---|---|
| 视角 | 基于 **action**：你**主动**用 `startTransition` 包裹一段 setState | 基于 **value**：把一个值交给它，它返回一个"延迟版"的值 |
| 谁控制 | 调用方（能拿到 setState 的地方） | 消费方（只有 value、改不了源头时，如第三方受控组件） |
| 能拿 isPending | ✅ 返回 `isPending` 可显示 loading | ❌ 没有 pending 状态 |
| 典型场景 | Tab 切换、路由跳转等"我能触发更新"的场景 | 搜索结果列表、大数据图表等"值变了但渲染重"的场景 |

一句话：**能控制 setState 用 `useTransition`；只能拿到一个变化的值就用 `useDeferredValue`。**

## P2-7. 自动批处理 batching 是什么？flushSync 是什么？

- **自动批处理（React 18）**：在事件、`Promise`、`setTimeout`、原生事件中多次 `setState` 自动合并成一次渲染，减少不必要的重渲染（详细机制与版本差异见 **P0-4**）。
- **flushSync(fn)**：强制**同步、立即**刷新更新（跳出批处理）。慎用，会阻塞、破坏并发优化。

```jsx
import { flushSync } from 'react-dom';
flushSync(() => setCount(1)); // 立刻提交
```

## P2-8. React 中闭包陷阱有哪些？为什么连续调用 useState 可能拿不到最新值？

**闭包陷阱**：函数组件的 effect / 回调捕获的是**渲染时的旧 state 快照**，若在 setTimeout / 事件里读 state，可能拿到旧值。

**连续调用拿不到最新值**：同一函数体内多次 `setCount(count + 1)`，每次 `count` 都是同一闭包里的旧值 → 都基于旧值 +1 → 只 +1。

**解决**：
```jsx
// 函数式更新，基于最新值
setCount(c => c + 1); setCount(c => c + 1); // +2
// 读最新值用 ref 镜像
const ref = useRef(); ref.current = count;
// effect 依赖要写全
useEffect(() => {...}, [count]);
```

## P2-9. React 的 reconciliation 过程是什么？

Reconciliation = React 用 Diff 算法比较新旧元素树、决定如何高效更新真实 DOM 的过程（详见 P0-8）。核心假设：同层、同 type、key 复用。产出的变更以 `flags` 标记在 Fiber 上（React 18 前会串成 effect list）交给 Commit 阶段执行。

## P2-10. SSR、Hydration、hydration mismatch 是什么？

- **SSR（服务端渲染）**：服务端把 React 组件渲染成 HTML 字符串返回，首屏快、利于 SEO。
- **Hydration（水合）**：客户端 React 接管服务端 HTML，把事件绑定/复用已有 DOM，不重新生成 DOM（只“注水”交互）。
- **Hydration mismatch（水合不匹配）**：服务端渲染的 HTML 与客户端首次渲染的 DOM 不一致（如时间、随机数、`window` 差异），React 会报警并可能重建该节点。

```jsx
// 避免 mismatch：仅在客户端渲染不确定内容
const [now, setNow] = useState(null);
useEffect(() => setNow(Date.now()), []);
```

---

# P2 扩展高频 15 个

## P2-扩展-1. render phase 和 commit phase 的区别？

见 P2-2 表格：render 可中断、纯计算、无副作用；commit 同步、执行 DOM 与 effect。

## P2-扩展-2. 为什么渲染阶段不能做副作用？

因为 render 阶段**可能被中断、丢弃、重做**（并发模式下同一组件可能 render 多次，或被 Suspense 丢弃）。副作用若放在 render 里会被执行多次 / 部分执行，导致请求重复、订阅泄漏等不可控问题。副作用只应在 Commit 阶段 / effect 里做。

## P2-扩展-3. React 中副作用是什么？

“副作用”指渲染之外的、会影响外部世界或有可观察影响的操作：网络请求、订阅、操作 DOM、定时器、写 localStorage、手动修改 `document.title` 等。React 要求副作用放在 `useEffect`/`useLayoutEffect`/事件处理函数里。

## P2-扩展-4. JSX 的本质是什么？

JSX 是 `React.createElement(type, props, ...children)` 的**语法糖**。编译（Babel/SWC）后变成普通 JS 调用，返回 **React 元素（普通对象，描述 UI）**，并非真实 DOM。

```jsx
// JSX
const el = <div className="a">hi</div>;
// 编译后
const el = React.createElement('div', { className: 'a' }, 'hi');
// React 元素对象：
{ type: 'div', props: { className: 'a', children: 'hi' }, ... }
```
React 18+ 可用 **JSX 自动运行时（automatic runtime）**，无需手写 `import React`。

## P2-扩展-5. React Portal 的使用场景？

`ReactDOM.createPortal(child, domNode)` 把子节点渲染到**父组件 DOM 树之外**的任意 DOM 节点（仍在 React 树内，事件能冒泡回 React 父级）。

**场景**：Modal、Tooltip、Drawer、全局浮层 —— 避免被父级 `overflow:hidden`/`z-index` 限制。

```jsx
ReactDOM.createPortal(<Modal />, document.body);
```

## P2-扩展-6. HOC、Render Props、Hooks 分别解决什么问题？

| 模式 | 解决 | 缺点 |
|------|------|------|
| **HOC** | 逻辑复用（包裹组件加能力） | 嵌套地狱、props 冲突、难追溯 |
| **Render Props** | 把渲染逻辑交给子组件回调 | 嵌套深、回调多 |
| **Hooks** | 函数组件内复用有状态逻辑 | 需遵守 hooks 规则 |

现代首选 **自定义 Hook**，HOC/Render Props 仅在兼容旧代码或特殊场景使用。

## P2-扩展-7. StrictMode 为什么开发环境会执行两次？

`React.StrictMode` 在开发模式下**故意重复调用**某些函数以暴露不纯代码（副作用没 cleanup、有可变全局状态）。生产环境不会重复调用。具体会被双重调用的：
- 组件函数体（render）
- 类的 `constructor`、`render`
- `useState` / `useMemo` 的 initializer / factory，`useReducer` 的 reducer
- `useEffect` / `useLayoutEffect` 的 mount：会执行 `setup → cleanup → setup`

目的：帮助发现“本应可重复执行却依赖单次执行”的隐藏 bug，让并发渲染（render 可能被打断重做）下的副作用更健壮。

## P2-扩展-8. useSyncExternalStore 是什么？

React 18 用于**安全订阅外部可变数据源**（如第三方 store、浏览器 API）的 hook，保证并发渲染下不读到撕裂（torn）的状态。

```jsx
const snapshot = useSyncExternalStore(subscribe, getSnapshot);
```
用于 Zustand 等库底层、或订阅 `window.matchMedia` 等。

## P2-扩展-9. useId 解决什么问题？

React 18 生成**稳定、唯一的 ID**，用于表单 label/input 关联、无障碍属性（`aria-*`），**避免在 SSR 下 hydration mismatch**（服务端/客户端生成的 id 一致）。

```jsx
const id = useId();
<label htmlFor={id} /><input id={id} />
```

## P2-扩展-10. React 服务端渲染 SSR 的流程？

1. 服务端 `renderToString(<App/>)` 生成 HTML 字符串，随页面返回。
2. 客户端加载 JS，`ReactDOM.hydrateRoot` 水合（绑定事件、复用 DOM）。
3. 之后变为纯 CSR 应用。

框架：`Next.js`（App Router / Pages Router）、`Remix`、`Gatsby`。

## P2-扩展-11. React Server Components 是什么？

RSC（React Server Components）：组件在服务端运行、直接访问服务端资源（DB、文件系统），**不发送组件 JS 到客户端**，只传序列化结果。减少 bundle、天然 SSR、可直接写数据获取。

## P2-扩展-12. React Server Components 和 SSR 的区别？

| | SSR | RSC |
|---|---|---|
| 执行时机 | 服务端渲染成 HTML（一次） | 组件在服务端持续可运行 |
| 客户端 JS | 需 hydrate 整个组件树 | 服务端组件**不发 JS** |
| 访问后端 | 需 API 层 | 直接 import 服务端代码/DB |
| 用途 | 首屏加速/SEO | 架构级：减少 bundle、直连数据 |

二者可结合：RSC 用于数据组件，SSR 用于首屏 HTML。

## P2-扩展-13. Suspense 和懒加载、数据请求分别是什么关系？

- **懒加载**：`React.lazy(() => import('./C'))` 让组件在用到时才加载，配合 `<Suspense fallback>` 显示 loading。
- **数据请求**：Suspense 可等待“支持 suspense 的读取”（如 `use` 读取 promise、Suspense 缓存库），组件挂起时显示 fallback。
- 即：**Suspense 是“等待异步资源完成”的统一边界**，资源可以是代码（懒加载）或数据。

## P2-扩展-14. Error Boundary 能捕获哪些错误，不能捕获哪些？

**能捕获**：渲染期错误、生命周期方法错误、子组件树的错误。
**不能捕获**：事件处理函数里抛错（用 try/catch）、异步代码（Promise/setTimeout）、SSR 期间错误、Error Boundary 自身抛错。

## P2-扩展-15. 大型 React 项目如何拆分组件和状态？

- **组件拆分**：按职责（展示/容器分离）、按业务域（feature 文件夹）、原子化（Atomic Design：atoms/molecules/organisms）。
- **状态拆分**：全局（auth/theme）→ store；页面级 → 容器组件；组件级 → 局部 state；表单 → 表单库/局部。
- **目录结构**：`features/`、`components/`（通用）、`pages/`、`hooks/`、`store/`、`api/`、`utils/`。见 P3-1。

---

# P3 核心 10 个

## P3-1. React 项目如何做目录结构设计？

推荐 **Feature-based（按功能域）** 结构：

```
src/
  app/            // 全局配置（router、store、provider）
  features/       // 按业务域
    user/
      components/
      hooks/
      api.ts
      types.ts
    order/
  components/      // 跨功能通用组件（UI 库）
  hooks/           // 通用业务 hook
  lib/ (utils)     // 工具函数
  api/             // 请求层封装
  types/           // 全局类型
  assets/
  routes/
```
优点：高内聚、易定位、利于代码分割与团队协作。

## P3-2. 如何封装通用组件？

原则：
- **受控 + 非受控兼容**：支持 `value`/`defaultValue` + `onChange`。
- **props 设计**：必要 + 可选 + 合理的默认值 + 类型（TS）。
- **组合优于配置**：用 `children`/插槽而非巨量 props。
- **无障碍**：语义化标签、`role`/`aria`。
- **样式隔离**：CSS Modules / CSS-in-JS / Tailwind。
- **可测试**：纯展示、少副作用。

## P3-3. 如何封装业务 Hook？

- 命名 `useXxx`，封装“数据 + 状态 + 副作用”。
- 返回 `{ data, loading, error, retry }` 标准化。
- 内部处理竞态（AbortController）、cleanup。
- 可复用于多个页面/组件。

```jsx
function useUser(id) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  useEffect(() => { /* 请求 + abort */ }, [id]);
  return state;
}
```

## P3-4. 如何设计 Modal / Form / Table 组件？

- **Modal**：用 Portal 渲染到 body；受控 `open` + `onClose`；支持 `title`/`footer`/`maskClosable`；Esc 关闭、body 滚动锁定；动画。
- **Form**：用受控或 React Hook Form；字段校验（schema，如 zod/yup）；错误展示；initialValues；提交 loading。
- **Table**：列配置化 `columns`；分页/排序/筛选；虚拟滚动处理大数据；行选择；空状态/loading 态。

## P3-5. 如何设计组件的 props 类型，并保证多人协作下 API 稳定？

- 用 **TypeScript** 定义 `Props` 接口 / type。
- 必填用 `prop: T`，可选 `prop?: T`，默认值 `= xxx`。
- 用 **Discriminated Union** 表达多态组件（如 `type: 'a' | 'b'`）。
- 避免 `any`，用泛型支持复用（`Table<T>`）。
- 破坏性变更走版本/文档，提供 deprecation 提示。
- 用 `React.ComponentProps` / `Extract` 派生子类型。

## P3-6. 如何处理接口请求、loading、错误和重试？

- 统一请求层（axios 封装，见 P3-7）。
- 业务 hook 返回 `{ data, loading, error }`。
- 错误：区分网络错误/业务错误码，统一 toast + 收集。
- 重试：`useQuery` 的 `retry`、或手动 `retry()` 函数（指数退避）。
- 兜底 UI：ErrorBoundary + 错误重试按钮。

## P3-7. 如何设计请求层（axios 封装、拦截器、错误码处理）？

```js
const api = axios.create({ baseURL, timeout: 10000 });
// 请求拦截：注入 token
api.interceptors.request.use(cfg => { cfg.headers.token = getToken(); return cfg; });
// 响应拦截：统一解包 + 错误码处理
api.interceptors.response.use(
  res => res.data,
  err => {
    const { code } = err.response?.data || {};
    if (code === 401) handleUnauthorized(); // 无感刷新/登出
    return Promise.reject(err);
  }
);
```
要点：统一错误码映射、token 注入、401 刷新、超时、取消、环境切换。

## P3-8. 前端权限控制怎么做？按钮级权限怎么做？

- **路由级**：`RequireAuth` 包裹受保护路由（见 P1-扩展-15）。
- **菜单级**：根据权限列表过滤菜单。
- **按钮级**：自定义指令/组件 `<Auth perm="edit"><Button/></Auth>`，内部校验权限码（来自接口）决定是否渲染。
- 权限数据存 store/Context，登录后拉取；注意前端权限只是“体验层”，后端必须二次校验。

```jsx
function Auth({ perm, children }) {
  const perms = usePerms();
  return perms.includes(perm) ? children : null;
}
```

## P3-9. 如何做路由懒加载、代码分割和首屏加载优化？

- **路由懒加载**：`const Page = React.lazy(() => import('./Page'))` + `<Suspense>`。
- **代码分割**：基于路由 / 体积大的依赖（如 echarts）动态 import。
- **首屏优化**：
  - 拆 vendor / 路由 chunk，预加载关键资源。
  - 骨架屏 + Suspense fallback。
  - 图片懒加载、字体 `font-display: swap`。
  - 资源压缩（gzip/brotli）、Tree Shaking、CDN。
  - 关键 CSS 内联，减少 HTTP 请求。

## P3-10. 如何排查 React 页面卡顿？

1. **React DevTools Profiler**：看哪些组件渲染耗时、重渲染次数。
2. **Chrome Performance**：找长任务（Long Task）、掉帧、布局抖动。
3. 定位无谓重渲染（memo 缺失、引用变化）。
4. 检查大列表是否虚拟化、大对象是否深拷贝。
5. `why-did-you-render` 库定位多余渲染。
6. 并发特性（`useDeferredValue`/`useTransition`）把重任务降级。
7. 看是否有同步布局抖动（`useLayoutEffect` 滥用）、频繁 setState。

---

# P3 扩展高频 15 个

## P3-扩展-1. 如何处理 token 过期和无感刷新？

- 响应拦截器捕获 401。
- 用**刷新锁**：多个请求同时 401 时，只发一次 refresh 请求，其余排队等新的 token（避免并发刷新风暴）。
- 刷新成功：更新 token，重试原请求；失败：清登录态跳转登录页。
- 用 `refreshToken`（httpOnly cookie 或 storage）换 `accessToken`。

```js
let refreshing = null;
function handle401(failedRequest) {
  if (!refreshing) {
    refreshing = refreshToken(); // 只发一次 refresh，其余请求复用同一个 Promise（刷新锁）
  }
  return refreshing
    .then(({ accessToken }) => {
      failedRequest.headers.token = accessToken; // 用新 token 重试原请求
      return axios(failedRequest);
    })
    .finally(() => { refreshing = null; }); // refresh 结束复位锁；失败由拦截器跳登录
}
// 调用处：响应拦截器捕获 401 时 return handle401(err.config)
```

## P3-扩展-2. 如何做登录态持久化？

- `accessToken` 存内存（安全，刷新丢失）/ `refreshToken` 存 httpOnly cookie（防 XSS）。
- 或用 sessionStorage/localStorage 存 token（注意 XSS 风险）。
- 应用启动：从存储恢复 token，校验有效性，拉用户信息。
- 结合路由守卫。

## P3-扩展-3. 如何处理竞态请求（搜索框连续输入）？

- 用 `AbortController` 取消上一次请求（推荐）。
- 或 `ignore` flag 只接受最后一次结果。
- 或用 `useDeferredValue` 延迟搜索值 + 请求库缓存。
- 防抖 + 取消：

```jsx
useEffect(() => {
  const ctrl = new AbortController();
  fetch(`/search?q=${q}`, { signal: ctrl.signal })
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => {
      // abort 抛的 AbortError 必须捕获并忽略，否则进入未处理拒绝
      if (err.name !== 'AbortError') setError(err);
    });
  return () => ctrl.abort(); // 卸载或 q 变化时取消上一次请求
}, [q]);
```

## P3-扩展-4. 如何做防抖和节流？

- **防抖（debounce）**：连续触发只执行最后一次（搜索输入、resize）。
- **节流（throttle）**：固定间隔执行一次（滚动、拖拽）。
- 自实现或 lodash；React 中用 `useMemo` 包裹避免每次重建。

## P3-扩展-5. 如何做虚拟列表？

只渲染视口内 + 缓冲区的少量 DOM，监听滚动计算 startIndex/offset。
- 库：`react-window`、`react-virtualized`、`@tanstack/react-virtual`。
- 手写：固定行高时 `translateY = startIndex * rowHeight`，绝对定位。

## P3-扩展-6. 大数据表格如何优化？

- 虚拟滚动（见上）。
- 列固定/虚拟列。
- 分页或无限滚动。
- 避免在 render 中深拷贝大数组。
- 用 `React.memo` 行组件 + 稳定 key。

## P3-扩展-7. 如何处理图片懒加载？

- 原生：`loading="lazy"`。
- IntersectionObserver 控制加载时机。
- 占位图 / 骨架屏 / 模糊预览（blur-up）。
- 响应式 `srcset` / `picture`。

## P3-扩展-8. 如何做前端缓存？

- HTTP 缓存：强缓存（Cache-Control）、协商缓存（ETag/Last-Modified）。
- 应用缓存：`localStorage`/`sessionStorage`（小数据）、`IndexedDB`（大数据/离线）。
- 请求缓存：React Query/SWR 内置 stale-while-revalidate。
- 静态资源：Service Worker（PWA 离线）。

## P3-扩展-9. 如何做埋点？

- **曝光埋点**：IntersectionObserver 监听元素进入视口上报。
- **点击埋点**：全局委托或组件内 onClick 上报。
- **PV/UV**：路由变化时上报。
- 数据：事件名、参数、时间戳、用户、页面路径。
- 上报：批量 + `navigator.sendBeacon`（页面关闭也能发）。
- 方案：自建 / 第三方（神策、GrowingIO）。

## P3-扩展-10. 如何做错误监控和性能监控？

- **错误监控**：`window.onerror` / `unhandledrejection` + React ErrorBoundary 上报；Source Map 还原。
- **性能监控**：`Performance API`（FCP/LCP/CLS/FID）、`web-vitals` 库、长任务监控。
- 上报到监控平台（Sentry / 自建），区分环境、采样上报。

## P3-扩展-11. 如何定位线上 React 报错？

- 错误监控平台（Sentry）收集堆栈 + Source Map 还原到源码。
- 上报组件栈（React 错误信息含组件路径）。
- 复现：结合用户行为（埋点路径）、设备/浏览器信息。
- ErrorBoundary 兜底 + 上报组件名。

## P3-扩展-12. 如何写 React 单元测试？

- 框架：Jest / Vitest + React Testing Library。
- 测试用户行为（而非实现细节）：`render`、`fireEvent`、`screen.getByRole`。
- 覆盖：渲染正确、交互更新、边界（空/错误）、异步请求（mock fetch）。
- 快照测试谨慎使用（易过时）。

## P3-扩展-13. React Testing Library 和 Enzyme 的区别？

| | RTL | Enzyme |
|---|---|---|
| 测试理念 | 黑盒、以用户角度（查询 DOM） | 白盒、可访问组件内部（shallow/mount） |
| 官方推荐 | ✅ React 官方推荐 | ❌ 停滞，不兼容 hooks 新特性 |
| 关注点 | 行为/可访问性 | 实现细节 |

现代项目优先 RTL。

## P3-扩展-14. 如何做前端工程化和代码质量保障？

- **规范**：ESLint（代码规则）+ Prettier（格式）+ Stylelint（CSS），配合 `lint-staged` + `husky` 在 commit 前自动检查。
- **提交规范**：Commitlint 约束 commit message（如 Conventional Commits），配合 `changesets` 自动发版与生成 CHANGELOG。
- **类型**：TypeScript 严格模式（`strict: true`），公共类型统一维护。
- **构建**：Vite / webpack，关注产物分析（`rollup-plugin-visualizer`）、Tree Shaking、按需加载。
- **CI/CD**：流水线跑 lint → typecheck → test → build，部署前卡点。
- **模块化**：Monorepo（pnpm workspace / Turborepo）管理多包与共享组件库。

## P3-扩展-15. 大型 React 应用如何做状态和数据流架构设计？

- **分层拆分**：
  - 服务端状态（接口数据）→ React Query / SWR 管理（缓存、去重、失效重取），不进全局 store。
  - 客户端全局状态（登录态、主题、权限）→ Zustand / Redux Toolkit。
  - 跨层级但低频的数据（locale、当前用户）→ Context。
  - 组件局部状态 → useState / useReducer，就近放置（Colocation）。
- **原则**：
  - **单一数据源**：同一数据只存一处，派生数据用选择器计算（`useMemo` / reselect），避免多处同步。
  - **状态最小化**：能从 props/URL/已有 state 推导的，不单独存。
  - **读写分离**：读走选择器（按需订阅避免多余渲染），写走 action/mutation（可追踪）。
- **数据流方向**：保持单向（事件 → action → store → 视图），禁止子组件直接改全局数据，便于调试与回溯。

---

# 经典补充高频题（补齐上面 98 题未覆盖）

## 补-1. 虚拟 DOM 真的比直接操作 DOM 快吗？

不是。VDOM 的真正价值不在"更快"，而在于：
1. **声明式 > 命令式**：开发者写"UI 应该是什么样"，React 算差异，心智成本低、可维护。
2. **批量 + 最小化 DOM 操作**：diff 在内存做，最后只提交一次真实 DOM 写入，减少重排重绘。
3. **跨平台**：同一套协调逻辑能渲染到 DOM、Native、SSR、Canvas 等。

代价：多了构建 + diff VDOM 的 JS 开销。**单点极致性能**下，精心写的原生 DOM 一定快过 VDOM；但大型应用里手写命令式 DOM 维护成本失控。所以"VDOM 快"是相对 jQuery 时代"无脑全量重渲"而言的工程胜利，不是绝对性能优势。

## 补-2. 为什么 useState 返回数组而不是对象？

返回数组 `[state, setState]` 便于**按位置自由命名**：

```jsx
const [count, setCount] = useState(0);          // 变量名随意
const [name, setName] = useState('');
```

若返回对象 `{ state, setState }` 则 key 固定、命名受限（或要重命名）。数组解构 + 任意变量名更灵活，是 hooks 的设计约定。

## 补-3. 受控↔非受控切换警告怎么回事？

```
Warning: A component is changing a controlled input to be uncontrolled.
```

成因：受控输入的 `value` 在某次渲染变成 `undefined`/`null`（如 `value={data.name}` 而 `data` 还没加载）。React 视其为非受控，状态来源从 state 切到 DOM，行为不可预测。

修复：给兜底值 `value={data?.name ?? ''}`，确保 `value` 始终是字符串；不要在受控/非受控之间反复横跳。

## 补-4. Concurrent 模式下的 tearing（撕裂）是什么？useSyncExternalStore 怎么解决？

**Tearing**：并发渲染中，同一棵树的不同部分可能读到**同一个外部状态的不同版本**——比如先渲染的部分读到旧值、被中断后用新值继续渲染后半部分，导致 UI 内部不一致。

**useSyncExternalStore 的解法**：强制组件在渲染期间**同步**读取外部 store 快照（`getSnapshot`），并通过 `subscribe` 在 store 变化时通知 React；若渲染进行中 store 又变了，React 会以更高优先级**重新启动**该次渲染，保证读到的一致。还内置快照缓存避免无限循环。

适用：Zustand / Redux / 浏览器 API（`matchMedia`、`navigator.onLine`）等外部可变源接入 React。

## 补-5. Lane 模型详解？

React 18 用 **Lane（车道）** 取代 17 的 `expirationTime` 做优先级。Lane 是 **31 位整数中的某一位**，每个 bit 代表一条优先级。

特点：
- **位运算表达"批次"**：多个 lane 用按位或 `|` 合成一个 `lanes`，更新是否属于某次渲染用按位与 `&` 判断——O(1) 位运算，比数值比较更适合表达"一组更新同时进行"。
- **优先级分层**：高优（SyncLane、离散/连续输入 InputDiscreteLane / InputContinuousLane）、默认（DefaultLane）、过渡（TransitionLanes，多条用于不同 transition 批次）、空闲（IdleLane）。
- **离散 vs 连续**：离散事件（click）和连续事件（mousemove、input）有不同 lane，连续事件可被打断以避免掉帧。

一句话：Lane 用"位"同时表达优先级与批次归属，让并发调度能精确插队、合并、批处理。

## 补-6. HOC 的两种实现与常见坑？

- **属性代理（Props Proxy）**：HOC 返回一个新组件，把被包裹组件作为子组件渲染并透传 props。最常见。
- **反向继承（Inheritance Inversion）**：HOC 返回一个**继承**被包裹组件的类，劫持其 render / 生命周期（强耦合，少用）。

坑：
1. **静态方法丢失**：HOC 返回新组件，原组件静态方法不会自动带过来 → 手动拷贝或用 `hoist-non-react-statics`。
2. **refs 不转发**：`ref` 指向 HOC 而非被包裹组件 → 用 `forwardRef`。
3. **displayName**：为方便 DevTools 调试，应给包装后的组件设置 `displayName`（如 `WithX(原组件名)` 的形式），便于在 DevTools 里识别。
4. **不要在 render 里调用 HOC**：每次 render 都创建新组件，会全量卸载重建、丢失状态；HOC 要在模块顶层应用。

## 补-7. React 18 SSR Streaming 与 Selective Hydration？

React 18 对 SSR 的两个大改进：

- **Streaming（流式）**：`renderToPipeableStream` / `renderToReadableStream` 让服务端**边生成 HTML 边发送**，不必等所有数据齐了才返回首字节；配合 `<Suspense>` 可先发 fallback，数据就绪再流式补上对应区块。
- **Selective Hydration（选择性水合）**：客户端水合时，若用户与某块已渲染但未水合的区域交互（如点击），React 会**优先水合那块**；且水合可在切片间隙进行，不再像 React 17 那样整页水合期间完全阻塞主线程。

二者结合：用户更快看到内容、更快可交互，且不阻塞主线程。

---

# React 19 新特性专题

> React 19 已稳定。以下为高级面试高频追问点。

## R19-1. React Compiler 解决了什么？

React Compiler（原 React Forget）是**编译时**优化器：在编译阶段自动分析组件，对可证明"纯"的值/JSX 做**自动 memo 化**——等价于自动插入合适数量的 `useMemo`/`useCallback`/`React.memo`，且不破坏规则。

意义：
- 开发者**不再需要手写绝大部分 `useMemo`/`useCallback`/`React.memo`**，也无需纠结"包了反而更慢"的权衡。
- 从根本上减少"因引用变化导致的不必要重渲染"。
- 前提是组件必须遵守"render 是纯函数、无副作用"的规则——编译器正是靠这个才能安全优化（这也是 StrictMode 双调用逼你写纯代码的原因）。

注意：Compiler 是渐进式的，可只对部分目录启用；它不替代真正的虚拟列表、并发特性等手动优化。

## R19-2. Actions：useActionState / useOptimistic / useFormStatus

React 19 把"表单提交 / 异步 action"做成一等公民，统称 **Actions**。

- **`useActionState(action, initial)`**：管理一个异步 action 的状态（含返回值、pending）。`action` 签名 `(prevState, formData) => newState`，可直接传给 `<form action={...}>`。
- **`useOptimistic(initial, reducer)`**：乐观更新——请求发出后、返回前，先乐观地把 UI 切到"预期结果"，请求失败再回滚。
- **`useFormStatus()`**：在表单**子孙**组件里读取所属 `<form>` 的提交状态（`pending`），无需 prop 透传。

```jsx
function UpdateName() {
  const [error, submitAction, isPending] = useActionState(
    async (prev, formData) => {
      const err = await updateName(formData.get('name'));
      return err ?? null;          // 返回 null 表示成功
    },
    null
  );
  return (
    <form action={submitAction}>
      <input name="name" />
      <button disabled={isPending}>保存</button>
      {error && <p>{error}</p>}
    </form>
  );
}
```

## R19-3. `use` hook 和别的 hook 有什么不同？

`use(promise)` / `use(context)`：
- **可在条件 / 循环中调用**（唯一不受"不能在条件里调用"约束的 hook）——内部展开 Promise，遇到 pending 就 throw 给最近的 Suspense 边界。
- 读取 Promise 时配合 `<Suspense>` + Error Boundary，组件能像写同步代码一样用异步结果。
- 读取 Context 时 `use(Context)` 与 `useContext` 等价，但 `use` 允许在条件分支里按需读取。

```jsx
const data = use(fetchPromise);  // 配合 Suspense，组件可像同步代码用 data
```

⚠️ 注意：`use` 与 **Error Boundary 无关**（错误边界仍只能用类组件），别把两者混为一谈。

## R19-4. ref 作为 prop、ref callback cleanup

- **ref 作为 prop**：React 19 起函数组件可直接通过 props 接收 `ref`，不再必须包 `forwardRef`。官方已不再推荐新代码使用 `forwardRef`（过渡期仍保留以向后兼容，现有代码可继续使用，后续版本再逐步淡化）。
  ```jsx
  function Input({ ref, ...props }) {
    return <input ref={ref} {...props} />;
  }
  <Input ref={myRef} />
  ```
- **ref callback 可返回 cleanup**：像 `useEffect` 一样，ref 回调返回的函数会在 detach（节点卸载或 ref 变化）时执行，便于清理观察者等。
  ```jsx
  <div ref={(node) => {
    if (node) observer.observe(node);
    return () => observer.disconnect();   // cleanup
  }} />
  ```

## R19-5. Document Metadata 与其他小改进

- **Document Metadata**：组件内直接写 `<title>`/`<meta>`/`<link>`，React 自动 hoist 到 `<head>` 并管理生命周期，不再依赖 react-helmet。
- **异步脚本支持**：`<script async>` 可由 React 协调。
- **`cache` API**：主要用于 Server Components，做请求级 memo（同一 render 内同 key 只算一次）。

> 与 React 18 的关系：React 19 = 18 的并发能力 + Compiler 自动化 + Actions 表单 + Server Components 生产可用 + 一系列 DX 改进。

---

## 附：高频答题框架（面试可直接套用）

1. **先给结论**（一句话核心）。
2. **讲原理**（React 内部机制 / 源码层面）。
3. **上代码**（关键示例）。
4. **对比/坑点**（与 Vue、与原生、常见误区）。
5. **项目经验**（你的项目怎么用、遇到过什么问题、怎么优化）。
6. **延伸**（相关知识点，展示深度，如 microtask→nextTick→事件循环类比）。

> 结合你的背景（AI 算力聚合平台实时数据渲染、复杂表单、性能优化），在“虚拟列表、并发渲染、数据请求竞态、表单性能”等题上重点准备项目级亮点。
