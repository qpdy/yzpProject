# Vue vs React 框架对比

## 1. 设计理念

### Vue
- **渐进式框架**：可以自底向上逐层应用，核心库只关注视图层
- **模板语法**：推荐使用 HTML 模板，学习曲线平缓
- **双向绑定**：Vue 2 使用 Object.defineProperty，Vue 3 使用 Proxy
- **响应式系统**：自动依赖追踪，开发者无需手动优化

### React
- **库而非框架**：只负责视图层，需要配合其他库使用
- **JSX 语法**：JavaScript 的扩展，在 JS 中写 HTML
- **单向数据流**：数据从父组件流向子组件
- **显式优化**：需要开发者手动优化性能（memo、useMemo 等）

## 2. 核心架构对比

### 组件定义

| 特性 | Vue | React |
|------|-----|-------|
| 模板 | Template / JSX | JSX |
| 样式 | Scoped CSS / CSS Modules | CSS Modules / CSS-in-JS |
| 状态 | ref / reactive | useState / useReducer |
| 副作用 | watch / watchEffect | useEffect |
| 上下文 | provide / inject | createContext / useContext |

### 代码示例对比

**Vue 3 组合式 API**

```vue
<script setup>
import { ref, computed, watch } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)

watch(count, (newVal) => {
  console.log(`Count changed to ${newVal}`)
})

function increment() {
  count.value++
}
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Doubled: {{ doubled }}</p>
    <button @click="increment">+</button>
  </div>
</template>

<style scoped>
button {
  background: #42b883;
}
</style>
```

**React Hooks**

```jsx
import { useState, useMemo, useEffect } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  const doubled = useMemo(() => count * 2, [count])

  useEffect(() => {
    console.log(`Count changed to ${count}`)
  }, [count])

  function increment() {
    setCount(c => c + 1)
  }

  return (
    <div>
      <p>Count: {count}</p>
      <p>Doubled: {doubled}</p>
      <button onClick={increment}>+</button>
    </div>
  )
}
```

## 3. Diff 算法对比

### 共同前提（三假设）
所有框架的 diff 都建立在相同基础上，目的是避免朴素树 diff 的 O(n³) 复杂度：
- **同层比较**：只对比同一层级节点，跨层移动直接销毁重建（这是降到 O(n) 的关键）
- **类型即身份**：标签或组件类型不同 → 视为不同的树，不复用、整体重建
- **key 标识身份**：列表中靠 key 判断「是否同一个节点」，而非靠位置 index

> 三者的差异只体现在「列表子节点」的 diff 策略上。

### React Diff（Reconciliation）
- **同层比较 + 类型即身份 + key 匹配**：同上
- **列表 diff**：用 key 匹配新旧节点，再**单向遍历 + `lastPlacedIndex`**——记录上次访问过的旧节点最大位置，若当前节点位置 `< lastPlacedIndex` 则需要移动。**只保证结果正确，不追求最小移动**
- **Fiber 架构（React 16+）**：组件树改用 `child / sibling / return` 三指针的链表结构，让 diff 可以**随时保存现场、被高优先级任务打断、之后再恢复**
  - **Render 阶段**：算变更、打标记（可中断、可插队）
  - **Commit 阶段**：把变更一次性应用到真实 DOM（不可中断）
- **key 不稳定的代价**：用 index 或随机数当 key 会导致 fiber 节点误判，触发多余更新甚至状态错位

### Vue Diff
- **同层比较**：同样只比较同层级
- **双端比较（Vue 2）**：新旧数组各设头尾 4 个指针，每轮做 4 次比较（旧头↔新头、旧尾↔新尾、旧头↔新尾、旧尾↔新头），命中就移动指针；都不命中再用 `key → 旧索引` 的 map 兜底。**对头尾进出的场景（轮播、队列）特别友好**
- **快速 diff + LIS（Vue 3）**：借鉴 Inferno，目标是**最小化 DOM 移动**，分三步：
  1. **同步头尾**：从前往后扫相同前缀、从后往前扫相同后缀（位置天然正确，直接跳过）
  2. **构建 newIndexToOldIndexMap**：记录中间段每个新节点对应的旧位置
  3. **求最长递增子序列（LIS）**：LIS 内的节点相对顺序本就对、**不用动**，只移动其余节点；移动次数 = 总数 − LIS 长度，是该问题的最优解

