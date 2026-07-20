---
sidebar_position: 1
title: JavaScript（面试要点）
---

# JavaScript 面试要点

## 目录

- [ES6有哪些新特性？](#1-es6有哪些新特性)
- [JS 加载与 script 标签策略](#2-js-加载与-script-标签策略)
- [JS数据类型有哪些？](#3-js数据类型有哪些)
- [JS数据类型考题](#4-js数据类型考题)
- [null和undefined有什么区别？](#5-null和undefined有什么区别)
- [浮点数精度问题](#6-浮点数精度问题)
- [JS事件循环机制是怎样的？](#7-js事件循环机制是怎样的)
- [JS微任务和宏任务有什么区别？](#8-js微任务和宏任务有什么区别)
- [作用域与作用域链](#9-作用域与作用域链)
- [this指向问题](#10-this指向问题)
- [JS判断变量是不是数组有哪些方法？](#11-js判断变量是不是数组有哪些方法)
- [slice、splice有什么区别？是否会改变原数组？](#12-slicesplice有什么区别是否会改变原数组)
- [数组(array)有哪些方法？](#13-数组array有哪些方法)
- [数组扁平化有哪些方法？](#14-数组扁平化有哪些方法)
- [字符串有哪些方法？](#15-字符串有哪些方法)
- [防抖和节流的区别及实现](#16-防抖和节流的区别及实现)
- [Ajax、Fetch和Axios的区别](#17-ajaxfetch和axios的区别)
- [深拷贝和浅拷贝的区别及实现](#18-深拷贝和浅拷贝的区别及实现)
- [原型和原型链](#19-原型和原型链)
- [闭包的概念和应用场景](#20-闭包的概念和应用场景)
- [JS数组去重有哪些方法？](#21-js数组去重有哪些方法)
- [new操作符具体做了什么？](#22-new操作符具体做了什么)
- [内存泄漏的原因有哪些？](#23-内存泄漏的原因有哪些)
- [JS 垃圾回收机制（GC）](#24-js-垃圾回收机制gc)
- [JS继承有哪些方式？](#25-js继承有哪些方式)
- [call、apply、bind有什么区别？](#26-callapplybind有什么区别)
- [手写 call / apply / bind](#27-手写-call--apply--bind)
- [sort背后原理是什么？](#28-sort背后原理是什么)
- [var/let/const、提升与暂时性死区](#29-varletconst提升与暂时性死区)
- [map与forEach有什么区别？](#30-map与foreach有什么区别)
- [CommonJS 与 ES Module 的区别](#31-commonjs-与-es-module-的区别)
- [如何将对象进行合并？](#32-如何将对象进行合并)
- [Promise函数是什么？](#33-promise函数是什么)
- [回调地狱是什么？](#34-回调地狱是什么)
- [如何用原生JS实现事件委托？](#35-如何用原生js实现事件委托)
- [判断数组是否为空有哪些方法？](#36-判断数组是否为空有哪些方法)
- [for in 和for of有什么区别？](#37-for-in-和for-of有什么区别)
- [判断空对象有哪些方法？](#38-判断空对象有哪些方法)
- [async/await 和 Promise 有什么区别？](#39-asyncawait-和-promise-有什么区别)
- [虚拟DOM是什么？](#40-虚拟dom是什么)
- [diff 算法是什么？](#41-diff-算法是什么)
- [ES6 Proxy是什么？有什么作用？](#42-es6-proxy是什么有什么作用)
- [ES6 Reflect是什么？有什么作用？](#43-es6-reflect是什么有什么作用)
- [函数式编程了解多少？](#44-函数式编程了解多少)
- [一直在window上面挂东西是否有什么风险？](#45-一直在window上面挂东西是否有什么风险)
- [手写实现 Promise.all](#46-手写实现-promiseall)
- [手写 Promise.race / Promise.any / Promise.finally](#47-手写-promiserace--promiseany--promisefinally)
- [手写实现虚拟列表](#48-手写实现虚拟列表)
- [移动端上拉加载、下拉刷新实现](#49-移动端上拉加载下拉刷新实现)
- [判断 DOM 元素是否在可视区域](#50-判断-dom-元素是否在可视区域)
- [localStorage 设置失效时间](#51-localstorage-设置失效时间)
- [大对象深度对比实现](#52-大对象深度对比实现)
- [JS 执行 100 万任务不卡顿](#53-js-执行-100-万任务不卡顿)
- [documentFragment API 是什么，有哪些使用场景？](#54-documentfragment-api-是什么有哪些使用场景)
- [V8 里面的 JIT 是什么？](#55-v8-里面的-jit-是什么)
- [在 JS 中，如何解决递归导致栈溢出问题？](#56-在-js-中如何解决递归导致栈溢出问题)
- [HTML5 的离线存储如何工作？](#57-html5-的离线存储如何工作)
- [JS 超过 Number 最大值的数怎么处理？](#58-js-超过-number-最大值的数怎么处理)

## 1. ES6有哪些新特性？

### 1. let 和 const

- **let**：声明块级作用域变量（仅在 `{}` 内有效），不可重复声明。
- **const**：声明常量（不可重新赋值，但对象属性可修改），同样具备块级作用域。
- 二者不存在变量提升导致的 `undefined` 预初始化问题，声明前访问会进入暂时性死区（详见第 29 节）。

### 2. 箭头函数（Arrow Functions）

**语法形式：**

```javascript
// 无参数
const fn = () => console.log('Hello');

// 单参数
const fn = x => x * 2;

// 多参数
const fn = (x, y) => x + y;

// 函数体多行
const fn = (x, y) => {
  const result = x + y;
  return result;
};

// 返回对象字面量
const fn = () => ({ name: 'John', age: 30 });
```

**核心特点：**

- 省略 `function` 关键字，参数与函数体之间用 `=>` 连接。
- 没有自己的 `this`，继承外层作用域（词法作用域）的 `this`。
- 没有 `arguments` 对象，可用剩余参数 `...args` 替代。
- 不能用作构造函数，没有 `prototype` 属性。
- 不能作为生成器函数使用（不能使用 `yield`）。

**与普通函数的对比：**

| 特性 | 普通函数 | 箭头函数 |
|------|----------|----------|
| 语法 | `function name() {}` | `() => {}` |
| this 绑定 | 动态绑定（调用时决定） | 词法绑定（定义时决定） |
| arguments 对象 | 有 | 无（可用剩余参数替代） |
| 构造函数 | 可作为构造函数使用 | 不能作为构造函数使用 |
| prototype 属性 | 有 | 无 |
| yield 关键字 | 可作为生成器函数使用 | 不能作为生成器函数使用 |
| 适用场景 | 动态 this、构造函数、生成器函数 | 固定 this、简洁语法、回调函数 |

**详细对比示例：**

```javascript
// 普通函数中 this 指向调用时的上下文
function Person() {
  this.age = 0;
  setInterval(function growUp() {
    // 普通函数中 this 指向全局对象（严格模式下为 undefined）
    this.age++; // 这里的 this 不是 Person 的实例
  }, 1000);
}

// 箭头函数继承外层作用域的 this
function Person() {
  this.age = 0;
  setInterval(() => {
    this.age++; // 这里的 this 是 Person 的实例
  }, 1000);
}

// arguments 对象的区别
function regularFunction() {
  console.log(arguments); // Arguments 对象
}

const arrowFunction = () => {
  // console.log(arguments); // ReferenceError: arguments is not defined
  // 可以使用剩余参数替代
};

regularFunction(1, 2, 3); // Arguments(3) [1, 2, 3]

// 构造函数区别
function RegularFunction(name) {
  this.name = name;
}

const ArrowFunction = (name) => {
  this.name = name;
};

const person1 = new RegularFunction('John'); // 正常工作
// const person2 = new ArrowFunction('Jane'); // TypeError: ArrowFunction is not a constructor

// prototype 属性区别
console.log(RegularFunction.prototype); // { constructor: ƒ RegularFunction() }
console.log(ArrowFunction.prototype); // undefined
```

### 3. 模板字符串（Template Literals）如何使用？

**特点：**

- 用反引号 ` 包裹字符串。
- 通过 `${variable}` 嵌入变量或表达式。
- 支持多行字符串（保留换行符）。

**使用示例：**
```javascript
const name = 'Alice';
const age = 25;

// 基本用法
const greeting = `Hello, ${name}!`;

// 多行字符串
const multiline = `
  Hello ${name},
  You are ${age} years old.
`;

// 表达式嵌入
const result = `The sum is ${2 + 3}`;

// 嵌套模板字符串
const message = `Welcome ${name}, today is ${new Date().toLocaleDateString()}`;
```

### 4. 解构赋值（Destructuring）如何使用？

**特点：**

- 数组解构：按位置匹配。
- 对象解构：按属性名匹配。
- 支持默认值和重命名。

**数组解构：**
```javascript
const [first, second, third] = [1, 2, 3];
const [a, , c] = [1, 2, 3]; // 跳过第二个元素
const [x, y, ...rest] = [1, 2, 3, 4, 5]; // rest = [3, 4, 5]
```

**对象解构：**
```javascript
const person = { name: 'John', age: 30, city: 'New York' };
const { name, age } = person;
const { name: fullName, age: years } = person; // 重命名
const { country = 'USA' } = person; // 默认值
```

### 5. 默认参数（Default Parameters）如何使用？

**特点：**

- 当参数未传递或传递undefined时使用默认值
- 默认参数在函数声明时求值

```javascript
function greet(name = 'Guest', greeting = 'Hello') {
  return `${greeting}, ${name}!`;
}

// 调用
greet(); // "Hello, Guest!"
greet('Alice'); // "Hello, Alice!"
greet('Bob', 'Hi'); // "Hi, Bob!"
```

### 6. 展开运算符和剩余参数如何使用？

**展开运算符（...）：**

- 将数组或对象展开为单独的元素。
- 用于函数调用、数组拼接、对象合并等。

```javascript
// 数组展开
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// 对象展开
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 }; // { a: 1, b: 2, c: 3, d: 4 }

// 函数调用
Math.max(...[1, 2, 3]); // 等同于 Math.max(1, 2, 3)
```

**剩余参数（...args）：**

- 将多个参数收集为一个数组。
- 只能作为最后一个参数

```javascript
function sum(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}

sum(1, 2, 3, 4); // numbers = [1, 2, 3, 4]
```

### 7. 类（Classes）如何使用？

**特点：**

- 支持 constructor、方法、继承（extends）等。
- 更接近传统面向对象语言的语法

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  
  speak() {
    console.log(`${this.name} barks.`);
  }
}
```

### 8. 模块化（Modules）如何使用？

**特点：**

- export：导出变量、函数或类。
- import：导入其他模块的内容。
- 支持默认导出和命名导出

```javascript
// math.js
export const PI = 3.14159;
export function add(a, b) {
  return a + b;
}
export default function subtract(a, b) {
  return a - b;
}

// main.js
import subtract, { PI, add } from './math.js';
import * as math from './math.js'; // 导入所有导出内容
```

### 9. Promise 和 async/await 如何使用？

**Promise：**

- 解决异步回调地狱问题。
- 支持链式调用（.then()、.catch()）。
- 三种状态：pending、fulfilled、rejected

```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Success!');
  }, 1000);
});

promise
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

**async/await 如何使用？**

- 基于 Promise 的语法糖，使异步代码更像同步代码。
- async函数返回Promise
- await只能在async函数中使用

```javascript
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### 10. Set 和 Map 有什么特点？

**Set：**

- 类似数组，但成员唯一（无重复值）。
- 可以存储任何类型的唯一值

```javascript
const set = new Set([1, 2, 3, 3, 4]);
console.log(set); // Set { 1, 2, 3, 4 }

set.add(5);
set.delete(2);
console.log(set.has(3)); // true
```

**Map：**

- 键值对集合，键可以是任意类型（如对象、函数）。
- 保持插入顺序

```javascript
const map = new Map();
map.set('name', 'John');
map.set(1, 'number key');
map.set({}, 'object key');

console.log(map.get('name')); // John
console.log(map.size); // 3
```

### 11. 迭代器和生成器有什么区别？

**迭代器：**

- 提供 next() 方法，按需生成值。
- 返回 `{ value, done }` 对象

```javascript
const iterator = {
  [Symbol.iterator]() {
    let step = 0;
    const steps = ['step1', 'step2', 'step3'];
    return {
      next() {
        if (step < steps.length) {
          return { value: steps[step++], done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
};
```

**生成器：**

- 通过 function* 定义，用 yield 暂停和恢复执行。
- 自动实现迭代器接口

```javascript
function* generator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = generator();
console.log(gen.next()); // { value: 1, done: false }
```

### 12. Symbol 有什么作用？

**特点：**

- **唯一性**：每个 Symbol 都是唯一的，即使描述相同（如 Symbol('foo') 和 Symbol('foo') 不相等）。
- **不可枚举**：Symbol 作为对象属性时，默认不会出现在 for...in、Object.keys() 或 JSON.stringify() 中。
- **原始类型**：Symbol 是基本数据类型（如 number、string），不是对象。

| 场景 | 示例 |
|------|------|
| 避免属性名冲突 | 第三方库的私有属性（如 `[Symbol('private')]`） |
| 定义常量 | 用 Symbol 替代字符串常量（如 COLOR_RED = Symbol('red')） |
| 实现迭代器 | 自定义对象的迭代行为（如 `[Symbol.iterator]`） |
| 扩展内置对象行为 | 通过内置 Symbol（如 Symbol.hasInstance）自定义语言行为 |
| 模拟私有属性 | 在 ES2022 之前，用 Symbol 模拟私有属性（现推荐使用 # 私有字段） |

## 2. JS 加载与 script 标签策略

### 1. script 标签位置：head 与 body 末尾

将脚本放在 `<head>` 中（默认加载）会在 HTML 解析到脚本时立即下载并执行，可能阻塞后续 DOM 解析和渲染；放在 `<body>` 末尾则能先渲染页面内容，再执行脚本，避免白屏。

```html
<!-- 放在 head：可能阻塞解析 -->
<head>
  <script src="app.js"></script>
</head>

<!-- 放在 body 末尾：推荐常规做法 -->
<body>
  <div id="app"></div>
  <script src="app.js"></script>
</body>
```

| 特性 | head（默认） | body 末尾 | async | defer |
|------|-------------|-----------|-------|-------|
| 下载时机 | 页面解析时 | 页面解析时 | 并行下载 | 并行下载 |
| 执行时机 | 立即执行，阻塞解析 | 页面解析完成后 | 下载完立即执行 | DOM 解析完成后 |
| 执行顺序 | 按顺序 | 按顺序 | 不保证顺序 | 按顺序 |
| DOM 可用 | 可能不可用 | 可用 | 可能不可用 | 可用 |
| 适用场景 | 关键脚本 | 普通脚本 | 独立脚本 | 依赖 DOM 的脚本 |

### 2. 内联脚本与外部脚本

**内联脚本（Inline Script）**：直接在 HTML 中编写 JavaScript 代码。

```html
<script>
  console.log('Hello');
</script>
```

- 优点：简单直接，适合小型脚本或快速测试。
- 缺点：代码与 HTML 混合，不利于复用和缓存。

**外部脚本（External Script）**：通过 `src` 属性引入外部文件。

```html
<script src="app.js"></script>
```

- 优点：代码与 HTML 分离，利于缓存和复用。
- 缺点：需要额外的 HTTP 请求（可被缓存抵消）。

### 3. async 和 defer 属性

**async**：脚本异步加载，下载完成后立即执行，不保证执行顺序。

```html
<script async src="analytics.js"></script>
```

**defer**：脚本异步加载，但在 HTML 解析完成后按出现顺序执行。

```html
<script defer src="app.js"></script>
```

- 普通脚本建议放在 `body` 末尾或使用 `defer`。
- 独立脚本（如统计代码）适合使用 `async`。

### 4. 动态脚本加载

通过 JavaScript 动态创建 `<script>` 标签，按需加载脚本。

```javascript
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// 使用
loadScript('/path/to/script.js')
  .then(() => console.log('Script loaded'))
  .catch(err => console.error('Failed to load script', err));
```

### 5. 模块化脚本（type="module"）

ES6 模块通过 `type="module"` 引入，默认延迟加载（类似 `defer`）。

```html
<script type="module" src="app.js"></script>
```

- 支持 `import` / `export` 语法。
- 模块文件需通过 HTTP 服务器访问（不能直接用 `file://` 协议）。
- 兼容性：现代浏览器原生支持。

### 6. 代码分割和动态导入

使用 Webpack、Rollup 等工具将代码分割为多个 chunk，通过 `import()` 按需加载。

```javascript
// 动态导入
async function loadModule() {
  const { default: module } = await import('./heavy-module.js');
  module.doSomething();
}

// 路由级别的代码分割
const Home = () => import('./Home.vue');
const About = () => import('./About.vue');
```

### 7. Intersection Observer 与懒加载

结合动态脚本加载实现滚动到视口内再加载：

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadScript('lazy-script.js');
      observer.unobserve(entry.target);
    }
  });
});

observer.observe(document.querySelector('#lazy-section'));
```

### 8. 引入方式对比与最佳实践

| 方式 | 优点 | 缺点 | 适用场景 |
|------|------|------|----------|
| 内联脚本 | 简单直接 | 难以维护，不利于复用 | 快速测试或小型脚本 |
| 外部脚本 | 易于维护和复用 | 需要额外 HTTP 请求 | 大多数情况 |
| async | 不阻塞页面渲染 | 执行顺序不确定 | 独立脚本（如统计） |
| defer | 不阻塞页面渲染，按顺序执行 | 仅适用于外部脚本 | 依赖 DOM 的脚本 |
| 动态加载 | 灵活控制加载时机 | 实现稍复杂 | 按需加载 |
| 模块化 | 代码组织清晰 | 需要现代浏览器支持 | 现代 Web 应用 |

```html
<!DOCTYPE html>
<html>
<head>
  <!-- 1. 预加载关键资源 -->
  <link rel="preload" href="critical.js" as="script">

  <!-- 2. 异步加载非关键脚本 -->
  <script async src="analytics.js"></script>

  <!-- 3. 延迟执行依赖 DOM 的脚本 -->
  <script defer src="app.js"></script>

  <!-- 4. 行内关键 CSS -->
  <style>
    /* 首屏关键样式 */
  </style>
</head>
<body>
  <!-- 页面内容 -->

  <!-- 5. 兼容性处理 -->
  <script nomodule src="legacy-bundle.js"></script>
  <script type="module" src="modern-bundle.js"></script>
</body>
</html>
```

## 3. JS数据类型有哪些？

### 1. 原始类型（Primitive Types）

| 类型 | 描述 |
|------|------|
| Number | 整数或浮点数（包括特殊值 Infinity、-Infinity 和 NaN） |
| String | 文本数据，用单引号 ''、双引号 "" 或反引号 ` 包裹 |
| Boolean | 逻辑值，只有 true 或 false |
| Null | 表示空值或不存在的对象，类型为 object（历史遗留问题） |
| Undefined | 未赋值的变量默认值为 undefined，或函数未返回时默认返回 undefined |
| Symbol | ES6 新增，表示唯一的标识符，常用于对象属性的键 |
| BigInt | ES2020 新增，表示任意精度的整数（解决 Number 的精度限制） |

### 2. 引用类型（Reference Types）

| 类型 | 描述 |
|------|------|
| Object | 键值对的集合，是所有引用类型的基类（包括普通对象、数组、函数等） |
| Array | 有序的列表，本质是对象（键为数字索引） |
| Function | 可执行的对象，本质是对象（有 call、apply 等方法） |
| Date | 表示日期和时间的对象 |
| RegExp | 正则表达式对象，用于匹配字符串 |
| Map | ES6 新增，键值对集合，键可以是任意类型 |
| Set | ES6 新增，唯一值的集合 |

### 3. 类型检测方法有哪些？

```javascript
// typeof - 适用于原始类型（null除外）
typeof 123; // "number"
typeof 'hello'; // "string"
typeof true; // "boolean"
typeof undefined; // "undefined"
typeof Symbol(); // "symbol"
typeof BigInt(123); // "bigint"
typeof null; // "object" (历史遗留问题)

// instanceof - 适用于对象类型
[] instanceof Array; // true
{} instanceof Object; // true
new Date() instanceof Date; // true

// Object.prototype.toString.call() - 最准确的方法
Object.prototype.toString.call([]); // "[object Array]"
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
```

### 数据类型详细说明：

```javascript
// Number 类型
const integer = 42;
const float = 3.14;
const infinity = Infinity;
const negativeInfinity = -Infinity;
const notANumber = NaN;

// String 类型
const singleQuote = 'Hello';
const doubleQuote = "World";
const templateLiteral = `Hello ${singleQuote}`;

// Boolean 类型
const isTrue = true;
const isFalse = false;

// Null 和 Undefined
const emptyValue = null;
const uninitializedValue = undefined;
let declaredButUnassigned;

// Symbol 类型
const sym1 = Symbol('description');
const sym2 = Symbol('description');
console.log(sym1 === sym2); // false - 每个 Symbol 都是唯一的

// BigInt 类型
const bigNumber = 1234567890123456789012345678901234567890n;

// Object 类型
const obj = { name: 'John', age: 30 };

// Array 类型
const arr = [1, 2, 3];

// Function 类型
const func = function() { return 'Hello'; };

// Date 类型
const date = new Date();

// RegExp 类型
const regex = /hello/g;

// Map 类型
const map = new Map();
map.set('key', 'value');

// Set 类型
const set = new Set([1, 2, 3, 3]); // Set { 1, 2, 3 }
```

### 类型转换：

```javascript
// 隐式类型转换
console.log(1 + '2'); // '12' (数字转字符串)
console.log('3' - 1); // 2 (字符串转数字)
console.log(true + 1); // 2 (布尔值转数字)

// 显式类型转换
console.log(Number('123')); // 123
console.log(String(123)); // '123'
console.log(Boolean(123)); // true
console.log(parseInt('123.45')); // 123
console.log(parseFloat('123.45')); // 123.45
```

## 4. JS数据类型考题

```javascript
console.log( true + 1 );     			// 2 (布尔值转换为数字)
console.log( 'name'+true );  			// nametrue (字符串拼接)
console.log( undefined + 1 ); 		// NaN (undefined转换为NaN)
console.log( typeof(NaN) );       // number (NaN是Number类型)
console.log( typeof(null) );      // object (历史遗留问题)
console.log( typeof(undefined) ); // undefined (undefined类型)

// 其他经典考题
console.log([] + []); // "" (空数组转换为字符串)
console.log([] + {}); // "[object Object]" (数组+对象)
console.log({} + []); // "[object Object]"（表达式位置 {} 是对象字面量；只有裸语句位置 {} 才被当作空代码块,结果为 0）
console.log(!!"false"); // true (非空字符串转换为true)
console.log(+"100"); // 100 (字符串转换为数字)
```

### 考题解析：

1. **true + 1**：布尔值在数学运算中会被转换为数字，true 转换为 1，所以 1 + 1 = 2。
2. **'name'+true**：字符串与任何值相加都会进行字符串拼接，true 转换为字符串 "true"。
3. **undefined + 1**：undefined 转换为数字时变为 NaN，NaN 与任何数运算结果都是 NaN。
4. **typeof(NaN)**：NaN 是一个特殊的数字值，所以类型是 "number"。
5. **typeof(null)**：这是 JavaScript 的一个历史遗留问题，null 的类型被错误地标记为 "object"。
6. **typeof(undefined)**：undefined 的类型就是 "undefined"。
7. **[] + []**：空数组转换为字符串是空字符串，所以空字符串加空字符串还是空字符串。
8. **[] + {}**：数组转换为字符串是空字符串，对象转换为字符串是 "[object Object]"，所以结果是 "[object Object]"。
9. **{} + []**：在语句位置 `{} + []` 会被解析为空代码块加 `+[]`，结果为 `0`；在表达式位置（如 `console.log({} + [])`）`{}` 是对象字面量，结果通常是 `"[object Object]"`。两者不是同一表达式，不能混为一谈。
10. **!!"false"**：非空字符串转换为布尔值是 true，两次取反还是 true。
11. **+"100"**：一元加号操作符会将字符串转换为数字。

## 5. null和undefined有什么区别？

### 历史背景

1. 作者在设计js的都是先设计的null（为什么设计了null：最初设计js的时候借鉴了java的语言）
2. null会被隐式转换成0，很不容易发现错误。
3. 先有null后有undefined，出来undefined是为了填补之前的坑。

### 具体区别：

- **null**：一个表示"无"的对象（空对象指针），转为数值时为0；
- **undefined**：一个表示"无"的原始值，转为数值时为NaN。

### 用途

- **null 的用途**：显式清空变量、函数参数的默认空值、API 或数据库的空值
- **undefined 的用途**：变量未初始化、函数未返回值、访问不存在的对象属性、函数参数未传递

### 类型检测

```javascript
console.log(typeof null); // "object" (历史遗留问题)
console.log(typeof undefined); // "undefined"
console.log(null === undefined); // false
console.log(null == undefined); // true (类型转换后相等)
console.log(null === null); // true
console.log(undefined === undefined); // true
```

## 6. 浮点数精度问题

### 原因

JavaScript 使用 **IEEE 754 双精度浮点数标准** 表示数字。在二进制中，0.1 和 0.2 都是无限循环小数，存储时会被截断为近似值：

```javascript
console.log(0.1.toFixed(20)); // 0.10000000000000000555
console.log(0.2.toFixed(20)); // 0.20000000000000001110
```

两者相加后得到一个接近但不等于 0.3 的结果：

```javascript
console.log(0.1 + 0.2);        // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false
```

### 解决方案

**1. 使用 toFixed 后转数字**

```javascript
parseFloat((0.1 + 0.2).toFixed(10)); // 0.3
```

**2. 先乘后除（转换为整数运算）**

```javascript
function add(a, b) {
  const factor = Math.pow(10, 10);
  return (a * factor + b * factor) / factor;
}
add(0.1, 0.2); // 0.3
```

**3. 使用第三方库**

```javascript
// decimal.js / big.js / bignumber.js
new Decimal(0.1).plus(0.2).toNumber(); // 0.3
```

**4. ES2021 的 Number.EPSILON**

```javascript
function equal(a, b) {
  return Math.abs(a - b) < Number.EPSILON;
}
equal(0.1 + 0.2, 0.3); // true
```

### 面试要点

- 不是 JavaScript 的 bug，而是浮点数存储的固有限制
- 涉及金额计算时，优先使用整数（分）或专业精度库
- `Number.EPSILON` 适合比较两个浮点数是否"足够接近"

## 7. JS事件循环机制是怎样的？

### 基本概念：JavaScript 运行时环境包含：

1. **调用栈（Call Stack）**：执行同步代码的地方
2. **回调队列（Callback Queue）**：存放异步回调函数的地方
3. **事件循环（Event Loop）**：协调调用栈和回调队列的机制

### 事件循环流程：

1. 执行调用栈中的同步代码
2. 当调用栈为空时，事件循环检查微任务队列
3. 执行所有微任务（Microtasks）
4. 执行一个宏任务（Macrotasks）
5. 重复步骤2-4

### 任务分类：

**宏任务（Macrotasks）：**
- setTimeout/setInterval
- I/O操作
- UI渲染
- script标签
- setImmediate（Node.js）

**微任务（Microtasks）：**
- Promise.then/catch/finally
- queueMicrotask
- MutationObserver
- Object.observe（已废弃）

### 事件循环示例：

```javascript
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

console.log('4');

// 输出顺序：1, 4, 3, 2
// 解释：
// 1. 同步代码 '1' 和 '4' 先执行
// 2. 微任务 Promise.then 回调 '3' 执行
// 3. 宏任务 setTimeout 回调 '2' 执行
```

### 重要注意事项：

1. **微任务优先级高于宏任务**：所有微任务会在下一个宏任务执行前执行完
2. **微任务中添加的微任务也会在当前轮次执行**
3. **浏览器会在每次事件循环后进行 UI 渲染**

## 8. JS微任务和宏任务有什么区别？

事件循环（Event Loop） 是异步编程的核心机制，而微任务和宏任务是事件循环中两种不同的任务类型。

### 1. 事件循环的基本概念

JavaScript 是单线程的，通过事件循环实现异步操作。事件循环的核心流程如下：

- **调用栈（Call Stack）**：执行同步代码，逐行压入栈中，执行完毕后弹出。
- **任务队列（Task Queue）**：存储异步任务（宏任务和微任务），等待调用栈清空后执行。
- **事件循环**：不断检查调用栈是否为空，如果为空，则从任务队列中取出任务执行。

宏任务是事件循环中的"大任务"，每次执行一个宏任务后，会清空微任务队列。

| 特性 | 微任务（Microtask） | 宏任务（Macrotask） |
|------|---------------------|---------------------|
| 执行时机 | 每次宏任务执行完毕后立即执行 | 在微任务队列清空后执行 |
| 优先级 | 高于宏任务 | 低于微任务 |
| 常见类型 | Promise.then()、Promise.catch()、Promise.finally()、queueMicrotask() | setTimeout、setInterval、I/O 操作（如文件读写、网络请求）、UI 渲染（浏览器中） |
| 执行顺序 | 同一宏任务中的微任务按顺序执行 | 宏任务按添加顺序执行 |
| 是否阻塞 UI 渲染 | 微任务队列过长可能导致 UI 渲染延迟 | 宏任务执行后通常会触发 UI 渲染 |

## 9. 作用域与作用域链

JavaScript 中的作用域（Scope）定义了变量和函数的可访问范围。常见作用域类型如下：

| 特性 | 全局作用域 | 函数作用域 | 块级作用域 |
|------|------------|------------|------------|
| 声明方式 | 函数或代码块外部 | 函数内部 | `{}` 代码块内部 |
| 关键字 | `var`、`let`、`const` | `var`（ES5） | `let`、`const`（ES6） |
| 访问范围 | 任何地方 | 函数内部 | 代码块内部 |

- **全局作用域**：在代码最外层声明的变量和函数，可在任何地方访问；浏览器中全局变量会挂载到 `window` 对象。
- **函数作用域**：`var` 声明的变量仅在函数内部有效，函数作用域是嵌套的，内层函数可访问外层函数的变量。
- **块级作用域**：`let` 和 `const` 声明的变量仅在 `{}` 块内有效，`if`、`for`、`while` 等语句的块内变量不会泄漏到外部。
- **词法作用域**：函数的作用域在定义时确定，与调用位置无关。
- **闭包**：函数可以访问并记住其词法作用域，即使外层函数已经执行完毕。

### 1. 作用域链（Scope Chain）

当代码执行时，JavaScript 引擎会创建执行上下文。如果当前作用域找不到某个变量，会沿着作用域链向上层作用域查找，直到全局作用域；若仍找不到，则抛出 `ReferenceError`。

- 每个函数在创建时会保存其外层作用域的引用。
- 变量查找时，先在当前作用域查找，找不到则向上层作用域查找，直到全局作用域。

### 2. 作用域示例

```javascript
// 全局作用域
var globalVar = 'I am global';
let globalLet = 'I am also global';

function outerFunction() {
  // 函数作用域
  var functionVar = 'I am in function scope';

  if (true) {
    // 块级作用域
    var varInBlock = 'I am not really in block scope'; // var 没有块级作用域
    let letInBlock = 'I am in block scope'; // let 有块级作用域
    const constInBlock = 'I am also in block scope'; // const 有块级作用域
  }

  console.log(varInBlock); // 可以访问
  // console.log(letInBlock); // ReferenceError: letInBlock is not defined

  function innerFunction() {
    // 词法作用域 - 可以访问外层作用域的变量
    console.log(globalVar); // I am global
    console.log(functionVar); // I am in function scope
  }

  return innerFunction;
}

const closure = outerFunction();
closure(); // 闭包可以访问其词法作用域
```

## 10. this指向问题

### 1. this 的默认绑定规则

#### 全局上下文

在全局作用域（即不在任何函数内）中，this 指向全局对象：
- 浏览器中：window

#### 函数调用

当函数直接调用时（非方法、非构造函数、非事件处理等），this 指向全局对象（严格模式下为 undefined）

```javascript
function foo() {
  console.log(this); // 浏览器中输出 window 对象
}

foo(); // 直接调用

function strictFoo() {
  'use strict';
  console.log(this); // undefined
}

strictFoo(); // undefined
```

### 2. 隐式绑定（方法调用）

当函数作为对象的方法调用时，this 指向调用该方法的对象

```javascript
const person = {
  name: 'John',
  greet: function() {
    console.log(this.name); // John
  }
};

person.greet(); // this 指向 person 对象
```

### 3. 显式绑定（call、apply、bind）

可以通过 call、apply 或 bind 显式设置 this 的指向。

- **call 和 apply**: 立即调用函数，并指定 this 的值
- **bind**: 返回一个新函数，永久绑定 this 的值

```javascript
const person1 = { name: 'John' };
const person2 = { name: 'Jane' };

function introduce() {
  console.log(`Hello, I'm ${this.name}`);
}

// call
introduce.call(person1); // Hello, I'm John

// apply
introduce.apply(person2); // Hello, I'm Jane

// bind
const boundIntroduce = introduce.bind(person1);
boundIntroduce(); // Hello, I'm John
```

### 4. new 绑定（构造函数调用）

当函数通过 new 调用时（作为构造函数），this 指向新创建的实例对象

```javascript
function Person(name) {
  this.name = name;
  console.log(this); // 指向新创建的实例
}

const person = new Person('John'); // this 指向新创建的 person 实例
```

### 5. 箭头函数中的 this

箭头函数没有自己的 this，它的 this 继承自外层作用域（词法作用域）

```javascript
const person = {
  name: 'John',
  greet: function() {
    // 普通函数中的 this 指向 person 对象
    console.log(this.name); // John
    
    // 箭头函数中的 this 继承自外层作用域
    const arrowFunc = () => {
      console.log(this.name); // John
    };
    
    arrowFunc();
  }
};

person.greet();
```

### 6. 事件处理函数

在 DOM 事件处理函数中，this 指向触发事件的元素

```javascript
const button = document.getElementById('myButton');

button.addEventListener('click', function() {
  console.log(this); // 指向 button 元素
});
```

## 11. JS判断变量是不是数组有哪些方法？

### 1. Array.isArray()（推荐）：

```javascript
const arr = [1, 2, 3];
console.log(Array.isArray(arr)); // true
console.log(Array.isArray({})); // false
```

### 2. instanceof 操作符：检测对象的原型链中是否存在 Array.prototype。

```javascript
const arr = [1, 2, 3];
console.log(arr instanceof Array); // true
console.log({} instanceof Array); // false
```

### 3. Object.prototype.toString.call()：通过调用对象的 toString 方法，返回 "[object Array]"。

```javascript
const arr = [1, 2, 3];
console.log(Object.prototype.toString.call(arr) === '[object Array]'); // true
console.log(Object.prototype.toString.call({}) === '[object Array]'); // false
```

### 4. constructor 属性（不推荐）：通过检查变量的 constructor 属性是否为 Array。

```javascript
const arr = [1, 2, 3];
console.log(arr.constructor === Array); // true
console.log({}.constructor === Array); // false
```

### 5. toString 方法：通过 Object.prototype.toString.call() 检查变量类型。

```javascript
const arr = [1, 2, 3];
console.log(Object.prototype.toString.call(arr) === '[object Array]'); // true
console.log(Object.prototype.toString.call({}) === '[object Array]'); // false
```

## 12. slice、splice有什么区别？是否会改变原数组？

### 1. slice()

**作用**

- 返回数组的浅拷贝部分（不修改原数组）。
- 用于提取数组中的一部分元素，生成一个新数组。

```javascript
array.slice(startIndex, endIndex);
```

- startIndex（可选）：起始索引（包含），默认为 0。
- endIndex（可选）：结束索引（不包含），默认为数组长度。

**特点**

- 不修改原数组。
- 支持负数索引（从末尾开始计算，如 -1 表示最后一个元素）。

### 2. splice()

**作用**

- 修改原数组，用于添加、删除或替换数组中的元素。
- 返回被删除的元素组成的新数组。

```javascript
array.splice(startIndex, deleteCount, item1, item2, ...);
```

- startIndex：起始索引（必须）。
- deleteCount（可选）：要删除的元素数量。若为 0，则不删除。
- item1, item2, ...（可选）：要插入的元素。

**特点**

- 直接修改原数组。
- 支持插入、删除或替换操作。
- 返回被删除的元素（若未删除则返回空数组）。

## 13. 数组(array)有哪些方法？

### 1. 创建数组

- Array() 构造函数
- Array.of() - 创建包含参数的数组
- Array.from() - 从类数组或可迭代对象创建数组

```javascript
// Array() 构造函数
const arr1 = new Array(3); // [empty × 3]
const arr2 = new Array(1, 2, 3); // [1, 2, 3]

// Array.of()
const arr3 = Array.of(3); // [3]
const arr4 = Array.of(1, 2, 3); // [1, 2, 3]

// Array.from()
const arr5 = Array.from('hello'); // ['h', 'e', 'l', 'l', 'o']
const arr6 = Array.from({length: 3}, (_, i) => i); // [0, 1, 2]
```

### 2. 修改数组

- push() - 在末尾添加元素
- pop() - 移除并返回最后一个元素
- unshift() - 在开头添加元素
- shift() - 移除并返回第一个元素
- splice() - 添加/删除元素
- fill() - 填充数组
- copyWithin() - 复制数组部分到另一位置

```javascript
const arr = [1, 2, 3, 4, 5];

// push 和 pop
arr.push(6); // [1, 2, 3, 4, 5, 6]
const last = arr.pop(); // 6, arr is now [1, 2, 3, 4, 5]

// unshift 和 shift
arr.unshift(0); // [0, 1, 2, 3, 4, 5]
const first = arr.shift(); // 0, arr is now [1, 2, 3, 4, 5]

// splice
arr.splice(2, 1); // 删除索引为2的元素, 返回 [3], arr is now [1, 2, 4, 5]
arr.splice(2, 0, 3); // 在索引为2的位置插入3, arr is now [1, 2, 3, 4, 5]

// fill
const filledArr = new Array(5).fill(0); // [0, 0, 0, 0, 0]

// copyWithin
const arr2 = [1, 2, 3, 4, 5];
arr2.copyWithin(0, 3); // [4, 5, 3, 4, 5]
```

### 3. 遍历数组

- forEach() - 对每个元素执行函数
- map() - 创建新数组，包含原数组元素调用函数的结果
- filter() - 创建新数组，包含通过测试的元素
- reduce() / reduceRight() - 对数组元素执行累加器函数
- every() - 检查是否所有元素通过测试
- some() - 检查是否至少一个元素通过测试
- find() - 返回第一个通过测试的元素
- findIndex() - 返回第一个通过测试的元素的索引

```javascript
const numbers = [1, 2, 3, 4, 5];

// forEach
numbers.forEach(n => console.log(n));

// map
const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]

// filter
const evens = numbers.filter(n => n % 2 === 0); // [2, 4]

// reduce
const sum = numbers.reduce((acc, n) => acc + n, 0); // 15

// every
const allPositive = numbers.every(n => n > 0); // true

// some
const hasEven = numbers.some(n => n % 2 === 0); // true

// find
const firstEven = numbers.find(n => n % 2 === 0); // 2

// findIndex
const firstEvenIndex = numbers.findIndex(n => n % 2 === 0); // 1
```

### 4. 搜索数组

- indexOf() - 返回首次出现指定值的索引
- lastIndexOf() - 返回最后一次出现指定值的索引
- includes() - 检查数组是否包含指定值
- flat() - 创建扁平化数组
- flatMap() - 先映射再扁平化

```javascript
const arr = [1, 2, 3, 2, 4];

// indexOf 和 lastIndexOf
console.log(arr.indexOf(2)); // 1
console.log(arr.lastIndexOf(2)); // 3

// includes
console.log(arr.includes(3)); // true

// flat
const nested = [1, [2, 3], [4, [5, 6]]];
console.log(nested.flat()); // [1, 2, 3, 4, [5, 6]]
console.log(nested.flat(2)); // [1, 2, 3, 4, 5, 6]

// flatMap
const sentences = ['Hello world', 'How are you'];
const words = sentences.flatMap(sentence => sentence.split(' '));
// ['Hello', 'world', 'How', 'are', 'you']
```

### 5. 数组排序

- sort() - 对数组元素排序
- reverse() - 反转数组顺序

```javascript
const numbers = [3, 1, 4, 1, 5, 9];

// sort - 默认按字符串排序
numbers.sort(); // [1, 1, 3, 4, 5, 9]

// 数字排序需要提供比较函数
numbers.sort((a, b) => a - b); // [1, 1, 3, 4, 5, 9]
numbers.sort((a, b) => b - a); // [9, 5, 4, 3, 1, 1]

// reverse
numbers.reverse(); // [1, 1, 3, 4, 5, 9] -> [9, 5, 4, 3, 1, 1]
```

### 6. 数组转换

- join() - 将数组元素连接为字符串
- toString() - 返回数组的字符串表示
- toLocaleString() - 返回本地化的字符串表示

```javascript
const arr = [1, 2, 3];

// join
console.log(arr.join('-')); // '1-2-3'
console.log(arr.join()); // '1,2,3' (默认用逗号分隔)

// toString
console.log(arr.toString()); // '1,2,3'

// toLocaleString
const dates = [new Date('2023-01-01'), new Date('2023-12-31')];
console.log(dates.toLocaleString()); // 本地化的时间字符串
```

### 7. 数组信息

- length - 获取数组长度
- concat() - 合并数组
- slice() - 返回数组片段

```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// length
console.log(arr1.length); // 3

// concat
const combined = arr1.concat(arr2); // [1, 2, 3, 4, 5, 6]

// slice
const part = arr1.slice(1, 3); // [2, 3] (不包括索引3)
```

### 8. 其他方法

- `Array.isArray()` - 检查是否为数组
- `Array.of()` - 创建包含参数的数组
- `Array.from()` - 从类数组或可迭代对象创建数组
- `arr.at(index)` - 支持负索引（ES2022）

```javascript
// isArray
console.log(Array.isArray([1, 2, 3])); // true
console.log(Array.isArray({})); // false
```

## 14. 数组扁平化有哪些方法？

数组扁平化（Array Flattening）是指将一个多维数组（嵌套数组）转换为一个一维数组的过程。

### 为什么需要数组扁平化？

- 简化数据操作：多维数组可能增加遍历、查询或处理的复杂度。
- 统一数据格式：某些场景（如渲染列表、数据处理）需要一维数组作为输入。
- 兼容性需求：某些 API 或库可能只接受一维数组。

### 实现：

### 1.使用 Array.prototype.flat()（ES2019+）：flat() 是最简单的方法，直接返回一个扁平化后的新数组。

```javascript
const arr = [1, [2, [3, 4]], 5];
const flattened = arr.flat(Infinity); // Infinity 表示无限层嵌套
console.log(flattened); // [1, 2, 3, 4, 5]
```

### 2.使用递归函数：手动实现递归逻辑，适用于不支持 flat() 的环境（如旧版浏览器）。

```javascript
function flattenArray(arr) {
  let result = [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      result = result.concat(flattenArray(item)); // 递归处理子数组
    } else {
      result.push(item);
    }
  }
  return result;
}
const arr = [1, [2, [3, 4]], 5];
console.log(flattenArray(arr)); // [1, 2, 3, 4, 5]
```

### 3.使用 reduce() 和递归：结合 reduce() 和递归实现扁平化。

```javascript
function flattenArray(arr) {
  return arr.reduce((acc, val) => 
    Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val), 
    []
  );
}
const arr = [1, [2, [3, 4]], 5];
console.log(flattenArray(arr)); // [1, 2, 3, 4, 5]
```

### 4.使用 toString() + split()（仅适用于数字或字符串数组）：将数组转换为字符串，再分割为一维数组（注意：会丢失数据类型信息）。

```javascript
const arr = [1, [2, [3, 4]], 5];
const flattened = arr.toString().split(',').map(Number); // 转为数字数组
console.log(flattened); // [1, 2, 3, 4, 5]
```

### 5.使用 Generator 函数（ES6+）：通过生成器函数实现惰性扁平化（按需生成扁平化后的元素）。

```javascript
function* flattenGenerator(arr) {
  for (const item of arr) {
    if (Array.isArray(item)) {
      yield* flattenGenerator(item); // 递归生成子数组元素
    } else {
      yield item;
    }
  }
}
const arr = [1, [2, [3, 4]], 5];
const flattened = [...flattenGenerator(arr)]; // 转换为数组
console.log(flattened); // [1, 2, 3, 4, 5]
```

## 15. 字符串有哪些方法？

### 1. 创建与基本操作

- 长度获取：str.length - 返回字符串长度
- 字符串连接：str1 + str2 或 str1.concat(str2)
- 字符串复制：str.repeat(n) (JavaScript)

### 2. 查找与搜索

**查找子串：**

- str.indexOf(substr) - 返回子串首次出现的索引，未找到返回-1
- str.lastIndexOf(substr) - 返回子串最后出现的索引，未找到返回-1
- str.includes(substr) (JS) - 返回布尔值

**查找字符：**

- str.indexOf(char) - 返回字符首次出现的索引
- 最后出现位置：str.lastIndexOf(substr)

**检查开头/结尾：**

- str.startsWith(prefix)
- str.endsWith(suffix)

### 3. 截取与分割

**截取子串：**

- `str.slice(start, end)` - 截取子串

**分割字符串：**

- `str.split(delimiter)` - 按分隔符分割为数组
- `array.join(separator)` - 将数组元素连接为字符串

### 4. 修改与转换

**大小写转换：**

- str.toUpperCase() / str.toLowerCase()
- str.charAt(0).toUpperCase() + str.slice(1) - 首字母大写

**去除空白：**

- str.trim() - 去除两端空白
- str.trimStart(), str.trimEnd() - 分别去除左右空白

**替换内容：**

- str.replace(old, new)
- str.replaceAll(old, new) (JS)

**填充字符串：**

- str.padStart(length, padStr)
- str.padEnd(length, padStr)

### 5. 格式化与模板

**字符串格式化：**

- 模板字符串 `` `Hello ${name}` `` - 嵌入变量和表达式

**数字格式化：**

- toFixed(digits) - 固定小数位数
- toPrecision(digits) - 精确位数

### 6. 其他实用方法

**检查字符类型：**

- /^[a-zA-Z]+$/.test(str) - 是否全是字母
- /^[0-9]+$/.test(str) - 是否全是数字
- /^[a-zA-Z0-9]+$/.test(str) - 是否全是字母或数字

**使用字符串方法检查（不使用正则表达式）：**

```javascript
// 检查字符串是否全是字母
str.split('').every((char) => (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z'))

// 检查字符串是否全是数字
str.split('').every((char) => char >= '0' && char <= '9')

// 检查字符串是否全是字母或数字
str.split('').every((char) => (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || (char >= '0' && char <= '9'))

// 检查字符串是否不是数字
const str = "Hello";
console.log(isNaN(str)); // true - "Hello" 不是数字
console.log(!isNaN(parseFloat(str))); // false - parseFloat("Hello") 返回 NaN
console.log(Number.isInteger(Number(str))); // false - Number("Hello") 返回 NaN
```

**说明：**
- 使用 `str.split('').every()` 结合字符范围检查来验证字符串是否全是字母
- 使用 `str.split('').every()` 结合字符范围检查来验证字符串是否全是数字
- 使用 `str.split('').every()` 结合字符范围检查来验证字符串是否全是字母或数字
- 使用 `isNaN()` 函数检查字符串是否不是数字（注意：空字符串和空白字符会返回 false）
- 使用 `!isNaN(parseFloat(str))` 检查字符串是否是数字
- 使用 `Number.isInteger(Number(str))` 检查字符串是否是整数

**编码转换：**

- `encodeURIComponent(str)` - URL 编码
- `decodeURIComponent(str)` - URL 解码

**字符串原生编码方法：**

- `str.charCodeAt(index)` - 获取指定位置字符的 UTF-16 码元（遇代理对只返回高半部分）
- `String.fromCharCode(num1, ..., numN)` - 根据 Unicode 编码返回字符串
- `str.codePointAt(pos)` - 获取指定位置字符的 Unicode 码点（能正确处理代理对，可能 > 0xFFFF）
- `String.fromCodePoint(codePoint1, ..., codePointN)` - 根据码点返回字符串

**字符串比较：**

- 直接使用比较运算符（`==`、`!=`、`>`、`<` 等）
- `localeCompare()` 方法进行本地化比较

## 16. 防抖和节流的区别及实现

防抖（Debounce）和节流（Throttle）都是用于控制函数执行频率的技术，常用于优化高频事件（如滚动、输入、窗口调整等）的性能。

### 防抖（Debounce）

**定义**：在事件触发后，等待一段时间，如果在这段时间内事件再次触发，则重新计时。只有当事件停止触发超过指定时间后，才执行函数。

**应用场景**：
- 搜索框输入联想（用户停止输入后再发送请求）
- 窗口调整完成后再执行布局计算
- 表单验证（用户停止输入后再验证）

**实现**：

```javascript
// 基础版防抖
function debounce(func, delay) {
  let timer = null;
  
  return function(...args) {
    // 如果已有定时器，清除它
    if (timer) {
      clearTimeout(timer);
    }
    
    // 设置新的定时器
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// 使用示例
const handleInput = debounce(function(e) {
  console.log('搜索:', e.target.value);
}, 500);

input.addEventListener('input', handleInput);
```

**高级版防抖（支持立即执行）**：

```javascript
function debounce(func, delay, immediate = false) {
  let timer = null;
  
  return function(...args) {
    const callNow = immediate && !timer;
    
    if (timer) {
      clearTimeout(timer);
    }
    
    timer = setTimeout(() => {
      timer = null;
      if (!immediate) {
        func.apply(this, args);
      }
    }, delay);
    
    if (callNow) {
      func.apply(this, args);
    }
  };
}

// 立即执行示例
const handleClick = debounce(function() {
  console.log('点击');
}, 1000, true); // 第一次点击立即执行，后续点击需等待1秒
```

### 节流（Throttle）

**定义**：在指定时间内，无论事件触发多少次，函数只执行一次。

**应用场景**：
- 滚动加载（每隔一段时间检查一次滚动位置）
- 按钮防止重复点击
- 拖拽事件
- 游戏中的技能冷却

**时间戳实现**：

```javascript
function throttle(func, delay) {
  let lastTime = 0;
  
  return function(...args) {
    const now = Date.now();
    
    if (now - lastTime >= delay) {
      func.apply(this, args);
      lastTime = now;
    }
  };
}

// 使用示例
const handleScroll = throttle(function() {
  console.log('滚动位置:', window.scrollY);
}, 1000);

window.addEventListener('scroll', handleScroll);
```

**定时器实现**：

```javascript
function throttle(func, delay) {
  let timer = null;
  
  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = null;
      }, delay);
    }
  };
}
```

**结合版本（leading和trailing）**：

```javascript
function throttle(func, delay, options = {}) {
  let timer = null;
  let lastTime = 0;
  const { leading = true, trailing = true } = options;
  
  return function(...args) {
    const now = Date.now();
    
    // 首次不执行
    if (!leading && !lastTime) {
      lastTime = now;
    }
    
    const remaining = delay - (now - lastTime);
    
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      
      lastTime = now;
      func.apply(this, args);
    } else if (!timer && trailing) {
      timer = setTimeout(() => {
        lastTime = leading ? Date.now() : 0;
        timer = null;
        func.apply(this, args);
      }, remaining);
    }
  };
}
```

### 防抖和节流的区别

| 特性 | 防抖（Debounce） | 节流（Throttle） |
|------|------------------|------------------|
| 执行时机 | 事件停止触发后执行 | 按固定时间间隔执行 |
| 执行频率 | 可能只执行一次 | 按指定频率执行 |
| 适用场景 | 输入联想、窗口调整 | 滚动加载、拖拽 |
| 立即响应 | 可配置首次立即执行 | 通常立即响应首次触发 |
| 资源消耗 | 可能多次重置定时器 | 固定频率，更可预测 |

### 使用建议

- **用防抖**：当你希望用户完成操作后再执行（如搜索框输入）
- **用节流**：当你希望定期执行某操作（如滚动监听）
- **结合使用**：某些场景可能需要同时使用两者

## 17. Ajax、Fetch和Axios的区别

### Ajax

**定义**：Ajax（Asynchronous JavaScript and XML）是一种在不重新加载整个页面的情况下，与服务器交换数据并更新部分网页的技术。

**实现方式**：使用XMLHttpRequest对象。

```javascript
// 原生Ajax请求
function ajax(url, method, data, callback) {
  const xhr = new XMLHttpRequest();
  
  xhr.open(method, url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        callback(null, JSON.parse(xhr.responseText));
      } else {
        callback(new Error('Request failed'));
      }
    }
  };
  
  xhr.send(JSON.stringify(data));
}

// 使用
ajax('/api/users', 'POST', { name: 'Alice' }, (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
  }
});
```

**特点**：
- 最原始的异步请求方式
- 使用回调函数处理结果
- 支持所有浏览器
- 代码复杂，需要手动处理各种情况

### Fetch

**定义**：Fetch是新一代的Web API，提供了一个更强大和灵活的网络请求接口。

```javascript
// 基本用法
fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name: 'Alice' })
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// 使用async/await
async function fetchData() {
  try {
    const response = await fetch('/api/users');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

**特点**：
- 基于Promise，支持async/await
- 更简洁的API
- 支持Request和Response对象
- 不支持请求取消（需要使用AbortController）
- 同域请求默认会携带 cookie（`credentials` 默认为 `same-origin`）；跨域请求需手动设置 `credentials: 'include'` 才会携带 cookie
- 404、500等HTTP错误不会reject

### Axios

**定义**：Axios是一个基于Promise的HTTP客户端，可以用于浏览器和Node.js。

```javascript
// 基本用法
axios.post('/api/users', { name: 'Alice' })
  .then(response => console.log(response.data))
  .catch(error => console.error('Error:', error));

// 使用async/await
async function fetchData() {
  try {
    const response = await axios.get('/api/users');
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// 配置默认值
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = 'Bearer token';
axios.defaults.timeout = 10000;

// 拦截器
axios.interceptors.request.use(
  config => {
    console.log('Request:', config);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    console.log('Response:', response);
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);
```

**特点**：
- 基于Promise
- 支持浏览器和Node.js
- 支持请求和响应拦截器
- 支持取消请求
- 自动转JSON
- 支持请求和响应数据转换
- 可配合后端 CSRF 机制设置 token/header；真正的 CSRF 防御依赖后端

### 三者对比

| 特性 | Ajax | Fetch | Axios |
|------|------|-------|-------|
| 基础API | XMLHttpRequest | Fetch API | XMLHttpRequest/Fetch |
| Promise支持 | 不支持 | 支持 | 支持 |
| 浏览器兼容性 | 所有浏览器 | 现代浏览器 | 所有浏览器 |
| 请求取消 | 支持 | 需AbortController | 支持 |
| 进度监听 | 支持 | 不支持 | 支持 |
| 拦截器 | 需手动实现 | 需手动实现 | 内置支持 |
| 自动转JSON | 需手动 | 需手动 | 自动 |
| 超时设置 | 支持 | 需手动 | 支持 |
| HTTP错误处理 | 需手动 | 需手动 | 自动reject |

### 选择建议

- **Ajax**：需要兼容老旧浏览器时使用
- **Fetch**：现代浏览器环境，不需要复杂功能时使用
- **Axios**：需要拦截器、取消请求等高级功能时使用

---

## 18. 深拷贝和浅拷贝的区别及实现

### 浅拷贝（Shallow Copy）

**定义**：创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值；如果属性是引用类型，拷贝的就是内存地址。

**特点**：
- 只复制第一层属性
- 引用类型属性仍然指向同一个内存地址
- 修改新对象的引用类型属性会影响原对象

**实现方法**：

#### 1. Object.assign()

```javascript
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = Object.assign({}, obj1);

obj2.a = 10;
obj2.b.c = 20;

console.log(obj1); // { a: 1, b: { c: 20 } } - b.c被修改
console.log(obj2); // { a: 10, b: { c: 20 } }
```

#### 2. 展开运算符（...）

```javascript
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { ...obj1 };

obj2.a = 10;
obj2.b.c = 20;

console.log(obj1); // { a: 1, b: { c: 20 } } - b.c被修改
```

#### 3. 数组的浅拷贝

```javascript
const arr1 = [1, 2, { a: 3 }];

// 方法1: slice()
const arr2 = arr1.slice();

// 方法2: concat()
const arr3 = [].concat(arr1);

// 方法3: 展开运算符
const arr4 = [...arr1];

// 方法4: Array.from()
const arr5 = Array.from(arr1);
```

### 深拷贝（Deep Copy）

**定义**：创建一个新对象，完全复制原对象的所有属性，包括嵌套对象。新对象和原对象不共享任何引用。

**特点**：
- 递归复制所有层级的属性
- 完全独立的副本
- 修改新对象不会影响原对象

**实现方法**：

#### 1. JSON.parse(JSON.stringify())

```javascript
const obj1 = { a: 1, b: { c: 2 }, d: [1, 2, 3] };
const obj2 = JSON.parse(JSON.stringify(obj1));

obj2.b.c = 20;
obj2.d.push(4);

console.log(obj1); // { a: 1, b: { c: 2 }, d: [1, 2, 3] } - 不受影响
console.log(obj2); // { a: 1, b: { c: 20 }, d: [1, 2, 3, 4] }
```

**局限性**：
- 无法处理函数、undefined、Symbol
- 无法处理循环引用
- 会忽略原型链
- Date对象会被转换为字符串
- RegExp、Error对象会变成空对象

```javascript
const obj = {
  func: function() { console.log('test'); },
  undef: undefined,
  sym: Symbol('test'),
  date: new Date(),
  reg: /test/g
};

const copy = JSON.parse(JSON.stringify(obj));
console.log(copy);
// { date: "2023-01-01T00:00:00.000Z", reg: {} }
// func, undef, sym 都丢失了
```

#### 2. 递归实现深拷贝（基础版）

```javascript
function deepClone(obj) {
  // 处理null和非对象类型
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  // 处理Date
  if (obj instanceof Date) {
    return new Date(obj);
  }
  
  // 处理RegExp
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  
  // 处理数组和对象
  const cloneObj = Array.isArray(obj) ? [] : {};
  
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key]);
    }
  }
  
  return cloneObj;
}

// 测试
const obj1 = {
  a: 1,
  b: { c: 2 },
  d: [1, 2, { e: 3 }],
  date: new Date(),
  reg: /test/g
};

const obj2 = deepClone(obj1);
obj2.b.c = 20;
console.log(obj1.b.c); // 2 - 不受影响
```

#### 3. 完整版深拷贝（处理循环引用）

```javascript
function deepClone(obj, hash = new WeakMap()) {
  // 处理 null 和非对象/非函数类型
  if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
    return obj;
  }
  
  // 处理Date
  if (obj instanceof Date) {
    return new Date(obj);
  }
  
  // 处理RegExp
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags);
  }
  
  // 处理函数（通常直接返回同一引用；如需深拷贝函数体需额外处理）
  if (typeof obj === 'function') {
    return obj;
  }
  
  // 处理循环引用
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  
  // 创建新对象
  const cloneObj = Array.isArray(obj) ? [] : {};
  
  // 存储到hash中，处理循环引用
  hash.set(obj, cloneObj);
  
  // 处理Symbol类型的key
  const symbolKeys = Object.getOwnPropertySymbols(obj);
  if (symbolKeys.length) {
    symbolKeys.forEach(symKey => {
      cloneObj[symKey] = deepClone(obj[symKey], hash);
    });
  }
  
  // 递归拷贝
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  
  return cloneObj;
}

// 测试循环引用
const obj1 = { a: 1 };
obj1.self = obj1;

const obj2 = deepClone(obj1);
console.log(obj2); // { a: 1, self: [Circular] }
```

#### 4. 使用第三方库

```javascript
// lodash
import _ from 'lodash';
const obj2 = _.cloneDeep(obj1);

// jQuery
const obj2 = $.extend(true, {}, obj1);
```

#### 5. 原生 structuredClone()

现代浏览器和 Node.js（v17+）提供的原生深拷贝 API，使用简单且能处理大多数可序列化对象：

```javascript
const original = {
  name: 'John',
  age: 30,
  nested: {
    hobbies: ['reading', 'coding'],
    address: { city: 'New York' }
  },
  createdAt: new Date(),
  regex: /test/g
};

const cloned = structuredClone(original);
console.log(cloned !== original);           // true
console.log(cloned.nested !== original.nested); // true
```

**优点**：
- 原生支持，无需引入第三方库
- 能正确处理 Date、Map、Set、ArrayBuffer、TypedArray 等类型
- 支持循环引用

**局限性**：
- 无法克隆函数、DOM 节点，以及作为**属性值**的 `Symbol`（Symbol 键的属性仍会被克隆）
- 对象的 prototype 会丢失
- 不支持的类型会抛出 `DataCloneError`

### 浅拷贝 vs 深拷贝对比

| 特性 | 浅拷贝 | 深拷贝 |
|------|--------|--------|
| 复制层级 | 只复制第一层 | 递归复制所有层级 |
| 引用类型 | 共享引用 | 完全独立 |
| 性能 | 快 | 慢（需要递归） |
| 内存占用 | 小 | 大 |
| 实现难度 | 简单 | 复杂（需处理多种情况） |
| 适用场景 | 简单对象、临时副本 | 复杂对象、完全独立副本 |

## 19. 原型和原型链

### 什么是原型？

在JavaScript中，每个对象都有一个原型（prototype）。原型是一个对象，它包含了可以被对象实例共享的属性和方法。

**关键概念**：

1. **prototype**：每个函数都有一个prototype属性，指向一个对象
2. **__proto__**：每个对象都有一个__proto__属性，指向它的原型对象
3. **constructor**：原型对象有一个constructor属性，指向构造函数

### 原型关系图

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function() {
  console.log('Hello, ' + this.name);
};

const person1 = new Person('Alice');

// 原型关系
console.log(person1.__proto__ === Person.prototype); // true
console.log(Person.prototype.constructor === Person); // true
console.log(person1.constructor === Person); // true
```

### 原型链

**定义**：当访问一个对象的属性时，如果对象本身没有这个属性，JavaScript会沿着__proto__链向上查找，直到找到该属性或到达原型链的顶端（null）。

**原型链示例**：

```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function() {
  console.log(this.name + ' is eating');
};

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

// 设置原型链
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  console.log(this.name + ' is barking');
};

const dog = new Dog('Buddy', 'Golden Retriever');

// 原型链查找过程
dog.bark(); // 在Dog.prototype中找到
dog.eat();  // 在Animal.prototype中找到
dog.toString(); // 在Object.prototype中找到

// 原型链
console.log(dog.__proto__ === Dog.prototype); // true
console.log(Dog.prototype.__proto__ === Animal.prototype); // true
console.log(Animal.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__ === null); // true
```

### 原型链查找机制

```javascript
const obj = {
  a: 1
};

// 查找属性a
console.log(obj.a); // 1 - 在对象本身找到

// 查找属性toString
console.log(obj.toString); // [Function: toString] - 在Object.prototype中找到

// 查找不存在的属性
console.log(obj.nonExistent); // undefined - 沿着原型链找到null，返回undefined
```

### 原型链的应用

#### 1. 继承

```javascript
// ES5继承
function Parent(name) {
  this.name = name;
}

Parent.prototype.sayName = function() {
  console.log(this.name);
};

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

Child.prototype.sayAge = function() {
  console.log(this.age);
};

// ES6继承
class Parent {
  constructor(name) {
    this.name = name;
  }
  
  sayName() {
    console.log(this.name);
  }
}

class Child extends Parent {
  constructor(name, age) {
    super(name);
    this.age = age;
  }
  
  sayAge() {
    console.log(this.age);
  }
}
```

#### 2. 检查原型关系

```javascript
const arr = [1, 2, 3];

// instanceof
console.log(arr instanceof Array); // true
console.log(arr instanceof Object); // true

// isPrototypeOf
console.log(Array.prototype.isPrototypeOf(arr)); // true
console.log(Object.prototype.isPrototypeOf(arr)); // true

// getPrototypeOf
console.log(Object.getPrototypeOf(arr) === Array.prototype); // true
```

#### 3. 修改原型

```javascript
// 给所有数组添加方法
Array.prototype.myMethod = function() {
  console.log('Custom method');
};

const arr = [1, 2, 3];
arr.myMethod(); // "Custom method"

// 注意：修改内置对象的原型是不推荐的做法
```

### 原型相关方法

```javascript
const obj = { a: 1 };

// 获取原型
Object.getPrototypeOf(obj); // Object.prototype

// 设置原型
Object.setPrototypeOf(obj, Array.prototype);

// 创建指定原型的对象
const newObj = Object.create(obj);

// 检查属性是否在对象自身
obj.hasOwnProperty('a'); // true
obj.hasOwnProperty('toString'); // false

// 检查对象是否是另一个对象的原型
Object.prototype.isPrototypeOf(obj); // true
```

## 20. 闭包的概念和应用场景

### 什么是闭包？

**定义**：闭包是指有权访问另一个函数作用域中变量的函数。创建闭包的常见方式是在一个函数内部创建另一个函数。

**特点**：
- 函数嵌套函数
- 内部函数可以访问外部函数的变量
- 外部函数的变量不会被垃圾回收

### 基本示例

```javascript
function outer() {
  const name = 'Alice';
  
  function inner() {
    console.log(name); // 访问外部函数的变量
  }
  
  return inner;
}

const closure = outer();
closure(); // "Alice" - 即使outer已经执行完毕，name变量仍然可以访问
```

### 闭包的应用场景

#### 1. 数据私有化

```javascript
function createCounter() {
  let count = 0; // 私有变量
  
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount()); // 2
console.log(counter.count); // undefined - 无法直接访问私有变量
```

#### 2. 模块化

```javascript
const module = (function() {
  // 私有变量和方法
  let privateVar = 'I am private';
  
  function privateMethod() {
    console.log(privateVar);
  }
  
  // 公共API
  return {
    publicMethod: function() {
      privateMethod();
    },
    setPrivateVar: function(val) {
      privateVar = val;
    }
  };
})();

module.publicMethod(); // "I am private"
module.setPrivateVar('New value');
module.publicMethod(); // "New value"
```

#### 3. 函数工厂

```javascript
function makeMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

const double = makeMultiplier(2);
const triple = makeMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

#### 4. 延迟执行

```javascript
function delay(fn, ms) {
  return function(...args) {
    setTimeout(() => {
      fn.apply(this, args);
    }, ms);
  };
}

const delayedGreet = delay(function(name) {
  console.log('Hello, ' + name);
}, 1000);

delayedGreet('Alice'); // 1秒后输出 "Hello, Alice"
```

#### 5. 缓存计算结果（记忆化）

```javascript
function memoize(fn) {
  const cache = {};
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (key in cache) {
      console.log('从缓存获取');
      return cache[key];
    }
    
    console.log('计算结果');
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

const fibonacci = memoize(function(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(10)); // 计算
console.log(fibonacci(10)); // 从缓存获取
```

#### 6. 事件处理

```javascript
function setupButton(buttonId) {
  let clickCount = 0;
  
  document.getElementById(buttonId).addEventListener('click', function() {
    clickCount++;
    console.log('按钮被点击了 ' + clickCount + ' 次');
  });
}

setupButton('myButton');
```

### 闭包的注意事项

#### 1. 内存泄漏

```javascript
// 不好的例子
function createLargeClosure() {
  const largeData = new Array(1000000).fill('data');
  
  return function() {
    console.log(largeData[0]);
  };
}

const closure = createLargeClosure();
// largeData会一直占用内存

// 解决方案：及时释放不需要的闭包
closure = null;
```

#### 2. 循环中的闭包

```javascript
// 错误示例
for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i); // 输出5次5
  }, 1000);
}

// 解决方案1：使用IIFE
for (var i = 0; i < 5; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j); // 0, 1, 2, 3, 4
    }, 1000);
  })(i);
}

// 解决方案2：使用let
for (let i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i); // 0, 1, 2, 3, 4
  }, 1000);
}
```

### 闭包的优缺点

**优点**：
- 可以创建私有变量
- 可以延长变量的生命周期
- 可以封装代码

**缺点**：
- 可能导致内存泄漏
- 闭包中的变量会一直存在于内存中
- 过度使用可能导致性能问题

## 21. JS数组去重有哪些方法？

### 1. 使用 Set（ES6+）

**原理**：Set 是 ES6 引入的一种数据结构，它类似于数组，但成员的值都是唯一的。

```javascript
const array = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = [...new Set(array)];
console.log(uniqueArray); // 输出: [1, 2, 3, 4, 5]
```

Set 可以正确处理混合类型（如数字、字符串、布尔值等）：

```javascript
const mixedArray = [1, '1', true, false, true, 'hello', 'hello'];
const uniqueMixedArray = [...new Set(mixedArray)];
console.log(uniqueMixedArray); // 输出: [1, '1', true, false, 'hello']
```

### 2. 使用 filter + indexOf

**原理**：通过 `filter` 遍历数组，使用 `indexOf` 检查当前元素在数组中第一次出现的位置是否等于当前索引。

```javascript
const array = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = array.filter((item, index) => array.indexOf(item) === index);
console.log(uniqueArray); // 输出: [1, 2, 3, 4, 5]
```

### 3. 使用 reduce

**原理**：通过 `reduce` 遍历数组，将不重复的元素添加到结果数组中。

```javascript
const array = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = array.reduce((acc, current) => {
  if (!acc.includes(current)) {
    acc.push(current);
  }
  return acc;
}, []);
console.log(uniqueArray); // 输出: [1, 2, 3, 4, 5]
```

### 4. 使用 Map

**原理**：Map 保存键值对，键具有唯一性，可利用这一点实现去重。

```javascript
const array = [{id: 1}, {id: 2}, {id: 2}, {id: 3}];
const uniqueArray = [];
const map = new Map();
for (const item of array) {
  if (!map.has(item.id)) {
    map.set(item.id, true);
    uniqueArray.push(item);
  }
}
console.log(uniqueArray); // 输出: [{id: 1}, {id: 2}, {id: 3}]
```

对于对象数组，也可以更简洁地写法：

```javascript
const objects = [
  {id: 1, name: 'Alice' },
  {id: 2, name: 'Bob' },
  {id: 1, name: 'Alice' }, // 重复的 id
];

const uniqueObjects = [
  ...new Map(objects.map(item => [item.id, item])).values()
];
console.log(uniqueObjects);
// 输出: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
```

### 5. 使用对象属性（适用于简单数据类型）

**原理**：利用对象的属性名唯一性，将数组元素作为对象的属性名，然后遍历对象的属性名得到去重后的数组。

```javascript
const array = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = [];
const seen = {};
for (let i = 0; i < array.length; i++) {
  const item = array[i];
  if (!seen[item]) {
    uniqueArray.push(item);
    seen[item] = true;
  }
}
console.log(uniqueArray); // 输出: [1, 2, 3, 4, 5]
```

### 6. 自定义去重逻辑

如果需要更复杂的去重逻辑（如忽略大小写、按对象某个字段去重），可以结合 `Set` 或 `reduce`：

```javascript
// 忽略大小写去重
const strings = ['Apple', 'apple', 'Banana', 'banana'];
const uniqueStrings = strings.reduce((acc, current) => {
  if (!acc.seen.has(current.toLowerCase())) {
    acc.seen.add(current.toLowerCase());
    acc.list.push(current); // 保留原始值
  }
  return acc;
}, { list: [], seen: new Set() }).list;

console.log(uniqueStrings); // 输出: ['Apple', 'Banana']

// 按对象字段去重（filter + Set）
const objects = [
  {id: 1, name: 'Alice' },
  {id: 2, name: 'Bob' },
  {id: 1, name: 'Alice' },
];
const seen = new Set();
const uniqueObjects = objects.filter(item => {
  const duplicate = seen.has(item.id);
  seen.add(item.id);
  return !duplicate;
});
console.log(uniqueObjects);
// 输出: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
```

### 7. 性能提示

- 简单基础类型去重优先使用 `Set`，时间复杂度接近 O(n)。
- `filter + indexOf` 和 `reduce` 时间复杂度为 O(n²)，数据量较大时性能较差。
- 对象数组去重优先使用 `Map`（按唯一键）或 `filter + Set`。
- 如果不需要返回数组，直接使用 `Set` 会更高效：

```javascript
const array = [1, 2, 2, 3, 4, 4, 5];
const uniqueSet = new Set(array);
console.log(uniqueSet); // 输出: Set {1, 2, 3, 4, 5}
```

## 22. new操作符具体做了什么？

1. **创建一个新对象**：创建一个全新的空对象。
2. **设置原型链**：将这个新对象的 [[Prototype]]（即 __proto__）链接到构造函数的 prototype 对象。
3. **绑定 this**：将构造函数的 this 绑定到这个新对象。
4. **执行构造函数**：执行构造函数中的代码（通常用于初始化这个对象）。
5. **返回新对象**：如果构造函数没有显式返回一个对象，则返回这个新对象。如果构造函数返回一个对象，则返回该对象。

### 手动实现 new 操作符：

```javascript
function myNew(constructor, ...args) {
  // 1. 创建一个新对象
  const obj = {};
  
  // 2. 设置原型链
  obj.__proto__ = constructor.prototype;
  
  // 3. 绑定 this 并执行构造函数
  const result = constructor.apply(obj, args);
  
  // 4. 返回新对象（如果构造函数返回对象则返回该对象）
  return result instanceof Object ? result : obj;
}

// 使用示例
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function() {
  console.log(`Hello, I'm ${this.name}`);
};

const person = myNew(Person, 'John');
console.log(person.name); // John
person.sayHello(); // Hello, I'm John
```

### 1. 一个新的空对象

new 操作符首先会创建一个新的空对象。这个对象将作为构造函数的实例。

### 2. 对象的原型指向构造函数的 prototype 属性

新对象的 [[Prototype]]（即 __proto__）会被设置为构造函数的 prototype 属性。这意味着新对象可以访问构造函数原型上的属性和方法。

### 3. 构造函数中的 this 绑定到新对象

构造函数会被调用，且其内部的 this 关键字会被绑定到新创建的对象。构造函数可以对这个对象进行初始化，例如添加属性或方法。

### 4. 返回新对象（除非构造函数显式返回另一个对象）

如果构造函数没有显式返回一个对象，则 new 操作符会返回新创建的对象。

如果构造函数显式返回一个对象，则 new 操作符会返回这个对象，而不是新创建的对象。

## 23. 内存泄漏的原因有哪些？

### 闭包：
闭包通过保留对外部函数作用域的引用，使得外部函数的变量无法被垃圾回收器回收。如果闭包长期存在（例如被全局变量引用），而外部函数的变量又包含大量数据或引用其他对象，就可能导致内存泄漏。解决方法：

1. 及时解除不必要的引用：在闭包不再需要时，将闭包中引用的外部变量显式设置为 null 或 undefined。
2. 避免在循环中创建闭包：使用 IIFE 或 let 块级作用域，确保每次循环创建独立的闭包。
3. 避免在闭包中引用 DOM 元素

### 全局变量：
未通过 var、let、const 声明的变量会成为全局变量（或挂载到 window 对象）。即使这些变量不再需要，它们也不会被垃圾回收。

### 未清理的定时器或事件监听器：
setTimeout 或 setInterval 的回调函数如果未被清理，会持续占用内存。事件监听器未移除会导致事件目标对象无法被回收。

```javascript
// 未清理的定时器
const timer = setInterval(() => {
  console.log('定时器执行');
}, 1000);

// 应该在适当的时候清理
// clearInterval(timer);

// 未移除的事件监听器
const button = document.getElementById('myButton');
const handler = function() {
  console.log('按钮被点击');
};
button.addEventListener('click', handler);

// 应该在适当的时候移除
// button.removeEventListener('click', handler);
```

### DOM 引用：
即使 DOM 元素被移除，如果 JavaScript 中仍保留对它的引用，该元素及其子元素也无法被回收。

```javascript
const element = document.getElementById('myDiv');

// 删除 DOM 元素
element.remove();

// 但如果仍有 JavaScript 引用，元素不会被回收
// 应该将引用设为 null
// element = null;
```

## 24. JS 垃圾回收机制（GC）

### 什么是垃圾回收

垃圾回收（Garbage Collection，GC）是 JavaScript 引擎自动管理内存的机制，负责回收不再使用的对象所占用的内存，防止内存泄漏。

### 核心算法

现代 JS 引擎（V8、SpiderMonkey、JavaScriptCore 等）主要使用 **Tracing GC（可达性分析）**，核心实现是 **标记-清除（Mark-and-Sweep）** 及其优化变体：

1. **标记阶段**：从根对象（全局对象、调用栈中的变量）出发，遍历所有可到达的对象并标记。
2. **清除阶段**：回收未被标记的对象。

```
根对象 → 可达对象 → 可达对象
        ↘
         不可达对象（待回收）
```

**优点**：能处理循环引用。

> **引用计数（Reference Counting）** 是一种简单的 GC 思想，但由于无法处理循环引用且需要额外维护计数器，**现代主流 JS 引擎并不以它作为核心算法**。

### V8 引擎的分代回收

V8 将堆内存分为两代：

| 区域 | 存放对象 | 回收算法 | 特点 |
|---|---|---|---|
| **新生代** | 存活时间短的小对象 | Scavenge（复制算法） | 频繁回收、速度快 |
| **老生代** | 存活时间长的大对象 | 标记-清除 + 标记-整理 | 回收频率低、速度慢 |

**晋升老生代的条件**：
- 对象经历过一次新生代回收仍存活
- 对象占用内存超过新生代阈值（如 To Space 的 25%）

### 常见内存泄漏原因

- 意外的全局变量
- 闭包持有大量数据
- 遗忘的定时器 / 事件监听
- DOM 引用未释放
- 循环引用（老 IE 中较常见）

### 如何排查内存泄漏

```javascript
// 1. Chrome DevTools Performance 面板录制堆快照
// 2. Memory 面板对比 Heap Snapshot
// 3. 使用 PerformanceMonitor 观察 JS heap size 变化
```

### 面试要点

- 现代引擎以**可达性分析 / 标记-清除**为核心，不使用引用计数作为主要 GC 算法
- V8 采用**分代回收**优化 GC 性能
- 尽量避免频繁创建大量短生命周期对象，减少 GC 压力

## 25. JS继承有哪些方式？

### 1. 原型链继承：
通过将子类的原型指向父类的实例，实现子类对父类属性和方法的继承。

**优点**：简单易实现。

**缺点**：
- 引用类型的属性会被所有实例共享。
- 无法在不影响所有子类实例的情况下，向父类构造函数中传递参数。

```javascript
// 父类
function Parent() {
  this.name = 'Parent';
  this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function() {
  return this.name;
};

// 子类
function Child() {
  this.name = 'Child';
}

// 实现继承
Child.prototype = new Parent();
Child.prototype.constructor = Child;

const child1 = new Child();
const child2 = new Child();

child1.colors.push('black');
console.log(child1.colors); // ['red', 'blue', 'green', 'black']
console.log(child2.colors); // ['red', 'blue', 'green', 'black'] - 被意外修改
```

### 2. 构造函数继承：
在子类构造函数中调用父类构造函数，使用.call()或.apply()方法，实现子类对父类属性的继承。

**优点**：
- 可以向父类构造函数传递参数。
- 避免了引用类型属性被所有实例共享的问题。

**缺点**：
- 方法在构造函数中定义，无法复用。
- 无法继承父类原型上的属性和方法。

### 3. 组合继承：
结合原型链继承和借用构造函数继承，既实现了属性继承，又实现了方法继承。

**优点**：
融合了原型链继承和借用构造函数继承的优点，是JavaScript中最常用的继承模式。

**缺点**：
调用了两次父类构造函数，效率稍低。

### 4. 原型式继承：
借助一个临时构造函数，将传入的对象作为这个构造函数的原型，返回这个临时构造函数的实例。

**优点**：无需创建自定义类型，直接通过对象实现继承。

**缺点**：
- 引用类型的属性会被所有实例共享。
- 无法传递参数。

### 5. 寄生式继承：
在原型式继承的基础上，增强对象，返回增强后的对象。

**优点**：在原型式继承的基础上增加了额外的功能。

**缺点**：
- 引用类型的属性会被所有实例共享。
- 无法传递参数。

### 6. 寄生组合式继承：
通过借用构造函数继承属性，通过原型链的混成形式继承方法，避免了组合继承中调用两次父类构造函数的问题。

**优点**：
- 效率高，避免了调用两次父类构造函数。
- 实现了属性继承和方法继承。

**缺点**：实现相对复杂。

### 7. ES6 Class继承：
使用ES6的class语法糖，通过extends关键字实现继承。

**优点**：
- 语法简洁，易于理解。
- 实现了属性继承和方法继承。

**缺点**：
- 本质上仍然是基于原型链的继承。
- 需要现代JavaScript环境支持。

## 26. call、apply、bind有什么区别？

### 1. call：
立即调用函数，并显式指定 this 值和参数列表。

```javascript
func.call(thisArg, arg1, arg2, ...)
```

**特点**：
- 参数逐个传递（逗号分隔）。
- 立即执行函数。

### 2. apply：
立即调用函数，并显式指定 this 值和参数数组。

```javascript
func.apply(thisArg, [argsArray])
```

**特点**：
- 参数通过数组传递（适用于动态参数数量）。
- 立即执行函数。

### 3. bind：
返回一个新函数，永久绑定 this 值和可选参数（不立即执行）。

```javascript
const boundFunc = func.bind(thisArg, arg1, arg2, ...);
```

**特点**：
- 返回一个绑定后的函数，后续调用时无需再指定 this。
- 支持部分参数预绑定（柯里化）。

| 方法 | 执行时机 | 参数传递方式 | 返回值 | 适用场景 |
|------|----------|--------------|--------|----------|
| call | 立即执行 | 参数列表（逗号分隔） | 函数调用结果 | 明确参数数量时 |
| apply | 立即执行 | 参数数组 | 函数调用结果 | 参数数量动态或需要数组时 |
| bind | 延迟执行 | 参数列表（可预绑定） | 返回绑定后的函数 | 需要固定 this 或部分参数时 |

## 27. 手写 call / apply / bind

### 手写 call

```javascript
Function.prototype.myCall = function(context, ...args) {
  context = context || window;
  const fnKey = Symbol('fn');
  context[fnKey] = this;
  const result = context[fnKey](...args);
  delete context[fnKey];
  return result;
};

// 使用
function greet(greeting) {
  console.log(`${greeting}, ${this.name}`);
}
greet.myCall({ name: 'Alice' }, 'Hello'); // Hello, Alice
```

### 手写 apply

```javascript
Function.prototype.myApply = function(context, args = []) {
  context = context || window;
  const fnKey = Symbol('fn');
  context[fnKey] = this;
  const result = context[fnKey](...args);
  delete context[fnKey];
  return result;
};
```

### 手写 bind

```javascript
Function.prototype.myBind = function(context, ...bindArgs) {
  const fn = this;
  return function(...args) {
    return fn.apply(context, [...bindArgs, ...args]);
  };
};

// 使用
const obj = { name: 'Bob' };
function say(age, city) {
  console.log(`${this.name}, ${age}, ${city}`);
}
const sayBob = say.myBind(obj, 25);
sayBob('Beijing'); // Bob, 25, Beijing
```

### 三者核心区别

| 方法 | 调用方式 | 参数形式 | 是否立即执行 |
|---|---|---|---|
| call | `fn.call(ctx, a, b)` | 离散参数 | 立即执行 |
| apply | `fn.apply(ctx, [a, b])` | 数组参数 | 立即执行 |
| bind | `fn.bind(ctx, a)(b)` | 离散参数 | 返回新函数，不立即执行 |

### 面试要点

- `call` / `apply` 本质是改变函数执行时的 `this` 指向
- `bind` 返回一个新函数，支持柯里化（参数预设）
- 严格模式下 `context` 为 `null` 时，`this` 应为 `undefined` 而非 `window`

## 28. sort背后原理是什么？

现代 V8（Chrome 70+ / V8 7.0+）的 `Array.prototype.sort` 使用 **Timsort**（一种混合稳定排序算法），不再使用早年常说的“插入排序 + 快速排序”组合。

- 时间复杂度：平均与最坏均为 **O(n log n)**
- 稳定性：整体稳定，相等元素会保持原有顺序
- 排序结果受比较函数返回值影响；若比较函数返回 `NaN` 或不一致，行为不可预期

> 注：具体实现会随 V8 版本演进，但现代浏览器中的 `sort` 都是稳定排序。

### 更详细的解释：

1. **Timsort**：
   - 结合了插入排序和归并排序的优点
   - 适合真实场景中常见的部分有序数据
   - 平均与最坏时间复杂度均为 O(n log n)
   - **稳定排序**，相等元素顺序不变

2. **排序稳定性**：
   - 当比较函数返回 `0` 时，现代 V8 会保持元素原有顺序
   - 如果比较函数实现不恰当（例如返回 `NaN`），可能破坏稳定性

```javascript
// 示例：使用自定义比较函数进行数字排序
const numbers = [3, 1, 4, 1, 5, 9, 2, 6];

// 升序排列
numbers.sort((a, b) => a - b);
console.log(numbers); // [1, 1, 2, 3, 4, 5, 6, 9]

// 降序排列
numbers.sort((a, b) => b - a);
console.log(numbers); // [9, 6, 5, 4, 3, 2, 1, 1]
```

## 29. var/let/const、提升与暂时性死区

### 1. var、let、const 对比

| 关键字 | 作用域 | 提升行为 | 重复声明 | 可变性 | 顶层对象属性 | 适用场景 |
|--------|--------|----------|----------|--------|--------------|----------|
| `var` | 函数/全局 | 声明被提升到作用域顶部，初始化为 `undefined` | 允许 | 可重新赋值 | 是 | 兼容旧代码（不推荐新项目使用） |
| `let` | 块级 | 声明被提升，但未初始化（进入暂时性死区） | 不允许 | 可重新赋值 | 否 | 需要块级作用域的变量 |
| `const` | 块级 | 声明被提升，但未初始化（进入暂时性死区） | 不允许 | 不可重新赋值 | 否 | 声明常量或不可变引用 |

### 2. 变量提升（Hoisting）

**var 变量：**
- 声明会被提升到作用域顶部，但初始化（赋值）不会被提升。
- 未赋值的 `var` 变量默认值为 `undefined`。

**let 和 const 变量：**
- 声明会被提升，但不会初始化（进入暂时性死区，访问会报错）。
- 不存在默认值，必须在声明后赋值。

**函数声明提升：**
- 函数声明（`function foo() {}`）会被完全提升（包括函数体）。
- 函数表达式（`var foo = function() {}`）仅提升变量声明，不提升赋值。

**提升的优先级：**
- 函数声明优先级高于变量声明（若同名，函数声明会覆盖变量声明）。
- 变量赋值会覆盖之前的函数声明。
- 提升仅在当前作用域内生效（全局或函数作用域）。

```javascript
// 函数声明提升
console.log(foo()); // "Hello World" - 可以正常调用
function foo() {
  return "Hello World";
}

// 变量声明提升但未初始化
console.log(bar); // undefined - 变量存在但未赋值
var bar = "Hello";
console.log(bar); // "Hello" - 变量已赋值

// let/const 不会初始化提升
try {
  console.log(baz); // ReferenceError
} catch(e) {
  console.log(e.message); // "Cannot access 'baz' before initialization"
}
let baz = "World";
```

### 3. 暂时性死区（Temporal Dead Zone，TDZ）

暂时性死区是指从代码块开始到 `let` / `const` 声明语句执行之前的区域。在此区域内访问该变量会抛出 `ReferenceError`。

- **触发条件**：仅适用于 `let` 和 `const`（`var` 无 TDZ）。
- **错误类型**：访问未初始化的 `let` / `const` 会抛出 `ReferenceError`（而非 `undefined`）。

```javascript
// TDZ 示例
function example() {
  // 这里是 TDZ 区域，访问 a 会抛出 ReferenceError
  // console.log(a); // ReferenceError: Cannot access 'a' before initialization

  let a = 1;
  console.log(a); // 1 - 声明之后可以正常访问
}

// var 没有 TDZ
function varExample() {
  console.log(b); // undefined - var 会被提升并初始化为 undefined
  var b = 1;
}

// 函数参数中的 TDZ
function parameterTDZ(x = y, y = 2) {
  return [x, y];
}
// parameterTDZ(); // ReferenceError: Cannot access 'y' before initialization

// 循环中的 TDZ
const funcs = [];
for (let i = 0; i < 3; i++) {
  // 每次迭代都有独立的 i 绑定
  funcs[i] = () => console.log(i);
}

funcs[0](); // 0
funcs[1](); // 1
funcs[2](); // 2
```

### 4. 面试要点

- `var` 存在变量提升并初始化为 `undefined`；`let` / `const` 虽然也会被提升，但处于暂时性死区，声明前访问会报错。
- 函数声明提升优先级高于变量声明，但变量赋值会覆盖函数声明。
- 推荐优先使用 `const`，需要重新赋值时再用 `let`，避免使用 `var`。

## 30. map与forEach有什么区别？

| 特性 | map | forEach |
|------|-----|---------|
| 返回值 | 返回一个新数组（包含操作后的结果） | 返回 undefined |
| 是否修改原数组 | 不修改原数组（除非直接操作原数组） | 不修改原数组（除非直接操作原数组） |
| 是否支持链式调用 | 支持（因为返回数组） | 不支持（因为返回 undefined） |
| 主要用途 | 转换数组（生成新数组） | 执行副作用（如打印、修改外部状态） |
| 中断遍历 | 无法中断（需用 Array.prototype.some 或 every 替代） | 无法中断（需用 for 循环替代） |

| 特性 | for 循环 | forEach | map |
|------|---------|--------|-----|
| 返回值 | 无 | 返回 undefined | 返回新数组 |
| 控制流 | 支持 break、continue | 不支持 break、continue | 不支持 break、continue |
| 性能 | 更高 | 略低 | 略低 |
| 修改原数组 | 可修改 | 不修改 | 不修改 |
| this 绑定 | 需手动处理 | 可通过第二个参数显式绑定 | 可通过第二个参数显式绑定 |
| 异步操作 | 支持 | 不支持（需配合其他方式） | 不支持（需配合其他方式） |
| 适用场景 | 需要复杂控制逻辑 | 代码简洁性更重要，且不需要返回值 | 需要转换数组元素并返回新数组 |

## 31. CommonJS 与 ES Module 的区别

### CommonJS

Node.js 早期采用的模块化规范，运行时同步加载。

```javascript
// math.js
const add = (a, b) => a + b;
module.exports = { add };

// app.js
const { add } = require('./math.js');
console.log(add(1, 2));
```

**特点**：
- `require()` 运行时同步加载
- `module.exports` 导出值的拷贝
- 加载模块时执行整个模块脚本
- 主要用于 Node.js 服务端

### ES Module

ES6 引入的官方模块化标准，编译时静态分析。

```javascript
// math.js
export const add = (a, b) => a + b;
export default add;

// app.js
import add, { add as addAlias } from './math.js';
```

**特点**：
- `import` / `export` 编译时静态确定依赖
- 导出的是值的引用（live binding）
- 支持 Tree Shaking
- 浏览器原生支持，Node.js v12+ 逐步支持

### 核心区别

| 特性 | CommonJS | ES Module |
|---|---|---|
| 规范 | Node.js 社区规范 | ECMAScript 官方标准 |
| 加载时机 | 运行时同步加载 | 编译时静态分析 |
| 导出内容 | 值的拷贝 | 值的引用（live binding） |
| 语法 | `require` / `module.exports` | `import` / `export` |
| 动态导入 | `require(path)` | `import(path)` |
| Tree Shaking | 不支持 | 支持 |
| 循环依赖 | 易出现问题 | 通过静态分析更好处理 |
| 顶层 this | `module.exports` | `undefined` |

### 混用场景

```javascript
// ESM 中引入 CJS
import pkg from 'commonjs-package';

// CJS 中引入 ESM（需动态 import）
const { default: esm } = await import('esm-package');
```

### 面试要点

- ES Module 更适合前端工程化（Tree Shaking、静态分析）
- CommonJS 在 Node.js 生态中仍大量存在
- ESM 导出的是引用，修改导出值会影响所有导入方；CJS 导出的是拷贝

## 32. 如何将对象进行合并？

### 1. 使用 Object.assign()：
用于将一个或多个源对象的可枚举属性复制到目标对象中。

```javascript
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target);
// expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget);
// expected output: Object { a: 1, b: 4, c: 5 }
```

### 2. 使用展开运算符（...）

```javascript
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };

const merged = { ...obj1, ...obj2 };
console.log(merged); // { a: 1, b: 3, c: 4 }
```

### 3. 深拷贝合并（递归或工具库）：
如果需要合并嵌套对象（深拷贝），可以使用递归或工具库（如 Lodash 的 _.merge()）。

```javascript
// 使用递归实现深拷贝合并
function deepMerge(target, source) {
  for (let key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!target[key]) Object.assign(target, { [key]: {} });
      deepMerge(target[key], source[key]);
    } else {
      Object.assign(target, { [key]: source[key] });
    }
  }
  return target;
}

// 使用示例
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { b: { d: 3 }, e: 4 };
const merged = deepMerge(obj1, obj2);
console.log(merged); // { a: 1, b: { c: 2, d: 3 }, e: 4 }

// 使用 lodash 的 merge 方法
// const _ = require('lodash');
// const obj1 = { a: 1, b: { c: 2 } };
// const obj2 = { b: { d: 3 }, e: 4 };
// const merged = _.merge(obj1, obj2);
```

```javascript
// 使用递归实现深拷贝合并
function deepMerge(target, source) {
  for (let key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!target[key]) Object.assign(target, { [key]: {} });
      deepMerge(target[key], source[key]);
    } else {
      Object.assign(target, { [key]: source[key] });
    }
  }
  return target;
}

// 使用示例
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { b: { d: 3 }, e: 4 };
const merged = deepMerge(obj1, obj2);
console.log(merged); // { a: 1, b: { c: 2, d: 3 }, e: 4 }

// 使用 lodash 的 merge 方法
// const _ = require('lodash');
// const obj1 = { a: 1, b: { c: 2 } };
// const obj2 = { b: { d: 3 }, e: 4 };
// const merged = _.merge(obj1, obj2);
```

## 33. Promise函数是什么？

### 状态：
- pending（进行中）：初始状态，既不是成功，也不是失败。
- fulfilled（已成功）：操作成功完成。
- rejected（已失败）：操作失败。

### 特点：
- Promise 的状态一旦改变，就不会再变（从 pending 到 fulfilled 或 pending 到 rejected）。
- Promise 的 executor 在 `new Promise(executor)` 创建时会**立即同步执行**；`.then()` / `.catch()` 只是注册回调，并不会触发 Promise 执行。

### 创建 Promise

使用 new Promise() 构造函数创建一个 Promise 对象：

```javascript
const myPromise = new Promise((resolve, reject) => {
  // 执行异步操作
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve("操作成功！");
    } else {
      reject(new Error("操作失败！"));
    }
  }, 1000);
});
```

### 使用 Promise

通过 .then()、.catch() 和 .finally() 方法处理 Promise 的结果或错误。

### 1. .then()

- 用于处理 Promise 成功（fulfilled）时的逻辑。
- 可以链式调用多个 .then()。

### 2. .catch()

- 用于处理 Promise 失败（rejected）时的逻辑。
- 可以捕获链式调用中任何 .then() 的错误。

### 3. .finally()

- 无论 Promise 是 fulfilled 还是 rejected，都会执行。
- 适合用于清理操作（如关闭加载动画）。

### Promise 链式调用

Promise 支持链式调用，可以避免回调地狱。

### Promise 静态方法

### 1. Promise.resolve(value)

返回一个已解决的 Promise，状态为 fulfilled，值为 value

### 2. Promise.reject(error)

- 返回一个已拒绝的 Promise，状态为 rejected，值为 error。

### 3. Promise.all(iterable)

- 等待所有 Promise 完成，返回一个包含所有结果的数组。
- 如果任一 Promise 失败，则立即拒绝。

### 4. Promise.race(iterable)

返回第一个解决或拒绝的 Promise 的结果或错误。

### 5. Promise.allSettled(iterable)

等待所有 Promise 完成（无论成功或失败），返回一个结果数组。

### 6. Promise.any(iterable)

- 返回第一个解决的 Promise 的结果（忽略拒绝的 Promise）。
- 如果所有 Promise 都拒绝，则返回 AggregateError。

## 34. 回调地狱是什么？

回调地狱（Callback Hell）是指多层嵌套的回调函数（Callback）导致代码难以阅读、维护和调试的现象

- **问题**：
  - 代码缩进过多，难以阅读。
  - 错误处理分散，容易遗漏。
  - 调试困难，难以跟踪异步流程。
  
### 解决方案：

### 方法 1：使用 Promise

Promise 提供了一种更优雅的方式来处理异步操作，避免了多层嵌套。

- **改进**：
  - 仍然存在嵌套，但可以通过 Promise.all 或 async/await 进一步优化。

### 方法 2：使用 Promise.all（并行执行）

如果异步操作之间没有依赖关系，可以使用 Promise.all 并行执行。

### 方法 3：使用 async/await（推荐）

async/await 是基于 Promise 的语法糖，使异步代码看起来像同步代码。

### 方法 4：使用模块化封装

将异步操作封装成独立的函数，返回 Promise，然后在主函数中调用。

```javascript
// 封装异步操作
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Data from ${url}`);
    }, 1000);
  });
}

// 使用封装的函数
async function main() {
  try {
    const data1 = await fetchData('url1');
    const data2 = await fetchData('url2');
    const data3 = await fetchData('url3');
    console.log(data1, data2, data3);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

## 35. 如何用原生JS实现事件委托？

事件委托（Event Delegation）是一种利用事件冒泡机制来高效处理DOM事件的技巧。通过将事件监听器添加到父元素而不是每个子元素上，可以减少内存使用和提高性能，特别是对于动态添加的元素。

### 基本实现原理:

```javascript
// 1. 获取父元素
const parentElement = document.getElementById('parent');

// 2. 为父元素添加事件监听器
parentElement.addEventListener('click', function(event) {
    // 3. 检查事件源是否是我们关心的元素
    if (event.target.matches('.child-class')) {
        // 在这里处理子元素的点击事件
        console.log('子元素被点击了:', event.target);
    }
    
    // 或者可以处理多个不同的子元素
    if (event.target.matches('.child1')) {
        // 处理child1的点击
    } else if (event.target.matches('.child2')) {
        // 处理child2的点击
    }
});
```

### 更完整的实现示例:

```html
<ul id="parent-list">
  <li class="child-item">项目 1</li>
  <li class="child-item">项目 2</li>
  <li class="child-item">项目 3</li>
</ul>

<script>
  document.getElementById('parent-list').addEventListener('click', function(event) {
    // 检查被点击的元素是否是 li 元素
    if (event.target.tagName === 'LI') {
      console.log('点击了列表项:', event.target.textContent);
      
      // 可以在这里执行相应的操作
      event.target.style.backgroundColor = 'yellow';
    }
  });
</script>
```

### 优势:

1. **减少内存占用**：只需要一个事件监听器而不是多个
2. **动态元素支持**：新添加的子元素自动具有事件处理能力
3. **简化代码**：不需要为每个子元素单独绑定事件

### 注意事项:

1. 只适用于冒泡类型的事件（如 click、keydown 等）
2. 需要仔细检查 event.target 以确保处理正确的元素
3. 在某些复杂场景下可能需要使用 closest() 方法来查找目标元素

## 36. 判断数组是否为空有哪些方法？

### 1. 使用 Array.prototype.length

```javascript
const arr = [];
if (arr.length === 0) {
  console.log('数组为空');
}
```

### 2. 使用 Array.isArray() 结合 length

```javascript
const arr = [];
if (Array.isArray(arr) && arr.length === 0) {
  console.log('数组为空');
}
```

### 3. 使用 === 直接比较：通过严格等于 [] 判断

```javascript
const arr = [];
// 注意：这种方法不可靠，因为[] !== []
// 即使两个数组内容相同，它们也是不同的对象
```

### 4. 使用 JSON.stringify()：将数组转为字符串后判断

```javascript
const arr = [];
if (JSON.stringify(arr) === '[]') {
  console.log('数组为空');
}
```

### 5. 使用 Array.prototype.some() 或 Array.prototype.every()

```javascript
const arr = [];
// some() 对空数组总是返回 false
if (!arr.some(() => true)) {
  console.log('数组为空');
}

// every() 对空数组总是返回 true
if (arr.every(() => true)) {
  console.log('数组为空');
}
```

### 6. 使用 === 结合展开运算符（ES6+）

```javascript
const arr = [];
// 注意：这种方法也不可靠
```

### 7. 使用 Array.prototype.every() 方法

```javascript
const arr = [];
const isEmpty = arr.every(() => false); // 对于空数组，every 总是返回 true
console.log(isEmpty); // true
```

## 37. for in 和for of有什么区别？

### 1. for...in

**用途**：遍历对象的可枚举属性（包括原型链上的属性）。

**适用对象**：主要用于普通对象（Object），但也可用于数组（不推荐）。

**特点**：
- 遍历的是属性的键名（key）。
- 会遍历原型链上的可枚举属性（通常需要配合 hasOwnProperty 过滤）。
- 不保证遍历顺序（尽管现代引擎通常按定义顺序遍历）。

### 2. for...of

**用途**：遍历可迭代对象（如数组、字符串、Map、Set 等）的值。

**适用对象**：数组、字符串、Map、Set、NodeList 等实现了 [Symbol.iterator] 的对象。

**特点**：
- 直接获取值（而非键名或索引）。
- 不会遍历普通对象（除非对象实现了迭代协议）。

| 特性 | for...in | for...of |
|------|----------|----------|
| 遍历目标 | 对象的属性键（包括原型链） | 可迭代对象的值 |
| 适用对象 | 普通对象 | 数组、字符串、Map、Set 等 |
| 返回值 | 键名（字符串） | 值（任意类型） |
| 是否遍历原型链 | 是 | 否 |
| 是否推荐用于数组 | 否（用 for 或 forEach 更好） | 是 |

### 使用示例：

```javascript
// for...in 示例
const obj = { a: 1, b: 2, c: 3 };

for (let key in obj) {
  console.log(key, obj[key]);
}
// 输出: a 1, b 2, c 3

// 过滤原型链属性
for (let key in obj) {
  if (obj.hasOwnProperty(key)) {
    console.log(key, obj[key]);
  }
}

// for...of 示例
const arr = ['a', 'b', 'c'];

for (let value of arr) {
  console.log(value);
}
// 输出: a, b, c

// 字符串遍历
const str = 'hello';
for (let char of str) {
  console.log(char);
}
// 输出: h, e, l, l, o

// Map 遍历
const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
for (let [key, value] of map) {
  console.log(key, value);
}
// 输出: a 1, b 2, c 3

// Set 遍历
const set = new Set([1, 2, 3]);
for (let value of set) {
  console.log(value);
}
// 输出: 1, 2, 3
```

## 38. 判断空对象有哪些方法？

### 1. 使用 Object.keys()：获取对象的所有可枚举属性名组成的数组，检查数组长度是否为 0。

```javascript
const obj = {};
if (Object.keys(obj).length === 0) {
  console.log('对象为空');
}
```

### 2. 使用 JSON.stringify()：将对象转为 JSON 字符串，检查是否为 "{}"。

```javascript
const obj = {};
if (JSON.stringify(obj) === '{}') {
  console.log('对象为空');
}
```

### 3. 使用 for...in 循环：遍历对象属性，检查是否存在可枚举属性。需配合 hasOwnProperty 排除原型链上的属性

```javascript
const obj = {};
let isEmpty = true;
for (let key in obj) {
  if (obj.hasOwnProperty(key)) {
    isEmpty = false;
    break;
  }
}
if (isEmpty) {
  console.log('对象为空');
}
```

### 4. 使用 Object.getOwnPropertyNames()：获取对象的所有自身属性名（包括不可枚举属性），检查数组长度。

```javascript
const obj = {};
if (Object.getOwnPropertyNames(obj).length === 0) {
  console.log('对象为空');
}
```

### 5. 使用 ES6 的 Reflect.ownKeys()：获取对象的所有自身属性键（包括 Symbol 和不可枚举属性），检查数组长度

```javascript
const obj = {};
if (Reflect.ownKeys(obj).length === 0) {
  console.log('对象为空');
}
```

### 6. 使用 jQuery.isEmptyObject()（如果使用 jQuery）

```javascript
// 需要引入 jQuery
// if ($.isEmptyObject(obj)) {
//   console.log('对象为空');
// }
```

### 7. 使用 Lodash.isEmpty()（如果使用 Lodash）

```javascript
// 需要引入 Lodash
// if (_.isEmpty(obj)) {
//   console.log('对象为空');
// }
```

## 39. async/await 和 Promise 有什么区别？

### Promise

- Promise 是一个对象，表示异步操作的最终完成（或失败）及其结果值。
- 它是基于回调的异步编程模型，通过 .then() 和 .catch() 方法链式调用。
- 状态：pending（进行中）、fulfilled（成功）、rejected（失败）。

### async/await

- async/await 是基于 Promise 的语法糖，使异步代码看起来像同步代码。
- async 函数返回一个 Promise，await 用于等待 Promise 的解决或拒绝。
- 本质：await 暂停 async 函数的执行，直到 Promise 完成。

| 特性 | Promise | async/await |
|------|---------|-------------|
| 语法 | 基于 .then() 和 .catch() 的链式调用 | 基于 async 函数和 await 关键字 |
| 代码可读性 | 嵌套或链式调用，可能难以阅读 | 代码更接近同步代码，易于理解 |
| 错误处理 | 使用 .catch() 捕获错误 | 使用 try/catch 捕获错误 |
| 并行执行 | 需要手动封装（如 Promise.all） | 同样需要 Promise.all，但语法更简洁 |
| 调试 | 调试困难，难以跟踪异步流程 | 调试更简单，像同步代码一样设置断点 |
| 返回值 | 显式返回 Promise | async 函数隐式返回 Promise |

## 40. 虚拟DOM是什么？

虚拟 DOM 是 JavaScript 对象结构，用于表示真实 DOM 的抽象层。它不是真实 DOM 的替代品，而是一种优化手段，通过比较虚拟 DOM 的差异来最小化对真实 DOM 的操作，从而提升性能。

### 1. 虚拟 DOM 的核心思想

- **抽象层**：将真实 DOM 抽象为轻量级的 JavaScript 对象，描述 DOM 的结构和状态。
- **差异比较（Diffing）**：在数据变化时，生成新的虚拟 DOM，并与旧的虚拟 DOM 进行比较，找出差异（即"补丁"）。
- **批量更新**：将差异应用到真实 DOM，减少不必要的 DOM 操作（如直接操作 DOM 的开销较大）。

### 2. 虚拟 DOM 的工作流程

**初始渲染**：
- 数据变化时，通过模板（如 Vue 的模板语法或 React 的 JSX）生成新的虚拟 DOM。
- 将虚拟 DOM 转换为真实 DOM，并插入到页面中。

**数据更新**：
- 当数据发生变化时，重新生成新的虚拟 DOM。
- 通过算法（如 React 的 Diffing 算法）比较新旧虚拟 DOM，计算出差异。
- 将差异应用到真实 DOM，更新页面。

### 3. 虚拟 DOM 的优势

- **性能优化**：
  - 直接操作真实 DOM 的开销较大（如触发重排、重绘），而虚拟 DOM 的比较和更新是轻量级的。
  - 通过批量更新，减少真实 DOM 的操作次数。

- **跨平台能力**：
  - 虚拟 DOM 是纯 JavaScript 对象，可以轻松适配到不同平台（如 Web、移动端、小程序等）。

- **开发效率**：
  - 开发者可以专注于数据和逻辑，而无需手动操作 DOM，代码更简洁。

### 4. 虚拟 DOM 的局限性

- **首次渲染开销**：
  - 虚拟 DOM 的初始渲染需要生成完整的虚拟 DOM 树，可能比直接操作真实 DOM 稍慢（但通常可以忽略）。

- **内存占用**：
  - 虚拟 DOM 需要额外的内存来存储 JavaScript 对象，但对于现代应用来说，这通常不是问题。

- **不适合所有场景**：
  - 对于简单的静态页面或对性能要求极高的场景（如动画），直接操作真实 DOM 可能更高效。

### 虚拟 DOM 实现示例：

```javascript
// 简单的虚拟 DOM 实现
function createElement(tag, props, ...children) {
  return {
    tag,
    props: props || {},
    children
  };
}

function render(vnode, container) {
  // 文本节点
  if (typeof vnode === 'string') {
    const textNode = document.createTextNode(vnode);
    container.appendChild(textNode);
    return;
  }
  
  // 创建元素节点
  const element = document.createElement(vnode.tag);
  
  // 设置属性
  for (let prop in vnode.props) {
    element.setAttribute(prop, vnode.props[prop]);
  }
  
  // 递归渲染子节点
  vnode.children.forEach(child => render(child, element));
  
  container.appendChild(element);
}

// 使用示例
const vdom = createElement(
  'div',
  { id: 'app' },
  createElement('h1', null, 'Hello Virtual DOM'),
  createElement('p', null, 'This is a simple virtual DOM implementation.')
);

render(vdom, document.getElementById('root'));
```

### 虚拟 DOM 与真实 DOM 的性能对比：

```javascript
// 直接操作真实 DOM
function updateDOMDirectly() {
  const element = document.getElementById('counter');
  element.textContent = parseInt(element.textContent) + 1;
}

// 通过虚拟 DOM 更新
function updateWithVDOM() {
  // 1. 生成新的虚拟 DOM
  // 2. 与旧的虚拟 DOM 进行 diff
  // 3. 应用最小化更新到真实 DOM
  // 这个过程在框架内部完成
}
```

### 现代框架中的虚拟 DOM：

1. **React**：使用 Fiber 架构优化虚拟 DOM 的 diff 过程
2. **Vue 2.x**：实现了虚拟 DOM 来提高渲染性能
3. **Vue 3.x**：引入了更快的虚拟 DOM 实现和编译时优化
4. **Preact**：轻量级的 React 替代品，具有高效的虚拟 DOM 实现

## 41. diff 算法是什么？

Diff 算法（Difference Algorithm）是一种用于比较两个数据结构（如树、列表等）差异的算法。在前端开发中，Diff 算法主要用于虚拟 DOM（Virtual DOM）的对比，以高效地更新真实 DOM，从而提升渲染性能。

### 核心目标

- **最小化 DOM 操作**：通过比较新旧虚拟 DOM 树的差异，只更新需要变化的部分，避免不必要的 DOM 操作。
- **提高渲染效率**：减少浏览器重排（Reflow）和重绘（Repaint）的次数。

### 核心策略：

#### （1）层级比较（Tree Diff）

- **策略**：只比较同一层级的节点，不跨层级比较。

#### （2）组件比较（Component Diff）

- **策略**：同一类型的组件会复用，不同类型的组件会销毁并重新创建。

#### （3）元素比较（Element Diff）

- **策略**：对于同一层级的子节点，通过 key 属性高效地复用和移动节点。

### 常见问题解答

**Q1：为什么 React 的 Diff 算法不跨层级比较？**

**答案**：
- 跨层级比较的复杂度过高（O(n³)），无法满足大型应用的性能需求。
- 实际应用中，DOM 层级结构的变化较少，层级比较已经足够高效。

**Q2：key 的作用是什么？为什么不能用索引作为 key？**

**答案**：
- key 的作用是帮助 React 识别哪些节点发生了变化、新增或删除，从而高效地复用和移动节点。

**不能用索引作为 key 的原因**：
- 如果列表顺序发生变化（如排序、过滤），索引会变化，导致 React 误认为节点发生了变化，从而触发不必要的重新渲染。

**Q3：Diff 算法如何处理动态列表的更新？**

**答案**：
- React 通过 key 属性识别列表项的变化。
- 如果 key 相同，React 会复用该节点，并更新其 props。
- 如果 key 不同，React 会销毁旧节点，创建新节点。

**Q4：如何优化 Diff 算法的性能？**

**答案**：
- 避免频繁调整 DOM 层级结构。
- 保持组件类型稳定，避免频繁切换组件类型。
- 为列表项提供唯一的 key，避免使用索引作为 key。
- 合理拆分组件，减少单个组件的渲染范围。

### Diff 算法示例：

```javascript
// 简化的 Diff 算法示例
function diff(oldArray, newArray) {
  const patches = [];
  
  // 简单的同层比较
  for (let i = 0; i < Math.max(oldArray.length, newArray.length); i++) {
    const oldItem = oldArray[i];
    const newItem = newArray[i];
    
    if (!oldItem && newItem) {
      // 新增节点
      patches.push({ type: 'ADD', index: i, item: newItem });
    } else if (oldItem && !newItem) {
      // 删除节点
      patches.push({ type: 'REMOVE', index: i });
    } else if (oldItem !== newItem) {
      // 更新节点
      patches.push({ type: 'UPDATE', index: i, item: newItem });
    }
  }
  
  return patches;
}

// 使用示例
const oldList = ['A', 'B', 'C'];
const newList = ['A', 'D', 'C'];

const patches = diff(oldList, newList);
console.log(patches);
// [
//   { type: 'UPDATE', index: 1, item: 'D' }
// ]
```

### React 中的 Key 最佳实践：

```jsx
// ❌ 错误做法 - 使用索引作为 key
const TodoList = ({ todos }) => (
  <ul>
    {todos.map((todo, index) => (
      <li key={index}>{todo.text}</li>
    ))}
  </ul>
);

// ✅ 正确做法 - 使用唯一 ID 作为 key
const TodoList = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <li key={todo.id}>{todo.text}</li>
    ))}
  </ul>
);
```

### Vue 和 React Diff 算法的区别

#### 1. 对比策略不同

**React: 仅同层比较**
- 只会比较同一层级的 DOM 节点
- 跨层级的移动会被视为删除 + 创建
- React 18 使用 Fiber 架构，支持可中断的 diff 过程

**Vue: 优化了同层比较**
- 同样基于同层比较，但针对列表场景做了特殊优化
- Vue 3 引入了更长的最长递增子序列算法来处理列表

#### 2. 列表 diff 处理

**React - 仅 key 比较**

```jsx
// 通过 key 识别元素
{items.map(item => <div key={item.id}>{item.name}</div>)}
```

- 没有 key 时按顺序比较
- 有 key 时通过 key 匹配，但不会复用 DOM 节点

**Vue - 双端比较 + 最长递增子序列**

```vue
<div v-for="item in items" :key="item.id">{{ item.name }}</div>
```

- Vue 2: 双端比较（从两端向中间比较）
- Vue 3: 使用最长递增子序列算法，减少 DOM 操作

#### 3. 编译时优化

**React: 运行时 diff**
- diff 完全在运行时进行
- 依赖 JSX 编译，但优化有限

**Vue: 编译时 + 运行时**
- 编译时生成优化标记（静态提升、patchFlags）
- 跳过静态节点的 diff
- Vue 3 的 `Block Tree` 进一步优化

#### 4. 复杂度对比

| 框架 | 最坏情况 | 优化后 |
|------|----------|--------|
| React | O(n³) → O(n) | 同层比较降为 O(n) |
| Vue 2 | O(n) | 双端比较，常数更小 |
| Vue 3 | O(n) | 最长递增子序列，更少移动 |

#### 5. 关键代码差异

**React 的 diff（简化逻辑）**

```javascript
// React 只会比较同层级
function reconcileChildren(returnFiber, children) {
  // 只做同层比较，跨层级直接销毁重建
  if (old.key === new.key) {
    updateElement();
  } else {
    // 删除旧的，创建新的
  }
}
```

**Vue 3 的 diff（最长递增子序列）**

```javascript
// Vue 3 使用最长递增子序列优化列表更新
function patchKeyedChildren(c1, c2) {
  // 1. 同步头部节点
  // 2. 同步尾部节点
  // 3. 添加新节点
  // 4. 移除旧节点
  // 5. 处理最长递增子序列，只移动必要的节点
  const increasingNewSequence = getSequence(...);
  // 只移动不在最长递增子序列中的节点
}
```

#### 6. 核心差异总结

| 特性 | React | Vue |
|------|-------|-----|
| 策略 | 同层比较 | 同层 + 双端/LIS |
| 编译优化 | 较少 | 大量编译时优化 |
| 列表处理 | 简单 key 匹配 | 复杂的最长递增子序列 |
| 性能 | 依赖开发者优化 | 框架自动优化更多 |
| 静态节点 | 运行时跳过 | 编译时标记，完全跳过 |

#### 7. 实际影响

**React 需要开发者注意：**
- 使用 `React.memo` 避免不必要的重渲染
- 使用 `useMemo`、`useCallback` 优化性能
- 合理使用 `key` 属性
- 避免跨层级移动节点

**Vue 自动优化：**
- 静态节点自动提升，只 diff 动态部分
- 编译时生成优化提示
- 列表更新自动使用最优算法
- 开发者无需过多关注性能细节

---

## 42. ES6 Proxy是什么？有什么作用？

### 什么是Proxy？

Proxy（代理）是ES6引入的元编程特性，用于创建一个对象的代理，可以拦截并自定义对象的基本操作（如属性查找、赋值、枚举、函数调用等）。

### 基本语法

```javascript
const proxy = new Proxy(target, handler);
// target: 要代理的目标对象
// handler: 包含拦截器的对象
```

### 常用拦截器

#### 1. get - 拦截属性读取

```javascript
const person = { name: 'John', age: 30 };

const proxy = new Proxy(person, {
  get(target, prop, receiver) {
    if (prop in target) {
      return target[prop];
    }
    return `Property ${prop} not found`;
  }
});

console.log(proxy.name);      // "John"
console.log(proxy.gender);    // "Property gender not found"
```

#### 2. set - 拦截属性设置

```javascript
const validator = {
  set(target, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('Age must be an integer');
      }
      if (value < 0 || value > 150) {
        throw new RangeError('Age must be between 0 and 150');
      }
    }
    target[prop] = value;
    return true;  // 严格模式下必须返回true
  }
};

const person = new Proxy({}, validator);
person.age = 30;      // OK
person.age = '30';    // TypeError: Age must be an integer
person.age = 200;     // RangeError: Age must be between 0 and 150
```

#### 3. has - 拦截in操作符

```javascript
const range = {
  start: 1,
  end: 10
};

const proxy = new Proxy(range, {
  has(target, prop) {
    return prop >= target.start && prop <= target.end;
  }
});

console.log(5 in proxy);   // true
console.log(15 in proxy);  // false
```

#### 4. deleteProperty - 拦截delete操作

```javascript
const protectedObj = {
  _private: 'secret',
  public: 'open'
};

const proxy = new Proxy(protectedObj, {
  deleteProperty(target, prop) {
    if (prop.startsWith('_')) {
      throw new Error(`Cannot delete private property ${prop}`);
    }
    delete target[prop];
    return true;
  }
});

delete proxy.public;     // OK
delete proxy._private;   // Error: Cannot delete private property _private
```

#### 5. apply - 拦截函数调用

```javascript
function sum(a, b) {
  return a + b;
}

const proxy = new Proxy(sum, {
  apply(target, thisArg, args) {
    console.log(`Called with args: ${args}`);
    return target.apply(thisArg, args) * 2;  // 双倍结果
  }
});

console.log(proxy(1, 2));  // Called with args: 1,2 然后输出 6
```

#### 6. construct - 拦截new操作符

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
}

const ProxyPerson = new Proxy(Person, {
  construct(target, args) {
    console.log(`Creating instance with args: ${args}`);
    return new target(...args);
  }
});

const person = new ProxyPerson('John');  // Creating instance with args: John
```

### 实际应用场景

#### 1. 数据验证

```javascript
const createValidator = (target) => {
  return new Proxy(target, {
    set(target, prop, value) {
      const schema = target._schema || {};
      if (schema[prop]) {
        const { type, required, min, max } = schema[prop];
        if (required && (value === undefined || value === null)) {
          throw new Error(`${prop} is required`);
        }
        if (value !== undefined && typeof value !== type) {
          throw new TypeError(`${prop} must be of type ${type}`);
        }
      }
      target[prop] = value;
      return true;
    }
  });
};

const user = createValidator({
  _schema: {
    name: { type: 'string', required: true },
    age: { type: 'number', min: 0, max: 150 }
  }
});
```

#### 2. 私有属性保护

```javascript
const withPrivacy = (obj) => {
  return new Proxy(obj, {
    get(target, prop) {
      if (typeof prop === 'string' && prop.startsWith('_')) {
        throw new Error(`Private property ${prop} is not accessible`);
      }
      return target[prop];
    },
    set(target, prop, value) {
      if (typeof prop === 'string' && prop.startsWith('_')) {
        throw new Error(`Private property ${prop} is not accessible`);
      }
      target[prop] = value;
      return true;
    }
  });
};
```

#### 3. 响应式数据（简化版Vue3实现原理）

```javascript
const createReactive = (target, callback) => {
  return new Proxy(target, {
    set(target, prop, value) {
      const oldValue = target[prop];
      target[prop] = value;
      if (oldValue !== value) {
        callback(prop, value, oldValue);
      }
      return true;
    }
  });
};

const data = createReactive({ count: 0 }, (key, newVal, oldVal) => {
  console.log(`${key} changed from ${oldVal} to ${newVal}`);
});

data.count = 1;  // "count changed from 0 to 1"
```

#### 4. 日志/性能监控

```javascript
const withLogging = (fn) => {
  return new Proxy(fn, {
    apply(target, thisArg, args) {
      console.log(`Calling ${target.name} with`, args);
      const start = performance.now();
      const result = target.apply(thisArg, args);
      const end = performance.now();
      console.log(`${target.name} took ${end - start}ms`);
      return result;
    }
  });
};

const slowFunction = withLogging(function compute(n) {
  let sum = 0;
  for (let i = 0; i < n; i++) sum += i;
  return sum;
});
```

### Proxy vs Object.defineProperty

| 特性 | Proxy | Object.defineProperty |
|------|-------|----------------------|
| 拦截能力 | 13种拦截器 | 主要是getter/setter |
| 新增属性 | 自动拦截 | 需要预先定义 |
| 数组操作 | 原生支持 | 需要特殊处理 |
| 嵌套对象 | 需要递归代理 | 需要递归定义 |
| 兼容性 | ES6+ | ES5+ |

### 注意事项

```javascript
// 1. Proxy不等同于原对象
const obj = {};
const proxy = new Proxy(obj, {});
console.log(proxy === obj);  // false

// 2. 嵌套对象需要递归代理
const deepProxy = (obj) => {
  return new Proxy(obj, {
    get(target, prop) {
      const value = target[prop];
      if (typeof value === 'object' && value !== null) {
        return deepProxy(value);  // 递归代理
      }
      return value;
    }
  });
};

// 3. 部分操作无法拦截
const proxy = new Proxy({}, {});
typeof proxy;       // 无法拦截
proxy instanceof Object;  // 无法拦截
```

---

## 43. ES6 Reflect是什么？有什么作用？

### 什么是Reflect？

Reflect是ES6引入的一个内置对象，它提供了一组用于操作对象的静态方法，与Proxy的拦截器方法一一对应。Reflect不是一个函数对象，因此不能new，它的所有方法都是静态的。

### Reflect的设计目的

1. **将Object上的方法集中到Reflect上**（如`Object.defineProperty` → `Reflect.defineProperty`）
2. **修改某些Object方法的返回结果**，使其更合理
3. **与Proxy配合**，完成默认行为，作为函数式编程的基础

### 常用方法

#### 1. Reflect.get() - 获取属性值

```javascript
const obj = { x: 1, y: 2 };

// 传统方式
obj.x;  // 1

// Reflect方式
Reflect.get(obj, 'x');  // 1

// 访问getter
const obj2 = {
  _name: 'John',
  get name() {
    return this._name;
  }
};
const receiver = { _name: 'Jane' };
Reflect.get(obj2, 'name', receiver);  // "Jane" - 指定this值
```

#### 2. Reflect.set() - 设置属性值

```javascript
const obj = {};

// 传统方式
obj.x = 1;

// Reflect方式
Reflect.set(obj, 'x', 1);  // true

// 在setter中指定this
const obj2 = {
  _age: 0,
  set age(value) {
    this._age = value;
  }
};
const receiver = {};
Reflect.set(obj2, 'age', 25, receiver);
console.log(receiver._age);  // 25
```

#### 3. Reflect.has() - 检查属性（in操作符）

```javascript
const obj = { x: 1 };

// 传统方式
'x' in obj;  // true

// Reflect方式
Reflect.has(obj, 'x');  // true
```

#### 4. Reflect.deleteProperty() - 删除属性

```javascript
const obj = { x: 1, y: 2 };

// 传统方式
delete obj.x;

// Reflect方式
Reflect.deleteProperty(obj, 'y');  // true
```

#### 5. Reflect.defineProperty() - 定义属性

```javascript
const obj = {};

// 传统方式
Object.defineProperty(obj, 'x', {
  value: 1,
  writable: false
});

// Reflect方式 - 返回boolean而不是抛出错误
const success = Reflect.defineProperty(obj, 'y', {
  value: 2,
  writable: false
});
console.log(success);  // true
```

#### 6. Reflect.getOwnPropertyDescriptor() - 获取属性描述符

```javascript
const obj = { x: 1 };

Reflect.getOwnPropertyDescriptor(obj, 'x');
// { value: 1, writable: true, enumerable: true, configurable: true }
```

#### 7. Reflect.getPrototypeOf() / Reflect.setPrototypeOf()

```javascript
const obj = {};
const proto = { x: 1 };

// 设置原型
Reflect.setPrototypeOf(obj, proto);

// 获取原型
Reflect.getPrototypeOf(obj) === proto;  // true
```

#### 8. Reflect.apply() - 调用函数

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

// 传统方式
greet.call(null, 'World');
greet.apply(null, ['World']);

// Reflect方式
Reflect.apply(greet, null, ['World']);  // "Hello, World!"

// 实际应用：调用Math方法
const nums = [1, 5, 3, 2, 4];
Reflect.apply(Math.max, null, nums);  // 5
```

#### 9. Reflect.construct() - new操作符

```javascript
function Person(name) {
  this.name = name;
}

// 传统方式
const p1 = new Person('John');

// Reflect方式
const p2 = Reflect.construct(Person, ['Jane']);

// 指定原型
const p3 = Reflect.construct(Person, ['Bob'], OtherClass);
```

#### 10. Reflect.ownKeys() - 获取所有自身属性键

```javascript
const sym = Symbol('sym');
const obj = {
  a: 1,
  b: 2,
  [sym]: 3
};

// 获取所有自身属性（包括Symbol和不可枚举）
Reflect.ownKeys(obj);  // ['a', 'b', Symbol(sym)]

// 对比其他方法
Object.keys(obj);           // ['a', 'b'] - 仅可枚举字符串键
Object.getOwnPropertyNames(obj);   // ['a', 'b'] - 所有字符串键
Object.getOwnPropertySymbols(obj); // [Symbol(sym)] - 所有Symbol键
```

### Reflect与Proxy的配合

```javascript
const handler = {
  get(target, prop, receiver) {
    console.log(`Getting ${prop}`);
    // 使用Reflect完成默认行为
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    console.log(`Setting ${prop} = ${value}`);
    return Reflect.set(target, prop, value, receiver);
  },
  deleteProperty(target, prop) {
    console.log(`Deleting ${prop}`);
    return Reflect.deleteProperty(target, prop);
  }
};

const proxy = new Proxy({ x: 1 }, handler);
proxy.x;       // Getting x, 返回 1
proxy.x = 2;   // Setting x = 2, 返回 true
delete proxy.x; // Deleting x, 返回 true
```

### 实际应用场景

#### 1. 更安全的属性操作

```javascript
// Object.defineProperty失败时抛出错误
try {
  Object.defineProperty(obj, 'x', { value: 1 });
} catch (e) {
  // 处理错误
}

// Reflect.defineProperty失败时返回false
if (!Reflect.defineProperty(obj, 'x', { value: 1 })) {
  // 处理失败
}
```

#### 2. 函数式编程工具

```javascript
// 使用Reflect.apply进行函数式操作
const nums = [[1, 2, 3], [4, 5], [6]];
const sums = nums.map(arr => Reflect.apply(Array.prototype.reduce, arr, [(a, b) => a + b, 0]));
// [6, 9, 6]
```

#### 3. 元编程工具

```javascript
// 获取对象的所有属性（包括Symbol）
function getAllProperties(obj) {
  const properties = new Set();
  let current = obj;
  while (current !== null) {
    Reflect.ownKeys(current).forEach(key => properties.add(key));
    current = Reflect.getPrototypeOf(current);
  }
  return [...properties];
}
```

### Reflect的优势总结

| 方法 | Object方式 | Reflect方式 | 优势 |
|------|-----------|-------------|------|
| defineProperty | 抛出错误 | 返回boolean | 更友好的错误处理 |
| set/get | 直接操作 | 返回boolean/值 | 函数式风格 |
| deleteProperty | delete操作符 | 返回boolean | 可编程 |
| has | in操作符 | 返回boolean | 函数式风格 |
| ownKeys | 多个方法组合 | 一个方法获取所有键 | 更统一 |

### 兼容性

- **现代浏览器**：完全支持
- **Node.js**：6.0+ 支持大部分方法
- **IE**：不支持（需要polyfill）

---

## 44. 函数式编程了解多少？

### 核心概念

```javascript
// 1. 纯函数：相同输入永远产生相同输出，无副作用
const add = (a, b) => a + b; // 纯函数

let count = 0;
const impureAdd = (a, b) => {
  count++; // 副作用：修改外部状态
  return a + b;
};

// 2. 不可变性：数据不可变，返回新数据
const arr = [1, 2, 3];
// 不改变原数组
const newArr = [...arr, 4];

// 3. 高阶函数：函数作为参数或返回值
const map = (arr, fn) => arr.map(fn);
const createMultiplier = (factor) => (x) => x * factor;

const double = createMultiplier(2);
console.log(double(5)); // 10
```

### 常用函数式方法

```javascript
const numbers = [1, 2, 3, 4, 5];

// map: 转换
const doubled = numbers.map(x => x * 2);
// [2, 4, 6, 8, 10]

// filter: 过滤
const evens = numbers.filter(x => x % 2 === 0);
// [2, 4]

// reduce: 归约
const sum = numbers.reduce((acc, x) => acc + x, 0);
// 15

// compose: 函数组合
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

const add1 = x => x + 1;
const multiply2 = x => x * 2;
const add1ThenMultiply2 = compose(multiply2, add1);

console.log(add1ThenMultiply2(5)); // (5 + 1) * 2 = 12

// curry: 柯里化
const curry = fn =>
  function curried(...args) {
    return args.length >= fn.length
      ? fn.apply(this, args)
      : (...args2) => curried.apply(this, args.concat(args2));
  };

const add3 = curry((a, b, c) => a + b + c);
console.log(add3(1)(2)(3)); // 6
console.log(add3(1, 2)(3)); // 6
```

### 实际应用场景

```javascript
// 数据管道处理
const users = [
  { name: 'Alice', age: 25, score: 85 },
  { name: 'Bob', age: 30, score: 90 },
  { name: 'Charlie', age: 35, score: 78 }
];

// 函数式数据流
const result = users
  .filter(u => u.age >= 25)
  .map(u => ({ ...u, score: u.score + 5 }))
  .sort((a, b) => b.score - a.score)
  .slice(0, 2)
  .reduce((acc, u) => acc + u.score, 0);

// React函数式组件
const UserList = ({ users }) => (
  <ul>
    {users
      .filter(u => u.active)
      .map(u => (
        <li key={u.id}>{u.name}</li>
      ))}
  </ul>
);

// Redux reducer（纯函数）
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT': return state + 1;
    case 'DECREMENT': return state - 1;
    default: return state;
  }
};
```

### 函数式编程的优势

1. **可测试性**：纯函数易于单元测试
2. **可维护性**：无副作用，代码行为可预测
3. **可组合性**：小函数组合成复杂功能
4. **并发安全**：不可变性避免竞态条件
5. **易于推理**：数据流清晰

---

## 45. 一直在window上面挂东西是否有什么风险？

### 主要风险

**1. 命名冲突**

```javascript
// 不同脚本可能覆盖同名变量
window.$ = 'myLibrary';
// 后加载的jQuery也会设置window.$
console.log(window.$); // 不再是'myLibrary'

// 解决方案：使用模块系统或命名空间
const MyApp = window.MyApp || {};
MyApp.utils = { /* ... */ };
```

**2. 内存泄漏**

```javascript
// 全局变量不会被垃圾回收
window.largeData = new Array(1000000).fill('data');

// 引用DOM元素导致无法回收
window.cachedElements = document.querySelectorAll('.item');

// 正确的清理
function cleanup() {
  delete window.largeData;
  window.cachedElements = null;
}
```

**3. 安全性风险**

```javascript
// 恶意代码可以访问和修改全局变量
window.userToken = 'secret-token';
// 任何脚本都可以读取token

// 意外的变量覆盖
var undefined = 'defined'; // 不要这样做！
```

**4. 可维护性降低**

```javascript
// 难以追踪数据来源
function someFunction() {
  return window.globalConfig.value; // 这个值从哪里来？
}

// 测试困难
// 需要设置全局状态才能测试
```

### 最佳实践

```javascript
// 1. 使用模块系统（ES6 Modules）
// config.js
export const config = { apiUrl: 'https://api.example.com' };

// main.js
import { config } from './config.js';

// 2. 使用IIFE限制作用域
(function() {
  const privateVar = 'private';
  window.exposedAPI = { /* 只暴露必要的 */ };
})();

// 3. 使用Symbol创建私有属性
const _data = Symbol('data');
window.myComponent = {
  [_data]: 'private data',
  getData() { return this[_data]; }
};

// 4. 严格模式避免意外创建全局变量
'use strict';
function test() {
  accidentalGlobal = 1; // 报错！
}

// 5. TypeScript命名空间（如果需要全局）
// global.d.ts
declare global {
  interface Window {
    myLib: MyLibrary;
  }
}
```

### 合理使用场景

```javascript
// 1. 配置对象（只读）
Object.defineProperty(window, 'APP_CONFIG', {
  value: { version: '1.0.0', env: 'production' },
  writable: false,
  configurable: false
});

// 2. 调试工具（开发环境）
if (process.env.NODE_ENV === 'development') {
  window.__DEBUG__ = {
    store,
    router,
    api
  };
}

// 3. 第三方库兼容
if (typeof window !== 'undefined') {
  window.Vue = Vue;
}

// 4. polyfill
if (!window.fetch) {
  window.fetch = fetchPolyfill;
}
```

---

## 46. 手写实现 Promise.all

### 实现思路

1. 返回一个 Promise
2. 遍历传入的可迭代对象，为每个元素创建 Promise
3. 使用计数器跟踪完成的 Promise 数量
4. 所有 Promise 完成时，返回结果数组
5. 任一 Promise 失败时，立即 reject

### 代码实现

```javascript
function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    // 转换为数组
    const promises = Array.from(iterable);
    const results = new Array(promises.length);
    let completedCount = 0;

    // 处理空数组情况
    if (promises.length === 0) {
      resolve([]);
      return;
    }

    promises.forEach((item, index) => {
      // 将每个元素转为 Promise
      Promise.resolve(item)
        .then(value => {
          results[index] = value;
          completedCount++;

          // 所有 Promise 都完成
          if (completedCount === promises.length) {
            resolve(results);
          }
        })
        .catch(reject); // 任一失败立即 reject
    });
  });
}

// 使用示例
const p1 = Promise.resolve(1);
const p2 = new Promise(resolve => setTimeout(() => resolve(2), 100));
const p3 = fetch('/api/data');

promiseAll([p1, p2, p3])
  .then(results => console.log(results)) // [1, 2, data]
  .catch(error => console.error(error));

// 与原生 Promise.all 对比
Promise.all([p1, p2, p3])
  .then(results => console.log(results));
```

### 关键点解析

| 要点 | 说明 |
|------|------|
| `Array.from` | 支持任意可迭代对象（Array, Set, Map.keys()等） |
| `Promise.resolve` | 将非 Promise 值包装为 resolved Promise |
| 索引保持 | 使用 `results[index]` 确保结果顺序与输入一致 |
| 错误处理 | 任一 reject 立即终止，符合 Promise.all 语义 |

### Promise.allSettled 手写实现

```javascript
function promiseAllSettled(iterable) {
  return new Promise(resolve => {
    const promises = Array.from(iterable);
    const results = new Array(promises.length);
    let completedCount = 0;

    if (promises.length === 0) {
      resolve([]);
      return;
    }

    promises.forEach((item, index) => {
      Promise.resolve(item)
        .then(value => {
          results[index] = { status: 'fulfilled', value };
        })
        .catch(reason => {
          results[index] = { status: 'rejected', reason };
        })
        .finally(() => {
          completedCount++;
          if (completedCount === promises.length) {
            resolve(results);
          }
        });
    });
  });
}
```

---

## 47. 手写 Promise.race / Promise.any / Promise.finally

### Promise.race

返回第一个完成（fulfilled 或 rejected）的 Promise 结果。

```javascript
function promiseRace(iterable) {
  return new Promise((resolve, reject) => {
    const promises = Array.from(iterable);
    // 空 iterable 时返回永远 pending 的 Promise（与原生 Promise.race 一致）
    if (promises.length === 0) return;

    promises.forEach(item => {
      Promise.resolve(item).then(resolve, reject);
    });
  });
}
```

### Promise.any

返回第一个 fulfilled 的 Promise；如果全部 rejected，返回 `AggregateError`。

```javascript
function promiseAny(iterable) {
  return new Promise((resolve, reject) => {
    const promises = Array.from(iterable);
    if (promises.length === 0) {
      reject(new AggregateError([], 'All promises were rejected'));
      return;
    }

    let rejectedCount = 0;
    const errors = [];

    promises.forEach((item, index) => {
      Promise.resolve(item)
        .then(resolve)
        .catch(error => {
          errors[index] = error;
          rejectedCount++;
          if (rejectedCount === promises.length) {
            reject(new AggregateError(errors, 'All promises were rejected'));
          }
        });
    });
  });
}
```

### Promise.finally

无论 fulfilled 还是 rejected，最终都会执行回调，且不影响原 Promise 的值或原因。

```javascript
Promise.prototype.myFinally = function(callback) {
  return this.then(
    value => Promise.resolve(callback()).then(() => value),
    reason => Promise.resolve(callback()).then(() => { throw reason; })
  );
};
```

### 四者对比

| 方法 | 成功条件 | 失败条件 | 返回值 |
|---|---|---|---|
| `Promise.all` | 全部 fulfilled | 任一 rejected | 结果数组 |
| `Promise.race` | 任一完成 | 任一 rejected | 第一个结果 |
| `Promise.any` | 任一 fulfilled | 全部 rejected | 第一个成功结果 |
| `Promise.allSettled` | 全部完成 | 不会失败 | 状态数组 |

### 面试要点

- `race` 强调"速度"，任一 Promise  settle 就返回
- `any` 强调"成功"，忽略 rejected，全失败才报错
- `finally` 不接收参数，不改变原 Promise 结果

## 48. 手写实现虚拟列表

### 实现原理

虚拟列表（Virtual List）只渲染可视区域内的元素，大幅降低 DOM 节点数量，提升长列表性能。

```
┌─────────────────────────────┐
│      可视区域 (viewport)      │  ← 只渲染这部分
│    ┌─────────────────┐      │
│    │  列表项 0       │      │
│    │  列表项 1       │      │
│    │  列表项 2       │      │
│    │  ...            │      │
│    │  列表项 n       │      │
│    └─────────────────┘      │
│                             │
│  ↑ 上方缓冲区域 (buffer)     │
│  ↓ 下方缓冲区域 (buffer)     │
├─────────────────────────────┤
│                             │
│      不可见区域 (不渲染)       │
│                             │
└─────────────────────────────┘
```

### 完整实现

```javascript
class VirtualList {
  constructor(container, options) {
    this.container = container;
    this.itemHeight = options.itemHeight;      // 每项固定高度
    this.totalItems = options.totalItems;      // 总数据量
    this.renderItem = options.renderItem;      // 渲染函数
    this.overscan = options.overscan || 3;     // 上下缓冲数量

    this.visibleStart = 0;
    this.visibleEnd = 0;
    this.scrollTop = 0;

    this.init();
  }

  init() {
    // 创建占位元素撑开滚动区域
    this.spacer = document.createElement('div');
    this.spacer.style.height = `${this.totalItems * this.itemHeight}px`;
    this.container.appendChild(this.spacer);

    // 创建可视区域容器
    this.viewport = document.createElement('div');
    this.viewport.style.position = 'absolute';
    this.viewport.style.top = '0';
    this.viewport.style.left = '0';
    this.viewport.style.right = '0';
    this.container.appendChild(this.viewport);

    // 设置容器样式
    this.container.style.position = 'relative';
    this.container.style.overflow = 'auto';
    this.container.style.height = '400px'; // 或传入的高度

    // 绑定滚动事件
    this.container.addEventListener('scroll', this.onScroll.bind(this));

    // 初始渲染
    this.updateVisibleItems();
  }

  onScroll() {
    this.scrollTop = this.container.scrollTop;
    this.updateVisibleItems();
  }

  updateVisibleItems() {
    const containerHeight = this.container.clientHeight;

    // 计算可视范围
    const startIndex = Math.floor(this.scrollTop / this.itemHeight);
    const visibleCount = Math.ceil(containerHeight / this.itemHeight);

    // 添加缓冲区域
    this.visibleStart = Math.max(0, startIndex - this.overscan);
    this.visibleEnd = Math.min(
      this.totalItems,
      startIndex + visibleCount + this.overscan
    );

    this.render();
  }

  render() {
    // 清空可视区域
    this.viewport.innerHTML = '';

    // 计算偏移量
    const offsetY = this.visibleStart * this.itemHeight;
    this.viewport.style.transform = `translateY(${offsetY}px)`;

    // 渲染可见项
    for (let i = this.visibleStart; i < this.visibleEnd; i++) {
      const itemEl = this.renderItem(i);
      itemEl.style.height = `${this.itemHeight}px`;
      itemEl.style.boxSizing = 'border-box';
      this.viewport.appendChild(itemEl);
    }
  }

  // 动态更新数据量
  updateTotalItems(newTotal) {
    this.totalItems = newTotal;
    this.spacer.style.height = `${this.totalItems * this.itemHeight}px`;
    this.updateVisibleItems();
  }

  // 销毁
  destroy() {
    this.container.removeEventListener('scroll', this.onScroll);
    this.container.innerHTML = '';
  }
}

// 使用示例
const container = document.getElementById('list-container');
const list = new VirtualList(container, {
  itemHeight: 50,        // 每项50px
  totalItems: 100000,    // 10万条数据
  overscan: 5,
  renderItem: (index) => {
    const div = document.createElement('div');
    div.textContent = `Item ${index}`;
    div.style.borderBottom = '1px solid #eee';
    div.style.padding = '10px';
    return div;
  }
});
```

### 不定高度虚拟列表

```javascript
class DynamicVirtualList {
  constructor(container, options) {
    this.container = container;
    this.items = options.items;              // 数据数组
    this.estimateHeight = options.estimateHeight || 50;
    this.renderItem = options.renderItem;

    this.positions = []; // 缓存每项的位置信息
    this.initPositions();
    this.init();
  }

  initPositions() {
    let accumulatedHeight = 0;
    this.positions = this.items.map((item, index) => {
      const position = {
        index,
        top: accumulatedHeight,
        height: this.estimateHeight,
        bottom: accumulatedHeight + this.estimateHeight
      };
      accumulatedHeight += this.estimateHeight;
      return position;
    });
  }

  // 更新实际高度（渲染后测量）
  updatePosition(index, height) {
    const position = this.positions[index];
    const diff = height - position.height;

    if (diff !== 0) {
      position.height = height;
      position.bottom = position.top + height;

      // 更新后续所有项的位置
      for (let i = index + 1; i < this.positions.length; i++) {
        this.positions[i].top += diff;
        this.positions[i].bottom += diff;
      }
    }
  }

  // 二分查找找到起始索引
  findStartIndex(scrollTop) {
    let left = 0, right = this.positions.length - 1;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (this.positions[mid].bottom < scrollTop) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    return left;
  }

  updateVisibleItems() {
    const scrollTop = this.container.scrollTop;
    const containerHeight = this.container.clientHeight;

    const startIndex = this.findStartIndex(scrollTop);
    const endIndex = this.findStartIndex(scrollTop + containerHeight);

    this.render(startIndex, endIndex);
  }

  render(startIndex, endIndex) {
    // 类似固定高度的 render 逻辑
    const offsetY = this.positions[startIndex].top;
    // ... 渲染逻辑
  }
}
```

### React 虚拟列表 Hook

```javascript
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

function useVirtualList(itemCount, itemHeight, overscan = 3) {
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);

  const { virtualItems, totalHeight, startIndex } = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight);
    const visibleCount = Math.ceil(
      (containerRef.current?.clientHeight || 0) / itemHeight
    );

    const startIndex = Math.max(0, start - overscan);
    const endIndex = Math.min(itemCount, start + visibleCount + overscan);

    const virtualItems = [];
    for (let i = startIndex; i < endIndex; i++) {
      virtualItems.push({
        index: i,
        style: {
          position: 'absolute',
          top: i * itemHeight,
          height: itemHeight,
          left: 0,
          right: 0
        }
      });
    }

    return {
      virtualItems,
      totalHeight: itemCount * itemHeight,
      startIndex
    };
  }, [scrollTop, itemCount, itemHeight, overscan]);

  const onScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  }, []);

  return {
    containerRef,
    virtualItems,
    totalHeight,
    startIndex,
    onScroll
  };
}

// 使用
function VirtualListComponent({ items }) {
  const { containerRef, virtualItems, totalHeight, onScroll } = useVirtualList(
    items.length,
    50,
    5
  );

  return (
    <div
      ref={containerRef}
      onScroll={onScroll}
      style={{ height: '400px', overflow: 'auto', position: 'relative' }}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {virtualItems.map(({ index, style }) => (
          <div key={index} style={style}>
            {items[index]}
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 49. 移动端上拉加载、下拉刷新实现

### 实现原理

```
下拉刷新：
┌─────────────────────┐
│     下拉指示器        │  ← 手指下拉时显示
│    ↓ 释放刷新        │
├─────────────────────┤
│                     │
│      内容区域        │
│                     │
└─────────────────────┘

上拉加载：
┌─────────────────────┐
│                     │
│      内容区域        │
│                     │
├─────────────────────┤
│    加载中...        │  ← 滚动到底部时显示
└─────────────────────┘
```

### 原生 JS 实现

```javascript
class PullToRefresh {
  constructor(container, options = {}) {
    this.container = typeof container === 'string'
      ? document.querySelector(container)
      : container;

    this.options = {
      threshold: options.threshold || 80,        // 触发刷新的距离
      maxDistance: options.maxDistance || 100,   // 最大下拉距离
      onRefresh: options.onRefresh || (() => {}), // 刷新回调
      onLoadMore: options.onLoadMore || null     // 加载更多回调
    };

    this.state = 'idle'; // idle | pulling | refreshing | loading
    this.startY = 0;
    this.currentY = 0;
    this.diff = 0;

    this.init();
  }

  init() {
    // 创建下拉指示器
    this.indicator = document.createElement('div');
    this.indicator.className = 'pull-indicator';
    this.indicator.innerHTML = '<span>↓ 下拉刷新</span>';
    this.indicator.style.cssText = `
      height: 0;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f5f5f5;
      transition: height 0.3s;
    `;
    this.container.parentNode.insertBefore(this.indicator, this.container);

    // 创建上拉加载指示器
    if (this.options.onLoadMore) {
      this.loadMoreIndicator = document.createElement('div');
      this.loadMoreIndicator.className = 'load-more-indicator';
      this.loadMoreIndicator.innerHTML = '<span>↑ 上拉加载更多</span>';
      this.loadMoreIndicator.style.cssText = `
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f5f5f5;
        opacity: 0;
        transition: opacity 0.3s;
      `;
      this.container.parentNode.appendChild(this.loadMoreIndicator);
    }

    this.bindEvents();
  }

  bindEvents() {
    // 触摸事件（下拉）
    this.container.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: false });
    this.container.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: false });
    this.container.addEventListener('touchend', this.onTouchEnd.bind(this));

    // 滚动事件（上拉加载）
    if (this.options.onLoadMore) {
      this.container.addEventListener('scroll', this.onScroll.bind(this));
    }
  }

  onTouchStart(e) {
    if (this.state !== 'idle' && this.state !== 'pulling') return;

    // 只有在顶部才能下拉
    if (this.container.scrollTop > 0) return;

    this.startY = e.touches[0].clientY;
    this.state = 'pulling';
  }

  onTouchMove(e) {
    if (this.state !== 'pulling') return;

    this.currentY = e.touches[0].clientY;
    this.diff = this.currentY - this.startY;

    // 只处理下拉
    if (this.diff < 0) return;

    // 阻止默认滚动
    e.preventDefault();

    // 阻尼效果
    const dampedDiff = Math.min(this.diff * 0.5, this.options.maxDistance);

    // 更新指示器
    this.indicator.style.height = `${dampedDiff}px`;

    if (dampedDiff >= this.options.threshold) {
      this.indicator.innerHTML = '<span>↑ 释放刷新</span>';
    } else {
      this.indicator.innerHTML = '<span>↓ 下拉刷新</span>';
    }
  }

  onTouchEnd() {
    if (this.state !== 'pulling') return;

    if (this.diff >= this.options.threshold) {
      this.state = 'refreshing';
      this.indicator.style.height = '50px';
      this.indicator.innerHTML = '<span>加载中...</span>';

      // 执行刷新
      this.options.onRefresh().then(() => {
        this.reset();
      });
    } else {
      this.reset();
    }
  }

  onScroll() {
    if (this.state === 'loading') return;

    const { scrollTop, scrollHeight, clientHeight } = this.container;

    // 距离底部 50px 触发
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      this.state = 'loading';
      this.loadMoreIndicator.style.opacity = '1';
      this.loadMoreIndicator.innerHTML = '<span>加载中...</span>';

      this.options.onLoadMore().then(() => {
        this.state = 'idle';
        this.loadMoreIndicator.style.opacity = '0';
      });
    }
  }

  reset() {
    this.state = 'idle';
    this.diff = 0;
    this.indicator.style.height = '0';
    this.indicator.innerHTML = '<span>↓ 下拉刷新</span>';
  }

  // 程序触发刷新
  triggerRefresh() {
    this.state = 'refreshing';
    this.indicator.style.height = '50px';
    this.indicator.innerHTML = '<span>加载中...</span>';

    return this.options.onRefresh().then(() => {
      this.reset();
    });
  }
}

// 使用示例
const ptr = new PullToRefresh('#content', {
  threshold: 80,
  onRefresh: async () => {
    // 模拟请求
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('刷新完成');
    // 重新加载数据
    await loadData();
  },
  onLoadMore: async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('加载更多完成');
    // 追加数据
    await loadMoreData();
  }
});
```

### CSS 优化版本

```css
.pull-container {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; /* iOS 惯性滚动 */
}

.pull-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 14px;
}

.pull-indicator .spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-top-color: #007aff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 防止滚动穿透 */
.pulling {
  overflow: hidden;
}
```

### 使用 Intersection Observer 的上拉加载

```javascript
// 更现代的上拉加载实现
function useInfiniteScroll(callback, options = {}) {
  const { threshold = 100, rootMargin = '0px' } = options;
  const targetRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          callback();
        }
      },
      { rootMargin: `${rootMargin} 0px 0px` }
    );

    observerRef.current.observe(target);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [callback, threshold]);

  return targetRef;
}

// React 使用
function List() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadMore = async () => {
    if (loading) return;
    setLoading(true);

    const newItems = await fetchData(page);
    setItems(prev => [...prev, ...newItems]);
    setPage(p => p + 1);
    setLoading(false);
  };

  const loaderRef = useInfiniteScroll(loadMore);

  return (
    <div>
      {items.map(item => <Item key={item.id} data={item} />)}
      <div ref={loaderRef} style={{ height: 50 }}>
        {loading && <Spinner />}
      </div>
    </div>
  );
}
```

---

## 50. 判断 DOM 元素是否在可视区域

### 方法一：getBoundingClientRect

```javascript
/**
 * 检查元素是否在可视区域内
 * @param {Element} element - 目标元素
 * @param {Object} options - 配置选项
 * @returns {boolean}
 */
function isInViewport(element, options = {}) {
  const {
    threshold = 0,        // 相交阈值（0-1）
    rootMargin = 0        // 根元素边距
  } = options;

  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  // 垂直方向是否在视口内
  const verticalInView = (
    rect.top <= windowHeight + rootMargin &&
    rect.bottom >= -rootMargin
  );

  // 水平方向是否在视口内
  const horizontalInView = (
    rect.left <= windowWidth + rootMargin &&
    rect.right >= -rootMargin
  );

  return verticalInView && horizontalInView;
}

// 使用示例
const element = document.querySelector('.target');

window.addEventListener('scroll', () => {
  if (isInViewport(element)) {
    console.log('元素进入视口');
    element.classList.add('visible');
  }
});

// 完全可见检测
function isFullyInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= window.innerHeight &&
    rect.right <= window.innerWidth
  );
}

// 计算可见比例
function getVisibilityRatio(element) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;

  const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
  const visibleWidth = Math.min(rect.right, windowWidth) - Math.max(rect.left, 0);

  if (visibleHeight <= 0 || visibleWidth <= 0) return 0;

  const visibleArea = visibleHeight * visibleWidth;
  const elementArea = rect.height * rect.width;

  return visibleArea / elementArea;
}
```

### 方法二：Intersection Observer（推荐）

```javascript
/**
 * 使用 Intersection Observer 监听元素可见性
 * 性能更好，不会阻塞主线程
 */
function observeVisibility(element, options = {}) {
  const {
    threshold = 0,           // 相交比例阈值
    rootMargin = '0px',      // 边距
    root = null,             // 根元素（默认视口）
    onEnter = () => {},      // 进入视口回调
    onLeave = () => {},      // 离开视口回调
    onChange = () => {}      // 每次变化回调
  } = options;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        const { isIntersecting, intersectionRatio, boundingClientRect } = entry;

        onChange({
          isIntersecting,
          intersectionRatio,
          rect: boundingClientRect,
          target: entry.target
        });

        if (isIntersecting) {
          onEnter({
            ratio: intersectionRatio,
            target: entry.target
          });
        } else {
          onLeave({ target: entry.target });
        }
      });
    },
    { threshold, rootMargin, root }
  );

  observer.observe(element);

  // 返回取消观察函数
  return () => observer.disconnect();
}

// 使用示例：懒加载图片
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');

  images.forEach(img => {
    observeVisibility(img, {
      threshold: 0.1,
      onEnter: ({ target }) => {
        target.src = target.dataset.src;
        target.removeAttribute('data-src');
        target.classList.add('loaded');
      }
    });
  });
}

// 使用示例：无限滚动
function infiniteScroll(container, loader, onLoadMore) {
  let loading = false;

  return observeVisibility(loader, {
    root: container,           // 在容器内滚动
    rootMargin: '100px 0px',   // 提前 100px 触发
    onEnter: async () => {
      if (loading) return;
      loading = true;

      await onLoadMore();

      loading = false;
    }
  });
}
```

### React Hook 实现

```javascript
import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * 检测元素是否在视口内
 */
function useInView(options = {}) {
  const { threshold = 0, rootMargin = '0px', triggerOnce = false } = options;
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setInView(isIntersecting);

        if (isIntersecting && triggerOnce) {
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, inView };
}

// 使用示例
function FadeInSection({ children }) {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.5s, transform 0.5s'
      }}
    >
      {children}
    </div>
  );
}

/**
 * 懒加载 Hook
 */
function useLazyLoad(src) {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '200px', // 提前 200px 加载
    triggerOnce: true
  });

  return { ref, src: inView ? src : null };
}

// 使用示例
function LazyImage({ src, alt, ...props }) {
  const { ref, src: loadedSrc } = useLazyLoad(src);

  return (
    <img
      ref={ref}
      src={loadedSrc || 'placeholder.png'}
      alt={alt}
      {...props}
    />
  );
}
```

## 51. localStorage 设置失效时间

### 实现原理

localStorage 本身不支持设置过期时间，需要手动封装：
1. 存储时记录过期时间戳
2. 读取时检查是否过期
3. 定期清理过期数据

```javascript
/**
 * 带有过期时间的 Storage 封装
 */
class ExpirableStorage {
  constructor(storage = localStorage) {
    this.storage = storage;
    this.prefix = 'exp_';
  }

  /**
   * 设置值，支持过期时间
   * @param {string} key - 键名
   * @param {*} value - 值
   * @param {number} expires - 过期时间（毫秒），不传则永不过期
   */
  setItem(key, value, expires) {
    const data = {
      value,
      expires: expires ? Date.now() + expires : null,
      created: Date.now()
    };

    this.storage.setItem(this.prefix + key, JSON.stringify(data));
  }

  /**
   * 获取值，自动检查过期
   * @param {string} key - 键名
   * @param {*} defaultValue - 默认值
   * @returns {*} 存储的值或默认值
   */
  getItem(key, defaultValue = null) {
    const raw = this.storage.getItem(this.prefix + key);

    if (!raw) return defaultValue;

    try {
      const data = JSON.parse(raw);

      // 检查是否过期
      if (data.expires && Date.now() > data.expires) {
        this.removeItem(key);
        return defaultValue;
      }

      return data.value;
    } catch (e) {
      return defaultValue;
    }
  }

  /**
   * 移除指定项
   */
  removeItem(key) {
    this.storage.removeItem(this.prefix + key);
  }

  /**
   * 清空所有数据
   */
  clear() {
    // 只清理带有前缀的数据
    for (let i = this.storage.length - 1; i >= 0; i--) {
      const key = this.storage.key(i);
      if (key && key.startsWith(this.prefix)) {
        this.storage.removeItem(key);
      }
    }
  }

  /**
   * 获取剩余时间（毫秒）
   */
  getRemainingTime(key) {
    const raw = this.storage.getItem(this.prefix + key);
    if (!raw) return 0;

    try {
      const data = JSON.parse(raw);
      if (!data.expires) return Infinity;

      const remaining = data.expires - Date.now();
      return remaining > 0 ? remaining : 0;
    } catch (e) {
      return 0;
    }
  }

  /**
   * 清理所有过期数据
   */
  cleanExpired() {
    const now = Date.now();
    let cleaned = 0;

    for (let i = this.storage.length - 1; i >= 0; i--) {
      const key = this.storage.key(i);
      if (!key || !key.startsWith(this.prefix)) continue;

      try {
        const data = JSON.parse(this.storage.getItem(key));
        if (data.expires && now > data.expires) {
          this.storage.removeItem(key);
          cleaned++;
        }
      } catch (e) {
        // 解析失败，删除
        this.storage.removeItem(key);
      }
    }

    return cleaned;
  }

  /**
   * 获取所有未过期的键
   */
  keys() {
    const keys = [];
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      if (key && key.startsWith(this.prefix)) {
        const realKey = key.slice(this.prefix.length);
        // 检查是否过期
        if (this.getItem(realKey) !== null) {
          keys.push(realKey);
        }
      }
    }
    return keys;
  }
}

// 创建实例
const storage = new ExpirableStorage();

// ========== 使用示例 ==========

// 1. 基础使用
storage.setItem('token', 'abc123', 1000 * 60 * 60); // 1小时过期
storage.setItem('user', { name: '张三', age: 25 });  // 永不过期

// 2. 读取数据
const token = storage.getItem('token');
const user = storage.getItem('user');
const settings = storage.getItem('settings', { theme: 'light' }); // 带默认值

// 3. 获取剩余时间
const remaining = storage.getRemainingTime('token');
console.log(`Token 还有 ${remaining / 1000} 秒过期`);

// 4. 定期清理（例如在应用启动时）
storage.cleanExpired();

// 5. 常见场景封装
const cache = {
  // 会话缓存（30分钟）
  setSession(key, value) {
    storage.setItem(`session:${key}`, value, 1000 * 60 * 30);
  },

  getSession(key) {
    return storage.getItem(`session:${key}`);
  },

  // 短期缓存（5分钟）
  setShort(key, value) {
    storage.setItem(`short:${key}`, value, 1000 * 60 * 5);
  },

  getShort(key) {
    return storage.getItem(`short:${key}`);
  },

  // 天级缓存
  setDaily(key, value) {
    storage.setItem(`daily:${key}`, value, 1000 * 60 * 60 * 24);
  },

  getDaily(key) {
    return storage.getItem(`daily:${key}`);
  }
};

// 6. 与 API 请求结合
async function fetchWithCache(url, options = {}) {
  const { cacheTime = 60000, forceRefresh = false } = options;
  const cacheKey = `api:${url}`;

  // 尝试从缓存读取
  if (!forceRefresh) {
    const cached = storage.getItem(cacheKey);
    if (cached) {
      console.log('使用缓存数据');
      return cached;
    }
  }

  // 发起请求
  const response = await fetch(url);
  const data = await response.json();

  // 存入缓存
  if (cacheTime > 0) {
    storage.setItem(cacheKey, data, cacheTime);
  }

  return data;
}

// 7. React Hook 封装
function useLocalStorage(key, defaultValue, expires) {
  const [value, setValue] = useState(() => {
    return storage.getItem(key, defaultValue);
  });

  const setStoredValue = useCallback((newValue) => {
    setValue(newValue);
    storage.setItem(key, newValue, expires);
  }, [key, expires]);

  const removeValue = useCallback(() => {
    setValue(defaultValue);
    storage.removeItem(key);
  }, [key, defaultValue]);

  return [value, setStoredValue, removeValue];
}

// 使用
function UserProfile() {
  const [user, setUser, clearUser] = useLocalStorage('user', null, 1000 * 60 * 60 * 24);

  return (
    <div>
      {user ? (
        <div>
          <p>欢迎, {user.name}</p>
          <button onClick={clearUser}>退出</button>
        </div>
      ) : (
        <button onClick={() => setUser({ name: '张三' })}>登录</button>
      )}
    </div>
  );
}
```

### 进阶：带版本控制的 Storage

```javascript
class VersionedStorage extends ExpirableStorage {
  constructor(options = {}) {
    super(options.storage);
    this.version = options.version || '1.0';
    this.checkVersion();
  }

  checkVersion() {
    const storedVersion = this.storage.getItem('storage_version');

    if (storedVersion !== this.version) {
      // 版本不一致，清理旧数据
      this.clear();
      this.storage.setItem('storage_version', this.version);
    }
  }

  setItem(key, value, expires) {
    const data = {
      value,
      expires: expires ? Date.now() + expires : null,
      version: this.version,
      created: Date.now()
    };

    this.storage.setItem(this.prefix + key, JSON.stringify(data));
  }
}

// 使用：应用升级时自动清理缓存
const storage = new VersionedStorage({ version: '2.0' });
```

---

## 52. 大对象深度对比实现

### 实现思路

深度对比两个对象是否相等，需要考虑：
1. 基本类型直接比较
2. 日期、正则等特殊对象
3. 循环引用检测
4. 性能优化（提前退出）

```javascript
/**
 * 深度比较两个值是否相等
 * @param {*} obj1
 * @param {*} obj2
 * @returns {boolean}
 */
function deepEqual(obj1, obj2) {
  // 1. 同一引用
  if (obj1 === obj2) return true;

  // 2. 都是 null 或 undefined
  if (obj1 == null || obj2 == null) return obj1 === obj2;

  // 3. 类型不同
  if (typeof obj1 !== typeof obj2) return false;

  // 4. 基本类型
  if (typeof obj1 !== 'object') return obj1 === obj2;

  // 5. 不同类型对象
  if (obj1.constructor !== obj2.constructor) return false;

  // 6. 日期
  if (obj1 instanceof Date) return obj1.getTime() === obj2.getTime();

  // 7. 正则
  if (obj1 instanceof RegExp) return obj1.toString() === obj2.toString();

  // 8. Map
  if (obj1 instanceof Map) {
    if (obj1.size !== obj2.size) return false;
    for (const [key, val] of obj1) {
      if (!obj2.has(key) || !deepEqual(val, obj2.get(key))) return false;
    }
    return true;
  }

  // 9. Set
  if (obj1 instanceof Set) {
    if (obj1.size !== obj2.size) return false;
    const arr1 = [...obj1];
    const arr2 = [...obj2];
    return arr1.every(item => arr2.some(item2 => deepEqual(item, item2)));
  }

  // 10. 数组
  if (Array.isArray(obj1)) {
    if (obj1.length !== obj2.length) return false;
    return obj1.every((item, index) => deepEqual(item, obj2[index]));
  }

  // 11. 普通对象
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  // 检查所有键
  for (const key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}

// 使用示例
const obj1 = { a: 1, b: { c: [1, 2, 3] } };
const obj2 = { a: 1, b: { c: [1, 2, 3] } };
console.log(deepEqual(obj1, obj2)); // true

// 处理循环引用
function deepEqualWithCycle(obj1, obj2, visited = new WeakMap()) {
  if (obj1 === obj2) return true;
  if (obj1 == null || obj2 == null) return obj1 === obj2;
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;

  // 检查是否已访问
  if (visited.has(obj1)) {
    return visited.get(obj1) === obj2;
  }

  visited.set(obj1, obj2);

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!deepEqualWithCycle(obj1[key], obj2[key], visited)) return false;
  }

  return true;
}

// 循环引用测试
const a = { x: 1 };
a.self = a;
const b = { x: 1 };
b.self = b;
console.log(deepEqualWithCycle(a, b)); // true
```

---

## 53. JS 执行 100 万任务不卡顿

### 解决方案

使用 `requestIdleCallback` 或 `requestAnimationFrame` 分片执行任务，避免阻塞主线程。

```javascript
/**
 * 分片执行任务
 * @param {Array} tasks - 任务列表
 * @param {Function} executor - 任务执行函数
 * @param {Object} options - 配置
 */
function runTasksInChunks(tasks, executor, options = {}) {
  const { chunkSize = 100, onProgress, onComplete } = options;
  let index = 0;

  function runChunk(deadline) {
    while (index < tasks.length && deadline.timeRemaining() > 0) {
      // 执行一批任务
      const chunk = tasks.slice(index, index + chunkSize);
      chunk.forEach(task => executor(task, index));
      index += chunk.length;

      // 进度回调
      if (onProgress) {
        onProgress(index, tasks.length);
      }
    }

    if (index < tasks.length) {
      // 还有任务，继续调度
      requestIdleCallback(runChunk);
    } else {
      // 完成
      if (onComplete) onComplete();
    }
  }

  requestIdleCallback(runChunk);
}

// 使用示例：处理 100 万条数据
const bigData = new Array(1000000).fill(0).map((_, i) => i);

runTasksInChunks(
  bigData,
  (item, index) => {
    // 处理单个任务
    console.log(`Processing: ${item}`);
  },
  {
    chunkSize: 1000,
    onProgress: (completed, total) => {
      const percent = ((completed / total) * 100).toFixed(2);
      console.log(`Progress: ${percent}%`);
    },
    onComplete: () => {
      console.log('All tasks completed!');
    }
  }
);

/**
 * 使用 Web Worker 处理大任务
 */
// worker.js
self.onmessage = function(e) {
  const { tasks, startIndex } = e.data;
  const results = [];

  for (let i = 0; i < tasks.length; i++) {
    // 耗时计算
    const result = heavyComputation(tasks[i]);
    results.push(result);
  }

  self.postMessage({ results, startIndex });
};

function heavyComputation(data) {
  // 模拟复杂计算
  let result = 0;
  for (let i = 0; i < 1000; i++) {
    result += Math.sqrt(data + i);
  }
  return result;
}

// 主线程
class WorkerPool {
  constructor(workerScript, poolSize = 4) {
    this.workers = [];
    this.queue = [];
    this.results = [];

    for (let i = 0; i < poolSize; i++) {
      const worker = new Worker(workerScript);
      worker.onmessage = (e) => this.handleMessage(e);
      this.workers.push({
        worker,
        busy: false
      });
    }
  }

  handleMessage(e) {
    const { results, startIndex } = e.data;
    this.results[startIndex] = results;

    // 标记 worker 为空闲
    const workerInfo = this.workers.find(w => w.busy);
    if (workerInfo) workerInfo.busy = false;

    // 继续处理队列
    this.processQueue();
  }

  processQueue() {
    if (this.queue.length === 0) return;

    const availableWorker = this.workers.find(w => !w.busy);
    if (!availableWorker) return;

    const task = this.queue.shift();
    availableWorker.busy = true;
    availableWorker.worker.postMessage(task);
  }

  execute(tasks) {
    const chunkSize = Math.ceil(tasks.length / this.workers.length);

    for (let i = 0; i < tasks.length; i += chunkSize) {
      this.queue.push({
        tasks: tasks.slice(i, i + chunkSize),
        startIndex: i
      });
    }

    this.processQueue();
  }
}

// 使用 Worker Pool
const pool = new WorkerPool('worker.js', 4);
pool.execute(bigData);
```

---

## 54. documentFragment API 是什么，有哪些使用场景？

### documentFragment 是什么

`DocumentFragment` 是 DOM 中的一个轻量级文档对象，它表示一个没有父节点的最小文档对象。与真实的 DOM 节点不同，`DocumentFragment` **不会出现在 DOM 树中**，仅存在于内存中。

### 核心特点

1. **轻量级**：不占用实际 DOM 资源
2. **无父节点**：不会出现在文档流中
3. **批量操作**：可以批量添加子节点后一次性插入 DOM
4. **自动清空**：插入 DOM 后，自身内容自动清空

### 使用场景

**1. 批量 DOM 操作（最常用）**

```javascript
// ❌ 低效：每次循环都触发重排
for (let i = 0; i < 1000; i++) {
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  list.appendChild(li); // 触发 1000 次重排
}

// ✅ 高效：使用 DocumentFragment 批量插入
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  fragment.appendChild(li); // 不触发重排
}
list.appendChild(fragment); // 只触发 1 次重排
```

**2. 提取文档片段**

```javascript
// 从现有 DOM 中提取部分内容
const range = document.createRange();
range.selectNodeContents(document.getElementById('content'));
const fragment = range.extractContents();

// 可以修改 fragment 后再插入
fragment.querySelectorAll('a').forEach(a => {
  a.setAttribute('target', '_blank');
});
document.getElementById('newContainer').appendChild(fragment);
```

**3. 模板渲染**

```javascript
function renderList(data) {
  const fragment = document.createDocumentFragment();

  data.forEach(item => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
    `;
    fragment.appendChild(div);
  });

  return fragment;
}

// 使用
const data = [{ title: 'A', desc: 'Desc A' }, { title: 'B', desc: 'Desc B' }];
container.appendChild(renderList(data));
```

### 性能对比

| 操作方式 | 1000 个节点耗时 | 重排次数 |
|---------|---------------|---------|
| 直接插入 | ~150ms | 1000 次 |
| DocumentFragment | ~15ms | 1 次 |
| innerHTML | ~20ms | 1 次 |

### 现代替代方案

```javascript
// 使用 innerHTML（简单场景）
const html = data.map(item => `<li>${item}</li>`).join('');
list.innerHTML = html;

// 使用 cloneNode（模板复用）
const template = document.getElementById('item-template');
const fragment = document.createDocumentFragment();
data.forEach(item => {
  const clone = template.content.cloneNode(true);
  clone.querySelector('.title').textContent = item.title;
  fragment.appendChild(clone);
});
```

---

## 55. V8 里面的 JIT 是什么？

### JIT 概述

**JIT（Just-In-Time Compilation，即时编译）** 是一种在程序运行时将字节码编译为机器码的技术。V8 引擎使用 JIT 来加速 JavaScript 的执行。

### V8 的编译演进

```
早期 V8：
源代码 → AST → 机器码（直接编译，无中间字节码）

现代 V8（2017+）：
源代码 → AST → 字节码 → 解释执行 → 热点代码 → 优化机器码
```

### V8 的 JIT 编译器架构

**1. Ignition（解释器）**

```javascript
// 所有代码首先被 Ignition 解释执行
function add(a, b) {
  return a + b;
}
// 生成紧凑的字节码，快速启动，内存友好
```

**2. TurboFan（优化编译器）**

```javascript
// 热点代码会被 TurboFan 优化编译
// 基于类型反馈生成高度优化的机器码

// 假设多次调用都是数字类型
add(1, 2);
add(3, 4);
add(5, 6);

// TurboFan 推测类型为数字，生成优化代码
// 但如果后续传入字符串：add("a", "b")
// 会触发反优化（deoptimization）
```

### 优化过程详解

```javascript
function sum(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
}

// 执行阶段 1：解释执行（Ignition）
sum([1, 2, 3]); // 收集类型信息

// 执行阶段 2：优化编译（TurboFan）
// 假设 arr 总是 number[]，total 总是 number
// 生成优化的机器码

// 执行阶段 3：如果类型假设失效
sum(["a", "b", "c"]); // 触发反优化，回退到解释器
```

### 关键概念

| 概念 | 说明 |
|-----|------|
| **隐藏类（Hidden Class）** | 优化对象属性访问，类似静态语言的类 |
| **内联缓存（Inline Cache）** | 缓存属性查找结果，加速重复访问 |
| **类型反馈（Type Feedback）** | 收集运行时类型信息，指导优化 |
| **反优化（Deoptimization）** | 当假设失效时回退到解释执行 |

### 隐藏类示例

```javascript
// V8 为对象创建隐藏类
const p1 = { x: 1, y: 2 };    // 创建隐藏类 C0
const p2 = { x: 3, y: 4 };    // 复用隐藏类 C0（快）

const p3 = { x: 5 };          // 创建隐藏类 C1（不同形状）
p3.y = 6;                     // 转换到隐藏类 C2（慢）

// 最佳实践：固定属性初始化顺序
class Point {
  constructor(x, y) {
    this.x = x;  // 总是先初始化 x
    this.y = y;  // 总是再初始化 y
  }
}
```

### JIT 优化技巧

```javascript
// ✅ 有利于 JIT 优化
function optimized(arr) {
  const len = arr.length;  // 缓存长度
  let sum = 0;
  for (let i = 0; i < len; i++) {
    sum += arr[i];  // 单一类型操作
  }
  return sum;
}

// ❌ 难以优化
function notOptimized(obj) {
  let result = 0;
  for (let key in obj) {  // 对象形状不确定
    result += obj[key];   // 类型不确定
  }
  return result;
}
```

---

## 56. 在 JS 中，如何解决递归导致栈溢出问题？

### 栈溢出的原因

```javascript
// 递归调用过深导致栈溢出
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);  // 每层都占用栈空间
}

factorial(100000);  // RangeError: Maximum call stack size exceeded
```

### 解决方案

**1. 尾递归优化（ES6，需引擎支持）**

```javascript
// 尾递归：递归调用是函数的最后一个操作
function factorial(n, acc = 1) {
  if (n <= 1) return acc;
  return factorial(n - 1, n * acc);  // 尾调用
}

// 严格模式下部分引擎会优化为循环
'use strict';
function tailFactorial(n, acc = 1) {
  if (n <= 1) return acc;
  return tailFactorial(n - 1, n * acc);
}

// 注意：目前仅 Safari 支持尾递归优化
```

**2. 迭代替代（推荐）**

```javascript
// 将递归改写为循环
function factorialIterative(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// 树形结构遍历 - 递归改迭代
function traverseTree(root) {
  const stack = [root];
  const result = [];

  while (stack.length > 0) {
    const node = stack.pop();
    result.push(node.value);

    // 子节点入栈
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }

  return result;
}
```

**3. Trampoline（蹦床函数）**

```javascript
// 将递归转为循环执行
function trampoline(fn) {
  return function(...args) {
    let result = fn.apply(this, args);
    while (typeof result === 'function') {
      result = result();
    }
    return result;
  };
}

// 改写递归函数返回 thunk
const sum = trampoline(function f(n, acc = 0) {
  if (n <= 0) return acc;
  return () => f(n - 1, acc + n);  // 返回函数而非直接调用
});

console.log(sum(100000));  // 5000050000，不会栈溢出
```

**4. 基于 Generator 的惰性求值**

```javascript
function* factorialGen(n, acc = 1) {
  if (n <= 1) {
    yield acc;
    return;
  }
  yield* factorialGen(n - 1, n * acc);
}

// 使用
const gen = factorialGen(100000);
const result = gen.next().value;
```

**5. 异步递归（利用事件循环）**

```javascript
async function asyncRecursive(n, acc = 1) {
  if (n <= 1) return acc;

  // 让出主线程，清空调用栈
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(asyncRecursive(n - 1, n * acc));
    }, 0);
  });
}

// 或使用 setImmediate（Node.js）
const { setImmediate } = require('timers');

function asyncRecursion(n, callback, acc = 1) {
  if (n <= 1) {
    callback(acc);
    return;
  }

  setImmediate(() => {
    asyncRecursion(n - 1, callback, n * acc);
  });
}
```

**6. Web Worker（多线程）**

```javascript
// worker.js
self.onmessage = function(e) {
  const n = e.data;
  const result = compute(n);
  self.postMessage(result);
};

function compute(n) {
  // 在独立线程中执行，有独立的调用栈
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// main.js
const worker = new Worker('worker.js');
worker.postMessage(100000);
worker.onmessage = function(e) {
  console.log('Result:', e.data);
};
```

### 方案对比

| 方案 | 优点 | 缺点 | 适用场景 |
|-----|------|------|---------|
| 尾递归 | 代码优雅 | 支持有限 | 简单递归 |
| 迭代 | 性能好，无栈限制 | 改写复杂 | 树遍历等 |
| Trampoline | 保持递归语义 | 额外包装 | 复杂递归 |
| Generator | 惰性求值 | 速度较慢 | 流式处理 |
| 异步递归 | 不阻塞主线程 | 慢，代码复杂 | 超深递归 |
| Web Worker | 真正的并行 | 通信开销 | 计算密集型 |

---

## 57. HTML5 的离线存储如何工作？

### 离线存储方案对比

| 特性 | Cookie | localStorage | sessionStorage | IndexedDB |
|------|--------|-------------|----------------|----------|
| 存储大小 | 4KB | 5-10MB | 5-10MB | >250MB |
| 生命周期 | 可设置过期时间 | 永久存储 | 会话结束时清除 | 永久存储 |
| 与服务器通信 | 每次 HTTP 请求都会携带 | 不会自动发送 | 不会自动发送 | 不会自动发送 |
| 使用场景 | 身份验证、追踪 | 本地缓存 | 临时数据 | 大量结构化数据 |

### localStorage 使用示例

```javascript
// 存储数据
localStorage.setItem('username', '张三');
localStorage.setItem('userInfo', JSON.stringify({ name: '张三', age: 25 }));

// 读取数据
const username = localStorage.getItem('username');
const userInfo = JSON.parse(localStorage.getItem('userInfo'));

// 删除数据
localStorage.removeItem('username');

// 清空所有数据
localStorage.clear();
```

### Service Worker 离线缓存

Service Worker 是 HTML5 提供的更强大的离线存储方案，可以拦截网络请求并缓存资源。

**特点**：
1. 运行在独立的线程中，不会阻塞主线程
2. 可以完全控制页面的网络请求
3. 支持离线访问和后台同步
4. 必须在 HTTPS 环境下使用

## 58. JS 超过 Number 最大值的数怎么处理？

### Number类型的限制

```javascript
// JavaScript的Number类型使用IEEE 754双精度浮点数
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991 (2^53 - 1)
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991 (-(2^53 - 1))
console.log(Number.MAX_VALUE);        // 1.7976931348623157e+308

// 超过MAX_SAFE_INTEGER的精度问题
console.log(9007199254740991 + 1); // 9007199254740992
console.log(9007199254740991 + 2); // 9007199254740992 (精度丢失！)
```

### 处理方案

**1. 使用BigInt**

```javascript
// ES2020引入的BigInt类型
const bigNum = 9007199254740993n;
console.log(bigNum); // 9007199254740993n

// BigInt可以表示任意精度的整数
const a = BigInt(Number.MAX_SAFE_INTEGER);
const b = BigInt(1);
console.log(a + b + b); // 9007199254740993n

// 运算
const x = 123456789012345678901234567890n;
const y = 987654321098765432109876543210n;

console.log(x + y);  // 加法
console.log(x - y);  // 减法
console.log(x * y);  // 乘法
console.log(x / y);  // 除法（返回商，向零截断小数部分，注意负数与 floor 不同）
console.log(x % y);  // 取模

// BigInt与Number不能混用
// console.log(10n + 5); // TypeError!
console.log(10n + BigInt(5)); // 15n
console.log(Number(10n) + 5); // 15
```

**2. 使用第三方库（Decimal.js）**

```javascript
// decimal.js处理高精度小数
const Decimal = require('decimal.js');

const a = new Decimal('0.1');
const b = new Decimal('0.2');
console.log(a.plus(b).toString()); // '0.3'

// 处理超大数字
const big = new Decimal('999999999999999999999999999999');
console.log(big.plus(1).toString()); // '1000000000000000000000000000000'
```

**3. 字符串处理**

```javascript
// 大数相加（字符串模拟）
function addStrings(a, b) {
  let result = '';
  let carry = 0;

  let i = a.length - 1;
  let j = b.length - 1;

  while (i >= 0 || j >= 0 || carry > 0) {
    const digitA = i >= 0 ? parseInt(a[i]) : 0;
    const digitB = j >= 0 ? parseInt(b[j]) : 0;

    const sum = digitA + digitB + carry;
    result = (sum % 10) + result;
    carry = Math.floor(sum / 10);

    i--;
    j--;
  }

  return result;
}

console.log(addStrings('999999999999999999', '1'));
// '1000000000000000000'
```

**4. 使用bignumber.js库**

```javascript
const BigNumber = require('bignumber.js');

// 创建大数
const x = new BigNumber('123456789012345678901234567890.123456789');

// 链式计算
const result = x
  .plus(1)
  .multipliedBy(2)
  .dividedBy(3)
  .toFixed(6);

console.log(result);
```

### 选择建议

| 场景 | 推荐方案 |
|------|----------|
| 整数运算 | BigInt（原生支持） |
| 高精度小数 | decimal.js / bignumber.js |
| 金融计算 | bignumber.js（支持更多配置） |
| 简单字符串大数 | 自定义字符串处理 |

---

