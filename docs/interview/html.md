---
sidebar_position: 1
title: HTML（面试要点）
---

## 目录
- [HTML5有哪些新特性？](#1-html5有哪些新特性)
- [title与h1标签、b与strong标签、i与em标签有什么区别？](#2-title与h1标签b与strong标签i与em标签有什么区别)
- [img标签的title和alt属性有什么区别？](#3-img标签的title和alt属性有什么区别)
- [什么是语义化标签？使用语义化标签有什么好处？](#4-什么是语义化标签使用语义化标签有什么好处)
- [为什么img标签的src属性不能为空？应该如何正确处理？](#5-为什么img标签的src属性不能为空应该如何正确处理)
- [DOCTYPE有什么作用？](#6-doctype有什么作用)
- [行内元素、块级元素和空元素分别有哪些？](#7-行内元素块级元素和空元素分别有哪些)
- [iframe有哪些优缺点？](#8-iframe有哪些优缺点)
- [meta标签有哪些常用的属性和作用？](#9-meta标签有哪些常用的属性和作用)
- [data-* 自定义数据属性](#10-data--自定义数据属性)

---

## 1. HTML5有哪些新特性？

1. **语义化标签**：`<header>`、`<nav>`、`<main>`、`<article>`、`<section>`、`<aside>`、`<footer>` 等，使代码结构更清晰，有利于SEO和无障碍访问。
2. **表单功能增强**：新增多种input类型（email、url、number、range、date等）和属性（placeholder、required、autofocus等），提供更好的用户输入体验和数据验证。
3. **多媒体支持**：`<video>` 和 `<audio>` 标签原生支持音视频播放，无需Flash插件。
4. **图形绘制**：`<canvas>` 用于2D/3D图形绘制；SVG支持矢量图形。
5. **拖放API**：通过 `draggable` 属性和相关事件实现元素拖拽功能。
6. **Web存储**：localStorage、sessionStorage 以及 IndexedDB 提供客户端存储能力（详见 JS 面试要点）。
7. **地理定位**：Geolocation API允许获取用户地理位置信息。
8. **Web Workers**：允许JavaScript在后台线程中运行，避免阻塞UI。
9. **WebSocket**：实现服务器和客户端之间的全双工通信。
10. **离线应用**：Service Workers 配合 Cache API 支持离线访问（详见 JS 面试要点）。

### 拖放示例

```html
<div id="drag" draggable="true">拖动我</div>
<div id="drop">放到这里</div>

<script>
const drag = document.getElementById('drag');
const drop = document.getElementById('drop');

drag.addEventListener('dragstart', (e) => {
  e.dataTransfer.setData('text/plain', 'drag-data');
});

drop.addEventListener('dragover', (e) => e.preventDefault());
drop.addEventListener('drop', (e) => {
  e.preventDefault();
  const data = e.dataTransfer.getData('text/plain');
  drop.textContent = '已放下: ' + data;
});
</script>
```

---

## 2. title与h1标签、b与strong标签、i与em标签有什么区别？

### title与h1的区别：

**title**：
- 位于HTML文档的`<head>`部分，不在页面正文中显示
- 作为浏览器标签页标题和搜索引擎结果页面的标题显示
- 对SEO非常重要，是搜索引擎判断页面内容的重要依据

**h1**：
- 位于HTML文档的`<body>`部分，在页面正文中显示
- 代表页面主要内容的标题
- 对SEO同样重要，但重要性略低于title

### b与strong的区别：

**b标签**：
- HTML5 中 `<b>` 表示“需要引起注意但无额外重要性”的文本（如文章摘要关键词、产品名称）
- 默认以粗体显示，但不再是纯粹的“无语义”标签

**strong标签**：
- 表示文本内容具有很强的重要性、严重性或紧急性
- 具有语义含义，有助于SEO和无障碍访问
- 屏幕阅读器会对strong标签的内容加重语气

### i与em的区别：

**i标签**：
- HTML5 中 `<i>` 表示“另一种语气或专业术语”（如外文、技术名词、分类名称）
- 默认以斜体显示，但不再是纯粹的“无语义”标签

**em标签**：
- 表示文本内容需要强调
- 具有语义含义，有助于SEO和无障碍访问
- 屏幕阅读器会对em标签的内容加重语气

---

## 3. img标签的title和alt属性有什么区别？

**alt属性**：
- 当图片无法加载时显示的替代文本
- 对SEO和无障碍访问至关重要
- 搜索引擎通过alt文本理解图片内容
- 屏幕阅读器会朗读alt文本给视障用户

**title属性**：
- 鼠标悬停在图片上时显示的提示文本
- 对SEO帮助较小
- 部分屏幕阅读器可能朗读，但不应依赖它传递关键信息
- 主要用于提供额外的信息说明

---

## 4. 什么是语义化标签？使用语义化标签有什么好处？

**语义化标签定义**：
语义化标签是指能够清楚表达其包含内容含义和作用的HTML标签，不仅用于页面布局或样式展示，更重要的是传达内容的结构和意义。

**常见的语义化标签**：
- `<header>`：页面或章节的头部
- `<nav>`：导航链接
- `<main>`：页面主要内容
- `<article>`：独立的文章内容
- `<section>`：文档中的节
- `<aside>`：侧边栏内容
- `<footer>`：页面或章节的底部

**语义化的好处**：
1. **提高代码可读性和可维护性**：开发者能更容易理解页面结构
2. **有利于SEO**：搜索引擎更好地理解页面内容和结构
3. **提升无障碍体验**：屏幕阅读器能更准确地解读页面内容
4. **便于团队协作**：统一的语义化标准有助于团队沟通
5. **适应未来发展**：符合Web标准，便于新技术的应用

---

## 5. 为什么img标签的src属性不能为空？应该如何正确处理？

**空src的问题**：

1. **违反HTML规范**：src是`<img>`标签的必需属性，不能为空
2. **无效HTTP请求**：浏览器会向当前页面URL发起图片请求，造成404错误和日志污染
3. **可访问性问题**：屏幕阅读器无法正确识别图片用途
4. **布局偏移**：即使src为空，浏览器仍会为`<img>`保留占位空间，可能导致布局抖动
5. **性能浪费**：不必要的网络请求消耗带宽和处理时间

**正确做法**：

- **使用有效图片URL**：确保src指向有效的图片资源
- **按需渲染**：如果图片是可选的，应在URL存在时才输出`<img>`标签
- **占位图**：使用默认占位图或灰色背景作为临时显示
- **懒加载**：使用`loading="lazy"`属性延迟加载非关键图片
- **始终提供alt文本**：为所有图片提供有意义的alt描述
- **装饰性图片**：如果是纯装饰用途，可使用`role="presentation"`或CSS背景图

### 无障碍图片写法示例：

```html
<img src="/assets/avatar.jpg" alt="作者头像：张三，前端工程师" title="张三">
```

---

## 6. DOCTYPE有什么作用？

**DOCTYPE的作用**：

DOCTYPE（Document Type Declaration，文档类型声明）是HTML文档的第一行声明，用于告诉浏览器应该使用哪种HTML或XHTML规范来解析文档。

**主要作用**：

1. **触发标准模式**：声明DOCTYPE可以让浏览器以标准模式（Standards Mode）渲染页面，确保页面在不同浏览器中表现一致
2. **避免怪异模式**：如果没有DOCTYPE声明，浏览器会进入怪异模式（Quirks Mode），导致CSS渲染和JavaScript行为不一致
3. **验证文档**：帮助验证器检查HTML文档是否符合规范

**HTML5的DOCTYPE**：

```html
<!DOCTYPE html>
```

**特点**：
- 简洁明了，不区分大小写
- 向后兼容，适用于所有现代浏览器
- 不需要引用DTD（Document Type Definition）

---

## 7. 行内元素、块级元素和空元素分别有哪些？

> 在 HTML5 规范中，元素不再被严格划分为“行内/块级”，而是按**内容分类（content categories）**组织，如 Flow、Phrasing、Embedded、Interactive 等。但在面试中仍常以“行内/块级”提问，下面是传统说法与典型示例。

### 行内元素（Inline Elements）

行内元素不会独占一行，只占据它所需要的宽度。

**常见行内元素**：
- `<span>`：通用行内容器
- `<a>`：超链接
- `<strong>`、`<b>`：粗体文本
- `<em>`、`<i>`：斜体文本
- `<label>`：表单标签
- `<code>`：代码片段

> 注意：`<img>`、`<input>` 等属于**替换元素（replaced elements）**，能设置宽高、不需要闭合标签；`<br>` 属于**空元素（void elements）**，但它不是替换元素，也不能设置宽高。它们虽然默认布局中常表现为行内，但不宜与普通行内元素混为一谈。

### 块级元素（Block Elements）

块级元素会独占一行，宽度默认为父元素的100%。

**常见块级元素**：
- `<div>`：通用块级容器
- `<p>`：段落
- `<h1>`-`<h6>`：标题
- `<ul>`、`<ol>`、`<li>`：列表
- `<table>`：表格
- `<form>`：表单
- `<header>`、`<footer>`、`<nav>`、`<section>`、`<article>`、`<aside>`：HTML5语义化标签
- `<pre>`：预格式化文本
- `<blockquote>`：引用块

### 空元素（Void Elements）

空元素是没有内容的HTML元素，不需要闭合标签。

**常见空元素**：
- `<br>`：换行
- `<hr>`：水平分割线
- `<img>`：图片
- `<input>`：输入框
- `<link>`：引入外部资源
- `<meta>`：元数据
- `<area>`：图像映射区域
- `<base>`：基础URL
- `<col>`：表格列属性
- `<embed>`：嵌入外部内容
- `<source>`：媒体资源
- `<track>`：文本轨道
- `<wbr>`：可能的换行点

---

## 8. iframe有哪些优缺点？

### iframe的优点：

1. **页面隔离**：iframe内容与主页面隔离，样式和脚本互不影响
2. **模块化加载**：可以在页面中嵌入独立的HTML页面，实现模块化
3. **跨域内容展示**：可以嵌入第三方网站内容（如地图、视频等）
4. **资源并行加载**：iframe自身的资源下载可与主页面并行，但会阻塞主页面的`onload`事件
5. **历史记录管理**：iframe有自己的浏览历史，不影响主页面

### iframe的缺点：

1. **SEO不友好**：搜索引擎难以索引iframe内的内容
2. **增加HTTP请求**：每个iframe都会产生额外的HTTP请求，影响性能
3. **阻塞主页面加载**：iframe会阻塞主页面的onload事件
4. **移动端体验差**：在移动设备上，iframe可能导致滚动和触摸问题
5. **安全风险**：如果嵌入不可信的第三方内容，可能存在XSS攻击风险
6. **内存占用**：每个iframe都是一个完整的document，占用较多内存
7. **响应式布局困难**：iframe固定尺寸，难以实现响应式设计

### 安全使用iframe的建议：

```html
<!-- 使用sandbox属性限制iframe权限 -->
<iframe 
  src="https://example.com" 
  sandbox="allow-scripts allow-same-origin"
  loading="lazy"
  title="示例页面"
></iframe>
```

**sandbox属性值**：
- `allow-scripts`：允许执行脚本
- `allow-same-origin`：允许同源访问
- `allow-forms`：允许表单提交
- `allow-popups`：允许弹出窗口
- `allow-top-navigation`：允许导航到顶层窗口

---

## 9. meta标签有哪些常用的属性和作用？

### 常用的meta标签：

#### 1. 字符编码

```html
<meta charset="UTF-8">
```

#### 2. 视口设置（移动端必备）

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

> 注意：一般不建议使用 `maximum-scale=1.0, user-scalable=no`，因为这会阻止用户缩放页面，影响无障碍访问。

**viewport参数说明**：
- `width=device-width`：宽度等于设备宽度
- `initial-scale=1.0`：初始缩放比例为1
- `maximum-scale`：最大缩放比例
- `user-scalable`：是否允许用户缩放

#### 3. SEO相关

```html
<!-- 页面描述 -->
<meta name="description" content="这是一个前端知识库，包含HTML、CSS、JavaScript等面试题">

<!-- 关键词 -->
<meta name="keywords" content="前端,HTML,CSS,JavaScript,面试题">

<!-- 作者 -->
<meta name="author" content="张三">
```

#### 4. HTTP缓存控制

```html
<!-- 禁止缓存 -->
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
```

#### 5. IE兼容模式

```html
<!-- 使用最新的IE渲染引擎 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
```

#### 6. 移动端优化

```html
<!-- iOS Safari -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">

<!-- Android Chrome -->
<meta name="mobile-web-app-capable" content="yes">
```

#### 7. 社交媒体分享（Open Graph）

```html
<meta property="og:title" content="页面标题">
<meta property="og:description" content="页面描述">
<meta property="og:image" content="https://example.com/image.jpg">
<meta property="og:url" content="https://example.com">
```

---

## 10. data-* 自定义数据属性

### 什么是 data-* 属性

`data-*` 属性是 HTML5 引入的**自定义数据属性**机制，允许开发者在 HTML 元素上存储额外的自定义数据，而不会与 HTML 规范产生冲突。

```html
<!-- 基本用法 -->
<div data-user-id="123" data-role="admin" data-active="true">
  用户信息
</div>

<!-- 多单词命名使用 kebab-case -->
<div data-first-name="张" data-last-name="三">张三</div>

<!-- 存储 JSON 数据（需转义）-->
<div data-config='{"theme":"dark","fontSize":14}'>
  配置容器
</div>
```

### 使用规范

- 属性名必须以 `data-` 开头
- 属性名只能包含小写字母、数字、连字符(-)、点(.)和冒号(:)
- 属性值可以是任意字符串
- 避免使用 `data-xml`、`data-xmlns` 等保留名

### JavaScript 访问方式

```javascript
// 1. dataset API（推荐）
const element = document.querySelector('[data-user-id]');

// 读取 - 自动将 data-user-id 转换为 camelCase
console.log(element.dataset.userId);      // "123"
console.log(element.dataset.role);        // "admin"
console.log(element.dataset.active);      // "true" (字符串)

// 多单词属性名转换
console.log(element.dataset.firstName);   // "张"

// 写入
element.dataset.status = 'online';        // 添加 data-status="online"
element.dataset.userId = '456';           // 修改值

delete element.dataset.role;              // 删除 data-role 属性

// 2. getAttribute/setAttribute（兼容性好）
console.log(element.getAttribute('data-user-id')); // "123"
element.setAttribute('data-status', 'offline');

// 3. 获取所有 data 属性
const allData = element.dataset; // DOMStringMap 对象
for (let key in allData) {
  console.log(`${key}: ${allData[key]}`);
}
```

### 实际应用场景

**1. 列表项标识**

```html
<ul id="user-list">
  <li data-user-id="1" data-department="tech">
    张三 - 工程师
    <button class="delete-btn">删除</button>
  </li>
  <li data-user-id="2" data-department="hr">
    李四 - HR
    <button class="delete-btn">删除</button>
  </li>
</ul>

<script>
document.getElementById('user-list').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const li = e.target.closest('li');
    const userId = li.dataset.userId;      // 获取用户ID
    const dept = li.dataset.department;    // 获取部门

    console.log(`删除用户 ${userId}，部门: ${dept}`);
    deleteUser(userId);
  }
});
</script>
```

**2. 配置驱动的组件**

```html
<!-- 图片懒加载 -->
<img class="lazy"
     data-src="https://example.com/large-image.jpg"
     data-placeholder="loading.gif"
     alt="描述">

<script>
// 懒加载实现
const lazyImages = document.querySelectorAll('.lazy');

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;        // 使用 data-src
      img.classList.remove('lazy');
      imageObserver.unobserve(img);
    }
  });
});

lazyImages.forEach(img => imageObserver.observe(img));
</script>
```

**3. 状态标记**

```html
<div id="modal"
     data-visible="false"
     data-animation="fade"
     data-backdrop="true">
  模态框内容
</div>

<script>
const modal = document.getElementById('modal');

function openModal() {
  modal.dataset.visible = 'true';
  modal.style.display = 'block';

  if (modal.dataset.animation === 'fade') {
    modal.classList.add('fade-in');
  }
}

function closeModal() {
  modal.dataset.visible = 'false';
  modal.style.display = 'none';
}
</script>
```

**4. 存储复杂数据（配合 JSON）**

```html
<div id="chart"
     data-series='[{"name":"销售额","data":[120,200,150]}]'
     data-options='{"type":"line","animation":true}'>
</div>

<script>
const chartEl = document.getElementById('chart');

// 解析 JSON 数据
const series = JSON.parse(chartEl.dataset.series);
const options = JSON.parse(chartEl.dataset.options);

// 初始化图表
initChart(chartEl, series, options);
</script>
```

### CSS 选择器中使用

```css
/* 根据 data 属性选择元素 */
[data-role="admin"] {
  background-color: gold;
}

[data-status="active"] {
  border-left: 3px solid green;
}

/* 属性存在即可 */
[data-loading] {
  opacity: 0.6;
  pointer-events: none;
}

/* 属性值包含某字符串 */
[data-category*="urgent"] {
  color: red;
}

/* 多条件组合 */
[data-type="button"][data-variant="primary"] {
  background: blue;
  color: white;
}
```

### 与 Vue/React 结合

```vue
<!-- Vue -->
<template>
  <div
    :data-user-id="user.id"
    :data-is-vip="user.isVip"
    :data-login-time="Date.now()"
  >
    {{ user.name }}
  </div>
</template>
```

```jsx
// React
function UserCard({ user }) {
  return (
    <div
      data-user-id={user.id}
      data-department={user.department}
      data-role={user.role}
    >
      <h3>{user.name}</h3>
    </div>
  );
}
```

### 注意事项

| 注意点 | 说明 |
|--------|------|
| 数据类型 | 所有值都是字符串，数字/布尔值需要转换 |
| 大小限制 | 无明确限制，但建议不要存储大量数据 |
| 性能 | 频繁读写 dataset 比操作 DOM 属性慢 |
| 敏感数据 | 不要存储密码、token 等敏感信息 |
| SEO | 搜索引擎可能会读取 data 属性内容 |