### 对比

| 特性 | React | Vue 2 | Vue 3 |
|------|-------|-------|-------|
| 列表 diff | key + `lastPlacedIndex` 单向遍历 | 双端比较（4 指针 + key map） | 快速 diff（同步头尾 + LIS） |
| 是否最小移动 | 否 | 否（启发式） | 是（LIS 最优） |
| 可中断调度 | 是（Fiber，React 16+） | 否 | 否（靠响应式依赖收集减少 diff 范围） |
| 两阶段 | Render（可中断）/ Commit | patch（同步） | patch（同步） |
| 编译期优化 | 几乎无（JSX 运行时） | 少量 | 大量（Block Tree / PatchFlag / 静态提升） |

### 设计哲学
- **Vue**：走「编译期 + 运行时响应式」路线，靠依赖收集让只有真正变化的组件才 diff，再用 LIS 把移动做到最优 → **单组件内极致高效，但整体同步**
- **React**：走「运行时可调度」路线，牺牲单次 diff 的最优性，换 Fiber 的可中断调度，支持时间分片、Concurrent Mode → **宏观上不卡顿优于微观上最优**
- 两条路都自洽：Vue 解决**微观效率**，React 解决**宏观流畅**

## 4. 状态管理

### Vue 状态管理

**Pinia（Vue 3 官方推荐）**

```javascript
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    age: 0
  }),
  getters: {
    doubleAge: (state) => state.age * 2
  },
  actions: {
    async fetchUser() {
      const res = await api.getUser()
      this.name = res.name
      this.age = res.age
    }
  }
})

// 使用
const user = useUserStore()
user.name = 'Max'
await user.fetchUser()
```

### React 状态管理

**Zustand（轻量级）**

```javascript
import { create } from 'zustand'

const useUserStore = create((set, get) => ({
  name: '',
  age: 0,
  doubleAge: () => get().age * 2,
  fetchUser: async () => {
    const res = await api.getUser()
    set({ name: res.name, age: res.age })
  }
}))

// 使用
const { name, fetchUser } = useUserStore()
```

## 5. 路由对比

### Vue Router

```javascript
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About }
  ]
})

// 编程式导航
router.push('/about')
router.replace({ name: 'user', params: { id: 1 } })
```

### React Router

```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

// 编程式导航（使用 Hook）
const navigate = useNavigate()
navigate('/about')
navigate('/user/1', { replace: true })
```

## 6. 生命周期对比

| Vue 3 | React | 说明 |
|-------|-------|------|
| onBeforeMount | - | 挂载前 |
| onMounted | `useEffect(() => {}, [])` | 挂载完成 |
| onBeforeUpdate | - | 更新前 |
| onUpdated | `useEffect(() => {}, [deps])` | 更新完成 |
| onBeforeUnmount | - | 卸载前 |
| onUnmounted | `useEffect(() => { return () => {} }, [])` | 卸载完成 |
| onActivated | - | keep-alive 激活 |
| onDeactivated | - | keep-alive 停用 |
| onErrorCaptured | Error Boundary | 错误捕获 |

## 7. 性能优化对比

### Vue 自动优化

```vue
<script setup>
// 静态节点自动提升，无需优化
// 响应式数据自动追踪依赖
const count = ref(0)

// computed 自动缓存
const expensive = computed(() => {
  return heavyCalculation(count.value)
})
</script>

<template>
  <!-- 静态内容只渲染一次 -->
  <div>
    <h1>Title</h1>
    <p>Static content</p>
    <!-- 只有这部分会更新 -->
    <p>{{ count }}</p>
  </div>
</template>
```

