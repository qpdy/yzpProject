---
sidebar_position: 6
title: React（面试要点）
---

# React 面试要点

## 目录
- [Fiber架构是什么？解决了什么问题？](#1-fiber架构是什么解决了什么问题)
- [React生命周期有哪些？](#2-react生命周期有哪些)
- [类组件和函数组件有什么区别？](#3-类组件和函数组件有什么区别)
- [虚拟DOM是什么？有什么优势？](#4-虚拟dom是什么有什么优势)
- [useState和useReducer有什么区别？](#5-usestate和usereducer有什么区别)
- [useEffect和useLayoutEffect有什么区别？](#6-useeffect和uselayouteffect有什么区别)
- [useMemo和useCallback有什么区别？](#7-usememo和usecallback有什么区别)
- [React.memo的作用是什么？](#8-reactmemo的作用是什么)
- [Context API如何使用？有什么局限？](#9-context-api如何使用有什么局限)
- [Redux核心概念是什么？](#10-redux核心概念是什么)
- [setState是同步还是异步？](#11-setstate是同步还是异步)
- [React事件机制是怎样的？](#12-react事件机制是怎样的)
- [React Diff算法原理是什么？](#13-react-diff算法原理是什么)
- [Key的作用是什么？为什么不用索引？](#14-key的作用是什么为什么不用索引)
- [Error Boundary是什么？](#15-error-boundary是什么)
- [Suspense和React Lazy如何使用？](#16-suspense和react-lazy如何使用)
- [React性能优化有哪些方法？](#17-react性能优化有哪些方法)
- [React 18有哪些新特性？](#18-react-18有哪些新特性)
- [受控组件和非受控组件有什么区别？](#19-受控组件和非受控组件有什么区别)
- [Redux项目结构如何划分？中间件原理是什么？](#20-redux项目结构如何划分中间件原理是什么)
- [JSX如何转换成真实DOM？](#21-jsx如何转换成真实dom)
- [useEffect如何支持async/await？](#22-useeffect如何支持asyncawait)
- [为什么不能在循环、条件中调用Hooks？](#23-为什么不能在循环条件中调用hooks)
- [什么是React Hooks的闭包陷阱？如何解决？](#24-什么是react-hooks的闭包陷阱如何解决)
- [父组件如何调用子组件的方法？](#25-父组件如何调用子组件的方法)
- [为什么React需要Fiber而Vue不需要？](#26-为什么react需要fiber而vue不需要)
- [react-router 和原生路由有什么区别？](#27-react-router-和原生路由有什么区别)
- [Next.js 与 React SSR](#28-nextjs-与-react-ssr)
- [React 的批处理（Batching）是什么？React 18 前后有什么区别？](#29-react-的批处理batching是什么react-18-前后有什么区别)
- [React 中组件通信方式有哪些？](#30-react-中组件通信方式有哪些)
- [useEffect 依赖项是如何比较的？为什么对象/数组要写进依赖？](#31-useeffect-依赖项是如何比较的为什么对象数组要写进依赖)
- [useTransition 和 useDeferredValue 有什么区别？](#32-usetransition-和-usedeferredvalue-有什么区别)
- [React 中如何实现组件缓存（Keep-Alive）？](#33-react-中如何实现组件缓存keep-alive)
- [state 和 props 有什么区别？](#34-state-和-props-有什么区别)
- [为什么不能直接修改 state？](#35-为什么不能直接修改-state)
- [React 中 render 的触发条件有哪些？](#36-react-中-render-的触发条件有哪些)
- [表单中 onChange 和原生 DOM 的 change 有什么区别？](#37-表单中-onchange-和原生-dom-的-change-有什么区别)
- [组件为什么必须返回单个根节点？React 16 之后有什么变化？](#38-组件为什么必须返回单个根节点react-16-之后有什么变化)
- [React 中如何渲染 HTML？有什么风险？](#39-react-中如何渲染-html有什么风险)
- [什么情况下组件会重新渲染？如何避免不必要的 re-render？](#40-什么情况下组件会重新渲染如何避免不必要的-re-render)
- [自定义 Hook 怎么设计？](#41-自定义-hook-怎么设计)
- [Redux / Zustand / MobX 这类状态管理解决了什么问题？](#42-redux--zustand--mobx-这类状态管理解决了什么问题)
- [forwardRef 和 useImperativeHandle 是什么？](#43-forwardref-和-useimperativehandle-是什么)
- [React 18 并发渲染是什么？是不是多线程？](#44-react-18-并发渲染是什么是不是多线程)
- [Fiber 为什么可以中断和恢复？](#45-fiber-为什么可以中断和恢复)
- [SSR、Hydration、hydration mismatch 是什么？](#46-ssrhydrationhydration-mismatch-是什么)
- [手写实现 useLayoutEffect](#47-手写实现-uselayouteffect)
- [不使用脚手架手动搭建 React 应用](#48-不使用脚手架手动搭建-react-应用)
- [React 路由变化监听](#49-react-路由变化监听)

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

## 3. 类组件和函数组件有什么区别？

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

## 4. 虚拟DOM是什么？有什么优势？

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

## 5. useState和useReducer有什么区别？

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

## 6. useEffect和useLayoutEffect有什么区别？

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

## 7. useMemo和useCallback有什么区别？

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

## 8. React.memo的作用是什么？

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

## 9. Context API如何使用？有什么局限？

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

## 10. Redux核心概念是什么？

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

## 11. setState是同步还是异步？

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
    // flushSync 会同步刷新 DOM，但 count 仍是本次渲染闭包里的旧值
    console.log(count); // 旧值（要拿最新值需用 ref 或在 setCount 的 updater 里读取）
  };
}
```

---

## 12. React事件机制是怎样的？

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

## 13. React Diff算法原理是什么？

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

## 14. Key的作用是什么？为什么不用索引？

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

## 15. Error Boundary是什么？

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

## 16. Suspense和React Lazy如何使用？

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

## 17. React性能优化有哪些方法？

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

## 18. React 18有哪些新特性？

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
// 注意：React 本身不提供数据获取的 Hook，需借助 Relay、Next.js 等框架，
// 或自行实现"throw promise"模式。下面 useResource 仅为示意写法，非真实 API。
function Comments() {
  // 这个组件会在数据准备好之前"挂起"
  const comments = useResource(fetchComments); // 示意，非真实 API
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
root.render(<App />); // createRoot 默认就支持并发特性

// 卸载
root.unmount();
```

---

## 19. 受控组件和非受控组件有什么区别？

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

## 20. Redux项目结构如何划分？中间件原理是什么？

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

## 21. JSX如何转换成真实DOM？

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

## 22. useEffect如何支持async/await？

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

## 23. 为什么不能在循环、条件中调用Hooks？

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

## 24. 什么是React Hooks的闭包陷阱？如何解决？

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

## 25. 父组件如何调用子组件的方法？

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

## 26. 为什么React需要Fiber而Vue不需要？

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

## 27. react-router 和原生路由有什么区别？

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

## 28. Next.js 与 React SSR

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

---

## 29. React 的批处理（Batching）是什么？React 18 前后有什么区别？

**批处理**是指 React 把多个状态更新合并成一次渲染（re-render）来执行的机制。目的是减少 DOM 操作、提升性能。

### React 18 之前：只在合成事件中批处理

```jsx
// React 17：合成事件里批处理
function handleClick() {
  setCount(c => c + 1);  // 不立即渲染
  setFlag(f => !f);       // 不立即渲染
  // 事件回调结束后，统一 re-render 一次
}

// React 17：原生事件 / setTimeout / Promise 中不会批处理
button.addEventListener('click', () => {
  setCount(c => c + 1);  // 立刻渲染一次
  setFlag(f => !f);       // 立刻再渲染一次
  // 两次 re-render，性能差
});

setTimeout(() => {
  setCount(c => c + 1);  // 立刻渲染
  setFlag(f => !f);       // 立刻渲染
}, 1000);
```

### React 18：自动批处理（Automatic Batching）

React 18 把批处理能力扩展到了**所有场景**：Promise、setTimeout、原生事件回调、fetch 回调等。

```jsx
// React 18：所有场景都自动批处理
setTimeout(() => {
  setCount(c => c + 1);  // 不立即渲染
  setFlag(f => !f);       // 不立即渲染
  // 回调结束，统一 re-render 一次
}, 1000);

fetch('/api').then(() => {
  setCount(c => c + 1);  // 不立即渲染
  setFlag(f => !f);       // 不立即渲染
});
```

### 如何退出批处理？

使用 `flushSync` 强制立即同步渲染（不推荐，破坏性能优化）：

```jsx
import { flushSync } from 'react-dom';

function handleClick() {
  flushSync(() => {
    setCount(c => c + 1);  // 立刻同步渲染
  });
  flushSync(() => {
    setFlag(f => !f);       // 立刻再渲染
  });
  // 两次 re-render
}
```

### 为什么需要批处理？

| 场景 | 无批处理 | 有批处理 |
|------|---------|---------|
| 1 次事件触发 3 个 setState | 3 次 re-render | 1 次 re-render |
| Diff + DOM 更新 | 3 次 | 1 次 |
| 用户感知 | 抖动、性能差 | 流畅 |

### 注意事项

- **读取最新 state**：批处理完成后才能拿到新值；如需基于上一次值更新，用函数式 `setState(prev => ...)`
- **useState 闭包陷阱**：批处理不会加重闭包问题，但要注意 `setTimeout` 中读到的仍是旧 state

---

## 30. React 中组件通信方式有哪些？

React 组件通信是面试必考题，需要系统掌握所有方式及其适用场景。

### 通信方式全景

| 方式 | 适用场景 | 优点 | 缺点 |
|------|---------|------|------|
| **props** | 父子通信 | 简单、明确 | 嵌套深时繁琐 |
| **回调函数** | 子→父 | 简单 | 嵌套深时繁琐 |
| **Context API** | 跨层级（主题、用户、国际化） | 避免 prop drilling | 频繁更新性能差 |
| **Redux / Zustand** | 全局状态（复杂应用） | 可预测、调试友好 | 样板代码多 |
| **Event Bus（事件总线）** | 任意组件 | 解耦 | 难追踪、易内存泄漏 |
| **useRef + forwardRef** | 父调子命令式方法 | 灵活 | 破坏数据流 |
| **useImperativeHandle** | 暴露子组件方法 | 受控的 ref 暴露 | 谨慎使用 |
| **URL / 路由参数** | 跨页面状态 | 天然可分享 | 只能传字符串 |
| **localStorage / sessionStorage** | 持久化通信 | 简单 | 不是响应式的 |
| **WebSocket / SSE** | 实时通信 | 实时 | 服务端依赖 |

### 1. props（父子）

```jsx
// 父→子
function Parent() {
  return <Child name="张三" />;
}

// 子→父：回调
function Parent() {
  const handleData = (data) => console.log(data);
  return <Child onSend={handleData} />;
}

function Child({ name, onSend }) {
  return <button onClick={() => onSend('hello')}>发送</button>;
}
```

### 2. Context API（跨层级）

```jsx
const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext); // 直接拿到 "dark"
  return <div className={theme}>...</div>;
}
```

### 3. Redux / Zustand（全局）

```jsx
// Redux
const count = useSelector(state => state.count);
const dispatch = useDispatch();
dispatch({ type: 'INCREMENT' });

// Zustand（更轻量）
const count = useStore(state => state.count);
useStore.getState().increment();
```

### 4. ref + forwardRef（父调子）

```jsx
const Child = forwardRef((props, ref) => {
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    getValue: () => inputRef.current.value
  }));
  return <input ref={inputRef} />;
});

function Parent() {
  const childRef = useRef();
  return (
    <>
      <Child ref={childRef} />
      <button onClick={() => childRef.current.focus()}>聚焦</button>
    </>
  );
}
```

### 5. 事件总线（任意组件）

```jsx
// 简易 Event Bus
class EventBus {
  constructor() { this.events = {}; }
  on(event, cb) { (this.events[event] ||= []).push(cb); }
  off(event, cb) { this.events[event] = (this.events[event] || []).filter(f => f !== cb); }
  emit(event, data) { (this.events[event] || []).forEach(cb => cb(data)); }
}
const bus = new EventBus();

// 组件 A
bus.on('msg', data => console.log(data));

// 组件 B
bus.emit('msg', 'hello');
```

### 选型建议

- **父子**：直接 props
- **跨 2-3 层**：Context
- **复杂应用、多人协作**：Redux/Zustand
- **命令式调用**（聚焦、滚动）：ref + forwardRef
- **跨页面**：URL 参数
- **持久化**：localStorage

---

## 31. useEffect 依赖项是如何比较的？为什么对象/数组要写进依赖？

`useEffect` 的依赖数组决定了 effect 何时重新执行。理解其比较机制是避免 bug 的关键。

### 比较机制：Object.is

React 使用 `Object.is`（类似 `===`，但 `NaN === NaN` 返回 `true`）逐项比较依赖数组中的每个值。

```jsx
useEffect(() => {
  console.log('effect ran');
}, [a, b, c]); // 任一值与上次不同 → 重新执行
```

### 基础类型：按值比较

```jsx
function Example({ count }) {
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]); // 数字变化时执行

  // count: 1 → 2 → 2（两次 2 视为相同，effect 不执行）
}
```

### 引用类型：按引用比较

```jsx
function Example({ user }) {
  // ❌ 错误：每次父组件渲染都会创建新对象
  useEffect(() => {
    fetchUser(user.id);
  }, [user]); // 即使 id 没变，引用不同也会重新执行

  // ✅ 正确：只依赖基本类型
  useEffect(() => {
    fetchUser(user.id);
  }, [user.id]);
}
```

### 常见陷阱

#### 陷阱 1：内联对象/数组

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  // ❌ 每次渲染都创建新对象，effect 无限执行
  useEffect(() => {
    console.log('ran');
  }, [{ a: 1 }]);

  // ✅ 提到 useMemo 或提到组件外
  const config = useMemo(() => ({ a: 1 }), []);
  useEffect(() => {
    console.log('ran');
  }, [config]);
}
```

#### 陷阱 2：内联函数

```jsx
function Parent() {
  // ❌ 每次渲染 handleClick 都是新函数
  useEffect(() => {
    socket.on('msg', handleClick);
    return () => socket.off('msg', handleClick);
  }, [handleClick]); // 无限重连

  // ✅ 用 useCallback 稳定引用
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);

  useEffect(() => {
    socket.on('msg', handleClick);
    return () => socket.off('msg', handleClick);
  }, [handleClick]); // 稳定，只执行一次
}
```

#### 陷阱 3：空依赖 + 闭包陷阱

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  // ❌ 永远打印 0，闭包陷阱
  useEffect(() => {
    const id = setInterval(() => {
      console.log(count); // 永远是 0
    }, 1000);
    return () => clearInterval(id);
  }, []); // 依赖空，count 永远是最初的 0

  // ✅ 正确：把 count 加进依赖
  useEffect(() => {
    const id = setInterval(() => {
      console.log(count);
    }, 1000);
    return () => clearInterval(id);
  }, [count]);

  // ✅ 或者用函数式 setState 拿到最新值
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => {
        console.log(c); // 拿到最新值
        return c;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
}
```

### 最佳实践

1. **依赖项必须完整**：ESLint `react-hooks/exhaustive-deps` 会自动检查
2. **不要"骗" lint 规则**：通过 `// eslint-disable-next-line` 关闭检查要慎重
3. **对象/数组依赖**：拆成基本类型字段，或用 `useMemo` 稳定引用
4. **函数依赖**：用 `useCallback` 稳定引用
5. **实在不想依赖**：用 `useRef` 保存值（"逃生舱"）

### Object.is 与 === 的区别

```js
Object.is(NaN, NaN);  // true
NaN === NaN;          // false

Object.is(+0, -0);    // false
+0 === -0;            // true

// 其余情况与 === 相同
Object.is(1, 1);      // true
Object.is('a', 'a');  // true
Object.is({}, {});    // false（不同引用）
```

---

## 32. useTransition 和 useDeferredValue 有什么区别？

这两个 Hook 都是 React 18 引入的并发特性，用于**降低非紧急更新的优先级**，让 UI 保持响应。

### 核心思想

把更新标记为"非紧急"（transition），让 React 在浏览器空闲时再处理，避免阻塞用户输入等高优先级操作。

### useTransition

把**一个状态更新**包装为低优先级。

```jsx
import { useTransition, useState } from 'react';

function SearchBox() {
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    // 高优先级：输入框立刻更新
    setInput(e.target.value);

    // 低优先级：列表过滤可延迟
    startTransition(() => {
      setList(filterList(e.target.value));
    });
  };

  return (
    <>
      <input value={input} onChange={handleChange} />
      {isPending && <span>加载中...</span>}
      <List items={list} />
    </>
  );
}
```

**关键点：**
- `isPending`：transition 期间的 pending 状态
- `startTransition` 内的更新是低优先级的
- 适用于"明确知道哪些更新可以延迟"的场景

### useDeferredValue

把**一个值**标记为低优先级（值可以是 props 或 state）。

```jsx
import { useDeferredValue, useState, useMemo } from 'react';

function SearchBox() {
  const [input, setInput] = useState('');
  // input 立刻更新；deferredInput 延迟更新
  const deferredInput = useDeferredValue(input);

  // 用延迟值做计算密集的操作
  const list = useMemo(() => {
    return filterList(deferredInput);
  }, [deferredInput]);

  return (
    <>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <List items={list} />
    </>
  );
}
```

**关键点：**
- 返回一个延迟版本的值
- React 会尽量保持 deferredValue 与原值同步，但在紧急更新时先更新原值
- 适用于"接收外部传入的值、想延迟基于它的派生计算"的场景

### 核心区别

| 维度 | useTransition | useDeferredValue |
|------|---------------|------------------|
| 作用对象 | **状态更新**（setter 调用） | **值**（props / state 的派生值） |
| 用法 | `startTransition(() => setX(...))` | `const deferred = useDeferredValue(value)` |
| 是否有 pending | 是（`isPending`） | 否 |
| 适用场景 | 自己控制状态更新 | 接收外部值、无法控制更新时机 |
| 性能开销 | 较小 | 略大（需要 diff） |

### 实战场景

#### 场景 1：实时搜索过滤

```jsx
// ✅ useTransition 更合适（控制 setList 的更新时机）
function App() {
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <input onChange={e => {
        setInput(e.target.value);  // 高优先级
        startTransition(() => {
          setList(filter(e.target.value));  // 低优先级
        });
      }} />
      {isPending && <Spinner />}
      <List items={list} />
    </>
  );
}
```

#### 场景 2：父子组件、值从 props 传入

```jsx
// ✅ useDeferredValue 更合适（值来自父组件，无法控制 setState）
function List({ query }) {
  const deferredQuery = useDeferredValue(query);
  const list = useMemo(() => filter(deferredQuery), [deferredQuery]);
  return <ul>{list.map(...)}</ul>;
}
```

#### 场景 3：大列表渲染

```jsx
// 两者都适用：根据是否控制状态选择
function App() {
  const [filter, setFilter] = useState('');
  const deferredFilter = useDeferredValue(filter);

  const filtered = useMemo(() =>
    bigList.filter(item => item.name.includes(deferredFilter)),
    [deferredFilter]
  );

  return <List items={filtered} />;
}
```

### 注意事项

- 不要在 `startTransition` 中放**必须同步**的更新（如输入框受控值），会被延迟导致输入卡顿
- 不要滥用 transition：所有更新都用 transition = 全部低优先级 = 反而卡
- `Suspense` 会与 transition 配合：transition 期间显示 fallback，不阻塞 UI

---

## 33. React 中如何实现组件缓存（Keep-Alive）？

React 没有内置 `<KeepAlive>`（不像 Vue），但常需要"切走时保留状态、切回时不重新创建"的场景：后台管理 tabs、列表页筛选条件、表单填写到一半切换等。

### 方案一：手动控制显隐 + 状态外提（最简单）

```jsx
function TabContainer() {
  const [activeTab, setActiveTab] = useState('list');

  return (
    <>
      <button onClick={() => setActiveTab('list')}>列表</button>
      <button onClick={() => setActiveTab('detail')}>详情</button>

      {/* 始终挂载，只切换显隐 */}
      <div style={{ display: activeTab === 'list' ? 'block' : 'none' }}>
        <ListPage />
      </div>
      <div style={{ display: activeTab === 'detail' ? 'block' : 'none' }}>
        <DetailPage />
      </div>
    </>
  );
}
```

**优点：** 简单、零依赖  
**缺点：** 隐藏的组件仍参与 reconciliation、可能浪费性能

### 方案二：状态外提到 Store（Redux / Zustand）

```jsx
// 把需要保留的状态提到 store
const useFilterStore = create(set => ({
  filter: { keyword: '', status: 'all' },
  setFilter: (filter) => set({ filter })
}));

function ListPage() {
  const { filter, setFilter } = useFilterStore();
  // 组件卸载后，filter 仍在 store 中，重新挂载时立刻恢复
  return <input value={filter.keyword} onChange={...} />;
}
```

**优点：** 彻底解耦、组件随便卸载  
**缺点：** 需要区分"页面级状态"和"组件级状态"

### 方案三：第三方库 react-activation

模拟 Vue 的 `<KeepAlive>`，通过 Portals 把已卸载的组件 DOM 移到全局容器。

```bash
npm install react-activation
```

```jsx
import { KeepAlive } from 'react-activation';

function TabContainer() {
  const [activeTab, setActiveTab] = useState('list');

  return (
    <>
      <KeepAlive name="list" cacheKey="list">
        {activeTab === 'list' && <ListPage />}
      </KeepAlive>
      <KeepAlive name="detail" cacheKey="detail">
        {activeTab === 'detail' && <DetailPage />}
      </KeepAlive>
    </>
  );
}

// 根组件需要 AliveScope
import { AliveScope } from 'react-activation';

function App() {
  return (
    <AliveScope>
      <TabContainer />
    </AliveScope>
  );
}
```

**优点：** 真正"缓存组件实例 + DOM + 状态"  
**缺点：** 引入第三方依赖、React 18 兼容性需注意

### 方案四：基于 React Router 的 keep-alive 路由

```jsx
// react-router v6 + 自定义实现
import { useLocation, matchPath } from 'react-router-dom';
import { useRef, useEffect } from 'react';

const cache = new Map(); // 路径 -> 组件实例

function KeepAliveRoute({ path, children }) {
  const location = useLocation();
  const matched = matchPath({ path, end: true }, location.pathname);
  const ref = useRef();

  if (matched) {
    cache.set(path, children);
  }

  return (
    <div ref={ref} style={{ display: matched ? 'block' : 'none' }}>
      {cache.get(path)}
    </div>
  );
}
```

### 方案对比

| 方案 | 适用场景 | 复杂度 | 性能开销 |
|------|---------|--------|---------|
| display 切换 | 简单 tab、少量组件 | ⭐ | 中（组件仍 reconciliation） |
| 状态外提 Store | 表单筛选、搜索条件 | ⭐⭐ | 低 |
| react-activation | 后台管理 tabs、复杂页面 | ⭐⭐⭐ | 中（DOM 转移） |
| 自定义路由缓存 | 路由级 Keep-Alive | ⭐⭐⭐⭐ | 中 |

### 选型建议

- **2-3 个 tab**：display 切换
- **状态数据要保留**：Store
- **完整页面级缓存**（含滚动位置、表单输入）：react-activation
- **企业级后台**：基于路由 + react-activation 的封装方案

### 注意事项

- 缓存组件的 effect 仍会执行，注意清理（setInterval、事件监听）
- 内存占用：缓存的组件不会释放，注意及时清理不再使用的缓存
- React 18 严格模式下，组件会"挂载→卸载→挂载"以检测副作用，缓存要兼容

---

## 34. state 和 props 有什么区别？

`state` 和 `props` 是 React 数据流的两个核心概念，理解它们的区别是掌握 React 的基础。

### 核心区别

| 维度 | props | state |
|------|-------|-------|
| 来源 | 由父组件传入 | 组件内部声明和管理 |
| 可变性 | **只读**，子组件不能修改 | 通过 setter 修改（不可直接修改） |
| 谁来更新 | 父组件 | 组件自身 |
| 数据流向 | 父 → 子（单向） | 组件内部（可向下传） |
| 用途 | 父子通信、配置 | 内部状态、用户交互 |

### props

```jsx
// 父组件传 props
function Parent() {
  return <Child name="张三" age={18} onClick={handleClick} />;
}

// 子组件接收 props(只读)
function Child({ name, age, onClick }) {
  return (
    <div onClick={onClick}>
      {name}, {age} 岁
    </div>
  );
}
```

**props 不可变**：子组件不能直接修改 props，这是 React 单向数据流的核心。

```jsx
// ❌ 错误:直接修改 props
function Child({ count }) {
  count = count + 1; // 报错或无效
  return <div>{count}</div>;
}

// ✅ 正确:把 props 作为初始值,转换为自己的 state
function Child({ initialCount }) {
  const [count, setCount] = useState(initialCount);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### state

```jsx
function Counter() {
  const [count, setCount] = useState(0);  // 声明 state
  const [user, setUser] = useState({ name: '张三' });

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setUser({ ...user, name: '李四' })}>
        改名
      </button>
    </div>
  );
}
```

**注意**:
- 不可直接修改 state（必须用 setter）
- 引用类型必须返回新对象（不可变性）
- setter 可能是异步的，需要最新值用函数式 `setCount(c => c + 1)`

### 什么时候用 props？什么时候用 state？

| 场景 | 用什么 |
|------|--------|
| 数据由父组件提供 | props |
| 组件内部状态（开关、计数、输入） | state |
| 多个子组件共享 | 提到父组件 state，然后用 props 传 |
| 全局共享（用户、主题） | Context / Redux |

### 状态提升（Lifting State Up）

当多个子组件需要共享状态时，把 state 提升到它们的最近公共父组件。

```jsx
// 父组件管理共享 state
function Parent() {
  const [temp, setTemp] = useState(20);

  return (
    <>
      <Display temp={temp} />
      <Controller onChange={setTemp} />
    </>
  );
}

function Display({ temp }) {
  return <p>当前温度: {temp}°C</p>;
}

function Controller({ onChange }) {
  return (
    <>
      <button onClick={() => onChange(t => t + 1)}>+</button>
      <button onClick={() => onChange(t => t - 1)}>-</button>
    </>
  );
}
```

### 函数组件中的"state"指什么？

函数组件没有 `this.state`，所有"内部状态"都用 Hook（`useState` / `useReducer`）来表达。

```jsx
// 本质上:useState 返回的 [value, setter] 模拟了类组件的 this.state
const [count, setCount] = useState(0);
// 相当于
this.state = { count: 0 };
this.setState({ count: this.state.count + 1 });
```

### 常见误区

| 误区 | 正确做法 |
|------|---------|
| "props 是 state 的一种" | props 是外部传入，state 是内部拥有 |
| "子组件可以修改 props" | 错，props 不可变 |
| "state 可以直接赋值" | 必须用 setter，且引用类型要新对象 |
| "父组件的 state 子组件自动同步" | 需要通过 props 显式传递 |

---

## 35. 为什么不能直接修改 state？

React 要求 state 必须是**不可变数据（Immutable Data）**，必须通过 setter 创建新值，而不是修改原值。

### 直接修改有什么问题？

```jsx
function App() {
  const [user, setUser] = useState({ name: '张三', age: 18 });

  // ❌ 直接修改 state:不会触发 re-render,且破坏 React 状态管理
  const handleClick = () => {
    user.age = 19;        // 修改了对象,但 React 不知道
    setUser(user);        // 传入同一引用,React 认为没变,跳过更新
  };

  // ✅ 正确:创建新对象
  const handleClick2 = () => {
    setUser({ ...user, age: 19 });
  };
}
```

### 根本原因

#### 1. React 通过引用比较判断是否更新

```jsx
// React 内部(简化)
if (Object.is(prevState, newState)) {
  return; // 引用相同,跳过 re-render
}
```

直接修改后 setUser 传入的还是同一个对象，引用未变，React 认为 state 没变，不触发 re-render。

#### 2. 性能优化失效

React 依赖 prop 引用比较做 `React.memo` / `useMemo` 优化。直接修改会破坏这些优化。

#### 3. 时间旅行调试失效

Redux DevTools 等工具依赖不可变性来回放历史状态，直接修改会让历史记录错乱。

#### 4. 并发模式下产生 bug

React 18 可能在 render 阶段重跑函数（时间分片），如果直接修改 state，重跑时会读到不一致的数据。

### 不可变性怎么实现？

#### 基本类型

```jsx
const [count, setCount] = useState(0);
setCount(count + 1);     // ✅ 直接给新值
```

#### 对象

```jsx
// 浅拷贝 + 修改
setUser({ ...user, age: 19 });

// 嵌套对象(深拷贝)
setUser({
  ...user,
  address: { ...user.address, city: '北京' }
});

// 多个字段修改
setUser(prev => ({ ...prev, age: 19, name: '李四' }));
```

#### 数组

```jsx
const [list, setList] = useState([1, 2, 3]);

// 添加
setList([...list, 4]);
setList(prev => [...prev, 4]);

// 删除
setList(list.filter(item => item !== 2));
setList(list.filter((_, i) => i !== 1));

// 修改
setList(list.map(item => item === 2 ? 20 : item));

// 排序(注意要新数组)
setList([...list].sort((a, b) => a - b));
```

#### 嵌套数组/对象（深更新）

```jsx
// immer:让不可变更直观
import { produce } from 'immer';

setUser(produce(user, draft => {
  draft.age = 19;
  draft.address.city = '北京';
}));

// 或用 use-immer
const [user, setUser] = useImmer({ name: '张三', age: 18 });
setUser(draft => {
  draft.age = 19;
});
```

### 常见场景

#### 场景 1:表单输入

```jsx
const [form, setForm] = useState({ name: '', email: '' });

// ❌ 错误
form.name = '张三';

// ✅ 正确
setForm({ ...form, name: '张三' });

// ✅ 更优雅:动态 key
const handleChange = (key) => (e) => {
  setForm({ ...form, [key]: e.target.value });
};
<input onChange={handleChange('name')} />
```

#### 场景 2:列表操作

```jsx
const [todos, setTodos] = useState([]);

// ❌ 错误
todos.push(newTodo);

// ✅ 正确
setTodos([...todos, newTodo]);

// 切换完成状态
setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
```

### 核心原则

- **基本类型**：直接赋值新值
- **引用类型**：必须创建新引用（浅拷贝 / 深拷贝）
- **修改前先拷贝，再修改新对象**
- **复杂嵌套用 immer 简化**

---

## 36. React 中 render 的触发条件有哪些？

`render` 是 React 决定"渲染什么"的阶段，理解何时触发 render 是性能优化的基础。

### 触发 render 的所有情况

#### 1. 首次挂载（Initial Mount）

```jsx
const root = createRoot(document.getElementById('root'));
root.render(<App />);  // 首次 render
```

#### 2. 自身 state 更新

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  // setCount 调用 → 本组件 re-render
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

#### 3. 父组件 re-render

```jsx
function Parent() {
  const [count, setCount] = useState(0);
  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      {/* Parent re-render 时,Child 默认也会 re-render */}
      <Child />
    </>
  );
}

function Child() {
  console.log('Child rendered');  // 每次 Parent 更新都会打
  return <div>child</div>;
}
```

#### 4. props 变化（父传新值）

```jsx
function Parent() {
  const [count, setCount] = useState(0);
  return <Child value={count} />;  // count 变 → Child re-render
}
```

#### 5. Context 值变化

```jsx
const ThemeContext = createContext('light');

function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={theme}>
      <Toolbar /> {/* theme 变 → 所有消费了 ThemeContext 的组件 re-render */}
    </ThemeContext.Provider>
  );
}
```

#### 6. useReducer 的 dispatch

```jsx
function reducer(state, action) { /* ... */ }
const [state, dispatch] = useReducer(reducer, { count: 0 });
dispatch({ type: 'INC' });  // state 变 → re-render
```

#### 7. 订阅外部 store

```jsx
// zustand
const count = useStore(state => state.count);  // count 变 → re-render

// Redux
const count = useSelector(state => state.count);  // 同上

// useSyncExternalStore(React 18)
const value = useSyncExternalStore(subscribe, getSnapshot);
// store 变化 → re-render
```

#### 8. forceUpdate（类组件）

```jsx
class MyComponent extends React.Component {
  forceUpdate();  // 强制 re-render(绕过 shouldComponentUpdate)
}
```

#### 9. Suspense 子树 resolve

```jsx
<Suspense fallback={<Loading />}>
  <AsyncComponent />  {/* 异步组件加载完成 → 切换到真实内容,触发 re-render */}
</Suspense>
```

#### 10. key 变化（强制重新挂载）

```jsx
{showList && <List key={refreshKey} data={data} />}
// key 变化 → 卸载旧组件、挂载新组件(re-mount,不是 re-render)
```

### 不会触发 render 的情况

- 直接修改 state（不调用 setter）:不会
- 修改 props 对象内部属性（父组件不重新 render）:不会
- 在 render 阶段手动 setState:不会触发新的 render（本轮已 render）
- setState 传入相同的值（对象引用）:React 18 默认浅比较，跳过

### 父子组件的 render 关系

```
Parent re-render
    ↓
Child 默认也会 re-render(无论 props 是否变化)
    ↓
可以用 React.memo 阻止
```

**重要原则：默认情况下，父组件 re-render 会导致所有子组件 re-render，这是 React 的设计。**

### 性能优化

```jsx
// 1. React.memo 阻止不必要的子组件 re-render
const Child = React.memo(function Child({ value }) {
  console.log('Child rendered');
  return <div>{value}</div>;
});

// 2. useMemo 稳定引用
const config = useMemo(() => ({ a: 1, b: 2 }), []);

// 3. useCallback 稳定函数
const handleClick = useCallback(() => { /* ... */ }, []);

// 4. Context 拆分,避免大范围 re-render
const UserContext = createContext(null);
const ThemeContext = createContext('light');
// 两个 Context 独立,互不影响
```

### 调试 render

```jsx
// 用 React DevTools Profiler 看哪些组件在 render
// 或在组件中加日志
function Child({ value }) {
  console.count('Child render');
  return <div>{value}</div>;
}
```

---

## 37. 表单中 onChange 和原生 DOM 的 change 有什么区别？

React 的 `onChange` 与原生 DOM 的 `change` 事件**触发时机完全不同**，这是常见混淆点。

### 原生 DOM 的 change 事件

```html
<!-- 原生 change:失焦时才触发 -->
<input id="name" />
<script>
  document.getElementById('name').addEventListener('change', (e) => {
    console.log('change 触发', e.target.value);
  });
</script>
<!-- 输入时不会触发,只有失焦/回车时才触发 -->
```

**原生 change 触发时机**：输入框**失焦**或**回车提交**时。

### React 的 onChange 事件

```jsx
function Form() {
  const [value, setValue] = useState('');
  return <input value={value} onChange={e => setValue(e.target.value)} />;
  // ✅ 每次输入都触发,等价于原生 input 事件
}
```

**React onChange 触发时机**：**每次输入**（等价于原生 `input` 事件）。

### 为什么会这样？

React 团队为了让表单处理更符合直觉（就像 Angular 的 `ng-model`），故意把 React 的 `onChange` **映射到了原生 `input` 事件**，而不是 `change` 事件。

```
React 事件    →  原生事件
onChange      →  input(每次输入)
onInput       →  input(每次输入,和 onChange 等价)
onBlur        →  blur
onFocus       →  focus
onSubmit      →  submit
```

### 完整事件映射

| React 事件 | 原生事件 | 触发时机 |
|----------|---------|---------|
| `onChange` | `input` | 每次输入（增/删/改） |
| `onInput` | `input` | 每次输入（同 onChange） |
| `onBlur` | `blur` | 失焦 |
| `onFocus` | `focus` | 聚焦 |
| `onKeyDown` | `keydown` | 按键按下 |
| `onKeyUp` | `keyup` | 按键抬起 |
| `onKeyPress` | `keypress` | 按键（已弃用） |
| `onSubmit` | `submit` | 表单提交 |

### 受控组件的标准写法

```jsx
function ControlledInput() {
  const [value, setValue] = useState('');

  return (
    <input
      value={value}                              // 受控:value 由 state 控制
      onChange={e => setValue(e.target.value)}   // 每次输入同步到 state
    />
  );
}
```

### 想用原生"失焦才更新"怎么办？

```jsx
// 方案 1:用 onBlur 替代
function Form() {
  const [value, setValue] = useState('');
  return (
    <input
      defaultValue={value}
      onBlur={e => {
        console.log('失焦,提交:', e.target.value);
        setValue(e.target.value);
      }}
    />
  );
}

// 方案 2:防抖(等用户停止输入再更新)
function useDebouncedChange(callback, delay = 300) {
  const timer = useRef();
  return (e) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => callback(e.target.value), delay);
  };
}

function Search() {
  const [keyword, setKeyword] = useState('');
  const debouncedSet = useDebouncedChange(setKeyword, 500);
  return <input onChange={debouncedSet} />;
}
```

### 性能注意

```jsx
// ❌ 每次输入都触发重型操作(列表过滤、接口请求)
function BadSearch() {
  const [keyword, setKeyword] = useState('');
  return (
    <input
      value={keyword}
      onChange={e => {
        setKeyword(e.target.value);
        // 每次输入都执行,会卡
        filterBigList(e.target.value);
      }}
    />
  );
}

// ✅ 受控值即时更新,重型操作防抖
function GoodSearch() {
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDeferredValue(keyword); // React 18
  const list = useMemo(() => filterBigList(debouncedKeyword), [debouncedKeyword]);

  return (
    <>
      <input value={keyword} onChange={e => setKeyword(e.target.value)} />
      <List items={list} />
    </>
  );
}
```

---

## 38. 组件为什么必须返回单个根节点？React 16 之后有什么变化？

React 组件必须返回一个**单一的根元素**或一个**数组/Fragment**。

### 为什么有这个限制？

```jsx
// ❌ React 16 之前:不能编译
function App() {
  return (
    <h1>标题</h1>
    <p>正文</p>
  );
}

// ✅ 必须包一层
function App() {
  return (
    <div>
      <h1>标题</h1>
      <p>正文</p>
    </div>
  );
}
```

**根本原因**:
- JSX 会被编译成 `React.createElement(...)` 调用，每次调用只能创建一个元素
- React 需要一个根节点来管理子树、diff 和 DOM 更新
- 没有根节点，无法挂载组件、无法协调（reconciliation）

### 演变历程

#### React 16 之前：必须包 div

```jsx
// 必须有且只有一个根节点
function App() {
  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}
```

**问题**:
- 多余的 div 嵌套，污染 DOM 结构
- 样式上会有不必要的层级
- 表格、列表等结构中插入 div 会破坏 HTML 语义

#### React 16.0:Fragment 出现

```jsx
import { Fragment } from 'react';

function App() {
  return (
    <Fragment>
      <Header />
      <Content />
      <Footer />
    </Fragment>
  );
}

// 简写:空标签(短语法)
function App() {
  return (
    <>
      <Header />
      <Content />
      <Footer />
    </>
  );
}
```

**Fragment 不会渲染到 DOM 上**，解决了 div 污染问题。

#### React 16.2:Fragment 支持 key

```jsx
// 在列表中必须用 Fragment + key
function Glossary({ items }) {
  return (
    <dl>
      {items.map(item => (
        <Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
```

#### React 18:Fragment 支持改进

React 18 没有改变 Fragment 本质，但并发渲染下 Fragment 的处理更高效。

### 各方案对比

| 方案 | 是否渲染到 DOM | 适用场景 | 是否需要 key |
|------|--------------|---------|------------|
| `<div>` | 是 | 需要根容器的场景 | - |
| `<Fragment>` | 否 | 普通多元素返回 | 否 |
| `<>...</>` | 否 | 简写（列表外） | 否 |
| `<Fragment key={x}>` | 否 | 列表中的多元素 | 是 |
| **数组** | 否 | 动态多元素 | 必须有 key |

### 返回数组（React 16.0 引入）

```jsx
function App() {
  return [
    <Header key="h" />,
    <Content key="c" />,
    <Footer key="f" />
  ];
}
// ✅ 可以,但每个元素必须有 key
```

### 实际应用

#### 表格行内返回多元素

```jsx
// ✅ 用 Fragment,避免破坏 table 结构
function Row() {
  return (
    <>
      <td>单元格1</td>
      <td>单元格2</td>
    </>
  );
}

// 表格
<table>
  <tbody>
    <tr>
      <Row />
    </tr>
  </tbody>
</table>
```

#### 列表中用 Fragment + key

```jsx
function DefinitionList({ data }) {
  return (
    <dl>
      {data.map(item => (
        <Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.desc}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
```

### 总结

| 版本 | 多元素返回方式 |
|------|--------------|
| React 16 之前 | 必须包 `<div>` |
| React 16.0+ | 支持 `<Fragment>` 和 `<>...</>` |
| React 16.2+ | `<Fragment>` 支持 `key` |
| React 17/18 | 行为一致，无破坏性变化 |

---

## 39. React 中如何渲染 HTML？有什么风险？

React 默认对所有内容进行**转义**，防止 XSS。要插入原始 HTML，需要用 `dangerouslySetInnerHTML`，但会承担 XSS 风险。

### 默认行为：自动转义

```jsx
function App() {
  const html = '<script>alert("XSS")</script>';
  // React 自动把 < > 转义,显示为纯文本
  return <div>{html}</div>;
  // 实际渲染: <div>&lt;script&gt;alert("XSS")&lt;/script&gt;</div>
}
```

**默认安全**：即使传入 `<script>`，也只是显示文本，不会执行。

### dangerouslySetInnerHTML:渲染原始 HTML

```jsx
function Article({ content }) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

const article = '<p>这是一篇<strong>加粗</strong>的文章</p>';
<Article content={article} />
// 渲染: <div><p>这是一篇<strong>加粗</strong>的文章</p></div>
```

**命名由来**:`dangerously` 提醒开发者这是危险操作，需要自己保证安全。

### XSS 风险

#### 场景 1:用户输入直接渲染

```jsx
// ❌ 极危险:用户输入直接渲染
function Comment({ comment }) {
  return <div dangerouslySetInnerHTML={{ __html: comment }} />;
}

// 用户输入: <img src=x onerror="alert(document.cookie)">
// 后果:cookie 泄露(同源情况下)
```

#### 场景 2:URL 拼接

```jsx
// ❌ javascript: 协议注入
const userInput = 'javascript:alert(1)';
<a href={userInput}>链接</a>;
// 点击会执行 alert
```

#### 场景 3:style 注入

```jsx
// ❌ 旧版 IE 可通过 expression 执行 JS
const userInput = 'background: expression(alert(1))';
<div style={userInput} />;
```

### 安全方案

#### 1. 严格过滤 HTML（DOMPurify）

```jsx
import DOMPurify from 'dompurify';

function Article({ content }) {
  // 过滤掉危险标签和属性
  const clean = DOMPurify.sanitize(content);
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}

// 配置白名单
const clean = DOMPurify.sanitize(content, {
  ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li'],
  ALLOWED_ATTR: ['href', 'title', 'target']
});
```

#### 2. 不用 dangerouslySetInnerHTML，用 Markdown 库

```jsx
// React 生态常用
import ReactMarkdown from 'react-markdown';

function Article({ markdown }) {
  return <ReactMarkdown>{markdown}</ReactMarkdown>;
  // ReactMarkdown 内部用 unified/remark 解析,自动安全
}
```

#### 3. URL 安全校验

```jsx
function isSafeUrl(url) {
  try {
    const parsed = new URL(url, window.location.origin);
    return ['http:', 'https:', 'mailto:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

function Link({ href, children }) {
  if (!isSafeUrl(href)) return <span>{children}</span>;
  return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
}
```

#### 4. 使用可信来源

```jsx
// ✅ 来自后端的富文本(后端用白名单过滤)
function Article({ content }) {
  // 后端已用 bleach、xss 等库过滤
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
```

### 替代方案

| 需求 | 推荐方案 |
|------|---------|
| 显示富文本（后端过滤） | `dangerouslySetInnerHTML` + DOMPurify |
| 显示 Markdown | `react-markdown` |
| 显示代码高亮 | `react-syntax-highlighter` |
| 显示数学公式 | `react-katex` |
| 用户输入的纯文本 | 直接 `{text}` 即可（自动转义） |

### 总结

- React 默认对 `{value}` 转义，安全
- `dangerouslySetInnerHTML` 是"逃生舱"，谨慎使用
- 永远不要把用户输入直接传给 `dangerouslySetInnerHTML`
- 富文本场景：用 DOMPurify 过滤 + 后端配合
- Markdown 场景：用 `react-markdown` 等专业库

---

## 40. 什么情况下组件会重新渲染？如何避免不必要的 re-render？

理解 re-render 的触发条件是性能优化的核心。

### 触发 re-render 的场景

#### 1. 自身 state 更新

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  // setCount → Counter re-render
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

#### 2. 父组件 re-render

```jsx
function Parent() {
  const [, setTick] = useState(0);
  // Parent re-render → Child 默认也 re-render(无论 props 是否变)
  return <Child />;
}

const Child = () => {
  console.log('Child 渲染了');
  return <div>child</div>;
};
```

#### 3. Context 值变化

```jsx
const ThemeContext = createContext('light');

function ThemedButton() {
  const theme = useContext(ThemeContext);
  // ThemeContext.Provider 的 value 变化 → 消费它的组件全部 re-render
  return <button className={theme}>按钮</button>;
}
```

#### 4. Hook 订阅的 store 变化

```jsx
// zustand
const count = useStore(s => s.count);  // count 变 → re-render
// Redux
const count = useSelector(s => s.count);  // 同上
```

### 不必要的 re-render 案例

#### 案例 1:内联对象/数组导致 props 引用变化

```jsx
// ❌ 每次 Parent 渲染,config 都是新对象
function Parent() {
  const [count, setCount] = useState(0);
  return <Child config={{ theme: 'dark' }} />;
  // config 引用每次都不同 → Child 即便被 memo 也会 re-render
}
```

#### 案例 2:内联函数导致 props 函数引用变化

```jsx
// ❌ 每次 Parent 渲染,onClick 都是新函数
function Parent() {
  const [count, setCount] = useState(0);
  return <Child onClick={() => console.log('click')} />;
  // onClick 引用每次都不同 → Child 即便被 memo 也会 re-render
}
```

#### 案例 3:Context Provider 传内联值

```jsx
// ❌ 每次渲染 value 都是新对象,所有消费者 re-render
function App() {
  const [count, setCount] = useState(0);
  return (
    <MyContext.Provider value={{ count, setCount }}>
      <Children />
    </MyContext.Provider>
  );
}
```

### 避免不必要 re-render 的方法

#### 1. React.memo 包裹子组件

```jsx
const Child = React.memo(function Child({ value, onClick }) {
  console.log('Child 渲染');
  return <button onClick={onClick}>{value}</button>;
});

// 仅在 props 浅比较变化时才 re-render
```

**注意**:`React.memo` 默认浅比较 props，引用类型要保证引用稳定（配合 useMemo/useCallback）。

#### 2. useMemo 稳定引用

```jsx
function Parent() {
  const [count, setCount] = useState(0);
  // ✅ 引用稳定
  const config = useMemo(() => ({ theme: 'dark', count }), [count]);
  return <Child config={config} />;
}
```

#### 3. useCallback 稳定函数

```jsx
function Parent() {
  const [count, setCount] = useState(0);
  // ✅ 函数引用稳定
  const handleClick = useCallback(() => {
    console.log(count);
  }, [count]);
  return <Child onClick={handleClick} />;
}
```

#### 4. Context 拆分 + 稳定 value

```jsx
// ❌ 一个 Context 包含所有内容
const AppContext = createContext({ user: null, theme: 'light', count: 0 });

// ✅ 拆分 Context,按更新频率分
const UserContext = createContext(null);
const ThemeContext = createContext('light');
const CountContext = createState(0); // 用 state 包装,见下方
```

#### 5. Context Selector（类库支持）

```jsx
// use-context-selector
import { createContext, useContextSelector } from 'use-context-selector';

const CountContext = createContext({ count: 0, setCount: () => {} });

function Child() {
  // 只订阅 count,count 变才 re-render
  const count = useContextSelector(CountContext, v => v.count);
  return <div>{count}</div>;
}
```

#### 6. 状态放在合适的层级

```jsx
// ❌ 状态放太高,所有子组件都 re-render
function App() {
  const [inputValue, setInputValue] = useState('');
  return (
    <>
      <HeavyList />
      <input value={inputValue} onChange={e => setInputValue(e.target.value)} />
    </>
  );
}

// ✅ 状态下沉,只影响必要的组件
function App() {
  return (
    <>
      <HeavyList />
      <InputBox /> {/* inputValue 状态只在 InputBox 内部 */}
    </>
  );
}
```

#### 7. 受控/非受控合理选用

```jsx
// 不需要每次都同步到 React state 时,用非受控
function Form() {
  // ✅ 非受控,避免每个输入都触发 re-render
  return (
    <form>
      <input name="email" />
      <input name="password" />
      <button type="submit">提交</button>
    </form>
  );
}
```

### 性能调试

```jsx
// 1. React DevTools Profiler
//    看哪些组件在 render,渲染耗时

// 2. why-did-you-render
import whyDidYouRender from '@welldone-software/why-did-you-render';
whyDidYouRender(React);

// 3. console.count 打点
function Child({ value }) {
  console.count('Child render');
  return <div>{value}</div>;
}
```

### 核心原则

- 不要过早优化，先用 Profiler 找到瓶颈
- 默认情况下，父 re-render 子也会 re-render
- React.memo 不是万能，引用变化就失效
- 状态要放在合适的层级，该下沉就下沉
- Context 不要装大对象，按需拆分

---

## 41. 自定义 Hook 怎么设计？

自定义 Hook 是 React 复用**有状态逻辑**的最佳方式，本质是封装"用到了 React 内置 Hook 的函数"。

### 命名规范

- **必须以 `use` 开头**：React 通过命名识别 Hook
- 命名要能表达意图：`useFetch` / `useDebounce` / `useLocalStorage`

```jsx
// ✅ 正确
function useDebounce(value, delay) { /* ... */ }
function useLocalStorage(key, initial) { /* ... */ }

// ❌ 错误命名不会被识别为 Hook
function debounce(value, delay) { /* ... */ } // 不会做 Hook 检查
```

### 设计原则

#### 1. 单一职责

一个 Hook 只做一件事，避免大杂烩。

```jsx
// ✅ 单一职责
function useDebounce(value, delay) { /* 只做防抖 */ }
function useLocalStorage(key, initial) { /* 只做本地存储 */ }

// ❌ 杂糅
function useEverything() { /* 防抖 + 存储 + 请求 + 校验... */ }
```

#### 2. 返回值稳定

```jsx
// ✅ 稳定引用
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  // 返回对象/数组用 useMemo 稳定
  return useMemo(() => [value, setValue], [value]);
}

// 或返回常用工具方法
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue(v => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  return { value, toggle, setTrue, setFalse };
}
```

#### 3. 完整的清理逻辑

```jsx
// ✅ 完整的清理
function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id); // 清理
  }, [delay]);
}
```

#### 4. 参数设计

```jsx
// 可选参数放后面,有合理默认值
function useFetch(url, options = {}) { /* ... */ }

// 复杂配置用对象
function useRequest(service, {
  manual = false,         // 是否手动触发
  debounceWait = 0,       // 防抖
  pollingInterval = 0,    // 轮询
  onSuccess,              // 成功回调
  onError
} = {}) { /* ... */ }
```

#### 5. 错误处理

```jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(url)
      .then(r => r.json())
      .then(d => { if (!cancelled) setData(d); })
      .catch(e => { if (!cancelled) setError(e); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; }; // 防止 setState on unmounted
  }, [url]);

  return { data, error, loading };
}
```

### 实战案例

#### 案例 1:useLocalStorage

```jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setStoredValue = useCallback((newValue) => {
    setValue(prev => {
      const value = typeof newValue === 'function' ? newValue(prev) : newValue;
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.error(e);
      }
      return value;
    });
  }, [key]);

  // 监听其他标签页修改
  useEffect(() => {
    const handler = (e) => {
      if (e.key === key) {
        setValue(e.newValue ? JSON.parse(e.newValue) : initialValue);
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [key, initialValue]);

  return [value, setStoredValue];
}
```

#### 案例 2:useDebounce

```jsx
function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

// 使用
function Search() {
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword, 500);
  // 用 debouncedKeyword 发请求
  return <input value={keyword} onChange={e => setKeyword(e.target.value)} />;
}
```

#### 案例 3:useIntersectionObserver

```jsx
function useIntersectionObserver(options = {}) {
  const [entry, setEntry] = useState(null);
  const [node, setNode] = useState(null);

  useEffect(() => {
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      setEntry(entry);
    }, options);
    observer.observe(node);
    return () => observer.disconnect();
  }, [node, options.threshold, options.root, options.rootMargin]);

  return [setNode, entry];
}

// 使用
function LazyImage({ src }) {
  const [setNode, entry] = useIntersectionObserver({ threshold: 0.1 });
  const isVisible = entry?.isIntersecting;
  return (
    <div ref={setNode}>
      {isVisible && <img src={src} alt="" />}
    </div>
  );
}
```

#### 案例 4:usePrevious

```jsx
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current; // 渲染时返回的还是上次的值
}
```

#### 案例 5:useRequest（完整封装）

```jsx
function useRequest(service, options = {}) {
  const { manual = false, onSuccess, onError } = options;
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const lastParams = useRef();

  const run = useCallback(async (...params) => {
    setLoading(true);
    lastParams.current = params;
    try {
      const result = await service(...params);
      if (lastParams.current === params) {
        setData(result);
        onSuccess?.(result, params);
      }
      return result;
    } catch (e) {
      if (lastParams.current === params) {
        setError(e);
        onError?.(e, params);
      }
      throw e;
    } finally {
      if (lastParams.current === params) {
        setLoading(false);
      }
    }
  }, [service, onSuccess, onError]);

  useEffect(() => {
    if (!manual) run();
  }, [manual, run]);

  return { data, error, loading, run };
}

// 使用
function UserList() {
  const { data, loading, error, run: refresh } = useRequest(fetchUsers);
  if (loading) return <Loading />;
  if (error) return <Error onRetry={refresh} />;
  return <List data={data} />;
}
```

### 库推荐

- **ahooks**（国内）:开箱即用的 Hook 库
- **react-use**（国外）:覆盖面广
- **usehooks-ts**：TypeScript 友好
- **usehooks**：简洁实用

### 最佳实践

- 命名 `useXxx`
- 单一职责
- 完整清理副作用
- 返回值稳定（useMemo/useCallback）
- 处理边界情况（空值、错误、卸载）
- 写 TypeScript 类型
- 加 JSDoc 注释说明参数和返回值

---

## 42. Redux / Zustand / MobX 这类状态管理解决了什么问题？

状态管理库解决的是**跨组件、跨页面、复杂场景下共享状态**的问题。理解"为什么需要"比"怎么用"更重要。

### 为什么要用状态管理？

#### 场景：多组件共享状态

```jsx
// 不使用状态管理:prop drilling
function App() {
  const [user, setUser] = useState(null);
  return <Layout user={user} onLogout={() => setUser(null)} />;
}

function Layout({ user, onLogout }) {
  return (
    <>
      <Header user={user} onLogout={onLogout} />
      <Sidebar user={user} />
      <Content user={user} />
    </>
  );
}
// Layout 只是个壳子,根本不关心 user,但被迫透传
```

**问题**:
- 状态需要在多层组件中透传（prop drilling）
- 中间组件不关心这个状态，但被迫成为"传话筒"
- 兄弟组件共享状态需要提升到父组件，触发不必要 re-render
- 复杂业务下，状态分散、难追踪、难调试

#### 状态管理能解决什么

| 问题 | 状态管理的方案 |
|------|--------------|
| 跨组件状态共享 | 单一 store，任意组件订阅 |
| prop drilling | 不用逐层传 props |
| 状态可预测 | 集中管理，单向数据流 |
| 调试困难 | DevTools 时间旅行 |
| 多人协作状态冲突 | 明确的修改规范 |
| 状态持久化 | 中间件统一处理 |

### Redux 核心思想

**单一数据源 + 不可变 + 纯函数修改**。

```jsx
// 1. 定义 reducer(纯函数)
const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INC': return state + 1;
    case 'DEC': return state - 1;
    default: return state;
  }
};

// 2. 创建 store
const store = createStore(counter);

// 3. 派发 action
store.dispatch({ type: 'INC' });

// 4. 订阅
store.subscribe(() => console.log(store.getState()));

// 5. React 中使用
import { useSelector, useDispatch } from 'react-redux';

function Counter() {
  const count = useSelector(s => s); // 订阅
  const dispatch = useDispatch();
  return <button onClick={() => dispatch({ type: 'INC' })}>{count}</button>;
}
```

**优点**：可预测、DevTools 强、生态丰富  
**缺点**：样板代码多（早期）、学习曲线陡

### 现代方案：Zustand

Zustand 是更轻量的状态管理，API 简洁，正在取代 Redux 成为新项目首选。

```jsx
import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  user: null,
  inc: () => set((s) => ({ count: s.count + 1 })),
  setUser: (user) => set({ user }),
  reset: () => set({ count: 0, user: null })
}));

// 组件中使用
function Counter() {
  const count = useStore((s) => s.count);     // 选择性订阅
  const inc = useStore((s) => s.inc);
  return <button onClick={inc}>{count}</button>;
}
```

**优点**：极简 API（几十行）、性能好（自动浅比较）、TypeScript 友好  
**缺点**：DevTools 没 Redux 强

### 响应式方案：MobX

MobX 用**响应式编程**思想，state 可变，自动追踪依赖。

```jsx
import { makeAutoObservable, observer } from 'mobx';

class CounterStore {
  count = 0;
  constructor() { makeAutoObservable(this); }
  inc() { this.count++; }
  dec() { this.count--; }
  get double() { return this.count * 2; }
}

const counter = new CounterStore();

// 组件用 observer 包装,自动响应变化
const Counter = observer(() => {
  return <button onClick={() => counter.inc()}>{counter.count}</button>;
});
```

**优点**：面向对象、心智模型简单、自动追踪  
**缺点**：可变性在并发模式下有风险、国内生态弱（招聘要求少）

### 三者对比

| 维度 | Redux | Zustand | MobX |
|------|-------|---------|------|
| 数据流 | 单向、不可变 | 单向、不可变 | 响应式、可变 |
| 样板代码 | 多 | 极少 | 少 |
| 心智模型 | 函数式 | 函数式 | 面向对象 |
| 性能 | 中（需 selector） | 好（自动优化） | 好（细粒度） |
| DevTools | 强 | 中 | 中 |
| TypeScript | 好 | 极好 | 好 |
| 学习曲线 | 陡 | 平 | 平 |
| 国内使用率 | 高（存量） | 上升（新项目） | 低 |
| 适合场景 | 复杂业务、大团队 | 中小型项目、新项目 | 重业务逻辑、复杂计算 |

### 选型建议

| 场景 | 推荐 |
|------|------|
| 中小型项目 | **Zustand**（首选） |
| 大型复杂应用、团队大 | **Redux Toolkit**（RTK 简化了 Redux） |
| 重业务逻辑、计算属性 | **MobX** |
| 简单场景 | Context + useReducer |
| 服务器状态（API 数据） | **React Query / SWR**（注意：这是另一种范畴） |

### 关键观点

1. **不要为了用而用**：简单的状态用 `useState` + `Context` 即可
2. **状态管理 ≠ 服务器状态**：API 数据应该用 React Query / SWR，而不是 Redux
3. **Redux Toolkit 是新方向**：RTK 大幅简化了 Redux 的样板代码
4. **Zustand 正在成为主流**：新项目首选
5. **MobX 适合特定场景**：国内招聘需求少，慎选

### 真正的"问题"分层

```
应用状态
├── UI 状态(开关、Tab、Modal)         → useState / useReducer
├── 业务状态(用户、权限、购物车)       → Zustand / Redux
├── 表单状态                           → React Hook Form / Formik
├── 服务器状态(API 数据)               → React Query / SWR
└── 路由状态                           → URL / Router
```

---

## 43. forwardRef 和 useImperativeHandle 是什么？

`forwardRef` 让父组件可以获取**子组件内部的 ref**，`useImperativeHandle` 进一步**控制暴露给父组件的方法**。

### 为什么需要 forwardRef？

```jsx
// 父组件想拿到 input 的 ref
function Parent() {
  const inputRef = useRef();
  return (
    <>
      <MyInput ref={inputRef} />      {/* 默认 ref 指向组件实例,不是 DOM */}
      <button onClick={() => inputRef.current.focus()}>聚焦</button>
    </>
  );
}

const MyInput = (props) => <input {...props} />;
// ❌ inputRef.current 是 MyInput 组件实例,没有 .focus 方法
```

**问题**：函数组件没有实例，ref 默认绑不到 DOM 元素上。

### forwardRef 转发 ref

```jsx
import { forwardRef, useRef } from 'react';

const MyInput = forwardRef((props, ref) => {
  // ref 是父组件传过来的,直接绑到 input 上
  return <input ref={ref} {...props} />;
});

function Parent() {
  const inputRef = useRef();
  return (
    <>
      <MyInput ref={inputRef} />      {/* 现在指向真实 input DOM */}
      <button onClick={() => inputRef.current.focus()}>聚焦</button>
    </>
  );
}
```

**forwardRef 的本质**：把 ref 从父组件"穿透"到子组件内部的 DOM 元素。

### useImperativeHandle:自定义暴露的方法

有时不希望父组件拿到子组件的所有内部细节，只暴露部分方法。

```jsx
import { forwardRef, useRef, useImperativeHandle } from 'react';

const MyInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  // 自定义暴露给父组件的 API
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => {
      inputRef.current.value = '';
    },
    getValue: () => inputRef.current.value
  }));

  return <input ref={inputRef} {...props} />;
});

function Parent() {
  const inputRef = useRef();
  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>聚焦</button>
      <button onClick={() => inputRef.current.clear()}>清空</button>
    </>
  );
}
```

**优势**:
- 父组件只能调用暴露的方法，不能直接操作 DOM
- 子组件内部实现可改，API 保持稳定
- 更好的封装性

### 完整示例：封装 Form 组件

```jsx
const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    blur: () => inputRef.current.blur(),
    select: () => inputRef.current.select(),
    getValue: () => inputRef.current.value,
    setValue: (val) => { inputRef.current.value = val; }
  }), []);

  return <input ref={inputRef} {...props} />;
});

// 父组件使用
function Form() {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = () => {
    // 通过命令式 API 获取值
    const username = usernameRef.current.getValue();
    const password = passwordRef.current.getValue();
    api.login({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FancyInput ref={usernameRef} placeholder="用户名" />
      <FancyInput ref={passwordRef} type="password" placeholder="密码" />
      <button type="button" onClick={() => usernameRef.current.focus()}>
        聚焦用户名
      </button>
      <button type="submit">登录</button>
    </form>
  );
}
```

### 适用场景

| 场景 | 是否适合 |
|------|---------|
| 父组件需要触发子组件的副作用（聚焦、滚动） | ✅ 适合 |
| 父组件需要调用子组件的命令式方法 | ✅ 适合 |
| 父组件需要直接读子组件的 DOM 属性 | ✅ 适合 |
| 父子组件纯数据通信 | ❌ 用 props |
| 子组件状态提升到父组件 | ❌ 用回调 |

### 注意事项

1. **慎用**：命令式 API 破坏了 React 的"声明式"哲学
2. **能用 props 解决就不用 ref**
3. **类组件不需要 forwardRef**：类组件有实例，ref 默认指向实例
4. **第三方组件库的兼容**：很多老组件库没有 forwardRef，需用 ref 转发
5. **不要滥用**：仅在确实需要"命令式操作"时使用

### vs 其他方案

```jsx
// 方案 1:useImperativeHandle(命令式)
const Modal = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false)
  }));
  // ...
});

// 方案 2:把 open 状态提升到父组件(声明式,推荐)
function Parent() {
  const [open, setOpen] = useState(false);
  return <Modal open={open} onClose={() => setOpen(false)} />;
}
// ✅ 优先用方案 2,更符合 React 哲学
```

**经验法则**:
- 能用 props/状态提升解决，就不用 ref
- ref 适用于"命令式、跨组件边界的瞬时操作"（聚焦、滚动、播放）

---

## 44. React 18 并发渲染是什么？是不是多线程？

**React 18 并发渲染不是多线程**。它是 React 在**同一线程**（JS 主线程）上，通过**时间分片（time slicing）**实现的"可中断渲染"机制。

### 一句话解释

**并发渲染 = React 能在渲染过程中暂停，去做更高优先级的事（比如响应用户输入），然后再回来继续渲染。**

### 不是多线程的原因

```
浏览器 JS 是单线程
    ↓
React 渲染、事件回调、定时器、Promise 都在同一线程
    ↓
React 18 之前:渲染一旦开始,必须一次完成(同步、不可中断)
React 18:渲染可暂停 → 执行高优任务 → 恢复渲染(时间分片)
    ↓
本质还是在单线程上切换任务(类似 async/await 让出主线程)
```

**关键点**:
- 浏览器没有给 React 多线程
- React 也没有用 Web Worker
- "并发"是"协调多个任务"的并发，不是"同时执行多个任务"

### 同步渲染的问题（React 18 之前）

```jsx
// React 18 之前:一次渲染 200ms(假设)
// 如果中间有用户点击,会卡顿到 200ms 后才响应
function BigList() {
  const items = Array.from({ length: 10000 }, (_, i) => i);
  return items.map(i => <HeavyItem key={i} value={i} />);
}
// 渲染 10000 个组件 → 200ms 内主线程被占满
// 用户点击按钮 → 200ms 后才看到反馈 → 卡顿
```

### 并发渲染如何解决

```jsx
// React 18:用 useTransition 标记为低优先级
function Search() {
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    setInput(e.target.value);  // 高优先级:立即更新输入框
    startTransition(() => {
      setList(filterBigList(e.target.value)); // 低优先级:可中断
    });
  };

  return <><input onChange={handleChange} /><List items={list} /></>;
}
```

**执行流程**:
1. 输入框立刻更新（高优先级）
2. 列表渲染被标记为 transition（低优先级）
3. React 渲染列表到一半，发现时间片用完（约 5ms）
4. **暂停**列表渲染
5. 让出主线程，响应用户输入
6. 主线程空闲后，**恢复**列表渲染
7. 直到完成

### 核心机制：时间分片

```
时间线:
|--render chunk 1--|--处理用户输入--|--render chunk 2--|--render chunk 3--|
       5ms              紧急任务           5ms                  5ms
```

React 在内部用 `MessageChannel`（或 `setImmediate`）做调度，每 5ms 检查一次是否需要让出主线程。

### 并发模式下的特性

| 特性 | 说明 |
|------|------|
| `useTransition` | 标记更新为低优先级，可中断 |
| `useDeferredValue` | 让一个值"延迟"更新 |
| 自动批处理 | 所有更新都自动批处理 |
| `<Suspense>` 改进 | 不阻塞 UI，显示 fallback |
| 并发渲染（Offscreen） | 实验性 API，可"后台预渲染" |
| 严格模式双调用 | 检测副作用，确保幂等性 |

### 与浏览器多线程对比

| 维度 | 浏览器多线程 | React 并发 |
|------|------------|-----------|
| 线程数 | 多个（Web Worker） | 单线程 |
| 是否真并行 | 是 | 否 |
| 实现 | Web Worker / Service Worker | 任务调度 + 时间分片 |
| 数据共享 | 需 postMessage | 同一调用栈 |
| React 用了吗 | 没用（但可结合） | ✅ 用了 |

### 什么时候会用到并发？

```jsx
// 1. 大列表渲染
const deferredKeyword = useDeferredValue(keyword);
const list = useMemo(() => filterBigList(deferredKeyword), [deferredKeyword]);

// 2. 复杂表单校验
const [isPending, startTransition] = useTransition();
const handleSubmit = () => {
  startTransition(() => {
    setValidation(validate(form));  // 复杂校验可中断
  });
};

// 3. 路由切换
startTransition(() => {
  setRoute(newRoute);  // 切路由时,旧页面白屏时间更短
});

// 4. 数据获取 + 渲染分离
<Suspense fallback={<Skeleton />}>
  <AsyncData /> {/* 数据未到时显示 fallback,不阻塞 UI */}
</Suspense>
```

### 注意事项

1. **并发不是性能银弹**：不会让代码变快，只是让 UI 更流畅
2. **副作用要幂等**：并发渲染可能在 render 阶段重跑函数（StrictMode 已模拟），直接修改 state、setState、订阅都会出问题
3. **不能立即读取最新 state**：transition 中的更新是异步的
4. **第三方库需要兼容**：老库可能没考虑并发，要测试
5. **DOM 副作用不要写在 render 中**：DOM 操作必须在 useEffect / useLayoutEffect 中

### 总结

- **并发渲染 = 在单线程上协调多个任务的执行顺序**
- **不是多线程**：还是 JS 主线程
- **核心能力**：可中断、可恢复、优先级调度
- **目的**：让高优先级任务（用户输入）不被低优先级任务（渲染）阻塞
- **API**:`useTransition` / `useDeferredValue` / `<Suspense>` 改进

---

## 45. Fiber 为什么可以中断和恢复？

Fiber 是 React 16 引入的**协调引擎**，让渲染过程**可中断、可恢复、优先级可控**。其核心是**链表结构 + 循环遍历**。

### 一句话原理

**Fiber 把"递归遍历虚拟 DOM 树"改为"链表循环遍历"，从而可以在任意节点暂停，下次从暂停点继续。**

### 递归的问题（React 15）

```jsx
// React 15:深度优先递归遍历虚拟 DOM
function reconcileChildren(children) {
  children.forEach(child => {
    render(child);          // 渲染当前节点
    reconcileChildren(child.children);  // 递归子节点
  });
}
```

**问题**:
- 递归一旦开始，必须执行完整个树
- 主线程被占满，无法响应用户输入
- 不能按优先级调整渲染顺序

### Fiber 的解决方案

#### 1. 把虚拟 DOM 树转成 Fiber 链表

```js
// 每个 Fiber 节点有指向父、子、兄弟的指针
type Fiber = {
  type: any,         // 元素类型
  props: any,
  stateNode: any,    // 对应的 DOM 节点
  return: Fiber | null,   // 父节点
  child: Fiber | null,    // 第一个子节点
  sibling: Fiber | null,  // 下一个兄弟节点
  alternate: Fiber | null, // 上一次渲染的 Fiber(diff 对比)
  effectTag: number,      // 副作用标记
  // ...
};
```

**树形 → 链表的转换**:
```
       A
      / \
     B   C
    / \   \
   D   E   F

Fiber 链表(A 的子节点用 child + sibling 串联):
A.child = B → B.sibling = C
B.child = D → D.sibling = E
C.child = F
```

#### 2. 用循环替代递归

```js
// workLoop:循环处理 Fiber 节点
function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1; // 时间片用完就让出
  }
  if (!nextUnitOfWork && workInProgress) {
    commitRoot(); // 全部完成,提交到 DOM
  } else {
    requestIdleCallback(workLoop); // 否则继续调度
  }
}
```

**关键点**:`shouldYield` 判断时间片是否用完，用完就退出循环，下次接着干。

#### 3. 双缓冲：current Fiber 和 workInProgress Fiber

```js
// current:当前屏幕上显示的 Fiber 树
// workInProgress:正在构建的新 Fiber 树
// 构建完成后,workInProgress 替换 current,一次性提交到 DOM
```

**好处**:
- 渲染中任意时刻，屏幕上的 UI 都是完整的（老树）
- 新树构建失败，直接丢弃，不影响当前 UI
- Diff 对比变得简单（current vs workInProgress）

#### 4. 优先级调度（Lane 模型）

```js
// 不同更新分配不同优先级(Lane)
type Lane = number; // 32 位二进制,每位代表一个 Lane

const SyncLane: Lane = 0b0000001;        // 同步
const InputContinuousLane: Lane = 0b0000010; // 连续输入(拖拽)
const DefaultLane: Lane = 0b0000100;      // 默认
const TransitionLane: Lane = 0b0001000;   // transition
const IdleLane: Lane = 0b0100000;         // 空闲
```

**调度策略**:
- 每次只渲染最高优先级的 Lane
- 高优先级可打断低优先级
- 同优先级合并批处理

### 中断和恢复的完整流程

```
1. 用户点击按钮(setState)
2. React 调度器分配优先级
3. workLoop 开始
4. 执行 performUnitOfWork(处理 A 节点)
5. 执行 performUnitOfWork(处理 B 节点)
6. 执行 performUnitOfWork(处理 D 节点)
7. ⚠️ deadline.timeRemaining() < 1 → 暂停
8. 记录 nextUnitOfWork = E(下次从 E 开始)
9. 让出主线程,处理用户输入/动画
10. 主线程空闲 → requestIdleCallback(workLoop)
11. workLoop 继续,从 E 开始
12. ... 直到整棵树处理完
13. commitRoot 一次性提交到 DOM
```

### 关键 API

| API | 作用 |
|-----|------|
| `requestIdleCallback` | 在浏览器空闲时执行（React 18 用 `MessageChannel` 替代） |
| `MessageChannel` | 宏任务级别调度，比 setTimeout 更快、更稳定 |
| `shouldYield()` | 判断是否让出主线程 |
| `workInProgress` | 正在构建的 Fiber 树 |

### 为什么不用 Generator？

React 团队曾考虑用 Generator 实现可中断，但放弃了：
- Generator 有传染性（传染整个调用栈）
- Generator 状态管理复杂
- 性能开销（上下文切换）

**最终方案**：手动实现 Fiber 链表 + 循环遍历，性能更好、控制更精确。

### 双阶段渲染

**Render 阶段**（可中断）:
- 构建 workInProgress 树
- Diff 算法对比
- 标记副作用（Placement / Update / Deletion）
- **不能**访问 DOM、不能 setState

**Commit 阶段**（不可中断）:
- 一次性把变更应用到 DOM
- 触发 useLayoutEffect / componentDidMount
- **不能**中断，必须执行完

### 总结

- Fiber 是**链表 + 循环**实现的协调器
- 通过**时间分片**实现可中断
- 通过 **workInProgress 树**实现可恢复
- 通过 **Lane 优先级**实现调度
- 浏览器主线程还是单线程，只是更智能地切分任务

---

## 46. SSR、Hydration、hydration mismatch 是什么？

SSR（服务端渲染）、Hydration（注水）、Hydration mismatch（水合不匹配）是 React 服务端渲染的三个核心概念。

### SSR 是什么？

**SSR（Server-Side Rendering）**：在服务端把 React 组件渲染成 HTML 字符串，直接返回给浏览器。

```
流程:
1. 浏览器请求页面
2. 服务端执行 React 组件 → 生成 HTML 字符串
3. 服务端把 HTML 返回给浏览器
4. 浏览器解析 HTML、显示内容(用户立刻看到内容)
5. 加载 JS 包
6. JS 执行,React 在客户端"接管"页面
```

#### CSR vs SSR 对比

| 维度 | CSR | SSR |
|------|-----|-----|
| 首屏渲染 | 慢（等 JS 下载执行） | 快（HTML 已在浏览器） |
| SEO | 差（爬虫看不到内容） | 好（HTML 有内容） |
| 首屏白屏 | 明显 | 几乎无白屏 |
| 服务器压力 | 小 | 大（每次请求都渲染） |
| 适用场景 | 后台、SPA | 营销页、内容站 |

#### 简单 SSR 示例

```js
// 服务端(express)
import { renderToString } from 'react-dom/server';
import App from './App';

app.get('/', (req, res) => {
  const html = renderToString(<App />);
  res.send(`
    <!DOCTYPE html>
    <html>
      <head><title>SSR App</title></head>
      <body>
        <div id="root">${html}</div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `);
});
```

### Hydration 是什么？

**Hydration**（注水）:浏览器加载完 JS 后，React 在客户端"复用"服务端生成的 HTML 树，绑定事件、初始化状态、接管交互。

```
SSR 输出:
<div id="root">
  <button>点击 +1</button>
</div>

浏览器看到: 一个按钮(还没法点)

Hydration 后:
<div id="root">
  <button>点击 +1</button>  ← React 接管,可以点击
</div>
```

**关键点**:
- Hydration 不会重新创建 DOM 节点
- 而是"认领"已有 DOM，挂上事件监听、初始化 state
- Hydration 完成后，页面变成可交互的 SPA

#### 客户端 hydrate

```js
// 客户端入口
import { hydrateRoot } from 'react-dom/client';
import App from './App';

hydrateRoot(document.getElementById('root'), <App />);
// 不用 createRoot(那是 CSR)
```

### Hydration mismatch（水合不匹配）

**Hydration mismatch**：服务端渲染的 HTML 和客户端首次渲染的内容不一致，React 会报错。

#### 常见场景

```jsx
// ❌ 场景 1:时间相关
function Clock() {
  return <div>当前时间: {new Date().toLocaleString()}</div>;
  // 服务端: "当前时间: 2024-01-01 10:00:00"
  // 客户端: "当前时间: 2024-01-01 10:00:01"
  // 不匹配!
}
```

```jsx
// ❌ 场景 2:随机数
function Random() {
  return <div>随机数: {Math.random()}</div>;
  // 服务端和客户端随机数不同 → mismatch
}
```

```jsx
// ❌ 场景 3:localStorage / window
function User() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  // 服务端没有 localStorage → 服务端渲染 "Guest"
  // 客户端有 user → 客户端渲染 "张三"
  // 不匹配!
}
```

```jsx
// ❌ 场景 4:浏览器 API
function Viewport() {
  return <div>宽度: {window.innerWidth}</div>;
  // window 在服务端不存在 → 报错或 mismatch
}
```

```jsx
// ❌ 场景 5:第三方组件
// 某些第三方组件在 SSR 下行为不同
```

#### 报错示例

```
Warning: Text content did not match. Server: "服务端内容" Client: "客户端内容"
Warning: Prop `style` did not match. Server: "color: red" Client: "color: blue"
```

### 解决 Hydration mismatch

#### 方案 1:客户端首次渲染保持与服务端一致

```jsx
// ✅ 服务端和客户端第一次都返回相同内容
function Clock() {
  const [time, setTime] = useState(null); // 初始 null
  useEffect(() => {
    setTime(new Date().toLocaleString()); // 仅在客户端更新
  }, []);
  return <div>当前时间: {time || '加载中...'}</div>;
}
```

#### 方案 2:suppressHydrationWarning（谨慎使用）

```jsx
// 对特定元素抑制 mismatch 警告
<time suppressHydrationWarning>
  {new Date().toLocaleString()}
</time>
// 仅抑制警告,内容仍可能不一致
```

#### 方案 3:动态导入（只在客户端渲染）

```jsx
// 用 useState + useEffect 判断"是否在客户端"
function ClientOnly({ children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null; // 服务端和首次客户端返回 null
  return children;
}

function App() {
  return (
    <ClientOnly>
      <Random /> {/* 只在客户端渲染,不会 mismatch */}
    </ClientOnly>
  );
}
```

#### 方案 4:动态导入 + Suspense（Next.js 推荐）

```jsx
import dynamic from 'next/dynamic';

const ClientChart = dynamic(() => import('./Chart'), { ssr: false });
// 该组件只在客户端渲染,不会参与 SSR
```

#### 方案 5:稳定序列化

```jsx
// 把数据从服务端序列化,客户端读取
function Page({ initialData }) {
  // 服务端把 initialData 序列化到 window.__INITIAL_DATA__
  // 客户端直接用,避免重新计算
  return <Component data={initialData} />;
}
```

### React 18 改进

| 改进 | 说明 |
|------|------|
| `<Suspense>` 改进 | 不阻塞 hydration，可显示 fallback |
| 渐进式 Hydration | 逐块 hydrate，不需要等所有 JS |
| `useId` | 解决 SSR 下 id 不稳定问题 |
| 流式 SSR | `renderToPipeableStream`，边渲染边返回 |
| 选择性 Hydration | 用户点击某块时，优先 hydrate 它 |

#### 流式 SSR

```js
// React 18 新 API
import { renderToPipeableStream } from 'react-dom/server';

app.get('/', (req, res) => {
  const { pipe, abort } = renderToPipeableStream(<App />, {
    onShellReady() {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      pipe(res);  // 边渲染边返回
    }
  });
  // 不再等整棵组件树完成,首字节时间(TTFB)大幅缩短
});
```

#### 渐进式 Hydration

```jsx
<Suspense fallback={<Skeleton />}>
  <HeavyComponent /> {/* 慢慢 hydrate,不阻塞其他交互 */}
</Suspense>
```

### 框架选择

| 框架 | 特点 |
|------|------|
| **Next.js** | 最成熟的 React SSR 框架，推荐 |
| **Remix** | 强调 Web 标准，数据加载优雅 |
| **Astro** | 部分 hydration，极致性能 |
| **Gatsby** | 静态站点，SSG 为主 |

### 核心要点

- **SSR**：服务端把组件渲染成 HTML
- **Hydration**：客户端 React 接管服务端 HTML
- **Hydration mismatch**：服务端和客户端内容不一致，需避免
- **避免 mismatch**：用 `useEffect` 设置客户端特有内容、`ClientOnly`、动态导入
- **Next.js**：最佳实践，内置了 SSR + 流式 + 渐进式 hydration

---

## 47. 手写实现 useLayoutEffect

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

## 48. 不使用脚手架手动搭建 React 应用

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

## 49. React 路由变化监听

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

