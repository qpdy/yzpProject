---
sidebar_position: 3
title: CSS
---

## 目录

- [1. CSS3有哪些新特性？](#1-css3有哪些新特性)
- [2. CSS选择符有哪些？哪些属性可以继承？](#2-css选择符有哪些哪些属性可以继承)
- [3. CSS优先级算法如何计算？](#3-css优先级算法如何计算)
- [4. 如何用CSS画一个三角形？](#4-如何用css画一个三角形)
- [5. 如何画出小于1px的线？](#5-如何画出小于1px的线)
- [6. 怎么让Chrome支持小于12px的文字？](#6-怎么让chrome支持小于12px的文字)
- [7. 对BFC规范(块级格式化上下文：block formatting context)的理解](#7-对bfc规范块级格式化上下文block-formatting-context的理解)
- [8. 清除浮动有哪些方式？](#8-清除浮动有哪些方式)
- [9. position有哪些值？分别是根据什么定位的？](#9-position有哪些值分别是根据什么定位的)
- [10. relative和absolute有什么区别？](#10-relative和absolute有什么区别)
- [11. 什么是CSS reset？](#11-什么是css-reset)
- [12. css sprite是什么,有什么优缺点？](#12-css-sprite是什么有什么优缺点)
- [13. display: none;与visibility: hidden;有什么区别？](#13-display-none与visibility-hidden有什么区别)
- [14. 了解重绘和重排吗，知道怎么去减少重绘和重排吗？](#14-了解重绘和重排吗知道怎么去减少重绘和重排吗)
- [15. ::before 和 :after中双冒号和单冒号有什么区别？](#15-before-和-after中双冒号和单冒号有什么区别)
- [16. 伪类和伪元素有什么区别？](#16-伪类和伪元素有什么区别)
- [17. CSS长度单位有哪些？](#17-css长度单位有哪些)
- [18. rem和em有什么区别？](#18-rem和em有什么区别)
- [19. webkit表单输入框placeholder的颜色值能改变吗？](#19-webkit表单输入框placeholder的颜色值能改变吗)
- [20. 什么是响应式设计？](#20-什么是响应式设计)
- [21. CSS有哪些布局方式？](#21-css有哪些布局方式)
- [22. 实现水平居中和垂直居中的方法有哪些？](#22-实现水平居中和垂直居中的方法有哪些)
- [23. 如何用CSS画半圆？](#23-如何用css画半圆)
- [24. 如何用CSS画一个扇形？](#24-如何用css画一个扇形)
- [25. 什么是CSS毛玻璃效果？](#25-什么是css毛玻璃效果)
- [26. 什么是双飞翼布局？如何实现？](#26-什么是双飞翼布局如何实现)
- [27. Flex布局详解](#27-flex布局详解)
- [28. Grid布局详解](#28-grid布局详解)
- [29. CSS预处理器有哪些？它们的区别是什么？](#29-css预处理器有哪些它们的区别是什么)
- [30. CSS变量（自定义属性）如何使用？](#30-css变量自定义属性如何使用)
- [31. 移动端适配方案有哪些？](#31-移动端适配方案有哪些)
- [32. 站点一键换肤的实现方式有哪些？](#32-站点一键换肤的实现方式有哪些)
- [33. 前端水印了解多少？](#33-前端水印了解多少)
- [34. 前端如何做页面主题色切换？](#34-前端如何做页面主题色切换)
- [35. 样式隔离方式有哪些？](#35-样式隔离方式有哪些)
- [36. display: inline、display: block 和 display: inline-block 有什么区别？](#36-display-inlinedisplay-block-和-display-inline-block-有什么区别)
- [37. link和@import引入CSS样式有什么区别？](#37-link和import引入css样式有什么区别)
- [38. 什么是 CSS 盒模型？box-sizing 的作用是什么？](#38-什么是-css-盒模型box-sizing-的作用是什么)

---

## 1. CSS3有哪些新特性？

1. **圆角效果**：通过`border-radius`属性实现元素的圆角效果。
2. **块阴影与文字阴影**：通过`box-shadow`和`text-shadow`实现阴影效果。
3. **多栏布局**：通过`column-count`和`column-gap`等属性实现多栏布局。
4. **使用rgba实现透明效果**：支持RGBA颜色模式，实现透明度控制。
5. **渐变效果**：支持线性渐变(`linear-gradient`)和径向渐变(`radial-gradient`)。
6. **使用"@Font-Face"实现定制字体**：通过`@font-face`规则引入自定义字体。
7. **多背景图**：支持为元素设置多个背景图片。
8. **文字或图像的变形处理**：通过`transform`属性实现旋转、缩放、倾斜等效果。
9. **图形化边界**：通过`border-image`属性实现自定义边框。
10. **媒体查询**：通过`@media`规则实现响应式设计。

## 2. CSS选择符有哪些？哪些属性可以继承？

### CSS选择符：

1. **通配选择符(*)**：匹配所有元素。
2. **id选择器(#)**：通过元素的id属性选择元素。
3. **类选择器(.)**：通过元素的class属性选择元素。
4. **标签选择器(div、p、h1...)**：通过HTML标签名称选择元素。
5. **相邻兄弟选择器(+)**：选择紧接在另一元素后的元素。
6. **后代选择器(ul li)**：选择某元素后代的所有指定元素。
7. **子元素选择器(>)**：选择某元素的直接子元素。
8. **属性选择器([attr])**：通过元素的属性选择元素。
9. **通用兄弟选择器(~)**：选择某元素之后的所有兄弟元素。
10. **伪类选择器(:hover, :first-child等)**：根据元素状态选择元素。
11. **伪元素选择器(::before, ::after等)**：选择元素的特定部分。

### CSS属性哪些可以继承：

**可继承属性**：
- 文字系列：font-family、font-size、font-weight、font-style、color、line-height、text-align、text-indent等
- 列表系列：list-style-type、list-style-position、list-style-image等
- 表格系列：border-collapse等

**不可继承属性**：
- 盒模型相关：border、padding、margin、width、height等
- 定位相关：position、top、right、bottom、left、z-index等
- 背景相关：background-color、background-image、background-repeat等
- 显示相关：display、visibility、overflow等

## 3. CSS优先级算法如何计算？

CSS优先级由高到低依次为：

1. **!important**：最高优先级，会覆盖其他所有样式。
2. **内联样式**：写在HTML元素的style属性中的样式，权重为1000。
3. **ID选择器**：以#开头的选择器，权重为100。
4. **类选择器、属性选择器、伪类选择器**：权重为10。
5. **标签选择器、伪元素选择器**：权重为1。
6. **通配选择符(*)**：权重为0。

**计算规则**：
- 优先级按权重数值比较，数值大的优先级高
- 相同权重时，后定义的样式覆盖先定义的样式
- !important会破坏正常的优先级规则，应谨慎使用

## 4. 如何用CSS画一个三角形？

通过设置元素的宽高为0，并利用border属性可以实现三角形效果：

```css
.triangle {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;  /* 左侧透明边框 */
  border-right: 50px solid transparent; /* 右侧透明边框 */
  border-bottom: 100px solid #3498db;   /* 底部蓝色边框 */
}
```

**原理**：
- 将元素宽高设为0，只留下border
- 通过设置不同方向border的颜色和透明度来形成三角形
- 透明border使用transparent关键字

**其他方向三角形**：
```css
/* 上三角 */
.up-triangle {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid #3498db;
}

/* 下三角 */
.down-triangle {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-top: 100px solid #3498db;
}

/* 左三角 */
.left-triangle {
  width: 0;
  height: 0;
  border-top: 50px solid transparent;
  border-bottom: 50px solid transparent;
  border-right: 100px solid #3498db;
}

/* 右三角 */
.right-triangle {
  width: 0;
  height: 0;
  border-top: 50px solid transparent;
  border-bottom: 50px solid transparent;
  border-left: 100px solid #3498db;
}
```

## 5. 如何画出小于1px的线？

### 使用 transform: scale() 缩放

通过缩放一个1px的线条来实现视觉上的0.5px效果：

```css
.thin-line {
  width: 100%;
  height: 1px;
  background: #000;
  transform: scaleY(0.5); /* 垂直方向缩放 */
  transform-origin: 0 0; /* 确保缩放后对齐顶部 */
}
```

### 使用 box-shadow 模糊效果

通过模糊阴影模拟细线：

```css
.thin-line {
  width: 100%;
  height: 1px;
  box-shadow: 0 0.5px 0 #000;
}
```

注意：部分浏览器可能渲染不一致，需测试目标平台。

### 使用 SVG（推荐复杂图形）

```html
<svg width="100%" height="1">
  <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="#000" stroke-width="0.5"/>
</svg>
```

## 6. 怎么让Chrome支持小于12px的文字？

### 使用 transform: scale() 缩放

```css
.small-text {
  font-size: 12px; /* 初始设为12px */
  display: inline-block; /* 确保缩放生效 */
  transform: scale(0.8); /* 缩放为80% */
  transform-origin: left center; /* 控制缩放基准点 */
}
```

### 使用 SVG（不受浏览器最小字体限制）

```html
<svg width="100" height="20">
  <text y="15" font-size="10" fill="black">10px文本</text>
</svg>
```

### 使用 calc() 计算字体大小

```css
.small-text {
  font-size: calc(12px * 0.7); /* 8.4px */
}
```

### 使用 viewport 单位

```css
.small-text {
  font-size: 2vw; /* 根据视口宽度调整 */
}
```

## 7. 对BFC规范(块级格式化上下文：block formatting context)的理解

BFC（Block Formatting Context）是Web页面的可视化CSS渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。

### BFC的特点：

1. **隔离性**：BFC内部的元素不会影响到外部元素，外部元素也不会影响内部元素。
2. **垂直排列**：内部的块级元素会在垂直方向上一个接一个地放置。
3. **边界折叠**：属于同一个BFC的两个相邻块级元素的margin会发生折叠。
4. **包含浮动**：BFC会包含其内部的浮动元素，不会发生高度塌陷。

### 如何触发BFC：

- 根元素（`<html>`）：默认情况下，HTML文档的根元素就是一个BFC。
- 浮动元素（float不为none）：left、right
- 绝对定位或固定定位元素（position为absolute或fixed）
- overflow不为visible的块级元素：auto、scroll、hidden
- 行内块元素（display为inline-block）
- 表格单元格（display: table-cell）和表格标题（display: table-caption）
- display: flow-root（专门用于生成BFC，无副作用）
- 弹性盒子（display: flex或display: inline-flex的直接子元素）
- 网格布局（display: grid或display: inline-grid的直接子元素）

### BFC的应用场景：

1. **清除浮动**：包含浮动元素，防止高度塌陷
2. **防止margin折叠**：避免相邻元素的margin合并
3. **阻止元素被浮动元素覆盖**：创建新的BFC避免文字环绕

## 8. 清除浮动有哪些方式？

### 1. 触发BFC

通过触发父元素的BFC来包含浮动元素：

```css
.parent {
  overflow: hidden; /* 或者 overflow: auto */
  /* 或者 display: flow-root; */
}
```

### 2. 使用空元素清除浮动

在浮动元素后面添加一个空的div，并设置clear属性：

```css
.clear {
  clear: both;
  height: 0;
  overflow: hidden;
}
```

```html
<div class="parent">
  <div class="float-element">浮动元素</div>
  <div class="clear"></div>
</div>
```

### 3. 使用伪元素清除浮动（推荐）

```css
.clearfix::after {
  content: "";
  display: block;
  clear: both;
  height: 0;
  visibility: hidden;
}

.clearfix {
  zoom: 1; /* 兼容IE6/7 */
}
```

### 4. 使用flexbox或grid布局

现代布局方式天然解决了浮动问题：

```css
.parent {
  display: flex; /* 或者 display: grid */
}
```

## 9. position有哪些值？分别是根据什么定位的？

### position属性值：

1. **static（默认值）**：正常文档流定位，top、right、bottom、left属性无效。
2. **relative（相对定位）**：相对于元素在正常文档流中的位置进行定位，不脱离文档流。
3. **absolute（绝对定位）**：相对于最近的已定位祖先元素（position不为static）进行定位，脱离文档流。
4. **fixed（固定定位）**：相对于浏览器窗口进行定位，脱离文档流。
5. **sticky（粘性定位）**：基于用户的滚动位置来定位，相当于relative和fixed的结合体。

### 定位参考点：

- **relative**：相对于元素自身在正常文档流中的位置
- **absolute**：相对于最近的position不为static的祖先元素
- **fixed**：相对于浏览器视口（viewport）
- **sticky**：相对于元素在正常文档流中的位置，但在特定阈值时表现为fixed

## 10. relative和absolute有什么区别？

### 1. 文档流影响

- **relative**：不脱离文档流，仍然占据原来的空间
- **absolute**：脱离文档流，不占据原来的空间

### 2. 定位参考点

- **relative**：相对于元素自身在正常文档流中的位置
- **absolute**：相对于最近的position不为static的祖先元素

### 3. 定位属性影响

- **relative**：top、right、bottom、left相对于自身位置偏移
- **absolute**：top、right、bottom、left相对于定位祖先元素的边框

### 4. z-index影响

- **relative**：可以使用z-index改变层叠顺序
- **absolute**：可以使用z-index改变层叠顺序，默认层叠等级较高

## 11. 什么是CSS reset？

CSS reset是一种技术手段，用于消除不同浏览器对HTML元素默认样式的差异，确保网页在各种浏览器中具有一致的显示效果。

### CSS reset的作用：

1. **统一默认样式**：消除浏览器默认样式的差异
2. **减少重复代码**：避免为每个元素重新定义基础样式
3. **提高开发效率**：提供统一的样式起点

### 常见的CSS reset方案：

1. **传统reset.css**：
   ```css
   * {
     margin: 0;
     padding: 0;
     border: 0;
   }
   ```

2. **normalize.css**：
   - 保留有用的默认样式
   - 修复浏览器bug
   - 提供跨浏览器一致性

3. **现代CSS reset**：
   ```css
   *, *::before, *::after {
     box-sizing: border-box;
   }
   
   body {
     margin: 0;
     font-family: sans-serif;
   }
   ```

## 12. css sprite是什么,有什么优缺点？

### 什么是CSS Sprite（雪碧图）？

CSS Sprite是一种网页图片处理技术，将多个小图标合并成一张大图片，通过background-position属性来显示不同的图标部分。

### 优点：

1. **减少HTTP请求**：将多个图片合并为一个，减少网络请求次数
2. **提升性能**：减少服务器压力，加快页面加载速度
3. **减少图片字节数**：合并后的图片总字节数通常小于单个图片之和

### 缺点：

1. **维护困难**：修改单个图标需要重新制作整张图片
2. **定位复杂**：需要精确计算background-position坐标
3. **增加开发成本**：需要额外的图片处理工作
4. **缓存问题**：修改一个图标会导致整张图片重新缓存

### 现代替代方案：

1. **Icon Fonts**：使用字体文件代替图片
2. **SVG Symbols**：使用SVG矢量图形
3. **CSS Icons**：纯CSS绘制图标

## 13. display: none;与visibility: hidden;有什么区别？

### 1. 占用空间的区别

- **display: none;**：元素完全从渲染树中消失，不占用任何空间
- **visibility: hidden;**：元素隐藏但仍占据原来的空间

### 2. 重绘和回流的影响

- **visibility: hidden;**：只触发重绘（repaint）
- **display: none;**：既触发重绘又触发回流（reflow）

### 3. 子元素继承性

- **display: none;**：子元素也会被隐藏且无法显示
- **visibility: hidden;**：子元素可以设置visibility: visible来显示

### 4. 性能影响

- **display: none;**：性能开销较大，因为涉及DOM结构变化
- **visibility: hidden;**：性能开销较小，只涉及样式变化

## 14. 了解重绘和重排吗，知道怎么去减少重绘和重排吗？

### 重绘（Repaint）

重绘是指元素样式改变但几何属性（如宽高、位置）未改变时，浏览器重新绘制元素外观的过程。

**触发重绘的操作**：
- 颜色修改
- 背景图片修改
- 文本内容修改
- 透明度修改
- 边框样式修改

### 重排（Reflow）

重排是指元素的几何属性发生变化时，浏览器重新计算元素的几何属性并重新构建渲染树的过程。

**触发重排的操作**：
- 页面初始渲染
- 添加/删除可见DOM元素
- 改变元素位置（left、top等）
- 改变元素尺寸（宽、高、内外边距、边框等）
- 改变元素内容（文本或图片等）
- 改变窗口尺寸
- 获取某些属性（offsetTop、offsetLeft、offsetWidth、offsetHeight等）

### 如何减少重绘和重排？

1. **批量修改样式**：
   ```javascript
   // 不好的做法
   element.style.width = '100px';
   element.style.height = '100px';
   element.style.background = 'red';
   
   // 好的做法
   element.className = 'new-style';
   ```

2. **使用文档片段**：
   ```javascript
   const fragment = document.createDocumentFragment();
   // 添加多个元素到fragment
   parent.appendChild(fragment);
   ```

3. **避免频繁读取布局属性**：
   ```javascript
   // 不好的做法
   for (let i = 0; i < elements.length; i++) {
     elements[i].style.left = elements[i].offsetLeft + 10 + 'px';
   }
   
   // 好的做法
   let cachedOffsetLeft;
   for (let i = 0; i < elements.length; i++) {
     cachedOffsetLeft = elements[i].offsetLeft;
     elements[i].style.left = cachedOffsetLeft + 10 + 'px';
   }
   ```

4. **使用transform和opacity**：这两个属性不会触发重排，只会触发合成

## 15. ::before 和 :after中双冒号和单冒号有什么区别？

### 单冒号（:before、:after）

这是CSS2和CSS3早期版本的写法，用于表示伪类（Pseudo-classes）或伪元素（Pseudo-elements）。在CSS2中，伪类和伪元素的语法没有严格区分。

### 双冒号（::before、::after）

这是CSS3引入的新语法，专门用于表示伪元素（Pseudo-elements）。CSS3明确区分了伪类（单冒号，如:hover）和伪元素（双冒号），以提高代码可读性和规范性。

| 特性 | 单冒号（:before） | 双冒号（::before） |
|------|------------------|-------------------|
| 规范 | CSS2/CSS3（旧语法） | CSS3（新语法） |
| 兼容性 | 全浏览器支持 | 现代浏览器支持 |
| 用途 | 伪类或伪元素 | 仅伪元素 |

### 使用建议：

- 现代项目推荐使用双冒号语法以保持代码一致性
- 需要兼容老版本浏览器时可使用单冒号
- 伪类（如:hover、:focus）只能使用单冒号

## 16. 伪类和伪元素有什么区别？

### 伪类（Pseudo-classes）

伪类用于根据元素的状态或位置动态应用样式，以冒号(:)开头。

**状态类**：
- :hover：鼠标悬停时
- :focus：元素获得焦点（如输入框）
- :active：元素被激活（如点击按钮）
- :visited：已访问的链接
- :disabled：禁用的表单元素

**位置类**：
- :first-child：父元素的第一个子元素
- :nth-child(n)：第N个子元素（支持公式如 2n+1）
- :last-child：最后一个子元素
- :first-of-type：同类型元素的第一个
- :last-of-type：同类型元素的最后一个

**其他**：
- :not(selector)：排除特定元素
- :checked：选中的复选框或单选按钮
- :empty：没有子元素的元素

### 伪元素（Pseudo-elements）

伪元素用于样式化元素的特定部分或生成虚拟内容，以双冒号(::)开头。

**样式化部分内容**：
- ::first-line：段落的首行
- ::first-letter：段落的首字母
- ::selection：用户选中的文本

**生成虚拟内容**：
- ::before：在元素前插入内容（常用于图标或装饰）
- ::after：在元素后插入内容（常用于清除浮动或装饰）

### 主要区别：

1. **功能**：伪类表示状态，伪元素表示内容
2. **语法**：伪类使用单冒号，伪元素推荐使用双冒号
3. **数量**：一个元素可以有多个伪类，但只能有两个伪元素(::before和::after)

## 17. CSS长度单位有哪些？

### 绝对单位:

| 单位 | 名称 | 说明 | 示例 |
|------|------|------|------|
| px | 像素 | 屏幕上的最小物理单位，绝对固定值。 | width: 100px; |
| cm | 厘米 | 基于物理长度的单位，1cm = 96px/2.54（英寸转换）。 | font-size: 0.5cm; |
| mm | 毫米 | 1mm = 0.1cm。 | margin: 5mm; |
| in | 英寸 | 1in = 96px = 2.54cm。 | padding: 0.2in; |
| pt | 点 | 1pt = 1/72in，常用于打印样式。 | line-height: 12pt; |
| pc | 派卡 | 1pc = 12pt = 1/6in。 | border-width: 0.5pc; |

### 相对单位:

#### 相对于字体大小的单位:

| 单位 | 名称 | 参照基准 | 示例 |
|------|------|----------|------|
| em | 相对当前字体大小 | 相对于当前元素的字体大小。如果当前元素未设置字体大小，则继承父元素。 | font-size: 1.2em; |
| rem | 相对根元素字体大小 | 相对外部元素（`<html>`）的字体大小。 | padding: 1.5rem; |
| ex | 相对当前字体 x 高度 | 相对于当前元素的字体 x 高度（通常为小写字母 x 的高度）。 | margin: 0.5ex; |
| ch | 相对数字 0 的宽度 | 相对于当前元素的字体中数字 0 的宽度。 | width: 20ch; |

#### 相对于视口的单位:

| 单位 | 名称 | 参照基准 | 示例 |
|------|------|----------|------|
| vw | 视口宽度百分比 | 1vw = 视口宽度的 1%。 | width: 50vw; |
| vh | 视口高度百分比 | 1vh = 视口高度的 1%。 | height: 100vh; |
| vmin | 视口较小边百分比 | 1vmin = 视口较小边（宽度或高度）的 1%。 | font-size: 3vmin; |
| vmax | 视口较大边百分比 | 1vmax = 视口较大边（宽度或高度）的 1%。 | margin: 2vmax; |

### 使用建议：

1. **px**：适合固定尺寸的设计元素
2. **em/rem**：适合响应式字体大小
3. **%**：适合相对布局
4. **vw/vh**：适合全屏或视口相关的布局

## 18. rem和em有什么区别？

### em

em是一个相对长度单位，其相对基准是当前元素的字体大小。如果当前元素没有显式设置字体大小，则会向上查找父元素的字体大小，直到找到一个设置了字体大小的元素或到达根元素（`<html>`）。

**特点**：
- 相对于当前元素的字体大小
- 会受到父元素字体大小的影响
- 可能出现累积效应

```css
.parent {
  font-size: 16px;
}

.child {
  font-size: 1.5em; /* 16px * 1.5 = 24px */
}
```

### rem

rem同样是相对长度单位，不过它的相对基准是根元素（`<html>`）的字体大小。无论当前元素处于文档的哪个层级，其rem单位的计算都只与根元素的字体大小有关。

**特点**：
- 相对于根元素的字体大小
- 不受父元素字体大小的影响
- 更容易预测和控制

```css
html {
  font-size: 16px;
}

.element {
  font-size: 1.5rem; /* 16px * 1.5 = 24px */
}
```

### 使用场景：

- **em**：适合需要根据父元素字体大小缩放的场景，如组件内部的相对尺寸
- **rem**：适合全局统一的尺寸控制，如页面整体字体大小和间距

## 19. webkit表单输入框placeholder的颜色值能改变吗？

可以通过CSS的伪元素选择器来修改表单输入框中placeholder（占位符）的颜色值。

### WebKit浏览器（Chrome、Safari）：

```css
input::-webkit-input-placeholder {
    color: #ff0000; /* 红色 */
    font-style: italic;
}

textarea::-webkit-input-placeholder {
    color: #ff0000;
    font-style: italic;
}
```

### Firefox浏览器：

```css
input::-moz-placeholder {
    color: #ff0000;
    font-style: italic;
    opacity: 1; /* Firefox默认透明度为0.54 */
}

textarea::-moz-placeholder {
    color: #ff0000;
    font-style: italic;
    opacity: 1;
}
```

### Edge浏览器：

```css
input::-ms-input-placeholder {
    color: #ff0000;
    font-style: italic;
}

textarea::-ms-input-placeholder {
    color: #ff0000;
    font-style: italic;
}
```

### 现代浏览器标准写法：

```css
input::placeholder {
    color: #ff0000;
    font-style: italic;
    opacity: 1;
}

textarea::placeholder {
    color: #ff0000;
    font-style: italic;
    opacity: 1;
}
```

### 兼容性写法：

```css
input::-webkit-input-placeholder { color: #ff0000; font-style: italic; }
input::-moz-placeholder { color: #ff0000; font-style: italic; opacity: 1; }
input:-ms-input-placeholder { color: #ff0000; font-style: italic; }
input::placeholder { color: #ff0000; font-style: italic; opacity: 1; }
```

## 20. 什么是响应式设计？

响应式设计（Responsive Design）是一种前端开发技术，旨在让网页或应用在不同设备（如桌面、平板、手机）和屏幕尺寸下自动调整布局、内容和交互方式，以提供一致且优化的用户体验。其核心目标是"一次开发，适配所有设备"。

### 响应式设计的核心原则：

1. **流动网格**：使用相对单位（如%、em、rem）而非固定单位（px）
2. **弹性图片**：图片能根据容器大小自动缩放
3. **媒体查询**：根据不同设备特性应用不同样式

### 响应式设计的技术：

| 技术 | 作用 |
|------|------|
| 媒体查询（Media Queries） | 根据屏幕宽度、高度、方向等条件，动态应用不同的CSS样式。 |
| 弹性布局（Flexbox） | 通过灵活的盒模型，实现元素在不同屏幕尺寸下的自适应排列。 |
| 网格布局（CSS Grid） | 提供二维布局系统，支持复杂的多列响应式设计。 |
| 视口单位（Viewport Units） | 使用vw、vh等单位，让元素尺寸基于视口大小动态计算。 |
| 可缩放图片和媒体 | 通过max-width: 100%和srcset属性，确保图片和视频适应不同屏幕。 |

### 媒体查询示例：

```css
/* 移动设备 */
@media screen and (max-width: 768px) {
  .container {
    width: 100%;
    padding: 10px;
  }
}

/* 平板设备 */
@media screen and (min-width: 769px) and (max-width: 1024px) {
  .container {
    width: 90%;
    padding: 20px;
  }
}

/* 桌面设备 */
@media screen and (min-width: 1025px) {
  .container {
    width: 80%;
    max-width: 1200px;
    padding: 30px;
  }
}
```

## 21. CSS有哪些布局方式？

### 1. 浮动布局（Float）

通过 float: left/right 让元素脱离文档流，其他元素围绕其排列。

```css
.float-left {
  float: left;
  width: 50%;
}

.float-right {
  float: right;
  width: 50%;
}
```

### 2. 定位布局（Position）

通过 position: relative/absolute/fixed 定位元素。

```css
.relative {
  position: relative;
  top: 10px;
  left: 10px;
}

.absolute {
  position: absolute;
  top: 0;
  right: 0;
}
```

### 3. Flexbox（弹性盒子）

通过 display: flex 将容器变为弹性容器，子元素可灵活排列。

```css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

### 4. Grid（网格布局）

通过 display: grid 将容器划分为二维网格（行和列）。

```css
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}
```

### 5. 多列布局（Multi-column）

通过 column-count 或 column-width 将内容分成多列。

```css
.multi-column {
  column-count: 3;
  column-gap: 20px;
}
```

### 6. 表格布局（Table）

通过 display: table 模拟表格行为。

```css
.table-layout {
  display: table;
  width: 100%;
}

.table-row {
  display: table-row;
}

.table-cell {
  display: table-cell;
}
```

### 7. 媒体查询（Media Queries）

根据屏幕尺寸调整样式。

```css
.responsive-box {
  width: 100%;
}

@media screen and (min-width: 768px) {
  .responsive-box {
    width: 50%;
  }
}
```

### 8. 视口单位（Viewport Units）

使用 vw、vh 等单位基于视口大小设置尺寸。

```css
.full-width {
  width: 100vw;
}

.full-height {
  height: 100vh;
}
```

### 各种布局方式对比：

| 布局方式 | 优点 | 缺点 | 适用场景 |
|----------|------|------|----------|
| 浮动 | 兼容性好（旧浏览器） | 需清除浮动，布局复杂 | 简单多栏布局（已逐渐淘汰） |
| 定位 | 精确控制位置 | 脱离文档流，维护性差 | 固定导航栏、弹窗等 |
| Flexbox | 一维布局灵活，居中、对齐简单 | 二维布局需结合 Grid | 导航栏、卡片布局、表单对齐 |
| Grid | 二维布局强大，精确控制行列 | 浏览器兼容性稍差（IE不支持） | 复杂页面布局（如仪表盘） |
| 多列 | 文本分栏简单 | 仅适用于文本 | 文章、新闻列表 |
| 表格布局 | 垂直居中、等高列简单 | 语义化差 | 需垂直居中的非表格内容 |

## 22. 实现水平居中和垂直居中的方法有哪些？

### 1. 使用 Flexbox

```css
.container {
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    height: 100vh; /* 视口高度 */
    background-color: lightgray;
}

.box {
    width: 100px;
    height: 100px;
    background-color: lightblue;
}
```

### 2. 使用 Grid

```css
.container {
    display: grid;
    place-items: center; /* 水平和垂直居中 */
    height: 100vh; /* 视口高度 */
    background-color: lightgray;
}

.box {
    width: 100px;
    height: 100px;
    background-color: lightblue;
}
```

### 3. 使用绝对定位和 Transform

```css
.container {
    position: relative; /* 父元素相对定位 */
    height: 100vh; /* 视口高度 */
    background-color: lightgray;
}

.box {
    position: absolute; /* 子元素绝对定位 */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* 调整自身位置 */
    width: 100px;
    height: 100px;
    background-color: lightblue;
}
```

### 4. 使用 margin: auto

```css
.container {
    display: flex;
    height: 100vh; /* 视口高度 */
    background-color: lightgray;
}

.box {
    margin: auto; /* 自动外边距实现居中 */
    width: 100px;
    height: 100px;
    background-color: lightblue;
}
```

### 5. 使用文本对齐（仅适用于行内元素）

```css
.container {
    text-align: center; /* 水平居中 */
    display: table-cell;
    vertical-align: middle; /* 垂直居中 */
    width: 100vw;
    height: 100vh;
    background-color: lightgray;
}

.box {
    display: inline-block;
    width: 100px;
    height: 100px;
    background-color: lightblue;
}
```

### 6. 使用表格布局

```css
.container {
    display: table;
    width: 100%;
    height: 100vh;
    background-color: lightgray;
}

.cell {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
}

.box {
    display: inline-block;
    width: 100px;
    height: 100px;
    background-color: lightblue;
}
```

## 23. 如何用CSS画半圆？

### 水平半圆

通过设置一个元素的宽度为高度的两倍，并将border-radius设置为50%，可以实现水平半圆。

```css
.horizontal-semicircle {
    width: 200px;
    height: 100px; /* 高度为宽度的一半 */
    background-color: #ff6b6b;
    border-radius: 100px 100px 0 0; /* 左上和右上为圆角 */
}
```

### 垂直半圆

通过设置一个元素的高度为宽度的两倍，并将border-radius设置为50%，可以实现垂直半圆。

```css
.vertical-semicircle {
    width: 100px;
    height: 200px; /* 高度为宽度的两倍 */
    background-color: #48dbfb;
    border-radius: 0 100px 100px 0; /* 右上和右下为圆角 */
}
```

### 使用伪元素绘制半圆

通过伪元素（如::before或::after）可以更灵活地绘制半圆，尤其是在需要与其他元素结合时。

```css
.semicircle-container {
    position: relative;
    width: 100px;
    height: 50px; /* 高度为宽度的一半 */
}

.semicircle-container::before {
    content: "";
    position: absolute;
    width: 100px;
    height: 100px; /* 伪元素高度为宽度 */
    background-color: #1dd1a1;
    border-radius: 50%;
    clip-path: inset(0 0 50% 0); /* 裁剪为上半部分 */
}
```

### 使用CSS clip-path

clip-path 可以直接裁剪元素为半圆形状，适合更复杂的形状需求。

```css
.clip-semicircle {
    width: 200px;
    height: 100px;
    background-color: #feca57;
    clip-path: ellipse(100px 50px at 50% 50%); /* 椭圆裁剪为半圆 */
}
```

### 使用径向渐变

```css
.gradient-semicircle {
    width: 200px;
    height: 100px;
    background: radial-gradient(circle at 50% 0%, #ff9ff3 50%, transparent 50%);
}
```

## 24. 如何用CSS画一个扇形？

通过结合 border-radius、transform 和 clip-path 属性来实现：

### 方法一：使用border和border-radius

```css
.sector {
  width: 0;
  height: 0;
  border: 100px solid transparent;
  border-radius: 50%;
  border-top-color: #3498db;
  transform: rotate(30deg);
}
```

### 方法二：使用伪元素和clip-path

```css
.sector {
    width: 100px;
    height: 100px;
    background-color: #3498db;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
}

.sector::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #e74c3c;
    transform-origin: 100% 50%;
    transform: rotate(120deg);
    clip-path: polygon(50% 50%, 100% 0, 100% 100%);
}
```

### 方法三：使用conic-gradient（现代浏览器）

```css
.sector {
    width: 100px;
    height: 100px;
    background: conic-gradient(from 0deg, #3498db 0deg, #3498db 90deg, transparent 90deg, transparent 360deg);
    border-radius: 50%;
}
```

### 方法四：使用SVG

```html
<svg width="100" height="100">
  <path d="M50,50 L50,0 A50,50 0 0,1 85.36,14.64 Z" fill="#3498db"/>
</svg>
```

## 25. 什么是CSS毛玻璃效果？

CSS毛玻璃效果（Glassmorphism）是一种设计趋势，通过模糊背景来创建半透明的效果，类似于磨砂玻璃的视觉效果。

### 实现方法：

```css
.glass-effect {
    background: rgba(255, 255, 255, 0.25); /* 半透明背景 */
    backdrop-filter: blur(10px); /* 背景模糊 */
    -webkit-backdrop-filter: blur(10px); /* Safari兼容 */
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}
```

### 属性说明：

- **backdrop-filter**: 对元素背后区域进行滤镜效果处理
- **blur()**: 高斯模糊函数
- **rgba()**: 设置半透明颜色
- **box-shadow**: 添加阴影效果增强立体感

### 注意事项：

1. **浏览器兼容性**：需要现代浏览器支持
2. **性能影响**：模糊效果可能影响页面性能
3. **固定定位**：通常需要与固定定位元素配合使用才能看到效果

## 26. 什么是双飞翼布局？如何实现？

双飞翼布局是一种经典的三栏布局方案，左右两栏固定宽度，中间栏自适应填充剩余空间，且中间栏内容优先渲染。

### 方法一：使用 Flexbox

```css
.container {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100vh;
}

.left, .right {
    width: 200px;
    background-color: #f0f0f0;
}

.center {
    flex-grow: 1;
    background-color: #e0e0e0;
    order: -1; 
}
```

### 方法二：使用 Grid

```css
.container {
    display: grid;
    grid-template-columns: 200px 1fr 200px;
    min-height: 100vh;
}

.son{
    background-color: #f0f0f0;
}
```

### 方法三：使用 Float（传统方法）

```css
.container {
    width: 100%;
    min-width: 600px; /* 防止布局崩溃 */
}

.center-wrapper {
    float: left;
    width: 100%;
}

.center {
    margin: 0 200px; /* 左右各留出200px空间 */
    background-color: #e0e0e0;
    height: 100vh;
}

.left {
    float: left;
    width: 200px;
    margin-left: -100%;
    background-color: #f0f0f0;
    height: 100vh;
}

.right {
    float: left;
    width: 200px;
    margin-left: -200px;
    background-color: #f0f0f0;
    height: 100vh;
}

.clearfix::after {
    content: "";
    display: table;
    clear: both;
}
```

### 方法四：使用 Flexbox（另一种实现）

```css
.container {
    display: flex;
    width: 100%;
    height: 100vh;
} 

.son{
    width: 200px;
    background-color: #f0f0f0;
}

.center {
    flex: 1;
    background-color: #e0e0e0;
}
```

### 各方法对比：

| 方法 | 优点 | 缺点 | 兼容性 |
|------|------|------|--------|
| Flexbox | 简单直观，易于理解 | IE10以下不支持 | 现代浏览器 |
| Grid | 功能强大，代码简洁 | IE不支持 | 现代浏览器 |
| Float | 兼容性好 | 代码复杂，需清除浮动 | 所有浏览器 |

## 27. Flex布局详解

### 什么是Flex布局？

Flex布局（Flexible Box Layout）是一种一维布局模型，用于在容器中分配空间和对齐项目。它可以轻松实现垂直居中、等高列、自适应布局等效果。

### 容器属性

#### 1. display: flex

将元素设置为Flex容器：

```css
.container {
  display: flex; /* 块级Flex容器 */
  /* 或 */
  display: inline-flex; /* 行内Flex容器 */
}
```

#### 2. flex-direction（主轴方向）

```css
.container {
  flex-direction: row; /* 默认值，水平从左到右 */
  flex-direction: row-reverse; /* 水平从右到左 */
  flex-direction: column; /* 垂直从上到下 */
  flex-direction: column-reverse; /* 垂直从下到上 */
}
```

#### 3. flex-wrap（换行）

```css
.container {
  flex-wrap: nowrap; /* 默认值，不换行 */
  flex-wrap: wrap; /* 换行，第一行在上方 */
  flex-wrap: wrap-reverse; /* 换行，第一行在下方 */
}
```

#### 4. justify-content（主轴对齐）

```css
.container {
  justify-content: flex-start; /* 默认值，左对齐 */
  justify-content: flex-end; /* 右对齐 */
  justify-content: center; /* 居中 */
  justify-content: space-between; /* 两端对齐，项目间间隔相等 */
  justify-content: space-around; /* 每个项目两侧间隔相等 */
  justify-content: space-evenly; /* 项目间和两端间隔都相等 */
}
```

#### 5. align-items（交叉轴对齐）

```css
.container {
  align-items: stretch; /* 默认值，拉伸填充容器 */
  align-items: flex-start; /* 交叉轴起点对齐 */
  align-items: flex-end; /* 交叉轴终点对齐 */
  align-items: center; /* 交叉轴中点对齐 */
  align-items: baseline; /* 项目第一行文字基线对齐 */
}
```

#### 6. align-content（多行对齐）

```css
.container {
  align-content: stretch; /* 默认值，轴线占满整个交叉轴 */
  align-content: flex-start; /* 与交叉轴起点对齐 */
  align-content: flex-end; /* 与交叉轴终点对齐 */
  align-content: center; /* 与交叉轴中点对齐 */
  align-content: space-between; /* 与交叉轴两端对齐 */
  align-content: space-around; /* 每根轴线两侧间隔相等 */
}
```

### 项目属性

#### 1. order（排序）

```css
.item {
  order: 0; /* 默认值，数值越小越靠前 */
}
```

#### 2. flex-grow（放大比例）

```css
.item {
  flex-grow: 0; /* 默认值，不放大 */
  flex-grow: 1; /* 平分剩余空间 */
}
```

#### 3. flex-shrink（缩小比例）

```css
.item {
  flex-shrink: 1; /* 默认值，空间不足时缩小 */
  flex-shrink: 0; /* 不缩小 */
}
```

#### 4. flex-basis（初始大小）

```css
.item {
  flex-basis: auto; /* 默认值，项目本来大小 */
  flex-basis: 200px; /* 固定大小 */
}
```

#### 5. flex（简写）

```css
.item {
  flex: 1; /* 相当于 flex: 1 1 0% */
  flex: auto; /* 相当于 flex: 1 1 auto */
  flex: none; /* 相当于 flex: 0 0 auto */
}
```

#### 6. align-self（单个项目对齐）

```css
.item {
  align-self: auto; /* 默认值，继承父元素 */
  align-self: flex-start;
  align-self: flex-end;
  align-self: center;
  align-self: baseline;
  align-self: stretch;
}
```

### Flex布局实战案例

#### 案例1：三列等宽布局

```css
.container {
  display: flex;
}

.item {
  flex: 1;
}
```

#### 案例2：左右固定，中间自适应

```css
.container {
  display: flex;
}

.left, .right {
  flex: 0 0 200px;
}

.center {
  flex: 1;
}
```

#### 案例3：垂直水平居中

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
```

## 28. Grid布局详解

### 什么是Grid布局？

Grid布局（网格布局）是一种二维布局系统，可以同时处理行和列。它比Flexbox更强大，适合复杂的页面布局。

### 容器属性

#### 1. display: grid

```css
.container {
  display: grid; /* 块级Grid容器 */
  /* 或 */
  display: inline-grid; /* 行内Grid容器 */
}
```

#### 2. grid-template-columns 和 grid-template-rows

```css
.container {
  /* 固定宽度 */
  grid-template-columns: 100px 200px 100px;
  
  /* 百分比 */
  grid-template-columns: 33.33% 33.33% 33.33%;
  
  /* fr单位（fraction，片段） */
  grid-template-columns: 1fr 2fr 1fr;
  
  /* repeat()函数 */
  grid-template-columns: repeat(3, 1fr);
  
  /* auto-fill 和 auto-fit */
  grid-template-columns: repeat(auto-fill, 100px);
  
  /* minmax()函数 */
  grid-template-columns: repeat(3, minmax(100px, 1fr));
}
```

#### 3. gap（间距）

```css
.container {
  gap: 20px; /* 行列间距都为20px */
  /* 或 */
  row-gap: 20px;
  column-gap: 10px;
}
```

#### 4. grid-template-areas（区域命名）

```css
.container {
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

#### 5. justify-items 和 align-items

```css
.container {
  justify-items: start | end | center | stretch;
  align-items: start | end | center | stretch;
  
  /* 简写 */
  place-items: center center;
}
```

#### 6. justify-content 和 align-content

```css
.container {
  justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
  align-content: start | end | center | stretch | space-around | space-between | space-evenly;
  
  /* 简写 */
  place-content: center center;
}
```

### 项目属性

#### 1. grid-column 和 grid-row

```css
.item {
  /* 从第1列开始，到第3列结束 */
  grid-column: 1 / 3;
  /* 或 */
  grid-column-start: 1;
  grid-column-end: 3;
  
  /* 从第1行开始，到第2行结束 */
  grid-row: 1 / 2;
}
```

#### 2. grid-area

```css
.item {
  /* 使用命名区域 */
  grid-area: header;
  
  /* 或使用行列编号 */
  grid-area: 1 / 1 / 2 / 3; /* row-start / column-start / row-end / column-end */
}
```

#### 3. justify-self 和 align-self

```css
.item {
  justify-self: start | end | center | stretch;
  align-self: start | end | center | stretch;
  
  /* 简写 */
  place-self: center center;
}
```

### Grid布局实战案例

#### 案例1：响应式网格

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}
```

#### 案例2：圣杯布局

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  min-height: 100vh;
}
```

#### 案例3：瀑布流布局

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 10px;
  gap: 10px;
}

.item {
  grid-row-end: span 20; /* 根据内容高度调整 */
}
```

## 29. CSS预处理器有哪些？它们的区别是什么？

### 常见的CSS预处理器

1. **Sass/SCSS**
2. **Less**
3. **Stylus**

### Sass vs Less 对比

| 特性 | Sass/SCSS | Less |
|------|-----------|------|
| 语法 | 支持两种：Sass（缩进）和SCSS（类CSS） | 类似CSS语法 |
| 变量 | `$变量名` | `@变量名` |
| 嵌套 | 支持 | 支持 |
| Mixin | `@mixin` 和 `@include` | `.mixin()` |
| 继承 | `@extend` | `:extend()` |
| 条件语句 | `@if` `@else` | `when()` |
| 循环 | `@for` `@each` `@while` | 循环功能较弱 |
| 函数 | 内置丰富函数库 | 函数较少 |
| 编译 | 需要Ruby或Node-sass | JavaScript编译 |
| 社区 | 更活跃 | 较活跃 |

### Sass/SCSS示例

```scss
// 变量
$primary-color: #3498db;
$font-stack: Helvetica, sans-serif;

// 嵌套
.nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  
  li { display: inline-block; }
  
  a {
    display: block;
    padding: 6px 12px;
    color: $primary-color;
  }
}

// Mixin
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
  -moz-border-radius: $radius;
  border-radius: $radius;
}

.box {
  @include border-radius(10px);
}

// 继承
.message {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.success {
  @extend .message;
  border-color: green;
}

// 函数
@function calculate-rem($size) {
  @return $size / 16px * 1rem;
}

.element {
  font-size: calculate-rem(24px);
}
```

### Less示例

```less
// 变量
@primary-color: #3498db;
@font-stack: Helvetica, sans-serif;

// 嵌套
.nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  
  li { display: inline-block; }
  
  a {
    display: block;
    padding: 6px 12px;
    color: @primary-color;
  }
}

// Mixin
.border-radius(@radius) {
  -webkit-border-radius: @radius;
  -moz-border-radius: @radius;
  border-radius: @radius;
}

.box {
  .border-radius(10px);
}

// 继承
.message {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.success:extend(.message) {
  border-color: green;
}
```

## 30. CSS变量（自定义属性）如何使用？

CSS变量（CSS Custom Properties）是CSS原生支持的变量功能，无需预处理器即可使用。

### 基本语法

```css
/* 定义变量（通常在:root中定义全局变量） */
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --font-size: 16px;
  --spacing: 1rem;
}

/* 使用变量 */
.button {
  background-color: var(--primary-color);
  font-size: var(--font-size);
  padding: var(--spacing);
}

/* 带回退值 */
.element {
  color: var(--text-color, #333); /* 如果--text-color未定义，使用#333 */
}
```

### 作用域

```css
:root {
  --color: blue;
}

.container {
  --color: red; /* 在.container内覆盖全局变量 */
}

.box {
  color: var(--color); /* 在.container内为red，在外为blue */
}
```

### JavaScript操作CSS变量

```javascript
// 获取CSS变量值
const root = document.documentElement;
const primaryColor = getComputedStyle(root).getPropertyValue('--primary-color');

// 设置CSS变量值
root.style.setProperty('--primary-color', '#e74c3c');

// 移除CSS变量
root.style.removeProperty('--primary-color');
```

### 实战应用：主题切换

```css
/* 亮色主题 */
:root {
  --bg-color: #ffffff;
  --text-color: #333333;
  --border-color: #dddddd;
}

/* 暗色主题 */
[data-theme="dark"] {
  --bg-color: #1a1a1a;
  --text-color: #f0f0f0;
  --border-color: #444444;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
}

.card {
  border: 1px solid var(--border-color);
}
```

```javascript
// 切换主题
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
}
```

## 31. 移动端适配方案有哪些？

### 1. rem方案

**原理**：根据根元素font-size动态计算元素尺寸。

```javascript
// 设置根元素font-size
function setRem() {
  const baseSize = 16; // 基准大小
  const scale = document.documentElement.clientWidth / 375; // 设计稿宽度
  document.documentElement.style.fontSize = baseSize * scale + 'px';
}

window.addEventListener('resize', setRem);
setRem();
```

```css
/* 假设设计稿为375px，元素宽度为100px */
.box {
  width: 6.25rem; /* 100 / 16 = 6.25 */
}
```

### 2. vw/vh方案

**原理**：基于视口宽度和高度的百分比单位。

```css
/* 1vw = 视口宽度的1% */
/* 1vh = 视口高度的1% */

.container {
  width: 100vw;
  height: 100vh;
}

.box {
  /* 设计稿375px，元素100px */
  width: 26.67vw; /* 100 / 375 * 100 = 26.67 */
}
```

### 3. viewport + rem方案

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

```javascript
// lib-flexible方案
(function(win, lib) {
  var doc = win.document;
  var docEl = doc.documentElement;
  var metaEl = doc.querySelector('meta[name="viewport"]');
  var dpr = win.devicePixelRatio || 1;
  
  // 设置data-dpr属性
  docEl.setAttribute('data-dpr', dpr);
  
  // 设置viewport
  var scale = 1 / dpr;
  metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
  
  // 设置rem
  var rem = docEl.clientWidth / 10;
  docEl.style.fontSize = rem + 'px';
})(window, window['lib'] || (window['lib'] = {}));
```

### 4. 媒体查询方案

```css
/* 手机 */
@media screen and (max-width: 768px) {
  .container {
    width: 100%;
    padding: 10px;
  }
}

/* 平板 */
@media screen and (min-width: 769px) and (max-width: 1024px) {
  .container {
    width: 750px;
    margin: 0 auto;
  }
}

/* 桌面 */
@media screen and (min-width: 1025px) {
  .container {
    width: 1200px;
    margin: 0 auto;
  }
}
```

### 各方案对比

| 方案 | 优点 | 缺点 | 适用场景 |
|------|------|------|----------|
| rem | 兼容性好，计算简单 | 需要JS计算根元素font-size | 主流移动端项目 |
| vw/vh | 纯CSS方案，无需JS | 老旧浏览器不支持 | 现代浏览器项目 |
| viewport + rem | 1px问题解决方案 | 配置复杂 | 对像素要求高的项目 |
| 媒体查询 | 灵活可控 | 断点较多时代码冗余 | 响应式网站 |

---

## 32. 站点一键换肤的实现方式有哪些？

### 方案一：CSS变量（推荐）

```css
/* 定义主题变量 */
:root {
  --primary-color: #1890ff;
  --background-color: #ffffff;
  --text-color: #333333;
  --border-color: #d9d9d9;
}

/* 深色主题 */
[data-theme="dark"] {
  --primary-color: #177ddc;
  --background-color: #141414;
  --text-color: #ffffff;
  --border-color: #434343;
}

/* 使用变量 */
.btn-primary {
  background-color: var(--primary-color);
  color: white;
  border: 1px solid var(--border-color);
}

.container {
  background-color: var(--background-color);
  color: var(--text-color);
}
```

```javascript
// 切换主题
function toggleTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// 初始化主题
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
```

### 方案二：动态加载CSS文件

```javascript
// 主题切换
function switchTheme(theme) {
  const linkId = 'theme-style';
  let link = document.getElementById(linkId);

  if (!link) {
    link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }

  link.href = `/themes/${theme}.css`;
  localStorage.setItem('theme', theme);
}
```

### 方案三：Less/Sass变量替换

```scss
// _variables.scss
$primary-color: #1890ff;
$background-color: #ffffff;

// 编译时生成多套主题
// 需要配合构建工具
```

```javascript
// 使用 postcss-theme 等插件
// 编译时生成多套CSS
```

### 方案四：CSS-in-JS

```jsx
// 使用 styled-components 或 emotion
import styled, { ThemeProvider } from 'styled-components';

const lightTheme = {
  primary: '#1890ff',
  background: '#ffffff',
  text: '#333333'
};

const darkTheme = {
  primary: '#177ddc',
  background: '#141414',
  text: '#ffffff'
};

const Button = styled.button`
  background-color: ${props => props.theme.primary};
  color: white;
`;

function App() {
  const [theme, setTheme] = useState(lightTheme);

  return (
    <ThemeProvider theme={theme}>
      <Button>Click me</Button>
    </ThemeProvider>
  );
}
```

### 方案对比

| 方案 | 优点 | 缺点 | 适用场景 |
|------|------|------|----------|
| CSS变量 | 实时切换、性能高、易维护 | IE不支持 | 现代浏览器项目 |
| 动态加载CSS | 兼容性好、主题完全隔离 | 切换有延迟、请求开销 | 多主题差异大的场景 |
| 预处理器 | 编译时优化 | 需要重新构建 | 构建时确定主题 |
| CSS-in-JS | 灵活、组件化 | 运行时开销 | React/Vue项目 |

---

## 33. 前端水印了解多少？

### 方案一：Canvas绘制水印

```javascript
// watermark.js
class Watermark {
  constructor(options = {}) {
    this.text = options.text || 'Watermark';
    this.font = options.font || '16px Arial';
    this.color = options.color || 'rgba(0, 0, 0, 0.15)';
    this.rotate = options.rotate || -30;
    this.gapX = options.gapX || 200;
    this.gapY = options.gapY || 150;

    this.init();
  }

  init() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    // 计算单个水印尺寸
    this.ctx.font = this.font;
    const metrics = this.ctx.measureText(this.text);
    const textWidth = metrics.width;
    const textHeight = parseInt(this.font);

    // 设置画布尺寸
    this.canvas.width = this.gapX;
    this.canvas.height = this.gapY;

    // 绘制水印
    this.ctx.font = this.font;
    this.ctx.fillStyle = this.color;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    this.ctx.save();
    this.ctx.translate(this.gapX / 2, this.gapY / 2);
    this.ctx.rotate((this.rotate * Math.PI) / 180);
    this.ctx.fillText(this.text, 0, 0);
    this.ctx.restore();
  }

  apply(container = document.body) {
    const dataUrl = this.canvas.toDataURL('image/png');
    container.style.backgroundImage = `url(${dataUrl})`;
    container.style.backgroundRepeat = 'repeat';
  }
}

// 使用
const watermark = new Watermark({
  text: 'Confidential',
  font: '14px Microsoft YaHei',
  color: 'rgba(0, 0, 0, 0.1)'
});
watermark.apply();
```

### 方案二：SVG水印（更清晰）

```javascript
function createSvgWatermark(options) {
  const { text, font, color, rotate, gapX, gapY } = options;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${gapX}" height="${gapY}">
      <text x="50%" y="50%" font-family="${font}" fill="${color}"
            text-anchor="middle" dominant-baseline="middle"
            transform="rotate(${rotate}, ${gapX/2}, ${gapY/2})">
        ${text}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
}

// 使用
const watermarkUrl = createSvgWatermark({
  text: 'Internal Use Only',
  font: 'Arial',
  color: 'rgba(0,0,0,0.1)',
  rotate: -30,
  gapX: 200,
  gapY: 150
});

document.body.style.backgroundImage = `url(${watermarkUrl})`;
```

### 方案三：CSS伪元素水印

```css
.watermark-container {
  position: relative;
}

.watermark-container::before {
  content: 'Confidential';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.1;
  font-size: 14px;
  background-image: repeating-linear-gradient(
    -30deg,
    transparent,
    transparent 100px,
    rgba(0,0,0,0.1) 100px,
    rgba(0,0,0,0.1) 200px
  );
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(-30deg);
}
```

### 方案四：防删除水印（MutationObserver）

```javascript
class SecureWatermark {
  constructor(options) {
    this.options = options;
    this.observer = null;
    this.watermarkElement = null;

    this.create();
    this.observe();
  }

  create() {
    const div = document.createElement('div');
    div.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      background-image: url(${this.generateDataUrl()});
      background-repeat: repeat;
    `;

    this.watermarkElement = div;
    document.body.appendChild(div);
  }

  generateDataUrl() {
    // 使用Canvas或SVG生成
    const canvas = document.createElement('canvas');
    // ... 绘制逻辑
    return canvas.toDataURL();
  }

  observe() {
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // 检测水印元素是否被删除或修改
        if (mutation.type === 'childList') {
          if (!document.body.contains(this.watermarkElement)) {
            console.warn('Watermark removed! Restoring...');
            this.create();
          }
        }
      });
    });

    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true
    });
  }

  destroy() {
    this.observer?.disconnect();
    this.watermarkElement?.remove();
  }
}
```

### 方案对比

| 方案 | 优点 | 缺点 | 适用场景 |
|------|------|------|----------|
| Canvas | 灵活、可定制 | 高清屏模糊 | 简单水印 |
| SVG | 矢量清晰 | 复杂图形支持有限 | 文字水印 |
| CSS伪元素 | 性能高、简单 | 内容易被复制 | 简单场景 |
| MutationObserver | 防删除 | 不能完全防止 | 安全要求高的场景 |

### 注意事项

1. **水印只是 deterrent**，不能完全防止截图和录屏
2. **性能考虑**：大面积水印可能影响渲染性能
3. **可访问性**：确保水印不影响内容阅读
4. **移动端**：考虑高清屏幕的显示效果

---

## 34. 前端如何做页面主题色切换？

### 实现方案对比

| 方案 | 优点 | 缺点 | 适用场景 |
|-----|------|------|---------|
| CSS 变量 | 动态切换、性能好 | IE 不支持 | 现代浏览器项目 |
| 切换 CSS 文件 | 兼容性好 | 需要维护多套样式 | 兼容性要求高的项目 |
| CSS-in-JS | 灵活、组件级主题 | 运行时开销 | React/Vue 项目 |
| 预处理器变量 | 编译时确定 | 无法运行时切换 | 构建时主题 |

### 方案一：CSS 变量（推荐）

```css
/* 定义主题变量 */
:root {
  /* 默认主题（浅色） */
  --bg-color: #ffffff;
  --text-color: #333333;
  --primary-color: #1890ff;
  --border-color: #e8e8e8;
  --shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 深色主题 */
[data-theme="dark"] {
  --bg-color: #141414;
  --text-color: #e0e0e0;
  --primary-color: #177ddc;
  --border-color: #434343;
  --shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

/* 使用变量 */
body {
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
}

.button-primary {
  background-color: var(--primary-color);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow);
}
```

```javascript
// 切换主题
function toggleTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// 初始化主题
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');
  toggleTheme(theme);
}

// 监听系统主题变化
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  toggleTheme(e.matches ? 'dark' : 'light');
});

// React Hook 实现
function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggle = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return { theme, setTheme, toggle };
}
```

### 方案二：动态加载 CSS 文件

```javascript
// 主题配置文件
const themes = {
  light: '/themes/light.css',
  dark: '/themes/dark.css'
};

function loadTheme(themeName) {
  const existing = document.getElementById('theme-style');
  if (existing) {
    existing.remove();
  }

  const link = document.createElement('link');
  link.id = 'theme-style';
  link.rel = 'stylesheet';
  link.href = themes[themeName];
  document.head.appendChild(link);

  localStorage.setItem('theme', themeName);
}
```

### 方案三：CSS-in-JS（以 styled-components 为例）

```javascript
import { ThemeProvider, createGlobalStyle } from 'styled-components';

const lightTheme = {
  bg: '#ffffff',
  text: '#333333',
  primary: '#1890ff'
};

const darkTheme = {
  bg: '#141414',
  text: '#e0e0e0',
  primary: '#177ddc'
};

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.bg};
    color: ${props => props.theme.text};
  }
`;

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <button onClick={() => setIsDark(!isDark)}>
        切换主题
      </button>
    </ThemeProvider>
  );
}
```

### 局部主题切换

```vue
<!-- Vue 示例 -->
<template>
  <div class="theme-container" :data-theme="currentTheme">
    <button @click="toggleTheme">切换主题</button>
    <div class="content">局部主题内容</div>
  </div>
</template>

<style scoped>
.theme-container[data-theme="dark"] .content {
  background: #333;
  color: #fff;
}

.theme-container[data-theme="light"] .content {
  background: #fff;
  color: #333;
}
</style>
```

---

## 35. 样式隔离方式有哪些？

### 为什么需要样式隔离

```html
<!-- 没有样式隔离的问题 -->
<div class="app">
  <div class="title">主应用标题</div>
  <div class="micro-app">
    <!-- 子应用也有 .title 样式，产生冲突 -->
    <div class="title">子应用标题</div>
  </div>
</div>
```

### 样式隔离方案

**1. CSS Modules（最常用）**

```css
/* Button.module.css */
.button {
  background: blue;
  color: white;
}

.primary {
  composes: button;
  background: green;
}
```

```javascript
// 编译后：.Button_button__abc123
import styles from './Button.module.css';

function Button() {
  return <button className={styles.primary}>点击</button>;
}
```

**2. CSS-in-JS**

```javascript
// styled-components
const Button = styled.button`
  background: blue;
  color: white;

  &:hover {
    background: darkblue;
  }
`;

// emotion
const buttonCss = css`
  background: blue;
  color: white;
`;
```

**3. Scoped CSS（Vue）**

```vue
<template>
  <div class="title">标题</div>
</template>

<style scoped>
/* 编译后：.title[data-v-f3f3eg9] */
.title {
  color: blue;
}
</style>
```

**4. BEM 命名规范**

```css
/* Block Element Modifier */
.card { }
.card__title { }      /* 元素 */
.card__content { }
.card--large { }      /* 修饰符 */
.card--primary { }

/* 使用 */
<div class="card card--large">
  <h2 class="card__title">标题</h2>
  <div class="card__content">内容</div>
</div>
```

**5. Shadow DOM（Web Components）**

```javascript
class MyComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <style>
        /* 样式完全隔离 */
        .title { color: blue; }
      </style>
      <div class="title">Shadow DOM 标题</div>
    `;
  }
}

customElements.define('my-component', MyComponent);
```

**6. 属性选择器隔离**

```css
/* 通过属性限定作用域 */
[data-app="main"] .title {
  color: blue;
}

[data-app="micro"] .title {
  color: red;
}
```

**7. iframe 隔离（最强隔离）**

```html
<!-- 完全独立的上下文 -->
<iframe src="micro-app.html"></iframe>
```

**8. PostCSS 插件（postcss-prefix-selector）**

```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-prefix-selector')({
      prefix: '.my-app',
      exclude: ['body', 'html']
    })
  ]
};

// 编译前：.title { color: blue; }
// 编译后：.my-app .title { color: blue; }
```

### 方案对比

| 方案 | 隔离级别 | 使用成本 | 运行时开销 | 适用场景 |
|-----|---------|---------|-----------|---------|
| CSS Modules | 组件级 | 低 | 无 | React/Vue 项目 |
| CSS-in-JS | 组件级 | 中 | 有 | React 项目 |
| Scoped | 组件级 | 低 | 无 | Vue 项目 |
| BEM | 约定级 | 中 | 无 | 任何项目 |
| Shadow DOM | 元素级 | 高 | 无 | Web Components |
| iframe | 页面级 | 高 | 高 | 微前端 |

### 微前端样式隔离最佳实践

```javascript
// qiankun 框架示例
import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'react-app',
    entry: '//localhost:3000',
    container: '#container',
    activeRule: '/react',
    // 自动添加样式隔离
    sandbox: {
      strictStyleIsolation: true,  // Shadow DOM
      experimentalStyleIsolation: true  // scoped css
    }
  }
]);

start();
```

---

## 36. display: inline、display: block 和 display: inline-block 有什么区别？

- **display: inline;**
  - 元素显示为行内元素，不会独占一行
  - 无法设置 width 和 height 属性
  - margin 和 padding 的上下部分不会影响其他元素
  - 典型例子：`<span>`、`<a>`、`<strong>`

- **display: block;**
  - 元素显示为块级元素，独占一行
  - 可以设置 width、height、margin、padding 等所有属性
  - 默认宽度为父元素的 100%
  - 典型例子：`<div>`、`<p>`、`<h1>-<h6>`

- **display: inline-block;**
  - 结合了 inline 和 block 的特性
  - 元素不会独占一行（类似 inline）
  - 可以设置 width、height、margin、padding 等所有属性（类似 block）
  - 典型例子：按钮、图标等需要并排显示但又需要设置尺寸的元素

---

## 37. link和@import引入CSS样式有什么区别？

- **从属关系**：
  - `<link>` 是 HTML 标签，属于 HTML 范畴
  - `@import` 是 CSS 提供的规则，属于 CSS 范畴

- **加载顺序**：
  - `<link>` 在页面加载时同时加载 CSS 文件
  - `@import` 在页面全部下载完后再加载 CSS 文件，可能导致页面闪烁

- **兼容性**：
  - `<link>` 兼容所有浏览器
  - `@import` 在 IE5 以下版本不被支持

- **DOM 操作**：
  - `<link>` 可以通过 JavaScript 操作 DOM 动态添加或修改
  - `@import` 无法通过 JavaScript 动态操作

- **权重**：
  - 两者引入的样式权重（优先级）没有区别，优先级只取决于选择器权重、`!important` 和层叠顺序
  - 需要注意的是：`@import` 必须写在样式表顶部，其引入的规则会被主样式表中后出现的同优先级规则覆盖——这是层叠顺序（书写位置）的结果，并非引入方式本身的权重差异

---

## 38. 什么是 CSS 盒模型？box-sizing 的作用是什么？

### 盒模型的组成

每个 HTML 元素都被表示为一个矩形盒子，从内到外由四部分组成：

- **content（内容）**：元素的实际内容，如文字、图片
- **padding（内边距）**：内容到边框之间的空间
- **border（边框）**：围绕在内边距外侧的线
- **margin（外边距）**：边框之外、用于拉开与其他元素距离的空间

```css
.box {
  width: 200px;
  padding: 10px;
  border: 5px solid #333;
  margin: 20px;
}
```

### 两种盒模型

- **标准盒模型（content-box，默认）**
  - `width` / `height` 只包含 content
  - 实际占用宽度 = `width` + 左右 `padding` + 左右 `border`（不含 margin）
  - 上例实际宽度 = 200 + 10×2 + 5×2 = 230px

- **IE 盒模型（怪异盒模型，border-box）**
  - `width` / `height` 包含 content + padding + border
  - 实际占用宽度 = `width`（固定不变）
  - 上例实际宽度仍为 200px，content 被压缩为 170px

### box-sizing 的作用

`box-sizing` 用于切换两种盒模型：

```css
/* 标准盒模型（默认） */
.box-1 {
  box-sizing: content-box;
}

/* IE 盒模型（推荐） */
.box-2 {
  box-sizing: border-box;
}
```

### 实际项目最佳实践

几乎所有现代项目都会全局开启 `border-box`，让宽度计算更直观：

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

**为什么推荐 border-box？**

- 设置 `width: 200px` 后，无论怎么加 padding 和 border，元素总宽度都是 200px
- 布局更可预期，避免「加了 padding 后元素撑破容器」的问题
- 主流框架（Bootstrap、Tailwind 等）默认都用 border-box

### 补充要点

- `margin` 不计入元素的实际尺寸，但相邻块级元素的垂直 `margin` 会发生**外边距合并（margin collapse）**：取较大值而非累加
- 行内元素设置 `width`、`height`、垂直方向的 `padding`/`margin` 表现特殊，推荐改用 `inline-block` 或 `flex`