### React 需要手动优化

```jsx
function Component({ data }) {
  // 需要手动使用 memo 避免不必要渲染
  // 需要使用 useMemo 缓存计算结果
  // 需要使用 useCallback 稳定函数引用

  const expensive = useMemo(() => {
    return heavyCalculation(data)
  }, [data])

  const handleClick = useCallback(() => {
    // ...
  }, [/* dependencies */])

  return <div>{expensive}</div>
}

// 需要用 memo 包裹整个组件
export default memo(Component)
```

## 8. 学习曲线

| 方面 | Vue | React |
|------|-----|-------|
| 入门难度 | ⭐⭐ | ⭐⭐⭐ |
| 模板语法 | HTML-like，容易上手 | JSX 需要适应 |
| 状态管理 | 响应式，直观 | 需要理解不可变性 |
| 生态系统 | 官方方案统一 | 选择多样，需要决策 |
| TypeScript | Vue 3 完善支持 | 完善支持 |
| 最佳实践 | 官方推荐，统一 | 社区驱动，多样 |

## 9. 生态系统

### Vue
- **官方维护**：Vue Router、Pinia、Vitest、Vue Test Utils
- **构建工具**：Vite（由 Vue 作者创建）
- **UI 组件库**：Element Plus、Ant Design Vue、Vuetify
- **状态管理**：Pinia（官方推荐）

### React
- **社区维护**：React Router、Redux、Zustand、Jest
- **构建工具**：Create React App、Vite、Next.js
- **UI 组件库**：Ant Design、Material-UI、Chakra UI
- **状态管理**：Redux、Zustand、Jotai、Recoil

## 10. 适用场景

### 选择 Vue 的场景
- 团队前端基础较弱，需要快速上手
- 项目需要统一的代码规范和最佳实践
- 中小型项目，需要快速开发
- 希望减少性能优化的心智负担

### 选择 React 的场景
- 大型项目，需要灵活的架构设计
- 团队 JavaScript 基础较好
- 需要与其他 React 生态系统集成（如 React Native）
- 希望有更多的技术选择自由度

## 11. 常见面试题

**Q1：Vue 和 React 的核心区别是什么？**

**答案**：
- **设计理念**：Vue 是渐进式框架，React 是视图库
- **数据流**：Vue 支持双向绑定，React 是单向数据流
- **模板**：Vue 使用模板语法，React 使用 JSX
- **优化**：Vue 自动优化，React 需要手动优化
- **学习曲线**：Vue 更平缓，React 需要更多 JavaScript 基础

**Q2：为什么 Vue 的响应式系统比 React 更高效？**

**答案**：
- Vue 使用 Proxy/Object.defineProperty 实现依赖自动追踪
- 精确知道哪些组件需要更新
- React 默认重新渲染整个子树，需要手动优化

**Q3：React Hooks 和 Vue Composition API 有什么区别？**

**答案**：
- **依赖追踪**：Vue 自动追踪，React 需要手动声明依赖数组
- **执行时机**：Vue watch/watchEffect 更可控，React 依赖依赖数组
- **闭包问题**： Vue ref 自动解包，React 需要注意闭包陷阱
- **组织方式**：两者都支持逻辑复用，但 Vue 的响应式系统更直观

**Q4：Vue 3 相比 Vue 2 有哪些改进？**

**答案**：
- Composition API：更好的逻辑复用和代码组织
- 性能提升：更快的虚拟 DOM 和更小的包体积
- TypeScript：更好的类型支持
- Teleport、Suspense 等新特性
- 更好的 Tree-shaking 支持

**Q5：React 18 的并发模式解决了什么问题？**

**答案**：
- 可中断渲染：避免长时间阻塞主线程
- 优先级调度：高优先级更新优先处理
- 自动批处理：减少不必要的渲染
- Transitions：区分紧急和非紧急更新
