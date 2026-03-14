---
sidebar_position: 5
title: Vue（面试要点）
---

# Vue 面试要点

## 目录
- [Vue的生命周期有哪些？](#1-vue的生命周期有哪些)
- [keep-alive组件有什么作用？](#2-keep-alive组件有什么作用)
- [v-if和v-show有什么区别？](#3-v-if和v-show有什么区别)
- [$refs是什么？有什么弊端？](#4-refs是什么有什么弊端)
- [$set的作用是什么？](#5-set的作用是什么)
- [如何找到父组件？如何找到根组件？](#6-如何找到父组件如何找到根组件)
- [$nextTick的作用是什么？](#7-nexttick的作用是什么)
- [scoped原理是什么？](#8-scoped原理是什么)
- [Vue中如何做样式穿透？](#9-vue中如何做样式穿透)
- [Vue组件间传值通讯有哪些方式？](#10-vue组件间传值通讯有哪些方式)
- [computed、watch有什么区别？](#11-computedwatch有什么区别)
- [props和data优先级谁高？](#12-props和data优先级谁高)
- [Vuex有哪些属性？](#13-vuex有哪些属性)
- [Vuex是单向数据流还是双向数据流？](#14-vuex是单向数据流还是双向数据流)
- [Vuex中的mutations和actions区别是什么？](#15-vuex中的mutations和actions区别是什么)
- [Vuex如何做持久化存储？](#16-vuex如何做持久化存储)
- [Vue设置代理的方式有哪些？](#17-vue设置代理的方式有哪些)
- [Vue项目打包上线的流程是怎样的？](#18-vue项目打包上线的流程是怎样的)
- [Vue路由模式有哪些？](#19-vue路由模式有哪些)
- [SPA以及SPA有什么优缺点？](#20-spa以及spa有什么优缺点)
- [Vue路径传值有哪些方式？](#21-vue路径传值有哪些方式)
- [vue router路由导航守卫有哪些类型？](#22-vue-router路由导航守卫有哪些类型)
- [Vue动态路由是什么？](#23-vue动态路由是什么)
- [v-model双向绑定原理是什么？](#24-v-model双向绑定原理是什么)
- [MVVM是什么？](#25-mvvm是什么)
- [vue常见修饰符有哪些？](#26-vue常见修饰符有哪些)
- [VUE中常见的指令有哪些？](#27-vue中常见的指令有哪些)
- [对vue指令的理解是什么？](#28-对vue指令的理解是什么)
- [如何封装vue自定义指令？](#29-如何封装vue自定义指令)
- [父子组件嵌套下的生命周期执行顺序是怎样的？](#30-父子组件嵌套下的生命周期执行顺序是怎样的)
- [如何获取事件对象？](#31-如何获取事件对象)
- [v-for中的key值作用是什么？](#32-v-for中的key值作用是什么)
- [Proxy相比defineProperty的优势在哪里？](#33-proxy相比defineproperty的优势在哪里)
- [vue-router动态路由和静态路由有什么区别？](#34-vue-router动态路由和静态路由有什么区别)
- [为什么data是一个函数？](#35-为什么data是一个函数)
- [Vue理解是什么？](#36-vue理解是什么)
- [vuex的理解是什么？](#37-vuex的理解是什么)
- [Vue项目中打包优化有哪些方式？](#38-vue项目中打包优化有哪些方式)
- [Vue实现首屏优化有哪些方法？](#39-vue实现首屏优化有哪些方法)
- [减少页面加载时间优化有哪些方法？](#40-减少页面加载时间优化有哪些方法)
- [$route和$router的区别是什么？](#41-route和router的区别是什么)
- [Vue的优点有哪些？](#42-vue的优点有哪些)
- [Vue 3 Composition API深入理解](#43-vue-3-composition-api深入理解)
- [Vue 3性能优化最佳实践](#44-vue-3性能优化最佳实践)
- [Vue 3中的Teleport和Suspense组件使用](#45-vue-3中的teleport和suspense组件使用)
- [Vue 3中watch和watchEffect的区别](#46-vue-3中watch和watcheffect的区别)
- [Vue 3中的provide/inject使用](#47-vue-3中的provideinject使用)
- [Vue 3中的异步组件和Suspense配合使用](#48-vue-3中的异步组件和suspense配合使用)
- [Vue 3中的自定义Hooks开发](#49-vue-3中的自定义hooks开发)
- [Vue 3中的响应式API深入解析](#50-vue-3中的响应式api深入解析)
- [Vue插槽（Slot）是什么？有哪些类型？](#51-vue插槽slot是什么有哪些类型)
- [什么是虚拟DOM？它的作用是什么？](#52-什么是虚拟dom它的作用是什么)
- [Vue的Diff算法原理是什么？](#53-vue的diff算法原理是什么)
- [Vue中的过滤器（Filters）是什么？如何使用？](#54-vue中的过滤器filters是什么如何使用)
- [Vue中的Mixin是什么？有什么优缺点？](#55-vue中的mixin是什么有什么优缺点)

---

## 1. Vue的生命周期有哪些？

Vue生命周期是指Vue实例从创建到销毁的整个过程。在这个过程中，Vue实例会经历一系列的初始化、挂载、更新和销毁等阶段，每个阶段都有对应的生命周期钩子函数供开发者使用。

### Vue 2生命周期钩子

Vue 2的生命周期主要分为八个阶段：

1. **beforeCreate()**：
   - 在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用
   - 此时data、methods、computed等都未初始化
   - 不能访问data、methods等属性

2. **created()**：
   - 在实例创建完成后被立即调用
   - data、methods、computed等已完成初始化
   - 可以访问data、methods等属性
   - 适合进行数据初始化、异步请求等操作
   - $el属性还未创建

3. **beforeMount()**：
   - 在挂载开始之前被调用：相关的 render 函数首次被调用
   - 模板编译完成，但尚未渲染到页面
   - $el已创建，但未挂载到页面

4. **mounted()**：
   - 实例被挂载后调用，这时 el 被新创建的 vm.$el 替换了
   - 页面已渲染完成，可以访问DOM元素
   - 适合进行DOM操作、定时器启动等
   - 注意这不是最后一个生命周期钩子

5. **beforeUpdate()**：
   - 数据更新时调用，发生在虚拟DOM打补丁之前
   - 适合在更新之前访问现有的DOM
   - 页面尚未更新

6. **updated()**：
   - 由于数据更改导致的虚拟DOM重新渲染和打补丁，在这之后会调用该钩子
   - 页面已更新
   - 避免在此期间更改状态，可能会导致无限循环更新

7. **beforeDestroy()**：
   - 实例销毁之前调用
   - 实例仍然完全可用
   - 适合进行清理工作，如清除定时器、取消网络请求等

8. **destroyed()**：
   - 实例销毁后调用
   - Vue实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁

### Vue 3生命周期钩子

Vue 3在Composition API中使用不同的生命周期钩子命名：

| Vue 2 选项式API | Vue 3 组合式API |
|----------------|----------------|
| beforeCreate   | setup()        |
| created        | setup()        |
| beforeMount    | onBeforeMount  |
| mounted        | onMounted      |
| beforeUpdate   | onBeforeUpdate |
| updated        | onUpdated      |
| beforeDestroy  | onBeforeUnmount|
| destroyed      | onUnmounted    |

### keep-alive相关的生命周期

当组件被`<keep-alive>`包裹时，会额外增加两个生命周期钩子：

1. **activated()**：
   - 被keep-alive缓存的组件激活时调用
   - 第一次进入组件时会按正常生命周期执行，最后执行activated
   - 第二次及以后进入组件时只执行activated

2. **deactivated()**：
   - 被keep-alive缓存的组件失活时调用
   - 当组件被切换掉时调用

### 生命周期使用场景

1. **beforeCreate**：
   - 一般不使用，因为什么都访问不到

2. **created**：
   - 数据初始化
   - 异步请求
   - 事件监听器初始化

3. **beforeMount**：
   - 模板编译完成，但未挂载
   - 可以进行最后的数据修改

4. **mounted**：
   - DOM操作
   - 启动定时器
   - 发起网络请求
   - 访问子组件

5. **beforeUpdate**：
   - 在数据更新前访问现有DOM
   - 需要在更新前手动移除事件监听器

6. **updated**：
   - 数据更新后操作DOM
   - 避免在此修改数据

7. **beforeDestroy**：
   - 清理工作
   - 清除定时器
   - 取消网络请求
   - 解绑事件监听器

8. **destroyed**：
   - 确认组件已销毁
   - 进行最终的日志记录

### 生命周期相关问题

1. **一旦进入到页面或者组件，会执行哪些生命周期，顺序是怎样的**？
   - beforeCreate
   - created
   - beforeMount
   - mounted

2. **在哪个阶段有$el，在哪个阶段有$data**？
   - beforeCreate：啥也没有
   - created：有data没有el
   - beforeMount：有data没有el
   - mounted：都有

3. **如果加入了keep-alive会多哪两个生命周期**？
   - activated
   - deactivated

4. **如果加入了keep-alive，第一次进入组件会执行哪些生命周期**？
   - beforeCreate
   - created
   - beforeMount
   - mounted
   - activated

5. **如果加入了keep-alive，第二次或者第N次进入组件会执行哪些生命周期**？
   - 只执行一个生命周期：activated（补充：因为这时候页面已经被缓存了）

### 注意事项

1. **避免在updated钩子中修改数据**，可能导致无限循环更新
2. **在beforeDestroy中清理资源**，避免内存泄漏
3. **正确使用keep-alive的生命周期钩子**，合理管理缓存组件的状态
4. **Vue 3中使用Composition API时**，生命周期钩子需要从vue中导入

## 2. keep-alive组件有什么作用？

### 基本用法

保留组件状态或避免重复渲染，提高页面切换性能（特别是对于复杂组件或数据获取成本高的组件），配合路由使用，实现页面切换时保持滚动位置。

```vue
<keep-alive>
  <component :is="currentComponent"></component>
</keep-alive>

<!-- 或者与路由结合 -->
<keep-alive>
  <router-view></router-view>
</keep-alive>
```

keep-alive提供了两个重要属性来控制哪些组件需要被缓存：

- **include**：字符串或正则表达式，只有匹配的组件会被缓存
- **exclude**：字符串或正则表达式，任何匹配的组件都不会被缓存

### 生命周期钩子

被`<keep-alive>`缓存的组件会多出两个生命周期钩子：

- **activated**：当组件被激活时调用，也就是从缓存中重新被使用时调用。
- **deactivated**：当组件被停用时调用，也就是被缓存起来时调用。

### 缓存策略

keep-alive提供了两个重要属性来控制哪些组件需要被缓存：

- **include**：字符串或正则表达式，只有匹配的组件会被缓存
- **exclude**：字符串或正则表达式，任何匹配的组件都不会被缓存

```vue
<keep-alive include="ComponentA,ComponentB">
  <component :is="currentComponent"></component>
</keep-alive>

<!-- 使用正则表达式 -->
<keep-alive :include="/ComponentA|ComponentB/">
  <component :is="currentComponent"></component>
</keep-alive>
```

### max属性

max属性用于限制keep-alive缓存的最大组件实例数。一旦超出这个数字，在新实例被创建之前，已缓存组件中最久没有被访问的实例会被销毁。

```vue
<!-- 最多缓存10个组件实例 -->
<keep-alive :max="10">
  <router-view></router-view>
</keep-alive>
```

### keep-alive的实现原理是什么？

- **LRU缓存策略**：通过max属性限制缓存数量，最近最少使用的会被销毁
- **组件缓存**：使用vnode.componentInstance保存组件实例
- **动态组件管理**：通过include/exclude过滤需要缓存的组件
- **生命周期管理**：在组件激活/停用时触发activated/deactivated钩子

### 实际应用场景有哪些？

- 标签页切换时保持页面状态
- 路由切换时保持滚动位置
- 复杂表单页面切换时保留用户输入
- 频繁切换的页面（如列表页和详情页）

## 3. v-if和v-show有什么区别？

1. v-show只是简单的控制元素的display属性，而v-if才是条件渲染（条件为真，元素将会被渲染，条件为假，元素会被销毁）；

2. v-show有更高的首次渲染开销，而v-if的首次渲染开销要小得多；

3. v-if有更高的切换开销，v-show切换开销小；

4. v-if有配套的v-else-if和v-else，而v-show没有；

5. v-if可以搭配template使用，而v-show不行。

**总结**：
- v-if与v-show都能控制DOM元素在页面的显示；
- v-if相比v-show开销更大（直接操作DOM节点增加与删除）；
- 如果需要非常频繁地切换，则使用v-show较好；
- 如果在运行时条件很少改变，则使用v-if较好。

## 4. $refs是什么？有什么弊端？

$refs是Vue.js提供的一个特殊属性，用于直接访问模板中的DOM元素或子组件实例。

### 作用

- 在模板中通过ref属性为元素或组件设置引用标识；
- 在JavaScript中通过this.$refs访问这些元素或组件实例。

### 适用场景

- 需要直接操作DOM（如焦点控制、动画触发）；
- 调用子组件的方法或访问子组件的数据（不推荐频繁使用）。

### 特性对比

| 特性 | $refs | 推荐替代方案 |
|------|-------|--------------|
| 作用 | 直接访问DOM或子组件实例 | 通过props/events、Vuex/Pinia、provide/inject |
| 响应式 | 绕过响应式系统 | 符合响应式原则 |
| 维护性 | 代码分散，难以追踪 | 代码集中，易于维护 |
| 测试难度 | 高（依赖模板渲染） | 低（纯逻辑测试） |
| 适用场景 | 操作DOM或调用子组件方法（谨慎使用） | 常规父子组件通信、全局状态管理 |

## 5. $set的作用是什么？

this.$set(要改的目标，'位置'，'要改的结果')

在Vue中，当你直接给对象添加新属性时，Vue无法检测到这种变化，因为JavaScript的对象属性添加操作不会触发setter。同样，当你直接通过索引修改数组元素时，Vue也无法检测到这种变化。因此，Vue提供了$set方法来确保这些变化能够被检测到，并触发相应的视图更新。

### 使用场景：

1. **给对象添加新属性**：
```javascript
// 错误做法（Vue无法检测到变化）
this.user.newProperty = 'value';

// 正确做法
this.$set(this.user, 'newProperty', 'value');
// 或者
Vue.set(this.user, 'newProperty', 'value');
```

2. **通过索引修改数组元素**：
```javascript
// 错误做法（Vue无法检测到变化）
this.items[0] = 'newItem';

// 正确做法
this.$set(this.items, 0, 'newItem');
// 或者使用数组变异方法
this.items.splice(0, 1, 'newItem');
// 或者
Vue.set(this.items, 0, 'newItem');
```

### 注意事项：

- 对于已经存在的对象属性，直接赋值是可以被Vue检测到的
- 对于数组，使用索引直接设置项和修改数组长度是无法被检测到的
- Vue 3中由于使用Proxy，已经不存在这个问题

## 6. 如何找到父组件？如何找到根组件？

- **父组件**：this.$parent找到当前组件的父组件，如果找不到就返回自身；
- **根组件**：this.$root。

### 使用建议：

虽然Vue提供了访问父组件和根组件的途径，但在实际开发中应尽量避免直接访问，因为这会增加组件间的耦合度，降低组件的可复用性和可维护性。

**推荐的组件通信方式：**
1. **父子组件通信**：通过props和events
2. **跨级组件通信**：通过provide/inject
3. **全局状态管理**：使用Vuex或Pinia

## 7. $nextTick的作用是什么？

获取更新后的DOM内容。

Vue更新DOM是异步更新的，数据变化，DOM的更新不会马上完成，nextTick的回调是在下次DOM更新循环结束之后执行的延迟回调。

在JavaScript的事件循环中，process.nextTick()的行为既不属于传统的微任务（Microtask），也不属于宏任务（Macrotask），而是有一个独立的队列称为"Next Tick Queue"，且它的优先级高于微任务。以下是详细解释：

### 执行顺序

在Node.js的事件循环中，process.nextTick()的回调会在当前阶段结束时、任何其他微任务（如Promise.then）之前执行。

优先级排序：同步代码 → process.nextTick() → 微任务（Promise/MutationObserver） → 宏任务（setTimeout/setInterval/I/O）。

### 默认实现：微任务（优先）

Vue 2.x和Vue 3.x在大多数现代浏览器中会优先使用微任务来调度$nextTick的回调，具体实现如下：

- Vue 2.x：使用Promise.then或MutationObserver（两者均为微任务）；
- Vue 3.x：直接使用Promise.then（微任务），并移除了对MutationObserver的依赖。

微任务的特点：在当前事件循环的同步代码执行完毕后，立即在渲染/绘制之前执行，且优先级高于宏任务（如setTimeout）。

### 降级方案：宏任务（兼容性）

如果浏览器不支持微任务（如旧版IE），Vue会回退到宏任务：

- Vue 2.x：使用setTimeout（宏任务）；
- Vue 3.x：不再支持旧浏览器，因此无需降级。

宏任务的特点：在当前事件循环的所有微任务完成后执行，且会被渲染/绘制打断（可能导致不必要的重排/重绘）。

## 8. scoped原理是什么？

### 样式隔离

添加scoped后，Vue会自动为组件内的所有元素添加一个唯一的data-v-xxxx属性（如data-v-f3f3eg9），并通过CSS属性选择器（如[data-v-f3f3eg9] h1）将样式限定在当前组件内。

### 避免样式冲突

不同组件的同名类名或标签选择器不会互相影响，适合大型项目或组件库开发。

## 9. Vue中如何做样式穿透？

- **CSS**：使用`>>>`；
- **Less**：使用`/deep/`；
- **SCSS**：使用`::v-deep`。

## 10. Vue组件间传值通讯有哪些方式？

Vue组件间通信是Vue开发中的核心概念，根据组件关系的不同，有多种通信方式。

### 1. **Props**（父子组件通信）

**适用场景**：父组件向子组件传递数据，实现单向数据流（父→子）。

**特点**：
- 数据流单向，从父到子
- 子组件不能直接修改props，符合单向数据流原则
- 支持多种数据类型验证

**示例**：
```vue
<!-- 父组件 -->
<ChildComponent :message="parentMessage" />

<!-- 子组件 -->
<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    }
  }
}
</script>
```

### 2. **自定义事件**（子→父通信）

**适用场景**：子组件向父组件发送数据或触发事件。

**特点**：
- 通过$emit触发事件
- 父组件通过@event监听
- 实现子到父的通信

**示例**：
```vue
<!-- 子组件 -->
<button @click="$emit('child-event', data)">点击</button>

<!-- 父组件 -->
<ChildComponent @child-event="handleChildEvent" />
```

### 3. **$parent / $children**（不推荐）

**适用场景**：直接访问父/子组件实例（Vue 2）。

**特点**：
- 组件耦合度高，难以维护
- 破坏了组件的独立性
- 不利于组件复用

### 4. **ref**（父访问子组件）

**适用场景**：父组件直接调用子组件的方法或访问数据。

**特点**：
- 通过ref注册引用标识
- 可以访问子组件的属性和方法
- 应谨慎使用，避免破坏数据流

**示例**：
```vue
<!-- 父组件 -->
<ChildComponent ref="childRef" />

<script>
export default {
  methods: {
    callChildMethod() {
      this.$refs.childRef.childMethod()
    }
  }
}
</script>
```

### 5. **Event Bus**（事件总线，小型项目适用）

**适用场景**：跨组件通信（非父子关系）。

**特点**：
- 通过一个全局事件中心传递事件
- 适用于简单的非父子组件通信
- 在大型项目中容易造成混乱

**示例**：
```javascript
// eventBus.js
import Vue from 'vue'
export const EventBus = new Vue()

// 组件A
import { EventBus } from './eventBus.js'
EventBus.$emit('custom-event', data)

// 组件B
EventBus.$on('custom-event', (data) => {
  // 处理数据
})
```

### 6. **Vuex**（状态管理，大型项目推荐）

**适用场景**：跨组件、跨层级共享状态。

**特点**：
- 集中式存储管理
- 响应式更新
- 适用于大型复杂应用
- 有完整的开发工具支持

### 7. **Provide / Inject**（祖先→后代通信）

**适用场景**：祖先组件向后代组件（无论层级多深）传递数据。

**特点**：
- 避免props逐层传递
- 适用于深层嵌套组件
- Provide的数据不是响应式的（Vue 2），Vue 3中可以是响应式的

**示例**：
```javascript
// 祖先组件
export default {
  provide: {
    theme: 'dark'
  }
}

// 后代组件
export default {
  inject: ['theme']
}
```

### 8. **$attrs / $listeners**（Vue 2，高级用法）

**适用场景**：透传props和事件（如创建高阶组件）。

**特点**：
- $attrs包含父作用域中不作为prop被识别的特性绑定
- $listeners包含父组件中的v-on事件监听器
- 常用于高阶组件的封装

### 9. **Pinia**（Vue 3推荐状态管理）

**适用场景**：Vue 3的替代Vuex的轻量级状态管理。

**特点**：
- 基于Composition API，更简洁
- 支持TypeScript
- 支持服务端渲染
- 模块化设计，易于拆分

### 10. **v-model**（双向绑定）

**适用场景**：实现父子组件间的双向数据绑定。

**特点**：
- Vue 2中默认绑定value属性，监听input事件
- Vue 3中默认绑定modelValue属性，监听update:modelValue事件
- 支持自定义修饰符

### 11. **插槽（Slots）**

**适用场景**：父组件向子组件传递模板片段。

**特点**：
- 具名插槽：传递特定内容到子组件指定位置
- 作用域插槽：子组件向父组件传递数据
- Vue 3中使用v-slot指令

### 选择建议

1. **父子组件通信**：优先使用props和自定义事件
2. **跨层级组件通信**：使用provide/inject或状态管理（Vuex/Pinia）
3. **兄弟组件通信**：使用状态管理或事件总线
4. **大型应用**：推荐使用Vuex（Vue 2）或Pinia（Vue 3）
5. **简单场景**：可以使用ref或事件总线

## 11. computed、watch有什么区别？

### computed

**用途**：用于计算基于其他响应式数据的派生值（类似于"计算属性"）。

**特点**：
- **缓存机制**：只有依赖的响应式数据发生变化时，computed才会重新计算，否则直接返回缓存结果；
- **返回值**：必须返回一个值（或对象/数组），用于模板或逻辑中直接使用；
- **无副作用**：computed仅用于计算，不应修改其他状态。

### watch

**用途**：用于监听响应式数据的变化，并在变化时执行异步或开销较大的操作（如API调用、复杂逻辑）。

**特点**：
- **无缓存**：每次依赖变化都会触发回调函数；
- **灵活性**：可以执行异步操作、修改其他状态或触发副作用；
- **可配置**：支持深度监听（deep: true）、立即执行（immediate: true）等选项。

### 对比

| 维度 | computed | watch |
|------|----------|-------|
| 触发条件 | 依赖的响应式数据变化 | 监听的响应式数据变化 |
| 返回值 | 必须返回一个值 | 无返回值（回调函数内操作其他状态） |
| 缓存 | 有缓存（依赖不变时直接返回缓存值） | 无缓存（每次变化都触发） |
| 适用场景 | 派生数据计算、模板中直接使用 | 异步操作、复杂逻辑、副作用 |
| 性能 | 适合频繁使用的计算结果 | 适合一次性操作，避免不必要的触发 |

## 12. props和data优先级谁高？

组件内部，props的优先级高于data。如果props和data中定义了同名的属性，组件会优先使用props的值，而忽略data中的定义。

**原因**：
props是父组件传递给子组件的数据，子组件应将其视为"只读"的外部输入。Vue的设计原则是数据从父组件流向子组件，因此props的值会覆盖data中的同名属性。

## 13. Vuex有哪些属性？

Vuex是一个专为Vue.js应用程序开发的状态管理模式，它采用集中式存储管理应用的所有组件的状态。

Vuex主要包括以下几个核心属性：

1. **State**：存储应用的状态数据，相当于Vue实例中的data。
2. **Getter**：从state中派生出一些状态，相当于Vue实例中的computed。
3. **Mutation**：更改Vuex的store中的状态的唯一方法，类似于Vue实例中的methods。
4. **Action**：提交mutation，可以包含任意异步操作。
5. **Module**：将store分割成模块，每个模块拥有自己的state、mutation、action、getter。

## 14. Vuex是单向数据流还是双向数据流？

Vuex遵循单向数据流的原则。在Vuex中，数据流严格按照以下方向进行：

1. 组件通过dispatch触发Action
2. Action通过commit提交Mutation
3. Mutation修改State
4. State的改变驱动组件更新

这种单向数据流的好处是：
- 数据流清晰可追踪
- 便于调试和维护
- 避免数据混乱和不一致

## 15. Vuex中的mutations和actions区别是什么？

| 特性 | Mutations | Actions |
|------|-----------|---------|
| 作用 | 直接修改state | 提交mutations |
| 执行环境 | 同步执行 | 可以异步执行 |
| 调用方式 | store.commit('mutationName') | store.dispatch('actionName') |
| 参数 | (state, payload) | (context, payload) |

**Mutations**：
- 必须是同步函数
- 是唯一可以修改state的方式
- 通过commit调用

**Actions**：
- 可以包含异步操作
- 通过dispatch调用
- 不能直接修改state，需要通过commit提交mutation

## 16. Vuex如何做持久化存储？

Vuex的状态存储在内存中，刷新页面后会丢失。为了实现持久化存储，可以使用以下几种方式：

1. **使用vuex-persistedstate插件**：
```javascript
import createPersistedState from 'vuex-persistedstate'

const store = new Vuex.Store({
  // ...
  plugins: [createPersistedState()]
})
```

2. **手动实现持久化**：
```javascript
// 存储到localStorage
const store = new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || {}
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    }
  }
})
```

3. **使用sessionStorage**：
```javascript
const store = new Vuex.Store({
  state: {
    token: sessionStorage.getItem('token') || ''
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
      sessionStorage.setItem('token', token)
    }
  }
})
```

## 17. Vue设置代理的方式有哪些？

在Vue开发中，为了避免跨域问题，可以通过以下方式设置代理：

1. **vue.config.js配置**：
```javascript
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
```

2. **package.json配置**：
```json
{
  "proxy": "http://localhost:3000"
}
```

3. **使用Nginx反向代理**：
```nginx
location /api/ {
    proxy_pass http://backend-server/;
}
```

## 18. Vue项目打包上线的流程是怎样的？

Vue项目打包上线的一般流程如下：

1. **代码检查和测试**：
   - 运行单元测试和端到端测试
   - 检查代码规范和潜在问题

2. **环境配置**：
   - 设置生产环境变量
   - 配置生产环境的API地址

3. **构建打包**：
   - 运行`npm run build`或`yarn build`
   - 生成dist目录下的静态文件

4. **部署准备**：
   - 压缩静态资源
   - 配置服务器（Nginx、Apache等）

5. **部署上线**：
   - 上传静态文件到服务器
   - 配置域名和SSL证书
   - 启动服务并测试

6. **监控和维护**：
   - 监控应用性能和错误
   - 定期更新和维护

## 19. Vue路由模式有哪些？

Vue Router提供了三种路由模式：

1. **Hash模式**：使用URL的hash部分来模拟一个完整的URL
2. **History模式**：利用HTML5 History API的pushState方法
3. **Abstract模式**：不依赖浏览器环境的路由模式

### Hash模式

**原理**：使用URL的hash（#）部分来模拟一个完整的URL，当hash改变时，页面不会重新加载。

**特点**：
- URL中带有#符号
- 兼容所有浏览器，包括不支持HTML5 History API的浏览器
- 不需要服务器配置

**配置**：
```javascript
const router = new VueRouter({
  mode: 'hash',
  routes: [...]
})
```

**缺点**：
- URL不够美观，带有#符号
- 不利于SEO

### History模式

**原理**：利用HTML5 History API的pushState()和replaceState()方法，可以在不刷新页面的情况下修改URL。

**特点**：
- URL干净，没有#符号
- 更利于SEO
- 需要服务器配置支持

**配置**：
```javascript
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

**服务器配置**：
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**缺点**：
- 需要服务器支持，否则刷新页面会出现404错误
- 不支持IE9及以下版本

### Abstract模式

**原理**：不依赖浏览器环境的路由模式，适用于Node.js环境或不支持浏览器API的环境。

**特点**：
- 不依赖浏览器的History API
- 适用于服务端渲染(SSR)或测试环境

**配置**：
```javascript
const router = new VueRouter({
  mode: 'abstract',
  routes: [...]
})
```

### 如何选择路由模式？

1. **新项目且有服务器配置权限**：推荐使用History模式，URL更美观，利于SEO
2. **需要兼容老浏览器**：使用Hash模式
3. **服务端渲染应用**：可以考虑Abstract模式
4. **简单项目或演示**：Hash模式，无需服务器配置

## 20. SPA以及SPA有什么优缺点？

SPA即Single Page Application（单页应用程序），是一种网络应用程序或网站的模型，它通过动态重写当前页面来与用户交互，而非传统的从服务器重新加载整个新页面。简单来说，用户在访问SPA应用时，首次加载会获取基本的HTML、CSS和JavaScript文件，之后在页面内的导航和交互（如点击按钮、切换页面）都不会导致整个页面的刷新，而是通过JavaScript动态更新页面的部分内容，给用户带来类似桌面应用程序的流畅体验。

### 优点

1. 用户体验佳
2. 前后端分离
3. 缓存优势
4. 开发效率高

### 缺点

1. SEO困难
2. 首屏加载时间长
3. 浏览器兼容性问题
4. 安全性问题

## 21. Vue路径传值有哪些方式？

1. **动态路由参数**

2. **查询参数**(path+query)：通过URL的查询字符串传递参数

3. **命名路由**(name+params)

## 22. vue router路由导航守卫有哪些类型？

导航守卫本质上是一个回调函数，它会在路由跳转的不同阶段被调用。每个守卫函数接收三个参数：

- **to**: 目标路由对象（即将进入的路由）
- **from**: 当前路由对象（即将离开的路由）
- **next**: 必须调用的函数，用于解析当前守卫

### 类型

1. **全局守卫**
2. **路由独享守卫**
3. **组件内守卫**

## 23. Vue动态路由是什么？

动态路由是指在应用运行时根据条件动态添加、删除或修改路由配置，而不是在应用初始化时就固定所有的路由。

### 实现方式

1. **使用router.addRoute()方法**：
```javascript
// 动态添加路由
router.addRoute({
  path: '/admin',
  component: Admin,
  children: [
    { path: 'dashboard', component: Dashboard }
  ]
})
```

2. **使用router.removeRoute()方法**：
```javascript
// 删除路由
router.removeRoute('admin')
```

3. **动态生成路由表**：
```javascript
// 根据用户权限动态生成路由
function generateRoutes(userPermissions) {
  const routes = []
  
  if (userPermissions.includes('admin')) {
    routes.push({
      path: '/admin',
      component: Admin
    })
  }
  
  return routes
}

const dynamicRoutes = generateRoutes(currentUser.permissions)
dynamicRoutes.forEach(route => router.addRoute(route))
```

### 应用

1. **权限控制**：根据用户角色动态生成可访问的路由
2. **菜单管理**：根据路由配置生成导航菜单
3. **模块化加载**：按需加载路由对应的组件
4. **多租户应用**：根据不同租户加载不同的功能模块

## 24. v-model双向绑定原理是什么？

v-model是Vue.js中用于实现表单输入和应用状态之间双向绑定的指令。其核心原理基于数据劫持（通过Object.defineProperty或Proxy）和事件监听。

### 1. 数据劫持（响应式原理）

- Vue 2.x使用Object.defineProperty劫持对象的属性，当数据变化时触发更新；
- Vue 3.x使用Proxy实现更全面的响应式（包括数组、新增属性等）；
- 关键点：当数据被修改时，Vue会通知依赖该数据的视图进行更新。

### v-model是语法糖

**原理**：

- **value绑定**：将数据（如message）绑定到表单元素的value属性；
- **input事件监听**：监听表单元素的input事件，将用户输入的值更新到数据中。

## 25. MVVM是什么？

MVVM（Model-View-ViewModel）是一种前端开发架构模式，旨在将应用程序的逻辑、数据和视图分离，提高代码的可维护性、可测试性和可扩展性。

MVVM由三个核心部分组成：

### 1. Model（模型）

**定义**：表示应用程序的数据和业务逻辑。

**职责**：
- 封装数据（如用户信息、商品列表等）；
- 处理与数据相关的业务逻辑（如计算、验证等）；
- 与后端API交互（如获取数据、提交数据）。

**特点**：
- 通常是一个纯JavaScript对象或类；
- 不关心视图或用户交互。

### 2. View（视图）

**定义**：用户界面，负责展示数据和接收用户输入。

**职责**：
- 显示Model中的数据；
- 捕获用户操作（如点击、输入等）；
- 不包含业务逻辑，仅负责展示和交互。

**特点**：
- 通常是HTML模板或组件；
- 在MVVM中，View是"被动"的，由ViewModel驱动。

### 3. ViewModel（视图模型）

**定义**：连接Model和View的桥梁，负责数据绑定和逻辑处理。

**职责**：
- 暴露Model中的数据给View（通过数据绑定）；
- 处理用户交互（如按钮点击），调用Model的方法；
- 将Model的变化通知给View（自动更新UI）。

**特点**：
- 通常是一个JavaScript对象，包含数据属性和方法；
- 实现数据绑定机制（如响应式更新）。

### 工作原理

#### 1. 数据绑定（Data Binding）

**定义**：将ViewModel中的数据与View中的元素自动同步。

**实现方式**：
- **单向绑定**：数据从ViewModel流向View（如显示文本）；
- **双向绑定**：数据在ViewModel和View之间双向流动（如输入框）。

**优势**：
- 无需手动操作DOM，减少代码量；
- 数据变化时UI自动更新，提高开发效率。

#### 2. 响应式更新

**定义**：当Model或ViewModel的数据发生变化时，自动更新相关的View。

**实现方式**：
- 使用Object.defineProperty（Vue 2.x）或Proxy（Vue 3.x）监听数据变化；
- 通过发布-订阅模式或观察者模式通知View更新。

#### 3. 命令绑定（Command Binding）

**定义**：将用户操作（如按钮点击）绑定到ViewModel的方法。

**实现方式**：
- 在View中定义事件（如@click）；
- 在ViewModel中定义对应的方法。

**优势**：
- 将用户交互逻辑与View分离，提高可维护性。

## 26. vue常见修饰符有哪些？

### 1. 事件修饰符

事件修饰符用于处理DOM事件细节，避免在方法中写大量事件处理逻辑。

| 修饰符 | 描述 | 示例 |
|--------|------|------|
| .stop | 调用event.stopPropagation()，阻止事件冒泡 | `<button @click.stop="doThis">` |
| .prevent | 调用event.preventDefault()，阻止默认行为 | `<form @submit.prevent="onSubmit">` |
| .capture | 使用事件捕获模式 | `<div @click.capture="doThis">` |
| .self | 只有当事件是从触发事件的元素本身触发时才触发回调 | `<div @click.self="doThat">` |
| .once | 事件只会触发一次 | `<a @click.once="doThis">` |
| .passive | 提升滚动性能，表示event.preventDefault()不会被调用 | `<div @scroll.passive="onScroll">` |

### 2. 按键修饰符

按键修饰符用于监听键盘事件，只有按下特定键时才会触发回调。

| 修饰符 | 描述 |
|--------|------|
| .enter | 回车键 |
| .tab | Tab键 |
| .delete | 删除键或退格键 |
| .esc | ESC键 |
| .space | 空格键 |
| .up/.down/.left/.right | 方向键 |
| .ctrl/.alt/.shift/.meta | 组合键（如Ctrl+C） |

### 3. 表单输入修饰符

表单输入修饰符用于简化表单输入处理。

| 修饰符 | 描述 | 示例 |
|--------|------|------|
| .lazy | 将input事件改为change事件后触发 | `<input v-model.lazy="msg">` |
| .number | 自动将输入值转为数值类型 | `<input v-model.number="age">` |
| .trim | 自动去除输入的首尾空格 | `<input v-model.trim="msg">` |

### 4. v-bind修饰符

v-bind修饰符用于属性绑定。

| 修饰符 | 描述 | 示例 |
|--------|------|------|
| .prop | 绑定DOM属性而非HTML属性（如disabled） | `<button :disabled.prop="isDisabled">` |
| .camel | 将kebab-case属性名转为camelCase（Vue 2.x已废弃，Vue 3不需要） |  |
| .sync | 用于父子组件通信的双向绑定（Vue 2.x已废弃，Vue 3用v-model替代） |  |

### 5. v-model修饰符

v-model修饰符用于表单输入的双向绑定。

| 修饰符 | 描述 | 示例 |
|--------|------|------|
| .lazy | 同表单输入修饰符，将input改为change触发 | `<input v-model.lazy="msg">` |
| .number | 同表单输入修饰符，自动转为数值类型 | `<input v-model.number="age">` |
| .trim | 同表单输入修饰符，自动去除首尾空格 | `<input v-model.trim="msg">` |

## 27. VUE中常见的指令有哪些？

| 指令类别 | 指令名称 | 作用 |
|----------|----------|------|
| 内容渲染 | v-text | 更新文本内容 |
|          | v-html | 更新HTML内容 |
| 属性绑定 | v-bind | 动态绑定属性（简写:） |
| 事件绑定 | v-on | 监听事件（简写@） |
| 条件渲染 | v-if | 条件渲染 |
|          | v-else | 条件分支 |
|          | v-else-if | 条件分支 |
|          | v-show | 切换显示/隐藏 |
| 列表渲染 | v-for | 列表渲染 |
| 表单输入绑定 | v-model | 双向数据绑定 |
| 其他 | v-pre | 跳过编译 |
|      | v-cloak | 避免未编译标签闪烁 |
|      | v-once | 只渲染一次 |

## 28. 对vue指令的理解是什么？

Vue指令是Vue.js提供的特殊属性（以v-开头），用于直接操作DOM或扩展HTML元素的行为。与组件不同，指令更侧重于底层DOM操作，而组件更关注数据驱动和逻辑封装。

**核心作用**：
- 简化常见的DOM操作（如聚焦、拖拽、权限控制）；
- 复用非响应式的逻辑（如动画、表单验证）；
- 增强HTML元素的功能（如自定义事件、动态样式）。

## 29. 如何封装vue自定义指令？

Vue自定义指令提供了一种方式来操作DOM元素，特别是在需要对普通HTML元素进行底层DOM操作时非常有用。

### 自定义指令的注册

#### 全局注册

```
// 注册一个全局自定义指令 v-focus
Vue.directive('focus', {
  // 当被绑定的元素插入到DOM中时...
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```

#### 局部注册

```
// 在组件中局部注册指令
export default {
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  }
}
```

### 钩子函数

自定义指令提供了几个钩子函数，可以在特定的时机执行相关操作：

1. **bind**：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。

2. **inserted**：被绑定元素插入父节点时调用（仅保证父节点存在，但不一定已被插入文档中）。

3. **update**：所在组件的VNode更新时调用，但是可能发生在其子VNode更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新。

4. **componentUpdated**：指令所在组件的VNode及其子VNode全部更新后调用。

5. **unbind**：只调用一次，指令与元素解绑时调用。

### 钩子函数参数

每个钩子函数都会接收到以下参数：

- **el**：指令所绑定的元素，可以用来直接操作DOM；
- **binding**：一个对象，包含以下属性：
  - **name**：指令名，不包括v-前缀；
  - **value**：指令的绑定值；
  - **oldValue**：指令绑定的前一个值，仅在update和componentUpdated钩子中可用；
  - **expression**：字符串形式的指令表达式；
  - **arg**：传给指令的参数；
  - **modifiers**：一个包含修饰符的对象；
- **vnode**：Vue编译生成的虚拟节点；
- **oldVnode**：上一个虚拟节点，仅在update和componentUpdated钩子中可用。

### 实际应用示例

#### 1. 权限控制指令

```
// 权限控制指令，根据用户权限决定元素是否显示
Vue.directive('permission', {
  bind: function (el, binding, vnode) {
    const { value } = binding
    const permissions = store.getters && store.getters.permissions
    
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value
      const hasPermission = permissions.some(permission => {
        return permissionRoles.includes(permission)
      })
      
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`权限校验失败！请设置操作权限标签值`)
    }
  }
})
```

#### 2. 防抖指令

```
// 防抖指令，防止按钮重复点击
Vue.directive('debounce', {
  bind: function (el, binding) {
    let timer
    el.addEventListener('click', () => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        binding.value()
      }, 300)
    })
  }
})
```

#### 3. 拖拽指令

```
// 拖拽指令
Vue.directive('drag', {
  bind: function (el, binding, vnode) {
    el.onmousedown = function (e) {
      const disx = e.pageX - el.offsetLeft
      const disy = e.pageY - el.offsetTop
      document.onmousemove = function (e) {
        el.style.left = e.pageX - disx + 'px'
        el.style.top = e.pageY - disy + 'px'
      }
      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null
      }
    }
  }
})
```

### 使用自定义指令

在模板中使用自定义指令非常简单：

```
<template>
  <div>
    <!-- 使用focus指令 -->
    <input v-focus placeholder="自动获取焦点">
    
    <!-- 使用权限控制指令 -->
    <button v-permission="['admin']">管理员可见</button>
    
    <!-- 使用防抖指令 -->
    <button v-debounce="handleClick">点击</button>
    
    <!-- 使用拖拽指令 -->
    <div v-drag class="draggable">拖拽我</div>
  </div>
</template>
```

### 注意事项

1. **避免过度使用**：自定义指令主要用于底层DOM操作，复杂的逻辑应尽量放在组件中；
2. **合理的抽象**：确保指令具有通用性，避免过于具体的实现；
3. **性能考虑**：注意避免在指令中进行过多的DOM操作，以免影响性能；
4. **文档化**：为团队开发的自定义指令编写清晰的文档说明。

自定义指令是Vue框架提供的强大功能之一，合理使用可以让代码更加简洁和可维护。

## 30. 父子组件嵌套下的生命周期执行顺序是怎样的？

在Vue中，当存在父子组件嵌套时，组件的生命周期钩子执行顺序遵循一定的规律：

### 加载渲染过程

1. **父组件**：beforeCreate
2. **父组件**：created
3. **父组件**：beforeMount
4. **子组件**：beforeCreate
5. **子组件**：created
6. **子组件**：beforeMount
7. **子组件**：mounted
8. **父组件**：mounted

### 更新过程

1. **父组件**：beforeUpdate
2. **子组件**：beforeUpdate
3. **子组件**：updated
4. **父组件**：updated

### 销毁过程

1. **父组件**：beforeDestroy
2. **子组件**：beforeDestroy
3. **子组件**：destroyed
4. **父组件**：destroyed

**总结**：创建和更新过程是先父后子，而销毁过程是先子后父。

## 31. 如何获取事件对象？

事件对象（Event Object）是自动传递给事件处理函数的参数，它包含了与事件相关的所有信息，如事件类型、触发事件的元素、鼠标位置、键盘按键等。

### Vue中的处理方式

1. **在模板中使用$event**：@click="handleClick($event)"

2. **直接使用事件参数**：在事件处理函数中不显式使用$event，Vue.js会自动将事件对象作为第一个参数传递给事件处理函数。：@click="handleClick"

3. **在自定义组件中使用v-on**：在自定义组件上使用v-on来监听事件，事件对象也会以类似的方式传递。

## 32. v-for中的key值作用是什么？

### 1. 唯一标识，提升渲染效率

**作用**：key是虚拟DOM的差异比较（Diff算法）的标识符。框架通过key判断元素是否需要重新渲染、复用或重新排序。

**如果没有key**：框架可能通过索引（index）比较元素，导致不必要的DOM操作（如重新渲染整个列表）。

### 2. 避免状态错乱

**场景**：当列表动态变化（如排序、过滤）时，key能确保组件状态（如输入框内容、选中状态）与正确的数据绑定。

**问题示例**：如果删除第一项，后续输入框的值会错位，因为框架复用了相同key的元素。

### 3. 正确使用key的原则

- **唯一性**：key必须是当前列表内唯一的字符串或数字（如item.id）。
- **稳定性**：避免使用随机数（如Math.random()），否则每次渲染key不同，导致性能下降。
- **避免索引**：除非列表是静态的，否则不建议用index（如:key="index"）。

## 33. Proxy相比defineProperty的优势在哪里？

| 维度 | Object.defineProperty | Proxy |
|------|----------------------|-------|
| 拦截范围 | 仅能拦截对象的已有属性，无法拦截新增属性或数组索引。 | 可以拦截对象的所有操作（包括新增属性、删除属性、数组索引等）。 |
| 动态性 | 必须在初始化时定义所有属性，无法动态扩展。 | 可以动态拦截新增属性或修改后的对象。 |
| 性能 | 对大型对象初始化时可能阻塞主线程（Vue 2 的痛点）。 | 惰性拦截，仅在操作时触发，性能更优。 |
| 兼容性 | 兼容所有浏览器（ES5+）。 | 需要ES6+环境（现代浏览器和Node.js支持）。 |
| 语法复杂度 | 需手动递归遍历对象，代码冗长。 | 语法简洁，支持链式操作。 |
| 特殊数据类型支持 | 无法直接拦截数组的索引操作（需重写数组方法）。 | 可以直接拦截数组的索引、push、pop等操作。 |

### （1）拦截范围更广

**Object.defineProperty的局限性**：
- 只能拦截对象的已有属性，无法拦截新增属性或数组的索引操作。
- 例如，Vue 2中对数组的响应式处理需要重写'push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'等方法，无法直接拦截arr[0] = 1。

**Proxy的优势**：
- 可以拦截对象的所有操作，包括：
  - 属性访问（get）、属性赋值（set）。
  - 新增属性（set）、删除属性（deleteProperty）。
  - 数组索引操作（set、get）。
  - 函数调用（apply）、构造函数调用（construct）。
  - 遍历操作（ownKeys）。

### （2）动态性更强

**Object.defineProperty的问题**：
- 必须在初始化时定义所有属性，无法动态拦截新增属性。
- 例如，Vue 2中对动态添加的属性需要使用Vue.set或this.$set。

**Proxy的优势**：
- 可以动态拦截新增属性或修改后的对象，无需预先定义。

### （3）性能优化

**Object.defineProperty的性能问题**：
- 在Vue 2中，响应式初始化需要递归遍历对象的所有属性，对大型对象可能阻塞主线程。
- 数组的响应式处理需要重写方法，增加额外开销。

**Proxy的优势**：
- 惰性拦截，仅在操作时触发，避免不必要的初始化开销。
- 例如，Vue 3中使用Proxy后，初始渲染性能显著提升。

### （4）语法更简洁

### （5）支持特殊数据类型

**Object.defineProperty的局限性**：
- 无法直接拦截数组的索引操作（如arr[0] = 1），需重写数组方法。
- 无法拦截Map、Set等ES6集合类型。

**Proxy的优势**：
- 可以直接拦截数组的索引操作、Map/Set的方法等。

## 34. vue-router动态路由和静态路由有什么区别？

| 特性 | 动态路由 | 静态路由 |
|------|----------|----------|
| 路径形式 | /user/:id（带参数） | /about（固定路径） |
| 组件复用 | 复用同一组件，通过参数区分 | 每个路径对应独立组件 |
| 参数获取 | 通过$route.params | 无参数 |
| 适用场景 | 用户详情、商品详情等 | 关于页面、首页等 |

## 35. 为什么data是一个函数？

在Vue.js中，data是一个函数（而不是直接的对象）的主要原因是为了确保组件的独立性和避免状态共享。

### 1. 组件复用时的状态隔离

- Vue组件可能会被多次复用（例如在同一个页面上多次使用同一个组件）。如果data是一个直接的对象，那么所有组件实例会共享同一个data对象，导致一个实例修改数据时，其他实例的数据也会被意外修改。
- 通过将data定义为函数，每次创建组件实例时，Vue会调用该函数，返回一个全新的数据对象，确保每个实例拥有独立的数据副本。

## 36. Vue理解是什么？

Vue.js是一套用于构建用户界面的渐进式JavaScript框架。与其它大型框架不同的是，Vue被设计为可以自底向上逐层应用。Vue的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue也完全能够为复杂的单页应用提供驱动。

### Vue的核心特性

1. **数据驱动视图**：Vue采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter、getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

2. **组件化开发**：Vue将页面拆分成独立的、可复用的组件树，每个组件都有自己的视图、数据和逻辑。

3. **指令系统**：Vue提供了一系列的指令来封装DOM操作，如v-if、v-for、v-bind、v-on等。

4. **虚拟DOM**：Vue使用虚拟DOM来减少直接操作真实DOM的性能损耗。

| 特性 | Vue 2 | Vue 3 |
|------|-------|-------|
| 响应式原理 | Object.defineProperty | Proxy（支持更多数据类型） |
| 组合式API | 不支持（需Vue Class Component） | 原生支持（setup、ref、reactive） |
| 性能优化 | 虚拟DOM优化 | 静态树提升、编译时优化 |
| TypeScript支持 | 一般 | 全面支持 |
| 打包体积 | 较大 | 更小（支持Tree-shaking） |
| Fragment支持 | 不支持（需要单一根元素） | 支持（允许多个根节点） |

## 37. vuex的理解是什么？

Vuex是Vue.js的官方状态管理库，专门用于管理Vue应用中的全局状态。它通过集中式存储的方式，确保所有组件共享的状态以一种可预测的方式发生变化。

### 为什么要使用Vuex？

在大型Vue应用中，多个组件可能会共享状态，如果组件之间直接修改彼此的状态会导致数据流混乱，难以维护和调试。Vuex通过以下方式解决这些问题：

1. **统一的状态管理**：将所有组件的共享状态抽取出来，以一个全局单例模式管理
2. **状态变更可预测**：通过严格的单向数据流，确保状态变更可追踪
3. **开发工具支持**：提供时间旅行、状态快照等调试功能

### 核心概念

### State（状态）

**作用**：存储应用的所有共享状态（数据）。

**特点**：
- 单一状态树，所有组件共享同一份状态。
- 通过this.$store.state访问，或使用mapState辅助函数映射到组件的计算属性中。

**示例**：
```javascript
// store/index.js
export default new Vuex.Store({
  state: {
    count: 0,
    todos: [
      { id: 1, text: '学习Vue', done: true },
      { id: 2, text: '学习Vuex', done: false }
    ]
  }
})
```

### Getters（派生状态）

**作用**：类似于组件的计算属性，用于从state中派生出一些状态。

**特点**：
- 接收state作为第一个参数，也可以接收其他getters作为第二个参数。
- 通过this.$store.getters访问，或使用mapGetters辅助函数映射到组件的计算属性中。
- 会被缓存，只有依赖的state发生改变时才会重新计算

**示例**：
```javascript
export default new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '学习Vue', done: true },
      { id: 2, text: '学习Vuex', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    }
  }
})
```

### Mutations（同步变更）

**作用**：唯一允许直接修改state的方式，且必须是同步函数。

**特点**：
- 每个mutation都有一个字符串的事件类型(type)和一个回调函数(handler)。
- 通过this.$store.commit提交mutation。
- 必须是同步函数，以便devtools能够捕捉到状态变更

**示例**：
```javascript
export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    },
    incrementBy (state, payload) {
      state.count += payload.amount
    }
  }
})

// 调用方式
store.commit('increment')
store.commit('incrementBy', {
  amount: 10
})
```

### Actions（异步操作）

**作用**：用于处理异步操作，并通过提交mutation来间接修改state。

**特点**：
- 接收一个与store实例具有相同方法和属性的context对象，可以调用context.commit提交mutation。
- 通过this.$store.dispatch分发action。
- 在组件中可以通过mapActions辅助函数将actions映射到methods中。
- 在组件中可以通过mapMutations辅助函数将mutations映射到methods中。
- 可以包含任意异步操作
- 可以返回Promise

**示例**：
```javascript
export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    incrementAsync ({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    },
    async fetchData ({ commit }) {
      try {
        const response = await fetch('/api/data')
        const data = await response.json()
        commit('setData', data)
      } catch (error) {
        commit('setError', error.message)
      }
    }
  }
})

// 调用方式
store.dispatch('incrementAsync')
store.dispatch('fetchData')
```

### Modules（模块化）

**作用**：将store分割成模块，每个模块拥有自己的state、mutations、actions、getters。

**特点**：
- 模块内部的action、mutation和getter是注册在全局命名空间的，但可以通过命名空间（namespaced）选项将其限制在模块内部。
- 模块可以嵌套，形成复杂的树状结构。

**示例**：
```javascript
// store/modules/cart.js
const cart = {
  namespaced: true,
  state: {
    items: [],
    checkoutStatus: null
  },
  getters: {
    cartProducts (state, getters, rootState) {
      // ...
    }
  },
  mutations: {
    pushProductToCart (state, { id }) {
      // ...
    }
  },
  actions: {
    checkout ({ commit, state }, products) {
      // ...
    }
  }
}

// store/index.js
export default new Vuex.Store({
  modules: {
    cart
  }
})

// 组件中调用
this.$store.dispatch('cart/checkout')
```

## 38. Vue项目中打包优化有哪些方式？

### 1. 代码分割（Code Splitting）

**作用**：将代码拆分为多个小块（chunk），按需加载，减少初始加载体积。

**实现方式**：
- **动态导入**：使用import()语法动态加载组件或路由。

```javascript
// 路由中使用
const Foo = () => import('./Foo.vue');
```

- **SplitChunksPlugin**：Webpack内置插件，自动提取公共依赖（如Vue、Vuex、Axios等）。

### 2. 压缩代码

**压缩JavaScript**：
- 使用TerserPlugin（Webpack默认配置）压缩代码，移除注释、空格和未使用的代码。

**压缩CSS**：
- 使用css-minimizer-webpack-plugin压缩CSS文件。

**压缩HTML**：
- 使用html-webpack-plugin的minify选项压缩HTML。

### 3. 移除无用代码（Tree Shaking）

**作用**：移除未使用的代码（如未引用的组件、工具函数）。

**实现方式**：
- 确保使用ES6模块（import/export），避免CommonJS。
- 在vue.config.js中配置：

```javascript
module.exports = {
  configureWebpack: {
    optimization: {
      usedExports: true,
    },
  },
};
```

### 4. 图片优化

**压缩图片**：
- 使用工具（如image-webpack-loader）压缩图片。
- 使用现代格式（如WebP）替代JPEG/PNG。

**懒加载**：
- 使用v-lazy或第三方库（如vue-lazyload）实现图片懒加载。

### 5. 使用CDN加速

**作用**：将第三方库（如Vue、Vue Router、Axios）通过CDN引入，减少打包体积。

**实现方式**：
- 在public/index.html中通过`<script>`标签引入CDN。
- 在vue.config.js中配置externals，排除这些库的打包：

```javascript
module.exports = {
  configureWebpack: {
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
    },
  },
};
```

### 6. 优化第三方库

**按需引入**：
- 对于UI库（如Element UI、Ant Design Vue），只引入需要的组件。

```javascript
import { Button, Input } from 'element-ui';
Vue.use(Button);
Vue.use(Input);
```

**使用轻量级替代库**：
- 如用dayjs替代moment.js，用lodash-es替代lodash。

### Webpack和Vite

| 特性 | Vite | Webpack |
|------|------|---------|
| 启动速度 | 极快（基于ESM） | 慢（全量打包） |
| HMR速度 | 几乎无延迟 | 可能较慢（尤其大型项目） |
| 构建速度 | 生产依赖Rollup，较快 | 较慢（需优化配置） |
| 配置复杂度 | 低（约定优于配置） | 高（需手动优化） |
| 兼容性 | 依赖现代浏览器 | 支持旧浏览器 |
| 生态支持 | 快速增长，但不如Webpack成熟 | 极其丰富（插件/Loader众多） |
| 适用场景 | 现代浏览器、快速开发 | 复杂项目、需要高度定制的场景 |

### Webpack配置优化

**生产环境配置**：
- 关闭Source Map（或使用source-map-loader生成更小的Source Map）。
- 启用production模式（Webpack默认优化）。

**缓存**：
- 使用hard-source-webpack-plugin或Webpack 5的持久化缓存加速构建。

### 7. 预加载关键资源

**作用**：提前加载关键资源（如字体、图片），减少首屏加载时间。

**实现方式**：
- 在index.html中使用`<link rel="preload">`：

```html
<link rel="preload" href="/font.woff2" as="font" crossorigin>
```

### 8. 分析打包体积

**工具**：
- 使用webpack-bundle-analyzer可视化分析打包体积，找出大文件

```javascript
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
  configureWebpack: {
    plugins: [new BundleAnalyzerPlugin()],
  },
};
```

## 39. Vue实现首屏优化有哪些方法？

### 1. 减少首屏资源体积

- **代码分割**：将非关键代码（如路由、组件）按需加载。
- **压缩资源**：启用Gzip或Brotli压缩（通过Nginx或CDN）。
- **移除无用代码**：通过Tree Shaking移除未使用的代码。

### 2. 异步加载非关键资源

**动态路由**：
- 使用路由懒加载，按需加载路由组件。

```javascript
const routes = [
  {
    path: '/about',
    component: () => import('./views/About.vue'),
  },
];
```

**异步数据加载**：
- 在组件的created或mounted钩子中异步获取数据，避免阻塞渲染。

### 3. 骨架屏（Skeleton Screen）

**作用**：在数据加载完成前显示占位内容，提升用户体验。

**实现方式**：
- 使用vue-skeleton-webpack-plugin或手动编写骨架屏组件。

### 4. 服务端渲染（SSR）

**作用**：在服务端渲染HTML，减少客户端渲染时间。

**实现方式**：
- 使用Nuxt.js或手动配置Vue SSR。
- 适合内容型网站（如新闻、博客），对交互型应用（如管理后台）收益较小。

### 5. 预渲染（Prerendering）

**作用**：在构建时生成静态HTML，适合静态页面。

**实现方式**：
- 使用prerender-spa-plugin预渲染关键路由。

### 6. 优化关键渲染路径

**内联关键CSS**：
- 将首屏需要的CSS直接嵌入HTML中，避免额外的HTTP请求。

**延迟加载非关键CSS**：
- 使用loadCSS或rel="preload"延迟加载非关键CSS。

### 7. 使用HTTP/2

**作用**：通过多路复用减少HTTP请求开销。

**实现方式**：
- 确保服务器支持HTTP/2，并合并小文件（如字体、图片）。

### 8. 缓存策略

**静态资源缓存**：
- 设置合理的缓存头（如Cache-Control: max-age=31536000）。

**Service Worker**：
- 使用Workbox或vue-cli-plugin-pwa实现离线缓存。

### 9. 监控和优化

**工具**：
- 使用Lighthouse审计首屏性能。
- 使用Chrome DevTools的Performance面板分析加载瓶颈。

## 40. 减少页面加载时间优化有哪些方法？

### 一、核心优化：直接影响首屏性能

#### 1. 图片优化（占比最大，通常占页面体积50%以上）

**压缩与格式转换**
- 使用工具（如Squoosh、ImageOptim）将图片压缩至最小，同时保持视觉质量。
- 优先使用WebP/AVIF格式（比JPEG小30-70%，兼容性可通过`<picture>`标签处理）

**懒加载（Lazy Load）**
- 延迟加载视口外图片，减少初始请求

**响应式图片**
- 根据设备尺寸提供不同分辨率

#### 2. 关键资源加载优化

**内联关键CSS**
- 将首屏所需的CSS直接嵌入HTML，避免额外请求：

**内联关键CSS**

**异步加载非关键JS**
- 使用defer或async避免阻塞渲染

**预加载关键资源**
- 提前加载字体、图片等

#### 3. 减少HTTP请求

**合并文件**
- 通过Webpack/Rollup等工具将多个CSS/JS文件合并为单个文件。

**雪碧图（CSS Sprites）**
- 将多个小图标合并为一张大图，通过background-position定位。

**使用字体图标**
- 用SVG/Font Awesome替代图片图标（体积更小，可缩放）。

### 二、网络与服务器优化

#### 1. 启用压缩与缓存

**Gzip/Brotli压缩**
- 服务器端启用压缩（Nginx配置示例）

```nginx
gzip on;
gzip_types text/css application/javascript image/svg+xml;
```

**长期缓存**
- 为静态资源设置1年缓存，并通过文件名哈希（如main.a1b2c3.js）控制更新

#### 2. 使用CDN与HTTP/2

**CDN加速**
- 将静态资源托管到CDN（如Cloudflare、Fastly），减少服务器到用户的物理距离。

**HTTP/2多路复用**
- 启用HTTP/2协议，通过单个TCP连接并行传输多个资源。

#### 3. 减少DNS查询

**减少域名数量**
- 避免分散资源到过多域名（通常建议≤4个）。

**DNS预解析**
- 提前解析关键域名

```html
<link rel="dns-prefetch" href="https://cdn.example.com">
```

### 三、代码与架构优化

#### 1. JavaScript优化

**Tree Shaking**
- 移除未使用的代码（通过Webpack的usedExports和sideEffects配置）。

**代码分割（Code Splitting）**
- 按需加载模块（如React的React.lazy或Vue的动态导入）

```javascript
const Module = React.lazy(() => import('./Module'));
```

**避免阻塞渲染**
- 将非关键JS移至页面底部或使用defer。

#### 2. CSS优化

**避免CSS阻塞渲染**
- 将非关键CSS内联到`<head>`，或使用`<link rel="preload">`异步加载。

**减少选择器复杂度**
- 避免过度嵌套（如Sass的&嵌套），简化CSS解析。

#### 3. 数据库与后端优化

**API优化**
- 合并接口请求（如GraphQL），减少往返次数。

**数据库索引**
- 为常用查询字段添加索引，避免全表扫描。

**服务端渲染（SSR）**
- 首屏内容由服务器生成（如Next.js、Nuxt.js），减少客户端渲染时间。

## 41. $route和$router的区别是什么？

### 1. $route

**作用**：
$route是当前路由信息对象，包含了当前路由的路径、参数、查询参数、哈希值等元数据。它是一个响应式对象，当路由变化时会自动更新。

**常见属性**：
- **path**：当前路由的路径（如/user/123）。
- **params**：动态路由参数（如/user/:id中的id）。
- **query**：查询参数（如/search?keyword=vue中的keyword）。
- **name**：当前路由的名称（如果配置了命名路由）。
- **hash**：当前URL的哈希值（如#section1）。
- **meta**：路由的元信息（用于权限控制等）。

### 2. $router

**作用**：
$router是Vue Router的实例对象，提供了导航方法（如跳转路由、后退、前进等）。它是Vue Router的核心API，用于控制路由的跳转和操作。

**常见方法**：
- **push(location)**：导航到指定路由（可添加历史记录）。
- **replace(location)**：替换当前路由（不添加历史记录）。
- **go(n)**：前进或后退n步（如-1表示后退）。
- **back()**：后退一步。
- **forward()**：前进一步。

## 42. Vue的优点有哪些？

### 1. 渐进式框架
Vue.js被设计为可以自底向上逐层应用的渐进式框架。可以根据不同的需求选择不同的功能模块，既可以用于简单的页面交互，也可以构建复杂的单页应用。

### 2. 易学易用
Vue.js的API设计简洁明了，学习曲线平缓，即使是初学者也能快速上手。文档详尽，社区活跃，有大量的教程和示例可供参考。

### 3. 双向数据绑定
Vue.js实现了数据和视图的双向绑定，开发者只需关注业务逻辑，而无需手动操作DOM。这大大提高了开发效率，减少了出错的可能性。

### 4. 组件化开发
Vue.js支持组件化开发，可以将页面拆分成多个独立的组件，便于维护和复用。组件之间通过props和events进行通信，结构清晰。

### 5. 虚拟DOM
Vue.js使用虚拟DOM来提高渲染性能。虚拟DOM是对真实DOM的抽象表示，通过对比新旧虚拟DOM的差异，最小化真实DOM的操作，从而提高性能。

### 6. 生态系统丰富
Vue.js拥有丰富的生态系统，包括Vue Router、Vuex、Vue CLI等官方工具，以及大量的第三方插件和组件库，可以满足各种开发需求。

### 7. 优秀的开发工具
Vue.js提供了强大的开发工具，如Vue DevTools浏览器插件，可以帮助开发者调试Vue应用，查看组件层次结构和状态变化。

### 8. 服务端渲染支持
Vue.js支持服务端渲染（SSR），可以提高首屏加载速度和SEO效果，特别适用于内容型网站。

### 9. 良好的TypeScript支持
Vue.js 3.0开始对TypeScript提供了更好的支持，提供了完整的类型定义，有助于提高代码质量和开发体验。

### 10. 性能优秀
Vue.js在性能方面表现出色，通过虚拟DOM、异步更新队列、组件级别的缓存等技术手段，确保了应用的流畅运行。

## 43. Vue 3 Composition API深入理解

### 1. Composition API核心概念

Composition API是Vue 3引入的一种新的API风格，它允许我们基于函数的组合来组织和重用逻辑代码，解决了Options API在大型项目中可能出现的代码组织和逻辑复用问题。

### 2. setup函数详解

#### 基本用法

setup函数是Composition API的入口点，在组件实例创建之前执行，因此它不具有对this的访问权。

```javascript
import { ref, reactive } from 'vue'

export default {
  setup(props, context) {
    // props是响应式的，但不能解构
    console.log(props.title)
    
    // context包含attrs、slots、emit等属性
    context.emit('event')
    
    // 响应式数据
    const count = ref(0)
    const state = reactive({
      name: 'Vue 3',
      version: 3
    })
    
    // 方法
    const increment = () => {
      count.value++
    }
    
    // 返回值暴露给模板和其他选项
    return {
      count,
      state,
      increment
    }
  }
}
```

#### setup参数

1. **props**：包含父组件传递的响应式属性
2. **context**：包含三个属性
   - attrs：非响应式对象，包含未声明为props的属性
   - slots：非响应式对象，包含所有传入的插槽
   - emit：触发事件的函数

### 3. 响应式API详解

#### ref vs reactive

```javascript
import { ref, reactive } from 'vue'

// ref用于基本类型
const count = ref(0)
console.log(count.value) // 0

// reactive用于对象类型
const state = reactive({
  count: 0,
  name: 'Vue'
})
console.log(state.count) // 0

// ref也可以包装对象
const obj = ref({
  count: 0,
  name: 'Vue'
})
console.log(obj.value.count) // 0
```

#### computed计算属性

```javascript
import { ref, computed } from 'vue'

const count = ref(1)
const plusOne = computed(() => count.value + 1)

// 可写的计算属性
const writableComputed = computed({
  get: () => count.value + 1,
  set: (val) => {
    count.value = val - 1
  }
})
```

#### watch监听器

```javascript
import { ref, watch, watchEffect } from 'vue'

const count = ref(0)
const state = reactive({ name: 'Vue' })

// 监听单个ref
watch(count, (newVal, oldVal) => {
  console.log(`count changed from ${oldVal} to ${newVal}`)
})

// 监听多个源
watch([count, () => state.name], ([newCount, newName], [oldCount, oldName]) => {
  console.log(`count: ${oldCount} -> ${newCount}`)
  console.log(`name: ${oldName} -> ${newName}`)
})

// 深度监听
watch(state, (newVal, oldVal) => {
  console.log('state changed')
}, { deep: true })

// watchEffect自动追踪依赖
watchEffect(() => {
  console.log(`count is ${count.value}`)
})
```

### 4. 生命周期钩子

Vue 3中Composition API的生命周期钩子需要从vue中导入，且没有beforeCreate和created，因为setup函数本身就在这两个钩子之间执行。

```javascript
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

export default {
  setup() {
    onBeforeMount(() => {
      console.log('组件挂载前')
    })
    
    onMounted(() => {
      console.log('组件挂载后')
    })
    
    onBeforeUpdate(() => {
      console.log('组件更新前')
    })
    
    onUpdated(() => {
      console.log('组件更新后')
    })
    
    onBeforeUnmount(() => {
      console.log('组件卸载前')
    })
    
    onUnmounted(() => {
      console.log('组件卸载后')
    })
    
    return {}
  }
}
```

### 5. 依赖注入(provide/inject)

```javascript
// 父组件
import { provide, ref } from 'vue'

export default {
  setup() {
    const theme = ref('dark')
    
    provide('theme', theme)
    
    return { theme }
  }
}

// 子组件
import { inject } from 'vue'

export default {
  setup() {
    const theme = inject('theme', 'light') // 第二个参数是默认值
    
    return { theme }
  }
}
```

### 6. 与Options API的对比

| 特性 | Options API | Composition API |
|------|-------------|-----------------|
| 代码组织 | 按选项分类(methods, computed等) | 按逻辑关注点组织 |
| 逻辑复用 | Mixins(存在命名冲突等问题) | 自定义Hooks(更灵活可靠) |
| TypeScript支持 | 有限 | 优秀的类型推导 |
| 学习成本 | 较低 | 需要理解响应式原理 |
| 适用场景 | 中小型组件 | 大型复杂组件 |

## 44. Vue 3性能优化最佳实践

### 1. 响应式系统的优化

#### 合理使用ref和reactive

```javascript
// 不推荐：过度使用ref
const state = ref({
  user: ref({
    name: ref(''),
    age: ref(0)
  }),
  posts: ref([])
})

// 推荐：合理搭配使用
const user = reactive({
  name: '',
  age: 0
})
const posts = ref([])
const loading = ref(false)
```

#### 避免不必要的响应式转换

```javascript
import { markRaw } from 'vue'

// 对于不需要响应式的大型对象或第三方库实例
const largeObject = markRaw({
  // 大量数据...
})

// 对于冻结对象
const frozenObject = Object.freeze({
  // 数据...
})
```

### 2. 模板渲染优化

#### 使用v-memo优化列表渲染

```vue
<template>
  <!-- 仅当item.id或selectedItemId改变时才重新渲染 -->
  <div
    v-for="item in list"
    :key="item.id"
    v-memo="[item.id === selectedItemId]"
  >
    <div>{{ item.name }}</div>
    <div v-if="item.id === selectedItemId">Selected!</div>
  </div>
</template>
```

#### 合理使用v-show和v-if

```vue
<template>
  <!-- 频繁切换使用v-show -->
  <div v-show="isVisible">经常切换的内容</div>
  
  <!-- 条件很少改变使用v-if -->
  <div v-if="isAdmin">管理员专属内容</div>
</template>
```

### 3. 组件优化

#### 异步组件

```javascript
import { defineAsyncComponent } from 'vue'

// 基本用法
const AsyncComp = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
)

// 高级用法
const AsyncCompWithOpts = defineAsyncComponent({
  loader: () => import('./components/MyComponent.vue'),
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
  delay: 200, // 显示loading组件前的延迟
  timeout: 3000 // 超时时间
})
```

#### KeepAlive缓存组件

```vue
<template>
  <KeepAlive :include="['ComponentA', 'ComponentB']" :max="10">
    <component :is="currentComponent"></component>
  </KeepAlive>
</template>
```

### 4. 打包优化

#### Tree-shaking

```javascript
// 不推荐：全量导入
import lodash from 'lodash'

// 推荐：按需导入
import { debounce, throttle } from 'lodash-es'

// 或者使用插件自动按需导入
// babel-plugin-import 或 unplugin-vue-components
```

#### 代码分割

```javascript
// 路由级别的代码分割
const routes = [
  {
    path: '/about',
    component: () => import('./views/About.vue')
  }
]

// 组件级别的代码分割
const HeavyComponent = defineAsyncComponent(() =>
  import('./components/HeavyComponent.vue')
)
```

## 45. Vue 3中的Teleport和Suspense组件使用

### 1. Teleport传送门

Teleport允许我们将组件的内容渲染到DOM中的任何位置，而不局限于组件的层级结构。

#### 基本用法

```vue
<template>
  <div>
    <h1>当前组件</h1>
    <!-- 传送到body元素 -->
    <Teleport to="body">
      <div class="modal">这是一个模态框</div>
    </Teleport>
    
    <!-- 传送到指定元素 -->
    <Teleport to="#modals">
      <div>传送到ID为modals的元素</div>
    </Teleport>
    
    <!-- 条件传送 -->
    <Teleport to="body" :disabled="!isModalOpen">
      <div class="modal" v-if="isModalOpen">
        条件传送的内容
      </div>
    </Teleport>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const isModalOpen = ref(false)
    
    return {
      isModalOpen
    }
  }
}
</script>
```

#### 多个Teleport目标

```vue
<template>
  <Teleport to="body">
    <div>第一个内容</div>
  </Teleport>
  
  <Teleport to="body">
    <div>第二个内容</div>
  </Teleport>
</template>
```

### 2. Suspense异步依赖处理

Suspense用于协调深层嵌套的异步依赖，特别适用于处理异步组件的加载状态。

#### 基本用法

```vue
<template>
  <Suspense>
    <!-- 异步依赖 -->
    <template #default>
      <AsyncComponent />
    </template>
    
    <!-- 加载状态 -->
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<script>
import { defineAsyncComponent } from 'vue'

const AsyncComponent = defineAsyncComponent(() =>
  import('./components/AsyncComponent.vue')
)

export default {
  components: {
    AsyncComponent
  }
}
</script>
```

#### 结合异步setup使用

```vue
<template>
  <div>{{ data }}</div>
</template>

<script>
export default {
  async setup() {
    // 异步操作
    const data = await fetchData()
    
    return {
      data
    }
  }
}
</script>
```

## 46. Vue 3中watch和watchEffect的区别

### 1. 基本区别

#### watch
- 明确指定监听的源
- 惰性执行，只有监听的源变化时才执行回调
- 可以访问新值和旧值
- 支持更精细的控制选项

#### watchEffect
- 自动追踪回调中的响应式依赖
- 立即执行，然后在依赖变化时重新执行
- 无法获取旧值
- 更简洁，适用于副作用场景

### 2. 使用场景对比

#### watch适用场景

```javascript
import { ref, watch } from 'vue'

const question = ref('')
const answer = ref('Questions usually contain a question mark. ;-)')

// 监听特定数据变化
watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.indexOf('?') > -1) {
    answer.value = 'Thinking...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value = 'Error! Could not reach the API. ' + error
    }
  }
})
```

#### watchEffect适用场景

```javascript
import { ref, watchEffect } from 'vue'

const url = ref('https://api.example.com/data')
const data = ref(null)

// 自动追踪url变化并执行副作用
watchEffect(async () => {
  const response = await fetch(url.value)
  data.value = await response.json()
})
```

### 3. 详细对比

| 特性 | watch | watchEffect |
|------|-------|-------------|
| 依赖追踪 | 手动指定 | 自动追踪 |
| 执行时机 | 惰性执行 | 立即执行 |
| 参数访问 | 新值和旧值 | 仅新值 |
| 停止监听 | 返回停止函数 | 返回停止函数 |
| 清理副作用 | onInvalidate参数 | onInvalidate参数 |
| 调试 | 有调试钩子 | 有调试钩子 |

### 4. 高级用法

#### watch的flush选项

```javascript
import { ref, watch } from 'vue'

const count = ref(0)

// flush: 'pre' (默认) - 组件更新前执行
watch(count, () => {
  console.log('pre flush')
}, {
  flush: 'pre'
})

// flush: 'post' - 组件更新后执行
watch(count, () => {
  console.log('post flush')
}, {
  flush: 'post'
})

// flush: 'sync' - 同步执行
watch(count, () => {
  console.log('sync flush')
}, {
  flush: 'sync'
})
```

#### 清理副作用

```javascript
import { watch } from 'vue'

watch(id, (newId, oldId, onInvalidate) => {
  let expired = false
  onInvalidate(() => {
    expired = true
  })
  
  fetch(`/api/request?id=${newId}`).then(res => {
    if (!expired) {
      // 处理响应
    }
  })
})
```

## 47. Vue 3中的provide/inject使用

### 1. 基本概念

provide/inject是Vue 3中实现依赖注入的API，允许祖先组件向其所有子孙组件注入依赖，无论组件层级有多深。

### 2. 基本用法

#### provide

```javascript
// 父组件
import { provide, ref, reactive } from 'vue'

export default {
  setup() {
    const location = ref('North Pole')
    const geolocation = reactive({
      longitude: 90,
      latitude: 135
    })
    
    // 提供数据
    provide('location', location)
    provide('geolocation', geolocation)
    provide('updateLocation', (newLocation) => {
      location.value = newLocation
    })
    
    return {
      location,
      geolocation
    }
  }
}
```

#### inject

```javascript
// 子组件
import { inject } from 'vue'

export default {
  setup() {
    // 注入数据
    const location = inject('location')
    const geolocation = inject('geolocation')
    const updateLocation = inject('updateLocation')
    
    // 带默认值的注入
    const theme = inject('theme', 'light')
    
    // 工厂函数默认值
    const message = inject('message', () => 'default message')
    
    return {
      location,
      geolocation,
      updateLocation,
      theme,
      message
    }
  }
}
```

### 3. 响应性说明

```javascript
// 父组件
import { provide, ref, readonly } from 'vue'

export default {
  setup() {
    const count = ref(0)
    
    // 提供可变数据
    provide('count', count)
    
    // 提供只读数据
    provide('readOnlyCount', readonly(count))
    
    const increment = () => {
      count.value++
    }
    
    return {
      count,
      increment
    }
  }
}
```

### 4. 实际应用场景

#### 主题切换

```javascript
// App.vue
import { provide, ref } from 'vue'

export default {
  setup() {
    const theme = ref('light')
    
    const toggleTheme = () => {
      theme.value = theme.value === 'light' ? 'dark' : 'light'
    }
    
    provide('theme', theme)
    provide('toggleTheme', toggleTheme)
    
    return {
      theme,
      toggleTheme
    }
  }
}

// 任意深层组件
import { inject } from 'vue'

export default {
  setup() {
    const theme = inject('theme')
    const toggleTheme = inject('toggleTheme')
    
    return {
      theme,
      toggleTheme
    }
  }
}
```

#### 全局配置

```javascript
// main.js
import { createApp } from 'vue'
import { provide } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.provide('globalConfig', {
  apiUrl: 'https://api.example.com',
  version: '1.0.0'
})

app.mount('#app')
```

## 48. Vue 3中的异步组件和Suspense配合使用

### 1. 异步组件定义

#### defineAsyncComponent

```javascript
import { defineAsyncComponent } from 'vue'

// 基础用法
const AsyncComponent = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
)

// 高级用法
const AsyncComponentWithOptions = defineAsyncComponent({
  // 加载函数
  loader: () => import('./components/MyComponent.vue'),
  
  // 加载中组件
  loadingComponent: LoadingComponent,
  
  // 错误组件
  errorComponent: ErrorComponent,

  // 显示加载延迟时间（毫秒）
  // 默认情况下，加载中组件会在延迟后显示
  delay: 200,

  // 超时时间（毫秒）
  // 默认值：Infinity
  timeout: 3000,

  // 定义组件是否可挂起
  suspensible: false,

  /**
   * 处理加载状态的回调函数
   * @param {object} error - 加载失败时的错误对象
   * @param {object} retry - 重试加载的函数
   * @param {number} fail - 加载失败次数
   * @param {number} attempts - 已尝试加载次数
   */
  onError(error, retry, fail, attempts) {
    if (error.message.match(/fetch/) && attempts <= 3) {
      // 请求失败时重试，最多重试3次
      retry()
    } else {
      // 注意，如果忽略错误并调用fail()，
      // 则该错误不会通过控制台输出
      fail()
    }
  }
})
```

### 2. 与Suspense配合使用

#### 基本配合

```vue
<template>
  <Suspense>
    <template #default>
      <div>
        <AsyncComponent />
        <AnotherAsyncComponent />
      </div>
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<script>
import { defineAsyncComponent } from 'vue'

const AsyncComponent = defineAsyncComponent(() =>
  import('./components/AsyncComponent.vue')
)

const AnotherAsyncComponent = defineAsyncComponent(() =>
  import('./components/AnotherAsyncComponent.vue')
)

export default {
  components: {
    AsyncComponent,
    AnotherAsyncComponent
  }
}
</script>
```

#### 嵌套Suspense

```vue
<template>
  <Suspense>
    <template #default>
      <div>
        <Header />
        <Suspense>
          <template #default>
            <MainContent />
          </template>
          <template #fallback>
            <div>Main content loading...</div>
          </template>
        </Suspense>
        <Footer />
      </div>
    </template>
    <template #fallback>
      <div>Whole page loading...</div>
    </template>
  </Suspense>
</template>
```

### 3. 异步setup与Suspense

```vue
<template>
  <div>{{ userData }}</div>
</template>

<script>
export default {
  async setup() {
    // 这里的异步操作会被Suspense捕获
    const userData = await fetchUserData()
    
    return {
      userData
    }
  }
}
</script>
```

## 49. Vue 3中的自定义Hooks开发

### 1. 什么是自定义Hooks

自定义Hooks是在Vue 3 Composition API中实现逻辑复用的一种方式，类似于React Hooks。它们是封装了响应式状态和相关逻辑的函数，可以在多个组件中复用。

### 2. 基本Hooks开发

#### useCounter计数器

```javascript
// hooks/useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const increment = () => {
    count.value++
  }
  
  const decrement = () => {
    count.value--
  }
  
  const reset = () => {
    count.value = initialValue
  }
  
  const doubleCount = computed(() => count.value * 2)
  
  return {
    count,
    increment,
    decrement,
    reset,
    doubleCount
  }
}

// 在组件中使用
import { useCounter } from '@/hooks/useCounter'

export default {
  setup() {
    const { count, increment, decrement, reset, doubleCount } = useCounter(10)
    
    return {
      count,
      increment,
      decrement,
      reset,
      doubleCount
    }
  }
}
```

#### useFetch数据获取

```javascript
// hooks/useFetch.js
import { ref, isRef, unref, watchEffect } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)
  const isPending = ref(true)
  
  const fetchData = async () => {
    isPending.value = true
    error.value = null
    
    try {
      const resolvedUrl = isRef(url) ? url.value : url
      const response = await fetch(resolvedUrl)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      data.value = await response.json()
    } catch (err) {
      error.value = err
    } finally {
      isPending.value = false
    }
  }
  
  // 如果url是响应式的，则监听其变化
  if (isRef(url)) {
    watchEffect(fetchData)
  } else {
    fetchData()
  }
  
  return {
    data,
    error,
    isPending,
    refetch: fetchData
  }
}

// 在组件中使用
import { ref } from 'vue'
import { useFetch } from '@/hooks/useFetch'

export default {
  setup() {
    const userId = ref(1)
    const { data: user, error, isPending, refetch } = useFetch(
      `https://jsonplaceholder.typicode.com/users/${userId.value}`
    )
    
    return {
      user,
      error,
      isPending,
      refetch
    }
  }
}
```

### 3. 高级Hooks开发

#### useLocalStorage本地存储

```javascript
// hooks/useLocalStorage.js
import { ref, watch } from 'vue'

export function useLocalStorage(key, defaultValue) {
  const storedValue = localStorage.getItem(key)
  const value = ref(storedValue ? JSON.parse(storedValue) : defaultValue)
  
  // 监听值变化并同步到localStorage
  watch(value, (newValue) => {
    if (newValue === null || newValue === undefined) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, JSON.stringify(newValue))
    }
  }, { deep: true })
  
  return value
}

// 在组件中使用
import { useLocalStorage } from '@/hooks/useLocalStorage'

export default {
  setup() {
    const userName = useLocalStorage('userName', '')
    const userPreferences = useLocalStorage('userPreferences', {
      theme: 'light',
      notifications: true
    })
    
    return {
      userName,
      userPreferences
    }
  }
}
```

#### useDebounce防抖

```javascript
// hooks/useDebounce.js
import { ref, watch } from 'vue'

export function useDebounce(value, delay = 300) {
  const debouncedValue = ref(value.value)
  
  let timeout
  
  watch(value, (newValue) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    
    timeout = setTimeout(() => {
      debouncedValue.value = newValue
    }, delay)
  })
  
  return debouncedValue
}

// 在组件中使用
import { ref } from 'vue'
import { useDebounce } from '@/hooks/useDebounce'

export default {
  setup() {
    const searchQuery = ref('')
    const debouncedQuery = useDebounce(searchQuery, 500)
    
    // 监听防抖后的值
    watch(debouncedQuery, (query) => {
      // 执行搜索
      performSearch(query)
    })
    
    return {
      searchQuery,
      debouncedQuery
    }
  }
}
```

### 4. Hooks最佳实践

#### 组合多个Hooks

```javascript
// hooks/useUserSearch.js
import { ref, computed } from 'vue'
import { useFetch } from './useFetch'
import { useDebounce } from './useDebounce'

export function useUserSearch() {
  const searchQuery = ref('')
  const debouncedQuery = useDebounce(searchQuery, 300)
  
  const apiUrl = computed(() => {
    return debouncedQuery.value 
      ? `https://api.github.com/search/users?q=${debouncedQuery.value}`
      : null
  })
  
  const { data: searchResults, error, isPending } = useFetch(apiUrl)
  
  const users = computed(() => {
    return searchResults.value ? searchResults.value.items : []
  })
  
  return {
    searchQuery,
    users,
    error,
    isPending
  }
}
```

## 50. Vue 3中的响应式API深入解析

### 1. toRefs和toRef详解

#### toRefs

```javascript
import { reactive, toRefs } from 'vue'

export default {
  setup() {
    const state = reactive({
      foo: 1,
      bar: 2
    })
    
    // 将响应式对象转换为普通对象，其中每个属性都是ref
    const stateAsRefs = toRefs(state)
    
    // 解构后仍然保持响应性
    const { foo, bar } = stateAsRefs
    
    return {
      // 必须这样返回才能在模板中保持响应性
      ...stateAsRefs
      // 或者
      // foo: stateAsRefs.foo,
      // bar: stateAsRefs.bar
    }
  }
}
```

#### toRef

```javascript
import { reactive, toRef } from 'vue'

export default {
  setup() {
    const state = reactive({
      foo: 1,
      bar: 2
    })
    
    // 创建一个指向state.foo的ref
    const fooRef = toRef(state, 'foo')
    
    // 修改ref会影响原始属性
    fooRef.value++
    console.log(state.foo) // 2
    
    return {
      fooRef
    }
  }
}
```

### 2. computed深入

#### 计算属性的setter

```javascript
import { ref, computed } from 'vue'

export default {
  setup() {
    const firstName = ref('John')
    const lastName = ref('Doe')
    
    const fullName = computed({
      // getter
      get() {
        return firstName.value + ' ' + lastName.value
      },
      // setter
      set(newValue) {
        // 注意：我们这里使用的是解构赋值语法
        [firstName.value, lastName.value] = newValue.split(' ')
      }
    })
    
    return {
      firstName,
      lastName,
      fullName
    }
  }
}
```

#### 计算属性的调试

```javascript
import { ref, computed } from 'vue'

export default {
  setup() {
    const count = ref(0)
    
    const plusOne = computed(() => count.value + 1, {
      onTrack(e) {
        // 当响应性属性或ref作为依赖被追踪时
        debugger
      },
      onTrigger(e) {
        // 当依赖变更导致计算属性重新运行时
        debugger
      }
    })
    
    return {
      count,
      plusOne
    }
  }
}
```

### 3. watch和watchEffect深入

#### watch的多种监听方式

```javascript
import { ref, reactive, watch } from 'vue'

export default {
  setup() {
    const x = ref(0)
    const y = ref(0)
    const obj = reactive({ count: 0 })
    
    // 单个ref
    watch(x, (newX) => {
      console.log(`x is ${newX}`)
    })
    
    // getter函数
    watch(
      () => x.value + y.value,
      (sum) => {
        console.log(`sum of x + y is: ${sum}`)
      }
    )
    
    // 数组
    watch([x, () => y.value], ([newX, newY]) => {
      console.log(`x is ${newX} and y is ${newY}`)
    })
    
    // 监听响应式对象
    watch(
      () => obj.count,
      (count) => {
        console.log(`count is: ${count}`)
      }
    )
    
    return {
      x,
      y,
      obj
    }
  }
}
```

#### watchEffect的停止和清理

```javascript
import { ref, watchEffect } from 'vue'

export default {
  setup() {
    const id = ref(1)
    
    // watchEffect返回停止函数
    const stop = watchEffect((onInvalidate) => {
      // 异步操作
      const token = performAsyncOperation(id.value)
      
      // 清理函数
      onInvalidate(() => {
        // 取消异步操作
        token.cancel()
      })
    })
    
    // 停止监听
    // stop()
    
    return {
      id
    }
  }
}
```

### 4. 其他响应式API

#### shallowReactive和shallowRef

```javascript
import { shallowReactive, shallowRef } from 'vue'

// shallowReactive只代理顶层属性
const state = shallowReactive({
  n: 1,
  nested: {
    m: 2
  }
})

// 改变state自身的属性是响应式的
state.n++

// 但嵌套对象不会被代理
state.nested.m++ // 非响应式

// shallowRef只监听.value的变化
const ref = shallowRef({ count: 1 })

// 不会触发更新
ref.value.count++

// 会触发更新
ref.value = { count: 2 }
```

#### readonly和shallowReadonly

```javascript
import { reactive, readonly, shallowReadonly } from 'vue'

const original = reactive({ count: 1 })

// 只读代理
const copy = readonly(original)

// 修改原始对象会触发copy的更新
original.count++

// 通过代理修改会失败并警告
// copy.count++ // 警告!

// 浅只读
const state = shallowReadonly({
  n: 1,
  nested: {
    m: 2
  }
})

// 修改顶层属性会失败
// state.n++ // 警告!

// 但可以修改嵌套对象
state.nested.m++ // 正常工作
```

## 51. Vue 3中的生命周期钩子详解

### 1. 完整生命周期图谱

Vue 3的生命周期包括创建、挂载、更新和销毁四个阶段，每个阶段都有对应的钩子函数。

### 2. Composition API生命周期钩子

```javascript
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onActivated,
  onDeactivated,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered
} from 'vue'

export default {
  setup() {
    // 没有beforeCreate和created，因为setup函数在这两个钩子之间执行
    
    onBeforeMount(() => {
      console.log('组件挂载前')
    })
    
    onMounted(() => {
      console.log('组件挂载后')
      // DOM已经创建完成
      // 可以进行DOM操作、发送AJAX请求等
    })
    
    onBeforeUpdate(() => {
      console.log('组件更新前')
      // 在组件即将重新渲染和更新DOM之前执行
    })
    
    onUpdated(() => {
      console.log('组件更新后')
      // 在组件重新渲染和更新DOM之后执行
      // 注意避免在此处更改状态，以免造成无限循环
    })
    
    onBeforeUnmount(() => {
      console.log('组件卸载前')
      // 在卸载组件实例之前调用
      // 可以在这里清理定时器、取消网络请求等
    })
    
    onUnmounted(() => {
      console.log('组件卸载后')
      // 在卸载组件实例后调用
      // 清理工作已完成
    })
    
    // keep-alive相关
    onActivated(() => {
      console.log('组件被激活')
    })
    
    onDeactivated(() => {
      console.log('组件被停用')
    })
    
    // 错误处理
    onErrorCaptured((error, instance, info) => {
      console.log('捕获到错误:', error)
      console.log('错误组件:', instance)
      console.log('错误信息:', info)
      // 返回false阻止错误继续传播
      return false
    })
    
    // 调试钩子（开发环境）
    onRenderTracked((e) => {
      console.log('render tracked:', e)
    })
    
    onRenderTriggered((e) => {
      console.log('render triggered:', e)
    })
    
    return {}
  }
}
```

### 3. Options API与Composition API生命周期对比

| Options API | Composition API |
|-------------|-----------------|
| beforeCreate | setup() *(替代)* |
| created | setup() *(替代)* |
| beforeMount | onBeforeMount |
| mounted | onMounted |
| beforeUpdate | onBeforeUpdate |
| updated | onUpdated |
| beforeDestroy | onBeforeUnmount |
| destroyed | onUnmounted |
| activated | onActivated |
| deactivated | onDeactivated |
| errorCaptured | onErrorCaptured |

### 4. 实际应用示例

#### 定时器管理

```javascript
import { ref, onMounted, onBeforeUnmount } from 'vue'

export default {
  setup() {
    const count = ref(0)
    let timer = null
    
    onMounted(() => {
      // 组件挂载后启动定时器
      timer = setInterval(() => {
        count.value++
      }, 1000)
    })
    
    onBeforeUnmount(() => {
      // 组件卸载前清理定时器
      if (timer) {
        clearInterval(timer)
        timer = null
      }
    })
    
    return {
      count
    }
  }
}
```

#### 网络请求管理

```javascript
import { ref, onMounted, onBeforeUnmount } from 'vue'

export default {
  setup() {
    const data = ref(null)
    const loading = ref(false)
    let controller = null
    
    const fetchData = async () => {
      // 取消之前的请求
      if (controller) {
        controller.abort()
      }
      
      controller = new AbortController()
      loading.value = true
      
      try {
        const response = await fetch('/api/data', {
          signal: controller.signal
        })
        data.value = await response.json()
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Fetch error:', error)
        }
      } finally {
        loading.value = false
      }
    }
    
    onMounted(() => {
      fetchData()
    })
    
    onBeforeUnmount(() => {
      // 组件卸载前取消请求
      if (controller) {
        controller.abort()
      }
    })
    
    return {
      data,
      loading
    }
  }
}
```

## 52. Vue 3中的TypeScript支持和类型定义

### 1. 定义组件Props类型

```typescript
import { defineComponent, PropType } from 'vue'

interface User {
  id: number
  name: string
  email?: string
}

export default defineComponent({
  props: {
    // 基本类型
    title: String,
    
    // 复杂类型
    user: {
      type: Object as PropType<User>,
      required: true
    },
    
    // 数组类型
    tags: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    
    // 函数类型
    onSubmit: {
      type: Function as PropType<(data: User) => void>,
      required: true
    },
    
    // 联合类型
    status: {
      type: String as PropType<'pending' | 'success' | 'error'>,
      default: 'pending'
    }
  },
  
  setup(props) {
    // props.user 是 User 类型
    // props.onSubmit 是 (data: User) => void 类型
    
    return {}
  }
})
```

### 2. Composition API中的类型定义

```typescript
import { defineComponent, ref, reactive, computed, Ref } from 'vue'

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default defineComponent({
  setup() {
    // 明确定义ref类型
    const count: Ref<number> = ref(0)
    const todos = ref<Todo[]>([
      { id: 1, text: 'Learn Vue 3', completed: false }
    ])
    
    // reactive对象类型推断
    const state = reactive({
      filter: 'all' as 'all' | 'active' | 'completed',
      loading: false
    })
    
    // 计算属性类型推断
    const completedCount = computed(() => 
      todos.value.filter(todo => todo.completed).length
    )
    
    // 明确定义函数类型
    const addTodo: (text: string) => void = (text) => {
      todos.value.push({
        id: Date.now(),
        text,
        completed: false
      })
    }
    
    return {
      count,
      todos,
      state,
      completedCount,
      addTodo
    }
  }
})
```

### 3. 自定义Hooks中的类型定义

```typescript
// hooks/useAsync.ts
import { ref, Ref } from 'vue'

interface AsyncResult<T> {
  data: Ref<T | null>
  error: Ref<Error | null>
  isLoading: Ref<boolean>
  execute: () => Promise<T>
}

export function useAsync<T>(
  asyncFunction: () => Promise<T>
): AsyncResult<T> {
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const isLoading = ref<boolean>(false)
  
  const execute = async (): Promise<T> => {
    isLoading.value = true
    error.value = null
    
    try {
      const result = await asyncFunction()
      data.value = result
      return result
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err))
      throw err
    } finally {
      isLoading.value = false
    }
  }
  
  return {
    data: data as Ref<T | null>,
    error,
    isLoading,
    execute
  }
}

// 使用示例
import { useAsync } from '@/hooks/useAsync'

interface User {
  id: number
  name: string
}

export default defineComponent({
  setup() {
    const { data: user, error, isLoading, execute } = useAsync<User>(
      () => fetch('/api/user').then(res => res.json())
    )
    
    // user.value 是 User | null 类型
    
    return {
      user,
      error,
      isLoading,
      loadUser: execute
    }
  }
})
```

### 4. emit事件类型定义

```typescript
// 子组件
import { defineComponent, SetupContext } from 'vue'

type Emits = {
  (e: 'update', value: string): void
  (e: 'delete', id: number): void
  (e: 'custom', payload: { message: string, code: number }): void
}

export default defineComponent({
  emits: ['update', 'delete', 'custom'],
  
  setup(props, { emit }: { emit: Emits }) {
    const onUpdate = (value: string) => {
      emit('update', value)
    }
    
    const onDelete = (id: number) => {
      emit('delete', id)
    }
    
    const onCustom = () => {
      emit('custom', {
        message: 'Hello',
        code: 200
      })
    }
    
    return {
      onUpdate,
      onDelete,
      onCustom
    }
  }
})

// 父组件
export default defineComponent({
  setup() {
    const handleUpdate = (value: string) => {
      // value 是 string 类型
      console.log('Updated:', value)
    }
    
    const handleDelete = (id: number) => {
      // id 是 number 类型
      console.log('Deleted:', id)
    }
    
    return {
      handleUpdate,
      handleDelete
    }
  }
})
```

## 53. sync修饰符是什么？

sync修饰符可以实现子组件与父组件的双向绑定，并且可以实现子组件同步修改父组件的值。

### 基本用法

在Vue 2.x中，sync修饰符是一个语法糖，它会自动扩展为一个额外的v-on监听器：

```
<!-- 父组件 -->
<child-component :title.sync="doc.title"></child-component>

<!-- 等价于 -->
<child-component :title="doc.title" @update:title="val => doc.title = val"></child-component>
```

在子组件中，可以通过以下方式更新父组件的值：

```
// 子组件
this.$emit('update:title', newTitle)
```

### Vue 3中的变化

在Vue 3中，sync修饰符已被移除，推荐使用v-model来实现双向绑定：

```
<!-- Vue 3 -->
<child-component v-model:title="doc.title"></child-component>

<!-- 子组件中 -->
<script setup>
defineProps(['title'])
defineEmits(['update:title'])
</script>

<template>
  <input :value="title" @input="$emit('update:title', $event.target.value)">
</template>
```

### Vue 2和Vue 3对比

| 特性 | Vue 2 | Vue 3 |
|------|-------|-------|
| sync修饰符 | 支持 | 已移除 |
| v-model | 单向绑定 | 支持多个v-model |
| 语法糖 | :prop.sync | v-model:prop |

### 实际应用示例

#### Vue 2中的sync使用

```vue
<!-- 父组件 -->
<template>
  <div>
    <p>父组件title: {{ doc.title }}</p>
    <child-component :title.sync="doc.title"></child-component>
  </div>
</template>

<script>
export default {
  data() {
    return {
      doc: {
        title: '初始标题'
      }
    }
  }
}
</script>

<!-- 子组件 -->
<template>
  <div>
    <input :value="title" @input="updateTitle">
  </div>
</template>

<script>
export default {
  props: ['title'],
  methods: {
    updateTitle(event) {
      this.$emit('update:title', event.target.value)
    }
  }
}
</script>
```

#### Vue 3中的v-model使用

```vue
<!-- 父组件 -->
<template>
  <div>
    <p>父组件title: {{ doc.title }}</p>
    <child-component v-model:title="doc.title"></child-component>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const doc = ref({
  title: '初始标题'
})
</script>

<!-- 子组件 -->
<template>
  <div>
    <input :value="title" @input="$emit('update:title', $event.target.value)">
  </div>
</template>

<script setup>
defineProps(['title'])
defineEmits(['update:title'])
</script>
```

### 多个v-model支持(Vue 3)

Vue 3支持在单个组件上使用多个v-model：

```vue
<!-- 父组件 -->
<template>
  <user-form 
    v-model:first-name="firstName" 
    v-model:last-name="lastName">
  </user-form>
</template>

<!-- 子组件 -->
<template>
  <form>
    <input 
      :value="firstName" 
      @input="$emit('update:first-name', $event.target.value)">
    <input 
      :value="lastName" 
      @input="$emit('update:last-name', $event.target.value)">
  </form>
</template>

<script setup>
defineProps(['firstName', 'lastName'])
defineEmits(['update:first-name', 'update:last-name'])
</script>
```

## 54. Vue2和Vue3的区别有哪些？

### 一、响应式系统

#### Vue 2

- 基于Object.defineProperty实现响应式。
- **缺点**：
  - 无法检测对象属性的新增/删除（需用Vue.set或this.$set）。
  - 数组的变异方法（如'push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'）需要特殊处理。
  - 初始化时需递归遍历所有属性，导致性能开销。

#### Vue 3

- 基于Proxy实现响应式，完全替代Object.defineProperty。
- **优点**：
  - 自动检测对象属性的新增/删除。
  - 更高效的数组响应式（无需特殊处理变异方法）。
  - 仅代理被访问的属性，减少性能开销。
  - 支持Map、Set、WeakMap、WeakSet等数据结构。

- **类比**：
  - Vue 2的响应式像"静态检查"，初始化时必须明确所有属性；Vue 3的响应式像"动态监控"，能实时捕获变化。

### 二、组合式API（Composition API）

#### Vue 2

- 使用选项式API（Options API），如data、methods、computed等分块组织代码。
- **缺点**：
  - 逻辑分散，难以复用（如多个组件需要共享同一逻辑时需提取到mixins）。
  - 大型组件中，相关逻辑可能分散在多个选项中，难以维护。
  - mixins存在命名冲突和数据来源不清晰的问题。

#### Vue 3

- 引入组合式API，允许将相关逻辑（如状态、方法、计算属性）组织到setup()函数中。
- **优点**：
  - 逻辑复用更简单（通过自定义Hook或Composable函数）。
  - 代码更紧凑，可读性更高。
  - 更好的TypeScript支持。
  - 更容易进行单元测试。

### 三、性能优化

#### 虚拟DOM优化

- Vue 3的编译器能静态提升（Static Hoisting）静态节点，减少虚拟DOM的比较开销。
- 使用Patch Flags标记动态节点，跳过静态节点的比对。
- 事件监听缓存，避免每次渲染时重新创建函数。

#### 编译优化

- Vue 3的编译器会生成更高效的渲染函数，减少运行时开销。
- 更积极的tree-shaking，减少打包体积。

#### 性能提升数据

- 官方测试显示，Vue 3的渲染速度比Vue 2快1.3~2倍，内存占用减少30%。

### 四、其他重要改进

#### 1. 更好的TypeScript支持
- Vue 3使用TypeScript重写，提供更好的类型推导和IDE支持。

#### 2. 多根节点支持（Fragment）
- Vue 3支持组件拥有多个根节点，无需包裹在一个元素中。

#### 3. Teleport组件
- 允许将组件渲染到DOM树的其他位置，常用于模态框、弹出框等场景。

#### 4. Suspense组件
- 用于处理异步依赖，提供更好的加载状态管理。

#### 5. 全局API重构
- Vue 3的全局API现在支持树摇优化，不会增加打包体积。

### 生命周期钩子变化

| Vue 2 钩子 | Vue 3 等效钩子 |
|------------|----------------|
| beforeCreate | setup() |
| created | setup() |
| beforeMount | onBeforeMount |
| mounted | onMounted |
| beforeUpdate | onBeforeUpdate |
| updated | onUpdated |
| beforeDestroy | onBeforeUnmount |
| destroyed | onUnmounted |

### 使用建议

1. **新项目**：推荐直接使用Vue 3，享受所有新特性和性能提升。
2. **现有项目**：Vue 2仍然可以正常使用，但建议在适当时机迁移到Vue 3。
3. **迁移策略**：Vue 3提供了兼容Vue 2的迁移构建版本，可以逐步迁移。

## 55. ref和reactive的区别是什么？

### 1. 底层实现

#### ref

- 通过Object.defineProperty或Proxy（Vue 3默认）包装一个内部值（value属性）。
- 本质是一个响应式的对象，即使传入的是基本类型（如number、string）。
- 在内部创建一个包含value属性的对象，并对该对象进行响应式处理。

#### reactive

- 直接通过Proxy包装整个对象，递归地将对象的所有嵌套属性转为响应式。
- 仅适用于对象类型（如Object、Array、Map等）。
- 返回原始对象的代理，保持原有引用。

### 2. 访问方式

#### ref

- 在模板中自动解包，无需.value。
- 在JavaScript逻辑中必须通过.value访问或修改值。
- 在响应式对象中作为属性被访问时也会自动解包。

#### reactive

- 始终直接访问属性，无需.value。
- 访问属性时会触发getter，修改属性时会触发setter。

### 3. 适用场景

#### ref

- 适合基本类型（如number、string、boolean）。
- 适合需要重新赋值的场景（如替换整个对象或数组）。
- 适合需要在模板中直接使用的变量。
- 适合需要传递给函数并保持响应性的场景。

#### reactive

- 适合对象类型（尤其是嵌套对象或复杂状态）。
- 适合不需要整体替换的场景（直接修改属性即可）。
- 适合组织相关联的状态到一个对象中。
- 适合需要保持对象引用的场景。

### 4. 响应式丢失问题

#### ref

- 由于内部通过.value封装，不会丢失响应性（即使解构或展开）。
- 解构时会失去响应性，但可以通过toRefs保持。

#### reactive

- 直接解构或展开对象会丢失响应性（因为Proxy被破坏）。
- 解决方案：使用toRefs或toRef保持响应性。

### 5. 性能考虑

#### ref

- 对基本类型有轻微开销（需通过.value访问）。
- 对对象类型，内部实际是reactive的封装（Vue 3会优化）。
- 每个ref都是一个独立的响应式对象。

#### reactive

- 直接使用Proxy，对对象访问更高效。
- 但递归代理大型对象可能有性能成本（通常可忽略）。
- 整个对象作为一个响应式单元。

### 6. 实际应用示例

```javascript
import { ref, reactive } from 'vue'

// 使用ref处理基本类型
const count = ref(0)
console.log(count.value) // 0

// 使用ref处理对象（内部会调用reactive）
const state = ref({
  name: 'Vue',
  version: 3
})
console.log(state.value.name) // 'Vue'

// 使用reactive处理对象
const userInfo = reactive({
  name: 'Alice',
  age: 25,
  hobbies: ['reading', 'coding']
})
console.log(userInfo.name) // 'Alice'

// 响应式丢失问题示例
// 错误做法：解构会丢失响应性
const { name, age } = userInfo // name和age不再是响应式的

// 正确做法：使用toRefs保持响应性
import { toRefs } from 'vue'
const { name: nameRef, age: ageRef } = toRefs(userInfo) // nameRef和ageRef仍然是响应式的
```

| 特性 | ref | reactive |
|------|-----|----------|
| 基本类型支持 | ✅ 是 | ❌ 否（需用ref包装） |
| 重新赋值 | ✅ 支持（替换.value） | ❌ 不支持（需合并对象） |
| 模板自动解包 | ✅ 是 | ✅ 是（直接访问属性） |
| 解构/展开 | ⚠️ 需注意.value | ❌ 丢失响应性（需toRefs） |
| 函数式更新 | ✅ 支持（ref.value = newValue） | ✅ 支持（直接修改属性） |
| 内部实现 | 包装为`{ value }`对象 | 直接代理原始对象 |
| 适用场景 | 基本类型、需要重新赋值 | 对象类型、复杂状态管理 |

## 56. 解决Vue页面刷新，数据丢失的方法有哪些？

### 1. 状态持久化方案

#### (1) Vuex状态持久化

**问题**：Vuex的状态存储在内存中，刷新后会丢失。

**解决方案**：使用vuex-persistedstate插件将Vuex状态保存到本地存储（如localStorage或sessionStorage）。

**适用场景**：需要持久化全局状态（如用户登录信息、主题设置）。

#### (2) 组件本地状态持久化

**问题**：组件的data或computed属性在刷新后会丢失。

**解决方案**：
- 使用本地存储：在created或mounted钩子中从localStorage读取数据，在beforeDestroy或watch中保存数据。

**适用场景**：表单数据、用户偏好等需要持久化的局部状态。

### 2. 服务端存储方案

#### (1) 后端API存储

**问题**：某些数据（如用户会话、购物车）需要跨设备或长期保存。

**解决方案**：
- 在页面刷新时，通过API请求从后端重新获取数据。

**适用场景**：用户认证信息、订单数据等需要后端支持的数据。

#### (2) 数据库缓存

**问题**：高频访问的数据（如商品列表）在刷新后需要重新加载。

**解决方案**：
- 使用Redis等缓存技术，在用户首次访问时缓存数据，刷新后直接从缓存读取。

**适用场景**：电商商品列表、新闻资讯等高频访问数据。

### 3. 路由级状态保持

#### (1) 使用`<keep-alive>`缓存组件

**问题**：某些组件（如Tab页）在切换时需要保持状态，但刷新后会丢失。

**解决方案**：
- 使用Vue的`<keep-alive>`缓存组件实例，避免重新渲染。

```javascript
const routes = [
  {
    path: '/profile',
    component: Profile,
    meta: { keepAlive: true }, // 标记需要缓存
  },
];
```

### 4. 浏览器扩展方案

#### (1) Service Worker缓存

**问题**：需要离线访问或快速加载数据。

**解决方案**：
- 使用Service Worker缓存静态资源（如HTML、CSS、JS）和API响应。

### 5. 混合方案选择

| 方案 | 适用场景 | 优点 | 缺点 |
|------|----------|------|------|
| Vuex持久化 | 全局状态（如用户信息） | 简单易用，适合小型应用 | 仅适用于客户端，无法跨设备同步 |
| 后端API存储 | 用户会话、订单数据 | 数据安全，跨设备同步 | 需要后端支持，可能增加请求延迟 |
| `<keep-alive>` | 组件级状态保持（如Tab页） | 无需额外存储，性能较好 | 刷新后仍会丢失数据 |
| Service Worker缓存 | 静态资源、API响应 | 离线支持，快速加载 | 实现复杂，需处理缓存更新逻辑 |

### 6. 最佳实践建议

1. **优先使用Vuex持久化**：
   - 对于小型应用或需要持久化的全局状态（如用户登录状态），vuex-persistedstate是最简单高效的方案。

2. **复杂数据依赖后端**：
   - 对于用户会话、订单等关键数据，应通过后端API重新获取，确保数据一致性。

3. **结合Service Worker提升体验**：
   - 对于需要离线支持或快速加载的应用，可结合Service Worker缓存静态资源。

4. **避免过度持久化**：
   - 敏感数据（如密码）不应存储在本地，临时数据（如搜索关键词）无需持久化。

## 57. 单页面应用的优点、缺点？与多页面的比较

### 优点

#### 1. 用户体验流畅

- **无页面刷新**：SPA通过动态加载内容（如Vue/React的组件切换）实现局部更新，避免了传统MPA的全页面刷新，操作更接近原生应用。
- **快速响应**：首次加载后，后续交互仅需加载数据（如通过API），响应速度更快。
- **示例**：Gmail、GitHub、Figma等工具均采用SPA，用户切换邮件或功能时无需等待页面跳转。

#### 2. 开发效率高

- **组件化开发**：Vue/React的组件化思想可复用代码，减少重复开发。
- **前后端分离**：SPA通常依赖API与后端交互，前后端可并行开发，提升效率。
- **示例**：使用Vue开发一个电商网站，商品列表、详情页可复用同一套组件逻辑。

#### 3. 适合复杂交互场景

- **状态管理**：通过Vuex/Pinia或Redux管理全局状态，适合实时协作、表单复杂等场景。
- **路由控制**：前端路由（如Vue Router）可实现动态路由、懒加载等优化。
- **示例**：在线文档编辑器（如Google Docs）需要实时同步多用户操作，SPA的状态管理更高效。

#### 4. 部署与维护简单

- **单入口文件**：部署时只需一个HTML文件和静态资源（JS/CSS），适合CDN加速。
- **热更新**：代码修改后无需重新编译整个应用，开发时体验更佳。

### 缺点

#### 1. SEO友好性差

- **初始渲染问题**：SPA依赖JavaScript动态生成内容，搜索引擎爬虫可能无法获取完整内容（除非使用SSR或预渲染）。
- **解决方案**：需额外配置SSR（如Nuxt.js/Next.js）或预渲染（如Prerender SPA Plugin），增加复杂度。

#### 2. 首屏加载慢

- **资源体积大**：需一次性加载所有JS/CSS文件，可能导致首屏白屏时间较长。
- **优化方案**：代码分割（Code Splitting）、懒加载（Lazy Loading）可缓解问题。

#### 3. 浏览器兼容性要求高

- **依赖JavaScript**：若用户禁用JS或浏览器版本过低，SPA可能无法正常工作。
- **解决方案**：需提供降级方案（如服务端渲染或提示用户启用JS）。

#### 4. 内存占用高

- **长期运行问题**：SPA在浏览器中持续运行，可能导致内存泄漏或性能下降（尤其在复杂应用中）。
- **解决方案**：需手动管理组件销毁、避免全局变量滥用。

| 维度 | SPA | MPA |
|------|-----|-----|
| 用户体验 | 适合复杂交互、实时协作 | 适合内容展示、SEO优先场景 |
| 开发效率 | 高（组件化、前后端分离） | 低（代码重复、维护复杂） |
| SEO友好性 | 差（需SSR/预渲染） | 好（服务端渲染） |
| 首屏加载 | 慢（需优化） | 快（按需加载） |
| 兼容性 | 依赖JS（需降级方案） | 不依赖JS（兼容性好） |
| 典型应用 | 电商后台、在线协作工具 | 博客、新闻网站、政府官网 |

## 58. 路由加载有哪些方式？

### 定义

路由懒加载是一种将路由组件的加载延迟到用户实际访问该路由时再进行的技术。

### 核心思想

将应用的代码拆分成多个小块（chunks），按需加载，避免一次性加载所有代码。

### 优势

- **减少初始包体积**：用户首次访问时只需加载必要的代码，后续路由组件按需加载。
- **提升加载速度**：减少首屏渲染时间，提升用户体验。
- **优化资源利用**：避免加载用户可能永远不会访问的代码。

### (1) Vue.js中的路由懒加载

在Vue Router中，可以通过动态导入（import()）语法实现路由懒加载。

### (2) React中的路由懒加载

在React Router中，可以通过React.lazy和Suspense实现路由懒加载。

### 优势

#### 性能优化

- **减少首屏加载时间**：用户首次访问时只需加载必要的代码，后续路由组件按需加载。
- **降低内存占用**：避免一次性加载所有代码，减少内存压力。

#### 用户体验提升

- **快速渲染首屏**：用户可以更快看到页面内容，提升感知性能。
- **平滑切换**：路由切换时，组件按需加载，避免卡顿。

#### 代码拆分

- **按需加载**：将代码拆分成多个小块，按需加载，提升资源利用率。
- **便于缓存**：拆分后的chunk可以被浏览器缓存，减少重复加载。

## 59. Vue响应式原理是什么？

Vue的响应式系统是Vue最核心的特性之一，它使得数据和视图保持同步。当数据发生变化时，视图会自动更新，开发者无需手动操作DOM。

### Vue 2的响应式原理

#### 1. 核心机制

- **数据劫持**：通过Object.defineProperty递归劫持对象的所有属性（包括嵌套属性），将属性转换为getter和setter。
- **依赖收集**：在getter中收集依赖（如渲染函数、计算属性、侦听器），在setter中触发依赖更新。
- **观察者模式**：通过Watcher观察数据变化，通知视图更新。

#### 2. 实现步骤

**初始化阶段**：
- 遍历data对象，通过Object.defineProperty将每个属性转换为getter/setter。
- 访问属性时（如模板中渲染），触发getter，将当前渲染函数（Watcher）加入依赖列表。

**更新阶段**：
- 修改属性时（如this.message = 'new'），触发setter，通知所有依赖的Watcher执行更新。

#### 3. 核心概念

1. **Observer（观察者）**：
   - 给对象的属性添加getter和setter
   - 用于依赖收集和派发更新

2. **Watcher（观察者）**：
   - 用于观察数据变化
   - 当数据变化时执行回调函数
   - 分为渲染Watcher、计算属性Watcher、侦听器Watcher

3. **Dep（依赖收集器）**：
   - 用于收集依赖
   - 每个响应式属性都有一个对应的Dep实例

#### 4. 工作流程

1. Observer通过Object.defineProperty劫持数据的getter和setter
2. 当组件渲染时，访问数据会触发getter，在getter中进行依赖收集
3. 当数据发生变化时，触发setter，在setter中派发更新
4. Watcher接收到更新通知，执行相应的更新操作

**局限性**：
- 无法检测新增/删除属性：需使用Vue.set或Vue.delete。
- 数组变化需特殊处理：通过重写数组的'push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'等方法触发更新。
- 性能开销：递归遍历所有属性，对大型对象可能影响性能。
- 无法检测通过索引设置数组项：vm.items[indexOfItem] = newValue
- 无法检测数组长度的修改：vm.items.length = newLength

### Vue 3的响应式原理

#### 1. 核心机制

- **基于Proxy**：使用ES6的Proxy代理对象，无需递归遍历属性，直接拦截所有操作（如读取、赋值、删除等）。
- **更高效的依赖收集**：通过effect函数和track/trigger机制实现。
- **Reactive Effect**：通过effect函数包装需要响应式的操作。

#### 2. 实现步骤

**初始化阶段**：
- 使用reactive或ref创建响应式对象，底层通过Proxy代理。
- 访问属性时（如模板中渲染），触发track收集依赖（如effect函数）。

**更新阶段**：
- 修改属性时（如state.message = 'new'），触发trigger，通知所有依赖的effect执行更新。

#### 3. 核心概念

1. **reactive**：
   - 返回对象的响应式副本
   - 通过Proxy实现

2. **ref**：
   - 为基本类型值创建响应式引用
   - 通过.value访问值

3. **effect**：
   - 创建响应式副作用函数
   - 当依赖的数据变化时重新执行

4. **track/trigger**：
   - track：收集依赖
   - trigger：触发依赖更新

#### 4. 工作流程

1. 使用reactive或ref创建响应式数据
2. 通过Proxy拦截对数据的访问和修改
3. 访问数据时触发track进行依赖收集
4. 修改数据时触发trigger派发更新
5. effect函数在依赖变化时重新执行

#### 优势

- **支持动态属性**：无需特殊API，直接新增/删除属性即可触发更新。
- **更全面的拦截**：支持数组索引修改、length修改等。
- **性能优化**：按需拦截操作，避免递归遍历。
- **支持更多数据类型**：支持Map、Set、WeakMap、WeakSet等。
- **更好的TypeScript支持**：类型推导更准确。
- **模块化设计**：响应式系统可以独立使用。

### Vue 2 vs Vue 3响应式对比

| 特性 | Vue 2 | Vue 3 |
|------|-------|-------|
| 实现方式 | Object.defineProperty | Proxy |
| 对象属性新增/删除 | 需要Vue.set/Vue.delete | 直接支持 |
| 数组索引修改 | 需要特殊处理 | 直接支持 |
| 性能 | 递归遍历所有属性 | 按需代理 |
| 数据类型支持 | Object、Array | Object、Array、Map、Set等 |
| Tree-shaking | 不支持 | 支持 |
| TypeScript支持 | 一般 | 优秀 |

## 60. Vue改变数据后，视图怎么更新的？

Vue的视图更新机制是其响应式系统的核心体现。当数据发生变化时，Vue会自动更新相关的视图，这一过程对开发者是透明的。

### Vue 2.x

#### 工作原理

1. **数据劫持**：
   - 使用Object.defineProperty()方法劫持对象属性的getter和setter
   - 当访问一个属性时，会触发getter
   - 当修改一个属性时，会触发setter

2. **依赖收集**：
   - 在getter中收集依赖（Watcher）
   - 每个组件实例都对应一个Watcher实例
   - Watcher会在渲染过程中把"touch"过的数据属性记录为依赖

3. **派发更新**：
   - 在setter中，当数据发生变化时，Vue能够知道数据发生了变化
   - 通知所有依赖该数据的Watcher进行更新
   - Watcher接收到更新通知后，会重新执行渲染函数

4. **异步更新队列**：
   - Vue在更新DOM时是异步执行的
   - 所有数据变化都会被推入一个队列中
   - 在下一个事件循环"tick"中，Vue刷新队列并执行实际的DOM更新

#### 局限性

- **对象属性的添加或删除**：Object.defineProperty()无法检测到，需要使用Vue.set或this.$set
- **数组索引的变化**：无法直接检测到，需要使用变异方法或Vue.set
- **数组长度的修改**：无法检测到，需要使用变异方法

#### 示例

```javascript
// Vue 2中需要注意的情况
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c'],
    user: {
      name: 'Vue'
    }
  }
})

// 以下操作不会触发更新
vm.items[1] = 'x' // 应该使用 vm.items.splice(1, 1, 'x')
vm.items.length = 2 // 应该使用 vm.items.splice(2)
vm.user.age = 25 // 应该使用 Vue.set(vm.user, 'age', 25)

// 正确的做法
vm.items.splice(1, 1, 'x')
vm.items.splice(2)
Vue.set(vm.user, 'age', 25)
// 或者
vm.$set(vm.user, 'age', 25)
```

### Vue 3.x

#### 工作原理

1. **Proxy代理**：
   - 使用ES6的Proxy对象来实现数据劫持
   - Proxy可以代理整个对象，能够更全面地监听对象的变化

2. **全面监听**：
   - 能够监听属性的添加、删除
   - 能够监听数组索引的变化
   - 能够监听数组长度的修改
   - 支持Map、Set等数据结构

3. **响应式系统重构**：
   - 基于Proxy和Reflect实现
   - 更加模块化，可以独立使用
   - 性能更好，按需代理

4. **依赖跟踪**：
   - 使用track()函数收集依赖
   - 使用trigger()函数触发更新
   - 更精确的依赖关系管理

#### 优势

- **无需特殊API**：可以直接修改对象属性，包括新增和删除
- **数组操作支持**：可以直接通过索引修改数组元素
- **更好的性能**：按需代理，避免递归遍历
- **更广泛的支持**：支持Map、Set等数据结构

#### 示例

```javascript
// Vue 3中更自然的操作
import { reactive } from 'vue'

const state = reactive({
  items: ['a', 'b', 'c'],
  user: {
    name: 'Vue'
  }
})

// 以下操作都能正常触发更新
state.items[1] = 'x' // 直接修改数组索引
state.items.length = 2 // 直接修改数组长度
state.user.age = 25 // 直接添加新属性
delete state.user.name // 直接删除属性
```

### 异步更新机制

无论是Vue 2还是Vue 3，都采用了异步更新DOM的策略：

1. **批量更新**：在同一事件循环中发生的多次数据变更会被缓冲起来
2. **去重处理**：相同的Watcher只会被推入队列一次
3. **异步执行**：在下一个事件循环"tick"中统一更新DOM
4. **$nextTick**：提供机制在DOM更新完成后执行回调

```javascript
// 使用$nextTick获取更新后的DOM
this.message = 'changed'
this.$nextTick(function () {
  // DOM现在更新了
  console.log(this.$el.textContent) // 'changed'
})

// 或者使用Promise
this.message = 'changed'
await this.$nextTick()
console.log(this.$el.textContent) // 'changed'
```

## 61. Vue的v-model的原理是什么？

v-model本质上是语法糖，是Vue中用于实现表单输入和应用状态之间双向绑定的指令，其核心原理基于数据劫持（响应式系统）和事件监听的结合。

### 基本原理

v-model通过以下两个步骤实现双向绑定：

1. **数据绑定**：将组件的value属性绑定到Vue实例的某个数据属性
2. **事件监听**：当用户输入时，通过input事件更新Vue实例的数据

### Vue 2中的v-model

#### 工作原理

在Vue 2中，v-model默认使用：
- **value** prop：绑定值
- **input** event：更新值

```vue
<!-- 以下两种写法是等价的 -->
<input v-model="message">

<input 
  :value="message" 
  @input="message = $event.target.value">
```

#### 在组件中使用

```vue
<!-- 父组件 -->
<custom-input v-model="searchText"></custom-input>

<!-- 子组件 -->
<template>
  <input
    :value="value"
    @input="$emit('input', $event.target.value)">
</template>

<script>
export default {
  props: ['value'],
  // 注意：在Vue 2.3+中，可以通过model选项自定义
  model: {
    prop: 'value',
    event: 'input'
  }
}
</script>
```

### Vue 3中的变化

#### 默认prop和事件

Vue 3中v-model的默认绑定发生了变化：
- **Vue 2**：value prop和input事件
- **Vue 3**：modelValue prop和update:modelValue事件

```vue
<!-- Vue 3中的等价写法 -->
<input v-model="message">

<input 
  :value="message" 
  @input="message = $event.target.value">
```

#### 在组件中使用

```vue
<!-- 父组件 -->
<custom-input v-model="searchText"></custom-input>

<!-- 子组件 -->
<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)">
</template>

<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue']
}
</script>
```

#### 支持多个v-model

Vue 3允许在同一个组件上使用多个v-model，通过参数名区分。

```vue
<!-- 父组件 -->
<user-name
  v-model:first-name="firstName"
  v-model:last-name="lastName">
</user-name>

<!-- 子组件 -->
<template>
  <input 
    type="text" 
    :value="firstName" 
    @input="$emit('update:first-name', $event.target.value)">
  <input 
    type="text" 
    :value="lastName" 
    @input="$emit('update:last-name', $event.target.value)">
</template>

<script>
export default {
  props: ['firstName', 'lastName'],
  emits: ['update:first-name', 'update:last-name']
}
</script>
```

#### 自定义修饰符

Vue 3还支持自定义v-model修饰符：

```vue
<!-- 父组件 -->
<my-component v-model.capitalize="myText"></my-component>

<!-- 子组件 -->
<template>
  <input 
    :value="modelValue" 
    @input="$emit('update:modelValue', $event.target.value)">
</template>

<script>
export default {
  props: {
    modelValue: String,
    modelModifiers: { default: () => ({}) }
  },
  emits: ['update:modelValue'],
  created() {
    console.log(this.modelModifiers) // { capitalize: true }
  }
}
</script>
```

### v-model修饰符

Vue为v-model提供了几个内置修饰符：

1. **.lazy**：从input事件改为change事件
```vue
<input v-model.lazy="msg">
```

2. **.number**：自动将输入值转换为数字
```vue
<input v-model.number="age" type="number">
```

3. **.trim**：自动过滤用户输入的首尾空白字符
```vue
<input v-model.trim="msg">
```

### 不同表单元素的v-model

#### 文本输入框
```vue
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>
```

#### 多行文本
```vue
<textarea v-model="message" placeholder="add multiple lines"></textarea>
```

#### 复选框
```vue
<!-- 单个复选框 -->
<input type="checkbox" id="checkbox" v-model="checked">
<label for="checkbox">{{ checked }}</label>

<!-- 多个复选框 -->
<div id="checkbox-group">
  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
  <label for="jack">Jack</label>
  <input type="checkbox" id="john" value="John" v-model="checkedNames">
  <label for="john">John</label>
  <p>Checked names: {{ checkedNames }}</p>
</div>
```

#### 单选按钮
```vue
<div id="example-4">
  <input type="radio" id="one" value="One" v-model="picked">
  <label for="one">One</label>
  <input type="radio" id="two" value="Two" v-model="picked">
  <label for="two">Two</label>
  <p>Picked: {{ picked }}</p>
</div>
```

#### 选择框
```vue
<!-- 单选 -->
<select v-model="selected">
  <option disabled value="">请选择</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>

<!-- 多选 -->
<select v-model="selected" multiple>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

### 注意事项

1. **在Vue 3中迁移**：如果从Vue 2升级到Vue 3，需要更新组件中的prop名和事件名
2. **表单元素兼容性**：v-model会忽略所有表单元素的value、checked、selected attribute的初始值，始终将Vue实例的数据作为数据来源
3. **修饰符使用**：根据实际需求选择合适的修饰符，提高用户体验

---

## 51. Vue插槽（Slot）是什么？有哪些类型？

### 什么是插槽？

插槽（Slot）是Vue组件的一种内容分发机制，允许父组件向子组件传递模板内容。它让组件更加灵活，可以复用组件结构同时自定义部分内容。

### 插槽的类型

#### 1. 默认插槽（匿名插槽）

没有指定名称的插槽，一个组件只能有一个默认插槽。

```vue
<!-- 子组件 Child.vue -->
<template>
  <div class="card">
    <h3>卡片标题</h3>
    <!-- 插槽出口 -->
    <slot>默认内容</slot>
  </div>
</template>

<!-- 父组件 -->
<template>
  <Child>
    <p>这是插入到插槽的内容</p>
  </Child>
</template>
```

#### 2. 具名插槽（Named Slots）

带有名称的插槽，一个组件可以有多个具名插槽。

```vue
<!-- 子组件 Layout.vue -->
<template>
  <div class="layout">
    <header>
      <slot name="header">默认头部</slot>
    </header>
    <main>
      <slot>默认主体内容</slot>
    </main>
    <footer>
      <slot name="footer">默认底部</slot>
    </footer>
  </div>
</template>

<!-- 父组件 -->
<template>
  <Layout>
    <template #header>
      <h1>自定义头部</h1>
    </template>

    <p>主体内容（默认插槽）</p>

    <template #footer>
      <p>自定义底部</p>
    </template>
  </Layout>
</template>
```

**Vue 2语法**：使用`slot="name"`和`slot-scope`
**Vue 3语法**：使用`v-slot:name`或简写`#name`

#### 3. 作用域插槽（Scoped Slots）

子组件向父组件传递数据，让父组件可以访问子组件的内部状态。

```vue
<!-- 子组件 List.vue -->
<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <slot :item="item" :index="index">
        {{ item.name }}
      </slot>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { id: 1, name: 'Item 1', price: 100 },
        { id: 2, name: 'Item 2', price: 200 }
      ]
    }
  }
}
</script>

<!-- 父组件 -->
<template>
  <List v-slot="{ item, index }">
    <span>{{ index + 1 }}. {{ item.name }} - ¥{{ item.price }}</span>
  </List>
</template>
```

#### 4. 动态插槽名

Vue 2.6+ 支持动态插槽名。

```vue
<template>
  <base-layout>
    <template v-slot:[dynamicSlotName]>
      动态插槽内容
    </template>
  </base-layout>
</template>
```

### 插槽的工作原理

```
编译阶段：
1. 父组件模板中的插槽内容编译为渲染函数
2. 子组件的<slot>标签作为占位符
3. 渲染时将父组件的vnode插入到子组件的slot位置
```

### 使用场景

| 类型 | 使用场景 |
|------|----------|
| 默认插槽 | 组件只有一处需要自定义内容 |
| 具名插槽 | 组件有多处需要分别自定义（如布局组件） |
| 作用域插槽 | 需要子组件数据来渲染自定义内容（如表格、列表） |

---

## 52. 什么是虚拟DOM？它的作用是什么？

### 什么是虚拟DOM？

虚拟DOM（Virtual DOM）是对真实DOM的抽象表示，是一个轻量级的JavaScript对象树，它描述了真实DOM的结构和属性。

```javascript
// 真实DOM
<div id="app" class="container">
  <p>Hello World</p>
</div>

// 对应的虚拟DOM（简化表示）
{
  tag: 'div',
  props: { id: 'app', class: 'container' },
  children: [
    {
      tag: 'p',
      props: {},
      children: ['Hello World']
    }
  ]
}
```

### 虚拟DOM的作用

#### 1. 提高性能

直接操作真实DOM代价昂贵，虚拟DOM通过Diff算法最小化真实DOM操作。

```
操作类型        耗时
直接操作DOM     ~10ms
操作虚拟DOM     ~0.1ms
```

#### 2. 跨平台能力

虚拟DOM可以映射到不同平台：
- **浏览器**：渲染为真实DOM
- **服务端**：渲染为HTML字符串（SSR）
- **移动端**：渲染为原生组件（Weex、uni-app）
- **小程序**：渲染为小程序视图

#### 3. 编程便利性

无需手动操作DOM，通过数据驱动视图更新。

### 虚拟DOM的工作流程

```
1. 创建阶段
   组件渲染 → 创建VNode树 → 转换为真实DOM → 挂载到页面

2. 更新阶段
   数据变化 → 创建新VNode树 → Diff比较 → 生成补丁 → 更新真实DOM
```

### Vue中的虚拟DOM实现

```javascript
// Vue 2 - VNode结构
{
  tag: 'div',           // 标签名或组件
  data: { ... },        // 属性、事件、样式等
  children: [ ... ],    // 子节点
  text: undefined,      // 文本内容
  elm: undefined,       // 对应的真实DOM
  key: undefined        // 用于Diff的key
}

// Vue 3 - 优化后的VNode
{
  type: 'div',          // 节点类型
  props: { ... },       // 属性
  children: [ ... ],    // 子节点
  key: null,
  shapeFlag: 9,         // 形状标记（优化）
  patchFlag: 1          // 补丁标记（优化）
}
```

### Vue 3对虚拟DOM的优化

#### 1. 静态提升（Static Hoisting）

将静态节点提升到渲染函数之外，避免重复创建。

```vue
<template>
  <div>
    <h1>静态标题</h1>  <!-- 静态提升 -->
    <p>{{ dynamic }}</p>  <!-- 动态节点 -->
  </div>
</template>
```

#### 2. Patch Flags

标记动态节点类型，Diff时跳过静态节点。

```javascript
// 编译后
function render() {
  return (_openBlock(), _createBlock('div', null, [
    _createVNode('h1', null, '静态标题'),
    _createVNode('p', null, _toDisplayString(dynamic), 1 /* TEXT */)
  ]))
}
```

#### 3. 事件缓存

缓存事件处理函数，避免重新创建。

---

## 53. Vue的Diff算法原理是什么？

### 什么是Diff算法？

Diff算法是比较两棵虚拟DOM树（新旧VNode），找出它们之间的差异，然后只更新需要变化的部分到真实DOM。

### Diff算法的特点

#### 1. 同级比较

只比较同一层级的节点，不会跨层级比较。

```
旧树：          新树：
    A              A
   / \            / \
  B   C    →     D   C
     /              /
    D              E

只比较A-A、B-D、C-C，不会考虑B变成D的情况
```

#### 2. 深度优先

先比较完当前节点的所有子节点，再比较兄弟节点。

### Diff算法流程

#### 1. 节点比较（patch）

```javascript
function patch(oldVnode, newVnode) {
  // 1. 如果是相同节点（key和tag相同）
  if (sameVnode(oldVnode, newVnode)) {
    patchVnode(oldVnode, newVnode)
  } else {
    // 2. 不同节点，直接替换
    const oldElm = oldVnode.elm
    const parentElm = oldElm.parentNode

    createElm(newVnode)  // 创建新节点
    parentElm.insertBefore(newVnode.elm, oldElm)
    parentElm.removeChild(oldElm)
  }
}
```

#### 2. 相同节点更新（patchVnode）

```javascript
function patchVnode(oldVnode, newVnode) {
  const elm = newVnode.elm = oldVnode.elm

  // 1. 如果新节点是文本节点
  if (newVnode.text) {
    if (newVnode.text !== oldVnode.text) {
      elm.textContent = newVnode.text
    }
  } else {
    // 2. 更新属性
    updateProps(oldVnode, newVnode)

    // 3. 更新子节点
    const oldCh = oldVnode.children
    const newCh = newVnode.children

    if (oldCh && newCh) {
      // 都有子节点，进行Diff
      updateChildren(elm, oldCh, newCh)
    } else if (newCh) {
      // 新增子节点
      addVnodes(elm, null, newCh, 0, newCh.length - 1)
    } else if (oldCh) {
      // 删除子节点
      removeVnodes(elm, oldCh, 0, oldCh.length - 1)
    }
  }
}
```

#### 3. 子节点更新（updateChildren）- 双端比较

```javascript
function updateChildren(parentElm, oldCh, newCh) {
  let oldStartIdx = 0
  let oldEndIdx = oldCh.length - 1
  let newStartIdx = 0
  let newEndIdx = newCh.length - 1

  let oldStartVnode = oldCh[0]
  let oldEndVnode = oldCh[oldEndIdx]
  let newStartVnode = newCh[0]
  let newEndVnode = newCh[newEndIdx]

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 四种比较情况
    if (sameVnode(oldStartVnode, newStartVnode)) {
      // 旧头 vs 新头
      patchVnode(oldStartVnode, newStartVnode)
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      // 旧尾 vs 新尾
      patchVnode(oldEndVnode, newEndVnode)
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      // 旧头 vs 新尾（需要移动）
      patchVnode(oldStartVnode, newEndVnode)
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      // 旧尾 vs 新头（需要移动）
      patchVnode(oldEndVnode, newStartVnode)
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
    } else {
      // 以上都不匹配，使用key查找
      const idxInOld = findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
      if (idxInOld) {
        // 找到，移动节点
        const vnodeToMove = oldCh[idxInOld]
        patchVnode(vnodeToMove, newStartVnode)
        parentElm.insertBefore(vnodeToMove.elm, oldStartVnode.elm)
        oldCh[idxInOld] = undefined
      } else {
        // 没找到，创建新节点
        createElm(newStartVnode, parentElm, oldStartVnode.elm)
      }
      newStartVnode = newCh[++newStartIdx]
    }
  }

  // 处理剩余节点
  if (oldStartIdx > oldEndIdx) {
    // 新增节点
    addVnodes(parentElm, newCh, newStartIdx, newEndIdx)
  } else if (newStartIdx > newEndIdx) {
    // 删除节点
    removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
  }
}
```

### 为什么需要key？

```vue
<!-- 没有key -->
<ul>
  <li v-for="item in list">{{ item.name }}</li>
</ul>

<!-- 有key -->
<ul>
  <li v-for="item in list" :key="item.id">{{ item.name }}</li>
</ul>
```

| 场景 | 无key | 有key |
|------|-------|-------|
| 列表顺序改变 | 全部重新渲染 | 只移动节点 |
| 性能 | 差 | 好 |
| 组件状态 | 可能错乱 | 保持正确 |

**不要使用index作为key！**

### Vue 3 Diff算法优化

1. **静态标记**：跳过静态节点的比较
2. **PatchFlag**：只比较动态部分
3. **最长递增子序列（LIS）**：优化节点移动

---

## 54. Vue中的过滤器（Filters）是什么？如何使用？

### 什么是过滤器？

过滤器是Vue中用于文本格式化的功能，可以在插值表达式和v-bind表达式中使用。

**注意**：Vue 3已移除过滤器，推荐使用计算属性或方法替代。

### Vue 2中的过滤器

#### 1. 定义过滤器

```javascript
// 全局过滤器
Vue.filter('capitalize', function(value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

// 局部过滤器
export default {
  filters: {
    capitalize(value) {
      if (!value) return ''
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
```

#### 2. 使用过滤器

```vue
<template>
  <!-- 在插值中使用 -->
  <p>{{ message | capitalize }}</p>

  <!-- 在v-bind中使用 -->
  <div :id="rawId | formatId"></div>

  <!-- 链式调用 -->
  <p>{{ message | capitalize | reverse }}</p>

  <!-- 传参 -->
  <p>{{ accountBalance | currency('USD') }}</p>
</template>
```

#### 3. 常用过滤器示例

```javascript
// 日期格式化
Vue.filter('formatDate', (value, format = 'YYYY-MM-DD') => {
  return moment(value).format(format)
})

// 千分位分隔
Vue.filter('thousands', (value) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
})

// 文件大小格式化
Vue.filter('fileSize', (bytes) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
})
```

### Vue 3中的替代方案

```vue
<script setup>
import { computed } from 'vue'

const props = defineProps({
  message: String
})

// 使用计算属性替代过滤器
const capitalizedMessage = computed(() => {
  if (!props.message) return ''
  return props.message.charAt(0).toUpperCase() + props.message.slice(1)
})

// 或使用全局方法
const formatDate = (date, format = 'YYYY-MM-DD') => {
  return moment(date).format(format)
}
</script>

<template>
  <p>{{ capitalizedMessage }}</p>
  <p>{{ formatDate(createTime) }}</p>
</template>
```

---

## 55. Vue中的Mixin是什么？有什么优缺点？

### 什么是Mixin？

Mixin是Vue中一种代码复用机制，允许将组件的选项（data、methods、computed等）混入到其他组件中。

### Mixin的使用

#### 1. 定义Mixin

```javascript
// mixins/common.js
export const commonMixin = {
  data() {
    return {
      loading: false,
      error: null
    }
  },
  methods: {
    showLoading() {
      this.loading = true
    },
    hideLoading() {
      this.loading = false
    },
    handleError(error) {
      this.error = error.message
      console.error(error)
    }
  },
  created() {
    console.log('Mixin created')
  }
}

// mixins/pagination.js
export const paginationMixin = {
  data() {
    return {
      page: 1,
      pageSize: 10,
      total: 0,
      list: []
    }
  },
  methods: {
    handlePageChange(page) {
      this.page = page
      this.fetchData()
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.page = 1
      this.fetchData()
    }
  }
}
```

#### 2. 使用Mixin

```vue
<script>
import { commonMixin, paginationMixin } from '@/mixins'

export default {
  mixins: [commonMixin, paginationMixin],
  data() {
    return {
      userList: []
    }
  },
  created() {
    // 会先执行mixin的created，再执行组件的created
    console.log('Component created')
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.showLoading()
      try {
        const res = await api.getUsers({
          page: this.page,
          pageSize: this.pageSize
        })
        this.userList = res.data.list
        this.total = res.data.total
      } catch (error) {
        this.handleError(error)
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
```

### 选项合并策略

当组件和Mixin有同名选项时，Vue按以下规则合并：

| 选项 | 合并策略 |
|------|----------|
| data | 递归合并，组件数据优先 |
| methods/computed | 组件覆盖Mixin |
| 生命周期钩子 | 合并成数组，先执行Mixin |
| components/directives | 组件优先 |
| watch | 合并成数组 |

```javascript
const mixin = {
  data() {
    return { msg: 'mixin', count: 1 }
  },
  created() {
    console.log('mixin created')
  },
  methods: {
    foo() { console.log('mixin foo') }
  }
}

export default {
  mixins: [mixin],
  data() {
    return { msg: 'component' }  // 覆盖mixin的msg
  },
  created() {
    console.log('component created')
    // 输出顺序：mixin created → component created
  },
  methods: {
    foo() { console.log('component foo') }  // 覆盖mixin的foo
  }
}
```

### Mixin的缺点

#### 1. 命名冲突

多个Mixin可能定义同名属性或方法。

```javascript
const mixinA = { methods: { handleClick() {} } }
const mixinB = { methods: { handleClick() {} } }
// 后者会覆盖前者
```

#### 2. 数据来源不明确

组件中使用的属性可能来自Mixin，难以追踪。

#### 3. 隐式依赖

Mixin之间可能存在隐式依赖关系。

### Vue 3的替代方案：Composition API

```vue
<script setup>
// composables/useCommon.js
import { ref } from 'vue'

export function useCommon() {
  const loading = ref(false)
  const error = ref(null)

  const showLoading = () => loading.value = true
  const hideLoading = () => loading.value = false
  const handleError = (err) => {
    error.value = err.message
    console.error(err)
  }

  return { loading, error, showLoading, hideLoading, handleError }
}

// composables/usePagination.js
import { ref } from 'vue'

export function usePagination() {
  const page = ref(1)
  const pageSize = ref(10)
  const total = ref(0)

  const setPage = (p) => { page.value = p }
  const setPageSize = (s) => { pageSize.value = s; page.value = 1 }

  return { page, pageSize, total, setPage, setPageSize }
}

// 组件中使用
import { useCommon } from './composables/useCommon'
import { usePagination } from './composables/usePagination'

const { loading, showLoading, hideLoading } = useCommon()
const { page, pageSize, setPage } = usePagination()
</script>
```

**Composition API的优势：**
- 明确的依赖关系
- 更好的类型推断
- 逻辑复用更清晰
- 没有命名冲突问题