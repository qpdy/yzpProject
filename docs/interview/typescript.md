---
sidebar_position: 4
title: TypeScript（面试要点）
---

# TypeScript 面试要点

## 目录
- [TypeScript是什么？有什么优势？](#1-typescript是什么有什么优势)
- [TypeScript中的基础类型有哪些？](#2-typescript中的基础类型有哪些)
- [TypeScript中的接口（Interface）是什么？如何使用？](#3-typescript中的接口interface是什么如何使用)
- [interface 和 type 有什么区别？](#4-interface-和-type-有什么区别)
- [TypeScript中的类（Class）如何使用？](#5-typescript中的类class如何使用)
- [TypeScript中的泛型（Generics）是什么？如何使用？](#6-typescript中的泛型generics是什么如何使用)
- [TypeScript中的模块（Modules）是如何工作的？](#7-typescript中的模块modules是如何工作的)
- [TypeScript中的装饰器（Decorators）是什么？](#8-typescript中的装饰器decorators是什么)
- [TypeScript中的高级类型有哪些？](#9-typescript中的高级类型有哪些)
- [TypeScript中的类型推断是如何工作的？](#10-typescript中的类型推断是如何工作的)
- [TypeScript配置文件(tsconfig.json)如何配置？](#11-typescript配置文件tsconfigjson如何配置)
- [TypeScript与JavaScript的区别是什么？](#12-typescript与javascript的区别是什么)
- [TypeScript中的Utility Types有哪些？](#13-typescript中的utility-types有哪些)
- [TypeScript中的命名空间（Namespace）和模块（Module）有什么区别？](#14-typescript中的命名空间namespace和模块module有什么区别)
- [TypeScript中的声明合并（Declaration Merging）是什么？](#15-typescript中的声明合并declaration-merging是什么)
- [TypeScript中的类型兼容性（Type Compatibility）是如何工作的？](#16-typescript中的类型兼容性type-compatibility是如何工作的)
- [TypeScript中的this类型是如何工作的？](#17-typescript中的this类型是如何工作的)
- [TypeScript中的映射类型（Mapped Types）如何使用？](#18-typescript中的映射类型mapped-types如何使用)
- [TypeScript中的条件类型（Conditional Types）是什么？](#19-typescript中的条件类型conditional-types是什么)
- [TypeScript中的模板字面量类型（Template Literal Types）是什么？](#20-typescript中的模板字面量类型template-literal-types是什么)
- [TypeScript中的装饰器元数据（Decorator Metadata）如何使用？](#21-typescript中的装饰器元数据decorator-metadata如何使用)
- [TypeScript中的`declare`关键字有什么用？](#22-typescript中的declare关键字有什么用)
- [解释一下TypeScript中的枚举（Enum）](#23-解释一下typescript中的枚举enum)
- [TypeScript中的方法重写（Override）是什么？](#24-typescript中的方法重写override是什么)
- [什么是TypeScript Source Map（映射文件）？](#25-什么是typescript-source-map映射文件)
- [TypeScript中的类类型接口是什么？](#26-typescript中的类类型接口是什么)
- [TypeScript中`never`和`void`有什么区别？](#27-typescript中never和void有什么区别)
- [如何在TypeScript中使用Mixin？](#28-如何在typescript中使用mixin)
- [TypeScript中的类型断言是什么？](#29-typescript中的类型断言是什么)
- [如何检查TypeScript中的null和undefined？](#30-如何检查typescript中的null和undefined)

---

## 1. TypeScript是什么？有什么优势？

TypeScript是由微软开发的开源编程语言，它是JavaScript的一个超集，添加了可选的静态类型和基于类的面向对象编程。

### TypeScript的核心特性：

1. **静态类型检查**：
   - 在编译时检查类型错误，减少运行时错误
   - 提供更好的代码提示和自动补全
   - 提高代码可读性和可维护性

2. **ES6+特性支持**：
   - 支持最新的ECMAScript特性
   - 可以编译为ES3、ES5、ES2015等不同版本的JavaScript

3. **强大的工具支持**：
   - 智能提示和重构
   - 导航和查找引用
   - 代码重构和自动导入

### TypeScript相比JavaScript的优势：

1. **类型安全**：
   - 编译时发现类型错误
   - 减少因类型错误导致的bug

2. **更好的开发体验**：
   - 智能提示和自动补全
   - 重构更安全
   - 代码导航更方便

3. **团队协作**：
   - 类型定义本身就是文档
   - 减少沟通成本
   - 提高代码质量

4. **大型项目支持**：
   - 更好的模块化支持
   - 更清晰的接口定义
   - 更容易维护和扩展

### 实际应用示例：

```typescript
// JavaScript - 没有类型检查
function greet(person, date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

greet("Maddison", Date()); // 错误：Date()返回字符串而不是Date对象

// TypeScript - 有类型检查
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

greet("Maddison", new Date()); // 正确
greet("Maddison", Date()); // 编译错误，类型不匹配
```

## 2. TypeScript中的基础类型有哪些？

TypeScript提供了丰富的基础类型，用于静态类型检查和代码提示。

### 基本类型：

1. **boolean**：布尔值
```typescript
let isDone: boolean = false;
```

2. **number**：数值类型（包括整数和浮点数）
```typescript
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

3. **string**：字符串类型
```typescript
let color: string = "blue";
let fullName: string = `Bob Bobbington`;
let sentence: string = `Hello, my name is ${fullName}.`;
```

4. **array**：数组类型
```typescript
let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];
```

5. **tuple**：元组类型（已知元素数量和类型的数组）
```typescript
let x: [string, number];
x = ['hello', 10]; // OK
// x = [10, 'hello']; // Error
```

6. **enum**：枚举类型
```typescript
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

// 自定义起始值
enum Color2 {Red = 1, Green, Blue}
let c2: Color2 = Color2.Green;

// 自定义所有值
enum Color3 {Red = 1, Green = 2, Blue = 4}
let c3: Color3 = Color3.Green;
```

7. **any**：任意类型（不进行类型检查）
```typescript
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // OK, definitely a boolean
```

8. **unknown**：未知类型（TypeScript 3.0引入，比any更安全）
```typescript
let value: unknown;
value = true; // OK
value = 42; // OK
// value.toFixed(); // Error: Object is of type 'unknown'
```

9. **void**：无任何类型（通常用于函数没有返回值）
```typescript
function warnUser(): void {
  console.log("This is my warning message");
}
```

10. **null 和 undefined**：空值和未定义
```typescript
let u: undefined = undefined;
let n: null = null;
```

11. **never**：永不存在的值的类型（用于永远不会有返回值的函数）
```typescript
function error(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {
  }
}
```

12. **object**：非原始类型
```typescript
declare function create(o: object | null): void;
create({ prop: 0 }); // OK
create(null); // OK
// create(42); // Error
```

13. **symbol**：ES6引入的原始数据类型
```typescript
let sym1 = Symbol();
let sym2 = Symbol("key"); // 可选的字符串key
```

### 类型断言：

有时你会遇到这样的情况，你会比TypeScript更了解某个值的详细信息。通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。

```typescript
// "尖括号"语法
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// as语法
let someValue2: any = "this is a string";
let strLength2: number = (someValue2 as string).length;
```

## 3. TypeScript中的接口（Interface）是什么？如何使用？

接口是TypeScript的一个核心特性，用于定义对象的结构。

### 接口的基本用法：

```typescript
interface Person {
  name: string;
  age: number;
}

function greet(person: Person) {
  return "Hello " + person.name;
}

const user = { name: "Alice", age: 30 };
greet(user); // OK
```

### 可选属性：

接口里的属性不全都是必需的。有些是只在某些条件下存在，或者根本不存在。

```typescript
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
  let newSquare = {color: "white", area: 100};
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}
```

### 只读属性：

一些对象属性只能在对象刚刚创建的时候修改其值。你可以在属性名前用readonly来指定只读属性:

```typescript
interface Point {
  readonly x: number;
  readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
// p1.x = 5; // Error!
```

### 函数类型：

接口能够描述JavaScript中对象拥有的各种外形。除了描述带有属性的普通对象外，接口也可以描述函数类型。

```typescript
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}
```

### 可索引的类型：

与使用接口描述函数类型差不多，我们也可以描述那些能够"通过索引得到"的类型，比如a[10]或ageMap["daniel"]。

```typescript
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];
let myStr: string = myArray[0];
```

### 类类型：

与C#或Java里接口的基本作用一样，TypeScript也能够用它来明确的强制一个类去符合某种契约。

```typescript
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}

class Clock implements ClockInterface {
  currentTime: Date = new Date();
  setTime(d: Date) {
    this.currentTime = d;
  }
}
```

### 继承接口：

和类一样，接口也可以相互继承。这让我们能够从一个接口里复制成员到另一个接口里，可以更灵活地将接口分割到可重用的模块里。

```typescript
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
```

## 4. interface 和 type 有什么区别？

在 TypeScript 中，interface 和 type 都可以用来定义对象的结构，但它们有一些重要的区别。

### 相同点：

1. **都可以定义对象形状**：

```typescript
// 使用 interface
interface User {
  name: string;
  age: number;
}

// 使用 type
type User = {
  name: string;
  age: number;
}
```

2. **都支持扩展**：

```typescript
// interface 扩展
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

// type 扩展
type Animal = {
  name: string;
}

type Dog = Animal & {
  breed: string;
}
```

### 不同点：

1. **扩展方式不同**：

- interface 使用 extends 关键字
- type 使用 & (交叉类型) 操作符

2. **声明合并**：

- interface 支持声明合并，同名 interface 会自动合并
- type 不支持声明合并，同名 type 会报错

```typescript
// interface 声明合并
interface Window {
  title: string;
}

interface Window {
  ts: TypeScriptAPI;
}

// 现在 Window 接口包含了 title 和 ts 属性

// type 不能合并
// type Window = {
//   title: string;
// }
// 
// type Window = {
//   ts: TypeScriptAPI;
// } // 错误：标识符“Window”重复
```

3. **实现方式不同**：

- class 可以 implements interface
- class 不能 implements type（但可以通过继承实现类似效果）

```typescript
class CarImpl implements Car {
  // ...
}
```

4. **定义类型范围不同**：

- type 可以定义任何类型，包括原始类型、联合类型、元组等
- interface 只能定义对象类型

```typescript
// type 可以定义原始类型别名
type Name = string;

// type 可以定义联合类型
type Status = 'active' | 'inactive' | 'pending';

// type 可以定义元组
type Point = [number, number];

// interface 不能这样做
// interface Name = string; // 错误
```

5. **计算属性**：

- type 支持映射类型和条件类型
- interface 不支持这些高级类型操作

```typescript
type Keys = 'option1' | 'option2';
type Flags = { [K in Keys]: boolean }; // 映射类型

type TypeName<T> =
  T extends string ? "string" :
  T extends number ? "number" :
  T extends boolean ? "boolean" :
  T extends undefined ? "undefined" :
  T extends Function ? "function" :
  "object";
```

### 使用建议：

1. **优先使用 interface**：在定义对象结构时，优先使用 interface，因为它支持声明合并和类实现
2. **必要时使用 type**：当需要定义联合类型、原始类型别名、元组或其他非对象类型时，使用 type
3. **保持一致性**：在同一个项目中，尽量保持使用一致的风格

### interface 和 type 的对比总结：

| 特性 | interface | type |
|------|-----------|------|
| 定义对象类型 | ✅ 适合 | ✅ 适合 |
| 声明合并 | ✅ 支持 | ❌ 不支持 |
| 扩展 | extends | & 交叉类型 |
| 联合/交叉类型 | ❌ 不直接支持 | ✅ 支持 |
| 基本类型别名 | ❌ 不适合 | ✅ 适合 |
| 元组类型 | ❌ 不直接支持 | ✅ 支持 |
| 重复声明 | 自动合并 | 报错 |

## 5. TypeScript中的类（Class）如何使用？

TypeScript支持基于类的面向对象编程，提供了许多现代面向对象编程语言的特性。

### 基本类定义：

```typescript
class Greeter {
  greeting: string;
  
  constructor(message: string) {
    this.greeting = message;
  }
  
  greet() {
    return "Hello, " + this.greeting;
  }
}

let greeter = new Greeter("world");
```

### 继承：

在TypeScript里，我们可以使用常用的面向对象模式。基于类的程序设计中一种最基本的模式是允许使用继承来扩展现有的类。

```typescript
class Animal {
  move(distanceInMeters: number = 0) {
    console.log(`Animal moved ${distanceInMeters}m.`);
  }
}

class Dog extends Animal {
  bark() {
    console.log('Woof! Woof!');
  }
}

const dog = new Dog();
dog.bark();
dog.move(10);
```

### 公共、私有与受保护的修饰符：

#### 默认为public：

在TypeScript里，成员都默认为public。

```typescript
class Animal {
  public name: string;
  public constructor(theName: string) { this.name = theName; }
  public move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}
```

#### private：

当成员被标记成private时，它就不能在声明它的类的外部访问。

```typescript
class Animal {
  private name: string;
  constructor(theName: string) { this.name = theName; }
}

// new Animal("Cat").name; // 错误: 'name'是私有的
```

#### protected：

protected修饰符与private修饰符的行为很相似，但有一点不同，protected成员在派生类中仍然可以访问。

```typescript
class Person {
  protected name: string;
  constructor(name: string) { this.name = name; }
}

class Employee extends Person {
  private department: string;

  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
// console.log(howard.name); // 错误
```

### readonly修饰符：

你可以使用readonly关键字将属性设置为只读的。只读属性必须在声明时或构造函数里被初始化。

```typescript
class Octopus {
  readonly name: string;
  readonly numberOfLegs: number = 8;
  
  constructor (theName: string) {
    this.name = theName;
  }
}

let dad = new Octopus("Man with the 8 strong legs");
// dad.name = "Man with the 3-piece suit"; // 错误! name是只读的
```

### 存取器：

TypeScript支持通过getters/setters来截取对对象成员的访问。它能帮助你有效的控制对对象成员的访问。

```typescript
class Employee {
  private _fullName: string = "";

  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    if (newName && newName.length > 0) {
      this._fullName = newName;
    } else {
      console.log("Error: fullName must not be empty");
    }
  }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
  console.log(employee.fullName);
}
```

### 静态属性：

到目前为止，我们只讨论了类的实例成员，那些仅当类被实例化的时候才会被初始化的属性。我们也可以创建类的静态成员，这些属性存在于类本身上面而不是类的实例上。

```typescript
class Grid {
  static origin = {x: 0, y: 0};
  
  calculateDistanceFromOrigin(point: {x: number; y: number;}) {
    let xDist = (point.x - Grid.origin.x);
    let yDist = (point.y - Grid.origin.y);
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }
  
  constructor (public scale: number) { }
}

let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));
```

### 抽象类：

抽象类做为其它派生类的基类使用。它们一般不会直接被实例化。不同于接口，抽象类可以包含成员的实现细节。abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法。

```typescript
abstract class Animal {
  abstract makeSound(): void;
  move(): void {
    console.log('roaming the earth...');
  }
}

class Cat extends Animal {
  makeSound() {
    console.log('Meow!');
  }
}

let cat = new Cat();
cat.makeSound();
cat.move();
```

## 6. TypeScript中的泛型（Generics）是什么？如何使用？

泛型是TypeScript中非常重要的特性，它允许我们在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

### 泛型函数：

```typescript
function identity<T>(arg: T): T {
  return arg;
}

// 使用方式1：传入所有的参数，包含类型参数
let output = identity<string>("myString");

// 使用方式2：利用了类型推论，编译器会根据传入的参数自动地帮助我们确定T的类型
let output2 = identity("myString");
```

### 使用泛型变量：

```typescript
function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length);  // Array has a .length, so no more error
  return arg;
}

// 或者
function loggingIdentity2<T>(arg: Array<T>): Array<T> {
  console.log(arg.length); // Array has a .length, so no more error
  return arg;
}
```

### 泛型类型：

```typescript
interface GenericIdentityFn<T> {
  (arg: T): T;
}

function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

### 泛型类：

```typescript
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

### 泛型约束：

有时候我们想操作某类型的一组值，并且我们知道这组值具有什么样的属性。在loggingIdentity例子中，我们想访问arg的length属性，但是编译器并不能证明每种类型都有length属性，所以就报错了。

```typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);  // Now we know it has a .length property, so no more error
  return arg;
}

loggingIdentity(3);  // Error, number doesn't have a .length property
loggingIdentity({length: 10, value: 3}); // OK
```

### 在泛型约束中使用类型参数：

你可以声明一个类型参数，且它被另一个类型参数约束。

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay
getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
```

## 7. TypeScript中的模块（Modules）是如何工作的？

从ECMAScript 2015开始，JavaScript引入了模块的概念，TypeScript也支持这个概念。

### 导出：

#### 导出声明：

任何声明（比如变量，函数，类，类型别名或接口）都能够通过添加export关键字来导出。

```typescript
// StringValidator.ts
export interface StringValidator {
  isAcceptable(s: string): boolean;
}

export const numberRegexp = /^[0-9]+$/;

export class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s);
  }
}
```

#### 导出语句：

导出语句很便利，因为我们可能需要对导出的部分重命名，所以上面的例子可以这样改写：

```typescript
class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s);
  }
}

export { ZipCodeValidator };
export { ZipCodeValidator as mainValidator };
```

#### 重新导出：

我们经常会去扩展其它模块，并且只导出那个模块的部分内容。重新导出功能并不会在当前模块导入那个模块或定义一个新的局部变量。

```typescript
export { ZipCodeValidator as RegExpBasedZipCodeValidator } from "./ZipCodeValidator";
```

### 导入：

#### 导入一个模块中的某个导出内容：

```typescript
import { ZipCodeValidator } from "./ZipCodeValidator";

let myValidator = new ZipCodeValidator();
```

#### 对导入内容重命名：

```typescript
import { ZipCodeValidator as ZCV } from "./ZipCodeValidator";
let myValidator = new ZCV();
```

#### 将整个模块导入到一个变量，并通过它来访问模块的导出部分：

```typescript
import * as validator from "./ZipCodeValidator";
let myValidator = new validator.ZipCodeValidator();
```

#### 具有副作用的导入：

一些模块会设置一些全局状态并且可能没有任何导出。这些模块可能不打算被导入，或使用者可以不取任何导出。这些模块的导入语法是：

```typescript
import "./my-module.js";
```

### 默认导出：

每个模块都可以有一个default导出。默认导出使用default关键字标记；并且一个模块只能有一个default导出。需要使用一种特殊的导入形式来导入default导出。

```typescript
// StaticZipCodeValidator.ts
import { ZipCodeValidator } from "./ZipCodeValidator";

export default class StaticZipCodeValidator extends ZipCodeValidator {
  static numberRegexp = /^[0-9]+$/;
  isAcceptable(s: string) {
    return s.length === 5 && StaticZipCodeValidator.numberRegexp.test(s);
  }
}

// Test.ts
import Validator from "./StaticZipCodeValidator";

let myValidator = new Validator();
```

## 8. TypeScript中的装饰器（Decorators）是什么？

装饰器是一种特殊类型的声明，它能够被附加到类声明，方法，访问符，属性或参数上。装饰器使用@expression这种形式，expression求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入。

### 装饰器工厂：

如果我们想将信息传递给一个装饰器，该怎么处理呢？我们可以写一个装饰器工厂。装饰器工厂就是一个简单的函数，它返回一个表达式，以供装饰器在运行时调用。

```typescript
function color(value: string) { // 这是一个装饰器工厂
  return function (target) { // 这是装饰器
    // do something with "target" and "value"...
  }
}
```

### 装饰器组合：

多个装饰器可以同时应用到一个声明上，就像下面的示例：

```typescript
@f
@g
x

// 等同于
f(g(x))
```

### 装饰器求值：

类中不同声明上的装饰器将按以下规定的顺序应用：

1. 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个实例成员。
2. 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个静态成员。
3. 参数装饰器应用到构造函数。
4. 类装饰器应用到类。

### 类装饰器：

类装饰器在类声明之前被声明（紧靠着类声明）。类装饰器应用于类构造函数，可以用来监视，修改或替换类定义。

```typescript
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}
```

### 方法装饰器：

方法装饰器声明在一个方法的声明之前（紧靠着方法声明）。它会被应用到方法的属性描述符上，可以用来监视，修改或者替换方法定义。

```typescript
function enumerable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = value;
  };
}

class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }

  @enumerable(false)
  greet() {
    return "Hello, " + this.greeting;
  }
}
```

### 访问器装饰器：

访问器装饰器声明在一个访问器的声明之前（紧靠着访问器声明）。访问器装饰器应用于访问器的属性描述符并且可以用来监视，修改或替换访问器的定义。

```typescript
function configurable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.configurable = value;
  };
}

class Point {
  private _x: number;
  private _y: number;
  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  @configurable(false)
  get x() { return this._x; }

  @configurable(false)
  get y() { return this._y; }
}
```

### 属性装饰器：

属性装饰器声明在一个属性声明之前（紧靠着属性声明）。属性装饰器不能在声明文件中(.d.ts)，或者任何外部上下文（比如declare的类）里使用。

```typescript
function format(formatString: string) {
  return function (target: any, propertyKey: string) {
    // do something with target and propertyKey
  }
}

class Greeter {
  @format("Hello, %s")
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }
}
```

### 参数装饰器：

参数装饰器声明在一个参数声明之前（紧靠着参数声明）。参数装饰器应用于类构造函数或方法声明。参数装饰器只能用来监视一个方法的参数是否被传入。

```typescript
function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  // do something with target, propertyKey, and parameterIndex
}

class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet(@required name: string) {
    return "Hello " + name + ", " + this.greeting;
  }
}
```

## 9. TypeScript中的高级类型有哪些？

TypeScript提供了许多高级类型特性，让类型系统更加强大和灵活。

### 交叉类型（Intersection Types）：

交叉类型是将多个类型合并为一个类型。这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。

```typescript
interface ErrorHandling {
  success: boolean;
  error?: { message: string };
}

interface ArtworksData {
  artworks: { title: string }[];
}

interface ArtistsData {
  artists: { name: string }[];
}

// 这些接口都会被交叉类型组合在一起
type ArtworksResponse = ArtworksData & ErrorHandling;
type ArtistsResponse = ArtistsData & ErrorHandling;
```

### 联合类型（Union Types）：

联合类型与交叉类型很有关联，但是使用上却完全不同。偶尔你会遇到这种情况，一个代码库希望传入number或string类型的参数。

```typescript
function padLeft(value: string, padding: string | number) {
  // ...
}

let indentedString = padLeft("Hello world", true); // errors during compilation
```

### 类型守卫（Type Guards）：

联合类型的一个问题是如何知道在运行时得到的是哪个类型。TypeScript提供了类型守卫的概念来解决这个问题。

```typescript
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

// 使用
if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}
```

### typeof类型守卫：

```typescript
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}
```

### instanceof类型守卫：

```typescript
interface Padder {
  getPaddingString(): string;
}

class SpaceRepeatingPadder implements Padder {
  constructor(private numSpaces: number) { }
  getPaddingString() {
    return Array(this.numSpaces + 1).join(" ");
  }
}

class StringPadder implements Padder {
  constructor(private value: string) { }
  getPaddingString() {
    return this.value;
  }
}

function getRandomPadder() {
  return Math.random() < 0.5 ?
    new SpaceRepeatingPadder(4) :
    new StringPadder("  ");
}

// 类型为SpaceRepeatingPadder | StringPadder
let padder: Padder = getRandomPadder();

if (padder instanceof SpaceRepeatingPadder) {
  padder; // 类型细化为'SpaceRepeatingPadder'
}
if (padder instanceof StringPadder) {
  padder; // 类型细化为'StringPadder'
}
```

### 可辨识联合（Discriminated Unions）：

你可以合并单例类型，联合类型，类型守卫和类型别名来创建一个叫做可辨识联合的高级模式，它也称做标签联合或代数数据类型。

```typescript
interface Square {
  kind: "square";
  size: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

interface Circle {
  kind: "circle";
  radius: number;
}

type Shape = Square | Rectangle | Circle;

function area(s: Shape) {
  switch (s.kind) {
    case "square": return s.size * s.size;
    case "rectangle": return s.height * s.width;
    case "circle": return Math.PI * s.radius ** 2;
  }
}
```

### 索引类型（Index types）：

使用索引类型，编译器就能够检查使用了动态属性名的代码。

```typescript
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n]);
}

interface Person {
  name: string;
  age: number;
}

let person: Person = {
  name: 'Jarid',
  age: 35
};

let strings: string[] = pluck(person, ['name']); // ok, string[]
```

### 映射类型（Mapped types）：

一个常见的任务是将一个已知的类型转换为另一个类型：

```typescript
type Partial<T> = {
  [P in keyof T]?: T[P];
}

type Required<T> = {
  [P in keyof T]-?: T[P];
}

type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
}

type Record<K extends keyof any, T> = {
  [P in K]: T;
}
```

### 条件类型（Conditional Types）：

TypeScript 2.8引入了条件类型，它能够表示非统一的类型。条件类型会以一个条件表达式进行类型关系检测，从而在两种类型中选择其一：

```typescript
T extends U ? X : Y

// 示例
type TypeName<T> =
  T extends string ? "string" :
  T extends number ? "number" :
  T extends boolean ? "boolean" :
  T extends undefined ? "undefined" :
  T extends Function ? "function" :
  "object";

type T0 = TypeName<string>;  // "string"
type T1 = TypeName<"a">;  // "string"
type T2 = TypeName<true>;  // "boolean"
type T3 = TypeName<() => void>;  // "function"
type T4 = TypeName<string[]>;  // "object"
```

## 10. TypeScript中的类型推断是如何工作的？

TypeScript类型推断是TypeScript编译器自动确定变量类型的能力，它在很多情况下可以减少显式类型注解的需求。

### 基础类型推断：

```typescript
let x = 3; // x被推断为number类型
// x = "hello"; // Error: Type '"hello"' is not assignable to type 'number'.
```

### 最佳通用类型：

当需要从几个表达式中推断类型时候，会使用这些表达式的类型来推断出一个最合适的通用类型。

```typescript
let x = [0, 1, null]; // x被推断为(number | null)[]
```

### 上下文类型：

TypeScript类型推断的另一种重要形式是按上下文归类。按上下文归类会发生在表达式的类型与所处的位置相关时。

```typescript
window.onmousedown = function(mouseEvent) {
  console.log(mouseEvent.button);  //<- Error
};
```

在这个例子中，TypeScript类型检查器使用Window.onmousedown函数的类型来推断右边函数表达式的类型。因此，它能够推断出mouseEvent参数的类型中包含了button属性。

### 类型兼容性：

TypeScript里的类型兼容性是基于结构子类型的。结构类型是一种只使用其成员来描述类型的方式。

```typescript
interface Named {
  name: string;
}

class Person {
  name: string;
}

let p: Named;
// OK, because of structural typing
p = new Person();
```

### 函数参数的双向协变：

比较函数参数类型时，只有当源函数参数能够赋值给目标函数或者反过来时才能成功。

```typescript
enum EventType { Mouse, Keyboard }

interface Event { timestamp: number; }
interface MouseEvent extends Event { x: number; y: number }
interface KeyEvent extends Event { keyCode: number }

function listenEvent(eventType: EventType, handler: (n: Event) => void) {
  // ...
}

// 不健全，但有用且常见
listenEvent(EventType.Mouse, (e: MouseEvent) => console.log(e.x + "," + e.y));

// 在健全性方面不可靠，但TypeScript允许这么做
listenEvent(EventType.Mouse, (e: Event) => console.log((<MouseEvent>e).x + "," + (<MouseEvent>e).y));
```

## 11. TypeScript配置文件(tsconfig.json)如何配置？

tsconfig.json文件用于配置TypeScript项目的编译选项。

### 基本结构：

```json
{
  "compilerOptions": {
    // 编译选项
  },
  "include": [
    // 包含的文件
  ],
  "exclude": [
    // 排除的文件
  ]
}
```

### 常用编译选项：

#### 基本选项：

```json
{
  "compilerOptions": {
    "target": "es5",                          // 指定ECMAScript目标版本
    "module": "commonjs",                     // 指定生成哪个模块系统代码
    "lib": ["es6"],                           // 指定要包含在编译中的库文件
    "allowJs": true,                          // 允许编译javascript文件
    "outDir": "./dist",                       // 重定向输出目录
    "rootDir": "./src",                       // 指定输入文件根目录
    "removeComments": true,                   // 删除所有注释
    "strict": true,                           // 启用所有严格类型检查选项
    "esModuleInterop": true,                  // 启用es模块互操作性
    "skipLibCheck": true,                     // 跳过声明文件的类型检查
    "forceConsistentCasingInFileNames": true  // 不允许对同一文件使用不一致大小写的引用
  }
}
```

#### 严格类型检查选项：

```json
{
  "compilerOptions": {
    "strict": true,                    // 启用所有严格类型检查选项
    "noImplicitAny": true,             // 在表达式和声明上有隐含的any类型时报错
    "strictNullChecks": true,          // 启用严格的null检查
    "strictFunctionTypes": true,       // 启用严格的函数类型检查
    "strictBindCallApply": true,       // 启用严格的bind, call, apply方法检查
    "strictPropertyInitialization": true, // 启用类的属性初始化检查
    "noImplicitThis": true,            // 当this表达式的值为any类型时，生成错误
    "alwaysStrict": true               // 以严格模式解析并为每个源文件生成"use strict"语句
  }
}
```

#### 模块解析选项：

```json
{
  "compilerOptions": {
    "moduleResolution": "node",        // 选择模块解析策略
    "baseUrl": "./",                   // 解析非相对模块名的基准目录
    "paths": {                         // 模块名到基于baseUrl的路径映射的列表
      "@/*": ["src/*"]
    },
    "rootDirs": [],                    // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [],                   // 包含类型定义的文件夹列表
    "types": [],                       // 要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true, // 允许从没有设置默认导出的模块中默认导入
    "esModuleInterop": true             // 启用es模块互操作性
  }
}
```

#### Source Map选项：

```json
{
  "compilerOptions": {
    "sourceMap": true,                 // 生成相应的.map文件
    "inlineSourceMap": true,           // 生成单个sourcemaps文件，而不是将sourcemaps生成不同的文件
    "inlineSources": true              // 将代码与sourcemaps生成到一个文件中
  }
}
```

#### 实验性选项：

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,    // 启用实验性的ES装饰器
    "emitDecoratorMetadata": true      // 给源码里的装饰器声明加上设计类型元数据
  }
}
```

### 文件包含选项：

```json
{
  "include": [
    "src/**/*"                        // 包含src目录下的所有文件
  ],
  "exclude": [
    "node_modules",                   // 排除node_modules目录
    "**/*.spec.ts"                    // 排除所有.spec.ts文件
  ],
  "files": [
    "core.ts",                        // 明确指定要包含的文件
    "sys.ts"
  ]
}
```

## 12. TypeScript与JavaScript的区别是什么？

TypeScript和JavaScript之间有很多重要的区别，理解这些区别对于有效地使用TypeScript至关重要。

### 核心区别：

| 特性 | JavaScript | TypeScript |
|------|------------|------------|
| 类型系统 | 动态类型 | 静态类型 |
| 编译 | 直接运行 | 需要编译为JavaScript |
| 错误检测 | 运行时 | 编译时 |
| 工具支持 | 基础 | 强大（智能提示、重构等） |
| 学习曲线 | 简单 | 需要学习类型系统 |

### 语法差异：

#### 类型注解：

```javascript
// JavaScript
function add(a, b) {
  return a + b;
}

// TypeScript
function add(a: number, b: number): number {
  return a + b;
}
```

#### 接口和类型定义：

```javascript
// JavaScript - 没有接口概念
const user = {
  name: "Alice",
  age: 30
};

// TypeScript - 有接口和类型定义
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "Alice",
  age: 30
};
```

#### 类和访问修饰符：

```javascript
// JavaScript
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

// TypeScript
class Animal {
  protected name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  
  speak(): void {
    console.log(`${this.name} makes a noise.`);
  }
}
```

### 运行时差异：

#### 编译过程：

```bash
# JavaScript可以直接运行
node app.js

# TypeScript需要先编译
tsc app.ts
node app.js

# 或者使用ts-node直接运行
ts-node app.ts
```

#### 类型擦除：

```typescript
// TypeScript代码
let message: string = "Hello World";
let count: number = 42;

// 编译后的JavaScript代码
var message = "Hello World";
var count = 42;
// 所有类型信息都被移除
```

### 生态系统差异：

#### 类型定义文件：

```typescript
// 使用第三方库时需要类型定义
// npm install @types/lodash
import * as _ from "lodash";

// 或者库自带类型定义
import * as express from "express";
```

#### 装饰器和元数据：

```typescript
// TypeScript支持装饰器（需要配置）
import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

### 开发体验差异：

#### 智能提示和重构：

```typescript
// 在TypeScript中，IDE可以提供更好的智能提示
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "Alice",
  // IDE会提示缺少email属性
};
```

#### 错误检测：

```typescript
// JavaScript - 运行时错误
function greet(person) {
  console.log(`Hello, ${person.name}`);
}

greet(null); // 运行时报错：Cannot read property 'name' of null

// TypeScript - 编译时错误
function greet(person: { name: string }) {
  console.log(`Hello, ${person.name}`);
}

greet(null); // 编译时报错：Argument of type 'null' is not assignable to parameter of type '{ name: string; }'
```

## 13. TypeScript中的Utility Types有哪些？

TypeScript提供了一些内置的工具类型，可以帮助我们更方便地进行类型操作。

### Partial&lt;T&gt;：

构造类型T，并将它所有的属性设置为可选的。

```typescript
interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
  title: 'organize desk',
  description: 'clear clutter',
};

const todo2 = updateTodo(todo1, {
  description: 'throw out trash',
});
```

### Readonly&lt;T&gt;：

构造类型T，并将它所有的属性设置为readonly。

```typescript
interface Todo {
  title: string;
}

const todo: Readonly<Todo> = {
  title: 'Delete inactive users',
};

// todo.title = 'Hello'; // Error: cannot reassign a readonly property
```

### Record&lt;K&#44;T&gt;：

构造一个类型，其属性名的类型为K，属性值的类型为T。

```typescript
interface PageInfo {
  title: string;
}

type Page = 'home' | 'about' | 'contact';

const nav: Record<Page, PageInfo> = {
  home: { title: 'Home' },
  about: { title: 'About' },
  contact: { title: 'Contact' },
};
```

### Pick&lt;T,K&gt;：

从类型T中挑选部分属性K来构造类型。

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, 'title' | 'completed'>;

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
};
```

### Omit&lt;T,K&gt;：

从类型T中剔除部分属性K来构造类型。

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

type TodoPreview = Omit<Todo, 'description' | 'createdAt'>;

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
};
```

### Exclude&lt;T,U&gt;：

从类型T中剔除所有可以赋值给U的类型。

```typescript
type T0 = Exclude<"a" | "b" | "c", "a">;  // "b" | "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">;  // "c"
type T2 = Exclude<string | number | (() => void), Function>;  // string | number
```

### Extract&lt;T,U&gt;：

从类型T中提取所有可以赋值给U的类型。

```typescript
type T0 = Extract<"a" | "b" | "c", "a" | "f">;  // "a"
type T1 = Extract<string | number | (() => void), Function>;  // () => void
```

### NonNullable&lt;T&gt;：

从类型T中剔除null和undefined。

```typescript
type T0 = NonNullable<string | number | undefined>;  // string | number
type T1 = NonNullable<string[] | null | undefined>;  // string[]
```

### Parameters&lt;T&gt;：

获得函数类型的参数类型构成的元组类型。

```typescript
declare function f1(arg: { a: number; b: string }): void;

type T0 = Parameters<() => string>;  // []
type T1 = Parameters<(s: string) => void>;  // [string]
type T2 = Parameters<typeof f1>;  // [{ a: number, b: string }]
```

### ReturnType&lt;T&gt;：

获取函数T的返回类型。

```typescript
declare function f1(): { a: number; b: string };

type T0 = ReturnType<() => string>;  // string
type T1 = ReturnType<(s: string) => void>;  // void
type T2 = ReturnType<typeof f1>;  // { a: number, b: string }
```

### InstanceType&lt;T&gt;：

获取构造函数类型的实例类型。

```typescript
class C {
  x = 0;
  y = 0;
}

type T0 = InstanceType<typeof C>;  // C
type T1 = InstanceType<any>;  // any
type T2 = InstanceType<never>;  // any
// type T3 = InstanceType<string>;  // Error
```

### Required&lt;T&gt;：

构造一个类型，使类型T的所有属性为required。

```typescript
interface Props {
  a?: number;
  b?: string;
}

const obj: Props = { a: 5 }; // OK

const obj2: Required<Props> = { a: 5 }; // Error: property 'b' missing
```

## 14. TypeScript中的命名空间（Namespace）和模块（Module）有什么区别？

在TypeScript中，命名空间和模块都是组织代码的方式，但它们有不同的用途和特点。

### 命名空间（Namespace）：

命名空间是TypeScript早期版本中组织代码的方式，现在更推荐使用模块。

```typescript
namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }
  
  const lettersRegexp = /^[A-Za-z]+$/;
  const numberRegexp = /^[0-9]+$/;
  
  export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string) {
      return lettersRegexp.test(s);
    }
  }
  
  export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
      return s.length === 5 && numberRegexp.test(s);
    }
  }
}

// 使用
let validators: { [s: string]: Validation.StringValidator; } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();
```

### 模块（Module）：

模块是ES6引入的标准，现在是组织代码的推荐方式。

```typescript
// StringValidator.ts
export interface StringValidator {
  isAcceptable(s: string): boolean;
}

// LettersOnlyValidator.ts
import { StringValidator } from "./StringValidator";

const lettersRegexp = /^[A-Za-z]+$/;

export class LettersOnlyValidator implements StringValidator {
  isAcceptable(s: string) {
    return lettersRegexp.test(s);
  }
}

// ZipCodeValidator.ts
import { StringValidator } from "./StringValidator";

const numberRegexp = /^[0-9]+$/;

export class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string) {
    return s.length === 5 && numberRegexp.test(s);
  }
}

// Test.ts
import { StringValidator } from "./StringValidator";
import { ZipCodeValidator } from "./ZipCodeValidator";
import { LettersOnlyValidator } from "./LettersOnlyValidator";

let validators: { [s: string]: StringValidator; } = {};
validators["ZIP code"] = new ZipCodeValidator();
validators["Letters only"] = new LettersOnlyValidator();
```

### 主要区别：

| 特性 | 命名空间 | 模块 |
|------|----------|------|
| 标准化 | TypeScript特有 | ECMAScript标准 |
| 文件分割 | 可以跨文件 | 每个文件是一个模块 |
| 依赖管理 | 隐式 | 显式导入/导出 |
| 打包工具支持 | 有限 | 广泛支持 |
| 推荐使用 | 不推荐 | 推荐 |

### 命名空间的合并：

```typescript
namespace Animals {
  export class Zebra { }
}

namespace Animals {
  export interface Legged { numberOfLegs: number; }
  export class Dog { }
}
```

### 模块的重新导出：

```typescript
// 这个模块从其他模块导出了一些名字，但是它并没有定义任何新的名字
export { ZipCodeValidator as RegExpBasedZipCodeValidator } from "./ZipCodeValidator";
```

## 15. TypeScript中的声明合并（Declaration Merging）是什么？

声明合并是指编译器将两个具有相同名称的声明合并为一个声明。合并后的声明拥有两个声明的所有特性。

### 基本概念：

在TypeScript中，有一些独特的声明类型：接口、命名空间、函数、变量、类。在处理这些声明时，如果定义了两个具有相同名称的声明，编译器会将它们合并到一个声明中。

### 接口合并：

这是最常见的声明合并类型。在合并接口时，非函数类型的成员应该是唯一的。如果它们不是唯一的，则它们必须是相同的类型。

```typescript
interface Box {
  height: number;
  width: number;
}

interface Box {
  scale: number;
}

let box: Box = {height: 5, width: 6, scale: 10};
```

对于函数成员，每个同名函数声明都会被当作这个函数的一个重载。

```typescript
interface Cloner {
  clone(animal: Animal): Animal;
}

interface Cloner {
  clone(animal: Sheep): Sheep;
}

interface Cloner {
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;
}

// 合并后的接口等价于：
interface Cloner {
  clone(animal: Dog): Dog;
  clone(animal: Cat): Cat;
  clone(animal: Sheep): Sheep;
  clone(animal: Animal): Animal;
}
```

### 命名空间合并：

同名的命名空间会被合并，每个命名空间的导出都会合并到一个大的命名空间中。

```typescript
namespace Animals {
  export class Zebra { }
}

namespace Animals {
  export interface Legged { numberOfLegs: number; }
  export class Dog { }
}

// 等价于
namespace Animals {
  export interface Legged { numberOfLegs: number; }
  
  export class Zebra { }
  export class Dog { }
}
```

### 命名空间与类合并：

这让我们可以表示内部类。

```typescript
class Album {
  label: Album.AlbumLabel;
}

namespace Album {
  export class AlbumLabel { }
}
```

### 命名空间与函数合并：

这让我们可以表示函数的静态属性。

```typescript
function buildName(firstName: string, lastName: string) {
  return firstName + " " + lastName;
}

namespace buildName {
  export let suffix = "Jr.";
}

// 使用
buildName("Bob", "Smith");
buildName.suffix; // "Jr."
```

### 命名空间与枚举合并：

这让我们可以方便地为枚举添加静态方法。

```typescript
enum Color {
  red = 1,
  green = 2,
  blue = 4
}

namespace Color {
  export function mixColor(colorName: string) {
    if (colorName == "yellow") {
      return Color.red + Color.green;
    }
    else if (colorName == "white") {
      return Color.red + Color.green + Color.blue;
    }
    else if (colorName == "magenta") {
      return Color.red + Color.blue;
    }
    else if (colorName == "cyan") {
      return Color.green + Color.blue;
    }
  }
}
```

## 16. TypeScript中的类型兼容性（Type Compatibility）是如何工作的？

TypeScript的类型兼容性是基于结构子类型的，这意味着只要两个类型具有相同的结构，它们就是兼容的。

### 基本原则：

```typescript
interface Named {
  name: string;
}

class Person {
  name: string;
}

let p: Named;
// OK, because of structural typing
p = new Person();
```

### 比较函数：

#### 参数比较：

```typescript
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x; // OK
// x = y; // Error
```

#### 返回值比较：

```typescript
let x = () => ({name: "Alice"});
let y = () => ({name: "Alice", location: "Seattle"});

x = y; // OK
// y = x; // Error, because x() lacks a location property
```

### 枚举兼容性：

枚举与数字类型相互兼容，但是不同枚举类型之间是不兼容的。

```typescript
enum Status { Ready, Waiting };
enum Color { Red, Blue, Green };

let status = Status.Ready;
// status = Color.Red;  // Error
```

### 类兼容性：

只有实例的成员会被比较，静态成员和构造函数不在比较的范围内。

```typescript
class Animal {
  feet: number;
  constructor(name: string, numFeet: number) { }
}

class Size {
  feet: number;
  constructor(numFeet: number) { }
}

let a: Animal;
let s: Size;

a = s;  // OK
s = a;  // OK
```

### 泛型兼容性：

因为TypeScript是结构化的类型系统，类型参数只影响使用其做为类型一部分的结果类型。

```typescript
interface Empty<T> {
}

let x: Empty<number>;
let y: Empty<string>;

x = y;  // OK, because y matches structure of x
```

当泛型参数被T使用时，它们就表现出不同的行为：

```typescript
interface NotEmpty<T> {
  data: T;
}

let x: NotEmpty<number>;
let y: NotEmpty<string>;

// x = y;  // Error, because x and y are not compatible
```

### 类型保护和类型断言：

#### 类型保护：

```typescript
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

// 使用
if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}
```

#### typeof类型保护：

```typescript
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}
```

#### instanceof类型保护：

```typescript
if (pad instanceof SpaceRepeatingPadder) {
  pad; // 类型细化为'SpaceRepeatingPadder'
}
```

## 17. TypeScript中的this类型是如何工作的？

TypeScript中的this类型是一种特殊的类型，它指向包含它的类或接口。

### 基本用法：

```typescript
class BasicCalculator {
  public constructor(protected value: number = 0) { }
  
  public currentValue(): number {
    return this.value;
  }
  
  public add(operand: number): this {
    this.value += operand;
    return this;
  }
  
  public multiply(operand: number): this {
    this.value *= operand;
    return this;
  }
}

let v = new BasicCalculator(2)
  .multiply(5)
  .add(1)
  .currentValue();
```

### this类型在继承中的应用：

```typescript
class ScientificCalculator extends BasicCalculator {
  public constructor(value = 0) {
    super(value);
  }
  
  public sin(): this {
    this.value = Math.sin(this.value);
    return this;
  }
}

let v = new ScientificCalculator(2)
  .multiply(5)
  .sin()
  .add(1)
  .currentValue();
```

### this类型与接口：

```typescript
interface ThisType<T> {
  value: T;
  setValue(value: T): this;
}

class MyImplementation implements ThisType<number> {
  value: number = 0;
  
  setValue(value: number): this {
    this.value = value;
    return this;
  }
}
```

### this参数：

在方法中，你可以通过声明this参数来显式指定this的类型：

```typescript
interface Card {
  suit: string;
  rank: string;
}

interface Deck {
  suits: string[];
  cards: number[];
  createCardPicker(this: Deck): () => Card;
}

let deck: Deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  createCardPicker: function(this: Deck) {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);
      
      return {suit: this.suits[pickedSuit], rank: pickedCard % 13};
    }
  }
}
```

## 18. TypeScript中的映射类型（Mapped Types）如何使用？

映射类型是一种从旧类型创建新类型的方式，它使用PropertyKey的联合来遍历键以创建类型。

### 基本语法：

```typescript
type Keys = 'option1' | 'option2';
type Flags = { [K in Keys]: boolean };
```

这等价于：

```typescript
type Flags = {
  option1: boolean;
  option2: boolean;
};
```

### 内置映射类型：

#### Partial&lt;T&gt;：

```typescript
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

#### Required&lt;T&gt;：

```typescript
type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

#### Readonly&lt;T&gt;：

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

#### Pick&lt;T, K&gt;：

```typescript
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

#### Record&lt;K&#44; T&gt;：

```typescript
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

### 自定义映射类型：

#### 将所有属性转换为函数：

```typescript
type Getters<T> = {
  [K in keyof T]: () => T[K]
};

interface Person {
  name: string;
  age: number;
}

type LazyPerson = Getters<Person>;
// 等价于:
// {
//   name: () => string;
//   age: () => number;
// }
```

#### 添加或移除修饰符：

```typescript
// 移除可选性
type Concrete<T> = {
  [P in keyof T]-?: T[P];
};

// 移除只读性
type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};
```

#### 条件映射类型：

```typescript
type Diff<T, U> = T extends U ? never : T;
type Filter<T, U> = {
  [K in Diff<keyof T, U>]: T[K]
};

interface Person {
  name: string;
  age: number;
  location: string;
}

type RemainingPerson = Filter<Person, 'location'>;
// 等价于:
// {
//   name: string;
//   age: number;
// }
```

### 映射类型与模板字面量类型结合：

```typescript
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
};

interface Person {
  name: string;
  age: number;
}

type LazyPerson = Getters<Person>;
// 等价于:
// {
//   getName: () => string;
//   getAge: () => number;
// }
```

## 19. TypeScript中的条件类型（Conditional Types）是什么？

条件类型是TypeScript 2.8引入的强大特性，它允许我们根据类型关系来有条件地选择类型。

### 基本语法：

```typescript
T extends U ? X : Y
```

如果类型T可以赋值给类型U，那么结果类型就是X，否则就是Y。

### 简单示例：

```typescript
type TypeName<T> =
  T extends string ? "string" :
  T extends number ? "number" :
  T extends boolean ? "boolean" :
  T extends undefined ? "undefined" :
  T extends Function ? "function" :
  "object";

type T0 = TypeName<string>;  // "string"
type T1 = TypeName<"a">;     // "string"
type T2 = TypeName<true>;    // "boolean"
type T3 = TypeName<() => void>;  // "function"
type T4 = TypeName<string[]>;    // "object"
```

### 分布式条件类型：

当条件类型作用于泛型类型时，如果泛型是联合类型，那么条件类型会被分布到联合类型的每个成员上。

```typescript
type Diff<T, U> = T extends U ? never : T;
type Filter<T, U> = T extends U ? T : never;

type T1 = Diff<"a" | "b" | "c", "a" | "b">;  // "c"
type T2 = Filter<"a" | "b" | "c", "a" | "b">;  // "a" | "b"
```

### infer关键字：

infer关键字允许我们在条件类型中推断类型变量。

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

type T1 = ReturnType<() => string>;  // string
type T2 = ReturnType<(s: string) => void>;  // void
```

### 内置条件类型：

#### Exclude&lt;T, U&gt;：

```typescript
type Exclude<T, U> = T extends U ? never : T;
```

#### Extract&lt;T, U&gt;：

```typescript
type Extract<T, U> = T extends U ? T : never;
```

#### NonNullable&lt;T&gt;：

```typescript
type NonNullable<T> = T extends null | undefined ? never : T;
```

#### Parameters&lt;T&gt;：

```typescript
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
```

#### ConstructorParameters&lt;T&gt;：

```typescript
type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never;
```

#### InstanceType&lt;T&gt;：

```typescript
type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any;
```

### 复杂示例：

#### Flatten类型：

```typescript
type Flatten<T> = T extends any[] ? T[number] : T;

type A = Flatten<string[]>;  // string
type B = Flatten<number>;    // number
```

#### DeepReadonly类型：

```typescript
type DeepReadonly<T> = T extends object ? {
  readonly [K in keyof T]: DeepReadonly<T[K]>
} : T;

interface Person {
  name: string;
  address: {
    street: string;
    city: string;
  };
}

type ReadonlyPerson = DeepReadonly<Person>;
// 所有嵌套属性都变为只读
```

## 20. TypeScript中的模板字面量类型（Template Literal Types）是什么？

模板字面量类型是TypeScript 4.1引入的特性，它允许我们基于字符串字面量类型创建新的字符串字面量类型。

### 基本用法：

```typescript
type World = "world";
type Greeting = `hello ${World}`;  // "hello world"
```

### 与联合类型结合：

```typescript
type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";

type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
// "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"
```

### 字符串联合类型：

```typescript
type PropEventSource<T> = {
  on(eventName: `${string & keyof T}Changed`, callback: (newValue: any) => void): void;
};

declare function makeWatchedObject<T>(obj: T): T & PropEventSource<T>;

let person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26
});

person.on("firstNameChanged", () => {});
// person.on("firstName", () => {}); // Error
```

### 内置字符串操作类型：

#### Uppercase&lt;S&gt;：

```typescript
type Greeting = "Hello, world"
type ShoutyGreeting = Uppercase<Greeting>  // "HELLO, WORLD"
```

#### Lowercase&lt;S&gt;：

```typescript
type QuietGreeting = Lowercase<Greeting>  // "hello, world"
```

#### Capitalize&lt;S&gt;：

```typescript
type CapitalizedGreeting = Capitalize<Greeting>  // "Hello, world"
```

#### Uncapitalize&lt;S&gt;：

```typescript
type UncapitalizedGreeting = Uncapitalize<CapitalizedGreeting>  // "hello, world"
```

### 实际应用示例：

#### 创建事件处理类型：

```typescript
type EventHandler<T> = {
  [K in keyof T as `on${Capitalize<string & K>}Change`]?: (newValue: T[K]) => void;
};

interface User {
  name: string;
  age: number;
}

type UserEvents = EventHandler<User>;
// {
//   onNameChange?: (newValue: string) => void;
//   onAgeChange?: (newValue: number) => void;
// }
```

#### 创建API端点类型：

```typescript
type Methods = "GET" | "POST" | "PUT" | "DELETE";
type Paths = "/users" | "/posts" | "/comments";

type Endpoints = `${Methods} ${Paths}`;
// "GET /users" | "POST /users" | "PUT /users" | "DELETE /users" | 
// "GET /posts" | "POST /posts" | "PUT /posts" | "DELETE /posts" | 
// "GET /comments" | "POST /comments" | "PUT /comments" | "DELETE /comments"
```

## 21. TypeScript中的装饰器元数据（Decorator Metadata）如何使用？

装饰器元数据是TypeScript中一个高级特性，它允许我们在运行时获取类型信息。

### 启用装饰器元数据：

首先需要在tsconfig.json中启用相关选项：

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

### 基本用法：

```typescript
import "reflect-metadata";

function logType(target: any, key: string) {
  let t = Reflect.getMetadata("design:type", target, key);
  console.log(`${key} type: ${t.name}`);
}

class Demo {
  @logType
  public attr1: string;
  
  @logType
  public attr2: number;
  
  @logType
  public attr3: boolean;
}
```

### 获取参数类型：

```typescript
function logParamTypes(target: any, key: string) {
  let types = Reflect.getMetadata("design:paramtypes", target, key);
  let returnType = Reflect.getMetadata("design:returntype", target, key);
  
  console.log(`Param types: ${types.map(t => t.name)}`);
  console.log(`Return type: ${returnType.name}`);
}

class Demo {
  @logParamTypes
  doSomething(
    param1: string,
    param2: number,
    param3: boolean
  ): number {
    return 1;
  }
}
```

### 获取类型信息：

```typescript
import "reflect-metadata";

function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
  let method = descriptor.value;
  descriptor.value = function () {
    // 获取参数类型
    let paramTypes = Reflect.getMetadata("design:paramtypes", target, propertyName);
    
    // 验证参数
    for (let i = 0; i < arguments.length; i++) {
      let paramType = paramTypes[i];
      let actualValue = arguments[i];
      
      if (!(actualValue instanceof paramType)) {
        throw new Error(`Parameter ${i} should be of type ${paramType.name}`);
      }
    }
    
    return method.apply(this, arguments);
  }
}

class Calculator {
  @validate
  add(a: number, b: number): number {
    return a + b;
  }
}
```

### 自定义元数据：

```typescript
function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  let existingRequiredParameters: number[] = Reflect.getOwnMetadata("required", target, propertyKey) || [];
  existingRequiredParameters.push(parameterIndex);
  Reflect.defineMetadata("required", existingRequiredParameters, target, propertyKey);
}

function validateRequired(target: Object, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
  let method = descriptor.value;
  descriptor.value = function () {
    let requiredParameters: number[] = Reflect.getOwnMetadata("required", target, propertyName) || [];
    
    for (let parameterIndex of requiredParameters) {
      if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
        throw new Error("Missing required argument!");
      }
    }
    
    return method.apply(this, arguments);
  }
}

class Greeter {
  @validateRequired
  greet(@required name: string, @required greeting: string) {
    return `${greeting}, ${name}!`;
  }
}
```

### 实际应用场景：

#### ORM实体装饰器：

```typescript
function Entity(tableName: string) {
  return function (constructor: Function) {
    Reflect.defineMetadata("entity:table", tableName, constructor);
  };
}

function Column(columnName: string, type: string) {
  return function (target: any, propertyKey: string) {
    let columns = Reflect.getMetadata("entity:columns", target.constructor) || [];
    columns.push({ name: propertyKey, column: columnName, type });
    Reflect.defineMetadata("entity:columns", columns, target.constructor);
  };
}

@Entity("users")
class User {
  @Column("id", "int")
  id: number;
  
  @Column("name", "varchar")
  name: string;
  
  @Column("email", "varchar")
  email: string;
}

这些是TypeScript中最重要的面试题和知识点。掌握这些内容将帮助你在TypeScript相关的面试中表现出色。

---

## 22. TypeScript中的`declare`关键字有什么用？

### 什么是`declare`？

`declare`关键字用于告诉TypeScript编译器某个变量、函数、类或模块已经存在，不需要在编译时生成实际的JavaScript代码。它主要用于类型声明文件（.d.ts）中。

### 使用场景

#### 1. 声明全局变量

当使用第三方库（通过CDN引入）时：

```typescript
// 告诉TypeScript，window对象上有一个全局变量myLib
declare const myLib: {
  version: string;
  doSomething(): void;
};

// 使用
console.log(myLib.version);
myLib.doSomething();
```

#### 2. 声明函数

```typescript
// 声明一个已经存在的函数
declare function greet(name: string): string;

// 使用
const message = greet("TypeScript");
```

#### 3. 声明模块

当导入没有类型定义的JavaScript模块时：

```typescript
// 为第三方库声明类型
declare module "some-untyped-library" {
  export function doSomething(): void;
  export const version: string;
}

// 使用
import { doSomething, version } from "some-untyped-library";
```

#### 4. 声明文件类型

```typescript
// 声明图片文件导入
declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
```

#### 5. 声明全局接口扩展

```typescript
// 扩展Window对象
declare global {
  interface Window {
    myCustomProperty: string;
    myCustomMethod(): void;
  }
}

// 使用
window.myCustomProperty = "hello";
window.myCustomMethod();
```

### `declare` vs 实际定义

| 特性 | `declare` | 实际定义 |
|------|-----------|----------|
| 编译输出 | 不产生JS代码 | 产生JS代码 |
| 用途 | 类型声明 | 实现逻辑 |
| 使用场景 | 类型定义文件 | 业务代码 |

---

## 23. 解释一下TypeScript中的枚举（Enum）

### 什么是枚举？

枚举（Enum）是一组命名常量的集合，用于定义一组有意义的数值。

### 枚举的类型

#### 1. 数字枚举

```typescript
enum Direction {
  Up,      // 0
  Down,    // 1
  Left,    // 2
  Right    // 3
}

// 手动设置起始值
enum Direction2 {
  Up = 1,  // 1
  Down,    // 2
  Left,    // 3
  Right    // 4
}

// 全部手动赋值
enum Status {
  Success = 200,
  NotFound = 404,
  Error = 500
}
```

#### 2. 字符串枚举

```typescript
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}

console.log(Direction.Up); // "UP"
```

#### 3. 异构枚举

```typescript
enum Mixed {
  No = 0,
  Yes = "YES"
}
```

### 枚举的特性

#### 双向映射

```typescript
enum Color {
  Red = 1,
  Green,
  Blue
}

// 正向映射
console.log(Color.Red);    // 1
console.log(Color.Green);  // 2

// 反向映射（仅数字枚举）
console.log(Color[1]);     // "Red"
console.log(Color[2]);     // "Green"
```

#### const枚举

```typescript
// 编译时内联，不生成对象
const enum Direction {
  Up,
  Down,
  Left,
  Right
}

const dir = Direction.Up;
// 编译后：const dir = 0 /* Up */;
```

### 枚举的使用场景

```typescript
// HTTP状态码
enum HttpStatus {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  ServerError = 500
}

function handleResponse(status: HttpStatus) {
  switch (status) {
    case HttpStatus.OK:
      return "请求成功";
    case HttpStatus.NotFound:
      return "资源不存在";
    default:
      return "未知错误";
  }
}

// 权限管理
enum Permission {
  Read = 1 << 0,      // 1
  Write = 1 << 1,     // 2
  Execute = 1 << 2,   // 4
  Delete = 1 << 3     // 8
}

const userPermission = Permission.Read | Permission.Write;
```

---

## 24. TypeScript中的方法重写（Override）是什么？

### 什么是方法重写？

方法重写是指子类重新定义父类中已有的方法，以提供特定的实现。

### 基本示例

```typescript
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  move(distance: number = 0) {
    console.log(`${this.name} moved ${distance}m`);
  }

  makeSound() {
    console.log("Some sound");
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }

  // 重写move方法
  move(distance: number = 5) {
    console.log("Running...");
    super.move(distance); // 调用父类方法
  }

  // 重写makeSound方法
  makeSound() {
    console.log("Woof! Woof!");
  }
}

const dog = new Dog("Buddy");
dog.move();        // Running... Buddy moved 5m
dog.makeSound();   // Woof! Woof!
```

### `override`关键字（TypeScript 4.3+）

```typescript
class Animal {
  move() {
    console.log("Moving");
  }
}

class Dog extends Animal {
  // 显式声明重写
  override move() {
    console.log("Running");
  }
}

class Cat extends Animal {
  // 错误！父类没有walk方法
  override walk() {  // Error: This member cannot have an 'override' modifier
    console.log("Walking");
  }
}
```

### 重写 vs 重载

```typescript
// 方法重载：同一个方法，多个签名
class Calculator {
  add(a: number, b: number): number;
  add(a: string, b: string): string;
  add(a: any, b: any): any {
    return a + b;
  }
}

// 方法重写：子类覆盖父类方法
class Base {
  greet() {
    console.log("Hello");
  }
}

class Derived extends Base {
  override greet() {
    console.log("Hello from Derived");
  }
}
```

---

## 25. 什么是TypeScript Source Map（映射文件）？

### 什么是Source Map？

Source Map是一个映射文件，它建立了编译后的代码与源代码之间的映射关系，便于调试。

### 为什么需要Source Map？

```
编译前（TypeScript）：          编译后（JavaScript）：
┌──────────────────┐         ┌────────────────────┐
│ let x: number    │         │ var x;             │
│ x = 10;          │  ────▶  │ x = 10;            │
│ console.log(x);  │         │ console.log(x);    │
└──────────────────┘         └────────────────────┘

Source Map: 建立行号、列号的映射关系
```

### 如何生成Source Map

#### tsconfig.json配置

```json
{
  "compilerOptions": {
    "sourceMap": true,        // 生成.map文件
    "inlineSourceMap": false, // 不内联到JS文件中
    "sourceRoot": "/",        // 指定源文件根目录
    "mapRoot": "/",           // 指定map文件根目录
    "inlineSources": false    // 是否将源代码内联到map中
  }
}
```

### Source Map文件内容

```json
{
  "version": 3,
  "file": "app.js",
  "sourceRoot": "",
  "sources": ["app.ts"],
  "names": ["console", "log"],
  "mappings": "AAAA,OAAO,CAAC,GAAG,CAAC,QAAQ,CAAC,CAAC"
}
```

### 使用场景

```typescript
// 开发环境
{
  "compilerOptions": {
    "sourceMap": true,      // 开启，便于调试
    "inlineSourceMap": false
  }
}

// 生产环境
{
  "compilerOptions": {
    "sourceMap": false,     // 关闭，减小文件体积
    "inlineSourceMap": false
  }
}

// 或生成单独的source map文件供错误追踪
{
  "compilerOptions": {
    "sourceMap": true,
    "sourceRoot": "https://cdn.example.com/source/"
  }
}
```

---

## 26. TypeScript中的类类型接口是什么？

### 什么是类类型接口？

类类型接口是用于描述类的构造函数和实例成员的接口。

### 实例接口

描述类的实例应该具有的属性和方法：

```typescript
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}

class Clock implements ClockInterface {
  currentTime: Date = new Date();

  setTime(d: Date) {
    this.currentTime = d;
  }

  constructor(h: number, m: number) {}
}
```

### 构造函数接口

描述类的构造函数签名：

```typescript
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}

interface ClockInterface {
  tick(): void;
}

function createClock(
  ctor: ClockConstructor,
  hour: number,
  minute: number
): ClockInterface {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("beep beep");
  }
}

class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("tick tock");
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
```

### 混合类型接口

```typescript
interface Counter {
  (start: number): string;  // 可调用
  interval: number;          // 属性
  reset(): void;             // 方法
}

function getCounter(): Counter {
  let counter = function (start: number) {} as Counter;
  counter.interval = 123;
  counter.reset = function () {};
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

---

## 27. TypeScript中`never`和`void`有什么区别？

### `void`类型

表示没有任何返回值，通常用于函数：

```typescript
function logMessage(message: string): void {
  console.log(message);
  // 没有return语句，或return undefined
}

let unusable: void = undefined;
// void只能赋值为undefined或null（非严格模式）
```

### `never`类型

表示永远不会发生的值，用于：
1. 抛出异常的函数
2. 无限循环的函数
3. 类型守卫中穷尽性检查

```typescript
// 1. 抛出异常的函数
function throwError(message: string): never {
  throw new Error(message);
}

// 2. 无限循环
function infiniteLoop(): never {
  while (true) {}
}

// 3. 穷尽性检查
function exhaustiveCheck(x: never): never {
  throw new Error("Unexpected value: " + x);
}

type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side ** 2;
    default:
      // 穷尽性检查
      return exhaustiveCheck(shape);
  }
}
```

### 对比总结

| 特性 | `void` | `never` |
|------|--------|---------|
| 含义 | 无返回值 | 永远不会发生 |
| 可赋值 | `undefined`/`null` | 任何类型都不能赋值给never |
| 返回值 | 可以return或不return | 必须无法正常结束 |
| 使用场景 | 普通函数 | 异常、死循环、类型保护 |

---

## 28. 如何在TypeScript中使用Mixin？

### 什么是Mixin？

Mixin是一种代码复用模式，允许将功能"混合"到类中，实现多重继承的效果。

### 基础Mixin实现

```typescript
// 定义一个构造函数类型
type Constructor<T = {}> = new (...args: any[]) => T;

// 创建一个Mixin函数
function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = new Date();

    getTimestamp() {
      return this.timestamp;
    }
  };
}

function Activatable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    isActivated = false;

    activate() {
      this.isActivated = true;
    }

    deactivate() {
      this.isActivated = false;
    }
  };
}

// 基础类
class User {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

// 应用Mixin
const TimestampedUser = Timestamped(User);
const ActivatableTimestampedUser = Activatable(TimestampedUser);

// 使用
const user = new ActivatableTimestampedUser("John");
console.log(user.name);           // "John"
console.log(user.timestamp);      // Date对象
user.activate();                  // 调用mixin方法
console.log(user.isActivated);    // true
```

### 带类型的Mixin

```typescript
type Constructor<T = {}> = new (...args: any[]) => T;

// 定义Mixin的接口
interface Timestamped {
  timestamp: Date;
  getTimestamp(): Date;
}

interface Activatable {
  isActivated: boolean;
  activate(): void;
  deactivate(): void;
}

// 带返回类型的Mixin
function Timestamped<TBase extends Constructor>(Base: TBase): Constructor<Timestamped> & TBase {
  return class extends Base implements Timestamped {
    timestamp = new Date();

    getTimestamp() {
      return this.timestamp;
    }
  };
}

function Activatable<TBase extends Constructor>(Base: TBase): Constructor<Activatable> & TBase {
  return class extends Base implements Activatable {
    isActivated = false;

    activate() {
      this.isActivated = true;
    }

    deactivate() {
      this.isActivated = false;
    }
  };
}

// 组合使用
class Person {
  constructor(public name: string) {}
}

const SpecialPerson = Activatable(Timestamped(Person));

const person = new SpecialPerson("Alice");
// person具有Person + Timestamped + Activatable的所有属性
```

### 实际应用场景

```typescript
// 可序列化Mixin
function Serializable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    serialize(): string {
      return JSON.stringify(this);
    }

    static deserialize<T>(json: string): T {
      return JSON.parse(json);
    }
  };
}

// 事件派发Mixin
function EventEmitter<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    private listeners: Map<string, Function[]> = new Map();

    on(event: string, callback: Function) {
      if (!this.listeners.has(event)) {
        this.listeners.set(event, []);
      }
      this.listeners.get(event)!.push(callback);
    }

    emit(event: string, ...args: any[]) {
      const callbacks = this.listeners.get(event);
      if (callbacks) {
        callbacks.forEach(cb => cb(...args));
      }
    }
  };
}

// 使用
class Model {
  id: number;
  constructor(id: number) {
    this.id = id;
  }
}

const EnhancedModel = EventEmitter(Serializable(Model));

const model = new EnhancedModel(1);
model.on("change", () => console.log("Model changed!"));
model.emit("change");
console.log(model.serialize());
```

---

## 29. TypeScript中的类型断言是什么？

### 什么是类型断言？

类型断言是一种告诉编译器"我知道自己在做什么"的方式，允许你手动指定一个值的类型。

### 两种语法

```typescript
// 1. 尖括号语法
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// 2. as语法（推荐，尤其在JSX中）
let someValue2: any = "this is a string";
let strLength2: number = (someValue2 as string).length;
```

### 使用场景

#### 1. 处理any类型

```typescript
function getLength(something: string | number): number {
  if ((something as string).length) {
    return (something as string).length;
  } else {
    return something.toString().length;
  }
}
```

#### 2. DOM操作

```typescript
const input = document.getElementById("myInput") as HTMLInputElement;
input.value = "Hello";  // 可以访问value属性

// 或者使用非空断言
const button = document.querySelector(".btn")!;  // 告诉编译器一定不为null
button.addEventListener("click", handler);
```

#### 3. 处理联合类型

```typescript
interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

function getPet(): Bird | Fish {
  // ...
}

let pet = getPet();
(pet as Fish).swim();  // 断言为Fish类型
```

#### 4. 双重断言

```typescript
// 当类型完全不兼容时，可以先断言为unknown或any
const str: string = "hello";
const num = (str as unknown) as number;  // 双重断言
```

### 类型断言 vs 类型转换

```typescript
// 类型断言：只在编译时起作用，没有运行时影响
let value: any = "hello";
let len = (value as string).length;
// 编译后的JS：var len = value.length;

// 类型转换：有运行时影响
let num = Number("123");  // 真的转换为数字
```

### 非空断言操作符 `!`

```typescript
function processEntity(e?: Entity) {
  let s = e!.name;  // 断言e一定存在
}

// 与可选链的区别
let x = e?.name;     // 如果e为null/undefined，返回undefined
let y = e!.name;     // 断言e一定不为null/undefined
```

---

## 30. 如何检查TypeScript中的null和undefined？

### 严格空检查

启用`strictNullChecks`选项后，TypeScript会严格区分可空类型和不可空类型。

```json
{
  "compilerOptions": {
    "strictNullChecks": true
  }
}
```

### 检查方法

#### 1. 类型保护（Type Guards）

```typescript
function processValue(value: string | null | undefined) {
  // 方法1：直接检查
  if (value !== null && value !== undefined) {
    console.log(value.toUpperCase());  // OK
  }

  // 方法2：宽松检查（同时排除null和undefined）
  if (value != null) {
    console.log(value.toUpperCase());  // OK
  }

  // 方法3：Truthy检查
  if (value) {
    console.log(value.toUpperCase());  // OK
  }
}
```

#### 2. 可选链操作符 `?.`

```typescript
interface User {
  name?: string;
  address?: {
    city?: string;
  };
}

function getCity(user: User): string | undefined {
  return user.address?.city;
  // 等价于：user.address ? user.address.city : undefined
}
```

#### 3. 空值合并运算符 `??`

```typescript
const value = userInput ?? "default";
// 等价于：userInput !== null && userInput !== undefined ? userInput : "default"

// 与 || 的区别
const count1 = 0 || 10;      // 10（0被视为falsy）
const count2 = 0 ?? 10;      // 0（只有null/undefined才会使用默认值）
```

#### 4. 非空断言 `!`

```typescript
function getLength(str: string | null): number {
  // 如果你确定str不为null
  return str!.length;
}
```

#### 5. 类型断言函数

```typescript
function assertIsDefined<T>(value: T): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(`Expected 'value' to be defined, but received ${value}`);
  }
}

function processData(data: string | null) {
  assertIsDefined(data);  // 此后TypeScript知道data不为null
  console.log(data.toUpperCase());  // OK
}
```

### 实用工具类型

```typescript
// NonNullable<T>：从T中移除null和undefined
type T0 = NonNullable<string | number | undefined>;  // string | number

// 可选属性处理
interface User {
  name: string;
  age?: number;
}

// Required<T>：将所有属性变为必需
type RequiredUser = Required<User>;
// { name: string; age: number; }
```