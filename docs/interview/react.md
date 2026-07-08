---
sidebar_position: 6
title: React（面试要点）
---

# React 面试要点

## 目录
- [Fiber架构是什么？解决了什么问题？](#1-fiber架构是什么解决了什么问题)
- [React生命周期有哪些？](#2-react生命周期有哪些)
- [React Hooks有哪些？](#3-react-hooks有哪些)
- [类组件和函数组件有什么区别？](#4-类组件和函数组件有什么区别)
- [虚拟DOM是什么？有什么优势？](#5-虚拟dom是什么有什么优势)
- [useState和useReducer有什么区别？](#6-usestate和usereducer有什么区别)
- [useEffect和useLayoutEffect有什么区别？](#7-useeffect和uselayouteffect有什么区别)
- [useMemo和useCallback有什么区别？](#8-usememo和usecallback有什么区别)
- [React.memo的作用是什么？](#9-reactmemo的作用是什么)
- [Context API如何使用？有什么局限？](#10-context-api如何使用有什么局限)
- [Redux核心概念是什么？](#11-redux核心概念是什么)
- [MobX和Redux有什么区别？](#12-mobx和redux有什么区别)
- [setState是同步还是异步？](#13-setstate是同步还是异步)
- [React事件机制是怎样的？](#14-react事件机制是怎样的)
- [React Diff算法原理是什么？](#15-react-diff算法原理是什么)
- [Key的作用是什么？为什么不用索引？](#16-key的作用是什么为什么不用索引)
- [高阶组件（HOC）是什么？](#17-高阶组件hoc是什么)
- [Render Props是什么？](#18-render-props是什么)
- [Portal是什么？如何使用？](#19-portal是什么如何使用)
- [Error Boundary是什么？](#20-error-boundary是什么)
- [Suspense和React Lazy如何使用？](#21-suspense和react-lazy如何使用)
- [React性能优化有哪些方法？](#22-react性能优化有哪些方法)
- [React 18有哪些新特性？](#23-react-18有哪些新特性)
- [React服务端渲染（SSR）的优势？](#24-react服务端渲染ssr的优势)
- [React如何避免XSS攻击？](#25-react如何避免xss攻击)
- [受控组件和非受控组件有什么区别？](#26-受控组件和非受控组件有什么区别)
- [Redux项目结构如何划分？中间件原理是什么？](#27-redux项目结构如何划分中间件原理是什么)
- [JSX如何转换成真实DOM？](#28-jsx如何转换成真实dom)
- [useEffect如何支持async/await？](#29-useeffect如何支持asyncawait)
- [为什么不能在循环、条件中调用Hooks？](#30-为什么不能在循环条件中调用hooks)
- [什么是React Hooks的闭包陷阱？如何解决？](#31-什么是react-hooks的闭包陷阱如何解决)
- [父组件如何调用子组件的方法？](#32-父组件如何调用子组件的方法)
- [为什么React需要Fiber而Vue不需要？](#33-为什么react需要fiber而vue不需要)
- [手写实现 useLayoutEffect](#34-手写实现-uselayouteffect)
- [不使用脚手架手动搭建 React 应用](#35-不使用脚手架手动搭建-react-应用)
- [React 路由变化监听](#36-react-路由变化监听)
- [react-router 和原生路由有什么区别？](#37-react-router-和原生路由有什么区别)
- [Next.js 与 React SSR](#38-nextjs-与-react-ssr)

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
- `Suspense` 的 Promise resolve（子组件从 fallback 切换到内容）

**2. 调度阶段（Scheduler）**

为任务分配优先级（lane 模型），按优先级排序后出队。高优先级任务可以插队，低优先级任务会被推迟。

**3. render 阶段（可中断）**

此阶段在内存中进行，可被高优先级任务打断，是 React 时间切片（Time Slicing）的基础。

- 调用组件函数（执行 `render`），得到新的虚拟 DOM
- 执行 reconciliation（Diff 算法）：reconciliation 是 render 阶段的核心算法，负责对比新旧虚拟 DOM，计算出需要做的 DOM 操作
  - 对比新旧虚拟 DOM
  - 生成新的 Fiber 树，在 Fiber 节点上标记 effectTag（Placement / Update / Deletion）
  - 将带 effectTag 的节点链接成 effect list（副作用链表）
- 此阶段可被高优先级任务打断，打断后从断点继续，无需从头开始

**4. commit 阶段（同步，不可中断）**

为什么不可中断？——DOM 写操作是真实世界的副作用，一旦中断会导致界面状态不一致（部分节点已更新、部分未更新）。

- commit 阶段的入口函数是 `commitRoot`，它拿到的是 render 阶段产出的 effect list（带副作用的 Fiber 节点链表），只遍历有标记的节点，不必遍历整棵树
- commit 阶段会一次性、不可中断地把所有变更应用到真实 DOM 上
- 内部又分为三个子阶段（Before Mutation → Mutation → Layout），但整体是同步的：
  - **Before Mutation**：读取 DOM 状态（如 `getSnapshotBeforeUpdate`）
  - **Mutation**：执行 DOM 操作（增 / 删 / 改）
  - **Layout**：`useLayoutEffect` 同步执行（对应类组件的 `componentDidMount` / `componentDidUpdate`）
- Layout 阶段结束后，React 会立刻通过 `MessageChannel` 调度 `useEffect` 的执行（不阻塞浏览器绘制）

**5. 被动副作用执行（Passive Effects）**

- Layout 阶段结束后，浏览器完成 Paint，React 才开始执行 `useEffect`（异步）
- 在下一次渲染的 `useEffect` 执行之前，会先同步执行上一次的清理函数（清除订阅、定时器等），然后再执行本次 `useEffect` 回调

> 副作用主要指 `useEffect`、类组件的 `componentDidMount` / `componentDidUpdate` 等。
>
> - `useEffect` 在 commit 阶段完成后异步延迟执行，不阻塞浏览器绘制
> - `useLayoutEffect` 在 commit 阶段的 Layout 子阶段同步执行，会阻塞绘制

---


## 1. Fiber架构是什么？解决了什么问题？

### 一句话回答

Fiber 是 React 16 引入的**新的协调算法（Reconciler）**，本质是把同步、不可中断的渲染改成**异步可中断**的渲染，从架构层面解决了 React 15 大组件渲染阻塞主线程导致卡顿和掉帧的问题。

### 一、Fiber 架构背景

React 16 之前（Stack 架构）存在的核心问题：

- **同步递归更新**：整个虚拟 DOM 树一次性递归完成，无法中断
- **无法中断**：大组件渲染会长时间阻塞主线程
- **动画卡顿**：长任务导致页面掉帧
- **交互无响应**：用户输入、点击、滚动等事件无法及时处理

React 15 的 Stack 模式不可中断意味着：一旦开始渲染，必须等整棵组件树遍历完成，主线程才能去做别的事。

### 二、什么是 Fiber

> Fiber 既是**数据结构**（链表形式的虚拟 DOM 节点），也是**工作单元**（可以暂停、恢复、丢弃）。

把渲染过程拆成一个个小的"工作单元"（一个 Fiber 节点），每完成一个单元就检查一下：
- 还有时间吗？
- 有更紧急的任务吗？

不够就**让出主线程**，回头接着干。

### 三、Fiber 节点数据结构

每个 React 元素都对应一个 Fiber 节点，节点之间用链表相连：

```javascript
function FiberNode(tag, pendingProps, key, mode) {
  // ---- 身份信息 ----
  this.tag = tag;                    // 类型：FunctionComponent / HostComponent(DOM) / HostText 等
  this.key = key;
  this.elementType = null;           // createElement 的第一个参数
  this.type = null;                  // function / class / 字符串
  this.stateNode = null;             // 真实 DOM 节点或 class 实例

  // ---- 树状结构（链表） ----
  this.return = null;                // 父 Fiber
  this.child = null;                 // 第一个子 Fiber
  this.sibling = null;               // 下一个兄弟 Fiber
  this.index = 0;

  // ---- 状态 ----
  this.pendingProps = pendingProps;
  this.memoizedProps = null;         // 上一次渲染的 props
  this.memoizedState = null;         // 上次渲染的 state（函数组件这里是 hooks 链）
  this.updateQueue = null;           // setState 的更新队列
  this.dependencies = null;

  // ---- 副作用 ----
  this.flags = 0;                    // 副作用标记：Placement / Update / Deletion
  this.nextEffect = null;            // effect 链表
  this.firstEffect = null;
  this.lastEffect = null;

  // ---- 双缓存 ----
  this.alternate = null;             // 指向另一棵树中对应的 Fiber
}
```

**链表三指针**：`return`（父）、`child`（长子）、`sibling`（下一个兄弟）。

为什么不用树形结构？因为链表遍历可以**随时中断**（保留当前节点指针即可），而树形递归需要完整的调用栈。

### 四、Fiber 与 React 元素的区别

| | React 元素 | Fiber 节点 |
|---|---|---|
| 创建时机 | 每次 render 都重新创建 | 首次渲染创建，后续复用 |
| 持久性 | 不可变、临时对象 | 持久化的工作单元 |
| 内容 | type / props / key | 元素信息 + 实例 + state + 副作用 + 调度信息 |

简单说：**React 元素是描述**，**Fiber 节点是状态机**。

### 五、完整的渲染流程（Render + Commit 双阶段）

```
触发更新（setState / 父组件重渲染）
       ↓
┌───────────────────────┐
│   调度阶段 Scheduler   │  → 分配优先级（Lane），排入队列
└───────────────────────┘
       ↓
┌───────────────────────┐
│   Render 阶段（可中断）│  → 构建 workInProgress Fiber 树
│                       │  → 执行 diff，打 effect 标记
│                       │  → 每 5ms 检查一次 shouldYield
└───────────────────────┘
       ↓
┌───────────────────────┐
│   Commit 阶段（不可中断）│ → 遍历 effect list 一次性提交
│                       │  → Before Mutation → Mutation → Layout
│                       │  → 切换 current 指针（双缓冲）
└───────────────────────┘
       ↓
┌───────────────────────┐
│  浏览器 Paint          │
└───────────────────────┘
       ↓
┌───────────────────────┐
│  Passive Effects       │  → useEffect 异步执行
└───────────────────────┘
```

**为什么 Commit 阶段不可中断？**

DOM 写操作是真实世界的副作用，一旦中断会导致界面出现半新半旧的不一致状态。React 18 的 useTransition 可以影响 Render 阶段的中断，但不会让 Commit 半途而废。

### 六、双缓冲（Double Buffering）

```
       current 树                    workInProgress 树
      （屏幕上显示）                   （构建中的新树）
          root                              root
         /    \                            /    \
    fiberA   fiberB                  fiberA'   fiberB'
        \       \                        |        \
      fiberC   fiberD                  fiberC'   fiberD'

    渲染完成后：
    root.current = workInProgress  （切换指针，O(1)）
```

**好处**：
- 用户始终看到完整状态，看不到渲染中间过程
- 中断后可丢弃 wip 重新构建，无需回滚
- 切换成本极低（指针替换）

### 七、时间切片（Time Slicing）

```javascript
// 简化版 workLoop
function workLoopConcurrent() {
  while (workInProgress !== null && !shouldYield()) {
    workInProgress = performUnitOfWork(workInProgress);
  }
}

// shouldYield：判断是否需要让出主线程
function shouldYield() {
  // 默认 5ms 时间片
  return performance.now() >= deadline;
}

// 调度通道（React 17+）
const channel = new MessageChannel();
channel.port1.onmessage = performWorkUntilDeadline;
scheduleWork = () => channel.port2.postMessage(null);
```

**为什么用 MessageChannel 而不是 setTimeout / requestIdleCallback？**

| 方案 | 问题 |
|------|------|
| `setTimeout(fn, 0)` | 最低 4ms 延迟；嵌套 5 层后最小间隔 ≥ 4ms，且属于宏任务末尾 |
| `requestIdleCallback` | 兼容性差、调度时机不可控，浏览器空闲才触发 |
| `requestAnimationFrame` | 一帧只触发一次，不可控 |
| `MessageChannel` ✅ | 异步宏任务，时机可控，几乎所有浏览器支持 |

### 八、优先级调度

React Scheduler 中的五个优先级：

| 优先级 | 数值 | 超时时间 | 场景 |
|--------|------|----------|------|
| ImmediatePriority | 1 | -1ms | 同步任务、离散用户输入（click、keydown） |
| UserBlockingPriority | 2 | 250ms | drag、scroll、hover |
| NormalPriority | 3 | 5000ms | setState 默认、Promise 回调 |
| LowPriority | 4 | 10000ms | 数据请求结果、可延迟通知 |
| IdlePriority | 5 | ∞ | 分析上报、预渲染 |

**Lane 模型**（React 17+）：每个更新分配一个或多个 bit 位（车道），同优先级更新合并，不同优先级可以插队。

```jsx
// React 18 使用 Transition 标记低优先级更新
import { useTransition } from 'react';

function App() {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    // 高优先级：用户输入
    setInputValue(input);

    // 低优先级：可中断、可延迟
    startTransition(() => {
      setSearchResults(bigArray.filter(...));
    });
  };
}
```

### 九、Diff 算法在 Fiber 上的实现

**Diff 三原则**：
1. 同层比较，不跨层级（DOM 节点跨层级移动代价大，直接重建）
2. 不同 `type` 的组件视为不同树，整棵替换
3. `key` 帮助复用节点（列表渲染必须给稳定 key）

Diff 完成后在对应 Fiber 上打 `flags`：
- `Placement`：插入或移动
- `Update`：属性变化
- `Deletion`：删除节点
- `ChildDeletion`：子节点被删除
- `Ref` / `Callback` 等

最后通过 `firstEffect → nextEffect` 链表串起来，Commit 阶段只遍历这个链表，不必扫整棵树。

### 十、Fiber 架构优势

1. **可中断渲染**：大组件不再阻塞主线程
2. **多优先级调度**：用户交互永远优先于数据更新
3. **更好的动画流畅度**：60fps（每帧 16.6ms）
4. **Suspense**：声明式异步加载
5. **并发特性（React 18）**：自动批处理、Transitions、Suspense 改进

### 十一、Fiber 与 Stack 架构对比

| 特性 | Stack（React 15） | Fiber（React 16+） |
|------|------------------|-------------------|
| 更新方式 | 同步递归 | 异步可中断 |
| 任务调度 | 无 | 优先级队列 |
| 时间切片 | 不支持 | 支持（5ms） |
| 中断恢复 | 不支持 | 支持 |
| 优先级 | 无 | 多级 |
| 双缓冲 | 无 | current / workInProgress |
| 并发渲染 | 不支持 | 支持（React 18+） |
| 数据结构 | 树 | 链表 |

### 十二、Scheduler 实现简析

```javascript
// 伪代码
function scheduleCallback(priorityLevel, callback) {
  const startTime = performance.now();
  const expirationTime = startTime + timeoutForPriority[priorityLevel];

  const newTask = {
    id: taskIdCounter++,
    callback,
    priorityLevel,
    startTime,
    expirationTime,
  };

  // 推入按 expirationTime 排序的小顶堆
  push(taskQueue, newTask);

  // 请求宿主调度
  requestHostCallback(flushWork);
}
```

内部用**小顶堆**（按 expirationTime 排序）实现优先级队列，过期任务会强制同步执行。

### 十三、高频面试题

#### Q1：Fiber 是什么？解决了什么问题？

**答**：Fiber 是 React 16 引入的协调算法，本质是把同步不可中断的递归渲染改成可中断的异步渲染。解决的核心问题是：大组件渲染阻塞主线程导致掉帧和交互卡顿。

#### Q2：Fiber 节点和 React 元素有什么区别？

**答**：React 元素是 `createElement` 创建的轻量描述对象，每次渲染都重新生成；Fiber 节点是组件实例的持久化结构，保存 props / state / 副作用 / 调度信息，可在多次渲染间复用。

#### Q3：为什么 Fiber 用链表而不是树？

**答**：链表可以通过 `child / sibling / return` 三指针灵活遍历，便于随时中断和恢复当前工作单元，无需维护完整的递归调用栈。

#### Q4：Render 阶段和 Commit 阶段的区别？

| 阶段 | 是否可中断 | 工作内容 |
|------|-----------|---------|
| Render | ✅ 可中断 | 构建 Fiber 树、diff、打 effect 标记 |
| Commit | ❌ 不可中断 | 操作真实 DOM、执行同步生命周期、切换 current |

**Commit 不可中断的原因**：DOM 操作必须保证一致性，否则用户会看到半新半旧的残缺状态。

#### Q5：setState 是同步还是异步？

**答**：React 18 中所有 `setState` 都是异步批处理（统一在下一个微任务或宏任务集中提交），包括定时器、Promise、原生事件回调里都自动批处理。React 17 及之前在 React 管理的回调（合成事件、生命周期）里是异步批处理，在 `setTimeout` / 原生事件监听里是同步。

#### Q6：Fiber 是怎么实现可中断的？

**答**：三点关键：
1. **链表结构**：遍历可以暂停在任意节点
2. **时间切片**：每个工作单元完成后 `shouldYield()` 判断是否需要让出主线程
3. **优先级调度**：高优先级任务可以打断低优先级任务，被打断的任务从断点继续

#### Q7：为什么 Vue 不需要 Fiber？

**答**：
- Vue 的**细粒度响应式**（基于 Proxy）能精确追踪依赖，只有使用到某数据的组件会重渲染
- Vue 模板**编译期**做静态分析，标记静态节点和动态绑定，更新范围天然就小
- 因此 Vue 不需要遍历整棵组件树，也不必可中断渲染

#### Q8：什么是双缓冲？有什么好处？

**答**：同时维护两棵 Fiber 树，`current` 树对应屏幕，`workInProgress` 树在内存中构建。提交时只需交换 `root.current` 指针，用户始终看到完整状态，零白屏切换。

#### Q9：Concurrent Mode 解决了什么问题？

**答**：让 React 可以同时准备多个版本的 UI，根据用户交互选择最合适的版本呈现。解决：长任务阻塞输入响应、加载状态闪烁、过渡 UI 卡顿三大问题。

#### Q10：useEffect 和 useLayoutEffect 在 Fiber 流程中的差别？

| | useEffect | useLayoutEffect |
|---|---|---|
| 执行时机 | Commit 之后（异步、浏览器绘制后） | Commit 阶段中 Layout 子阶段（DOM 更新后、绘制前） |
| 是否阻塞渲染 | 否 | 是 |
| 用途 | 数据请求、订阅、副作用 | DOM 测量、布局调整 |

### 十四、面试 90 秒回答模板

> **"Fiber 是 React 16 引入的协调算法，本质是把同步递归渲染改成异步可中断的渲染。**
>
> **它解决的核心问题是：大组件渲染时同步阻塞主线程，导致掉帧和交互卡顿。**
>
> **实现上有三个关键点：**
>
> 1. **数据结构**——把虚拟 DOM 改成链表 Fiber 节点，用 `child、sibling、return` 三指针连接，能随时中断和恢复。
>
> 2. **时间切片**——引入 Scheduler 调度器，每 5ms 检查一次是否需要让出主线程，用 MessageChannel 继续调度，避免阻塞渲染。
>
> 3. **优先级**——区分 Immediate、UserBlocking、Normal、Low、Idle 五级，用户输入等高优先级任务可以打断低优先级渲染。
>
> **整个流程分两阶段：Render 阶段做 diff、打 effect 标记（可中断）；Commit 阶段一次性操作 DOM（不可中断）。通过 current 与 workInProgress 双缓冲切换指针，零成本切换 UI。**
>
> **这也是 React 18 并发特性的基础。**"

---


---


## 2. React生命周期有哪些？

React生命周期主要分为类组件生命周期和函数组件生命周期（通过Hooks实现）。

### 类组件生命周期

#### 挂载阶段（Mounting）

1. **constructor()**
   - 初始化state，绑定方法
   - 是类组件构造函数，最先执行
   - 示例：
   ```jsx
   constructor(props) {
     super(props);
     this.state = { count: 0 };
     this.handleClick = this.handleClick.bind(this);
   }
   ```

2. **static getDerivedStateFromProps()**
   - 从props派生state
   - 在render之前调用，每次渲染都会调用
   - 返回对象来更新state，返回null表示不更新
   - 示例：
   ```jsx
   static getDerivedStateFromProps(props, state) {
     if (props.userId !== state.prevUserId) {
       return { userId: props.userId, prevUserId: props.userId };
     }
     return null;
   }
   ```

3. **render()**
   - 渲染UI，必须实现的方法
   - 纯函数，不能在此修改state
   - 返回JSX、React元素、数组、Fragment、字符串、数字、布尔值、null、Portal

4. **componentDidMount()**
   - DOM挂载后立即调用
   - 适合发送网络请求、订阅事件、操作DOM
   - 示例：
   ```jsx
   componentDidMount() {
     this.fetchData();
     this.timer = setInterval(this.tick, 1000);
   }
   ```

#### 更新阶段（Updating）

1. **static getDerivedStateFromProps()**
   - 同挂载阶段

2. **shouldComponentUpdate()**
   - 性能优化，控制是否重新渲染
   - 返回false则不更新
   - 默认返回true
   - 示例：
   ```jsx
   shouldComponentUpdate(nextProps, nextState) {
     return this.props.count !== nextProps.count;
   }
   ```

3. **render()**
   - 同挂载阶段

4. **getSnapshotBeforeUpdate()**
   - 在最近一次渲染输出（提交到DOM节点）之前调用
   - 返回值作为componentDidUpdate的第三个参数
   - 示例：
   ```jsx
   getSnapshotBeforeUpdate(prevProps, prevState) {
     if (prevProps.list.length < this.props.list.length) {
       const list = this.listRef.current;
       return list.scrollHeight - list.scrollTop;
     }
     return null;
   }
   ```

5. **componentDidUpdate()**
   - 更新后调用
   - 可以进行DOM操作、网络请求（需要条件判断）
   - 示例：
   ```jsx
   componentDidUpdate(prevProps, prevState, snapshot) {
     if (this.props.userId !== prevProps.userId) {
       this.fetchData();
     }
     if (snapshot !== null) {
       const list = this.listRef.current;
       list.scrollTop = list.scrollHeight - snapshot;
     }
   }
   ```

#### 卸载阶段（Unmounting）

1. **componentWillUnmount()**
   - 组件卸载和销毁之前调用
   - 清理定时器、取消网络请求、取消订阅
   - 示例：
   ```jsx
   componentWillUnmount() {
     clearInterval(this.timer);
     this.unsubscribe();
   }
   ```

#### 错误处理

1. **static getDerivedStateFromError()**
   - 后代组件抛出错误后调用
   - 返回值更新state
   - 示例：
   ```jsx
   static getDerivedStateFromError(error) {
     return { hasError: true };
   }
   ```

2. **componentDidCatch()**
   - 后代组件抛出错误后调用
   - 记录错误日志
   - 示例：
   ```jsx
   componentDidCatch(error, errorInfo) {
     logErrorToService(error, errorInfo);
   }
   ```

### 函数组件生命周期

函数组件通过Hooks模拟生命周期：

```jsx
function Example() {
  // 相当于 constructor 和 componentDidMount + componentDidUpdate
  const [count, setCount] = useState(0);

  // 相当于 componentDidMount
  useEffect(() => {
    console.log('组件挂载');
    return () => {
      console.log('组件卸载'); // 相当于 componentWillUnmount
    };
  }, []);

  // 相当于 componentDidMount + componentDidUpdate（count变化时）
  useEffect(() => {
    console.log('count更新了', count);
  }, [count]);

  // 相当于 componentDidMount + componentDidUpdate（每次渲染）
  useEffect(() => {
    console.log('每次渲染都执行');
  });

  // 同步执行，在DOM变更后同步调用
  useLayoutEffect(() => {
    // DOM操作
  }, []);

  return <div>{count}</div>;
}
```

### 生命周期对比表

| 类组件生命周期 | 函数组件Hook | 说明 |
|--------------|------------|------|
| constructor | useState | 初始化状态 |
| getDerivedStateFromProps | 更新逻辑在渲染期间 | 派生state |
| render | 函数体 | 渲染UI |
| componentDidMount | useEffect(() => {}, []) | 挂载完成 |
| componentDidUpdate | useEffect(() => {}, [deps]) | 更新完成 |
| componentWillUnmount | useEffect返回清理函数 | 卸载前 |
| shouldComponentUpdate | React.memo | 控制渲染 |
| getSnapshotBeforeUpdate | useLayoutEffect | 获取快照 |
| getDerivedStateFromError | Error Boundary | 错误处理 |
| componentDidCatch | Error Boundary | 错误捕获 |

---

## 3. React Hooks有哪些？

React Hooks是React 16.8引入的新特性，让函数组件拥有状态和生命周期。

### 常用 Hooks

#### 1. useState - 状态管理

```jsx
const [state, setState] = useState(initialState);

// 函数式更新
setState(prevState => ({ ...prevState, count: prevState.count + 1 }));

// 惰性初始化
const [state, setState] = useState(() => {
  const initialState = expensiveComputation();
  return initialState;
});
```

**特点：**
- 返回当前state和更新函数
- 更新函数不会合并state（与类组件不同）
- 初始值只会在首次渲染时使用

#### 2. useEffect - 副作用处理

```jsx
// 每次渲染后执行
useEffect(() => {
  console.log('每次渲染');
});

// 挂载时执行一次
useEffect(() => {
  console.log('挂载');
  return () => console.log('卸载'); // 清理函数
}, []);

// 依赖项变化时执行
useEffect(() => {
  console.log('count变化', count);
}, [count]);
```

**特点：**
- 在渲染后执行
- 返回清理函数
- 通过依赖数组控制执行时机
- 建议添加所有使用到的外部变量到依赖数组

#### 3. useContext - 跨组件状态共享

```jsx
const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Button() {
  const theme = useContext(ThemeContext);
  return <button theme={theme}>按钮</button>;
}
```

**特点：**
- 订阅Context变化
- 避免prop drilling
- 性能：当Provider值变化时，所有消费者都会重新渲染

#### 4. useReducer - 复杂状态管理

```jsx
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </>
  );
}
```

**特点：**
- 适合复杂状态逻辑
- 可以替代Redux的部分功能
- 惰性初始化：`useReducer(reducer, initialArg, init)`

#### 5. useCallback - 缓存函数

```jsx
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b]
);
```

**特点：**
- 返回缓存的回调函数
- 依赖项不变则返回相同引用
- 用于优化子组件渲染

#### 6. useMemo - 缓存计算结果

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

**特点：**
- 返回缓存的计算结果
- 依赖项不变则不重新计算
- 避免昂贵的计算

#### 7. useRef - 获取DOM或存储可变值

```jsx
// 获取DOM
const inputRef = useRef(null);
<input ref={inputRef} />

// 存储可变值（不触发重新渲染）
const countRef = useRef(0);
countRef.current++;
```

**特点：**
- 返回可变ref对象
- current属性可读写
- 变更不会触发重新渲染
- 在整个生命周期保持不变

#### 8. useImperativeHandle - 自定义暴露给父组件的实例值

```jsx
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} />;
}
FancyInput = forwardRef(FancyInput);
```

#### 9. useLayoutEffect - 同步副作用

```jsx
useLayoutEffect(() => {
  // 在DOM变更后同步执行
  // 阻塞浏览器绘制
});
```

**特点：**
- 在所有DOM变更后同步触发
- 阻塞浏览器绘制
- 适合读取DOM布局并同步重绘

#### 10. useDebugValue（开发调试用）

用于在 React DevTools 中显示自定义 Hook 的标签，**仅开发调试使用**。

```jsx
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);
  useDebugValue(isOnline ? 'Online' : 'Offline');
  return isOnline;
}
```

### 其他 Hooks

- **useId** - 生成唯一ID（React 18+）
- **useTransition** - 标记非紧急更新（React 18+）
- **useDeferredValue** - 延迟更新（React 18+）
- **useSyncExternalStore** - 订阅外部store（React 18+）
- **useInsertionEffect** - CSS-in-JS库专用（React 18+）

### 自定义 Hooks 规则

1. **必须以 `use` 开头**
   - React通过命名约定识别Hook
   - eslint-plugin-react-hooks会检查

2. **可以调用其他 Hooks**
   ```jsx
   function useWindowSize() {
     const [size, setSize] = useState({ width: 0, height: 0 });

     useEffect(() => {
       const handleResize = () => {
         setSize({ width: window.innerWidth, height: window.innerHeight });
       };
       window.addEventListener('resize', handleResize);
       return () => window.removeEventListener('resize', handleResize);
     }, []);

     return size;
   }
   ```

3. **只能在函数组件或其他自定义Hook中调用**
   - 不能在普通函数中调用
   - 不能在循环、条件或嵌套函数中调用

4. **自定义Hook共享状态逻辑，不共享state本身**
   ```jsx
   function Form() {
     const [name, setName] = useInput(''); // 两个独立的状态
     const [email, setEmail] = useInput('');
   }
   ```

---

## 4. 类组件和函数组件有什么区别？

### 对比表

| 特性 | 类组件 | 函数组件 |
|------|--------|----------|
| 语法 | ES6 Class | 函数 |
| 生命周期 | 完整生命周期方法 | Hooks实现 |
| 状态管理 | this.state | useState/useReducer |
| this指向 | 需要绑定 | 无this |
| 性能 | 相对较重 | 轻量，易优化 |
| 代码复用 | HOC、Render Props | 自定义Hooks |
| 推荐程度 | 逐渐淘汰 | 官方推荐 |
| 闭包问题 | 无 | 可能存在闭包陷阱 |
| 副作用 | 分散在生命周期 | useEffect统一管理 |
| 测试 | 较复杂 | 简单（纯函数） |

### 类组件示例

```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.title = `Count: ${this.state.count}`;
  }

  componentDidUpdate() {
    document.title = `Count: ${this.state.count}`;
  }

  handleClick() {
    this.setState(prevState => ({ count: prevState.count + 1 }));
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
}
```

### 函数组件示例

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+</button>
    </div>
  );
}
```

### 函数组件的优势

1. **更简洁**
   - 无需constructor、bind
   - 代码量少30%-50%

2. **更易理解**
   - 无this困扰
   - 函数式编程思维

3. **更易测试**
   - 纯函数，输入确定输出确定
   - 无副作用

4. **更好的逻辑复用**
   - 自定义Hooks
   - 避免HOC嵌套地狱

5. **更小的包体积**
   - 无需实例化
   - Tree-shaking更友好

### 函数组件的注意事项

1. **闭包陷阱**
   ```jsx
   // 错误示例
   useEffect(() => {
     const id = setInterval(() => {
       setCount(count + 1); // count是闭包中的旧值
     }, 1000);
     return () => clearInterval(id);
   }, []);

   // 正确示例
   useEffect(() => {
     const id = setInterval(() => {
       setCount(c => c + 1); // 使用函数式更新
     }, 1000);
     return () => clearInterval(id);
   }, []);
   ```

2. **依赖数组管理**
   - ESLint插件：eslint-plugin-react-hooks
   - 建议添加所有使用的外部变量

3. **不能在条件语句中使用Hooks**
   ```jsx
   // 错误
   if (condition) {
     const [count, setCount] = useState(0);
   }

   // 正确
   const [count, setCount] = useState(0);
   if (condition) {
     // 使用count
   }
   ```

---

## 5. 虚拟DOM是什么？有什么优势？

### 什么是虚拟DOM

虚拟DOM（Virtual DOM）是真实DOM的JavaScript对象表示。React使用虚拟DOM来优化UI更新。

### 虚拟DOM结构

```jsx
// JSX
const element = <div className="container">Hello</div>;

// 编译后
const element = React.createElement('div', { className: 'container' }, 'Hello');

// 虚拟DOM对象
{
  type: 'div',
  props: {
    className: 'container',
    children: 'Hello'
  },
  key: null,
  ref: null
}
```

### 工作流程

```
1. JSX → React.createElement()
2. 生成虚拟DOM树
3. Diff算法比较新旧虚拟DOM
4. 计算最小差异
5. 批量更新真实DOM
```

### 优势

1. **减少DOM操作**
   - 直接操作DOM成本高
   - 虚拟DOM将多次更新合并为一次
   - 最小化重排和重绘

2. **跨浏览器兼容**
   - 抽象层处理浏览器差异
   - 统一的事件系统

3. **批量更新**
   - 自动批处理state更新
   - 减少渲染次数

4. **声明式编程**
   - 描述UI应该是什么样子
   - React处理如何更新

5. **开发体验**
   - JSX语法直观
   - 组件化开发

### 性能对比

```jsx
// 直接操作DOM - 慢
for (let i = 0; i < 1000; i++) {
  const div = document.createElement('div');
  document.body.appendChild(div);
}

// 虚拟DOM - 快
const elements = [];
for (let i = 0; i < 1000; i++) {
  elements.push(<div key={i} />);
}
ReactDOM.render(<div>{elements}</div>, document.body);
```

### 虚拟DOM不是银弹

- **首次渲染**：比直接innerHTML慢（需要创建虚拟DOM）
- **小规模更新**：可能比直接DOM操作慢
- **适用场景**：中大规模、频繁更新的应用

### 与其他方案对比

| 方案 | 优势 | 劣势 |
|------|------|------|
| 原生DOM | 直接控制，首次渲染快 | 操作复杂，性能差 |
| 虚拟DOM | 声明式，批量更新 | 首次渲染慢，内存占用 |
| Svelte | 编译时优化，无运行时 | 生态较小 |


## 6. useState和useReducer有什么区别？

### 核心区别

| 特性 | useState | useReducer |
|------|----------|------------|
| 使用场景 | 简单状态管理 | 复杂状态逻辑 |
| 状态更新方式 | 直接设置新值 | 通过 dispatch 发送 action |
| 逻辑复用 | 需重复编写 | reducer 函数可复用 |
| 调试 | 相对简单 | 可记录 action 历史 |
| 性能 | 相同 | 相同 |

### useState 示例

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
      <button onClick={increment}>+</button>
    </div>
  );
}
```

### useReducer 示例

```jsx
const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'decrement':
      return { ...state, count: state.count - state.step };
    case 'setStep':
      return { ...state, step: action.payload };
    case 'reset':
      return initialState;
    default:
      throw new Error('Unknown action type');
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <input
        type="number"
        value={state.step}
        onChange={e => dispatch({ type: 'setStep', payload: Number(e.target.value) })}
      />
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </div>
  );
}
```

### 选择使用场景

**使用 useState：**
- 状态逻辑简单
- 状态之间无关联
- 不需要复杂的状态转换

**使用 useReducer：**
- 状态逻辑复杂，包含多个子状态
- 状态更新逻辑复杂
- 需要复用状态逻辑
- 状态变化需要记录和调试

---

## 7. useEffect和useLayoutEffect有什么区别？

### 执行时机对比

```
组件渲染流程：
1. 组件函数执行（render）
2. React 更新 DOM
3. useLayoutEffect 执行（同步，阻塞绘制）
4. 浏览器绘制屏幕
5. useEffect 执行（异步，不阻塞绘制）
```

### 对比表

| 特性 | useEffect | useLayoutEffect |
|------|-----------|-----------------|
| 执行时机 | 浏览器绘制后 | 浏览器绘制前 |
| 是否阻塞 | 否 | 是 |
| 使用场景 | 大多数副作用 | DOM 测量和操作 |
| 性能影响 | 小 | 可能阻塞渲染 |
| SSR 支持 | 是 | 需要处理水合问题 |

### useEffect 示例

```jsx
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 在浏览器绘制后执行
    console.log('Effect ran:', count);
    document.title = `Count: ${count}`;

    return () => {
      console.log('Cleanup:', count);
    };
  }, [count]);

  return <button onClick={() => setCount(c => c + 1)}>+</button>;
}
```

### useLayoutEffect 示例

```jsx
function Tooltip() {
  const tooltipRef = useRef();
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    // 在绘制前测量 DOM，避免闪烁
    const rect = tooltipRef.current.getBoundingClientRect();
    setPosition({
      top: rect.bottom + 10,
      left: rect.left + rect.width / 2
    });
  }, []);

  return (
    <div ref={tooltipRef} style={{ top: position.top, left: position.left }}>
      Tooltip content
    </div>
  );
}
```

### 最佳实践

1. **优先使用 useEffect**
   - 除非遇到闪烁问题，否则不需要 useLayoutEffect

2. **useLayoutEffect 使用场景**
   - 需要读取 DOM 布局并同步修改
   - 需要防止视觉不一致
   - 动画初始位置设置

3. **SSR 注意事项**
   ```jsx
   import { useEffect, useLayoutEffect } from 'react';

   const useIsomorphicLayoutEffect = typeof window !== 'undefined'
     ? useLayoutEffect
     : useEffect;
   ```

---

## 8. useMemo和useCallback有什么区别？

### 核心概念

| 特性 | useMemo | useCallback |
|------|---------|-------------|
| 缓存内容 | 计算结果（值） | 函数引用 |
| 返回值 | 缓存的值 | 缓存的函数 |
| 使用场景 | 昂贵计算 | 子组件优化 |
| 依赖项 | 值变化时重新计算 | 值变化时重新创建函数 |

### useMemo 示例

```jsx
function ExpensiveComponent({ data, filter }) {
  // 缓存过滤后的结果，避免每次渲染都重新计算
  const filteredData = useMemo(() => {
    console.log('Filtering data...');
    return data.filter(item => item.includes(filter));
  }, [data, filter]);

  return (
    <ul>
      {filteredData.map(item => <li key={item}>{item}</li>)}
    </ul>
  );
}
```

### useCallback 示例

```jsx
function Parent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // 缓存函数，避免 Child 不必要的重渲染
  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <Child onClick={handleClick} />
      <p>Count: {count}</p>
    </div>
  );
}

const Child = React.memo(function Child({ onClick }) {
  console.log('Child rendered');
  return <button onClick={onClick}>Increment</button>;
});
```

### 实际关系

```jsx
// 这两个是等价的
const memoizedValue = useMemo(() => (a, b) => doSomething(a, b), [a, b]);
const memoizedCallback = useCallback((a, b) => doSomething(a, b), [a, b]);
```

### 使用建议

1. **不要过度使用**
   - 缓存本身也有开销
   - 简单计算不需要 useMemo

2. **配合 React.memo 使用**
   - useCallback 主要用于优化子组件
   - 单独使用 useCallback 没有意义

3. **正确设置依赖项**
   ```jsx
   // 错误：遗漏依赖
   const handleClick = useCallback(() => {
     console.log(count);
   }, []); // count 变化时不会更新

   // 正确
   const handleClick = useCallback(() => {
     console.log(count);
   }, [count]);
   ```

### 使用场景详解

**使用 useMemo 的场景：**

1. **昂贵的计算**
   ```jsx
   function Dashboard({ items }) {
     // 避免每次渲染都重新计算统计数据
     const stats = useMemo(() => {
       return {
         total: items.reduce((sum, item) => sum + item.value, 0),
         average: items.reduce((sum, item) => sum + item.value, 0) / items.length,
         max: Math.max(...items.map(i => i.value))
       };
     }, [items]);

     return <StatsDisplay stats={stats} />;
   }
   ```

2. **防止对象/数组引用变化导致子组件重渲染**
   ```jsx
   function ChartContainer({ data }) {
     // 避免每次渲染都创建新对象，导致 Chart 重渲染
     const chartOptions = useMemo(() => ({
       responsive: true,
       plugins: {
         legend: { position: 'top' },
         title: { display: true, text: 'Sales Chart' }
       }
     }), []);

     return <Chart data={data} options={chartOptions} />;
   }
   ```

3. **保持对象稳定用于其他 Hook 依赖**
   ```jsx
   function UserProfile({ userId, filters }) {
     // 保持 query 对象引用稳定
     const query = useMemo(() => ({
       userId,
       ...filters
     }), [userId, filters]);

     // 只有 query 实际内容变化时才重新获取
     useEffect(() => {
       fetchUserData(query);
     }, [query]);
   }
   ```

**使用 useCallback 的场景：**

1. **传递给子组件的事件处理函数**
   ```jsx
   function TodoList({ todos, onToggle, onDelete }) {
     return (
       <ul>
         {todos.map(todo => (
           <TodoItem
             key={todo.id}
             todo={todo}
             onToggle={() => onToggle(todo.id)}
             onDelete={() => onDelete(todo.id)}
           />
         ))}
       </ul>
     );
   }

   const MemoTodoList = React.memo(TodoList);

   function App() {
     const [todos, setTodos] = useState([]);

     // 缓存回调，避免 MemoTodoList 不必要的重渲染
     const handleToggle = useCallback((id) => {
       setTodos(prev => prev.map(todo =>
         todo.id === id ? { ...todo, completed: !todo.completed } : todo
       ));
     }, []);

     const handleDelete = useCallback((id) => {
       setTodos(prev => prev.filter(todo => todo.id !== id));
     }, []);

     return <MemoTodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />;
   }
   ```

2. **作为其他 Hook 的依赖**
   ```jsx
   function SearchComponent({ onSearch }) {
     const [query, setQuery] = useState('');

     // 缓存搜索函数
     const debouncedSearch = useCallback(
       debounce((q) => onSearch(q), 300),
       [onSearch]
     );

     useEffect(() => {
       debouncedSearch(query);
     }, [query, debouncedSearch]); // debouncedSearch 引用稳定

     return <input value={query} onChange={e => setQuery(e.target.value)} />;
   }
   ```

3. **useEffect 中需要引用的函数**
   ```jsx
   function ChatRoom({ roomId }) {
     // 缓存函数，避免 useEffect 频繁触发
     const createConnection = useCallback(() => {
       return new ChatConnection(roomId);
     }, [roomId]);

     useEffect(() => {
       const connection = createConnection();
       connection.connect();
       return () => connection.disconnect();
     }, [createConnection]);
   }
   ```

**不需要使用的情况：**

```jsx
// ❌ 简单计算，缓存开销大于收益
const double = useMemo(() => count * 2, [count]);

// ✅ 直接计算更简单
const double = count * 2;

// ❌ 每次依赖都变化，缓存无意义
const value = useMemo(() => compute(a), [a]); // a 每次渲染都变

// ❌ 内联函数不需要 useCallback
<button onClick={useCallback(() => setShow(true), [])}>Show</button>

// ✅ 直接写更简单
<button onClick={() => setShow(true)}>Show</button>
```

---

## 9. React.memo的作用是什么？

### 基本概念

React.memo 是一个高阶组件，用于对函数组件进行性能优化。它会对组件的 props 进行浅比较，如果 props 没有变化，则跳过渲染，直接使用上一次的渲染结果。

### 使用方式

```jsx
// 基本用法
const MyComponent = React.memo(function MyComponent(props) {
  return <div>{props.name}</div>;
});

// 使用自定义比较函数
const MyComponent = React.memo(
  function MyComponent(props) {
    return <div>{props.name}</div>;
  },
  (prevProps, nextProps) => {
    // 返回 true 表示不重新渲染
    return prevProps.id === nextProps.id;
  }
);
```

### 工作原理

```jsx
// 父组件
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Count: {count}
      </button>
      <Child name="Alice" /> // 不会随 count 变化而重新渲染
    </div>
  );
}

// 使用 React.memo 的子组件
const Child = React.memo(function Child({ name }) {
  console.log('Child rendered'); // 只在 name 变化时打印
  return <div>Hello, {name}</div>;
});
```

### 注意事项

1. **浅比较限制**
   ```jsx
   // 即使使用 React.memo，以下情况仍会重新渲染
   function Parent() {
     const [count, setCount] = useState(0);
     const user = { name: 'Alice' }; // 每次渲染都是新对象

     return <Child user={user} />; // 始终触发重新渲染
   }

   // 解决方案
   function Parent() {
     const [count, setCount] = useState(0);
     const user = useMemo(() => ({ name: 'Alice' }), []);

     return <Child user={user} />;
   }
   ```

2. **函数 prop 的处理**
   ```jsx
   // 需要配合 useCallback
   function Parent() {
     const [count, setCount] = useState(0);

     // 错误：每次渲染都是新函数
     const handleClick = () => console.log('clicked');

     // 正确：缓存函数
     const handleClick = useCallback(() => {
       console.log('clicked');
     }, []);

     return <Child onClick={handleClick} />;
   }
   ```

### 适用场景

- 纯展示组件
- 渲染开销大的组件
- 频繁更新但 props 很少变化的组件

---

## 10. Context API如何使用？有什么局限？

### 基本使用

```jsx
// 1. 创建 Context
const ThemeContext = createContext('light');

// 2. 提供 Context
function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// 3. 消费 Context
function Button() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button
      style={{ background: theme === 'dark' ? '#333' : '#fff' }}
      onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
    >
      Toggle Theme
    </button>
  );
}
```

### 多个 Context

```jsx
const ThemeContext = createContext('light');
const UserContext = createContext(null);

function App() {
  return (
    <ThemeContext.Provider value={theme}>
      <UserContext.Provider value={user}>
        <Layout />
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

function Layout() {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);

  return <div className={theme}>{user.name}</div>;
}
```

### 性能优化

```jsx
// 问题：所有 Consumer 都会重新渲染
function App() {
  const [user, setUser] = useState({ name: 'Alice', age: 25 });

  return (
    <UserContext.Provider value={user}>
      <Child />
    </UserContext.Provider>
  );
}

// 解决方案 1：拆分 Context
const UserNameContext = createContext('');
const UserAgeContext = createContext(0);

// 解决方案 2：使用 useMemo
function App() {
  const [name, setName] = useState('Alice');
  const [age, setAge] = useState(25);

  const value = useMemo(() => ({ name, age }), [name, age]);

  return (
    <UserContext.Provider value={value}>
      <Child />
    </UserContext.Provider>
  );
}
```

### 局限

1. **性能问题**
   - Context value 变化会导致所有 Consumer 重新渲染
   - 无法细粒度控制订阅

2. **不适合高频更新**
   - 表单状态
   - 动画状态
   - 鼠标位置追踪

3. **调试困难**
   - 数据流不如 Redux 清晰
   - 难以追踪变化来源

### 适用场景

- 主题切换
- 用户认证信息
- 语言/国际化设置
- 全局配置

---

## 11. Redux核心概念是什么？

### 三大原则

1. **单一数据源**
   - 整个应用的 state 存储在一个对象树中
   - 便于状态管理和调试

2. **State 是只读的**
   - 唯一改变 state 的方法是触发 action
   - 确保状态变化可追踪

3. **使用纯函数执行修改**
   - Reducer 是纯函数
   - 接收旧 state 和 action，返回新 state

### 核心概念

```
Action → Dispatch → Reducer → Store → View
```

### Action

```javascript
// 普通 action
const incrementAction = {
  type: 'INCREMENT',
  payload: 1
};

// Action Creator
const increment = (amount) => ({
  type: 'INCREMENT',
  payload: amount
});

// 异步 Action（使用 redux-thunk）
const fetchUser = (userId) => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_USER_START' });
    try {
      const user = await api.fetchUser(userId);
      dispatch({ type: 'FETCH_USER_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'FETCH_USER_ERROR', payload: error.message });
    }
  };
};
```

### Reducer

```javascript
const initialState = {
  count: 0,
  user: null,
  loading: false
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + action.payload
      };
    case 'FETCH_USER_START':
      return {
        ...state,
        loading: true
      };
    case 'FETCH_USER_SUCCESS':
      return {
        ...state,
        loading: false,
        user: action.payload
      };
    default:
      return state;
  }
}
```

### Store

```javascript
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

// 订阅变化
store.subscribe(() => {
  console.log(store.getState());
});

// 派发 action
store.dispatch(increment(5));
```

### React 中使用

```jsx
import { Provider, useSelector, useDispatch } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

function Counter() {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => dispatch(increment(1))}>+</button>
    </div>
  );
}
```

### Redux Toolkit（现代推荐方式）

```javascript
import { createSlice, configureStore } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1; // 支持直接修改，底层使用 Immer
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    }
  }
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

const store = configureStore({
  reducer: counterSlice.reducer
});
```

---

## 12. MobX和Redux有什么区别？

### 核心区别

| 特性 | Redux | MobX |
|------|-------|------|
| 范式 | 函数式编程 | 面向对象/响应式编程 |
| 数据流 | 单向数据流 | 自动追踪依赖 |
| 学习曲线 | 较陡 | 较平缓 |
| 样板代码 | 较多 | 较少 |
| 状态修改 | 不可变，纯函数 | 可变，直接修改 |
| 调试工具 | Redux DevTools 强大 | 支持，但较弱 |
| 适用规模 | 大型应用 | 中小型应用 |

### Redux 示例

```jsx
// Action
const increment = () => ({ type: 'INCREMENT' });

// Reducer
function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    default:
      return state;
  }
}

// Component
function Counter() {
  const count = useSelector(state => state.counter);
  const dispatch = useDispatch();

  return <button onClick={() => dispatch(increment())}>{count}</button>;
}
```

### MobX 示例

```jsx
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';

// Store
class CounterStore {
  count = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increment() {
    this.count++; // 直接修改状态
  }

  get doubleCount() {
    return this.count * 2;
  }
}

const counterStore = new CounterStore();

// Component
const Counter = observer(function Counter() {
  return (
    <button onClick={() => counterStore.increment()}>
      {counterStore.count} (x2: {counterStore.doubleCount})
    </button>
  );
});
```

### 选择建议

**使用 Redux 当：**
- 团队熟悉函数式编程
- 需要强大的调试工具
- 应用规模大，状态复杂
- 需要严格的数据流控制

**使用 MobX 当：**
- 希望减少样板代码
- 喜欢面向对象风格
- 应用规模中等
- 需要快速开发

---

## 13. setState是同步还是异步？

### React 18 之前的差异

```jsx
class Example extends React.Component {
  state = { count: 0 };

  handleClick = () => {
    // 情况 1：React 事件处理中 - 异步批量更新
    this.setState({ count: this.state.count + 1 });
    console.log(this.state.count); // 0，还是旧值

    // 情况 2：setTimeout 中 - 同步更新
    setTimeout(() => {
      this.setState({ count: this.state.count + 1 });
      console.log(this.state.count); // 已更新
    }, 0);

    // 情况 3：原生事件 - 同步更新
    document.addEventListener('click', () => {
      this.setState({ count: this.state.count + 1 });
      console.log(this.state.count); // 已更新
    });
  };
}
```

### React 18 自动批处理

```jsx
function Example() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  const handleClick = () => {
    // React 18 中所有更新都会自动批处理
    setCount(c => c + 1);
    setFlag(f => !f);
    // 只会触发一次重新渲染
  };

  // 即使在 setTimeout、Promise 中也是批处理
  const handleAsync = () => {
    setTimeout(() => {
      setCount(c => c + 1);
      setFlag(f => !f);
      // 也只会触发一次重新渲染
    }, 0);
  };
}
```

### 如何获取最新值

```jsx
// 类组件 - 使用回调函数
this.setState({ count: this.state.count + 1 }, () => {
  console.log(this.state.count); // 最新值
});

// 函数组件 - 使用 useEffect
useEffect(() => {
  console.log(count); // 最新值
}, [count]);

// 或者使用 ref
const countRef = useRef(count);
countRef.current = count;
```

### flushSync 强制同步

```jsx
import { flushSync } from 'react-dom';

function Example() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    flushSync(() => {
      setCount(c => c + 1);
    });
    // 此时 DOM 已更新
    console.log(count); // 最新值
  };
}
```

---

## 14. React事件机制是怎样的？

### 合成事件（SyntheticEvent）

React 使用合成事件系统，它是对浏览器原生事件的跨浏览器包装器。

```jsx
function Button() {
  const handleClick = (event) => {
    // event 是合成事件对象
    console.log(event.type); // 'click'
    console.log(event.nativeEvent); // 原生 DOM 事件

    // 阻止默认行为
    event.preventDefault();

    // 阻止冒泡
    event.stopPropagation();
  };

  return <button onClick={handleClick}>Click</button>;
}
```

### 事件委托

React 17 之前：
- 所有事件委托到 document

React 17+：
- 事件委托到 React 应用的根 DOM 节点
- 避免与外部库的冲突

```jsx
// React 17+ 事件委托到 root 节点
<div id="root">
  <!-- 事件在这里捕获和处理 -->
  <button onClick={handleClick}>Click</button>
</div>
```

### 合成事件特点

```jsx
function Example() {
  const handleClick = (e) => {
    // 1. 跨浏览器兼容
    e.preventDefault();
    e.stopPropagation();

    // 2. 访问原生事件
    e.nativeEvent.stopImmediatePropagation();

    // 3. 持久化（React 17+ 不需要）
    // e.persist(); // 异步访问需要使用
  };

  return <div onClick={handleClick}>Example</div>;
}
```

### 事件池（React 16 及之前）

```jsx
// React 16 中，事件对象会被复用
function Example() {
  const handleClick = (e) => {
    // 错误：异步访问时事件对象已被清空
    setTimeout(() => {
      console.log(e.type); // null
    }, 0);

    // 正确：先持久化
    e.persist();
    setTimeout(() => {
      console.log(e.type); // 'click'
    }, 0);
  };
}
```

### 常用合成事件

| 事件类型 | 事件名 |
|---------|--------|
| 鼠标事件 | onClick, onMouseEnter, onMouseLeave |
| 表单事件 | onChange, onInput, onSubmit |
| 键盘事件 | onKeyDown, onKeyUp, onKeyPress |
| 焦点事件 | onFocus, onBlur |
| 触摸事件 | onTouchStart, onTouchMove, onTouchEnd |
| 拖拽事件 | onDrag, onDrop, onDragOver |

---

## 15. React Diff算法原理是什么？

### 三大策略

1. **Tree Diff**：跨层级节点很少移动，直接创建或删除
2. **Component Diff**：相同类型组件继续 Diff，不同类型直接替换
3. **Element Diff**：通过 key 优化同层级子节点比较

### Diff 流程

```
旧树                    新树
  A                       A
 / \                     /|\
B   C      ----->       B D C
    |                       |
    D                       E
```

### 同级比较（Element Diff）

```jsx
// 情况 1：末尾插入 - 高效
// 旧: A B C
// 新: A B C D
// 只需插入 D

// 情况 2：头部插入 - 低效（无 key）
// 旧: A B C
// 新: D A B C
// 依次比较：A≠D(替换), B≠A(替换), C≠B(替换), 插入 C

// 情况 3：使用 key 优化
// 旧: A B C (key: 1 2 3)
// 新: D A B C (key: 4 1 2 3)
// 通过 key 识别，只需在头部插入 D
```

### Key 的作用

```jsx
// 不使用 key 或使用 index 作为 key
{items.map((item, index) => (
  <li key={index}>{item.name}</li>
))}

// 列表重排时性能差
// [A, B, C] -> [C, A, B]
// index 0: A -> C (更新)
// index 1: B -> A (更新)
// index 2: C -> B (更新)

// 使用唯一 key
{items.map(item => (
  <li key={item.id}>{item.name}</li>
))}

// 只需移动 DOM 节点，不更新内容
```

### Diff 复杂度

- 最优：O(n)
- 最差：O(n)
- 放弃寻找最小操作，追求近似最优

---

## 16. Key的作用是什么？为什么不用索引？

### Key 的核心作用

1. **身份标识**：帮助 React 识别哪些元素改变了、添加了或删除了
2. **优化 Diff**：提高同层级子元素比较的效率
3. **保持状态**：确保组件状态与正确的 DOM 关联

### 使用 Index 作为 Key 的问题

```jsx
function List() {
  const [items, setItems] = useState([
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Cherry' }
  ]);

  // 问题：在列表头部插入新元素
  const addItem = () => {
    setItems([{ id: 4, name: 'Date' }, ...items]);
  };

  // 错误：使用 index 作为 key
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          <input type="checkbox" />
          {item.name}
        </li>
      ))}
    </ul>
  );
}
```

**问题分析：**
```
初始状态：
index 0: [ ] Apple (id: 1)
index 1: [ ] Banana (id: 2)
index 2: [ ] Cherry (id: 3)

在头部插入 Date 后：
index 0: [ ] Date (id: 4)   <- 复用了 Apple 的 input，状态错误！
index 1: [ ] Apple (id: 1)  <- 复用了 Banana 的 input
index 2: [ ] Banana (id: 2) <- 复用了 Cherry 的 input
index 3: [ ] Cherry (id: 3) <- 新建
```

### 正确使用 Key

```jsx
// 正确：使用唯一稳定的 key
<ul>
  {items.map(item => (
    <li key={item.id}>
      <input type="checkbox" />
      {item.name}
    </li>
  ))}
</ul>
```

### Key 使用规则

1. **同层级唯一**：兄弟节点间 key 必须唯一
2. **全局可重复**：不同层级的 key 可以相同
3. **稳定不变**：key 在组件生命周期内应保持稳定

```jsx
// 错误：使用随机数
<li key={Math.random()}>

// 错误：使用 Date.now()
<li key={Date.now()}>

// 正确：使用数据中的唯一标识
<li key={item.id}>

// 如果没有唯一标识，考虑数据结构设计
// 或在渲染前为数据添加唯一 id
```

---

## 17. 高阶组件（HOC）是什么？

### 基本概念

高阶组件是一个函数，接收一个组件并返回一个新的组件。用于复用组件逻辑。

```jsx
// HOC 基本结构
function withSubscription(WrappedComponent, selectData) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    componentDidMount() {
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange = () => {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    };

    render() {
      // 传递所有 props 和额外的 data
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}
```

### 常见 HOC 示例

```jsx
// Loading HOC
function withLoading(WrappedComponent) {
  return function({ isLoading, ...props }) {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return <WrappedComponent {...props} />;
  };
}

// Auth HOC
function withAuth(WrappedComponent) {
  return function(props) {
    const isAuthenticated = checkAuth();
    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }
    return <WrappedComponent {...props} />;
  };
}

// 使用
const ArticleWithLoading = withLoading(Article);
const DashboardWithAuth = withAuth(Dashboard);
```

### 注意事项

1. **不要修改原组件**
   ```jsx
   // 错误
   function HOC(Component) {
     Component.prototype.newMethod = () => {};
     return Component;
   }

   // 正确
   function HOC(Component) {
     return class NewComponent extends React.Component {
       render() {
         return <Component {...this.props} />;
       }
     };
   }
   ```

2. **传递 props**
   ```jsx
   render() {
     // 过滤掉 HOC 不需要的 props
     const { extraProp, ...passThroughProps } = this.props;

     // 注入新的 props
     const injectedProp = someStateOrInstanceMethod;

     return (
       <WrappedComponent
         injectedProp={injectedProp}
         {...passThroughProps}
       />
     );
   }
   ```

3. **displayName 调试**
   ```jsx
   function withSubscription(WrappedComponent) {
     class WithSubscription extends React.Component {
       /* ... */
     }

     WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
     return WithSubscription;
   }

   function getDisplayName(WrappedComponent) {
     return WrappedComponent.displayName || WrappedComponent.name || 'Component';
   }
   ```

### HOC 的替代方案

Hooks 出现后，大部分 HOC 可以用自定义 Hook 替代：

```jsx
// HOC 方式
const UserWithData = withData(User, '/api/user');

// Hook 方式
function User() {
  const user = useData('/api/user');
  return <div>{user.name}</div>;
}
```

---

## 18. Render Props是什么？

### 基本概念

Render Props 是一种在 React 组件之间共享代码的技术，通过一个值为函数的 prop 来实现。

```jsx
class MouseTracker extends React.Component {
  state = { x: 0, y: 0 };

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  };

  render() {
    return (
      <div onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

// 使用
function App() {
  return (
    <MouseTracker render={({ x, y }) => (
      <p>Mouse position: {x}, {y}</p>
    )} />
  );
}
```

### 常见模式

```jsx
// children 作为函数
<MouseTracker>
  {({ x, y }) => <p>Position: {x}, {y}</p>}
</MouseTracker>

// render 属性
<MouseTracker render={({ x, y }) => <p>Position: {x}, {y}</p>} />

// 组件内部实现
class MouseTracker extends React.Component {
  render() {
    return (
      <div onMouseMove={this.handleMouseMove}>
        {/* 优先使用 render prop，否则使用 children */}
        {this.props.render
          ? this.props.render(this.state)
          : this.props.children(this.state)}
      </div>
    );
  }
}
```

### 实际应用

```jsx
// DataFetcher 组件
function DataFetcher({ url, render }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return render({ data, loading });
}

// 使用
function UserList() {
  return (
    <DataFetcher
      url="/api/users"
      render={({ data, loading }) => {
        if (loading) return <div>Loading...</div>;
        return (
          <ul>
            {data.map(user => <li key={user.id}>{user.name}</li>)}
          </ul>
        );
      }}
    />
  );
}
```

### Render Props vs HOC

| 特性 | Render Props | HOC |
|------|-------------|-----|
| 组合灵活性 | 高 | 中等 |
| 命名冲突 | 少 | 可能有 props 命名冲突 |
| 嵌套问题 | 回调地狱 | 嵌套地狱 |
| 性能 | 注意内联函数 | 注意属性传递 |
| 现代推荐 | 被 Hooks 替代 | 被 Hooks 替代 |

---

## 19. Portal是什么？如何使用？

### 基本概念

Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的方案。

```jsx
import { createPortal } from 'react-dom';

function Modal({ children }) {
  return createPortal(
    children,
    document.getElementById('modal-root')
  );
}
```

### 使用场景

```jsx
function App() {
  return (
    <div className="app">
      <h1>My App</h1>
      <Modal>
        <div className="modal-content">
          <h2>Modal Title</h2>
          <p>This is rendered outside the app root!</p>
        </div>
      </Modal>
    </div>
  );
}

// HTML 结构
<body>
  <div id="root"></div>
  <div id="modal-root"></div>
</body>
```

### 事件冒泡

Portal 中的事件会按照 React 树结构冒泡，而不是 DOM 树：

```jsx
function Parent() {
  return (
    <div onClick={() => console.log('Parent clicked')}>
      <p>Parent content</p>
      <Modal>
        <button onClick={() => console.log('Button clicked')}>
          Click me
        </button>
      </Modal>
    </div>
  );
}

// 点击按钮时输出：
// 1. "Button clicked"
// 2. "Parent clicked" (事件冒泡到 Parent)
```

### 完整示例

```jsx
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>,
    document.body
  );
}

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Modal Content</h2>
        <p>This is rendered in document.body</p>
      </Modal>
    </div>
  );
}
```

### 适用场景

- 模态框（Modal）
- 提示框（Tooltip）
- 下拉菜单（Dropdown）
- 全局通知（Toast）

---

## 20. Error Boundary是什么？

### 基本概念

Error Boundary 是一种 React 组件，用于捕获并处理其子组件树中的 JavaScript 错误，防止整个应用崩溃。

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染显示降级 UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // 可以在这里记录错误日志
    console.error('Error caught by boundary:', error);
    console.error('Component stack:', errorInfo.componentStack);

    // 发送到错误追踪服务
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 可以自定义降级 UI
      return this.props.fallback || <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

### 使用方式

```jsx
function App() {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

// 局部错误边界
function UserPage() {
  return (
    <div>
      <h1>User Profile</h1>
      <ErrorBoundary fallback={<p>Failed to load avatar.</p>}>
        <UserAvatar />
      </ErrorBoundary>
      <ErrorBoundary fallback={<p>Failed to load info.</p>}>
        <UserInfo />
      </ErrorBoundary>
    </div>
  );
}
```

### 错误边界无法捕获的错误

- 事件处理中的错误（需要用 try/catch）
- 异步代码中的错误（需要用 try/catch）
- 服务端渲染中的错误
- 错误边界自身抛出的错误

```jsx
function Button() {
  const handleClick = () => {
    try {
      doSomethingRisky();
    } catch (error) {
      // 手动处理
      showErrorMessage(error);
    }
  };

  return <button onClick={handleClick}>Click</button>;
}
```

### 函数组件中的错误边界

React 16.8+ 还没有提供 Hooks 版本的 Error Boundary，需要使用库或自行封装：

```jsx
import { ErrorBoundary } from 'react-error-boundary';

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logError}
    >
      <ChildComponent />
    </ErrorBoundary>
  );
}

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
```

---

## 21. Suspense和React Lazy如何使用？

### 代码分割与懒加载

```jsx
import { lazy, Suspense } from 'react';

// 懒加载组件
const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

### 路由懒加载

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const User = lazy(() => import('./pages/User'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<GlobalLoading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

### 嵌套 Suspense

```jsx
function App() {
  return (
    <Suspense fallback={<GlobalSpinner />}>
      <Layout>
        <Suspense fallback={<PageSpinner />}>
          <LazyPage />
        </Suspense>
      </Layout>
    </Suspense>
  );
}
```

### React 18 数据获取 Suspense

```jsx
import { Suspense } from 'react';
import { fetchProfileData } from './api';

// 资源预加载
const resource = fetchProfileData();

function Profile() {
  return (
    <Suspense fallback={<Spinner />}>
      <ProfileHeader />
      <Suspense fallback={<Spinner />}>
        <ProfileTimeline />
      </Suspense>
    </Suspense>
  );
}

function ProfileHeader() {
  const user = resource.user.read(); // 如果未加载完成，会 throw Promise
  return <h1>{user.name}</h1>;
}

function ProfileTimeline() {
  const posts = resource.posts.read();
  return (
    <ul>
      {posts.map(post => <li key={post.id}>{post.text}</li>)}
    </ul>
  );
}
```

### 配合 Error Boundary

```jsx
<ErrorBoundary fallback={<ErrorPage />}>
  <Suspense fallback={<Loading />}>
    <LazyComponent />
  </Suspense>
</ErrorBoundary>
```

---

## 22. React性能优化有哪些方法？

### 1. 组件优化

```jsx
// React.memo - 避免不必要的重渲染
const MemoComponent = React.memo(function MyComponent({ data }) {
  return <div>{data}</div>;
});

// 自定义比较函数
const MemoComponent = React.memo(
  function MyComponent({ data }) {
    return <div>{data}</div>;
  },
  (prevProps, nextProps) => prevProps.id === nextProps.id
);
```

### 2. 缓存优化

```jsx
// useMemo - 缓存计算结果
const memoizedValue = useMemo(() => {
  return expensiveComputation(a, b);
}, [a, b]);

// useCallback - 缓存函数
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

### 3. 代码分割

```jsx
// React.lazy + Suspense
const LazyComponent = lazy(() => import('./LazyComponent'));

// 动态导入
function handleClick() {
  import('./heavyModule').then(module => {
    module.doSomething();
  });
}
```

### 4. 列表优化

```jsx
// 使用正确的 key
{items.map(item => (
  <Item key={item.id} data={item} />
))}

// 虚拟列表
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={500}
  itemCount={10000}
  itemSize={35}
>
  {({ index, style }) => (
    <div style={style}>Item {index}</div>
  )}
</FixedSizeList>
```

### 5. 状态优化

```jsx
// 避免不必要的状态提升
// 使用 Context 减少 props drilling

// 拆分 Context
const ThemeContext = createContext();
const UserContext = createContext();

// 使用 useMemo 缓存 Context value
const value = useMemo(() => ({ theme, toggleTheme }), [theme]);
```

### 6. 渲染优化

```jsx
// 条件渲染优化
{returnCondition && <Component />}

// 避免在渲染中创建新对象
// 错误
<Child style={{ color: 'red' }} />

// 正确
const style = useMemo(() => ({ color: 'red' }), []);
<Child style={style} />
```

### 7. 其他优化

```jsx
// 使用 React DevTools Profiler 分析性能

// 延迟加载非关键资源
// 图片懒加载
<img loading="lazy" src="image.jpg" />

// Web Workers 处理复杂计算
// Service Worker 缓存资源
```

---

## 23. React 18有哪些新特性？

### 1. 自动批处理（Automatic Batching）

```jsx
function App() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  function handleClick() {
    // React 18 中，所有更新都会自动批处理
    setCount(c => c + 1);
    setFlag(f => !f);
    // 只会触发一次重新渲染
  }

  // 异步代码中也支持自动批处理
  setTimeout(() => {
    setCount(c => c + 1);
    setFlag(f => !f);
    // 也只触发一次重新渲染
  }, 1000);
}
```

### 2. Transitions

```jsx
import { useTransition, useDeferredValue } from 'react';

function Search() {
  const [isPending, startTransition] = useTransition();
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    // 紧急更新：输入框响应
    setInputValue(e.target.value);

    // 非紧急更新：搜索列表
    startTransition(() => {
      setSearchQuery(e.target.value);
    });
  };

  return (
    <div>
      <input value={inputValue} onChange={handleChange} />
      {isPending && <Spinner />}
      <SearchResults query={searchQuery} />
    </div>
  );
}
```

### 3. Suspense 增强

```jsx
// React 18 支持 Suspense 在服务端渲染
function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Comments />
    </Suspense>
  );
}

// 数据获取与 Suspense 配合
function Comments() {
  // 这个组件会在数据准备好之前"挂起"
  const comments = useSuspenseData(fetchComments);
  return comments.map(comment => <p key={comment.id}>{comment.text}</p>);
}
```

### 4. 新的 Hooks

```jsx
// useId - 生成唯一 ID
function Form() {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>Name:</label>
      <input id={id} type="text" />
    </div>
  );
}

// useDeferredValue - 延迟更新
function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query);

  return (
    <div>
      {/* 使用 deferredQuery 进行搜索，保持输入框响应 */}
      <Results query={deferredQuery} />
    </div>
  );
}

// useSyncExternalStore - 订阅外部 store
function useOnlineStatus() {
  return useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true
  );
}

// useInsertionEffect - CSS-in-JS 库专用
function useCSS(rule) {
  useInsertionEffect(() => {
    // 在 DOM 变更前插入样式
    insertStyles(rule);
  }, [rule]);
}
```

### 5. Strict Mode 增强

```jsx
// React 18 Strict Mode 会故意双重调用某些函数
// 帮助检测副作用
<React.StrictMode>
  <App />
</React.StrictMode>
```

### 6. 新的 Root API

```jsx
// React 17
ReactDOM.render(<App />, document.getElementById('root'));

// React 18
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

// 支持并发特性
root.render(<App />);

// 卸载
root.unmount();
```

---

## 24. React服务端渲染（SSR）的优势？

### 基本概念

服务端渲染（SSR）是指在服务器端将 React 组件渲染为 HTML 字符串，然后发送到浏览器。

### 优势

1. **首屏加载更快**
   - 用户无需等待 JS 下载和执行就能看到内容
   - 减少白屏时间

2. **SEO 友好**
   - 搜索引擎爬虫可以直接抓取完整 HTML
   - 有利于搜索引擎排名

3. **社交分享优化**
   - 社交平台可以正确抓取页面标题、描述和图片

4. **更好的用户体验**
   - 在低性能设备上表现更好
   - 渐进式增强

### 实现方式

```jsx
// Next.js 自动 SSR
// pages/index.js
export default function Home() {
  return <div>Welcome to Next.js!</div>;
}

// 获取服务端数据
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();

  return { props: { data } };
}
```

###  hydration（水合）

```
1. 服务端渲染 HTML
2. 发送到浏览器显示
3. React 在浏览器端"激活"HTML
4. 添加事件监听，使其可交互
```

### React 18 流式 SSR

```jsx
import { renderToPipeableStream } from 'react-dom/server';

const stream = renderToPipeableStream(<App />, {
  onShellReady() {
    // 外壳准备好，开始流式传输
    response.statusCode = 200;
    stream.pipe(response);
  },
  onError(error) {
    console.error(error);
  }
});
```

### SSR vs SSG vs CSR

| 特性 | SSR | SSG | CSR |
|------|-----|-----|-----|
| 首屏速度 | 快 | 最快 | 慢 |
| SEO | 好 | 最好 | 差 |
| 服务器压力 | 高 | 低 | 低 |
| 数据实时性 | 实时 | 构建时 | 实时 |
| 适用场景 | 动态内容 | 静态内容 | 后台应用 |

---

## 25. React如何避免XSS攻击？

### 自动转义

React 默认会对 JSX 中的内容进行 HTML 转义：

```jsx
function App() {
  const userInput = '<script>alert("xss")</script>';

  // React 会自动转义，输出纯文本
  return <div>{userInput}</div>;
  // 渲染结果: &lt;script&gt;alert("xss")&lt;/script&gt;
}
```

### dangerouslySetInnerHTML

需要谨慎使用，必须确保内容安全：

```jsx
function App() {
  const html = '<p>Some <strong>HTML</strong></p>';

  // 危险：直接插入 HTML
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

// 安全的做法：使用 DOMPurify 等库清理
import DOMPurify from 'dompurify';

function SafeHtml({ html }) {
  const clean = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}
```

### URL 安全

```jsx
function Link({ href, children }) {
  // 检查 javascript: 协议
  const safeHref = href.startsWith('javascript:') ? '#' : href;

  return <a href={safeHref}>{children}</a>;
}

// 或者使用 URL 对象验证
function isSafeUrl(url) {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}
```

### 样式安全

```jsx
// 避免使用用户输入作为样式值
// 危险
<div style={{ color: userInput }} />

// 安全：限制可选值
const allowedColors = ['red', 'blue', 'green'];
const safeColor = allowedColors.includes(userColor) ? userColor : 'black';
<div style={{ color: safeColor }} />
```

### 最佳实践

1. **永远不要信任用户输入**
   ```jsx
   // 对所有用户输入进行验证和清理
   ```

2. **使用 CSP（内容安全策略）**
   ```html
   <meta http-equiv="Content-Security-Policy"
         content="default-src 'self'; script-src 'self'">
   ```

3. **使用自动转义的库**
   - React 本身提供了自动转义
   - 使用 DOMPurify 清理 HTML

4. **避免动态创建脚本**
   ```jsx
   // 危险
   eval(userInput);

   // 危险
   new Function(userInput)();

   // 危险
   setTimeout(userInput, 100);
   ```

5. **表单验证**
   - 前端验证提供即时反馈
   - 后端验证是最后一道防线

---

## React 状态管理

### 1. Redux

**核心概念**
- **Store** - 单一数据源
- **Action** - 描述发生什么
- **Reducer** - 计算新状态
- **Dispatch** - 发送 Action

**中间件**
- `redux-thunk` - 异步 Action
- `redux-saga` - 复杂异步流程
- `redux-observable` - 响应式编程

### 2. MobX

**特点**
- 可观察状态（Observable）
- 自动追踪依赖
- 简单的 API，学习曲线低

### 3. Context API

**适用场景**
- 主题切换
- 用户信息
- 语言设置

**局限**
- 性能问题（ Consumers 会全部重新渲染 ）
- 不适合高频更新

### 4. Recoil

**特点**
- 原子状态管理
- 派生状态自动更新
- 支持 React 并发模式

### 5. Zustand

**特点**
- 轻量级
- 无需 Provider 包裹
- 支持 DevTools
- API 简洁

---

## React 性能优化

### 1. React.memo

```jsx
const MemoComponent = React.memo(function MyComponent(props) {
  // 只在 props 变化时重新渲染
});
```

### 2. useMemo

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

### 3. useCallback

```jsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

### 4. 代码分割

```jsx
const LazyComponent = React.lazy(() => import('./LazyComponent'));

<Suspense fallback={<div>Loading...</div>}>
  <LazyComponent />
</Suspense>
```

### 5. 其他优化技巧
- 避免内联函数和对象
- 列表渲染使用唯一 key
- 虚拟列表（ react-window ）
- 服务端渲染（ SSR ）

---

## React 常见问题

### 1. setState 是同步还是异步？

**React 18 之前**
- 在 React 事件处理中：异步（批量更新）
- 在 setTimeout/Promise 中：同步

**React 18 之后**
- 默认自动批处理（ Automatic Batching ）
- 所有状态更新都是异步批处理

### 2. React 事件机制

**合成事件（SyntheticEvent）**
- 包装原生事件，跨浏览器兼容
- 事件委托到 document
- 模拟事件冒泡和捕获

**事件池**
- 早期版本使用事件池复用对象
- React 17 移除了事件池

### 3. React Diff 算法

**三个假设**
1. 不同类型元素产生不同树
2. 开发者可以通过 key 暗示子元素稳定性
3. 只比较同层级节点

**策略**
- O(n) 复杂度
- 单向比较，不回溯
- key 的作用：标识节点，优化复用

### 4. React Key 的作用

**正确使用**
```jsx
{items.map(item => <li key={item.id}>{item.name}</li>)}
```

**避免使用索引作为 key**
- 列表重排时性能差
- 可能导致状态错乱

### 5. Portal 的使用

```jsx
import { createPortal } from 'react-dom';

function Modal({ children }) {
  return createPortal(
    children,
    document.getElementById('modal-root')
  );
}
```

**用途**
- 模态框
- 下拉菜单
- 提示框

---

## React 进阶

### 1. 高阶组件（HOC）

```jsx
function withLoading(WrappedComponent) {
  return function(props) {
    if (props.isLoading) {
      return <div>Loading...</div>;
    }
    return <WrappedComponent {...props} />;
  };
}
```

### 2. Render Props

```jsx
<DataProvider render={data => <Child data={data} />} />
```

### 3. Error Boundary

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    logError(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>出错了</h1>;
    }
    return this.props.children;
  }
}
```

### 4. Suspense

```jsx
<Suspense fallback={<Loading />}>
  <AsyncComponent />
</Suspense>
```

---

## 面试常问

1. **React 的设计思想是什么？**
   - 组件化、单向数据流、声明式编程

2. **为什么 React 要引入 JSX？**
   - 语法简洁、类型安全、编译时优化

3. **React 如何避免 XSS 攻击？**
   - 自动转义内容，`dangerouslySetInnerHTML` 需谨慎使用

4. **React 服务端渲染（SSR）的优势？**
   - 首屏快、SEO 友好、社交分享好

5. **函数组件捕获了什么？**
   - 每次渲染都有独立的 props 和 state 闭包

---

## 26. 受控组件和非受控组件有什么区别？

### 受控组件（Controlled Component）

表单数据由 React 组件的状态（state）管理。

```jsx
function ControlledInput() {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    console.log('提交的值:', value);
  };

  return (
    <div>
      <input value={value} onChange={handleChange} />
      <button onClick={handleSubmit}>提交</button>
    </div>
  );
}
```

**特点：**
- 表单值由 state 控制
- 需要绑定 onChange 事件
- 可以实时校验和处理输入
- 符合 React 的单向数据流

### 非受控组件（Uncontrolled Component）

表单数据由 DOM 自身管理，通过 ref 获取值。

```jsx
function UncontrolledInput() {
  const inputRef = useRef(null);

  const handleSubmit = () => {
    console.log('提交的值:', inputRef.current.value);
  };

  return (
    <div>
      <input ref={inputRef} defaultValue="初始值" />
      <button onClick={handleSubmit}>提交</button>
    </div>
  );
}
```

**特点：**
- 使用 ref 获取 DOM 值
- 类似传统 HTML 表单
- 代码更简洁，适合简单场景
- 无法实时控制输入

### 对比总结

| 特性 | 受控组件 | 非受控组件 |
|------|---------|-----------|
| 数据源 | React state | DOM |
| 获取值 | 通过 state | 通过 ref |
| 实时校验 | 支持 | 不支持 |
| 代码量 | 较多 | 较少 |
| 适用场景 | 复杂表单、需要实时处理 | 简单表单、快速开发 |

### 使用场景

**受控组件适用：**
- 表单需要实时验证
- 输入需要格式化（如电话号码、金额）
- 多个表单元素联动
- 需要条件禁用提交按钮

```jsx
function FormattedInput() {
  const [phone, setPhone] = useState('');

  const handleChange = (e) => {
    // 格式化电话号码
    const formatted = e.target.value.replace(/\D/g, '').slice(0, 11);
    setPhone(formatted);
  };

  return <input value={phone} onChange={handleChange} placeholder="手机号" />;
}
```

**非受控组件适用：**
- 文件上传（File input）
- 快速原型开发
- 集成非 React 代码

---

## 27. Redux项目结构如何划分？中间件原理是什么？

### Redux 项目结构划分

#### 1. 按功能划分（推荐）

```
src/
├── store/
│   ├── index.js          # store 配置
│   └── middleware.js     # 中间件配置
├── features/             # 按功能模块划分
│   ├── users/
│   │   ├── usersSlice.js # Redux Toolkit slice
│   │   ├── usersAPI.js   # 相关 API
│   │   └── UsersList.jsx # 组件
│   ├── posts/
│   │   ├── postsSlice.js
│   │   ├── postsAPI.js
│   │   └── PostsList.jsx
│   └── auth/
│       ├── authSlice.js
│       └── Login.jsx
└── App.jsx
```

#### 2. 按类型划分（传统方式）

```
src/
├── store/
│   └── index.js
├── actions/
│   ├── userActions.js
│   └── postActions.js
├── reducers/
│   ├── userReducer.js
│   ├── postReducer.js
│   └── index.js
├── constants/
│   └── actionTypes.js
└── components/
```

#### 3. Redux Toolkit 推荐结构

```jsx
// features/users/usersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsersAPI } from './usersAPI';

// 异步 thunk
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await fetchUsersAPI();
    return response.data;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {
    addUser: (state, action) => {
      state.items.push(action.payload);
    },
    removeUser: (state, action) => {
      state.items = state.items.filter(u => u.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { addUser, removeUser } = usersSlice.actions;
export default usersSlice.reducer;
```

### Redux 中间件原理

#### 中间件执行流程

```
Action Dispatch
     ↓
Middleware 1
     ↓
Middleware 2
     ↓
Middleware 3
     ↓
   Reducer
     ↓
   Store
```

#### 中间件的基本结构

```javascript
// 中间件是一个柯里化函数
const middleware = store => next => action => {
  // 1. 在 action 到达 reducer 之前执行
  console.log('dispatching', action);

  // 2. 调用 next(action) 让 action 继续传递
  const result = next(action);

  // 3. 在 action 被处理之后执行
  console.log('next state', store.getState());

  return result;
};
```

#### 常用中间件

**1. redux-thunk（异步 Action）**

```javascript
// 允许 action creator 返回函数而不是对象
const fetchUser = (userId) => {
  return async (dispatch, getState) => {
    dispatch({ type: 'FETCH_USER_START' });
    try {
      const user = await api.fetchUser(userId);
      dispatch({ type: 'FETCH_USER_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'FETCH_USER_ERROR', payload: error.message });
    }
  };
};

// 使用
dispatch(fetchUser(123));
```

**2. redux-saga（复杂异步流程）**

```javascript
import { call, put, takeLatest } from 'redux-saga/effects';

// Saga
function* fetchUserSaga(action) {
  try {
    const user = yield call(api.fetchUser, action.payload);
    yield put({ type: 'FETCH_USER_SUCCESS', payload: user });
  } catch (error) {
    yield put({ type: 'FETCH_USER_ERROR', payload: error.message });
  }
}

// Watcher Saga
function* watchFetchUser() {
  yield takeLatest('FETCH_USER_REQUEST', fetchUserSaga);
}
```

**3. redux-logger（日志记录）**

```javascript
import logger from 'redux-logger';

const store = createStore(
  reducer,
  applyMiddleware(logger)
);
```

#### 手写简单的中间件

```javascript
// 日志中间件
const loggerMiddleware = store => next => action => {
  console.group(action.type);
  console.log('Prev State:', store.getState());
  console.log('Action:', action);
  const result = next(action);
  console.log('Next State:', store.getState());
  console.groupEnd();
  return result;
};

// 异步中间件（简化版 thunk）
const thunkMiddleware = store => next => action => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }
  return next(action);
};

// 应用中间件
const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
```

---

## 28. JSX如何转换成真实DOM？

### JSX 转换过程

JSX 不是合法的 JavaScript，需要通过 Babel 等工具转换为 `React.createElement` 调用。

### 转换步骤

**1. JSX 编译为 React.createElement**

```jsx
// JSX
const element = (
  <div className="container">
    <h1>Hello</h1>
    <p>World</p>
  </div>
);

// 编译后
const element = React.createElement(
  'div',
  { className: 'container' },
  React.createElement('h1', null, 'Hello'),
  React.createElement('p', null, 'World')
);
```

**2. React.createElement 创建 React 元素**

```javascript
// React.createElement 返回的对象结构
{
  type: 'div',
  props: {
    className: 'container',
    children: [
      { type: 'h1', props: { children: 'Hello' }, ... },
      { type: 'p', props: { children: 'World' }, ... }
    ]
  },
  key: null,
  ref: null,
  $$typeof: Symbol.for('react.element')  // 防止 XSS
}
```

**3. ReactDOM.render 渲染到 DOM**

```javascript
// 首次渲染流程
ReactDOM.render(element, container);

// 内部流程：
// 1. 创建 Fiber 树
// 2. 根据 Fiber 树创建 DOM 节点
// 3. 将 DOM 节点插入容器
```

### 详细转换流程

```
JSX
  ↓ (Babel 编译)
React.createElement(type, props, ...children)
  ↓
React Element 对象
  ↓
ReactDOM.render()
  ↓
创建 Fiber 节点
  ↓
创建真实 DOM (document.createElement)
  ↓
添加属性、绑定事件
  ↓
递归处理 children
  ↓
插入到容器 (container.appendChild)
```

### 组件渲染流程

```jsx
// 函数组件
function App() {
  return <div className="app"><Header /><Main /></div>;
}

function Header() {
  return <header>Header</header>;
}

function Main() {
  return <main>Main Content</main>;
}

// 渲染流程
// 1. 调用 App() 函数获取元素
// 2. 发现 Header 组件，调用 Header()
// 3. 发现 Main 组件，调用 Main()
// 4. 所有组件都解析为基本 HTML 元素
// 5. 创建对应的 DOM 节点
// 6. 组装成完整的 DOM 树
```

### React 18 的 createRoot

```jsx
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);

// 创建 FiberRoot 和 HostRootFiber
root.render(<App />);

// 内部调用 React 的 Reconciler
// 1. 进入 render 阶段（创建 Fiber 树）
// 2. 进入 commit 阶段（应用到 DOM）
```

---

## 29. useEffect如何支持async/await？

### 问题背景

`useEffect` 的回调函数不能直接使用 `async`，因为它要求返回清理函数（cleanup function）或 `undefined`，而 `async` 函数会返回 Promise。

```jsx
// ❌ 错误：useEffect 回调不能是 async 函数
useEffect(async () => {
  const data = await fetchData();  // 返回的是 Promise，不是 cleanup 函数
  setData(data);
}, []);
```

### 解决方案

**1. 在 useEffect 内部定义并调用 async 函数（推荐）**

```jsx
useEffect(() => {
  // 内部定义 async 函数
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 立即执行
  fetchData();
}, []);
```

**2. 使用 IIFE（立即执行函数）**

```jsx
useEffect(() => {
  (async () => {
    const data = await fetchData();
    setData(data);
  })();
}, []);
```

**3. 使用 Promise.then（不使用 async/await）**

```jsx
useEffect(() => {
  fetchData()
    .then(data => setData(data))
    .catch(error => setError(error));
}, []);
```

**4. 处理竞态条件**

```jsx
useEffect(() => {
  // 用于取消过期的请求
  let cancelled = false;

  const fetchData = async () => {
    const data = await fetchUser(userId);

    // 只有在未被取消时才更新状态
    if (!cancelled) {
      setData(data);
    }
  };

  fetchData();

  // 清理函数
  return () => {
    cancelled = true;
  };
}, [userId]);
```

**5. 使用 AbortController 取消请求**

```jsx
useEffect(() => {
  const controller = new AbortController();

  const fetchData = async () => {
    try {
      const response = await fetch('/api/data', {
        signal: controller.signal
      });
      const data = await response.json();
      setData(data);
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('请求被取消');
        return;
      }
      setError(error);
    }
  };

  fetchData();

  // 清理时取消请求
  return () => {
    controller.abort();
  };
}, []);
```

### 自定义 Hook

```jsx
function useAsyncEffect(effect, deps) {
  useEffect(() => {
    const cleanup = effect();
    return () => {
      if (cleanup && typeof cleanup.then === 'function') {
        cleanup.then(cleanupFn => {
          if (typeof cleanupFn === 'function') {
            cleanupFn();
          }
        });
      } else if (typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, deps);
}

// 使用
useAsyncEffect(async () => {
  const data = await fetchData();
  setData(data);

  // 返回清理函数
  return () => {
    console.log('cleanup');
  };
}, []);
```

### 数据获取最佳实践

```jsx
function UserProfile({ userId }) {
  const [state, setState] = useState({
    user: null,
    loading: false,
    error: null
  });

  useEffect(() => {
    let ignore = false;

    const fetchUser = async () => {
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const user = await api.fetchUser(userId);
        if (!ignore) {
          setState({ user, loading: false, error: null });
        }
      } catch (error) {
        if (!ignore) {
          setState({ user: null, loading: false, error: error.message });
        }
      }
    };

    fetchUser();

    return () => {
      ignore = true;
    };
  }, [userId]);

  if (state.loading) return <Spinner />;
  if (state.error) return <Error message={state.error} />;
  return <UserDetails user={state.user} />;
}
```

---

## 30. 为什么不能在循环、条件中调用Hooks？

### Hooks 规则

React Hooks 有两个重要规则：

1. **只在最顶层调用 Hooks** - 不要在循环、条件或嵌套函数中调用
2. **只在 React 函数中调用 Hooks** - 在函数组件或自定义 Hook 中调用

### 为什么不能破坏规则

**Hooks 依赖调用顺序**

React 通过 Hooks 的调用顺序来关联状态：

```jsx
function Component() {
  // 第一次渲染时，React 内部记录：
  // Hook 1: useState('name') → state[0]
  const [name, setName] = useState('name');

  // Hook 2: useState(0) → state[1]
  const [count, setCount] = useState(0);

  // Hook 3: useEffect → effect[0]
  useEffect(() => {}, []);

  return <div>{name}: {count}</div>;
}
```

**错误示例：条件调用**

```jsx
function Component({ shouldUseName }) {
  if (shouldUseName) {
    // ❌ 错误：条件调用
    const [name, setName] = useState('');
  }

  // 这样会导致 Hook 顺序不一致
  const [count, setCount] = useState(0);

  // 渲染1: shouldUseName=true → Hook 1: name state, Hook 2: count state
  // 渲染2: shouldUseName=false → Hook 1: count state（但 React 以为是 name state）

  return <div>{count}</div>;
}
```

**错误示例：循环调用**

```jsx
function Component({ items }) {
  // ❌ 错误：循环调用
  for (let i = 0; i < items.length; i++) {
    const [value, setValue] = useState(items[i]);
  }

  // 每次渲染 items.length 可能不同，Hook 数量变化
}
```

### 正确做法

**条件逻辑放到 Hook 内部**

```jsx
function Component({ shouldUseName }) {
  // ✅ 始终在顶层调用
  const [name, setName] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 条件逻辑放到 effect 内部
    if (shouldUseName) {
      setName('John');
    }
  }, [shouldUseName]);

  // 渲染时根据条件决定是否使用
  return <div>{shouldUseName ? name : 'Anonymous'}: {count}</div>;
}
```

**循环中使用 Hook**

```jsx
// ❌ 错误：在循环中调用 useState
function List({ items }) {
  return items.map(item => {
    const [count, setCount] = useState(0);  // 错误！
    return <Item key={item.id} count={count} />;
  });
}

// ✅ 正确：提取为子组件
function List({ items }) {
  return items.map(item => <ItemComponent key={item.id} item={item} />);
}

function ItemComponent({ item }) {
  // 每个组件实例有自己的 Hook 顺序
  const [count, setCount] = useState(0);
  return <div>{item.name}: {count}</div>;
}
```

### ESLint 规则

使用 `eslint-plugin-react-hooks` 自动检查：

```javascript
// .eslintrc.js
module.exports = {
  plugins: ['react-hooks'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',  // 检查 Hook 规则
    'react-hooks/exhaustive-deps': 'warn'   // 检查依赖项
  }
};
```

---

## 31. 什么是React Hooks的闭包陷阱？如何解决？

### 闭包陷阱（Stale Closure）

当 Hook 内部引用了过期的状态值，导致获取到的不是最新值。

### 常见问题场景

**1. useEffect 中的过期状态**

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      // ❌ 问题：count 永远是 0（初始值）
      console.log(count);
      setCount(count + 1);  // 每次都是 0 + 1 = 1
    }, 1000);

    return () => clearInterval(timer);
  }, []);  // 依赖为空，只执行一次

  return <div>{count}</div>;  // 永远显示 1
}
```

**2. 事件处理中的过期状态**

```jsx
function SearchResults() {
  const [query, setQuery] = useState('react');
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults(query).then(data => {
      // ❌ 问题：如果用户快速输入，可能显示旧的结果
      setResults(data);
    });
  }, [query]);

  // 延迟保存搜索历史
  const saveHistory = useCallback(() => {
    // ❌ 可能保存过期的 query
    saveToHistory(query);
  }, []);  // 缺少依赖

  return <div>{/* ... */}</div>;
}
```

### 解决方案

**1. 使用函数式更新**

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      // ✅ 使用函数式更新，获取最新状态
      setCount(c => c + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <div>{count}</div>;
}
```

**2. 正确设置依赖项**

```jsx
function SearchResults() {
  const [query, setQuery] = useState('react');

  useEffect(() => {
    // ✅ 每次 query 变化都重新执行
    fetchResults(query).then(data => {
      setResults(data);
    });
  }, [query]);  // 正确设置依赖

  const saveHistory = useCallback(() => {
    saveToHistory(query);
  }, [query]);  // ✅ 包含所有依赖

  return <div>{/* ... */}</div>;
}
```

**3. 使用 useRef 保存最新值**

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);

  // 保持 ref 始终是最新值
  countRef.current = count;

  useEffect(() => {
    const timer = setInterval(() => {
      // 通过 ref 获取最新值，但不触发重新渲染
      console.log(countRef.current);
      setCount(countRef.current + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <div>{count}</div>;
}
```

**4. 使用自定义 Hook**

```jsx
// 获取最新状态的 Hook
function useLatest(value) {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}

function Counter() {
  const [count, setCount] = useState(0);
  const latestCount = useLatest(count);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log(latestCount.current);
      setCount(latestCount.current + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);  // 可以安全地使用空依赖

  return <div>{count}</div>;
}
```

**5. 合并状态**

```jsx
// 避免依赖多个状态导致的闭包问题
function Form() {
  // ❌ 容易出错：多个独立状态
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');

  // ✅ 合并为一个状态对象
  const [form, setForm] = useState({
    firstName: '',
    lastName: ''
  });

  useEffect(() => {
    // 可以直接使用 form，因为它是对象引用
    console.log(form.firstName, form.lastName);
  }, [form]);

  return <div>{/* ... */}</div>;
}
```

### 最佳实践

```jsx
function AsyncComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await api.fetch();
        // 检查组件是否已卸载或请求是否已过期
        if (!cancelled) {
          setData(result);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, []);

  return <div>{/* ... */}</div>;
}
```

---

## 32. 父组件如何调用子组件的方法？

### 使用 forwardRef + useImperativeHandle（推荐）

```jsx
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

// 子组件
const ChildComponent = forwardRef((props, ref) => {
  const [count, setCount] = useState(0);

  // 暴露方法给父组件
  useImperativeHandle(ref, () => ({
    increment: () => {
      setCount(c => c + 1);
    },
    decrement: () => {
      setCount(c => c - 1);
    },
    reset: () => {
      setCount(0);
    },
    getCount: () => count
  }));

  return <div>Count: {count}</div>;
});

// 父组件
function ParentComponent() {
  const childRef = useRef(null);

  const handleIncrement = () => {
    childRef.current?.increment();
  };

  const handleGetCount = () => {
    const count = childRef.current?.getCount();
    console.log('Current count:', count);
  };

  return (
    <div>
      <ChildComponent ref={childRef} />
      <button onClick={handleIncrement}>+</button>
      <button onClick={() => childRef.current?.decrement()}>-</button>
      <button onClick={() => childRef.current?.reset()}>Reset</button>
      <button onClick={handleGetCount}>Get Count</button>
    </div>
  );
}
```

### 使用回调 ref

```jsx
function Parent() {
  const [childMethods, setChildMethods] = useState(null);

  return (
    <div>
      <Child onReady={setChildMethods} />
      <button onClick={() => childMethods?.doSomething()}>
        Call Child Method
      </button>
    </div>
  );
}

function Child({ onReady }) {
  const methods = {
    doSomething: () => console.log('Doing something'),
    getValue: () => 123
  };

  useEffect(() => {
    onReady?.(methods);
    return () => onReady?.(null);
  }, []);

  return <div>Child</div>;
}
```

### 使用状态提升（更推荐的方式）

当父组件需要控制子组件时，优先使用状态提升，而非直接调用方法：

```jsx
// 更 React 的方式：通过 props 控制
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Child count={count} />
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <button onClick={() => setCount(c => c - 1)}>-</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

function Child({ count }) {
  return <div>Count: {count}</div>;
}
```

### 对比：命令式 vs 声明式

| 方式 | 优点 | 缺点 |
|------|------|------|
| useImperativeHandle | 直接控制，适合复杂组件 | 命令式编程，破坏封装 |
| 状态提升 | 声明式，符合 React 哲学 | 可能导致 props drilling |
| Context | 避免层层传递 | 增加复杂度 |

### 适用场景

**使用 useImperativeHandle：**
- 封装第三方库（如地图、图表、编辑器）
- 封装原生 DOM 操作（如 focus、scroll、播放控制）
- 复杂表单组件需要触发表单验证

```jsx
// 封装视频播放器
const VideoPlayer = forwardRef((props, ref) => {
  const videoRef = useRef(null);

  useImperativeHandle(ref, () => ({
    play: () => videoRef.current?.play(),
    pause: () => videoRef.current?.pause(),
    seek: (time) => {
      if (videoRef.current) {
        videoRef.current.currentTime = time;
      }
    },
    getCurrentTime: () => videoRef.current?.currentTime || 0
  }));

  return <video ref={videoRef} src={props.src} />;
});
```

---

## 33. 为什么React需要Fiber而Vue不需要？

### React Fiber 解决了什么问题

**1. 可中断的渲染**

React 15 及之前使用递归渲染虚拟 DOM，一旦开始就不能中断，可能导致卡顿：

```
React 15:
更新开始 → 递归构建 DOM（无法中断）→ 页面卡顿

React 16+ Fiber:
更新开始 → 构建 Fiber 树（可中断）→ 让出主线程 → 继续构建 → 完成提交
```

**2. 优先级调度**

Fiber 允许 React 根据优先级决定先更新哪些内容：

```jsx
// 高优先级：用户输入、动画
// 低优先级：数据列表更新、日志记录

startTransition(() => {
  // 标记为低优先级更新
  setSearchResults(data);
});
```

### Vue 为什么不需要 Fiber

**1. 细粒度响应式系统**

Vue 的响应式系统追踪每个组件的依赖关系，自动精确更新：

```javascript
// Vue 的依赖追踪
const state = reactive({ count: 0 });

// 只有使用 count 的组件会重新渲染
// 不需要像 React 那样遍历整个组件树
```

**2. 自动优化**

Vue 编译时就知道哪些数据会被使用，自动优化：

```vue
<template>
  <div>
    <!-- 编译时标记：只在这两个地方使用 -->
    <span>{{ count }}</span>
    <span>{{ message }}</span>
  </div>
</template>
```

**3. 异步队列更新**

Vue 默认将所有状态变更缓冲到事件循环末尾统一执行：

```javascript
// Vue 的更新是异步的
this.count++;
this.count++;
this.count++;

// 只会在 nextTick 执行一次更新
```

### 架构差异对比

| 特性 | React | Vue |
|------|-------|-----|
| 更新粒度 | 组件级别（需要比较整棵树） | 依赖级别（只更新相关） |
| 响应式 | 手动优化（useMemo, memo） | 自动追踪依赖 |
| 调度策略 | 优先级调度（Fiber） | 异步队列 |
| 更新中断 | 支持 | 不需要 |
| 编译优化 | 较少（JSX 运行时决定） | 较多（模板编译优化） |

### 简单类比

- **React Fiber** = 像操作系统的进程调度，可以中断低优先级任务
- **Vue 响应式** = 像事件驱动系统，只处理发生变化的部分

### 结论

| 场景 | 优势 |
|------|------|
| 大型复杂应用 | React Fiber 的调度更灵活 |
| 中小型应用 | Vue 的自动优化更简单高效 |
| 需要精细控制 | React 提供更多底层控制能力 |
| 快速开发 | Vue 的响应式系统更简单直观 |

---

## 34. 手写实现 useLayoutEffect

### 与 useEffect 的区别

| 特性 | useEffect | useLayoutEffect |
|------|-----------|-----------------|
| 执行时机 | 渲染完成后异步执行 | 渲染完成后同步执行，阻塞绘制 |
| 使用场景 | 大多数副作用 | DOM 测量、同步 DOM 操作 |
| 性能影响 | 较小 | 可能阻塞渲染，谨慎使用 |

### 手写实现

```javascript
// 简化版 useLayoutEffect 实现思路
// 基于 React 的调度机制，在 commit 阶段同步执行

let isRendering = false;
let currentComponent = null;
const layoutEffectQueue = [];

function useLayoutEffect(create, deps) {
  const hook = getCurrentHook();
  const oldDeps = hook.deps;

  // 比较依赖
  const hasChanged = deps
    ? !deps.every((dep, i) => dep === oldDeps[i])
    : true;

  if (isRendering || hasChanged) {
    hook.deps = deps;
    hook.create = create;

    // 添加到同步执行队列
    layoutEffectQueue.push(() => {
      // 先清理上一次的 effect
      if (hook.cleanup) {
        hook.cleanup();
      }
      // 执行新的 effect
      hook.cleanup = create();
    });
  }
}

// 在 commit 阶段同步执行
function commitLayoutEffects() {
  isRendering = false;
  // 同步执行所有 layout effect
  layoutEffectQueue.forEach(effect => effect());
  layoutEffectQueue.length = 0;
}

// React 源码简化示意
function commitRootImpl(root, renderPriorityLevel) {
  // ... 其他逻辑

  // 同步执行 layout effects（在绘制之前）
  commitLayoutEffects(finishedWork, root, committedLanes);

  // 浏览器绘制

  // 异步执行普通 effects
  scheduleCallback(NormalSchedulerPriority, () => {
    commitPassiveEffects(root, finishedWork);
  });
}
```

### 使用场景示例

```javascript
function MeasureExample() {
  const divRef = useRef(null);
  const [height, setHeight] = useState(0);

  // ❌ useEffect 可能导致闪烁
  useEffect(() => {
    setHeight(divRef.current.getBoundingClientRect().height);
  }, []);

  // ✅ useLayoutEffect 在绘制前同步测量
  useLayoutEffect(() => {
    const measuredHeight = divRef.current.getBoundingClientRect().height;
    setHeight(measuredHeight); // 在绘制前更新，避免闪烁
  }, []);

  return (
    <div>
      <div ref={divRef}>内容</div>
      <p>高度: {height}px</p>
    </div>
  );
}

// 动画同步示例
function AnimationExample() {
  const boxRef = useRef(null);

  useLayoutEffect(() => {
    const box = boxRef.current;
    // 在浏览器绘制前设置初始位置，避免闪烁
    box.style.transform = 'translateX(-100px)';

    // 强制回流，确保 transform 生效
    box.getBoundingClientRect();

    // 添加动画类
    box.style.transition = 'transform 0.3s';
    box.style.transform = 'translateX(0)';
  }, []);

  return <div ref={boxRef} className="box">Box</div>;
}
```

---

## 35. 不使用脚手架手动搭建 React 应用

### 项目结构

```
my-react-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── App.jsx
│   ├── index.js
│   └── styles.css
├── webpack.config.js
├── babel.config.js
├── package.json
└── .gitignore
```

### 第一步：初始化项目

```bash
mkdir my-react-app
cd my-react-app
npm init -y
```

### 第二步：安装依赖

```bash
# 核心依赖
npm install react react-dom

# 开发依赖
npm install --save-dev webpack webpack-cli webpack-dev-server
npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/preset-react
npm install --save-dev html-webpack-plugin css-loader style-loader
```

### 第三步：配置 Babel

```javascript
// babel.config.js
module.exports = {
  presets: [
    '@babel/preset-env',    // 转译 ES6+
    '@babel/preset-react'   // 转译 JSX
  ]
};
```

### 第四步：配置 Webpack

```javascript
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',        // 入口文件

  output: {
    path: path.resolve(__dirname, 'dist'),  // 输出目录
    filename: 'bundle.[hash:8].js',         // 带 hash 的文件名
    clean: true                             // 清理旧文件
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,      // 处理 JS/JSX 文件
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,          // 处理 CSS 文件
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',  // HTML 模板
      title: 'My React App'
    })
  ],

  devServer: {
    port: 3000,
    hot: true,           // 热更新
    open: true           // 自动打开浏览器
  },

  resolve: {
    extensions: ['.js', '.jsx']  // 自动解析扩展名
  }
};
```

### 第五步：创建 HTML 模板

```html
<!-- public/index.html -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= htmlWebpackPlugin.options.title %></title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

### 第六步：编写 React 代码

```jsx
// src/components/App.jsx
import React from 'react';

function App() {
  return (
    <div className="app">
      <h1>Hello, React!</h1>
      <p>这是手动搭建的 React 应用</p>
    </div>
  );
}

export default App;
```

```javascript
// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import './styles.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

```css
/* src/styles.css */
body {
  margin: 0;
  font-family: -apple-system, sans-serif;
  background: #f5f5f5;
}

.app {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
```

### 第七步：配置 package.json

```json
{
  "name": "my-react-app",
  "version": "1.0.0",
  "scripts": {
    "start": "webpack serve --mode development",
    "build": "webpack --mode production",
    "dev": "webpack serve --mode development --hot"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@babel/core": "^7.23.0",
    "@babel/preset-env": "^7.23.0",
    "@babel/preset-react": "^7.22.0",
    "babel-loader": "^9.1.0",
    "css-loader": "^6.8.0",
    "html-webpack-plugin": "^5.5.0",
    "style-loader": "^3.3.0",
    "webpack": "^5.88.0",
    "webpack-cli": "^5.1.0",
    "webpack-dev-server": "^4.15.0"
  }
}
```

### 第八步：运行项目

```bash
# 开发模式（热更新）
npm start

# 生产构建
npm run build
```

### 添加更多功能

**1. 添加 TypeScript 支持**

```bash
npm install --save-dev typescript ts-loader @types/react @types/react-dom
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "ESNext",
    "moduleResolution": "node",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

**2. 添加 CSS Modules**

```javascript
// webpack.config.js 修改 CSS 规则
{
  test: /\.module\.css$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: '[name]__[local]__[hash:base64:5]'
        }
      }
    }
  ]
}
```

**3. 添加图片支持**

```bash
npm install --save-dev file-loader url-loader
```

```javascript
// webpack.config.js
{
  test: /\.(png|jpg|gif|svg)$/,
  type: 'asset/resource'
}
```

**4. 代码分割（Code Splitting）**

```javascript
// webpack.config.js
output: {
  path: path.resolve(__dirname, 'dist'),
  filename: '[name].[contenthash:8].js',
  chunkFilename: '[name].[contenthash:8].chunk.js'
}

// 使用动态导入
const LazyComponent = React.lazy(() => import('./LazyComponent'));
```

### 与 create-react-app 对比

| 特性 | 手动搭建 | CRA |
|------|----------|-----|
| 可控性 | 完全可控 | 黑盒封装 |
| 学习成本 | 高（需理解 Webpack/Babel） | 低 |
| 灵活度 | 高度定制 | 需 eject 才能定制 |
| 包体积 | 可精确控制 | 可能包含不需要的功能 |
| 维护成本 | 自行维护配置 | 官方维护 |

### 推荐使用场景

- **手动搭建**：需要深度定制构建流程、学习原理、优化包体积
- **CRA/Vite**：快速启动、团队统一配置、无需关心底层

---

## 36. React 路由变化监听

### 使用 React Router v6

```javascript
import { useEffect } from 'react';
import { useLocation, useNavigationType, NavigationType } from 'react-router-dom';

// 组件内监听路由变化
function RouteChangeTracker() {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    console.log('路由变化:', {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
      state: location.state,
      navigationType // POP/PUSH/REPLACE
    });

    // 页面统计
    trackPageView(location.pathname);

    // 权限检查
    checkPermission(location.pathname);

  }, [location]);

  return null;
}

// 在 App 中使用
function App() {
  return (
    <Router>
      <RouteChangeTracker />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}
```

### 全局路由守卫

```javascript
// 封装路由守卫 Hook
function useRouteGuard() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 白名单
    const publicPaths = ['/login', '/register'];

    // 检查登录状态
    const isAuthenticated = localStorage.getItem('token');
    const isPublicPath = publicPaths.includes(location.pathname);

    if (!isAuthenticated && !isPublicPath) {
      navigate('/login', { replace: true });
      return;
    }

    if (isAuthenticated && location.pathname === '/login') {
      navigate('/', { replace: true });
    }
  }, [location, navigate]);
}

// 动态标题
function useDocumentTitle() {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      '/': '首页',
      '/about': '关于我们',
      '/products': '产品列表'
    };

    document.title = titles[location.pathname] || 'My App';
  }, [location]);
}

// 路由离开确认
function useLeaveConfirm(when, message = '确定要离开吗？') {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!when) return;

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = message;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [when, message]);
}
```

### 路由配置监听

```javascript
// 在路由配置中实现守卫
const routes = [
  {
    path: '/admin',
    element: <AdminLayout />,
    loader: () => {
      // 路由加载前检查
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Response('Unauthorized', { status: 401 });
      }
      return null;
    },
    errorElement: <ErrorPage />
  }
];
```

---

## 37. react-router 和原生路由有什么区别？

### 核心区别

| 特性 | 原生路由（浏览器） | React Router |
|------|------------------|--------------|
| **实现方式** | 浏览器原生行为 | 基于 History API 封装的 JS 路由 |
| **页面刷新** | 每次跳转都刷新页面 | 无刷新，单页应用内切换 |
| **体验** | 白屏等待，体验差 | 流畅切换，体验好 |
| **状态保持** | 页面刷新后状态丢失 | 状态可以保留 |
| **资源加载** | 每次重新加载资源 | 只加载需要的组件 |
| **SEO 支持** | 天然支持 | 需要 SSR 或预渲染 |

### 原生路由（浏览器）

```javascript
// 原生跳转方式
// 1. 直接跳转（页面刷新）
window.location.href = '/about';

// 2. 替换当前历史记录
window.location.replace('/about');

// 3. 历史前进/后退
window.history.go(-1);
window.history.back();
window.history.forward();

// 4. History API（不刷新页面）
window.history.pushState({ page: 1 }, 'Title', '/about');
window.history.replaceState({ page: 2 }, 'Title', '/contact');

// 监听路由变化
window.addEventListener('popstate', (e) => {
  console.log('URL changed:', location.pathname, e.state);
});
```

### React Router

```javascript
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';

// 声明式路由
function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">首页</Link>
        <Link to="/about">关于</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/user/:id" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

// 编程式导航
function User() {
  const navigate = useNavigate();

  const handleClick = () => {
    // 跳转到指定路径
    navigate('/home');

    // 带参数跳转
    navigate('/user/123', { state: { from: 'list' } });

    // 替换当前记录
    navigate('/login', { replace: true });

    // 后退
    navigate(-1);
  };
}
```

### React Router 的优势

```javascript
// 1. 组件化路由
<Route path="/dashboard" element={<Dashboard />}>
  <Route index element={<DashboardHome />} />
  <Route path="settings" element={<Settings />} />
</Route>

// 2. 路由守卫
function PrivateRoute({ children }) {
  const isAuth = useAuth();
  return isAuth ? children : <Navigate to="/login" />;
}

// 3. 动态路由匹配
<Route path="/user/:userId/posts/:postId" element={<Post />} />

// 4. 路由懒加载
<Route
  path="/heavy"
  element={
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  }
/>

// 5. 路由状态管理
const location = useLocation();
const params = useParams();
const query = new URLSearchParams(location.search);
```

### 使用场景对比

```javascript
// ✅ 使用原生路由的场景
// 1. 多页应用（MPA）
// 2. 需要完整的页面刷新
// 3. 简单的页面跳转

// ✅ 使用 React Router 的场景
// 1. 单页应用（SPA）
// 2. 需要流畅的用户体验
// 3. 复杂的页面状态管理
// 4. 需要路由守卫、嵌套路由
```

### 手写简单 Router

```javascript
import { createContext, useContext, useState, useEffect } from 'react';

const RouterContext = createContext(null);

// 简易 Router 实现
export function SimpleRouter({ children }) {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (newPath) => {
    window.history.pushState(null, '', newPath);
    setPath(newPath);
  };

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

// Route 组件
export function Route({ path, element }) {
  const { path: currentPath } = useContext(RouterContext);
  return currentPath === path ? element : null;
}

// Link 组件
export function Link({ to, children }) {
  const { navigate } = useContext(RouterContext);
  return (
    <a
      href={to}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
}
```

---

## 38. Next.js 与 React SSR

### Next.js 简介

Next.js 是基于 React 的全栈框架，提供 SSR、SSG、ISR、API Routes 等功能。

#### 渲染策略对比

```
┌─────────────────────────────────────────────────────────┐
│              Next.js 渲染策略                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  SSR (Server-Side Rendering)                            │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                   │
│  请求时渲染 → 每次都获取最新数据                           │
│  适合：个性化内容、用户仪表盘                              │
│                                                         │
│  SSG (Static Site Generation)                           │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                   │
│  构建时渲染 → 部署到 CDN                                │
│  适合：博客、文档、营销页面                                │
│                                                         │
│  ISR (Incremental Static Regeneration)                  │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                   │
│  按需重新生成 → 缓存 + 后台更新                            │
│  适合：电商商品页、新闻内容                                │
│                                                         │
│  Streaming SSR                                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                   │
│  流式传输 → 渐进式展示内容                                 │
│  适合：大型页面、复杂应用                                  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### App Router (Next.js 13+)

```tsx
// app/page.tsx - 首页（默认 Server Component）
async function getData() {
  const res = await fetch('https://api.example.com/posts', {
    // 缓存策略
    next: { revalidate: 3600 } // ISR: 1小时后重新验证
  });
  return res.json();
}

// Server Component - 服务端渲染
export default async function HomePage() {
  const posts = await getData();

  return (
    <main>
      <h1>最新文章</h1>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </main>
  );
}
```

```tsx
// app/dashboard/page.tsx - 动态渲染
import { cookies } from 'next/headers';

// 强制动态渲染
export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  // 访问请求相关的数据会触发动态渲染
  const cookieStore = cookies();
  const token = cookieStore.get('token');

  const data = await fetchUserData(token);

  return <DashboardView data={data} />;
}
```

```tsx
// app/components/Counter.tsx - Client Component
'use client'; // 标记为客户端组件

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      点击次数: {count}
    </button>
  );
}
```

### Server vs Client Components

| 特性 | Server Component | Client Component |
|------|------------------|------------------|
| 渲染位置 | 服务端 | 浏览器 |
| 数据获取 | 直接访问数据库/API | useEffect, SWR, React Query |
| 状态管理 | ❌ 不支持 | ✅ useState, useReducer |
| 浏览器 API | ❌ 不支持 | ✅ document, window |
| 包体积 | 零 JS Bundle | 包含在 Bundle 中 |
| SEO | ✅ 友好 | 需 SSR |

```tsx
// Server Component 中嵌套 Client Component
// app/page.tsx
import { Counter } from './components/Counter';
import { getPosts } from './lib/posts';

// 这是 Server Component
export default async function Page() {
  const posts = await getPosts(); // 服务端直接获取数据

  return (
    <div>
      {/* 服务端渲染的内容 */}
      <h1>文章列表</h1>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}

      {/* 客户端交互组件 */}
      <Counter />
    </div>
  );
}
```

### 数据获取模式

```tsx
// 1. 获取数据并缓存（默认）
async function getPosts() {
  const res = await fetch('https://api.example.com/posts');
  return res.json();
}

// 2. 禁用缓存（动态数据）
async function getRealtimeData() {
  const res = await fetch('https://api.example.com/realtime', {
    cache: 'no-store'
  });
  return res.json();
}

// 3. ISR - 增量静态再生成
async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    next: {
      revalidate: 60, // 60秒后重新验证
      tags: ['products'] // 用于按需重新验证
    }
  });
  return res.json();
}

// 4. 按需重新验证
// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache';

export async function POST() {
  revalidateTag('products'); // 重新生成带有该标签的页面
  return Response.json({ revalidated: true });
}
```

### API Routes

```ts
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

// GET /api/users
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page') || '1';

  const users = await db.query('SELECT * FROM users LIMIT 10 OFFSET ?', [
    (parseInt(page) - 1) * 10
  ]);

  return NextResponse.json({ users });
}

// POST /api/users
export async function POST(request: NextRequest) {
  const body = await request.json();

  // 验证
  if (!body.email || !body.name) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  const user = await db.insert('users', body);

  return NextResponse.json({ user }, { status: 201 });
}
```

```ts
// app/api/users/[id]/route.ts
// 动态路由
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await db.query('SELECT * FROM users WHERE id = ?', [params.id]);

  if (!user) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ user });
}
```

### Hydration 与 Suspense

```tsx
// app/page.tsx - Streaming SSR
import { Suspense } from 'react';

// 立即渲染（不等待数据）
export default function Page() {
  return (
    <div>
      <h1>商品详情</h1>

      {/* 商品基本信息 - 快速显示 */}
      <ProductInfo />

      {/* 推荐商品 - 可以延迟加载 */}
      <Suspense fallback={<RecommendationsSkeleton />}>
        <Recommendations />
      </Suspense>

      {/* 评论 - 最后加载 */}
      <Suspense fallback={<ReviewsSkeleton />}>
        <Reviews />
      </Suspense>
    </div>
  );
}

// components/Recommendations.tsx
async function Recommendations() {
  // 模拟慢请求
  await new Promise(resolve => setTimeout(resolve, 2000));
  const recommendations = await getRecommendations();

  return (
    <section>
      <h2>推荐商品</h2>
      {recommendations.map(item => (
        <ProductCard key={item.id} product={item} />
      ))}
    </section>
  );
}
```

### 元数据与 SEO

```tsx
// app/layout.tsx - 全局元数据
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | 我的网站',
    default: '我的网站'
  },
  description: '网站描述',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://example.com',
    siteName: '我的网站'
  },
  robots: {
    index: true,
    follow: true
  }
};
```

```tsx
// app/blog/[slug]/page.tsx - 动态元数据
import type { Metadata } from 'next';

// 生成动态元数据
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }]
    }
  };
}

// 生成静态参数（SSG）
export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug
  }));
}
```

### 中间件与路由拦截

```ts
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');

  // 保护路由
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 国际化
  const locale = request.headers.get('accept-language')?.split(',')[0];
  request.headers.set('x-locale', locale || 'zh-CN');

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/protected/:path*']
};
```

### 性能优化

```tsx
// 1. 图片优化
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={800}
  height={600}
  priority // 优先加载
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>;

// 2. 字体优化
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// 3. 脚本优化
import Script from 'next/script';

<Script
  src="https://analytics.com/script.js"
  strategy="lazyOnload" // 空闲时加载
/>;

// 4. 动态导入
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <p>加载中...</p>,
  ssr: false // 禁用服务端渲染
});
```

### 部署方案

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 输出模式
  output: 'standalone', // 独立部署
  // output: 'export',  // 静态导出

  // 图片优化配置
  images: {
    domains: ['cdn.example.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.example.com'
      }
    ]
  },

  // 重定向
  async redirects() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
        permanent: true
      }
    ];
  },

  // 重写
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://backend.example.com/:path*'
      }
    ];
  }
};

module.exports = nextConfig;
```

| 部署平台 | 特性 |
|---------|------|
| Vercel | 原生支持，边缘函数 |
| Netlify | 边缘函数，Forms |
| Docker | 独立部署 |
| AWS | Lambda@Edge |
```
