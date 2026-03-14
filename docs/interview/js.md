---
sidebar_position: 1
title: JavaScript（面试要点）
---

# JavaScript 面试要点

## 目录
- [ES6有哪些新特性？](#1-es6有哪些新特性)
- [延迟加载JS有哪些方式？](#2-延迟加载js有哪些方式)
- [JS数据类型有哪些？](#3-js数据类型有哪些)
- [JS数据类型考题](#4-js数据类型考题)
- [null和undefined有什么区别？](#5-null和undefined有什么区别)
- [JS事件循环机制是怎样的？](#6-js事件循环机制是怎样的)
- [JS微任务和宏任务有什么区别？](#7-js微任务和宏任务有什么区别)
- [JS作用域是什么？](#8-js作用域是什么)
- [this指向问题](#9-this指向问题)
- [JS判断变量是不是数组有哪些方法？](#10-js判断变量是不是数组有哪些方法)
- [slice、splice有什么区别？是否会改变原数组？](#11-slicesplice有什么区别是否会改变原数组)
- [数组(array)有哪些方法？](#12-数组array有哪些方法)
- [数组扁平化有哪些方法？](#13-数组扁平化有哪些方法)
- [字符串有哪些方法？](#14-字符串有哪些方法)
- [防抖和节流的区别及实现](#15-防抖和节流的区别及实现)
- [Ajax、Fetch和Axios的区别](#16-ajaxfetch和axios的区别)
- [深拷贝和浅拷贝的区别及实现](#17-深拷贝和浅拷贝的区别及实现)
- [原型和原型链](#18-原型和原型链)
- [闭包的概念和应用场景](#19-闭包的概念和应用场景)
- [JS数组去重有哪些方法？](#js数组去重有哪些方法)
- [new操作符具体做了什么？](#20-new操作符具体做了什么)
- [闭包是什么？](#21-闭包是什么)
- [内存泄漏的原因有哪些？](#22-内存泄漏的原因有哪些)
- [原型和原型链是什么？](#23-原型和原型链是什么)
- [JS继承有哪些方式？](#24-js继承有哪些方式)
- [call、apply、bind有什么区别？](#25-callapplybind有什么区别)
- [sort背后原理是什么？](#26-sort背后原理是什么)
- [深拷贝和浅拷贝有什么区别？](#27-深拷贝和浅拷贝有什么区别)
- [js变量和函数声明的提升是什么？](#28-js变量和函数声明的提升是什么)
- [map与forEach有什么区别？](#29-map与foreach有什么区别)
- [script 引入方式有哪些？](#30-script-引入方式有哪些)
- [var、let、const有什么区别？](#31-varletconst有什么区别)
- [作用域和作用域链是什么？](#32-作用域和作用域链是什么)
- [如何将对象进行合并？](#33-如何将对象进行合并)
- [箭头函数和普通函数有什么区别？](#34-箭头函数和普通函数有什么区别)
- [Promise函数是什么？](#35-promise函数是什么)
- [回调地狱是什么？](#36-回调地狱是什么)
- [js防抖与节流是什么？](#37-js防抖与节流是什么)
- [如何用原生JS实现事件委托？](#38-如何用原生js实现事件委托)
- [判断数组是否为空有哪些方法？](#39-判断数组是否为空有哪些方法)
- [for in 和for of有什么区别？](#40-for-in-和for-of有什么区别)
- [判断空对象有哪些方法？](#41-判断空对象有哪些方法)
- [async/await 和 Promise 有什么区别？](#42-asyncawait-和-promise-有什么区别)
- [暂时性死区是什么？](#43-暂时性死区是什么)
- [ajax 实现原理以及和 fetch 有什么区别？](#44-ajax-实现原理以及和-fetch-有什么区别)
- [虚拟DOM是什么？](#45-虚拟dom是什么)
- [diff 算法是什么？](#46-diff-算法是什么)
- [前端埋点统计有哪些方案？](#47-前端埋点统计有哪些方案)
- [如何实现JS异常监控与上报？](#48-如何实现js异常监控与上报)
- [ES6函数默认参数是什么？如何使用？](#49-es6函数默认参数是什么如何使用)
- [ES6展开运算符（Spread Operator）是什么？有哪些用法？](#50-es6展开运算符spread-operator是什么有哪些用法)
- [ES6 Proxy是什么？有什么作用？](#51-es6-proxy是什么有什么作用)
- [ES6 Reflect是什么？有什么作用？](#52-es6-reflect是什么有什么作用)

---

## 1. ES6有哪些新特性？

### 1. let 和 const：替代 var，解决变量提升和块级作用域问题。

**特点：**

- **let**：声明块级作用域变量（仅在 {} 内有效）。
- **const**：声明常量（不可重新赋值，但对象属性可修改）

**与var的区别：**

- **作用域**：var是函数作用域，let/const是块级作用域
- **变量提升**：var会提升到函数顶部并初始化为undefined，let/const会提升但不会初始化
- **重复声明**：var允许重复声明，let/const不允许
- **暂时性死区**：let/const在声明前访问会报错

### 2. 箭头函数（Arrow Functions）有什么优势？

**特点：**

- 省略 function 关键字。
- 参数和函数体之间用 => 连接。
- 箭头函数没有自己的 this，继承外层作用域的 this。
- 不能用作构造函数（没有prototype属性）
- 不能使用arguments对象

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

## 2. 延迟加载JS有哪些方式？

### 1. 动态脚本加载（Dynamic Script Loading）：通过 JavaScript 动态创建 `<script>` 标签，并设置 src 属性，在需要时加载脚本。

**特点：**

- 灵活控制加载时机。
- 支持回调函数或 Promise 处理加载完成事件。

```javascript
// 动态加载脚本的通用函数
function loadScript(src, callback) {
  const script = document.createElement('script');
  script.src = src;
  
  script.onload = () => {
    if (callback) callback();
  };
  
  script.onerror = () => {
    console.error(`Failed to load script: ${src}`);
    if (callback) callback(new Error(`Failed to load script: ${src}`));
  };
  
  document.head.appendChild(script);
}

// 使用 Promise 的版本
function loadScriptAsync(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    
    script.onload = resolve;
    script.onerror = reject;
    
    document.head.appendChild(script);
  });
}

// 使用示例
loadScript('/path/to/script.js', (error) => {
  if (error) {
    console.error('Script loading failed');
  } else {
    console.log('Script loaded successfully');
  }
});

// 使用 async/await
async function loadMyScript() {
  try {
    await loadScriptAsync('/path/to/script.js');
    console.log('Script loaded successfully');
  } catch (error) {
    console.error('Script loading failed', error);
  }
}
```

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
  .catch(err => console.error('Failed to load script'));
```

### 2. async 和 defer 属性有什么区别？

**async：**

- 脚本异步加载，不阻塞页面渲染。
- 加载完成后立即执行（可能打乱执行顺序）。
- 适用于独立的脚本，不依赖其他脚本。

```html
<script async src="script.js"></script>
```

**defer：**

- 脚本异步加载，但在 HTML 解析完成后按顺序执行。
- 适合依赖其他脚本的代码。

```html
<script defer src="script.js"></script>
```

### 3. 代码分割和动态导入如何实现？

- 使用 Webpack、Rollup 等工具将代码分割为多个 chunk。
- 通过 import() 动态导入模块，按需加载。

**特点：**

- 减少初始加载体积。
- 支持 Tree Shaking（移除未使用代码）。

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

### 4. Intersection Observer API 如何使用？

用于实现滚动加载或视口内加载：

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
console.log({} + []); // 0 (在某些环境中，{}被解析为代码块)
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
9. **{} + []**：在某些环境中，前面的 {} 会被解析为代码块而不是对象，所以结果可能是 0。
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

## 6. JS事件循环机制是怎样的？

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

## 7. JS微任务和宏任务有什么区别？

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

## 8. JS作用域是什么？

| 特性 | 全局作用域 | 函数作用域 | 块级作用域 |
|------|------------|------------|------------|
| 声明方式 | 函数或代码块外部 | 函数内部 | {} 代码块内部 |
| 关键字 | var、let、const | var（ES5） | let、const（ES6） |
| 访问范围 | 任何地方 | 函数内部 | 代码块内部 |

- **全局作用域**：变量在代码的任何地方可访问。
- **函数作用域**：var 声明的变量在函数内部有效。
- **块级作用域**：let 和 const 声明的变量在 {} 内部有效。
- **词法作用域**：函数的作用域是定义时的父作用域。
- **闭包**：函数可以访问并记住其词法作用域。

### 作用域示例：

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

## 9. this指向问题

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

## 10. JS判断变量是不是数组有哪些方法？

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

## 11. slice、splice有什么区别？是否会改变原数组？

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

## 12. 数组(array)有哪些方法？

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

- isArray() - 检查是否为数组
- Observable - 在RxJS等库中的响应式数组方法

```javascript
// isArray
console.log(Array.isArray([1, 2, 3])); // true
console.log(Array.isArray({})); // false
```

## 13. 数组扁平化有哪些方法？

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

## 14. 字符串有哪些方法？

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

- str.slice(start, end) (JS)
- str[start:end] (Python)

**分割字符串：**

- str.split(delimiter) - 按分隔符分割为数组
- str.partition(sep) - 分割为三部分 (Python)
- 连接数组：array.join(separator) - 将数组元素连接为字符串

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

- Python: `{} {}`.format(arg1, arg2) 或 f-string `f"{var}"`
- JS: 模板字符串 `Hello ${name}`

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
```

## 15. 防抖和节流的区别及实现

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

## 16. Ajax、Fetch和Axios的区别

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
- 不会自动携带cookie（需要设置credentials）
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
- 支持防御CSRF

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

## 17. 深拷贝和浅拷贝的区别及实现

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
    return new RegExp(obj.source, obj.flags);
  }
  
  // 处理函数
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

### 浅拷贝 vs 深拷贝对比

| 特性 | 浅拷贝 | 深拷贝 |
|------|--------|--------|
| 复制层级 | 只复制第一层 | 递归复制所有层级 |
| 引用类型 | 共享引用 | 完全独立 |
| 性能 | 快 | 慢（需要递归） |
| 内存占用 | 小 | 大 |
| 实现难度 | 简单 | 复杂（需处理多种情况） |
| 适用场景 | 简单对象、临时副本 | 复杂对象、完全独立副本 |

## 18. 原型和原型链

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

## 19. 闭包的概念和应用场景

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

---
console.log(!isNaN(parseFloat(str))); // false - parseFloat("Hello") 返回 NaN
console.log(Number.isInteger(Number(str))); // false - Number("Hello") 返回 NaN
```

说明：
- 使用 str.split('').every() 结合字符范围检查来验证字符串是否全是字母
- 使用 str.split('').every() 结合字符范围检查来验证字符串是否全是数字
- 使用 str.split('').every() 结合字符范围检查来验证字符串是否全是字母或数字
- 使用 isNaN() 函数检查字符串是否不是数字（注意：空字符串和空白字符会返回false）
- 使用 !isNaN(parseFloat()) 检查字符串是否是数字
- 使用 Number.isInteger() 检查字符串是否是整数

**编码转换：**

- encodeURIComponent(str) - URL编码
- decodeURIComponent(str) - URL解码

**字符串原生编码方法：**

- str.charCodeAt(index) - 获取指定位置字符的Unicode编码
- String.fromCharCode(num1, ..., numN) - 根据Unicode编码返回字符串
- str.codePointAt(pos) - 获取指定位置字符的UTF-16码元
- String.fromCodePoint(codePoint1, ..., codePointN) - 根据码点返回字符串

**字符串比较：**

- 直接使用比较运算符 (==, !=, >, < 等)
- localeCompare() 方法进行本地化比较

## JS数组去重有哪些方法？

### 1. 使用 Set（ES6+）

**原理**：Set 是 ES6 引入的一种数据结构，它类似于数组，但成员的值都是唯一的，没有重复的值。

```javascript
const array = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = [...new Set(array)];
console.log(uniqueArray); // 输出: [1, 2, 3, 4, 5]
```

### 2. 使用 filter 和 indexOf

**原理**：通过 filter 方法遍历数组，使用 indexOf 检查当前元素在数组中第一次出现的位置是否等于当前索引，如果是，则保留该元素。

```javascript
const array = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = array.filter((item, index) => array.indexOf(item) === index);
console.log(uniqueArray); // 输出: [1, 2, 3, 4, 5]
```

### 3. 使用 reduce

**原理**：通过 reduce 方法遍历数组，将不重复的元素添加到结果数组中。

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

### 4. 使用对象属性（适用于简单数据类型）

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

### 5. 使用 Map（适用于复杂数据类型）

**原理**：Map 是 ES6 引入的另一种数据结构，它保存键值对，并且能够记住键的原始插入顺序。可以利用 Map 的键唯一性来实现数组去重。

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

### 方法 1：使用 Map

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

### 方法 2：使用 filter + Set

```javascript
const objects = [
{id: 1, name: 'Alice' },
{id: 2, name: 'Bob' },
{id: 1, name: 'Alice' }, // 重复的 id
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

### 4. 处理混合类型数组

Set 可以正确处理混合类型（如数字、字符串、布尔值等）：

```javascript
const mixedArray = [1, '1', true, false, true, 'hello', 'hello'];
const uniqueMixedArray = [...new Set(mixedArray)];
console.log(uniqueMixedArray); // 输出: [1, '1', true, false, 'hello']
```

### 5. 自定义去重逻辑（结合 Set 和 reduce）

如果需要更复杂的去重逻辑（如忽略大小写），可以结合 reduce：

```javascript
const strings = ['Apple', 'apple', 'Banana', 'banana'];
const uniqueStrings = strings.reduce((acc, current) => {
  if (!acc.seen.has(current.toLowerCase())) {
    acc.seen.add(current.toLowerCase());
    acc.list.push(current); // 保留原始值
  }
  return acc;
}, { list: [], seen: new Set() }).list;

console.log(uniqueStrings); // 输出: ['Apple', 'Banana']（忽略大小写）
```

### 6. 性能优化：直接操作 Set

如果不需要返回数组，直接使用 Set 会更高效：

```javascript
const array = [1, 2, 2, 3, 4, 4, 5];
const uniqueSet = new Set(array);
console.log(uniqueSet); // 输出: Set {1, 2, 3, 4, 5}
```

## 20. new操作符具体做了什么？

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

## 21. 闭包是什么？

闭包是一个函数及其引用其外部作用域变量的组合。当一个函数可以记住并访问其词法作用域，即使该函数在其词法作用域之外执行时，就产生了闭包。

### 闭包的形成条件：

1. 函数嵌套
2. 内部函数引用外部函数的变量
3. 外部函数被调用并返回内部函数

### 闭包示例：

```javascript
function outerFunction(x) {
  // 外部函数的变量
  const outerVariable = x;
  
  // 内部函数
  function innerFunction(y) {
    // 访问外部函数的变量
    console.log(outerVariable + y);
  }
  
  // 返回内部函数
  return innerFunction;
}

const closure = outerFunction(10);
closure(5); // 输出: 15
```

### 闭包的实际应用场景：

1. **数据封装和私有变量**：

```javascript
function createCounter() {
  let count = 0;
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2
```

2. **回调函数**：

```javascript
function attachEventListener() {
  const button = document.getElementById('myButton');
  let clickCount = 0;
  
  button.addEventListener('click', function() {
    // 闭包保留了对 clickCount 的引用
    clickCount++;
    console.log(`按钮被点击了 ${clickCount} 次`);
  });
}
```

3. **函数工厂**：

```javascript
function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

### 1. 数据封装和私有变量

闭包可以用来创建私有变量，限制对某些变量的访问。

### 2. 回调函数

闭包在异步编程中非常常见，尤其是在回调函数中保留上下文。

### 3. 函数工厂

闭包可以用来创建函数工厂，根据不同的参数生成不同的函数。

### 闭包的注意事项

### 内存泄漏

闭包可能会导致内存泄漏，因为闭包会保留对其外部作用域的引用，即使这些变量不再需要。

### 性能影响

闭包可能会对性能产生一定影响，尤其是在大量使用闭包的情况下，因为闭包会占用额外的内存。

## 22. 内存泄漏的原因有哪些？

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

## 23. 原型和原型链是什么？

**原型**：每个 JavaScript 对象都有一个隐藏的 [[Prototype]] 属性（可通过 __proto__ 或 Object.getPrototypeOf() 访问），指向另一个对象（即原型对象）。原型对象包含可被所有实例共享的属性和方法。

**原型链**：当访问对象的属性或方法时，JavaScript 会沿着对象的 [[Prototype]] 链向上查找，直到找到该属性或到达 null（原型链的终点）。这一过程称为原型链。

### 原型链示例：

```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(`${this.name} makes a sound.`);
};

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

// 设置原型链
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  console.log(`${this.name} barks.`);
};

const dog = new Dog('Rex', 'Labrador');
dog.speak(); // Rex makes a sound.
dog.bark();  // Rex barks.

// 查看原型链
console.log(dog.__proto__ === Dog.prototype); // true
console.log(Dog.prototype.__proto__ === Animal.prototype); // true
console.log(Animal.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__ === null); // true
```

### 原型链查找过程：

1. 当访问 `dog.speak()` 时，JavaScript 首先在 `dog` 对象本身查找 `speak` 方法
2. 如果没找到，会沿着 `dog.__proto__`（即 `Dog.prototype`）查找
3. 如果还没找到，会继续沿着 `Dog.prototype.__proto__`（即 `Animal.prototype`）查找
4. 找到 `speak` 方法后执行，如果一直没找到直到 `null`，则抛出错误

## 24. JS继承有哪些方式？

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

## 25. call、apply、bind有什么区别？

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

## 26. sort背后原理是什么？

V8 引擎 sort 函数只给出了两种排序 InsertionSort 和 QuickSort，数量小于10的数组使用 InsertionSort，比10大的数组则使用 QuickSort。

之前的版本是：插入排序和快排，现在是冒泡

原理实现链接：

https://github.com/v8/v8/blob/ad82a40509c5b5b4680d4299c8f08d6c6d31af3c/src/js/array.js

***710行代码开始***

### 更详细的解释：

1. **InsertionSort（插入排序）**：
   - 适用于小数组（元素少于10个）
   - 时间复杂度：O(n²)
   - 稳定排序算法
   - 在小数组上性能优于快速排序，因为它的常数因子较小

2. **QuickSort（快速排序）**：
   - 适用于大数组（元素大于等于10个）
   - 平均时间复杂度：O(n log n)
   - 最坏情况时间复杂度：O(n²)
   - 不稳定排序算法

3. **排序稳定性**：
   - 当比较元素相等时，V8 的 sort 算法会保持原有顺序
   - 如果提供了比较函数，稳定性取决于比较函数的实现

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

## 27. 深拷贝和浅拷贝有什么区别？

**浅拷贝**：只复制引用，而未复制真正的值。

**深拷贝**：是复制真正的值 （不同引用）

### 浅拷贝实现方式：

```javascript
// Object.assign()
const obj = { a: 1, b: { c: 2 } };
const shallowCopy = Object.assign({}, obj);

// 展开运算符
const shallowCopy2 = { ...obj };

// Array.prototype.slice()
const arr = [1, 2, [3, 4]];
const shallowCopyArr = arr.slice();
```

### 深拷贝实现方式：

```javascript
// 1. JSON.parse(JSON.stringify(obj)) - 有局限性
const obj = { a: 1, b: { c: 2 } };
const deepCopy = JSON.parse(JSON.stringify(obj));

// 2. 递归实现
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  
  const clonedObj = Array.isArray(obj) ? [] : {};
  
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }
  
  return clonedObj;
}

// 3. 使用 lodash.cloneDeep
// const _ = require('lodash');
// const deepCopy = _.cloneDeep(obj);

// 4. structuredClone() 是现代浏览器和 Node.js（v17+）中引入的原生深拷贝 API，它提供了一种简单、高效且标准化的方式来深拷贝 JavaScript 对象。
const original = {
  name: "John",
  age: 30,
  nested: {
    hobbies: ["reading", "coding"],
    address: { city: "New York" }
  },
  createdAt: new Date(),
  regex: /test/g
};

const cloned = structuredClone(original);

console.log(cloned); // 深拷贝后的对象
console.log(cloned !== original); // true
console.log(cloned.nested !== original.nested); // true
```

JSON.parse(JSON.stringify(obj))缺点：
- 无法处理函数、Symbol、undefined
- 会忽略对象的原型链
- 无法处理循环引用
- 无法处理 Date、RegExp 等特殊对象

## 28. js变量和函数声明的提升是什么？

### 1. 变量声明提升

**var 变量：**
- 声明会被提升到作用域顶部，但初始化（赋值）不会被提升。
- 未赋值的 var 变量默认为 undefined。

**let 和 const 变量：**
- 声明会被提升，但不会初始化（进入暂时性死区，访问会报错）。
- 不存在默认值，必须在声明后赋值。

### 2. 函数声明提升

**函数声明（function foo() {}）**会被完全提升（包括函数体）。

**函数表达式（var foo = function() {}）**仅提升变量声明，不提升赋值。

### 3. 提升的优先级

**函数声明优先级高于变量声明**（若同名，函数声明会覆盖变量声明）。

变量赋值会覆盖之前的函数声明。

### 4. 作用域的影响

**提升仅在当前作用域内生效**（全局或函数作用域）。

let/const 的块级作用域会限制提升行为。

### 5. 实际示例

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

// let/const 不会被初始化提升
try {
  console.log(baz); // ReferenceError
} catch(e) {
  console.log(e.message); // "Cannot access 'baz' before initialization"
}
let baz = "World";
```

## 29. map与forEach有什么区别？

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

## 30. script 引入方式有哪些？

### 1. 内联脚本（Inline Script）：
直接在HTML文件中编写JavaScript代码。

**优点**：
- 简单直接，无需额外文件。
- 适用于小型脚本或快速测试。

**缺点**：
- 代码与HTML混合，难以维护。
- 不利于代码复用。

### 2. 外部脚本（External Script）：
通过`<script>`标签的src属性引入外部JavaScript文件。

**优点**：
- 代码与HTML分离，易于维护。
- 利于代码复用和缓存。

**缺点**：
- 需要额外的HTTP请求（如果未缓存）。

### 3. 异步加载（Async Script）：
通过`<script>`标签的async属性异步加载外部脚本，脚本下载完成后立即执行，不阻塞页面渲染。

**优点**：
- 脚本异步加载，不阻塞页面渲染。
- 适合独立脚本（如统计脚本）。

**缺点**：
- 执行顺序不确定，可能影响依赖关系。

### 4. 延迟加载（Defer Script）：
通过`<script>`标签的defer属性延迟加载外部脚本，脚本在HTML解析完成后按顺序执行。

**优点**：
- 脚本延迟加载，不阻塞页面渲染。
- 执行顺序与HTML中定义的顺序一致。

**缺点**：
- 仅适用于外部脚本。

### 5. 动态脚本（Dynamic Script）：
通过JavaScript动态创建`<script>`元素并插入到DOM中。

**优点**：
- 灵活控制脚本加载时机。
- 适合按需加载或条件加载。

**缺点**：
- 实现稍复杂。

### 6. 模块化脚本（Module Script）：
通过`<script>`标签的type="module"属性引入ES6模块。

**优点**：
- 支持ES6模块化，代码组织更清晰。
- 默认延迟加载（类似defer）。

**缺点**：
- 需要现代浏览器支持。
- 模块文件需通过HTTP服务器访问（不能直接通过file://协议）。

### 7. 内联事件处理程序（Inline Event Handler）：
通过HTML元素的on*属性（如onclick）直接绑定JavaScript代码。

```html
<!-- 不推荐的方式 -->
<button onclick="alert('Hello World')">Click me</button>

<!-- 更好的方式 -->
<button id="myButton">Click me</button>
<script>
  document.getElementById('myButton').addEventListener('click', function() {
    alert('Hello World');
  });
</script>
```

### 各种引入方式的比较：

| 方式 | 优点 | 缺点 | 适用场景 |
|------|------|------|----------|
| 内联脚本 | 简单直接 | 难以维护，不利于复用 | 快速测试或小型脚本 |
| 外部脚本 | 易于维护和复用 | 需要额外HTTP请求 | 大多数情况 |
| Async | 不阻塞页面渲染 | 执行顺序不确定 | 独立脚本（如统计） |
| Defer | 不阻塞页面渲染，按顺序执行 | 仅适用于外部脚本 | 需要DOM的脚本 |
| 动态加载 | 灵活控制加载时机 | 实现稍复杂 | 按需加载 |
| 模块化 | 代码组织清晰 | 需要现代浏览器支持 | 现代Web应用 |
| 内联事件 | 简单直接 | 难以维护和复用 | 简单事件处理 |

## 31. var、let、const有什么区别？

| 关键字 | 作用域 | 提升行为 | 重复声明 | 可变性 | 顶层对象属性 | 适用场景 |
|--------|--------|----------|----------|--------|--------------|----------|
| var | 函数/全局 | 声明被提升到作用域顶部，但未初始化（默认值为 undefined）。 | 允许 | 可重新赋值 | 是 | 兼容旧代码（不推荐新项目使用） |
| let | 块级 | 声明被提升，但未初始化（进入暂时性死区，访问会报错）。 | 不允许 | 可重新赋值 | 否 | 需要块级作用域的变量 |
| const | 块级 | 声明被提升，但未初始化（进入暂时性死区，访问会报错）。 | 不允许 | 不可重新赋值 | 否 | 声明常量或不可变引用 |

## 32. 作用域和作用域链是什么？

作用域（Scope） 和 作用域链（Scope Chain） 是理解变量和函数如何被访问的核心概念。

### 1. 作用域（Scope）：
作用域定义了变量和函数的可访问范围。JavaScript 中主要有三种作用域：

**(1) 全局作用域（Global Scope）**

**定义**：在代码最外层声明的变量和函数属于全局作用域。

**特点**：
- 全局变量可在任何地方访问（包括函数内部）。
- 浏览器中全局变量会挂载到 window 对象。

**(2) 函数作用域（Function Scope）**

**定义**：通过 function 声明的变量和函数仅在函数内部可访问。

**特点**：
- 函数内部声明的变量会覆盖同名的全局变量（变量提升时）。
- 函数作用域是嵌套的（内层函数可访问外层函数的变量）。

**(3) 块级作用域（Block Scope）**

**定义**：通过 let 和 const 声明的变量仅在 {} 块内有效。

**特点**：
- if、for、while 等语句的块内变量不会泄漏到外部。
- 与 var 的函数作用域不同。

### 2. 作用域链（Scope Chain）:

**定义**：当代码执行时，JavaScript 引擎会创建一个执行上下文（Execution Context），其中包含当前作用域的变量和函数。如果当前作用域找不到变量，会沿着作用域链向上查找。

**原理**：
- 每个函数在创建时会保存其外层作用域的引用（即闭包）。
- 变量查找时，先在当前作用域查找，找不到则向上层作用域查找，直到全局作用域。
- 如果全局作用域也找不到，则报错（ReferenceError）。

## 33. 如何将对象进行合并？

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

## 34. 箭头函数和普通函数有什么区别？

| 特性 | 普通函数 | 箭头函数 |
|------|----------|----------|
| 语法 | function name() {} | () => {} |
| this绑定 | 动态绑定（调用时决定） | 词法绑定（定义时决定） |
| arguments对象 | 有 | 无（可用剩余参数替代） |
| 构造函数 | 可作为构造函数使用 | 不能作为构造函数使用 |
| prototype属性 | 有 | 无 |
| yield关键字 | 可作为生成器函数使用 | 不能作为生成器函数使用 |
| 适用场景 | 动态this、构造函数、生成器函数 | 固定this、简洁语法、回调函数 |

### 详细对比示例：

```javascript
// 普通函数
function Person() {
  this.age = 0;
  
  setInterval(function growUp() {
    // 在普通函数中，this 指向全局对象（浏览器中是 window）
    // 严格模式下是 undefined
    this.age++; // 这里的 this 不是 Person 的实例
  }, 1000);
}

// 箭头函数
function Person() {
  this.age = 0;
  
  setInterval(() => {
    // 箭头函数继承外层作用域的 this
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

regularFunction(1, 2, 3); // Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]

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

## 35. Promise函数是什么？

### 状态：
- pending（进行中）：初始状态，既不是成功，也不是失败。
- fulfilled（已成功）：操作成功完成。
- rejected（已失败）：操作失败。

### 特点：
- Promise 的状态一旦改变，就不会再变（从 pending 到 fulfilled 或 pending 到 rejected）。
- Promise 是惰性的，调用 then 或 catch 才会执行。

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

## 36. 回调地狱是什么？

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

## 37. js防抖与节流是什么？

| 特性 | 防抖（Debounce） | 节流（Throttle） |
|------|------------------|------------------|
| 执行时机 | 事件停止触发后执行一次 | 固定时间间隔内执行一次 |
| 适用场景 | 输入框实时搜索、窗口调整大小 | 滚动事件、鼠标移动事件 |
| 核心思想 | 延迟执行，重新计时 | 固定频率执行 |
| 实现方式 | 通过setTimeout和clearTimeout实现 | 通过时间戳或定时器控制执行频率 |

### 防抖的适用场景：
- 输入框实时搜索（避免每次输入都发起请求）。
- 窗口调整大小（避免频繁计算布局）。

### 节流的适用场景：
- 滚动事件（避免频繁触发加载或计算）。
- 鼠标移动事件（如拖拽或绘图）

### 防抖实现：

```javascript
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// 使用示例
const debouncedSearch = debounce(function(searchTerm) {
  console.log('搜索:', searchTerm);
}, 300);
```

### 节流实现：

```javascript
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// 使用示例
const throttledScroll = throttle(function() {
  console.log('滚动事件处理');
}, 100);
```

## 38. 如何用原生JS实现事件委托？

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

## 39. 判断数组是否为空有哪些方法？

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

## 40. for in 和for of有什么区别？

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

## 41. 判断空对象有哪些方法？

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

## 42. async/await 和 Promise 有什么区别？

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

## 43. 暂时性死区是什么？

暂时性死区（TDZ） 是 JavaScript 中与 let 和 const 声明相关的概念，指在代码块中，从声明变量或常量到实际执行到该声明语句之间的区域。在此区域内，访问该变量或常量会抛出 ReferenceError。

- **触发条件**：仅适用于 let 和 const（var 无 TDZ）。
- **时间范围**：从代码块开始到变量/常量声明语句执行之前。
- **错误类型**：访问未初始化的 let/const 会抛出 ReferenceError（而非 undefined）。

### 暂时性死区示例：

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

### TDZ 的重要性：

1. **避免变量提升带来的困惑**：TDZ 使得变量在声明之前不可访问，减少了由于变量提升导致的错误。
2. **提高代码可读性**：强制开发者在变量声明之后才使用变量，使代码更易理解和维护。
3. **防止意外的变量访问**：在变量初始化之前访问变量会立即抛出错误，而不是返回 undefined。

## 44. ajax 实现原理以及和 fetch 有什么区别？

### Ajax 实现原理

Ajax（Asynchronous JavaScript and XML）是一种在不重新加载整个页面的情况下，与服务器交换数据并更新部分网页的技术。

**核心组件**：
1. XMLHttpRequest 对象（核心）
2. JavaScript
3. DOM（用于显示/交互）

**基本步骤**：
1. 创建 XMLHttpRequest 对象
2. 设置请求参数（方法、URL等）
3. 发送请求
4. 注册事件监听器处理响应

```javascript
// 1. 创建 XMLHttpRequest 对象
const xhr = new XMLHttpRequest();

// 2. 设置请求参数
xhr.open('GET', 'https://api.example.com/data', true);

// 3. 设置响应处理函数
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    // 请求成功，处理响应数据
    console.log(xhr.responseText);
  }
};

// 4. 发送请求
xhr.send();
```

### 更完整的 XMLHttpRequest 示例：

```javascript
function ajaxRequest(method, url, data, callback) {
  const xhr = new XMLHttpRequest();
  
  xhr.open(method, url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        callback(null, JSON.parse(xhr.responseText));
      } else {
        callback(new Error(`Request failed with status ${xhr.status}`));
      }
    }
  };
  
  xhr.send(JSON.stringify(data));
}

// 使用示例
ajaxRequest('POST', '/api/users', { name: 'John' }, (error, data) => {
  if (error) {
    console.error(error);
  } else {
    console.log(data);
  }
});
```

### Ajax 与 Fetch 的区别

| 特性 | Ajax (XMLHttpRequest) | Fetch API |
|------|-----------------------|-----------|
| 规范 | 基于事件的传统API | 基于 Promise 的现代API |
| 语法 | 回调函数 | Promise 链式调用或 async/await |
| 错误处理 | 通过状态码判断 | 通过 Promise 的 reject 或 try/catch |
| 浏览器支持 | 所有浏览器 | 现代浏览器（IE不支持） |
| 可读性 | 代码较冗长 | 代码更简洁 |
| 可取消性 | 支持 abort() | 支持 AbortController |
| 默认行为 | 不会因 HTTP 错误状态拒绝 Promise | 仅在网络故障时拒绝 Promise |

### Fetch API 使用示例：

```javascript
// GET 请求
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// POST 请求
fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name: 'John' })
})
  .then(response => {
    if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// 使用 async/await
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

## 45. 虚拟DOM是什么？

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

## 46. diff 算法是什么？

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

## 49. ES6函数默认参数是什么？如何使用？

### 什么是函数默认参数？

ES6允许为函数参数设置默认值，当调用函数时如果没有传入该参数，或传入`undefined`，将使用默认值。

### 基本用法

```javascript
// ES5写法
function greet(name) {
  name = name || 'Guest';
  return `Hello, ${name}!`;
}

// ES6默认参数
function greet(name = 'Guest') {
  return `Hello, ${name}!`;
}

greet();          // "Hello, Guest!"
greet('John');    // "Hello, John!"
greet(undefined); // "Hello, Guest!"
greet(null);      // "Hello, null!" (null不会触发默认值)
```

### 默认参数可以是表达式

```javascript
function getDefaultName() {
  return 'Anonymous';
}

function greet(name = getDefaultName()) {
  return `Hello, ${name}!`;
}

// 默认值可以是前面的参数
function multiply(a, b = a) {
  return a * b;
}
multiply(5);     // 25 (5 * 5)
multiply(2, 3);  // 6

// 甚至可以是一个函数调用
function fetchData(url, timeout = getDefaultTimeout()) {
  // ...
}
```

### 解构赋值与默认参数结合

```javascript
// 对象解构默认值
function createUser({ name = 'Anonymous', age = 18, role = 'user' } = {}) {
  return { name, age, role };
}

createUser();                           // { name: 'Anonymous', age: 18, role: 'user' }
createUser({ name: 'John' });           // { name: 'John', age: 18, role: 'user' }
createUser({ name: 'Jane', age: 25 });  // { name: 'Jane', age: 25, role: 'user' }

// 数组解构默认值
function processPair([x = 0, y = 0] = []) {
  return x + y;
}

processPair();        // 0 (使用默认数组[0, 0])
processPair([5]);     // 5 (5 + 0)
processPair([3, 4]);  // 7
```

### 暂时性死区（TDZ）

```javascript
// 错误示例：参数存在暂时性死区
function foo(a = b, b) {  // ReferenceError: Cannot access 'b' before initialization
  return a + b;
}

// 正确示例
function foo(a = 1, b = a) {  // 后面的参数可以使用前面参数的默认值
  return a + b;
}
foo();  // 2

// 作用域问题
let x = 1;
function foo(x = x) {  // ReferenceError: x is not defined
  // 参数作用域与函数体不同
}
```

### 实际应用场景

```javascript
// 1. API请求封装
function request(url, method = 'GET', data = null, headers = {}) {
  return fetch(url, { method, body: data, headers });
}

// 2. 配置对象合并
function initApp(config = {}) {
  const defaultConfig = {
    theme: 'light',
    language: 'zh-CN',
    debug: false
  };
  return { ...defaultConfig, ...config };
}

// 3. 必填参数检查
function required(paramName) {
  throw new Error(`Missing parameter: ${paramName}`);
}

function createUser(name = required('name'), email = required('email')) {
  return { name, email };
}

createUser();           // Error: Missing parameter: name
createUser('John');     // Error: Missing parameter: email
createUser('John', 'john@example.com');  // { name: 'John', email: 'john@example.com' }
```

---

## 50. ES6展开运算符（Spread Operator）是什么？有哪些用法？

### 什么是展开运算符？

展开运算符（`...`）允许一个表达式在某处展开，可以用于数组、对象和函数参数。

### 数组中的展开运算符

#### 1. 数组展开

```javascript
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5, 6];  // [1, 2, 3, 4, 5, 6]

// 复制数组（浅拷贝）
const original = [1, 2, 3];
const copy = [...original];  // [1, 2, 3]
copy.push(4);
console.log(original);  // [1, 2, 3] - 原数组不受影响
```

#### 2. 合并数组

```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [5, 6];

// 替代concat
const merged = [...arr1, ...arr2, ...arr3];  // [1, 2, 3, 4, 5, 6]

// 在任意位置插入
const inserted = [0, ...arr1, 2.5, ...arr2];  // [0, 1, 2, 2.5, 3, 4]
```

#### 3. 将类数组/可迭代对象转为数组

```javascript
// 将字符串转为字符数组
const chars = [...'Hello'];  // ['H', 'e', 'l', 'l', 'o']

// 将Set转为数组
const set = new Set([1, 2, 3]);
const arr = [...set];  // [1, 2, 3]

// 将Map的keys/values转为数组
const map = new Map([['a', 1], ['b', 2]]);
const keys = [...map.keys()];    // ['a', 'b']
const values = [...map.values()]; // [1, 2]

// DOM操作
const divs = document.querySelectorAll('div');
const divArray = [...divs];  // 转为真正的数组，可以使用数组方法
divArray.forEach(div => console.log(div));
```

### 对象中的展开运算符（ES2018）

#### 1. 对象展开

```javascript
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };  // { a: 1, b: 2, c: 3 }

// 复制对象（浅拷贝）
const original = { x: 1, y: 2 };
const copy = { ...original };
```

#### 2. 合并对象

```javascript
const defaults = { theme: 'light', lang: 'en' };
const userSettings = { theme: 'dark' };

const settings = { ...defaults, ...userSettings };
// { theme: 'dark', lang: 'en' } - 后面的属性会覆盖前面的

// 对象解构剩余属性
const { a, b, ...rest } = { a: 1, b: 2, c: 3, d: 4 };
console.log(rest);  // { c: 3, d: 4 }
```

### 函数调用中的展开运算符

```javascript
const numbers = [1, 2, 3, 4, 5];

// 替代apply
Math.max(...numbers);  // 5
Math.min(...numbers);  // 1

// 数组展开为参数
function sum(a, b, c) {
  return a + b + c;
}
const nums = [1, 2, 3];
sum(...nums);  // 6

// 与剩余参数的区别
function example(first, ...rest) {  // 剩余参数：收集参数
  console.log(first);
  console.log(rest);
}

const args = [1, 2, 3, 4];
example(...args);  // 展开：1, [2, 3, 4]
```

### 实际应用场景

```javascript
// 1. 数组去重
const arr = [1, 2, 2, 3, 3, 3];
const unique = [...new Set(arr)];  // [1, 2, 3]

// 2. 条件添加属性
const condition = true;
const obj = {
  a: 1,
  b: 2,
  ...(condition && { c: 3 })  // condition为true时才添加c
};

// 3. 函数参数默认值合并
function createConfig(userConfig) {
  return {
    host: 'localhost',
    port: 3000,
    ...userConfig  // 用户配置覆盖默认配置
  };
}

// 4. React中的状态更新
// setState({ ...state, count: state.count + 1 });

// 5. Redux中的Reducer
function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_USER':
      return { ...state, user: { ...state.user, ...action.payload } };
    default:
      return state;
  }
}
```

### 展开运算符 vs 剩余参数

| 特性 | 展开运算符 | 剩余参数 |
|------|-----------|----------|
| 位置 | 调用时、数组/对象字面量中 | 函数定义参数中 |
| 作用 | 展开元素 | 收集剩余参数 |
| 语法 | `...arr` | `...args` |

```javascript
// 展开运算符（展开）
const arr = [1, 2, 3];
const newArr = [...arr, 4];  // [1, 2, 3, 4]

// 剩余参数（收集）
function sum(...numbers) {    // 收集所有参数为数组
  return numbers.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4);  // 10
```

---

## 51. ES6 Proxy是什么？有什么作用？

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

## 52. ES6 Reflect是什么？有什么作用？

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