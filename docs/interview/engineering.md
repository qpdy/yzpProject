---
sidebar_position: 5
title: 前端工程化面试题
---

# 前端工程化面试题

## 目录
- [包管理工具](#包管理工具)
- [构建工具](#构建工具)
- [代码规范](#代码规范)
- [Git工作流](#git工作流)
- [测试](#测试)
- [性能优化](#性能优化)
- [CI/CD](#cicd)
- [Docker](#docker)
- [安全性](#安全性)
- [面向对象编程](#面向对象编程)
- [浏览器原理与HTTP](#浏览器原理与http)
  - [什么是HTTP协议？其特点是什么？](#什么是http协议其特点是什么)
  - [HTTP1.x vs HTTP2.0 vs HTTP3.0](#http1x-vs-http20-vs-http30)
  - [HTTPS协议详解](#https协议详解)
  - [常见的请求头和响应头](#常见的请求头和响应头)
  - [Cookie、Session、Token、JWT详解](#cookiesessiontokenjwt详解)
  - [OSI七层模型](#osi七层模型)
  - [TCP三次握手和四次挥手详解](#tcp三次握手和四次挥手详解)
  - [浏览器渲染原理详解](#浏览器渲染原理详解)
- [小程序开发](#小程序开发)
- [跨域与缓存](#跨域与缓存)
- [其他工程化实践](#其他工程化实践)
  - [对前端工程化的理解](#对前端工程化的理解)
  - [对SSG的理解](#对ssg的理解)

---

## 包管理工具

### npm/yarn/pnpm的区别

**npm**
- Node.js默认的包管理器
- node_modules 是嵌套结构，可能导致重复安装
- 安装速度相对较慢
- 需要额外的工具处理依赖版本冲突

**yarn**
- Facebook开发的npm替代品
- 并行安装，速度快
- yarn.lock锁定版本，确保一致性
- node_modules 扁平化结构
- 缓存机制，支持离线安装

**pnpm**
- 新一代包管理器
- 使用硬链接和符号链接，节省磁盘空间
- 安装速度最快
- node_modules 结构严格，避免深层嵌套
- 支持monorepo

### lock文件的作用

```json
// package-lock.json (npm)
// yarn.lock (yarn)
// pnpm-lock.yaml (pnpm)
```

**作用：**
1. 锁定依赖版本，确保团队成员安装相同版本的依赖
2. 提高安装速度，跳过版本解析
3. 记录完整的依赖树信息
4. 安全性，防止恶意包注入

**是否需要提交到git？**
✅ 是的，必须提交到版本控制系统中，确保团队开发环境一致性。

### Monorepo管理

**什么是Monorepo？**
将多个项目/包放在同一个仓库中管理的方式。

**常用工具：**
- Lerna
- Nx
- Rush
- pnpm workspace
- yarn workspace

**优点：**
- 代码共享方便
- 原子性提交
- 统一构建和部署
- 更容易的重构

**缺点：**
- 仓库体积大
- 权限管理复杂
- CI/CD配置复杂

---

## 构建工具

### Webpack核心概念

**1. Entry（入口）**
构建的起点，定义应用程序的入口文件。

```javascript
module.exports = {
  entry: './src/index.js' // 单入口
  // 或者对象形式配置多入口
  entry: {
    main: './src/index.js',
    vendor: './src/vendor.js'
  }
}
```

**2. Output（输出）**
定义打包后文件的输出位置和命名规则。

```javascript
output: {
  path: path.resolve(__dirname, 'dist'),
  filename: '[name].[contenthash].js',
  publicPath: '/assets/',
  clean: true // 清理dist目录
}
```

**3. Loader（加载器）**
Webpack只能处理JS和JSON文件，Loader让Webpack处理其他类型文件。

**常见Loader：**
- `babel-loader`：转换ES6+语法
- `css-loader`：解析CSS文件
- `style-loader`：将CSS注入DOM
- `file-loader/url-loader`：处理文件
- `ts-loader`：处理TypeScript
- `vue-loader`：处理Vue单文件组件

**4. Plugin（插件）**
扩展Webpack功能，在构建生命周期中执行各种任务。

**常见Plugin：**
- `HtmlWebpackPlugin`：生成HTML文件
- `CleanWebpackPlugin`：清理构建目录
- `MiniCssExtractPlugin`：提取CSS到单独文件
- `DefinePlugin`：定义环境变量
- `HotModuleReplacementPlugin`：热更新

**5. Mode（模式）**
指定构建模式：`development`、`production`、`none`

```javascript
module.exports = {
  mode: 'production' // 默认启用优化
}
```

**6. Resolve（解析）**
配置模块解析规则。

```javascript
resolve: {
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  alias: {
    '@': path.resolve(__dirname, 'src/')
  }
}
```

### Webpack构建流程

1. **初始化参数**：从配置文件和Shell语句中读取并合并参数
2. **开始编译**：用上一步得到的参数初始化Compiler对象，加载所有配置的插件
3. **确定入口**：根据配置中的entry找出所有的入口文件
4. **编译模块**：从入口文件出发，调用所有配置的Loader对模块进行翻译，再递归处理依赖
5. **完成模块编译**：得到模块的依赖关系图和最终内容
6. **输出资源**：根据依赖关系图，将模块组装成一个个包含多个模块的Chunk
7. **输出完成**：根据配置确定输出的路径和文件名，把文件内容写入到文件系统

### Vite vs Webpack

**Vite**
- 基于ESM的开发服务器，按需编译
- 生产环境使用Rollup打包
- 启动速度快，热更新快
- 天然支持TypeScript
- 现代化的构建工具

**Webpack**
- 预先打包所有依赖
- 功能强大，生态完善
- 配置相对复杂
- 启动速度相对较慢
- 社区插件丰富

**对比：**

| 特性 | Vite | Webpack |
|------|------|---------|
| 启动速度 | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| HMR速度 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| 配置复杂度 | ⭐⭐ | ⭐⭐⭐⭐ |
| 生态成熟度 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 生产构建 | Rollup | Webpack |

### Tree Shaking

**原理：**
删除未使用代码的优化技术。

**条件：**
1. 使用ES Module（import/export）
2. mode为production
3. 在package.json中设置`"sideEffects": false`

**如何优化：**
- 使用纯函数
- 避免副作用
- 使用/*#__PURE__*/注释
- 第三方库选择支持ES Module的版本

### Code Splitting

**方式：**
1. **入口分割**：配置多个入口
2. **动态导入**：使用`import()`语法
3. **提取公共模块**：SplitChunksPlugin

```javascript
// 动态导入示例
import('./math.js').then(math => {
  console.log(math.add(16, 26));
});

// SplitChunks配置
optimization: {
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors'
      }
    }
  }
}
```

### Rollup

**特点：**
- 面向库打包
- ES Module优先
- Tree Shaking效果好
- 生成结果更简洁

**适用场景：**
- 打包JavaScript库
- 组件库打包
- 工具库打包

### Parcel

**特点：**
- 零配置
- 自动安装依赖
- 内置热更新
- 多核编译

**适用场景：**
- 小型项目
- 快速原型开发
- 不想配置构建工具的项目

### Webpack5主要升级点

**1. 持久化缓存（Persistent Caching）**
- 默认启用，构建速度大幅提升
- 缓存位置：`node_modules/.cache/webpack`
- 通过文件系统缓存模块和依赖

**2. 长期缓存优化（Long Term Caching）**
- 更稳定的 module id 和 chunk id
- 使用 deterministic 模式替代 named/hashed
- 小的代码变动不会导致 hash 变化

**3. 更好的 Tree Shaking**
- 支持嵌套 Tree Shaking
- 支持 CommonJS 模块的 Tree Shaking
- 改进副作用分析

**4. Module Federation（模块联邦）**
- 实现微前端架构
- 运行时动态加载远程模块
- 支持模块共享和版本管理

```javascript
// 模块联邦配置示例
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        app1: 'app1@http://localhost:3001/remoteEntry.js',
      },
      shared: ['react', 'react-dom']
    })
  ]
};
```

**5. 资源模块（Asset Modules）**
- 内置处理资源文件，无需 file-loader/url-loader
- `asset/resource`：输出单独文件
- `asset/inline`：内联为 Data URI
- `asset/source`：导出资源源码
- `asset`：根据文件大小自动选择

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  }
};
```

**6. 废弃功能**
- 不再自动 polyfill Node.js 核心模块
- 移除 `node.Buffer`、`node.process` 等配置

### 其他构建工具对比

| 工具 | 特点 | 适用场景 |
|------|------|----------|
| **Webpack** | 功能全面，生态丰富 | 大型项目，复杂配置 |
| **Vite** | 极速开发体验 | 现代浏览器项目 |
| **Rollup** | 输出简洁，Tree Shaking好 | 库打包 |
| **Parcel** | 零配置 | 快速原型开发 |
| **esbuild** | Go编写，极速编译 | 简单打包，开发工具 |
| **Turbopack** | Rust编写，Webpack继承者 | 下一代构建工具 |

---

## 代码规范

### ESLint vs Prettier

**ESLint**
- JavaScript代码检查工具
- 检查代码质量和风格
- 可以自动修复一些问题
- 配置规则灵活

**Prettier**
- 代码格式化工具
- 统一代码风格
- 支持多种语言
- 配置简单

**如何配合使用**
1. Prettier负责格式化，ESLint负责代码质量
2. 使用eslint-config-prettier禁用ESLint的格式化规则
3. 使用eslint-plugin-prettier将Prettier作为ESLint规则运行

### StyleLint

CSS/SCSS/Less代码检查工具，类似ESLint。

**常用规则：**
- 禁止使用未知属性
- 属性顺序
- 颜色格式统一
- 单位使用规范

### Git Hooks

**pre-commit**
提交代码前运行检查：
```bash
npx lint-staged
```

**commit-msg**
检查提交信息格式：
```bash
npx commitlint --edit
```

**husky配置示例**
```javascript
// .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged

// package.json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{css,scss}": [
      "stylelint --fix",
      "prettier --write"
    ]
  }
}
```

### 提交信息规范

**Conventional Commits**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**type类型：**
- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式
- `refactor`: 重构
- `test`: 测试
- `chore`: 构建或辅助工具

**示例：**
```
feat(login): 添加记住我功能

- 使用localStorage保存登录状态
- 添加30天自动登录选项

Closes #123
```

---

## Git工作流

### Git Flow

**分支类型：**
- `main/master`: 生产环境代码
- `develop`: 开发分支
- `feature/*`: 功能分支
- `release/*`: 发布分支
- `hotfix/*`: 热修复分支

**工作流程：**
1. 从develop创建feature分支
2. 功能开发完成后合并到develop
3. 准备发布时从develop创建release分支
4. release测试通过后合并到main和develop
5. main打标签发布
6. 生产环境bug从main创建hotfix修复

### GitHub Flow

简化版工作流：
1. Main分支始终可部署
2. 从main创建feature分支
3. 提交Pull Request
4. 代码审查通过合并到main
5. main部署到生产环境

### GitLab Flow

结合Git Flow和GitHub Flow：
- 使用环境分支（staging、production）
- Merge Request代替Pull Request
- 内置CI/CD集成

### Merge vs Rebase

**Merge（合并）**
- 保留完整的历史记录
- 合并提交体现分支关系
- 不会修改提交历史

**Rebase（变基）**
- 历史记录更线性
- 将提交应用到目标分支顶端
- 会修改提交历史

**使用建议：**
- 私有feature分支使用rebase保持整洁
- 公共分支使用merge保留完整历史
- 合并到main前rebase处理冲突

### Git常用命令

| 命令 | 说明 |
|------|------|
| `git init` | 初始化Git仓库 |
| `git clone <url>` | 克隆远程仓库 |
| `git add <file>` | 添加文件到暂存区 |
| `git commit -m "message"` | 提交更改 |
| `git status` | 查看仓库状态 |
| `git log` | 查看提交历史 |

**分支操作**

| 命令 | 说明 |
|------|------|
| `git branch` | 查看分支 |
| `git branch <name>` | 创建分支 |
| `git checkout <name>` | 切换分支 |
| `git merge <name>` | 合并分支 |
| `git branch -d <name>` | 删除分支 |

**远程操作**

| 命令 | 说明 |
|------|------|
| `git remote -v` | 查看远程仓库 |
| `git push origin <branch>` | 推送到远程仓库 |
| `git pull origin <branch>` | 从远程仓库拉取 |
| `git fetch` | 获取远程更新 |

**撤销操作**

| 命令 | 说明 |
|------|------|
| `git checkout -- <file>` | 撤销工作区修改 |
| `git reset HEAD <file>` | 撤销暂存区修改 |
| `git reset --hard <commit>` | 回退到指定版本 |
| `git revert <commit>` | 创建新提交撤销指定提交 |
| `git restore <file>` | 撤销工作区修改（Git 2.23+） |
| `git restore --staged <file>` | 撤销暂存区修改（Git 2.23+） |

### 解决代码冲突的方式

**1. 手动解决冲突**

当Git无法自动合并时，会在冲突文件中标记冲突区域：

```text
<<<<<<< HEAD
当前分支的代码
=======
要合并分支的代码
>>>>>>> branch-name
```

解决步骤：
1. 打开冲突文件
2. 手动编辑冲突区域，保留需要的代码
3. 删除冲突标记（`<<<<<<<` `=======` `>>>>>>>`）
4. 保存文件
5. `git add .` 添加解决后的文件
6. `git commit` 完成合并

**2. 使用合并工具**

```bash
# 配置合并工具
git config --global merge.tool vimdiff

# 启动合并工具
git mergetool
```

常用合并工具：
- **vimdiff**：命令行工具
- **meld**：图形化工具
- **VS Code**：内置冲突解决功能

**3. 选择特定版本**

```bash
# 选择当前分支版本
git checkout --ours `<file>`

# 选择合并分支版本
git checkout --theirs `<file>`
```

**4. 放弃合并**

```bash
# 放弃合并，回到合并前状态
git merge --abort
```

**5. 预防冲突的策略**

1. **频繁同步**：定期拉取主分支更新
2. **功能分支**：为每个功能创建独立分支
3. **小步提交**：将大功能拆分为多个小提交
4. **代码审查**：通过Pull Request进行代码审查
5. **沟通协调**：团队成员之间及时沟通，避免同时修改同一文件
6. **原子提交**：确保每次提交只解决一个问题
7. **合理分工**：在大型项目中合理分配任务，减少重叠修改

---

## 测试

### 测试类型

**单元测试（Unit Testing）**
- 测试独立模块/函数
- 执行速度快
- 覆盖率要求高

```javascript
// Jest示例
describe('sum', () => {
  it('should add two numbers', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
```

**集成测试（Integration Testing）**
- 测试模块间协作
- 验证接口和数据流
- 比单元测试慢

**端到端测试（E2E Testing）**
- 测试完整用户流程
- 模拟真实用户操作
- 执行速度慢，维护成本高

```javascript
// Cypress示例
describe('Login', () => {
  it('should login successfully', () => {
    cy.visit('/login');
    cy.get('[data-testid="username"]').type('user');
    cy.get('[data-testid="password"]').type('pass');
    cy.get('[data-testid="submit"]').click();
    cy.url().should('include', '/dashboard');
  });
});
```

**组件测试（Component Testing）**
- 测试组件独立渲染
- 交互行为验证
- 快照测试

```javascript
// Vue Test Utils示例
import { mount } from '@vue/test-utils';
import HelloWorld from './HelloWorld.vue';

test('renders props.msg', () => {
  const msg = 'new message';
  const wrapper = mount(HelloWorld, {
    props: { msg }
  });
  expect(wrapper.text()).toMatch(msg);
});
```

**静态测试**
- TypeScript类型检查
- ESLint代码检查
- 代码格式化验证

### Jest

**特点：**
- Facebook开发的测试框架
- 内置断言库
- 支持Mock、Spy、Stub
- 快照测试
- 并行执行测试

**配置示例：**
```javascript
module.exports = {
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts'
  ],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};
```

**Mock使用：**
```javascript
// Mock模块
jest.mock('axios');

// Mock函数
const mockFn = jest.fn();
mockFn.mockReturnValue('mocked value');

// Spy函数
const spy = jest.spyOn(obj, 'method');
```

### Vitest

**特点：**
- 原生支持ESM
- 兼容Jest API
- 极速执行
- 内联测试
- 与Vite配置共享

**优势：**
- 冷启动快
- 热更新快
- 更好的TypeScript支持

### Testing Library

**理念：**
- 测试行为而非实现
- 从用户角度测试

```javascript
import { render, screen, fireEvent } from '@testing-library/react';

test('increments counter', () => {
  render(<Counter />);

  const button = screen.getByRole('button', { name: /count is/i });
  fireEvent.click(button);

  expect(button).toHaveTextContent('count is 1');
});
```

**查询优先级：**
1. 可访问性查询（getByRole, getByLabelText）
2. 语义查询（getByText, getByDisplayValue）
3. 测试id（getByTestId）

### Mock数据

**前端 Mock 方案：**
1. **Mock.js**：生成随机数据
   ```javascript
   Mock.mock('/api/user', {
     'name': '@name',
     'age': '@integer(18, 60)'
   });
   ```

2. **MSW (Mock Service Worker)**：拦截网络请求
   ```javascript
   import { rest } from 'msw';

   export const handlers = [
     rest.get('/api/user', (req, res, ctx) => {
       return res(
         ctx.json({ name: 'John', age: 30 })
       );
     })
   ];
   ```

3. **Json Server**：快速创建REST API
   ```bash
   json-server --watch db.json
   ```

---

## 性能优化

### 性能指标

**Core Web Vitals**
1. **LCP (Largest Contentful Paint)**：最大内容绘制
   - 测量加载性能
   - 目标：< 2.5秒

2. **FID (First Input Delay)**：首次输入延迟
   - 测量交互性
   - 目标：< 100毫秒

3. **CLS (Cumulative Layout Shift)**：累积布局偏移
   - 测量视觉稳定性
   - 目标：< 0.1

**其他指标**
- FCP (First Contentful Paint)
- TTI (Time to Interactive)
- TTFB (Time To First Byte)

### 白屏时间和首屏时间

**白屏时间(First Paint)**
是指浏览器从响应用户输入网址地址，到浏览器开始显示内容的时间。

```
白屏时间 = 页面开始展示的时间点 - 开始请求的时间点
```

**首屏时间(First Contentful Paint)**
是指浏览器从响应用户输入网络地址，到首屏内容渲染完成的时间。

```
首屏时间 = 首屏内容渲染结束时间点 - 开始请求的时间点
```

**性能指标测量方法：**

1. **Navigation Timing API**：
```javascript
const timing = performance.timing;
const whiteScreenTime = timing.responseStart - timing.navigationStart;
const firstScreenTime = timing.domContentLoadedEventEnd - timing.navigationStart;
```

2. **PerformanceObserver API**（推荐）：
```javascript
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.name === 'first-contentful-paint') {
      console.log('FCP:', entry.startTime);
    }
  }
});
observer.observe({ entryTypes: ['paint'] });
```

### 性能监控

**Chrome DevTools**
- Performance面板
- Lighthouse
- Network面板
- Coverage工具

**性能监控工具**
- Google Analytics
- Sentry Performance
- New Relic
- Datadog

**RUM (Real User Monitoring)**
- 收集真实用户数据
- 分析用户体验
- 定位和诊断问题

### 优化策略

**代码层面**
1. **Tree Shaking**：删除未使用代码
2. **Code Splitting**：按需加载
3. **压缩和混淆**：减少文件体积
4. **Polyfill优化**：按需加载polyfill
5. **Tree Shaking第三方库**：使用lodash-es代替lodash

**资源层面**
1. **图片优化**
   - 使用WebP/AVIF格式
   - 图片懒加载
   - 响应式图片
   - CDN加速

2. **字体优化**
   - 使用font-display: swap
   - 预加载关键字体
   - 字体子集化

3. **JavaScript优化**
   - 减少主线程工作量
   - 使用Web Worker处理耗时任务
   - 避免长任务（>50ms）
   - 优先加载关键资源

**缓存策略**
1. **强缓存**：Cache-Control: max-age
2. **协商缓存**：ETag/Last-Modified
3. **Service Worker**：离线缓存
4. **IndexedDB**：存储大量数据

**渲染优化**
1. **减少重排和重绘**
2. **使用CSS transform替代position改变**
3. **虚拟滚动**：处理大量列表
4. **防抖和节流**：优化频繁触发的事件

### 性能测量API

```javascript
// Performance API
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(entry);
  }
});

observer.observe({ entryTypes: ['largest-contentful-paint'] });

// Navigation Timing
const timing = performance.timing;
const loadTime = timing.loadEventEnd - timing.navigationStart;

// User Timing
performance.mark('start');
// ...操作
performance.mark('end');
performance.measure('myMeasure', 'start', 'end');
```

---

## CI/CD

### 持续集成 (CI)

**目的：**
- 尽早发现错误
- 自动化测试
- 快速反馈

**流程：**
1. 提交代码触发构建
2. 安装依赖
3. 运行静态检查
4. 运行测试
5. 构建项目
6. 生成报告

**工具：**
- GitHub Actions
- GitLab CI
- Jenkins
- Travis CI
- CircleCI

### 持续部署/交付 (CD)

**持续交付**：
- 代码可以随时发布
- 手动触发部署

**持续部署**：
- 自动部署到生产环境
- 通过所有检查后自动发布

### GitHub Actions 示例

```yaml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run lint
        run: npm run lint

      - name: Run tests
        run: npm run test:coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3

      - name: Download artifacts
        uses: actions/download-artifact@v3
        with:
          name: dist
          path: dist/

      - name: Deploy to production
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### GitLab CI 示例

```yaml
image: node:18

stages:
  - install
  - test
  - build
  - deploy

cache:
  paths:
    - node_modules/

install:
  stage: install
  script:
    - npm ci
  artifacts:
    paths:
      - node_modules/

test:
  stage: test
  script:
    - npm run lint
    - npm run test:coverage
  coverage: '/Statements\s*:\s*([^%]+)/'

build:
  stage: build
  script:
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 hour

deploy_production:
  stage: deploy
  script:
    - echo "Deploy to production"
  environment:
    name: production
    url: https://example.com
  only:
    - main
```

### 自动化部署策略

**蓝绿部署**
- 两个相同的生产环境
- 先在绿色环境部署新版本
- 测试通过后切换流量
- 快速回滚能力

**金丝雀部署**
- 逐步将流量切换到新版本
- 从少量用户开始
- 监控关键指标
- 逐步扩大范围

**滚动部署**
- 逐个替换实例
- 不会中断服务
- 资源需求较低
- 回滚相对困难

### 环境管理

**环境类型**
- `development`: 开发环境
- `staging`: 测试环境
- `production`: 生产环境

**环境变量管理**
```javascript
// .env
API_URL=http://localhost:3000

// .env.production
API_URL=https://api.example.com
```

**最佳实践**
1. 不同环境配置分离
2. 敏感信息加密存储
3. 使用环境变量管理工具
4. 配置即代码

---

## Docker

### Docker基础概念

**镜像 (Image)**
- 只读模板
- 包含运行应用所需的一切
- 分层存储

**容器 (Container)**
- 镜像的运行实例
- 相互隔离
- 可启动、停止、删除

**Dockerfile**
- 构建镜像的指令集合
- 自动化构建流程

### Dockerfile 示例

```dockerfile
# 使用Node基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制package文件
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production

# 复制应用代码
COPY . .

# 构建应用
RUN npm run build

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["npm", "start"]

# 使用多阶段构建优化体积
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/server.js"]
```

### Docker 常用命令

```bash
# 构建镜像
docker build -t myapp:latest .

# 运行容器
docker run -p 3000:3000 myapp:latest

# 查看运行中的容器
docker ps

# 停止容器
docker stop <container_id>

# 删除容器
docker rm <container_id>

# 查看日志
docker logs <container_id>

# 进入容器
docker exec -it <container_id> /bin/sh

# 删除镜像
docker rmi <image_id>
```

### Docker Compose

管理多个容器的工具。

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
  db:
    image: postgres:13
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: myapp
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

**使用：**
```bash
docker-compose up -d    # 启动服务
docker-compose down     # 停止服务
docker-compose logs web # 查看日志
docker-compose exec web /bin/sh # 进入容器
```

### 容器化最佳实践

1. **使用特定版本的基础镜像**
2. **减少镜像层数**：合并RUN指令
3. **使用.dockerignore**：排除不需要的文件
4. **多阶段构建**：减小最终镜像体积
5. **以非root用户运行**：提高安全性
6. **设置时区和语言环境**
7. **健康检查**：HEALTHCHECK指令
8. **日志处理**：输出到stdout/stderr

---

## 安全性

### 前端常见安全问题

**1. XSS (Cross-Site Scripting)**
跨站脚本攻击。

**防范措施：**
- 输入验证和转义
- 使用CSP (Content Security Policy)
- HttpOnly Cookie
- 使用DOMPurify等库

```javascript
// 危险的innerHTML
element.innerHTML = userInput;

// 安全的做法
const text = document.createTextNode(userInput);
element.appendChild(text);

// 或使用DOMPurify
import DOMPurify from 'dompurify';
element.innerHTML = DOMPurify.sanitize(userInput);
```

**2. CSRF (Cross-Site Request Forgery)**
跨站请求伪造。

**防范措施：**
- 使用CSRF Token
- SameSite Cookie
- 验证Referer/Origin
- 双重Cookie验证

```javascript
fetch('/api/data', {
  method: 'POST',
  headers: {
    'X-CSRF-Token': getToken()
  }
});
```

**3. 点击劫持**
在透明iframe上诱导点击。

**防范措施：**
```javascript
// X-Frame-Options
X-Frame-Options: DENY

// CSP frame-ancestors
Content-Security-Policy: frame-ancestors 'none'
```

**4. 敏感信息泄露**
- 避免在前端存储敏感数据
- API返回最小必要信息
- 日志中不输出敏感信息
- 错误信息不暴露细节

### 登录功能安全

**1. 密码安全**

- **密码加密**：使用bcrypt等单向加密算法
- **盐值**：为每个密码生成唯一盐值
- **强度要求**：设置密码复杂度要求

```javascript
const bcrypt = require('bcrypt');
const saltRounds = 10;

// 加密密码
const hash = await bcrypt.hash(password, saltRounds);

// 验证密码
const isValid = await bcrypt.compare(password, hash);
```

**2. 会话管理**

- **JWT令牌**：使用JSON Web Token进行身份验证
- **HttpOnly Cookie**：防止XSS攻击
- **Secure标志**：仅通过HTTPS传输
- **SameSite属性**：防止CSRF攻击

```javascript
// 设置安全Cookie
res.cookie('token', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 3600000 // 1小时
});
```

**3. 传输安全**

- **HTTPS**：强制使用HTTPS传输
- **HSTS**：启用HTTP严格传输安全
- **内容安全策略**：防止恶意内容注入

**4. 防护措施**

- **验证码**：防止暴力破解
- **登录失败限制**：限制登录尝试次数
- **多因素认证**：增加额外安全层
- **日志记录**：记录登录活动
- **设备指纹**：识别和验证用户设备
- **会话超时**：设置合理的会话过期时间
- **异常检测**：监控异常登录行为
- **速率限制**：限制单位时间内请求次数

### Token认证机制

**JWT（JSON Web Token）**

**组成结构**：
1. **Header**：包含令牌类型和签名算法
2. **Payload**：包含声明（用户信息、过期时间等）
3. **Signature**：用于验证令牌完整性

```javascript
// JWT结构示例
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

// Header部分
{
  "alg": "HS256",
  "typ": "JWT"
}

// Payload部分
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```

**工作流程**：
1. 用户登录，服务器验证身份
2. 服务器生成JWT并返回给客户端
3. 客户端在后续请求中携带JWT
4. 服务器验证JWT有效性

```javascript
// 生成JWT
const jwt = require('jsonwebtoken');
const token = jwt.sign(
  { userId: user.id, username: user.username },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

// 验证JWT
try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // 验证成功，处理业务逻辑
} catch (err) {
  // 验证失败，返回错误
}
```

**Token vs Session**

| 特性 | Token | Session |
|------|-------|---------|
| 存储位置 | 客户端 | 服务器端 |
| 扩展性 | 好（无状态） | 差（有状态） |
| 安全性 | 需防范XSS/CSRF | 需防范Session劫持 |
| 性能 | 无需查询数据库 | 需查询Session存储 |
| 过期管理 | 自包含过期时间 | 需服务器管理过期 |

**现代认证方式**

1. **OAuth 2.0**：第三方授权框架
2. **OpenID Connect**：基于OAuth 2.0的身份认证层
3. **JWT with JWK**：使用JSON Web Key进行签名验证
4. **Opaque Tokens**：不透明令牌，需服务器验证
5. **Refresh Tokens**：用于获取新的访问令牌

### 安全开发实践

**依赖安全**
```bash
# 检查漏洞
npm audit

# 自动修复
npm audit fix

# 使用yarn
yarn audit

# 使用Snyk
npx snyk test
```

**CSP配置**
```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self';
               script-src 'self' 'unsafe-inline';
               style-src 'self' 'unsafe-inline';
               img-src *;
               connect-src 'self' https://api.example.com">
```

**安全HTTP头**
```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=()
```

**认证和授权**
1. 使用HTTPS
2. JWT Token管理
3. 权限校验
4. Session管理
5. 密码加密存储

---

## 面向对象编程

### 核心概念

面向对象编程（Object-Oriented Programming，OOP）是一种编程范式，它将现实世界中的事物抽象为对象，通过对象之间的交互来解决问题。

1. **类（Class）**：类是对象的模板或蓝图，定义了对象的属性和方法。
2. **对象（Object）**：对象是类的实例，具有类定义的属性和方法。
3. **属性（Attribute）**：对象的特征或状态。
4. **方法（Method）**：对象的行为或功能。

### 四大基本特征

1. **封装（Encapsulation）**：
   - 将对象的属性和方法包装在一起，隐藏内部实现细节。
   - 通过访问控制（如public、private、protected）保护数据安全。
   - 提供公共接口供外部访问。

2. **继承（Inheritance）**：
   - 子类可以继承父类的属性和方法。
   - 实现代码复用，减少重复代码。
   - 支持多层继承和多重继承（某些语言）。

3. **多态（Polymorphism）**：
   - 同一个接口可以有不同的实现方式。
   - 运行时根据对象的实际类型调用相应的方法。
   - 提高代码的灵活性和可扩展性。

4. **抽象（Abstraction）**：
   - 抽取事物的本质特征，忽略非关键细节。
   - 通过抽象类和接口定义规范。
   - 简化复杂系统的理解和设计。

### 优势

- **模块化**：代码结构清晰，易于维护。
- **可重用性**：通过继承和组合实现代码复用。
- **可扩展性**：通过继承和多态支持功能扩展。
- **易维护性**：封装降低了模块间的耦合度。

---

## 浏览器原理与HTTP

### 从输入URL到页面加载完成的过程

1. 浏览器的地址栏输入URL并按下回车。
2. 浏览器查找当前URL是否存在缓存，并比较缓存是否过期。
3. DNS解析URL对应的IP。
4. 根据IP建立TCP连接（三次握手）。
5. HTTP发起请求。
6. 服务器处理请求，浏览器接收HTTP响应。
7. 关闭TCP连接（四次挥手）。
8. 渲染页面，构建DOM树。

**详细过程分解：**

#### 1. URL解析与缓存检查
- 浏览器解析URL，检查是否有协议、域名等
- 检查浏览器缓存、系统缓存、路由器缓存等

#### 2. DNS解析
- 检查浏览器DNS缓存
- 检查操作系统DNS缓存
- 检查路由器缓存
- 向ISP DNS服务器查询
- 递归查询直到获得IP地址

#### 3. TCP连接建立
- 客户端发送SYN包
- 服务器回复SYN+ACK包
- 客户端发送ACK包
- TCP连接建立完成

#### 4. HTTP请求处理
- 浏览器发送HTTP请求
- 服务器处理请求并返回响应
- 浏览器接收响应头和响应体

#### 5. 页面渲染
- 解析HTML构建DOM树
- 解析CSS构建CSSOM树
- 执行JavaScript
- 构建渲染树
- 布局计算
- 绘制页面

### HTTP vs HTTPS

| 特性 | HTTP | HTTPS |
|------|------|-------|
| 加密 | 数据以明文形式传输，易被窃听或篡改。 | 数据通过 SSL/TLS 加密，安全性高。 |
| 认证 | 无身份验证机制，服务器和客户端身份无法确认。 | 使用数字证书验证服务器身份（可选双向认证）。 |
| 完整性 | 数据可能被中间人攻击（MITM）篡改。 | 数据完整性通过加密哈希验证，防止篡改。 |
| 性能 | 无加密开销，速度较快。 | 有加密开销，但可通过HTTP/2、TLS 1.3等技术优化。 |
| 端口 | 默认使用80端口。 | 默认使用443端口。 |
| SEO | 搜索引擎可能标记为不安全。 | 搜索引擎优先排名，提升信任度。 |

### HTTP请求方法

| 方法 | 幂等性 | 请求体 | 典型用途 | 安全性 |
|------|--------|--------|----------|--------|
| GET | 是 | 无 | 获取资源 | 高 |
| POST | 否 | 有 | 创建资源 | 中 |
| PUT | 是 | 有 | 替换资源 | 中 |
| PATCH | 是 | 有 | 部分更新资源 | 中 |
| DELETE | 是 | 无 | 删除资源 | 中 |
| HEAD | 是 | 无 | 获取元信息 | 高 |
| OPTIONS | 是 | 可选 | 查询支持的方法或 CORS 预检 | 高 |
| CONNECT | - | 有 | 建立隧道 | 低 |
| TRACE | 是 | 无 | 调试（已不推荐） | 低 |

**幂等性说明**：多次执行相同操作产生的结果一致。

**安全性说明**：安全方法不会修改服务器状态。

### HTTP状态码

#### 1xx：信息性状态码

表示服务器已接收到请求并且正在处理。
- **100 Continue**：客户端应当继续发送请求。
- **101 Switching Protocols**：服务器已经理解了客户端的请求。
- **102 Processing**：服务器已接收并正在处理请求，但尚未有最终响应。

#### 2xx：成功状态码

表示服务器成功处理了请求。
- **200 OK**：请求成功，服务器成功返回所请求的资源。
- **201 Created**：请求成功，服务器创建了新的资源。
- **204 No Content**：请求成功，但服务器没有返回任何内容。

#### 3xx：重定向状态码

表示需要进一步操作以完成请求。
- **301 Moved Permanently**：请求的资源已永久移动到新位置。
- **302 Found**：请求的资源暂时移动到新位置。
- **304 Not Modified**：客户端缓存的资源未修改，可以直接使用缓存。

#### 4xx：客户端错误状态码

表示客户端发送的请求有误。
- **400 Bad Request**：请求无效，服务器无法理解请求。
- **403 Forbidden**：请求被服务器拒绝，权限不足。
- **404 Not Found**：请求的资源不存在。
- **405 Method Not Allowed**：请求方法不被允许。
- **429 Too Many Requests**：请求过于频繁，被限流。

#### 5xx：服务器错误状态码

表示服务器在处理请求时出现了错误。
- **500 Internal Server Error**：服务器内部错误，无法完成请求。
- **502 Bad Gateway**：服务器作为网关或代理，从上游服务器收到无效的响应。
- **503 Service Unavailable**：服务器暂时无法处理请求，通常是由于过载或维护。
- **504 Gateway Timeout**：服务器作为网关或代理，未能及时从上游服务器收到响应。

### GET vs POST

| 特性 | GET | POST |
|------|-----|------|
| 主要用途 | 请求数据（从服务器获取资源） | 提交数据（向服务器发送数据） |
| 数据传输位置 | URL 参数（查询字符串） | 请求体（Request Body） |
| 数据可见性 | 数据可见于 URL，可被缓存、书签 | 数据不可见，不可缓存 |
| 数据长度限制 | 受 URL 长度限制（通常约 2048 字符） | 无明确限制（受服务器配置影响） |
| 安全性 | 较低（数据暴露在 URL 中） | 较高（数据在请求体中） |
| 幂等性 | 是（多次请求结果相同） | 否（多次请求可能产生不同结果） |
| 缓存 | 可缓存 | 不可缓存 |
| 书签/历史记录 | 可保存为书签或历史记录 | 不可保存 |

### SPA vs MPA

**单页面应用（SPA）**

**特点**：
- 整个应用只有一个HTML页面
- 通过JavaScript动态更新内容
- 页面切换无刷新，用户体验流畅

**优点**：
- 用户体验好，页面切换流畅
- 前后端分离，便于开发和维护
- 减少服务器压力

**缺点**：
- 首屏加载时间长
- SEO不友好（需要服务端渲染解决）
- 前进后退需要特殊处理

**多页面应用（MPA）**

**特点**：
- 每个页面都是独立的HTML文件
- 页面跳转需要重新加载整个页面
- 传统的Web应用模式

**优点**：
- SEO友好
- 首屏加载快
- 架构简单，易于理解

**缺点**：
- 页面切换有白屏
- 重复加载公共资源
- 用户体验相对较差

**对比表格：**

| 特性 | SPA | MPA |
|------|-----|-----|
| 页面数量 | 单页面 | 多页面 |
| 页面切换 | 无刷新 | 重新加载 |
| 首屏加载 | 较慢 | 较快 |
| SEO | 需特殊处理 | 友好 |
| 用户体验 | 流畅 | 有白屏 |
| 开发复杂度 | 较高 | 较低 |
| 适用场景 | 后台管理系统、复杂应用 | 企业官网、博客 |

### 什么是HTTP协议？其特点是什么？

**HTTP（HyperText Transfer Protocol）** 是超文本传输协议，是互联网上应用最广泛的一种网络协议，用于从Web服务器传输超文本到本地浏览器。

#### HTTP的主要特点

| 特点 | 说明 |
|------|------|
| **简单快速** | 客户端向服务器请求服务时，只需传送请求方法和路径 |
| **灵活** | 允许传输任意类型的数据对象，通过Content-Type标记 |
| **无连接** | 限制每次连接只处理一个请求，响应后立即断开 |
| **无状态** | 协议对事务处理没有记忆能力，每次请求都是独立的 |
| **支持B/S和C/S模式** | 浏览器/服务器模式或客户端/服务器模式 |

#### HTTP协议的发展历程

```
HTTP/0.9 (1991) → HTTP/1.0 (1996) → HTTP/1.1 (1997) → HTTP/2 (2015) → HTTP/3 (2022)
```

---

### HTTP1.x vs HTTP2.0 vs HTTP3.0

#### HTTP/1.0 vs HTTP/1.1

| 特性 | HTTP/1.0 | HTTP/1.1 |
|------|----------|----------|
| 连接方式 | 短连接（每次请求新建TCP） | 长连接（Keep-Alive，复用TCP） |
| 管道化 | 不支持 | 支持（但存在队头阻塞问题） |
| 缓存控制 | 简单（Expires、Last-Modified） | 丰富（Cache-Control、ETag等） |
| 断点续传 | 不支持 | 支持（Range头） |
| Host头 | 可选 | 必需（支持虚拟主机） |

#### HTTP/1.1 vs HTTP/2

| 特性 | HTTP/1.1 | HTTP/2 |
|------|----------|--------|
| 传输格式 | 文本 | 二进制分帧 |
| 多路复用 | 不支持（串行或管道化） | 支持（同一连接并行传输） |
| 头部压缩 | 无 | HPACK算法压缩 |
| 服务器推送 | 不支持 | 支持 |
| 队头阻塞 | 存在 | 解决（流层面并行） |
| 优先级 | 无 | 支持请求优先级 |

**HTTP/2关键特性详解：**

```
┌─────────────────────────────────────────┐
│           HTTP/2 连接结构               │
├─────────────────────────────────────────┤
│  Stream 1  │  Stream 3  │  Stream 5     │
│  (请求JS)  │  (请求CSS) │  (请求图片)   │
├────────────┴────────────┴───────────────┤
│        二进制分帧层 (Binary Framing)     │
├─────────────────────────────────────────┤
│           单个TCP连接                    │
└─────────────────────────────────────────┘
```

1. **二进制分帧**：将请求/响应分割为更小的帧，交错发送
2. **多路复用**：同一连接上同时处理多个请求-响应
3. **头部压缩**：HPACK算法减少重复头部传输
4. **服务器推送**：服务器主动推送资源（如推送CSS/JS）

#### HTTP/2 vs HTTP/3

| 特性 | HTTP/2 | HTTP/3 |
|------|--------|--------|
| 传输协议 | TCP + TLS | QUIC（基于UDP） |
| 连接建立 | TCP三次握手 + TLS握手 | 0-RTT或1-RTT |
| 队头阻塞 | TCP层仍存在 | 彻底解决（UDP无连接） |
| 连接迁移 | 不支持（IP变化需重连） | 支持（连接ID标识） |
| 安全性 | TLS 1.2+ | 内置TLS 1.3 |

**HTTP/3 (QUIC) 优势：**

```
传统HTTPS:                    HTTP/3 QUIC:
┌─────────┐                   ┌─────────┐
│  HTTP   │                   │  HTTP   │
├─────────┤                   ├─────────┤
│  TLS    │  分层握手          │         │  合并握手
├─────────┤  2-3 RTT          │  QUIC   │  0-1 RTT
│  TCP    │                   │ (基于UDP)│
└─────────┘                   └─────────┘
```

---

### HTTPS协议详解

**HTTPS = HTTP + SSL/TLS**，在HTTP下加入SSL/TLS层，实现加密传输。

#### HTTPS解决的问题

1. **窃听风险**：第三方获取通信内容
2. **篡改风险**：第三方修改通信内容
3. **冒充风险**：第三方冒充他人身份

#### TLS/SSL握手过程

```
客户端                          服务器
  │                               │
  ├────── Client Hello ─────────►│  支持的TLS版本、加密套件、随机数
  │                               │
  │◄───── Server Hello ──────────┤  确认TLS版本、加密套件、随机数
  │◄───── Certificate ───────────┤  服务器证书（含公钥）
  │◄───── Server Key Exchange ───┤  密钥交换参数（部分套件）
  │◄───── Server Hello Done ─────┤
  │                               │
  ├───── Client Key Exchange ───►│  预主密钥（用公钥加密）
  ├───── Change Cipher Spec ────►│
  ├───── Finished ──────────────►│  握手完成，后续加密通信
  │                               │
  │◄──── Change Cipher Spec ─────┤
  │◄──── Finished ───────────────┤
  │                               │
  ◄════════════════════════════════►  加密数据传输
```

**详细步骤：**

1. **Client Hello**：客户端发送支持的TLS版本、加密套件列表、客户端随机数
2. **Server Hello**：服务器确认TLS版本、选择加密套件、发送服务器随机数
3. **Certificate**：服务器发送证书（包含公钥）
4. **密钥交换**：客户端生成预主密钥，用服务器公钥加密后发送
5. **生成会话密钥**：双方用客户端随机数 + 服务器随机数 + 预主密钥生成对称密钥
6. **Finished**：双方发送Finished消息，确认握手完成

#### HTTPS的优缺点

| 优点 | 缺点 |
|------|------|
| 数据加密，防止窃听 | 握手耗时，增加延迟 |
| 身份认证，防止冒充 | 证书需要费用 |
| 数据完整性校验 | 加密消耗CPU资源 |
| 提升SEO排名 | 缓存效率略低 |

---

### 常见的请求头和响应头

#### 通用头部（General Headers）

| 头部字段 | 说明 | 示例 |
|----------|------|------|
| `Cache-Control` | 缓存控制策略 | `max-age=3600, no-cache` |
| `Connection` | 连接管理 | `keep-alive, close` |
| `Date` | 消息创建时间 | `Mon, 23 May 2022 09:00:00 GMT` |
| `Transfer-Encoding` | 传输编码 | `chunked` |

#### 请求头部（Request Headers）

| 头部字段 | 说明 | 示例 |
|----------|------|------|
| `Accept` | 可接受的MIME类型 | `text/html, application/json` |
| `Accept-Encoding` | 可接受的编码格式 | `gzip, deflate, br` |
| `Accept-Language` | 可接受的语言 | `zh-CN,zh;q=0.9,en;q=0.8` |
| `Authorization` | 认证信息 | `Bearer token123` |
| `Cookie` | 携带的Cookie | `sessionId=abc123; user=john` |
| `Host` | 目标服务器地址 | `www.example.com` |
| `Referer` | 来源页面地址 | `https://www.google.com` |
| `User-Agent` | 客户端信息 | `Mozilla/5.0 (Windows NT 10.0...)` |
| `Content-Type` | 请求体MIME类型 | `application/json` |
| `Content-Length` | 请求体长度 | `1234` |
| `If-None-Match` | 缓存验证（ETag） | `W/"33a64df5"` |
| `If-Modified-Since` | 缓存验证（时间） | `Mon, 23 May 2022 09:00:00 GMT` |
| `Range` | 请求部分内容 | `bytes=0-1023` |

#### 响应头部（Response Headers）

| 头部字段 | 说明 | 示例 |
|----------|------|------|
| `Access-Control-Allow-Origin` | CORS允许源 | `*` 或 `https://example.com` |
| `Content-Encoding` | 响应体编码 | `gzip` |
| `Content-Type` | 响应体MIME类型 | `text/html; charset=utf-8` |
| `ETag` | 资源标识符 | `W/"33a64df5"` |
| `Last-Modified` | 最后修改时间 | `Mon, 23 May 2022 09:00:00 GMT` |
| `Location` | 重定向地址 | `https://new.example.com` |
| `Server` | 服务器软件 | `nginx/1.21.0` |
| `Set-Cookie` | 设置Cookie | `sessionId=abc123; Path=/; HttpOnly` |
| `Strict-Transport-Security` | HSTS策略 | `max-age=31536000; includeSubDomains` |
| `X-Content-Type-Options` | 防止MIME嗅探 | `nosniff` |
| `X-Frame-Options` | 防止点击劫持 | `DENY, SAMEORIGIN` |
| `X-XSS-Protection` | XSS过滤 | `1; mode=block` |

---

### Cookie、Session、Token、JWT详解

#### Cookie

**概念**：存储在客户端的小型文本文件，用于保存用户状态信息。

```
┌─────────────┐         ┌─────────────┐
│   浏览器     │◄───────►│   服务器     │
│  (Cookie)   │         │  (Set-Cookie)│
└─────────────┘         └─────────────┘
```

**Cookie属性：**

| 属性 | 说明 | 示例 |
|------|------|------|
| `Name=Value` | Cookie名称和值 | `sessionId=abc123` |
| `Domain` | 所属域名 | `.example.com` |
| `Path` | 有效路径 | `/api` |
| `Expires/Max-Age` | 过期时间 | `Expires=Wed, 21 Oct 2025 07:28:00 GMT` |
| `HttpOnly` | 禁止JS访问 | `HttpOnly` |
| `Secure` | 仅HTTPS传输 | `Secure` |
| `SameSite` | CSRF防护 | `Strict, Lax, None` |

**Cookie的缺陷：**
- 容量限制（4KB）
- 每次请求都会携带，增加开销
- 存在安全风险（XSS、CSRF）

#### Session

**概念**：存储在服务器端的用户状态信息，通过Session ID关联客户端。

```
┌─────────┐              ┌─────────┐              ┌─────────┐
│  浏览器  │──────────────►│  服务器  │──────────────►│ Session │
│ Cookie  │  Session ID   │  验证    │              │ 存储    │
│(ID:123) │◄──────────────│         │◄─────────────│(ID:123) │
└─────────┘              └─────────┘              └─────────┘
```

**Session vs Cookie：**

| 特性 | Cookie | Session |
|------|--------|---------|
| 存储位置 | 客户端 | 服务器端 |
| 安全性 | 较低 | 较高 |
| 存储容量 | 4KB | 无限制（服务器内存） |
| 性能 | 每次请求携带 | 需查询服务器 |
| 跨域 | 受限制 | 需配合Cookie |

#### Token

**概念**：服务端生成的加密字符串，用于标识用户身份。

**传统Token流程：**
```
1. 用户登录 → 2. 服务端生成Token → 3. 客户端存储Token
→ 4. 后续请求携带Token → 5. 服务端验证Token
```

**Token优势：**
- 服务端无状态，便于水平扩展
- 支持跨域、跨服务
- 天然支持移动端

#### JWT（JSON Web Token）

**概念**：基于JSON的开放标准（RFC 7519），用于在网络应用间传递声明。

**JWT结构：**

```
xxxxx.yyyyy.zzzzz
  │      │      │
  │      │      └─ Signature（签名）
  │      └──────── Payload（负载）
  └─────────────── Header（头部）
```

**JWT示例：**
```javascript
// Header（Base64Url编码）
{
  "alg": "HS256",
  "typ": "JWT"
}

// Payload（Base64Url编码）
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022,
  "exp": 1516242622
}

// Signature
HMACSHA256(
  base64Url(header) + "." +
  base64Url(payload),
  secret
)
```

**JWT工作流程：**

```
┌─────────┐                                    ┌─────────┐
│  客户端  │────── 1. 登录（用户名/密码） ──────►│  服务端  │
│         │◄───────── 2. 返回JWT ─────────────│         │
│  存储JWT │                                    │ 验证身份 │
│         │────── 3. 请求API（携带JWT） ──────►│ 生成JWT │
│         │◄──────── 4. 返回数据 ─────────────│ 验证JWT │
└─────────┘                                    └─────────┘
```

**JWT vs Session：**

| 特性 | JWT | Session |
|------|-----|---------|
| 存储位置 | 客户端 | 服务器端 |
| 扩展性 | 好（无状态） | 差（需共享Session） |
| 性能 | 验证快（无需查询） | 需查询存储 |
| 注销处理 | 困难（需黑名单） | 简单（删除Session） |
| 安全性 | 中等（可解码Header/Payload） | 较高 |

**JWT最佳实践：**
1. 设置合理的过期时间
2. 敏感信息不要放入Payload
3. 使用HTTPS传输
4. 刷新Token机制（Refresh Token）

---

### OSI七层模型

**OSI（Open System Interconnection）** 开放式系统互联模型，是国际标准化组织提出的网络通信概念框架。

```
┌─────────────────────────────────────────┐
│  第7层 │  应用层（Application Layer）    │  HTTP、FTP、SMTP、DNS
├────────┼────────────────────────────────┤
│  第6层 │  表示层（Presentation Layer）   │  SSL/TLS、编码、加密
├────────┼────────────────────────────────┤
│  第5层 │  会话层（Session Layer）        │  会话管理、身份验证
├────────┼────────────────────────────────┤
│  第4层 │  传输层（Transport Layer）      │  TCP、UDP
├────────┼────────────────────────────────┤
│  第3层 │  网络层（Network Layer）        │  IP、ICMP、路由器
├────────┼────────────────────────────────┤
│  第2层 │  数据链路层（Data Link Layer）  │  MAC、交换机、以太网
├────────┼────────────────────────────────┤
│  第1层 │  物理层（Physical Layer）       │  网线、光纤、无线电波
└────────┴────────────────────────────────┘
```

#### 各层详解

| 层级 | 功能 | 协议/设备 | 数据单位 |
|------|------|----------|----------|
| **应用层** | 为用户应用提供网络服务 | HTTP、FTP、SMTP、DNS | 报文（Message） |
| **表示层** | 数据格式转换、加密解密 | SSL/TLS、ASCII、JPEG | 报文（Message） |
| **会话层** | 建立、管理、终止会话 | NetBIOS、RPC | 报文（Message） |
| **传输层** | 端到端连接、可靠传输 | TCP、UDP | 段（Segment） |
| **网络层** | 寻址、路由选择 | IP、ICMP、ARP、路由器 | 包（Packet） |
| **数据链路层** | 帧同步、差错校验 | MAC、PPP、交换机 | 帧（Frame） |
| **物理层** | 比特流传输 | 网线、光纤、集线器 | 比特（Bit） |

#### TCP/IP四层模型 vs OSI七层模型

```
OSI七层模型                    TCP/IP四层模型
┌─────────────┐
│  应用层      │
├─────────────┤                ┌─────────────┐
│  表示层      │────────────────│  应用层      │  HTTP、FTP、DNS
├─────────────┤                ├─────────────┤
│  会话层      │                │  传输层      │  TCP、UDP
├─────────────┤                ├─────────────┤
│  传输层      │────────────────│  网络层      │  IP、ICMP
├─────────────┤                ├─────────────┤
│  网络层      │────────────────│  网络接口层  │  以太网、WiFi
├─────────────┤                └─────────────┘
│ 数据链路层   │
├─────────────┤
│  物理层      │
└─────────────┘
```

---

### TCP三次握手和四次挥手详解

#### TCP三次握手（建立连接）

**目的**：确认双方的接收和发送能力正常，同步序列号。

```
客户端                          服务器
  │                               │
  ├────────── SYN=1, seq=x ──────►│  ① 客户端请求建立连接
  │           (SYN_SENT)          │     发送序列号x
  │                               │
  │◄── SYN=1, ACK=1, seq=y ──────┤  ② 服务器同意建立
  │      ack=x+1 (SYN_RCVD)       │     发送序列号y
  │                               │     确认号x+1
  │                               │
  ├────────── ACK=1, seq=x+1 ────►│  ③ 客户端确认
  │      ack=y+1 (ESTABLISHED)    │     确认号y+1
  │                               │     (ESTABLISHED)
  │                               │
  ◄════════════════════════════════►  连接建立，开始传输
```

**为什么是三次？**

| 握手次数 | 客户端 | 服务端 | 结论 |
|----------|--------|--------|------|
| 1次 | 确认服务端收正常 | 无法确认 | ❌ 不行 |
| 2次 | 确认服务端收发正常 | 无法确认客户端收 | ❌ 不行 |
| 3次 | 确认服务端收发正常 | 确认客户端收发正常 | ✅ 可以 |

**三次握手可以携带数据吗？**
- 第一次、第二次：不可以（防止SYN Flood攻击）
- 第三次：可以

#### TCP四次挥手（断开连接）

**目的**：双方都能确认对方已经没有数据要发送，安全关闭连接。

```
客户端                          服务器
  │                               │
  ├────────── FIN=1, seq=u ──────►│  ① 客户端请求关闭
  │          (FIN_WAIT_1)         │     发送FIN
  │                               │
  │◄────────── ACK=1, seq=v ─────┤  ② 服务端确认
  │      ack=u+1 (CLOSE_WAIT)     │     发送ACK
  │          (FIN_WAIT_2)         │
  │                               │
  │   （服务端继续发送未发完的数据）  │
  │                               │
  │◄──────── FIN=1, ACK=1, seq=w─┤  ③ 服务端请求关闭
  │      ack=u+1 (LAST_ACK)       │     发送FIN
  │                               │
  ├────────── ACK=1, seq=u+1 ────►│  ④ 客户端确认
  │      ack=w+1 (TIME_WAIT)      │     发送ACK
  │                               │     (CLOSED)
  │   （等待2MSL后关闭）            │
  │                               │
  │          (CLOSED)             │
```

**为什么是四次？**

因为TCP是全双工通信，双方都需要单独关闭自己的发送通道：
1. 客户端发送FIN → 服务端确认（关闭客户端→服务端方向）
2. 服务端发送FIN → 客户端确认（关闭服务端→客户端方向）

**TIME_WAIT状态（2MSL）的作用：**

1. **确保ACK到达服务端**：如果ACK丢失，服务端会重发FIN
2. **防止旧连接的数据包干扰新连接**：等待网络中残留的数据包消失

**MSL（Maximum Segment Lifetime）**：报文最大生存时间，通常是2分钟。

---

### 浏览器渲染原理详解

#### 关键渲染路径（Critical Rendering Path）

```
HTML ──► DOM Tree ──┐
                    ├──► Render Tree ──► Layout ──► Paint ──► Composite
CSS ───► CSSOM Tree─┘
```

#### 详细渲染流程

**1. 构建DOM树（DOM Construction）**

```javascript
// HTML解析过程
bytes(字节) → characters(字符) → tokens(标记) → nodes(节点) → DOM
```

- 浏览器收到HTML响应，进行词法分析
- 将HTML转换为Token
- 根据Token构建DOM节点
- 组装成DOM树

**特点：**
- 遇到`<script>`会阻塞解析（除非使用`async`或`defer`）
- 遇到`<link rel="stylesheet">`会阻塞渲染

**2. 构建CSSOM树（CSSOM Construction）**

```javascript
// CSS解析过程
CSS Bytes → Characters → Tokens → Nodes → CSSOM
```

- 解析CSS文件和内联样式
- 构建CSSOM树

**特点：**
- CSS解析不会阻塞DOM构建
- 但会阻塞渲染（Render Tree构建需要CSSOM）

**3. 构建渲染树（Render Tree）**

```
DOM Tree + CSSOM Tree = Render Tree

┌────────────────────────────────────────┐
│  Render Tree（只包含可见元素）           │
├────────────────────────────────────────┤
│  • html                                │
│  • body                                │
│  • div.container（display: block）      │
│  • h1（visible）                        │
│  • p（visible）                         │
│  • （script、meta、head等不可见元素被忽略）│
│  • （display: none的元素被忽略）         │
└────────────────────────────────────────┘
```

**4. 布局（Layout/Reflow）**

- 计算每个节点在视口中的精确位置和大小
- 也称为Reflow（回流）

```javascript
// 触发Layout的属性
width、height、padding、margin、border
position、top、left、right、bottom
display、float、overflow
font-size、line-height
...
```

**5. 绘制（Paint）**

- 将渲染树的每个节点转换为屏幕上的实际像素
- 绘制文本、颜色、图像、边框、阴影等

```javascript
// 触发Paint的属性
color、background-color
border-style、border-radius
box-shadow、text-shadow
outline
...
```

**6. 合成（Composite）**

- 将多个图层合成为最终页面
- 使用GPU加速，提升性能

```
图层（Layer）概念：
┌─────────────────────────────────────┐
│  Layer 1: 背景                      │
├─────────────────────────────────────┤
│  Layer 2: 内容（div、文字等）         │
├─────────────────────────────────────┤
│  Layer 3: 固定头部（position: fixed） │
├─────────────────────────────────────┤
│  Layer 4: 弹窗（z-index高）           │
└─────────────────────────────────────┘
          ↓
    GPU合成最终画面
```

**会创建独立图层的属性：**
- `transform: translate3d()`、`transform: scale3d()`
- `opacity`
- `will-change: transform, opacity`
- `filter`
- `<video>`、`<canvas>`、`<iframe>`

#### 渲染优化策略

**1. 避免回流（Reflow）**

```javascript
// ❌ 不好的做法（多次回流）
const el = document.getElementById('app');
el.style.width = '100px';
el.style.height = '100px';
el.style.margin = '10px';

// ✅ 好的做法（批量修改）
const el = document.getElementById('app');
el.style.cssText = 'width: 100px; height: 100px; margin: 10px;';

// ✅ 或使用class
el.classList.add('new-style');
```

**2. 使用transform和opacity**

```css
/* ✅ 触发GPU加速，不会引起回流和重绘 */
.box {
  transform: translateX(100px);
  opacity: 0.5;
  will-change: transform;
}
```

**3. 避免强制同步布局（Forced Synchronous Layout）**

```javascript
// ❌ 强制同步布局（读取后立即写入）
function bad() {
  const height = box.offsetHeight;  // 读取（触发Layout）
  box.style.height = (height + 10) + 'px';  // 写入（再次触发Layout）
}

// ✅ 分离读写
function good() {
  const height = box.offsetHeight;  // 读取
  // ... 其他代码
  requestAnimationFrame(() => {
    box.style.height = (height + 10) + 'px';  // 写入
  });
}
```

**4. 防抖和节流滚动事件**

```javascript
// 使用 requestAnimationFrame 优化滚动
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updatePosition();
      ticking = false;
    });
    ticking = true;
  }
});
```

#### 关键性能指标

| 指标 | 名称 | 目标值 | 说明 |
|------|------|--------|------|
| FP | First Paint | < 1s | 首次绘制 |
| FCP | First Contentful Paint | < 1.8s | 首次内容绘制 |
| LCP | Largest Contentful Paint | < 2.5s | 最大内容绘制 |
| FID | First Input Delay | < 100ms | 首次输入延迟 |
| TTI | Time to Interactive | < 3.8s | 可交互时间 |
| CLS | Cumulative Layout Shift | < 0.1 | 累积布局偏移 |

---

## 小程序开发

### 小程序 vs Vue

| 特性 | 小程序 | Vue.js |
|------|--------|--------|
| **设计目标** | 跨平台轻量级应用（如微信生态内） | 通用前端框架（Web、移动端、桌面端） |
| **运行环境** | 封闭的沙箱环境（如微信小程序容器） | 浏览器或 Node.js 环境 |
| **开发模式** | 组件化 + 特定框架 API | 组件化 + 虚拟 DOM + 响应式系统 |
| **数据绑定** | 双向绑定（部分场景） + 手动更新 | 双向绑定（v-model） + 响应式更新 |
| **路由管理** | 框架内置（如微信小程序的页面栈） | 需手动实现或依赖插件（如 Vue Router） |
| **性能优化** | 依赖平台优化（如微信的预加载机制） | 需开发者手动优化（如代码分割、懒加载） |
| **生态扩展** | 依赖平台能力（如微信支付、分享） | 丰富的插件生态（如 Vuex、Vue Router） |
| **学习曲线** | 较低（特定平台 API） | 较高（需理解响应式原理、虚拟 DOM） |

### 自定义头部

**1. 配置navigationStyle**

在页面或全局配置中设置自定义导航栏：

```json
{
  "navigationStyle": "custom"
}
```

**2. 创建自定义头部组件**

```xml
<!-- custom-header.wxml -->
<view class="custom-header">
  <view class="status-bar" style="height: {{statusBarHeight}}px;"></view>
  <view class="nav-bar">
    <view class="nav-back" bindtap="goBack">
      <icon type="arrow-left" size="20"></icon>
    </view>
    <view class="nav-title">{{title}}</view>
    <view class="nav-more">
      <icon type="more" size="20"></icon>
    </view>
  </view>
</view>
```

```css
/* custom-header.wxss */
.custom-header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.status-bar {
  width: 100%;
}

.nav-bar {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 15px;
}

.nav-back, .nav-more {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-title {
  flex: 1;
  text-align: center;
  font-weight: bold;
}
```

```javascript
// custom-header.js
Component({
  properties: {
    title: {
      type: String,
      value: ''
    }
  },

  lifetimes: {
    attached() {
      // 获取状态栏高度
      const systemInfo = wx.getSystemInfoSync();
      this.setData({
        statusBarHeight: systemInfo.statusBarHeight
      });
    }
  },

  methods: {
    goBack() {
      wx.navigateBack();
    }
  }
});
```

**3. 在页面中使用**

```json
{
  "usingComponents": {
    "custom-header": "/components/custom-header/custom-header"
  }
}
```

```xml
<custom-header title="页面标题"></custom-header>
```

### 数据监听

**1. Page页面数据监听**

在小程序Page中，可以使用`observers`字段监听数据变化：

```javascript
Page({
  data: {
    name: 'John',
    age: 30,
    userInfo: {
      nickName: 'Jack',
      city: 'Beijing'
    }
  },

  observers: {
    // 监听单个字段
    'name'(newVal) {
      console.log('name changed to:', newVal);
    },

    // 监听多个字段
    'name, age'(newName, newAge) {
      console.log('name or age changed');
    },

    // 监听对象属性
    'userInfo.nickName'(newNickName) {
      console.log('nickName changed to:', newNickName);
    },

    // 监听整个对象
    'userInfo'(newUserInfo) {
      console.log('userInfo changed:', newUserInfo);
    }
  },

  updateName() {
    this.setData({
      name: 'Jane'
    });
  }
});
```

**2. Component组件数据监听**

在自定义组件中，可以使用`observers`监听properties和data：

```javascript
Component({
  properties: {
    title: {
      type: String,
      value: ''
    }
  },

  data: {
    count: 0
  },

  observers: {
    // 监听properties
    'title'(newTitle) {
      console.log('title changed to:', newTitle);
    },

    // 监听data
    'count'(newCount) {
      console.log('count changed to:', newCount);
    },

    // 监听多个字段
    'title, count'(newTitle, newCount) {
      console.log('title or count changed');
    }
  },

  methods: {
    updateCount() {
      this.setData({
        count: this.data.count + 1
      });
    }
  }
});
```

### 小程序调用接口原理

**1. 小程序网络请求的底层机制**

微信小程序的网络请求本质是通过 微信客户端的封装 实现的，底层基于 HTTP/HTTPS 协议与服务器通信。开发者无需直接操作原生网络库（如浏览器中的 XMLHttpRequest 或 fetch），而是通过小程序提供的 wx.request API 发起请求。

**关键流程**：

1. **开发者调用 wx.request**：
   在 JavaScript 代码中调用 wx.request 方法，传入请求参数（如 URL、方法、数据等）。

2. **微信客户端代理请求**：
   微信客户端接收到请求后，会通过其内置的网络模块发起 HTTP/HTTPS 请求。

3. **服务器响应**：
   服务器返回响应数据，微信客户端将数据解析后传递给小程序。

4. **回调函数处理**：
   小程序通过回调函数（success、fail、complete）处理响应数据或错误。

**2. 小程序网络请求的特点**

#### (1) 域名白名单限制

- 小程序的网络请求必须配置 合法域名（在微信公众平台后台设置）。
- 未经配置的域名无法发起请求（出于安全考虑）。

#### (2) HTTPS 强制要求

- 所有请求必须使用 HTTPS 协议（HTTP 不支持）。
- 微信小程序要求服务器证书有效且可信。

#### (3) 请求并发限制

- 小程序对并发请求数量有限制（通常为 10 个），避免过度占用资源。
- 超出限制的请求会被排队等待
- 可以通过请求池管理并发请求

#### (4) 数据格式支持

- 支持 JSON、XML 等常见数据格式。
- 响应数据会被自动解析为 JavaScript 对象（JSON）或字符串（其他格式）。

#### 参数说明

- **url**：请求的服务器地址（必须配置在合法域名中）。
- **method**：请求方法（GET、POST、PUT 等）。
- **data**：请求参数（会自动转换为 URL 查询字符串或请求体）。
- **header**：请求头（如 Content-Type）。
- **success**：请求成功的回调函数。
- **fail**：请求失败的回调函数。
- **complete**：请求完成的回调函数（无论成功或失败都会触发）。

**3. 与浏览器网络请求的区别**

| 特性 | 微信小程序 | 浏览器 |
|------|------------|--------|
| 请求方式 | 通过 wx.request API 发起 | 通过 XMLHttpRequest 或 fetch 发起 |
| 域名限制 | 必须配置合法域名 | 无强制限制（但可能受 CORS 限制） |
| 协议要求 | 必须 HTTPS | 支持 HTTP 和 HTTPS |
| 并发限制 | 有限制（通常 10 个） | 无明确限制 |
| 跨域问题 | 无跨域问题（微信客户端代理） | 可能受 CORS 限制 |

**4. 最佳实践**

```javascript
// 封装网络请求
function request(options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Content-Type': 'application/json',
        ...options.header
      },
      success(res) {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(new Error(`Request failed with status ${res.statusCode}`));
        }
      },
      fail(err) {
        reject(err);
      }
    });
  });
}

// 使用示例
request({
  url: 'https://api.example.com/users',
  method: 'GET'
}).then(data => {
  console.log('Success:', data);
}).catch(err => {
  console.error('Error:', err);
});
```

---

## 跨域与缓存

### 跨域问题解决

**1. CORS（跨域资源共享，推荐方案）**

**原理**：服务器通过响应头声明允许哪些源访问资源，浏览器根据响应头决定是否放行。

**关键响应头**：
- Access-Control-Allow-Origin: 允许的源（如*或具体域名http://example.com）。
- Access-Control-Allow-Methods: 允许的HTTP方法（如GET, POST, PUT）。
- Access-Control-Allow-Headers: 允许的请求头（如Content-Type, Authorization）。
- Access-Control-Allow-Credentials: 是否允许携带Cookie（需配合withCredentials: true）。

```javascript
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://example.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
```

**适用场景**：前后端分离、第三方API调用。

**2. JSONP（仅限GET请求）**

**原理**：利用`<script>`标签不受同源策略限制的特性，通过动态创建脚本请求数据，服务端返回函数调用（而非JSON）。

**步骤**：
- 前端定义回调函数（如handleData）。
- 动态创建`<script>`标签，URL包含回调函数名（如?callback=handleData）。
- 服务端返回`handleData({"data": "value"})`，前端自动执行。

**缺点**：仅支持GET请求，存在XSS风险。

```javascript
function handleData(data) {
  console.log(data);
}

const script = document.createElement('script');
script.src = 'http://api.example.com?callback=handleData';
document.body.appendChild(script);
```

**3. 代理服务器（开发/生产环境通用）**

**原理**：通过同源的代理服务器转发请求，隐藏真实跨域。

**实现方式**：

**开发环境**：配置Webpack DevServer或Vite的proxy选项。

```javascript
// vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://backend.example.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
};
```

**生产环境**：使用Nginx反向代理。

```nginx
location /api/ {
  proxy_pass http://backend.example.com;
  proxy_set_header Host $host;
}
```

**适用场景**：前后端同源部署困难时。

**4. postMessage（跨窗口通信）**

**原理**：通过window.postMessage方法在不同窗口（如iframe、弹出窗）间安全传递数据。

**步骤**：
- 发送方调用targetWindow.postMessage(data, targetOrigin)。
- 接收方监听message事件。

```javascript
// 父窗口
const iframe = document.getElementById('myIframe');
iframe.contentWindow.postMessage('Hello from parent!', 'http://child.example.com');

// 子窗口（iframe内）
window.addEventListener('message', (event) => {
  if (event.origin === 'http://parent.example.com') {
    console.log(event.data); // 'Hello from parent!'
  }
});
```

**适用场景**：跨域iframe通信、微前端架构。

**5. WebSocket（全双工通信）**

**原理**：WebSocket协议本身无跨域限制，建立连接后即可双向通信。

```javascript
const socket = new WebSocket('ws://api.example.com');
socket.onmessage = (event) => {
  console.log(event.data);
};
```

**适用场景**：实时应用（如聊天、股票行情）。

| 方案 | 优点 | 缺点 | 适用场景 |
|------|------|------|----------|
| CORS | 标准、安全、支持复杂请求（如带Cookie） | 需后端配合 | 前后端分离、第三方API |
| JSONP | 兼容性好（IE6+） | 仅支持GET，存在XSS风险 | 遗留系统、简单数据获取 |
| 代理服务器 | 无需后端修改，支持所有请求方法 | 需额外维护代理层 | 开发/生产环境通用 |
| postMessage | 安全、支持复杂数据类型 | 仅限窗口间通信 | 跨域iframe、微前端 |
| WebSocket | 实时性强，无跨域限制 | 协议较复杂，需持久连接 | 实时应用 |

### 浏览器缓存机制

**浏览器缓存**

浏览器缓存是指浏览器在本地存储资源（如 HTML、CSS、JS、图片等），当用户再次访问同一资源时，直接从本地读取而无需重新请求服务器。

#### 缓存机制

**强制缓存**：
- 浏览器通过 Cache-Control 和 Expires 头判断资源是否过期。
- 若未过期，直接使用本地缓存，不发送请求到服务器。
- 示例：Cache-Control: max-age=3600（缓存 1 小时）。

**协商缓存**：
- 若资源过期，浏览器发送请求到服务器，携带 If-Modified-Since 或 If-None-Match 头。
- 服务器检查资源是否修改，若未修改返回 304 Not Modified，浏览器使用本地缓存；若修改则返回新资源。
- 示例：ETag: "123456"，Last-Modified: Wed, 21 Oct 2023 07:28:00 GMT。

#### 缓存策略

**静态资源**：
- 对 CSS、JS、图片等不常变更的资源设置较长的缓存时间（如 max-age=31536000，即 1 年）。
- 通过文件名加哈希（如 style.123456.css）实现强制更新。

**动态资源**：
- 对 API 响应或动态内容设置较短的缓存时间或禁用缓存（Cache-Control: no-store）。

### 禁止浏览器缓存

**一、通过HTTP响应头设置**

HTTP响应头是服务器端控制缓存的核心方式，优先级最高且效果稳定。

#### Cache-Control

- **no-store**：完全禁止缓存，浏览器和代理服务器均不存储响应内容。
  ```
  Cache-Control: no-store
  ```

- **no-cache**：强制每次请求前验证资源是否过期（需配合ETag或Last-Modified）。
  ```
  Cache-Control: no-cache
  ```

- **max-age=0**：资源立即过期，但允许缓存（需配合no-cache使用以避免误用）。
  ```
  Cache-Control: no-cache, max-age=0
  ```

#### Pragma（兼容HTTP/1.0）

```
Pragma: no-cache
```
(现代浏览器已优先使用Cache-Control，此头仅作兼容。)

#### Expires

设置过期时间为过去时间，强制资源过期。

**二、通过HTML元标签（Meta Tags）**

在HTML头部添加`<meta>`标签，但仅对当前页面有效，且部分浏览器可能忽略。

```html
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
```

**三、通过JavaScript动态控制**

在页面加载时通过JavaScript清除缓存或强制重新加载资源。

**强制页面刷新**：
```javascript
location.reload(true); // true表示强制从服务器获取
```

**动态修改资源URL**

通过添加随机参数或版本号，使浏览器认为资源是新的。

```javascript
const script = document.createElement('script');
script.src = 'script.js?v=' + Date.now(); // 使用时间戳
document.head.appendChild(script);
```

**四、通过URL参数禁用缓存**

在资源URL后添加随机参数或版本号，避免浏览器复用缓存。

#### 时间戳

```html
<script src="script.js?t=1633046400"></script> <!-- 动态生成时间戳 -->
```

#### 版本号

```html
<link rel="stylesheet" href="style.css?v=1.2"> <!-- 发布时更新版本号 -->
```

#### 哈希值

使用构建工具（如Webpack）生成文件哈希，确保内容变更时URL自动更新。

```html
<script src="bundle.js?hash=abc123"></script>
```

---

## 其他工程化实践

### 对前端工程化的理解

**什么是前端工程化？**

前端工程化是指将软件工程的思想和方法应用到前端开发中，通过工具和流程标准化、规范化前端项目的开发、构建、测试和部署过程。

**主要解决的问题：**

1. **代码规范化**
   - 统一的代码风格（ESLint、Prettier）
   - Git提交规范（Commitlint、Conventional Commits）
   - 代码质量保障（TypeScript、单元测试）

2. **开发效率提升**
   - 脚手架工具快速创建项目
   - 热更新加速开发
   - 自动化构建减少重复劳动

3. **资源优化**
   - 代码压缩和混淆
   - 静态资源优化（图片压缩、懒加载）
   - Tree Shaking删除无用代码
   - 代码分割实现按需加载

4. **协作与维护**
   - 模块化开发
   - 组件化设计
   - 文档自动生成
   - 版本管理规范

5. **质量保证**
   - 自动化测试
   - 代码审查流程
   - 持续集成/持续部署（CI/CD）
   - 性能监控

**核心组成部分：**

```
前端工程化
├── 开发阶段
│   ├── 脚手架
│   ├── 组件库
│   ├── Mock数据
│   └── 开发规范
├── 构建阶段
│   ├── 代码编译（Babel）
│   ├── 打包工具（Webpack/Vite）
│   ├── 代码优化
│   └── 资源处理
├── 测试阶段
│   ├── 单元测试
│   ├── E2E测试
│   └── 性能测试
└── 部署阶段
    ├── CI/CD流水线
    ├── 环境管理
    └── 监控告警
```

### 对SSG的理解

**什么是SSG（Static Site Generation）？**

SSG（静态站点生成）是指在构建时将页面预先渲染为静态HTML文件，部署时直接返回这些静态文件，无需服务器实时渲染。

**SSG vs SSR vs CSR：**

| 特性 | SSG | SSR | CSR |
|------|-----|-----|-----|
| 首屏加载 | 极快 | 较快 | 较慢 |
| SEO | 友好 | 友好 | 不友好 |
| 服务器压力 | 极低 | 较高 | 低 |
| 动态内容 | 需额外处理 | 支持 | 支持 |
| 构建时间 | 较长 | 短 | 短 |

**SSG工作流程：**

```
开发阶段 → 构建阶段 → 部署阶段 → 用户访问
    ↓           ↓           ↓           ↓
  编写代码   预渲染HTML   静态托管    直接返回
            生成静态文件  CDN分发     HTML
```

**适用场景：**

1. **内容型网站**
   - 博客
   - 文档站点
   - 企业官网

2. **营销页面**
   - 活动落地页
   - 产品介绍页

3. **更新频率低的应用**
   - 文档
   - 帮助中心

**常用工具：**

- **Next.js**：React生态的SSG方案
- **Nuxt.js**：Vue生态的SSG方案
- **Gatsby**：React静态站点生成器
- **Hugo**：Go编写的极速SSG工具
- **Hexo**：博客框架

**SSG优化策略：**

1. **增量静态再生（ISR）**
   - 无需重新构建整个站点
   - 按需更新特定页面

2. **混合渲染**
   - 静态页面 + 客户端动态数据
   - 部分页面使用SSR

3. **CDN加速**
   - 全球分发静态资源
   - 边缘缓存

### Monorepo管理

**适用场景：**
- 多个相关项目
- 共享组件库
- 微前端架构

**工具选择：**
- **Lerna**：传统工具，支持独立版本
- **Nx**：功能强大，支持多种框架
- **pnpm/yarn workspace**：轻量级，速度快

**目录结构：**
```
packages/
  ├── app1/
  ├── app2/
  ├── shared-components/
  └── utils/
```

### 微前端

**概念：**
将前端应用拆分为更小、独立部署的应用。

**方案：**
1. **single-spa**：框架无关
2. **qiankun**：基于single-spa
3. **Module Federation**：Webpack 5特性
4. **Web Components**：原生方案

**挑战：**
- 样式隔离
- 状态共享
- 路由同步
- 依赖共享

### 低代码/无代码

**趋势：**
- 提高开发效率
- 降低门槛
- 快速原型验证

**方案：**
- **可视化搭建**：拖拽组件
- **流程编排**：可视化配置业务逻辑
- **表单生成器**：动态表单

**适用场景：**
- 管理后台
- 活动页面
- 数据报表

### 开发体验优化

**DevTools**
- React DevTools
- Vue DevTools
- Redux DevTools

**Vite Plugin**
- 快速HMR
- 插件生态
- 优化开发体验

**代码生成**
- Plop.js：生成模板文件
- Yeoman：脚手架工具
- 自定义CLI工具

### 文档工程化

**重要性：**
- 知识沉淀
- 团队协作
- 新人上手

**工具：**
- **Docusaurus**：React生态
- **VuePress**：Vue生态
- **Storybook**：组件文档
- **GitBook**：通用文档

**最佳实践：**
1. 代码即文档（JSDoc）
2. README.md
3. API文档自动化
4. 设计文档
5. 变更日志

### 兼容性处理

**1. 渐进增强和优雅降级**

**渐进增强**：从基本功能开始，逐步增强功能
```css
/* 基础样式 */
.button {
  padding: 10px 20px;
  background: #007cba;
  color: white;
  border: none;
}

/* 增强样式 */
@supports (border-radius: 5px) {
  .button {
    border-radius: 5px;
  }
}
```

**优雅降级**：从最新功能开始，为旧浏览器提供备选方案
```css
/* 现代浏览器 */
.flex-container {
  display: flex;
  justify-content: space-between;
}

/* 旧浏览器备选 */
.no-flex .flex-container {
  display: block;
}
.flex-container > * {
  float: left;
  width: 30%;
}
```

**2. 使用Polyfill**

```html
<!-- polyfill.io 自动检测浏览器并提供所需polyfill -->
<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>

<!-- 或者使用特定polyfill -->
<script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js"></script>
```

**3. CSS前缀和特性检测**

```css
/* 使用Autoprefixer自动添加前缀 */
.transform-element {
  transform: rotate(45deg);
  transition: transform 0.3s ease;
}

/* 特性检测 */
@supports (display: grid) {
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}
```

**4. 浏览器测试策略**

1. **确定目标浏览器**：根据用户数据分析确定支持的浏览器版本
2. **自动化测试**：使用Selenium、Cypress等工具进行跨浏览器测试
3. **云测试平台**：使用BrowserStack、Sauce Labs等服务测试真实设备

### SEO优化

**1. 技术SEO**

**页面结构优化**：
- 使用语义化HTML标签
- 合理的标题层级（H1-H6）
- 添加alt属性到图片

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <title>页面标题 - 网站名称</title>
  <meta name="description" content="页面描述，不超过160个字符">
  <meta name="keywords" content="关键词1,关键词2,关键词3">
</head>
<body>
  <h1>主标题</h1>
  <h2>副标题</h2>
  <img src="image.jpg" alt="图片描述">
</body>
</html>
```

**网站性能优化**：
- 提升页面加载速度
- 优化图片大小和格式
- 使用CDN加速

**移动端适配**：
- 响应式设计
- 添加viewport meta标签
- 移动端友好的交互

**2. 内容SEO**

**高质量内容**：
- 原创、有价值的内容
- 合理的关键词密度
- 定期更新内容

**内容结构**：
- 使用清晰的段落结构
- 添加内部链接
- 使用列表和标题组织内容

**3. 外部优化**

**外链建设**：
- 获取高质量的外部链接
- 参与行业讨论和合作
- 社交媒体分享
- Guest Blogging（客座博客）
- 目录提交

**本地SEO**：
- Google My Business优化
- 本地关键词优化
- 获取本地评价和引用
- 本地结构化数据标记
- 本地目录列表

**4. 技术SEO进阶**

**结构化数据**：
- 使用Schema.org标记
- 提升搜索结果展示效果

**站点地图**：
- XML网站地图
- HTML站点地图

**robots.txt**：
- 控制搜索引擎爬虫访问
- 防止敏感内容被抓取

### 判断元素进入视窗

**1. 使用 IntersectionObserver API**

IntersectionObserver 是现代浏览器提供的原生 API，用于高效地监听元素与视口的交叉状态（即是否进入视窗）。

```javascript
// 创建观察器
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 元素进入视窗
      console.log('Element entered viewport');
      // 执行相关逻辑，如加载图片、启动动画等

      // 停止观察（可选）
      observer.unobserve(entry.target);
    }
  });
}, {
  // 配置选项
  threshold: 0.1, // 当10%的元素可见时触发
  rootMargin: '0px' // 根边距
});

// 开始观察目标元素
const target = document.querySelector('.target-element');
observer.observe(target);
```

**2. 使用 getBoundingClientRect 手动计算**

通过比较元素的位置和视口的大小，手动判断元素是否进入视窗。

```javascript
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= windowHeight &&
    rect.right <= windowWidth
  );
}

// 检测元素是否在视口中
const element = document.querySelector('.target-element');
if (isInViewport(element)) {
  console.log('Element is in viewport');
}

// 监听滚动事件（需要节流优化）
window.addEventListener('scroll', () => {
  if (isInViewport(element)) {
    console.log('Element entered viewport');
  }
});
```

**3. 使用第三方库**

```javascript
// 使用InView库
import { useInView } from 'react-intersection-observer';

function MyComponent() {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  return (
    <div ref={ref}>
      {inView ? 'Element is visible!' : 'Element is not visible'}
    </div>
  );
}
```
