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
- [小程序开发](#小程序开发)
- [跨域与缓存](#跨域与缓存)
- [其他工程化实践](#其他工程化实践)
- [当QPS达到峰值时，该如何处理？](#当qps达到峰值时该如何处理)
- [使用同一个链接，如何实现PC打开是web应用、手机打开是一个H5应用？](#使用同一个链接如何实现pc打开是web应用手机打开是一个h5应用)
- [如何保证用户的使用体验？](#如何保证用户的使用体验)
- [如何解决页面请求接口大规模并发问题？](#如何解决页面请求接口大规模并发问题)
- [设计一套全站请求耗时统计工具](#设计一套全站请求耗时统计工具)
- [如何实现网页加载进度条？](#如何实现网页加载进度条)
- [扫码登录实现方式](#扫码登录实现方式)
- [cookie组成部分有哪些？](#cookie组成部分有哪些)
- [DNS协议了解多少？](#dns协议了解多少)
- [Webpack 手写实现系列](#webpack-手写实现系列)
- [Git 相关](#git-相关)
- [新一代构建工具](#新一代构建工具)
- [微前端架构](#微前端架构)
- [Core Web Vitals 性能优化](#core-web-vitals-性能优化)
- [系统稳定性](#系统稳定性)

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

#### 1. URL解析与导航
- 浏览器解析URL，识别协议（http/https）、域名、路径、查询参数等
- **HSTS检查**：如果是https，检查HSTS列表决定是否强制HTTPS
- **安全检查**：CSP策略检查、CORS预检等

#### 2. 缓存检查
按优先级检查缓存（Memory Cache → Disk Cache → Push Cache）：
- **Service Worker**：检查是否有拦截请求的Service Worker
- **Memory Cache**：快速读取内存中的资源（base64图片、js、css等）
- **Disk Cache**：读取磁盘缓存（大文件、字体等）
- **Push Cache**：HTTP/2服务器推送的缓存
- 根据`Cache-Control`、`Expires`、`Last-Modified`、`ETag`判断缓存是否有效

#### 3. DNS解析
- **浏览器DNS缓存** → **操作系统DNS缓存**（hosts文件）→ **路由器缓存** → **ISP DNS** → **根域名服务器**
- DNS预解析：通过`<link rel="dns-prefetch">`提前解析
- 返回IP地址，可能返回多个IP（CDN负载均衡）

#### 4. 建立TCP连接

**三次握手：**
```
客户端 → SYN(seq=x) → 服务器
客户端 ← SYN(seq=y, ack=x+1) ← 服务器
客户端 → ACK(ack=y+1) → 服务器
```

**HTTPS额外的TLS握手（1-2 RTT）：**
- TLS 1.2：2-RTT（ClientHello → ServerHello/Certificate → ClientKeyExchange）
- TLS 1.3：1-RTT 或 0-RTT（会话恢复）

**连接优化：**
- **TCP Fast Open**：减少握手RTT
- **HTTP/2**：多路复用，单一TCP连接传输多个请求
- **HTTP/3**：基于QUIC，0-RTT握手，解决队头阻塞
- **Keep-Alive**：连接复用，不会立即关闭

#### 5. 发送HTTP请求

```http
GET /index.html HTTP/1.1
Host: example.com
Connection: keep-alive
Accept: text/html
Accept-Encoding: gzip, deflate
Cookie: session=xxx
```

浏览器根据请求头决定：
- 是否发送Cookie（SameSite策略）
- 压缩方式（gzip/brotli）
- 缓存协商（If-None-Match/If-Modified-Since）

#### 6. 服务器处理与响应

**服务器处理流程：**
- 反向代理（Nginx）→ 负载均衡 → 应用服务器 → 数据库/缓存
- 可能返回301/302重定向、304未修改、200成功等

**响应头关键字段：**
```http
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Content-Length: 1234
Cache-Control: max-age=3600
Set-Cookie: id=xxx; HttpOnly; Secure
```

#### 7. 浏览器接收响应
- 根据`Content-Type`决定处理方式
- 如果是`gzip/deflate/br`编码，先解压
- 如果是下载文件，触发下载流程

#### 8. 页面渲染（关键渲染路径）

**解析阶段：**
1. **HTML解析** → 构建DOM树
   - 遇到`<script>`：阻塞解析，下载并执行JS（除非`defer`/`async`）
   - 遇到`<link rel="stylesheet">`：CSS会阻塞渲染但不阻塞HTML解析
   - **预加载扫描器**：并行发现`<img>`、`<link>`等资源并预加载

2. **CSS解析** → 构建CSSOM树
   - 解析CSS文件，处理选择器和属性
   - 处理媒体查询（@media）

**构建渲染树（Render Tree）：**
- 合并DOM和CSSOM，计算每个节点的样式
- 不可见元素（`display:none`、`<head>`）不进入渲染树

**布局（Layout/Reflow）：**
- 计算每个可见元素的位置和尺寸
- 从根节点递归计算（流式布局）

**分层（Layer）：**
- 将页面分为多个图层（普通图层、合成图层）
- 触发合成图层的条件：3D变换、video、canvas、opacity动画等

**绘制（Paint）：**
- 将图层绘制为位图（光栅化）
- 可能使用GPU加速

**合成（Composite）：**
- 将各图层合成为最终页面
- 由Compositor线程处理，不阻塞主线程

#### 9. 加载完成事件
- **DOMContentLoaded**：DOM和CSSOM解析完成，可以操作DOM
- **load**：所有资源（图片、iframe等）加载完成
- **beforeunload/unload**：页面关闭时

---

**完整流程图：**

```
用户输入URL
    ↓
[Service Worker拦截?] → 是 → 返回缓存
    ↓ 否
检查各级缓存（Memory/Disk）→ 命中 → 直接使用
    ↓ 未命中
DNS解析 → 获取IP地址
    ↓
TCP三次握手 + TLS握手（HTTPS）
    ↓
发送HTTP请求
    ↓
服务器处理
    ↓
接收HTTP响应
    ↓
解析HTML → 构建DOM
    ↓
解析CSS → 构建CSSOM
    ↓
执行JavaScript（可能阻塞）
    ↓
构建Render Tree
    ↓
Layout（布局计算）
    ↓
Paint（绘制）→ Composite（合成）
    ↓
页面显示 → DOMContentLoaded → load
```

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

### 小程序双线程架构

#### 为什么会有两个线程

微信小程序采用**双线程架构**（逻辑层 + 渲染层分离），主要为了解决以下问题：

1. **安全性**：JS 代码运行在沙箱环境，无法直接操作 DOM，防止恶意脚本攻击
2. **性能优化**：逻辑和渲染分离，避免 JS 执行阻塞页面渲染
3. **管控能力**：微信可以控制小程序的能力边界，保护用户隐私

```
┌─────────────────────────────────────────────────────────────┐
│                    微信客户端 (Native)                        │
├──────────────────────────┬──────────────────────────────────┤
│      渲染层 (View)        │          逻辑层 (Service)        │
│   ┌──────────────────┐   │    ┌──────────────────────────┐  │
│   │   WebView        │   │    │      JSCore              │  │
│   │  ┌─────────────┐ │   │    │  ┌──────────────────┐    │  │
│   │  │    WXML     │ │   │    │  │    JS 代码        │    │  │
│   │  │  (虚拟DOM)   │ │◀──│────│──│  ┌────────────┐  │    │  │
│   │  └─────────────┘ │   │    │  │  │  App/Page   │  │    │  │
│   │  ┌─────────────┐ │   │    │  │  │  逻辑处理    │  │    │  │
│   │  │    WXSS     │ │   │    │  │  └────────────┘  │    │  │
│   │  │   (样式)    │ │   │    │  │  ┌────────────┐  │    │  │
│   │  └─────────────┘ │   │    │  │  │   setData   │──┼────┼──┤
│   └──────────────────┘   │    │  │  │  (数据通信)  │  │    │  │
│                          │    │  │  └────────────┘  │    │  │
│   职责：界面渲染          │    │  └──────────────────┘    │  │
│   - WXML/WXSS 解析       │    │                            │  │
│   - 组件渲染             │    │  职责：业务逻辑             │  │
│   - 事件响应             │    │   - 数据处理               │  │
│   - 动画执行             │    │   - 网络请求               │  │
│                          │    │   - 本地存储               │  │
└──────────────────────────┘    └────────────────────────────┘  │
           ▲                               │                    │
           └──────── Native 通信桥 ────────┘                    │
              (setData / 事件回调)                              │
└─────────────────────────────────────────────────────────────┘
```

#### 双线程的优缺点

| 特性 | 优点 | 缺点 |
|------|------|------|
| **安全性** | JS 无法直接操作 DOM，防止 XSS 攻击 | 能力受限，无法实现某些浏览器功能 |
| **性能** | JS 执行不阻塞渲染 | 数据通信有延迟 |
| **管控** | 微信可以审核和限制能力 | 灵活性降低 |
| **兼容性** | 统一运行环境，兼容性好 | 部分 Web API 不支持 |

#### setData 通信机制

```javascript
// 逻辑层
Page({
  data: {
    list: []
  },

  onLoad() {
    // 发起网络请求
    wx.request({
      url: 'https://api.example.com/list',
      success: (res) => {
        // 通过 setData 将数据发送到渲染层
        // 数据需要序列化后通过 Native 层转发
        this.setData({
          list: res.data
        });
      }
    });
  },

  handleTap(event) {
    // 用户点击事件从渲染层传递到逻辑层
    console.log(event.currentTarget.dataset.id);
  }
});
```

**setData 性能优化：**

```javascript
// ❌ 频繁调用 setData
for (let i = 0; i < 100; i++) {
  this.setData({
    [`list[${i}]`]: item
  }); // 触发 100 次通信
}

// ✅ 合并数据，一次性 setData
const newList = [];
for (let i = 0; i < 100; i++) {
  newList.push(item);
}
this.setData({
  list: newList
}); // 只触发 1 次通信

// ✅ 只更新必要字段
this.setData({
  'user.name': '张三'  // 只更新 name 字段，而非整个 user 对象
});
```

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

---

## 前端如何实现截图？

### 方案一：html2canvas（最常用）

```javascript
import html2canvas from 'html2canvas';

// 基本使用
async function captureElement(element) {
  const canvas = await html2canvas(element, {
    backgroundColor: '#ffffff',  // 背景色
    scale: 2,                     // 缩放比例（高清屏）
    useCORS: true,               // 允许跨域图片
    allowTaint: true,            // 允许污染canvas
    logging: false,              // 关闭日志
    // 忽略的元素
    ignoreElements: (el) => el.classList.contains('no-capture')
  });

  // 转为图片URL
  const imageUrl = canvas.toDataURL('image/png');

  // 下载
  const link = document.createElement('a');
  link.download = 'screenshot.png';
  link.href = imageUrl;
  link.click();

  return imageUrl;
}

// 捕获整个页面
async function capturePage() {
  const canvas = await html2canvas(document.body);
  return canvas.toDataURL();
}
```

**优点**：
- 纯前端实现，无需服务端
- 支持DOM到Canvas转换
- 配置灵活

**缺点**：
- 不支持所有CSS属性（如box-shadow可能渲染异常）
- 大页面可能卡顿
- 跨域图片需要处理

### 方案二：dom-to-image

```javascript
import domtoimage from 'dom-to-image';

// 生成PNG
domtoimage.toPng(document.getElementById('my-node'))
  .then(dataUrl => {
    const link = document.createElement('a');
    link.download = 'my-image.png';
    link.href = dataUrl;
    link.click();
  })
  .catch(error => {
    console.error('截图失败:', error);
  });

// 生成JPEG（可指定质量）
domtoimage.toJpeg(document.getElementById('my-node'), {
  quality: 0.95,
  bgcolor: '#ffffff'
});

// 生成SVG（矢量）
domtoimage.toSvg(document.getElementById('my-node'));
```

### 方案三：Canvas原生绘制

```javascript
function createScreenshot() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // 设置尺寸
  canvas.width = 800;
  canvas.height = 600;

  // 绘制背景
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 绘制文本
  ctx.font = '24px Arial';
  ctx.fillStyle = '#333333';
  ctx.fillText('Hello World', 50, 50);

  // 绘制图片
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    ctx.drawImage(img, 100, 100, 200, 200);

    // 导出
    const dataUrl = canvas.toDataURL('image/png');
  };
  img.src = 'https://example.com/image.jpg';
}
```

### 方案四：服务端截图（Puppeteer）

```javascript
// server.js - Node.js服务端
const puppeteer = require('puppeteer');

async function takeScreenshot(url, options = {}) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // 设置视口
  await page.setViewport({
    width: options.width || 1920,
    height: options.height || 1080
  });

  // 访问页面
  await page.goto(url, { waitUntil: 'networkidle0' });

  // 截图
  const screenshot = await page.screenshot({
    path: options.path,
    fullPage: options.fullPage || false,
    type: 'png'
  });

  await browser.close();
  return screenshot;
}

// API接口
app.post('/api/screenshot', async (req, res) => {
  const { url } = req.body;
  const imageBuffer = await takeScreenshot(url, { fullPage: true });
  res.set('Content-Type', 'image/png');
  res.send(imageBuffer);
});
```

### 方案对比

| 方案 | 优点 | 缺点 | 适用场景 |
|------|------|------|----------|
| html2canvas | 纯前端、易用 | 性能一般、CSS支持有限 | 简单DOM截图 |
| dom-to-image | 轻量、SVG支持 | 复杂DOM可能异常 | 简单截图、SVG |
| Canvas原生 | 控制精细 | 需要手动绘制 | 自定义绘制 |
| Puppeteer | 完美渲染 | 需要服务端 | 高精度截图 |

---

## 当QPS达到峰值时，该如何处理？

### 1. 前端限流与防抖

```javascript
// 请求队列控制
class RequestQueue {
  constructor(maxConcurrent = 5) {
    this.maxConcurrent = maxConcurrent;
    this.running = 0;
    this.queue = [];
  }

  async add(requestFn) {
    if (this.running >= this.maxConcurrent) {
      await new Promise(resolve => this.queue.push(resolve));
    }

    this.running++;
    try {
      return await requestFn();
    } finally {
      this.running--;
      if (this.queue.length > 0) {
        const next = this.queue.shift();
        next();
      }
    }
  }
}

// 防抖处理
function debounceRequest(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// 使用
const queue = new RequestQueue(3);

async function fetchData() {
  return queue.add(() => fetch('/api/data').then(r => r.json()));
}
```

### 2. 缓存策略

```javascript
// 多级缓存
class CacheManager {
  constructor() {
    this.memory = new Map();
    this.indexedDB = null;
  }

  async get(key) {
    // L1: 内存缓存
    if (this.memory.has(key)) {
      return this.memory.get(key);
    }

    // L2: LocalStorage
    const local = localStorage.getItem(key);
    if (local) {
      this.memory.set(key, JSON.parse(local));
      return JSON.parse(local);
    }

    return null;
  }

  set(key, value, ttl = 300000) {
    this.memory.set(key, value);
    localStorage.setItem(key, JSON.stringify(value));

    // 设置过期
    setTimeout(() => {
      this.memory.delete(key);
      localStorage.removeItem(key);
    }, ttl);
  }
}
```

### 3. 降级策略

```javascript
// 熔断器
class CircuitBreaker {
  constructor(threshold = 5, timeout = 60000) {
    this.failureCount = 0;
    this.threshold = threshold;
    this.timeout = timeout;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
  }

  async execute(requestFn) {
    if (this.state === 'OPEN') {
      throw new Error('Service is unavailable');
    }

    try {
      const result = await requestFn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }

  onFailure() {
    this.failureCount++;
    if (this.failureCount >= this.threshold) {
      this.state = 'OPEN';
      setTimeout(() => {
        this.state = 'HALF_OPEN';
      }, this.timeout);
    }
  }
}
```

### 4. 服务端配合

```javascript
// CDN预热
const cdnPreload = async (urls) => {
  await fetch('/api/cdn/preload', {
    method: 'POST',
    body: JSON.stringify({ urls })
  });
};

// 静态资源使用CDN
// index.html 中的资源引用
// <script src="https://cdn.example.com/app.js"></script>
```

---

## 使用同一个链接，如何实现PC打开是web应用、手机打开是一个H5应用？

### 方案一：User-Agent判断

```javascript
// 中间件判断
function deviceDetector(req, res, next) {
  const userAgent = req.headers['user-agent'] || '';

  const isMobile = /Mobile|Android|iPhone|iPad|iPod/i.test(userAgent);

  req.deviceType = isMobile ? 'mobile' : 'desktop';
  next();
}

// 路由处理
app.get('/', deviceDetector, (req, res) => {
  if (req.deviceType === 'mobile') {
    res.sendFile(path.join(__dirname, 'h5/index.html'));
  } else {
    res.sendFile(path.join(__dirname, 'web/index.html'));
  }
});
```

### 方案二：响应式同构应用

```javascript
// Vue/React中根据屏幕尺寸渲染不同组件
import { ref, onMounted } from 'vue';

function useDeviceType() {
  const deviceType = ref('desktop');

  onMounted(() => {
    const checkDevice = () => {
      deviceType.value = window.innerWidth <= 768 ? 'mobile' : 'desktop';
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
  });

  return deviceType;
}

// 组件中使用
const deviceType = useDeviceType();

// 模板中根据设备类型渲染
// <DesktopLayout v-if="deviceType === 'desktop'" />
// <MobileLayout v-else />
```

### 方案三：Nginx反向代理

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        # 根据User-Agent代理到不同目录
        if ($http_user_agent ~* "(Mobile|Android|iPhone)") {
            root /var/www/h5;
            try_files $uri $uri/ /index.html;
        }

        root /var/www/web;
        try_files $uri $uri/ /index.html;
    }
}
```

### 方案对比

| 方案 | 优点 | 缺点 | 适用场景 |
|------|------|------|----------|
| User-Agent | 服务端控制、SEO友好 | 需要维护两份代码 | 差异较大的场景 |
| 响应式 | 维护成本低 | 包体积大 | 差异较小的场景 |
| Nginx | 性能好 | 配置复杂 | 大流量场景 |

---

## 如何保证用户的使用体验？

### 1. 性能优化

```javascript
// 性能监控
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    // 上报性能数据
    reportPerformance({
      name: entry.name,
      duration: entry.duration,
      type: entry.entryType
    });
  }
});

observer.observe({ entryTypes: ['measure', 'navigation', 'resource'] });

// 关键指标
// FCP (First Contentful Paint)
// LCP (Largest Contentful Paint)
// FID (First Input Delay)
// CLS (Cumulative Layout Shift)
```

### 2. 错误监控与恢复

```javascript
// 全局错误捕获
window.onerror = (message, source, lineno, colno, error) => {
  reportError({
    type: 'javascript',
    message,
    source,
    lineno,
    stack: error?.stack
  });
};

// Promise错误
window.addEventListener('unhandledrejection', (event) => {
  reportError({
    type: 'promise',
    reason: event.reason
  });
});

// 错误边界（React）
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    reportError({ error, info });
  }

  render() {
    if (this.state.hasError) {
      return <FallbackUI />;
    }
    return this.props.children;
  }
}
```

### 3. 加载优化

```javascript
// 骨架屏
function SkeletonScreen() {
  return (
    <div className="skeleton">
      <div className="skeleton-header" />
      <div className="skeleton-content" />
    </div>
  );
}

// 渐进加载
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<SkeletonScreen />}>
      <LazyComponent />
    </Suspense>
  );
}
```

### 4. 交互反馈

```javascript
// 按钮 loading 状态
function Button({ loading, children, ...props }) {
  return (
    <button disabled={loading} {...props}>
      {loading ? '加载中...' : children}
    </button>
  );
}

// Toast 提示
const toast = {
  success: (msg) => showToast(msg, 'success'),
  error: (msg) => showToast(msg, 'error'),
  loading: (msg) => showToast(msg, 'loading')
};

// 使用
async function submit() {
  const hide = toast.loading('提交中...');
  try {
    await api.submit();
    toast.success('提交成功');
  } catch (error) {
    toast.error('提交失败');
  } finally {
    hide();
  }
}
```

---

## 如何解决页面请求接口大规模并发问题？

### 1. 请求合并

```javascript
// 将多个请求合并为一个
class RequestBatcher {
  constructor() {
    this.batch = [];
    this.timer = null;
  }

  add(request) {
    this.batch.push(request);

    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.flush(), 50); // 50ms内合并

    return new Promise((resolve, reject) => {
      request.resolve = resolve;
      request.reject = reject;
    });
  }

  async flush() {
    if (this.batch.length === 0) return;

    const currentBatch = this.batch.splice(0);

    try {
      const results = await fetch('/api/batch', {
        method: 'POST',
        body: JSON.stringify({
          requests: currentBatch.map(r => ({
            url: r.url,
            method: r.method,
            data: r.data
          }))
        })
      }).then(r => r.json());

      // 分发结果
      currentBatch.forEach((req, index) => {
        req.resolve(results[index]);
      });
    } catch (error) {
      currentBatch.forEach(req => req.reject(error));
    }
  }
}
```

### 2. 请求去重

```javascript
// 相同请求共享结果
class RequestDeduper {
  constructor() {
    this.pending = new Map();
  }

  async request(key, requestFn) {
    if (this.pending.has(key)) {
      return this.pending.get(key);
    }

    const promise = requestFn().finally(() => {
      this.pending.delete(key);
    });

    this.pending.set(key, promise);
    return promise;
  }
}

// 使用
const deduper = new RequestDeduper();

// 多次调用只会发一个请求
function getUser(id) {
  return deduper.request(`user-${id}`, () =>
    fetch(`/api/users/${id}`).then(r => r.json())
  );
}
```

### 3. 虚拟滚动（大数据列表）

```javascript
// 只渲染可视区域的元素
function VirtualList({ items, itemHeight, renderItem }) {
  const containerRef = useRef();
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = items.length * itemHeight;
  const containerHeight = containerRef.current?.clientHeight || 600;

  const startIndex = Math.floor(scrollTop / itemHeight);
  const visibleCount = Math.ceil(containerHeight / itemHeight) + 1;
  const endIndex = Math.min(startIndex + visibleCount, items.length);

  const visibleItems = items.slice(startIndex, endIndex);
  const offsetY = startIndex * itemHeight;

  return (
    <div
      ref={containerRef}
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map(renderItem)}
        </div>
      </div>
    </div>
  );
}
```

---

## 设计一套全站请求耗时统计工具

### 核心实现

```javascript
// request-monitor.js
class RequestMonitor {
  constructor(options = {}) {
    this.threshold = options.threshold || 1000; // 慢请求阈值
    this.reports = [];
    this.init();
  }

  init() {
    // 拦截原生fetch
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const startTime = performance.now();
      const [url, config] = args;

      try {
        const response = await originalFetch.apply(window, args);
        this.record({
          url: url.toString(),
          method: config?.method || 'GET',
          status: response.status,
          duration: performance.now() - startTime,
          success: response.ok
        });
        return response;
      } catch (error) {
        this.record({
          url: url.toString(),
          method: config?.method || 'GET',
          duration: performance.now() - startTime,
          success: false,
          error: error.message
        });
        throw error;
      }
    };

    // 拦截XHR
    this.interceptXHR();
  }

  interceptXHR() {
    const OriginalXHR = window.XMLHttpRequest;

    window.XMLHttpRequest = function() {
      const xhr = new OriginalXHR();
      const startTime = performance.now();

      xhr.addEventListener('loadend', () => {
        this.record({
          url: xhr.responseURL,
          method: xhr._method || 'GET',
          status: xhr.status,
          duration: performance.now() - startTime,
          success: xhr.status >= 200 && xhr.status < 300
        });
      });

      const originalOpen = xhr.open;
      xhr.open = function(method, url) {
        xhr._method = method;
        return originalOpen.apply(xhr, arguments);
      };

      return xhr;
    };
  }

  record(data) {
    const report = {
      ...data,
      timestamp: Date.now(),
      page: window.location.href
    };

    this.reports.push(report);

    // 慢请求告警
    if (data.duration > this.threshold) {
      console.warn('Slow request detected:', report);
      this.onSlowRequest?.(report);
    }

    // 实时上报
    this.report(report);
  }

  report(data) {
    // 发送到监控平台
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/monitor', JSON.stringify(data));
    } else {
      fetch('/api/monitor', {
        method: 'POST',
        body: JSON.stringify(data),
        keepalive: true
      });
    }
  }

  // 生成统计报告
  getStatistics() {
    const stats = {
      total: this.reports.length,
      success: this.reports.filter(r => r.success).length,
      failed: this.reports.filter(r => !r.success).length,
      slow: this.reports.filter(r => r.duration > this.threshold).length,
      avgDuration: this.reports.reduce((sum, r) => sum + r.duration, 0) / this.reports.length
    };

    // 按URL分组统计
    const byUrl = {};
    this.reports.forEach(r => {
      if (!byUrl[r.url]) {
        byUrl[r.url] = { count: 0, totalDuration: 0 };
      }
      byUrl[r.url].count++;
      byUrl[r.url].totalDuration += r.duration;
    });

    stats.byUrl = Object.entries(byUrl).map(([url, data]) => ({
      url,
      count: data.count,
      avgDuration: data.totalDuration / data.count
    }));

    return stats;
  }
}

// 使用
const monitor = new RequestMonitor({
  threshold: 1000,
  onSlowRequest: (data) => {
    // 发送告警
  }
});
```

---

## 如何实现网页加载进度条？

### 方案一：基于资源加载的进度条

```javascript
// loading-bar.js
class LoadingBar {
  constructor() {
    this.progress = 0;
    this.element = this.createElement();
    this.init();
  }

  createElement() {
    const bar = document.createElement('div');
    bar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, #1890ff, #52c41a);
      width: 0%;
      transition: width 0.3s ease;
      z-index: 9999;
    `;
    document.body.appendChild(bar);
    return bar;
  }

  init() {
    // 监听资源加载
    let loadedResources = 0;
    const totalResources = performance.getEntriesByType('resource').length;

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'resource') {
          loadedResources++;
          this.update((loadedResources / totalResources) * 100);
        }
      }

      if (loadedResources >= totalResources) {
        this.complete();
      }
    });

    observer.observe({ entryTypes: ['resource'] });

    // 超时强制完成
    setTimeout(() => this.complete(), 10000);
  }

  update(value) {
    this.progress = Math.min(value, 90); // 最多到90%，等load完成
    this.element.style.width = `${this.progress}%`;
  }

  complete() {
    this.progress = 100;
    this.element.style.width = '100%';
    setTimeout(() => {
      this.element.style.opacity = '0';
      setTimeout(() => this.element.remove(), 300);
    }, 200);
  }
}

// 使用
new LoadingBar();
```

### 方案二：NProgress（库）

```javascript
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 配置
NProgress.configure({
  showSpinner: false,      // 不显示旋转图标
  trickleSpeed: 200,      // 自动递增速度
  minimum: 0.1            // 最小百分比
});

// 路由切换开始
router.beforeEach(() => {
  NProgress.start();
});

// 路由切换完成
router.afterEach(() => {
  NProgress.done();
});
```

---

## 扫码登录实现方式

### 流程图

```
┌─────────┐     打开登录页     ┌─────────┐
│  浏览器  │ ────────────────> │  服务端  │
│ (PC端)  │ <──────────────── │         │
└────┬────┘   返回二维码(含UUID) └─────────┘
     │
     │ 展示二维码
     │
     │ 扫码
┌────┴────┐                    ┌─────────┐
│  手机App │ ─── 发送UUID+Token ───> │  服务端  │
│         │ <──── 确认登录 ───── │         │
└─────────┘                    └────┬────┘
                                    │
                              推送登录状态
                                    │
                              ┌────┴────┐
                              │  PC浏览器 │
                              │ (轮询/WS) │
                              └─────────┘
```

### 核心实现

```javascript
// server.js - 服务端
const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');

class QRCodeLogin {
  constructor() {
    this.pendingLogins = new Map(); // UUID -> { status, ws, userInfo }
    this.wss = new WebSocket.Server({ port: 8080 });
    this.init();
  }

  init() {
    this.wss.on('connection', (ws, req) => {
      const url = new URL(req.url, 'http://localhost');
      const uuid = url.searchParams.get('uuid');

      if (uuid && this.pendingLogins.has(uuid)) {
        const loginInfo = this.pendingLogins.get(uuid);
        loginInfo.ws = ws;

        // 通知客户端连接成功
        ws.send(JSON.stringify({ type: 'connected' }));
      }
    });
  }

  // 生成二维码
  generateQRCode() {
    const uuid = uuidv4();
    this.pendingLogins.set(uuid, {
      status: 'pending', // pending, scanned, confirmed
      ws: null,
      userInfo: null
    });

    // 二维码内容
    const qrContent = JSON.stringify({
      type: 'login',
      uuid,
      timestamp: Date.now()
    });

    // 10分钟后过期
    setTimeout(() => {
      this.pendingLogins.delete(uuid);
    }, 600000);

    return { uuid, qrContent };
  }

  // App扫码
  async scanQRCode(uuid, token) {
    const loginInfo = this.pendingLogins.get(uuid);
    if (!loginInfo) {
      throw new Error('QR Code expired');
    }

    // 验证token，获取用户信息
    const userInfo = await this.verifyToken(token);

    loginInfo.status = 'scanned';
    loginInfo.userInfo = userInfo;

    // 通知PC端已扫码
    if (loginInfo.ws) {
      loginInfo.ws.send(JSON.stringify({
        type: 'scanned',
        userInfo: { name: userInfo.name, avatar: userInfo.avatar }
      }));
    }

    return { success: true };
  }

  // App确认登录
  async confirmLogin(uuid) {
    const loginInfo = this.pendingLogins.get(uuid);
    if (!loginInfo || loginInfo.status !== 'scanned') {
      throw new Error('Invalid state');
    }

    loginInfo.status = 'confirmed';

    // 生成登录凭证
    const sessionToken = this.generateSession(loginInfo.userInfo);

    // 通知PC端登录成功
    if (loginInfo.ws) {
      loginInfo.ws.send(JSON.stringify({
        type: 'confirmed',
        token: sessionToken
      }));
    }

    return { success: true };
  }

  // 轮询查询状态（降级方案）
  async pollStatus(uuid) {
    const loginInfo = this.pendingLogins.get(uuid);
    if (!loginInfo) {
      return { status: 'expired' };
    }

    return {
      status: loginInfo.status,
      userInfo: loginInfo.userInfo
    };
  }
}
```

```javascript
// 前端 - PC端
class QRLogin {
  constructor() {
    this.uuid = null;
    this.ws = null;
  }

  async init() {
    // 获取二维码
    const { uuid, qrUrl } = await fetch('/api/qrcode/generate')
      .then(r => r.json());

    this.uuid = uuid;

    // 展示二维码
    this.showQRCode(qrUrl);

    // 建立WebSocket连接
    this.connectWebSocket(uuid);
  }

  connectWebSocket(uuid) {
    this.ws = new WebSocket(`wss://api.example.com/ws?uuid=${uuid}`);

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case 'scanned':
          // 显示已扫码，等待确认
          this.showScannedState(data.userInfo);
          break;
        case 'confirmed':
          // 登录成功
          this.handleLoginSuccess(data.token);
          break;
        case 'expired':
          // 二维码过期
          this.showExpiredState();
          break;
      }
    };

    // 降级：轮询
    this.ws.onerror = () => {
      this.startPolling(uuid);
    };
  }

  startPolling(uuid) {
    const poll = async () => {
      const status = await fetch(`/api/qrcode/status/${uuid}`)
        .then(r => r.json());

      if (status.status === 'confirmed') {
        this.handleLoginSuccess(status.token);
      } else if (status.status !== 'expired') {
        setTimeout(poll, 2000);
      }
    };

    poll();
  }
}
```

---

## cookie组成部分有哪些？

### Cookie结构

```
Set-Cookie: name=value; Domain=example.com; Path=/; Expires=Wed, 21 Oct 2025 07:28:00 GMT; Max-Age=86400; Secure; HttpOnly; SameSite=Strict
```

### 各属性详解

```javascript
// 1. Name-Value（键值对）
document.cookie = "username=John Doe";

// 2. Domain（域）
// 指定cookie所属的域
document.cookie = "session=abc123; domain=.example.com";
// .example.com 表示 example.com 及其子域都可访问

// 3. Path（路径）
// 指定cookie可用的路径
document.cookie = "pref=dark; path=/app";
// /app 及其子路径可访问

// 4. Expires/Max-Age（过期时间）
// Expires: 具体过期日期（GMT格式）
document.cookie = "data=value; expires=Wed, 21 Oct 2025 07:28:00 GMT";

// Max-Age: 多少秒后过期（秒）
document.cookie = "temp=value; max-age=3600"; // 1小时

// 不设置则浏览器关闭时删除（会话cookie）

// 5. Secure（安全标志）
// 只在HTTPS连接时发送
document.cookie = "token=secret; secure";

// 6. HttpOnly（仅HTTP）
// JavaScript无法访问，防止XSS攻击
// 只能在服务端设置
// Set-Cookie: session=xyz; HttpOnly

// 7. SameSite（同站策略）
// Strict: 仅同站请求时发送
// Lax: 导航到目标地址时发送（默认）
// None: 所有请求都发送（必须配合Secure）
document.cookie = "id=123; SameSite=Strict";
document.cookie = "track=456; SameSite=None; Secure";
```

### JavaScript操作Cookie

```javascript
// 设置Cookie
function setCookie(name, value, options = {}) {
  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (options.expires) {
    cookie += `; expires=${options.expires.toUTCString()}`;
  }

  if (options.maxAge) {
    cookie += `; max-age=${options.maxAge}`;
  }

  if (options.domain) {
    cookie += `; domain=${options.domain}`;
  }

  if (options.path) {
    cookie += `; path=${options.path}`;
  }

  if (options.secure) {
    cookie += '; secure';
  }

  if (options.sameSite) {
    cookie += `; samesite=${options.sameSite}`;
  }

  document.cookie = cookie;
}

// 获取Cookie
function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${encodeURIComponent(name).replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`)
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// 删除Cookie
function deleteCookie(name) {
  setCookie(name, '', { maxAge: -1 });
}
```

---

## DNS协议了解多少？

### DNS基本概念

DNS（Domain Name System，域名系统）是将域名解析为IP地址的分布式系统。

### DNS查询类型

```
1. 递归查询（Recursive Query）
   客户端 -> 本地DNS服务器: 查询 example.com
   本地DNS服务器负责查询并返回最终结果

2. 迭代查询（Iterative Query）
   本地DNS服务器 -> 根DNS: 查询 example.com
   根DNS返回.com顶级域名服务器地址
   本地DNS服务器 -> .com服务器: 查询 example.com
   .com服务器返回example.com的权威DNS地址
   本地DNS服务器 -> 权威DNS: 查询 example.com
   权威DNS返回最终IP地址
```

### DNS记录类型

| 记录类型 | 用途 | 示例 |
|----------|------|------|
| A | IPv4地址 | example.com. IN A 93.184.216.34 |
| AAAA | IPv6地址 | example.com. IN AAAA 2606:2800:220:1:: |
| CNAME | 别名 | www.example.com. IN CNAME example.com. |
| MX | 邮件服务器 | example.com. IN MX 10 mail.example.com. |
| TXT | 文本记录 | 用于SPF、DKIM验证 |
| NS | 域名服务器 | example.com. IN NS ns1.example.com. |
| SOA | 起始授权记录 | 包含区域管理信息 |

### DNS解析过程

```javascript
// 浏览器DNS缓存检查
// ↓
// 操作系统DNS缓存检查
// ↓
// 本地hosts文件检查
// ↓
// 向配置的DNS服务器发起查询
// ↓
// DNS服务器返回结果
// ↓
// 缓存并建立连接

// 使用DNS Prefetch优化
// HTML头部添加
// <link rel="dns-prefetch" href="//api.example.com">

// 预解析
// <link rel="preconnect" href="https://api.example.com">
```

### DNS优化

```javascript
// 1. DNS预解析
// index.html
<link rel="dns-prefetch" href="//cdn.example.com">
<link rel="dns-prefetch" href="//api.example.com">

// 2. TCP预连接
<link rel="preconnect" href="https://cdn.example.com" crossorigin>

// 3. 减少DNS查询
// 合并资源到同一域名

// 4. 使用CDN
// 就近解析，减少延迟

// 5. DNS负载均衡
// 一个域名对应多个IP
// example.com. IN A 1.1.1.1
// example.com. IN A 1.1.1.2
// example.com. IN A 1.1.1.3
```

### DNS-over-HTTPS (DoH)

```javascript
// 使用HTTPS加密DNS查询，防止劫持
// Chrome/Firefox已支持

// 配置DoH
// 使用Cloudflare DNS
const dohUrl = 'https://cloudflare-dns.com/dns-query';

// 查询示例
fetch(`${dohUrl}?name=example.com&type=A`, {
  headers: {
    'Accept': 'application/dns-json'
  }
})
.then(r => r.json())
.then(data => {
  console.log(data.Answer);
});
```

---

## Webpack 手写实现系列

### 手写 Webpack Loader

#### Loader 原理

Loader 是一个函数，接收源文件内容，返回转换后的内容。

```javascript
// 基本 Loader 结构
module.exports = function(source) {
  // source: 文件内容（字符串或 Buffer）

  // 1. 处理 source
  const result = process(source);

  // 2. 返回处理结果
  return result;
};
```

#### 实现 markdown-loader

```javascript
// markdown-loader.js
const marked = require('marked');

module.exports = function(source) {
  // 获取 Loader 选项
  const options = this.getOptions ? this.getOptions() : {};

  // 异步处理
  const callback = this.async();

  // 使用 marked 转换 markdown
  marked.parse(source, options, (err, html) => {
    if (err) {
      callback(err);
      return;
    }

    // 返回 HTML 字符串作为 JS 模块导出
    const code = `module.exports = ${JSON.stringify(html)}`;
    callback(null, code);
  });
};

// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: './markdown-loader.js',
            options: {
              gfm: true,
              breaks: true
            }
          }
        ]
      }
    ]
  }
};
```

#### 实现 style-loader（简化版）

```javascript
// style-loader.js
module.exports = function(content) {
  // content 是 css-loader 处理后的 JS 字符串

  const code = `
    // 创建 style 标签
    var style = document.createElement('style');
    style.type = 'text/css';

    // 设置 CSS 内容
    var css = ${content};
    style.innerHTML = css;

    // 插入到 head
    document.head.appendChild(style);

    // 热更新支持
    if (module.hot) {
      module.hot.accept();
    }
  `;

  return code;
};
```

#### 实现 babel-loader（简化版）

```javascript
// babel-loader.js
const babel = require('@babel/core');

module.exports = function(source) {
  const options = this.getOptions ? this.getOptions() : {};
  const callback = this.async();

  // 使用 babel 转换代码
  babel.transform(source, {
    filename: this.resourcePath,
    presets: options.presets || ['@babel/preset-env'],
    plugins: options.plugins || [],
    sourceMaps: this.sourceMap
  }, (err, result) => {
    if (err) {
      callback(err);
      return;
    }

    callback(null, result.code, result.map);
  });
};
```

#### Loader 的 pitch 阶段

```javascript
// pitch-loader.js
module.exports.pitch = function(remainingRequest, precedingRequest, data) {
  // pitch 阶段在 Loader 执行前调用
  // remainingRequest: 剩余待处理的 Loader 路径
  // precedingRequest: 之前已经执行的 Loader 路径

  console.log('pitch phase');

  // 返回非 undefined 会短路，跳过后续 Loader
  // return `module.exports = require(${JSON.stringify(remainingRequest)})`;
};

module.exports = function(source) {
  console.log('normal phase');
  return source;
};
```

---

### 手写 Webpack Plugin

#### Plugin 原理

Plugin 是一个类，通过 `apply` 方法访问 Webpack 的编译器对象，注册钩子函数。

```javascript
class MyPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    // 注册钩子
    compiler.hooks.someHook.tap('MyPlugin', (params) => {
      // 执行逻辑
    });
  }
}

module.exports = MyPlugin;
```

#### 实现 FileListPlugin（生成资源清单）

```javascript
// file-list-plugin.js
class FileListPlugin {
  constructor(options = {}) {
    this.filename = options.filename || 'file-list.md';
  }

  apply(compiler) {
    // 在输出 asset 之前执行
    compiler.hooks.emit.tapAsync('FileListPlugin', (compilation, callback) => {
      // 获取所有资源文件
      const files = Object.keys(compilation.assets);

      // 生成 Markdown 内容
      let content = `# 构建文件清单\n\n`;
      content += `生成时间: ${new Date().toLocaleString()}\n\n`;
      content += `| 文件名 | 大小 |\n`;
      content += `|--------|------|\n`;

      files.forEach(filename => {
        const asset = compilation.assets[filename];
        const size = (asset.size() / 1024).toFixed(2);
        content += `| ${filename} | ${size} KB |\n`;
      });

      // 添加新资源到输出
      compilation.assets[this.filename] = {
        source() {
          return content;
        },
        size() {
          return content.length;
        }
      };

      callback();
    });
  }
}

module.exports = FileListPlugin;

// webpack.config.js
const FileListPlugin = require('./file-list-plugin');

module.exports = {
  plugins: [
    new FileListPlugin({
      filename: 'build-info.md'
    })
  ]
};
```

#### 实现 HtmlWebpackPlugin（简化版）

```javascript
// simple-html-plugin.js
class SimpleHtmlPlugin {
  constructor(options = {}) {
    this.template = options.template || './src/index.html';
    this.filename = options.filename || 'index.html';
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('SimpleHtmlPlugin', (compilation, callback) => {
      // 读取模板
      const fs = require('fs');
      const path = require('path');

      let html = fs.readFileSync(this.template, 'utf-8');

      // 获取所有 JS 和 CSS 文件
      const jsFiles = [];
      const cssFiles = [];

      Object.keys(compilation.assets).forEach(filename => {
        if (filename.endsWith('.js')) {
          jsFiles.push(filename);
        } else if (filename.endsWith('.css')) {
          cssFiles.push(filename);
        }
      });

      // 生成标签
      const cssTags = cssFiles
        .map(file => `<link rel="stylesheet" href="${file}">`)
        .join('\n');

      const jsTags = jsFiles
        .map(file => `<script src="${file}"></script>`)
        .join('\n');

      // 替换模板中的占位符
      html = html
        .replace('</head>', `${cssTags}\n</head>`)
        .replace('</body>', `${jsTags}\n</body>`);

      // 添加到输出
      compilation.assets[this.filename] = {
        source() {
          return html;
        },
        size() {
          return html.length;
        }
      };

      callback();
    });
  }
}

module.exports = SimpleHtmlPlugin;
```

#### 实现 CleanWebpackPlugin（简化版）

```javascript
// clean-plugin.js
const fs = require('fs');
const path = require('path');

class CleanPlugin {
  constructor(options = {}) {
    this.dryRun = options.dryRun || false;
  }

  apply(compiler) {
    const outputPath = compiler.options.output.path;

    // 在编译前清理
    compiler.hooks.beforeRun.tap('CleanPlugin', () => {
      this.clean(outputPath);
    });

    compiler.hooks.watchRun.tap('CleanPlugin', () => {
      this.clean(outputPath);
    });
  }

  clean(dirPath) {
    if (!fs.existsSync(dirPath)) {
      return;
    }

    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
      const fullPath = path.join(dirPath, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        this.clean(fullPath);
        if (!this.dryRun) {
          fs.rmdirSync(fullPath);
        }
      } else {
        if (!this.dryRun) {
          fs.unlinkSync(fullPath);
        }
      }

      console.log(`Cleaned: ${fullPath}`);
    });
  }
}

module.exports = CleanPlugin;
```

#### 常用 Compiler Hooks

| Hook | 触发时机 | 用途 |
|------|----------|------|
| `entryOption` | 入口配置处理后 | 修改入口 |
| `compile` | 开始编译 | 初始化参数 |
| `compilation` | 创建 compilation 后 | 注册 compilation 钩子 |
| `make` | 开始构建 | 添加模块 |
| `emit` | 输出资源前 | 修改/添加资源 |
| `afterEmit` | 输出资源后 | 清理工作 |
| `done` | 编译完成 | 统计/通知 |

---

### Webpack 热更新（HMR）原理

#### HMR 工作流程

```
┌─────────────┐     1. 修改代码      ┌─────────────┐
│   开发者     │ ─────────────────▶ │   Webpack   │
│             │                     │   DevServer │
└─────────────┘                     └──────┬──────┘
                                           │
                                           │ 2. 编译
                                           ▼
                                    ┌─────────────┐
                                    │  生成 chunk  │
                                    │  和更新清单  │
                                    └──────┬──────┘
                                           │
                     3. 推送更新通知        │
┌─────────────┐ ◀─────────────────────────┘
│   浏览器     │
│  HMR Runtime│
└──────┬──────┘
       │
       │ 4. 下载更新（JSONP）
       ▼
┌─────────────┐
│  获取更新模块  │
│  hot-update.js │
└──────┬──────┘
       │
       │ 5. 替换模块
       ▼
┌─────────────┐
│  执行 accept  │
│   回调函数    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   局部更新   │
│  （不刷新）  │
└─────────────┘
```

#### HMR 核心实现

```javascript
// HMR Runtime 简化版

class HMRRuntime {
  constructor() {
    this.currentHash = __webpack_hash__;
    this.updating = false;
  }

  // 检查更新
  check() {
    return fetch(`${__webpack_public_path__}${this.currentHash}.hot-update.json`)
      .then(res => res.json())
      .then(update => {
        if (!update) return false;

        // 下载更新
        return this.applyUpdate(update);
      });
  }

  // 应用更新
  applyUpdate(update) {
    const { c: chunks, m: modules } = update;

    // 1. 加载更新 chunk
    return Promise.all(
      chunks.map(chunk => this.loadChunk(chunk))
    ).then(() => {
      // 2. 更新模块
      Object.keys(modules).forEach(moduleId => {
        const newModuleFactory = modules[moduleId];

        // 销毁旧模块
        const oldModule = __webpack_require__.c[moduleId];
        if (oldModule && oldModule.hot) {
          oldModule.hot.dispose();
        }

        // 注册新模块
        __webpack_modules__[moduleId] = newModuleFactory;
      });

      // 3. 执行 accept 回调
      Object.keys(modules).forEach(moduleId => {
        const module = __webpack_require__.c[moduleId];
        if (module && module.hot && module.hot._acceptedDependencies) {
          module.hot._acceptedDependencies.forEach(callback => {
            callback();
          });
        }
      });
    });
  }

  // 加载 chunk
  loadChunk(chunkId) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `${chunkId}.${this.currentHash}.hot-update.js`;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
}

// Webpack 注入的模块热替换 API
module.hot = {
  // 接受自身更新
  accept(dependencies, callback) {
    if (typeof dependencies === 'function') {
      callback = dependencies;
      dependencies = [];
    }

    this._selfAccepted = true;
    this._acceptCallback = callback;
  },

  // 接受子模块更新
  acceptDependencies(deps, callback) {
    this._acceptedDependencies = deps.map(dep => ({
      dep,
      callback
    }));
  },

  // 模块卸载前的清理
  dispose(callback) {
    this._disposeHandlers.push(callback);
  },

  // decline 拒绝更新
  decline() {
    this._selfDeclined = true;
  }
};
```

#### HMR Server 端实现

```javascript
// webpack-dev-server 的 HMR 服务器部分

const webpack = require('webpack');
const DevServer = require('webpack-dev-server');

const compiler = webpack(config);

// HMR 插件
compiler.hooks.compilation.tap('HotModuleReplacementPlugin', (compilation) => {
  // 生成热更新 manifest
  compilation.hooks.additionalChunkRuntimeRequirements.tap(
    'HotModuleReplacementPlugin',
    (chunk, set) => {
      set.add(webpack.RuntimeGlobals.module);
      set.add(webpack.RuntimeGlobals.require);
      compilation.addRuntimeModule(
        chunk,
        new webpack.runtime.HotModuleReplacementRuntimeModule()
      );
    }
  );
});

// 编译完成后发送更新
compiler.hooks.done.tap('webpack-dev-server', (stats) => {
  if (stats.hasErrors()) return;

  const updatedModules = stats.compilation.modules
    .filter(m => m.hotUpdate)
    .map(m => m.id);

  // 通过 WebSocket 通知客户端
  sendToClients({
    type: 'hash',
    data: stats.hash
  });

  sendToClients({
    type: 'ok'
  });
});
```

---

### Webpack 代码分割原理

#### 代码分割方式

```javascript
// 1. 入口分割
module.exports = {
  entry: {
    main: './src/index.js',
    vendor: './src/vendor.js'  // 单独打包
  }
};

// 2. 动态导入（ECMAScript Proposal）
import('./module.js').then(module => {
  module.default();
});

// 3. SplitChunksPlugin
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};
```

#### 动态导入实现原理

```javascript
// 源码
import('./module.js').then(module => {
  module.default();
});

// Webpack 转换后
__webpack_require__.e(/* import() | module */ 1)
  .then(__webpack_require__.t.bind(null, 2, 7))
  .then(module => {
    module.default();
  });

// __webpack_require__.e - 确保 chunk 加载
__webpack_require__.e = function(chunkId) {
  var promises = [];

  // 检查 chunk 是否已加载
  if (installedChunks[chunkId] === 0) {
    return Promise.resolve();
  }

  // 如果 chunk 正在加载，返回现有 promise
  if (installedChunks[chunkId]) {
    return installedChunks[chunkId][2];
  }

  // 创建新的加载 promise
  var promise = new Promise(function(resolve, reject) {
    installedChunks[chunkId] = [resolve, reject];
  });
  installedChunks[chunkId][2] = promise;

  // 创建 script 标签加载 chunk
  var script = document.createElement('script');
  script.src = __webpack_require__.p + '' + chunkId + '.bundle.js';
  document.head.appendChild(script);

  return promise;
};

// chunk 文件内容（加载完成后执行）
(self["webpackChunk"] = self["webpackChunk"] || [])
  .push([[1], {
    2: function(module, exports, __webpack_require__) {
      // 模块代码
    }
  }]);
```

#### SplitChunksPlugin 原理

```javascript
// SplitChunksPlugin 核心逻辑

class SplitChunksPlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap('SplitChunksPlugin', (compilation) => {
      compilation.hooks.optimizeChunks.tap('SplitChunksPlugin', (chunks) => {
        // 1. 收集所有模块
        const allModules = [];
        chunks.forEach(chunk => {
          chunk.getModules().forEach(module => {
            allModules.push({ module, chunk });
          });
        });

        // 2. 按 cacheGroups 分组
        const cacheGroups = this.options.cacheGroups;
        const selectedChunks = new Map();

        Object.keys(cacheGroups).forEach(groupName => {
          const group = cacheGroups[groupName];
          const matchedModules = allModules.filter(({ module }) =>
            group.test.test(module.resource)
          );

          if (matchedModules.length > 0) {
            // 创建新的 chunk
            const newChunk = compilation.addChunk(groupName);

            // 移动模块到新 chunk
            matchedModules.forEach(({ module, chunk }) => {
              chunk.moveModule(module, newChunk);
            });

            selectedChunks.set(groupName, newChunk);
          }
        });

        // 3. 优化 chunk 大小
        this.optimizeChunkSize(selectedChunks);
      });
    });
  }

  optimizeChunkSize(chunks) {
    // 检查 minSize 和 maxSize
    // 拆分过大的 chunk
    // 合并过小的 chunk
  }
}
```

---

### 手写 SPA 前端路由

#### Hash 路由实现

```javascript
// HashRouter.js
class HashRouter {
  constructor() {
    this.routes = new Map();
    this.currentPath = '';
    this.beforeHooks = [];
    this.afterHooks = [];

    // 监听 hash 变化
    window.addEventListener('hashchange', () => {
      this.handleChange();
    });

    // 监听页面加载
    window.addEventListener('load', () => {
      this.handleChange();
    });
  }

  // 注册路由
  register(path, handler) {
    this.routes.set(path, handler);
    return this;
  }

  // 导航
  push(path) {
    window.location.hash = path;
  }

  replace(path) {
    window.location.replace(`#${path}`);
  }

  // 后退
  back() {
    window.history.back();
  }

  // 全局前置守卫
  beforeEach(hook) {
    this.beforeHooks.push(hook);
  }

  // 全局后置钩子
  afterEach(hook) {
    this.afterHooks.push(hook);
  }

  // 处理路由变化
  async handleChange() {
    const path = this.getPath();
    const from = this.currentPath;
    const to = path;

    // 执行前置守卫
    for (const hook of this.beforeHooks) {
      const result = await hook(to, from);
      if (result === false) return; // 阻止导航
      if (typeof result === 'string') {
        this.push(result);
        return;
      }
    }

    // 更新当前路径
    this.currentPath = path;

    // 执行路由处理器
    const handler = this.routes.get(path);
    if (handler) {
      handler({ path, params: this.getParams() });
    } else {
      // 404 处理
      const notFoundHandler = this.routes.get('*');
      if (notFoundHandler) {
        notFoundHandler({ path });
      }
    }

    // 执行后置钩子
    this.afterHooks.forEach(hook => hook(to, from));
  }

  // 获取当前路径
  getPath() {
    const hash = window.location.hash;
    return hash ? hash.slice(1) : '/';
  }

  // 解析参数
  getParams() {
    const hash = window.location.hash;
    const queryIndex = hash.indexOf('?');

    if (queryIndex === -1) return {};

    const query = hash.slice(queryIndex + 1);
    const params = {};

    query.split('&').forEach(pair => {
      const [key, value] = pair.split('=');
      params[decodeURIComponent(key)] = decodeURIComponent(value);
    });

    return params;
  }
}

// 使用示例
const router = new HashRouter();

router
  .register('/', () => {
    document.getElementById('app').innerHTML = '<h1>Home</h1>';
  })
  .register('/about', () => {
    document.getElementById('app').innerHTML = '<h1>About</h1>';
  })
  .register('/user/:id', ({ params }) => {
    document.getElementById('app').innerHTML = `<h1>User ${params.id}</h1>`;
  })
  .register('*', () => {
    document.getElementById('app').innerHTML = '<h1>404</h1>';
  });

// 导航链接
// <a href="#/">Home</a>
// <a href="#/about">About</a>
// <button onclick="router.push('/user/123')">User 123</button>
```

#### History 路由实现

```javascript
// HistoryRouter.js
class HistoryRouter {
  constructor() {
    this.routes = new Map();
    this.currentPath = '';
    this.beforeHooks = [];
    this.afterHooks = [];

    // 监听浏览器前进后退
    window.addEventListener('popstate', (event) => {
      this.handleChange();
    });

    // 拦截 a 标签点击
    document.addEventListener('click', (e) => {
      if (e.target.matches('a[data-router]')) {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        this.push(href);
      }
    });
  }

  register(path, handler) {
    this.routes.set(path, handler);
    return this;
  }

  push(path) {
    window.history.pushState({}, '', path);
    this.handleChange();
  }

  replace(path) {
    window.history.replaceState({}, '', path);
    this.handleChange();
  }

  back() {
    window.history.back();
  }

  beforeEach(hook) {
    this.beforeHooks.push(hook);
  }

  afterEach(hook) {
    this.afterHooks.push(hook);
  }

  async handleChange() {
    const path = window.location.pathname;
    const from = this.currentPath;
    const to = path;

    // 前置守卫
    for (const hook of this.beforeHooks) {
      const result = await hook(to, from);
      if (result === false) {
        // 阻止导航，回退历史
        window.history.pushState({}, '', from);
        return;
      }
    }

    this.currentPath = path;

    // 匹配路由（支持动态参数）
    const { handler, params } = this.matchRoute(path);

    if (handler) {
      handler({ path, params });
    } else {
      const notFound = this.routes.get('*');
      if (notFound) notFound({ path });
    }

    this.afterHooks.forEach(hook => hook(to, from));
  }

  matchRoute(path) {
    for (const [routePath, handler] of this.routes) {
      if (routePath === '*') continue;

      const match = this.matchPath(path, routePath);
      if (match) {
        return { handler, params: match.params };
      }
    }

    return { handler: null, params: {} };
  }

  // 路径匹配（支持 /user/:id）
  matchPath(path, routePath) {
    const pathParts = path.split('/').filter(Boolean);
    const routeParts = routePath.split('/').filter(Boolean);

    if (pathParts.length !== routeParts.length) {
      return null;
    }

    const params = {};

    for (let i = 0; i < routeParts.length; i++) {
      const routePart = routeParts[i];
      const pathPart = pathParts[i];

      if (routePart.startsWith(':')) {
        params[routePart.slice(1)] = pathPart;
      } else if (routePart !== pathPart) {
        return null;
      }
    }

    return { params };
  }
}

// 使用示例
const router = new HistoryRouter();

router
  .register('/', () => {
    render('<h1>Home</h1>');
  })
  .register('/about', () => {
    render('<h1>About</h1>');
  })
  .register('/user/:id', ({ params }) => {
    render(`<h1>User ${params.id}</h1>`);
  });

// 带守卫的路由
router.beforeEach((to, from) => {
  if (to.startsWith('/admin') && !isAuthenticated()) {
    return '/login'; // 重定向到登录页
  }
});
```

#### 路由视图组件（Vue 风格）

```javascript
// RouterView.js
class RouterView extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    window.addEventListener('route-change', () => this.render());
  }

  render() {
    const path = window.location.pathname;
    const route = router.resolve(path);

    if (route && route.component) {
      this.shadowRoot.innerHTML = route.component;
    } else {
      this.shadowRoot.innerHTML = '<h1>404 Not Found</h1>';
    }
  }
}

customElements.define('router-view', RouterView);

// HTML 中使用
// <router-view></router-view>
```

#### 完整路由配置示例

```javascript
// router.config.js
const router = new HistoryRouter();

// 路由表
const routes = [
  {
    path: '/',
    component: '<home-page></home-page>',
    meta: { title: '首页' }
  },
  {
    path: '/about',
    component: '<about-page></about-page>',
    meta: { title: '关于我们' }
  },
  {
    path: '/user/:id',
    component: (params) => `<user-page id="${params.id}"></user-page>`,
    beforeEnter: (to, from) => {
      // 路由独享守卫
      console.log('进入用户页面');
    }
  },
  {
    path: '/admin',
    component: '<admin-page></admin-page>',
    meta: { requiresAuth: true }
  }
];

// 注册路由
routes.forEach(route => {
  router.register(route.path, ({ path, params }) => {
    // 更新页面标题
    document.title = route.meta?.title || 'My App';

    // 渲染组件
    const content = typeof route.component === 'function'
      ? route.component(params)
      : route.component;

    document.getElementById('app').innerHTML = content;
  });
});

// 全局守卫
router.beforeEach((to, from) => {
  const route = routes.find(r => r.path === to);

  if (route?.meta?.requiresAuth && !isAuthenticated()) {
    return '/login';
  }
});

// 导出供其他模块使用
window.router = router;
```

---

### 状态设计模式

#### 什么是状态模式

状态模式（State Pattern）允许对象在内部状态改变时改变它的行为，对象看起来好像修改了它的类。

```
┌─────────────┐         ┌─────────────┐
│   Context   │────────▶│    State    │◀─────┐
│  (状态机)    │         │   (状态接口)  │      │
└─────────────┘         └─────────────┘      │
                               ▲             │
                               │             │
        ┌──────────────────────┼─────────────┘
        │                      │
   ┌────┴────┐            ┌────┴────┐
│ StateA  │            │ StateB  │
│(状态A)  │            │(状态B)  │
└─────────┘            └─────────┘
```

#### 基础状态机实现

```javascript
// 状态机基类
class StateMachine {
  constructor(initialState) {
    this.state = initialState;
    this.transitions = {};
  }

  // 定义状态转换
  addTransition(fromState, event, toState, action) {
    if (!this.transitions[fromState]) {
      this.transitions[fromState] = {};
    }
    this.transitions[fromState][event] = { toState, action };
  }

  // 触发事件
  dispatch(event, payload) {
    const currentTransitions = this.transitions[this.state];
    if (!currentTransitions || !currentTransitions[event]) {
      console.warn(`No transition for event "${event}" from state "${this.state}"`);
      return false;
    }

    const { toState, action } = currentTransitions[event];

    // 执行动作
    if (action) {
      action(payload, this.state, toState);
    }

    // 状态转换
    const prevState = this.state;
    this.state = toState;

    // 触发状态变更回调
    if (this.onStateChange) {
      this.onStateChange(toState, prevState, payload);
    }

    return true;
  }

  // 获取当前状态
  getState() {
    return this.state;
  }

  // 检查是否可以触发事件
  can(event) {
    const currentTransitions = this.transitions[this.state];
    return currentTransitions && !!currentTransitions[event];
  }
}

// 使用示例：订单状态机
const orderMachine = new StateMachine('pending');

// 定义状态转换
orderMachine.addTransition('pending', 'pay', 'paid', (payload, from, to) => {
  console.log(`订单支付: ${payload.orderId}`);
});

orderMachine.addTransition('paid', 'ship', 'shipped', (payload, from, to) => {
  console.log(`订单发货: ${payload.trackingNumber}`);
});

orderMachine.addTransition('shipped', 'receive', 'completed', (payload, from, to) => {
  console.log('订单已完成');
});

orderMachine.addTransition('pending', 'cancel', 'cancelled', (payload, from, to) => {
  console.log('订单已取消');
});

orderMachine.addTransition('paid', 'refund', 'refunded', (payload, from, to) => {
  console.log('订单已退款');
});

// 状态变更监听
orderMachine.onStateChange = (newState, oldState, payload) => {
  console.log(`状态变更: ${oldState} -> ${newState}`);
};

// 使用
console.log(orderMachine.getState()); // 'pending'

orderMachine.dispatch('pay', { orderId: '123' });     // pending -> paid
orderMachine.dispatch('ship', { trackingNumber: 'TN456' }); // paid -> shipped
orderMachine.dispatch('receive');                      // shipped -> completed

console.log(orderMachine.getState()); // 'completed'
```

#### Promise 状态机实现

```javascript
// Promise 状态机
class PromiseStateMachine {
  constructor(executor) {
    this.state = 'pending'; // pending | fulfilled | rejected
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach(fn => fn(value));
      }
    };

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn(reason));
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    return new PromiseStateMachine((resolve, reject) => {
      if (this.state === 'fulfilled') {
        try {
          const result = onFulfilled ? onFulfilled(this.value) : this.value;
          resolve(result);
        } catch (error) {
          reject(error);
        }
      } else if (this.state === 'rejected') {
        try {
          const result = onRejected ? onRejected(this.reason) : this.reason;
          resolve(result);
        } catch (error) {
          reject(error);
        }
      } else {
        // pending
        this.onFulfilledCallbacks.push((value) => {
          try {
            const result = onFulfilled ? onFulfilled(value) : value;
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });

        this.onRejectedCallbacks.push((reason) => {
          try {
            const result = onRejected ? onRejected(reason) : reason;
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      }
    });
  }
}
```

#### 复杂状态管理（Redux 风格）

```javascript
// Store 实现
class Store {
  constructor(reducer, initialState = {}) {
    this.reducer = reducer;
    this.state = initialState;
    this.listeners = [];
  }

  getState() {
    return this.state;
  }

  dispatch(action) {
    this.state = this.reducer(this.state, action);
    this.listeners.forEach(listener => listener(this.state));
    return action;
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
}

// Reducer（纯函数）
const initialState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        loading: false
      };

    case 'LOGIN_FAILURE':
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case 'LOGOUT':
      return initialState;

    default:
      return state;
  }
}

// 使用
const store = new Store(authReducer);

store.subscribe((state) => {
  console.log('State changed:', state);
});

// Action Creators
const loginRequest = () => ({ type: 'LOGIN_REQUEST' });
const loginSuccess = (user) => ({ type: 'LOGIN_SUCCESS', payload: user });
const loginFailure = (error) => ({ type: 'LOGIN_FAILURE', payload: error });

// 异步 Action
function login(credentials) {
  return async (dispatch) => {
    dispatch(loginRequest());

    try {
      const user = await api.login(credentials);
      dispatch(loginSuccess(user));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
}

// 使用
store.dispatch(login({ username: 'admin', password: '123456' }));
```

#### 前端表单状态管理

```javascript
// 表单状态机
class FormStateMachine {
  constructor(config) {
    this.fields = {};
    this.errors = {};
    this.state = 'idle'; // idle | validating | submitting | success | error

    // 初始化字段
    config.fields.forEach(field => {
      this.fields[field.name] = {
        value: field.defaultValue || '',
        touched: false,
        valid: true,
        rules: field.rules || []
      };
    });
  }

  // 更新字段值
  setField(name, value) {
    if (!this.fields[name]) return;

    this.fields[name].value = value;
    this.fields[name].touched = true;

    // 实时验证
    this.validateField(name);
  }

  // 验证单个字段
  validateField(name) {
    const field = this.fields[name];
    field.valid = true;
    this.errors[name] = null;

    for (const rule of field.rules) {
      const error = rule(field.value, this.fields);
      if (error) {
        field.valid = false;
        this.errors[name] = error;
        break;
      }
    }

    return field.valid;
  }

  // 验证所有字段
  validateAll() {
    let isValid = true;
    for (const name of Object.keys(this.fields)) {
      if (!this.validateField(name)) {
        isValid = false;
      }
    }
    return isValid;
  }

  // 提交表单
  async submit(submitFn) {
    if (this.state === 'submitting') return;

    this.state = 'validating';

    if (!this.validateAll()) {
      this.state = 'error';
      return { success: false, errors: this.errors };
    }

    this.state = 'submitting';

    try {
      const values = this.getValues();
      const result = await submitFn(values);
      this.state = 'success';
      return { success: true, data: result };
    } catch (error) {
      this.state = 'error';
      return { success: false, error };
    }
  }

  // 获取表单值
  getValues() {
    const values = {};
    for (const [name, field] of Object.entries(this.fields)) {
      values[name] = field.value;
    }
    return values;
  }

  // 重置表单
  reset() {
    for (const field of Object.values(this.fields)) {
      field.value = '';
      field.touched = false;
      field.valid = true;
    }
    this.errors = {};
    this.state = 'idle';
  }
}

// 验证规则
const validators = {
  required: (message) => (value) => {
    return !value ? message || '此字段必填' : null;
  },

  minLength: (min, message) => (value) => {
    return value.length < min ? message || `最少${min}个字符` : null;
  },

  maxLength: (max, message) => (value) => {
    return value.length > max ? message || `最多${max}个字符` : null;
  },

  email: (message) => (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(value) ? message || '邮箱格式不正确' : null;
  },

  pattern: (regex, message) => (value) => {
    return !regex.test(value) ? message || '格式不正确' : null;
  }
};

// 使用示例
const form = new FormStateMachine({
  fields: [
    {
      name: 'username',
      defaultValue: '',
      rules: [
        validators.required('用户名不能为空'),
        validators.minLength(3, '用户名至少3个字符')
      ]
    },
    {
      name: 'email',
      defaultValue: '',
      rules: [
        validators.required('邮箱不能为空'),
        validators.email()
      ]
    },
    {
      name: 'password',
      defaultValue: '',
      rules: [
        validators.required('密码不能为空'),
        validators.minLength(6, '密码至少6个字符')
      ]
    }
  ]
});

// 绑定到 UI
function renderForm() {
  const state = form.state;
  const values = form.getValues();
  const errors = form.errors;

  // 根据状态渲染不同的 UI
  switch (state) {
    case 'idle':
      return renderIdle(values, errors);
    case 'validating':
      return renderValidating(values);
    case 'submitting':
      return renderSubmitting();
    case 'success':
      return renderSuccess();
    case 'error':
      return renderError(values, errors);
  }
}
```

#### 有限状态机（XState 风格）

```javascript
// 更强大的状态机实现
function createMachine(config) {
  const machine = {
    initialState: config.initial,
    context: config.context || {},
    states: config.states,

    transition(currentState, event) {
      const stateConfig = this.states[currentState];

      if (!stateConfig || !stateConfig.on || !stateConfig.on[event.type]) {
        return { state: currentState, context: this.context };
      }

      const transitionConfig = stateConfig.on[event.type];
      const nextState = typeof transitionConfig === 'string'
        ? transitionConfig
        : transitionConfig.target;

      // 执行 actions
      if (transitionConfig.actions) {
        transitionConfig.actions.forEach(action => {
          this.context = action(this.context, event);
        });
      }

      // 执行 entry actions
      const nextStateConfig = this.states[nextState];
      if (nextStateConfig.entry) {
        nextStateConfig.entry.forEach(action => {
          this.context = action(this.context, event);
        });
      }

      return { state: nextState, context: this.context };
    }
  };

  return machine;
}

// 使用：红绿灯状态机
const trafficLightMachine = createMachine({
  initial: 'green',
  context: { count: 0 },
  states: {
    green: {
      entry: [(ctx) => ({ ...ctx, count: ctx.count + 1 })],
      on: {
        TIMER: 'yellow'
      }
    },
    yellow: {
      on: {
        TIMER: 'red'
      }
    },
    red: {
      on: {
        TIMER: {
          target: 'green',
          actions: [(ctx) => console.log(`Cycle ${ctx.count} completed`)]
        }
      }
    }
  }
});

// 使用
let current = { state: trafficLightMachine.initialState, context: trafficLightMachine.context };

current = trafficLightMachine.transition(current.state, { type: 'TIMER' });
console.log(current); // { state: 'yellow', context: { count: 1 } }

current = trafficLightMachine.transition(current.state, { type: 'TIMER' });
console.log(current); // { state: 'red', context: { count: 1 } }

current = trafficLightMachine.transition(current.state, { type: 'TIMER' });
console.log(current); // { state: 'green', context: { count: 1 } }
```

---

### 静态资源加载失败降级处理

#### 资源加载失败场景

Web 应用中静态资源加载失败常见原因：
- CDN 故障或网络抖动
- 资源路径错误
- 资源被删除或移动
- 跨域问题
- 用户网络不稳定

#### 降级策略

**1. 图片加载失败降级**

```html
<!-- HTML 方案：onerror 事件 -->
<img src="https://cdn.example.com/image.png"
     onerror="this.src='/assets/fallback.png'">

<!-- 多级降级 -->
<img id="avatar" src="https://cdn1.example.com/avatar.jpg" alt="头像">

<script>
const img = document.getElementById('avatar');
const cdnList = [
  'https://cdn1.example.com/avatar.jpg',
  'https://cdn2.example.com/avatar.jpg',
  '/assets/default-avatar.jpg'
];
let currentIndex = 0;

img.onerror = function() {
  currentIndex++;
  if (currentIndex < cdnList.length) {
    this.src = cdnList[currentIndex];
  }
};
</script>
```

```javascript
// React 组件方案
function ImageWithFallback({ src, fallback, alt, ...props }) {
  const [imgSrc, setImgSrc] = useState(src);
  const [error, setError] = useState(false);

  const handleError = () => {
    if (!error) {
      setImgSrc(fallback);
      setError(true);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      {...props}
    />
  );
}

// 使用
<ImageWithFallback
  src="https://cdn.example.com/product.png"
  fallback="/assets/product-placeholder.png"
  alt="商品图片"
/>
```

**2. CSS 资源加载失败处理**

```javascript
// 检测 CSS 加载失败
function loadCSSWithFallback(url, fallbackUrl) {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;

    // 加载成功
    link.onload = () => resolve(link);

    // 加载失败，尝试降级
    link.onerror = () => {
      console.warn(`CSS 加载失败: ${url}`);
      if (fallbackUrl) {
        link.href = fallbackUrl;
        link.onerror = () => reject(new Error('CSS 降级也失败'));
      } else {
        reject(new Error('CSS 加载失败'));
      }
    };

    document.head.appendChild(link);
  });
}

// 使用
loadCSSWithFallback(
  'https://cdn.example.com/styles.css',
  '/assets/styles.css'
).catch(err => console.error(err));
```

**3. JS 资源加载失败处理**

```javascript
// 动态加载 JS 带降级
function loadScriptWithFallback(urls, callback) {
  const loadScript = (index) => {
    if (index >= urls.length) {
      console.error('所有 JS 源都加载失败');
      return;
    }

    const script = document.createElement('script');
    script.src = urls[index];

    script.onload = () => {
      console.log(`JS 加载成功: ${urls[index]}`);
      if (callback) callback();
    };

    script.onerror = () => {
      console.warn(`JS 加载失败: ${urls[index]}, 尝试下一个`);
      loadScript(index + 1);
    };

    document.body.appendChild(script);
  };

  loadScript(0);
}

// 使用
loadScriptWithFallback([
  'https://cdn1.example.com/app.js',
  'https://cdn2.example.com/app.js',
  '/assets/app.js'
], () => {
  console.log('应用初始化');
});
```

**4. Service Worker 拦截与降级**

```javascript
// service-worker.js
self.addEventListener('fetch', event => {
  const request = event.request;

  // 只处理静态资源
  if (request.destination === 'image') {
    event.respondWith(
      fetch(request)
        .catch(error => {
          console.warn('CDN 图片加载失败，使用降级:', error);
          // 返回本地默认图片
          return caches.match('/assets/fallback.png');
        })
    );
  }
});
```

**5. 全局资源监控**

```javascript
// 监控所有资源加载错误
window.addEventListener('error', event => {
  const target = event.target;

  // 只处理资源加载错误
  if (target.tagName === 'IMG') {
    reportError({
      type: 'image_load_failed',
      src: target.src,
      timestamp: Date.now()
    });
  } else if (target.tagName === 'LINK') {
    reportError({
      type: 'css_load_failed',
      href: target.href
    });
  } else if (target.tagName === 'SCRIPT') {
    reportError({
      type: 'script_load_failed',
      src: target.src
    });
  }
}, true);

// 上报错误
function reportError(errorInfo) {
  fetch('/api/log/resource-error', {
    method: 'POST',
    body: JSON.stringify(errorInfo)
  });
}
```

**6. 构建时多 CDN 配置**

```javascript
// webpack.config.js
module.exports = {
  output: {
    publicPath: process.env.CDN_URL || '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 生成资源加载降级脚本
      templateParameters: {
        cdnList: JSON.stringify([
          'https://cdn1.example.com',
          'https://cdn2.example.com',
          '' // 同源
        ])
      }
    })
  ]
};

// 模板 HTML
<script>
window.CDN_LIST = <%= cdnList %>;
window.loadResource = function(path) {
  return CDN_LIST.map(cdn => cdn + path);
};
</script>
```

---

### 单点登录（SSO）流程详解

#### 什么是 SSO

单点登录（Single Sign-On）允许用户在一次登录后，访问多个相互信任的应用系统而无需重复登录。

```
用户 ──▶ 应用A ──┐
                │
                ▼
              认证中心（SSO Server）
                │
用户 ◀── 应用B ◀─┘ （已登录，无需重复认证）
```

#### 基于 Cookie 的 SSO 实现

**1. 同域 SSO**

```
┌─────────────────────────────────────────┐
│           *.example.com                 │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐ │
│  │ app1    │  │ app2    │  │  SSO    │ │
│  │.example │  │.example │  │.example │ │
│  │  .com   │  │  .com   │  │  .com   │ │
│  └────┬────┘  └────┬────┘  └────┬────┘ │
│       └─────────────┴────────────┘      │
│              共享 Cookie 域              │
└─────────────────────────────────────────┘
```

**2. 跨域 SSO（Ticket 机制）**

```
┌─────────┐      ┌─────────┐      ┌─────────┐
│  用户    │      │ 应用A   │      │ 认证中心 │
│  (浏览器) │      │ a.com   │      │ sso.com  │
└────┬────┘      └────┬────┘      └────┬────┘
     │                │                │
     │  1.访问应用A    │                │
     │───────────────▶│                │
     │                │  2.未登录,重定向 │
     │◀───────────────│                │
     │                │                │
     │  3.携带回调地址跳转认证中心       │
     │───────────────────────────────▶│
     │                │                │
     │  4.显示登录页面  │                │
     │◀───────────────────────────────│
     │                │                │
     │  5.提交用户名密码 │                │
     │───────────────────────────────▶│
     │                │                │
     │  6.生成Ticket, 写sso.com cookie │
     │◀───────────────────────────────│
     │                │                │
     │  7.携带Ticket跳转回应用A        │
     │───────────────────────────────▶│
     │                │                │
     │                │  8.用Ticket换取Token
     │                │────────────────▶│
     │                │                │
     │  9.登录成功, 写a.com cookie     │
     │◀───────────────│                │
```

#### JWT + Redis 实现 SSO

```javascript
// 1. 登录服务
class SSOService {
  async login(username, password) {
    // 验证用户
    const user = await this.validateUser(username, password);
    if (!user) throw new Error('Invalid credentials');

    // 生成全局 Token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    // 存储到 Redis，支持多设备登录管理
    await redis.setex(`sso:${user.id}:${token}`, 7200, JSON.stringify({
      userId: user.id,
      loginTime: Date.now(),
      device: 'web'
    }));

    return { token, expiresIn: 7200 };
  }

  // 2. Token 验证
  async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const session = await redis.get(`sso:${decoded.userId}:${token}`);

      if (!session) {
        throw new Error('Session expired');
      }

      return decoded;
    } catch (err) {
      throw new Error('Invalid token');
    }
  }

  // 3. 单点登出（SLO）
  async logout(userId, token) {
    // 删除当前会话
    await redis.del(`sso:${userId}:${token}`);

    // 可选：删除该用户所有会话（强制所有设备下线）
    const keys = await redis.keys(`sso:${userId}:*`);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  }

  // 4. 获取所有登录设备
  async getActiveSessions(userId) {
    const keys = await redis.keys(`sso:${userId}:*`);
    const sessions = [];

    for (const key of keys) {
      const data = await redis.get(key);
      if (data) {
        sessions.push(JSON.parse(data));
      }
    }

    return sessions;
  }
}
```

#### 前端 SSO SDK 实现

```javascript
// sso-client.js
class SSOClient {
  constructor(config) {
    this.ssoServer = config.ssoServer;
    this.appId = config.appId;
    this.cookieDomain = config.cookieDomain;
  }

  // 检查登录状态
  async checkLogin() {
    const token = this.getToken();

    if (!token) {
      // 未登录，跳转到 SSO 登录页
      this.redirectToLogin();
      return false;
    }

    // 验证 Token 有效性
    try {
      const response = await fetch(`${this.ssoServer}/verify`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        return await response.json();
      } else {
        this.redirectToLogin();
        return false;
      }
    } catch (err) {
      this.redirectToLogin();
      return false;
    }
  }

  // 获取 Token
  getToken() {
    // 从 Cookie 或 localStorage 获取
    const match = document.cookie.match(/sso_token=([^;]+)/);
    return match ? match[1] : localStorage.getItem('sso_token');
  }

  // 设置 Token
  setToken(token, expiresIn) {
    // Cookie 设置（支持跨域）
    const expires = new Date(Date.now() + expiresIn * 1000).toUTCString();
    document.cookie = `sso_token=${token}; domain=${this.cookieDomain}; expires=${expires}; path=/; Secure; SameSite=None`;

    // 同时存储到 localStorage
    localStorage.setItem('sso_token', token);
  }

  // 跳转到登录页
  redirectToLogin() {
    const returnUrl = encodeURIComponent(window.location.href);
    window.location.href = `${this.ssoServer}/login?appId=${this.appId}&returnUrl=${returnUrl}`;
  }

  // 处理登录回调
  async handleCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const expiresIn = urlParams.get('expiresIn');

    if (token) {
      this.setToken(token, parseInt(expiresIn));

      // 清除 URL 中的 token
      window.history.replaceState({}, document.title, window.location.pathname);

      return true;
    }

    return false;
  }

  // 登出
  async logout() {
    const token = this.getToken();

    // 通知 SSO 服务器
    await fetch(`${this.ssoServer}/logout`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    // 清除本地存储
    document.cookie = `sso_token=; domain=${this.cookieDomain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    localStorage.removeItem('sso_token');
  }
}

// 使用
const sso = new SSOClient({
  ssoServer: 'https://sso.example.com',
  appId: 'my-app',
  cookieDomain: '.example.com'
});

// 应用启动时检查登录
sso.checkLogin().then(user => {
  if (user) {
    console.log('已登录:', user);
  }
});
```

---

### 页面白屏原因排查

#### 白屏常见原因

```
┌─────────────────────────────────────────┐
│           页面白屏排查流程               │
├─────────────────────────────────────────┤
│  1. 网络问题                             │
│     ├── JS/CSS 资源 404                 │
│     ├── CDN 故障                         │
│     └── 网络超时                         │
│                                         │
│  2. 资源加载问题                         │
│     ├── JS 执行错误                      │
│     ├── 语法错误（低版本浏览器）          │
│     └── 资源阻塞（CSS/JS 阻塞渲染）       │
│                                         │
│  3. 渲染问题                             │
│     ├── React/Vue 未挂载                 │
│     ├── 根组件报错                       │
│     └── 样式问题（如白底白字）            │
│                                         │
│  4. 服务端问题                           │
│     ├── 接口返回空数据                    │
│     ├── 服务端 500 错误                  │
│     └── 路由配置错误                     │
└─────────────────────────────────────────┘
```

#### 排查步骤

**1. 检查控制台错误**

```javascript
// 全局错误捕获，上报白屏错误
window.addEventListener('error', (event) => {
  reportError({
    type: 'js_error',
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno
  });
});

window.addEventListener('unhandledrejection', (event) => {
  reportError({
    type: 'promise_rejection',
    message: event.reason?.message || String(event.reason)
  });
});
```

**2. 检测白屏**

```javascript
// 白屏检测方案
function detectWhiteScreen() {
  // 检测根元素是否有内容
  const root = document.getElementById('root') || document.body;

  // 检查是否有可见内容
  const hasContent = root.innerText.trim().length > 0 ||
                     root.querySelectorAll('img, canvas, svg').length > 0;

  // 检查元素高度
  const hasHeight = root.offsetHeight > 100;

  if (!hasContent || !hasHeight) {
    reportError({ type: 'white_screen', url: location.href });
    return false;
  }

  return true;
}

// 页面加载完成后检测
window.addEventListener('load', () => {
  setTimeout(detectWhiteScreen, 3000); // 3秒后检测
});
```

**3. 资源加载监控**

```javascript
// 监控资源加载失败
window.addEventListener('error', (e) => {
  const target = e.target;
  if (target.tagName === 'SCRIPT') {
    console.error('JS 加载失败:', target.src);
  } else if (target.tagName === 'LINK') {
    console.error('CSS 加载失败:', target.href);
  }
}, true);

// Performance API 监控资源加载
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.responseStatus >= 400) {
      console.error('资源加载失败:', entry.name, entry.responseStatus);
    }
  }
});
observer.observe({ entryTypes: ['resource'] });
```

---

### ESLint 检查过程原理

#### ESLint 工作流程

```
┌─────────────────────────────────────────┐
│           ESLint 工作流程                │
├─────────────────────────────────────────┤
│  1. 解析 (Parse)                        │
│     └── 将代码解析为 AST                │
│         (使用 Espree/Acorn/Babel)       │
│                                         │
│  2. 遍历 (Traverse)                     │
│     └── 递归遍历 AST 节点               │
│         (使用 estraverse)               │
│                                         │
│  3. 规则检查 (Rule Check)               │
│     └── 对每个节点应用规则              │
│         - 监听特定节点类型              │
│         - 报告错误或警告                │
│                                         │
│  4. 修复 (Fix)                          │
│     └── 自动修复可修复的问题            │
│                                         │
│  5. 输出 (Report)                       │
│     └── 格式化输出结果                  │
└─────────────────────────────────────────┘
```

#### 自定义 ESLint 规则

```javascript
// 自定义规则：禁止直接使用 console
// rules/no-console.js
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: '禁止使用 console',
      category: 'Best Practices',
      recommended: true
    },
    fixable: 'code',  // 支持自动修复
    schema: [
      {
        type: 'object',
        properties: {
          allow: {
            type: 'array',
            items: { type: 'string' }
          }
        }
      }
    ],
    messages: {
      unexpected: 'Unexpected console statement. Use logger instead.'
    }
  },

  create(context) {
    const options = context.options[0] || {};
    const allowed = options.allow || [];

    return {
      // 监听 MemberExpression 节点
      MemberExpression(node) {
        if (
          node.object.name === 'console' &&
          !allowed.includes(node.property.name)
        ) {
          context.report({
            node,
            messageId: 'unexpected',
            fix(fixer) {
              // 自动修复：删除 console 语句
              const parent = node.parent;
              if (parent.type === 'CallExpression') {
                return fixer.remove(parent.parent);
              }
            }
          });
        }
      }
    };
  }
};
```

#### ESLint 配置最佳实践

```javascript
// .eslintrc.js
module.exports = {
  root: true,

  // 解析器
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },

  // 环境
  env: {
    browser: true,
    es2022: true,
    node: true,
    jest: true
  },

  // 继承的规则集
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'prettier'  // 关闭与 Prettier 冲突的规则
  ],

  // 插件
  plugins: [
    'react',
    'react-hooks',
    'import',
    'unused-imports'
  ],

  // 规则配置
  rules: {
    // 错误级别：off(0), warn(1), error(2)

    // React 相关
    'react/prop-types': 'off',           // 使用 TypeScript 不需要
    'react/react-in-jsx-scope': 'off',   // React 17+ 不需要
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // Import 相关
    'import/no-unresolved': 'error',
    'import/order': ['warn', {
      'groups': [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index'
      ],
      'newlines-between': 'always'
    }],
    'unused-imports/no-unused-imports': 'error',

    // 代码风格
    'no-console': ['warn', { allow: ['error', 'warn'] }],
    'no-debugger': 'error',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'prefer-const': 'error',
    'no-var': 'error'
  },

  // 设置
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },

  // 忽略文件
  ignorePatterns: [
    'dist/',
    'build/',
    'node_modules/',
    '*.config.js'
  ]
};
```

#### Pre-commit 钩子集成

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "git add"
    ]
  }
}
```

---

### package.json sideEffects 属性

#### 什么是 sideEffects

`sideEffects` 用于告知 Webpack 哪些文件有副作用，帮助 Tree Shaking 更准确地移除未使用的代码。

```json
{
  "name": "my-library",
  "sideEffects": [
    "*.css",
    "*.scss",
    "./src/polyfill.js"
  ]
}
```

#### 配置方式

```json
// 1. 所有文件都有副作用（默认，不推荐）
{
  "sideEffects": true
}

// 2. 纯模块，没有副作用（推荐）
{
  "sideEffects": false
}

// 3. 指定有副作用的文件
{
  "sideEffects": [
    "*.css",
    "*.less",
    "*.scss",
    "./src/polyfill.js",
    "./src/global.js"
  ]
}

// 4. 排除特定文件
{
  "sideEffects": [
    "!*.spec.js",  // 测试文件无副作用
    "*.css"
  ]
}
```

#### 实际应用

```javascript
// utils.js - 纯函数，无副作用
export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

// polyfill.js - 有副作用
import 'core-js/features/array/includes';

// 修改原型，有副作用
Array.prototype.last = function() {
  return this[this.length - 1];
};

// styles.css - 有副作用
import './styles.css';
```

```json
// package.json
{
  "sideEffects": [
    "*.css",
    "./src/polyfill.js"
  ]
}
```

#### 常见副作用场景

```javascript
// 1. 修改全局对象
window.$ = jQuery;

// 2. 修改原型
String.prototype.reverse = function() { ... };

// 3. CSS 导入
import './styles.css';

// 4. 自执行代码
console.log('Module loaded');

// 5. 事件监听
document.addEventListener('click', handler);

// 6. 全局状态
window.__INITIAL_STATE__ = {};
```

---

### Hash 路由的好处

#### Hash 路由 vs History 路由

```javascript
// Hash 路由
https://example.com/#/user/123

// History 路由
https://example.com/user/123
```

| 特性 | Hash 路由 | History 路由 |
|------|-----------|--------------|
| **URL 美观** | 有 `#`，不够美观 | 美观，符合常规 |
| **服务端配置** | 不需要 | 需要配置 fallback |
| **兼容性** | IE8+ | IE10+ |
| **SEO** | 较差 | 较好（需 SSR） |
| **锚点功能** | 冲突 | 正常 |

#### Hash 路由原理

```javascript
class HashRouter {
  constructor() {
    this.routes = {};
    this.currentUrl = '';

    // 监听 hash 变化
    window.addEventListener('hashchange', this.refresh.bind(this));
    window.addEventListener('load', this.refresh.bind(this));
  }

  route(path, callback) {
    this.routes[path] = callback;
  }

  refresh() {
    // 获取当前 hash
    this.currentUrl = location.hash.slice(1) || '/';

    // 执行对应回调
    const handler = this.routes[this.currentUrl];
    if (handler) {
      handler();
    }
  }

  push(path) {
    location.hash = path;
  }
}

// 使用
const router = new HashRouter();

router.route('/', () => {
  console.log('首页');
});

router.route('/about', () => {
  console.log('关于页面');
});
```

#### Hash 路由的优点

```javascript
// 1. 无需服务端配置
// 所有路由都在客户端处理，服务端只返回 index.html

// 2. 不会发送请求到服务端
// hash 变化不会触发页面刷新，也不会发送请求
location.hash = '/new-page'; // 浏览器不会请求 /new-page

// 3. 兼容性好
// IE8+ 都支持

// 4. 实现简单
// 只需监听 hashchange 事件
window.addEventListener('hashchange', () => {
  console.log('New hash:', location.hash);
});
```

#### 何时使用 Hash 路由

```javascript
// 适合使用 Hash 路由的场景：
// 1. 快速原型开发
// 2. 内部管理系统
// 3. 不需要 SEO 的应用
// 4. 部署环境不支持服务端配置

// 适合使用 History 路由的场景：
// 1. 对外网站
// 2. 需要 SEO
// 3. 追求 URL 美观
// 4. 有服务端支持
```

---

## Git 相关

### git pull 和 git fetch 有啥区别？

#### 核心区别

| 命令 | 作用 | 是否自动合并 | 安全性 |
|-----|------|------------|-------|
| `git fetch` | 从远程获取最新分支信息 | 否 | 高 |
| `git pull` | 从远程获取并自动合并到当前分支 | 是 | 中 |

#### 详细解释

**git fetch（拉取）**

```bash
# 获取所有远程分支的最新状态
git fetch origin

# 获取特定分支
git fetch origin main

# 查看远程分支与本地差异
git log HEAD..origin/main --oneline

# 比较差异后再决定是否合并
git diff HEAD origin/main
```

**git pull（拉取并合并）**

```bash
# 等同于 git fetch + git merge
git pull origin main

# 使用 rebase 而非 merge（推荐）
git pull --rebase origin main

# 完整写法
git pull <远程仓库> <远程分支>:<本地分支>
```

#### 工作流程对比

```bash
# ===== 使用 git fetch（推荐）=====
# 1. 查看远程更新
$ git fetch origin

# 2. 对比差异
$ git log HEAD..origin/main --oneline
* a1b2c3d feat: add new feature
* e4f5g6h fix: bug fix

# 3. 决定是否合并
$ git merge origin/main      # 方式1：合并
$ git rebase origin/main     # 方式2：变基（推荐）

# ===== 使用 git pull（简便但危险）=====
$ git pull origin main
# 直接合并，可能产生冲突或意外合并
```

#### 最佳实践

```bash
# 推荐工作流程
$ git fetch origin
$ git status
On branch feature-branch
Your branch and 'origin/feature-branch' have diverged,
and have 1 and 2 different commits each, respectively.

# 先查看差异
$ git log --graph --left-right HEAD...origin/feature-branch

# 选择合并方式
$ git merge origin/feature-branch    # 保留历史
$ git rebase origin/feature-branch   # 线性历史（推荐）
```

#### 何时使用

```bash
# 使用 git fetch：
# - 想先查看远程更新内容
# - 多人协作，不确定是否有冲突
# - 代码审查前同步最新代码
# - CI/CD 流程中获取最新状态

# 使用 git pull：
# - 个人项目，确定无冲突
# - 紧急修复，快速同步
# - 自动化脚本中
# - 完全信任远程代码
```

---

## 新一代构建工具

### Vite 原理详解

Vite 是新一代前端构建工具，由 Vue 作者尤雨溪开发，旨在解决 Webpack 在大型项目中的启动慢问题。

#### 核心原理

**1. 基于 ESM 的开发服务器**

```
传统 Webpack：
源代码 → 打包编译 → 启动服务 → 浏览器加载 bundles
    ↑_________________________________________↓
              (修改代码后重新打包)

Vite：
源代码 ←────── 浏览器直接请求 ──────→ 开发服务器
              (按需编译，无打包过程)
```

**2. 依赖预构建（Dependency Pre-Bundling）**

```javascript
// vite.config.js
export default {
  optimizeDeps: {
    // 需要预构建的依赖
    include: ['vue', 'vue-router', 'pinia'],
    // 排除某些依赖
    exclude: ['@my-lib/custom']
  }
}
```

预构建的目的：
- 将 CommonJS 转换为 ESM
- 减少模块请求数量（lodash-es → 单个文件）

**3. 热更新（HMR）优化**

| 特性 | Webpack | Vite |
|------|---------|------|
| HMR 速度 | 慢（需要重新编译模块图） | 快（只更新变化的模块） |
| 启动时间 | 与项目规模成正比 | 几乎恒定 |
| 内存占用 | 高 | 低 |

**4. 生产构建**

Vite 生产环境使用 Rollup：
- 更好的 Tree Shaking
- 更小的包体积
- 代码分割更智能

```javascript
// vite.config.js - 生产优化
export default {
  build: {
    // 代码分割配置
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'vue-router'],
          'ui': ['element-plus']
        }
      }
    },
    // 压缩配置
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
}
```

#### Vite vs Webpack

| 对比项 | Webpack | Vite |
|--------|---------|------|
| 开发启动 | 慢（需打包） | 快（原生 ESM） |
| HMR | 较慢 | 极速 |
| 配置复杂度 | 高 | 低 |
| 生态成熟度 | 非常高 | 高 |
| 生产构建 | Webpack | Rollup |
| 适用场景 | 大型复杂项目 | 现代浏览器项目 |

---

### Rspack 简介

Rspack 是字节跳动开源的基于 Rust 的 Webpack 替代品，目标是兼容 Webpack 生态的同时大幅提升构建速度。

#### 核心特点

```javascript
// rspack.config.js
module.exports = {
  // 与 Webpack 配置几乎一致
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  },
  // 内置优化
  optimization: {
    // 默认启用 Tree Shaking
    usedExports: true,
    // 代码分割
    splitChunks: {
      chunks: 'all'
    }
  }
};
```

**性能对比（大型项目）：**

| 工具 | 冷启动 | HMR | 生产构建 |
|------|--------|-----|----------|
| Webpack | 30s+ | 2s+ | 60s+ |
| Rspack | 5s | 200ms | 15s |
| Vite | 1s | 50ms | 20s |

**迁移建议：**
- Webpack 项目想保持生态兼容 → Rspack
- 新项目/小型项目 → Vite
- 需要深度定制 → Webpack

---

## 微前端架构

### 什么是微前端

微前端（Micro-Frontends）是一种将前端应用拆分为更小、更独立单元的架构模式，每个单元可以独立开发、部署和运行。

```
┌─────────────────────────────────────────────────────────┐
│                      主应用 (Host)                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │   导航菜单   │  │  用户状态   │  │   全局通知组件   │  │
│  └─────────────┘  └─────────────┘  └─────────────────┘  │
├─────────────────────────────────────────────────────────┤
│                      子应用区域                           │
│  ┌─────────────────────────────────────────────────┐   │
│  │              子应用 A (React)                    │   │
│  │         独立仓库 / 独立部署 / 独立团队           │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │              子应用 B (Vue)                      │   │
│  │         独立仓库 / 独立部署 / 独立团队           │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

#### 微前端解决的问题

1. **技术栈无关**：团队可以选择最适合的技术栈
2. **独立部署**：子应用可独立发布，不影响其他应用
3. **团队自治**：不同团队独立开发和维护
4. **渐进式迁移**：可以逐步将老系统迁移到新架构

---

### Module Federation

Module Federation 是 Webpack 5 引入的微前端方案，允许在运行时动态加载远程模块。

#### 核心概念

```javascript
// 主应用配置 (host/webpack.config.js)
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        // 声明远程应用
        app1: 'app1@http://localhost:3001/remoteEntry.js',
        app2: 'app2@http://localhost:3002/remoteEntry.js'
      },
      shared: {
        // 共享依赖
        react: { singleton: true },
        'react-dom': { singleton: true }
      }
    })
  ]
};

// 远程应用配置 (app1/webpack.config.js)
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'app1',
      filename: 'remoteEntry.js',
      exposes: {
        // 暴露的模块
        './Button': './src/components/Button',
        './Dashboard': './src/pages/Dashboard'
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true }
      }
    })
  ]
};
```

#### 运行时加载

```jsx
// 主应用中使用远程组件
import React, { Suspense, lazy } from 'react';

// 动态导入远程模块
const RemoteButton = lazy(() => import('app1/Button'));
const RemoteDashboard = lazy(() => import('app2/Dashboard'));

function App() {
  return (
    <div>
      <h1>主应用</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <RemoteButton />
        <RemoteDashboard />
      </Suspense>
    </div>
  );
}
```

#### 共享依赖策略

```javascript
shared: {
  react: {
    singleton: true,        // 单例模式，所有应用共享同一个实例
    requiredVersion: '^18.0.0', // 要求的版本
    eager: false            // 是否立即加载
  },
  'react-dom': {
    singleton: true
  }
}
```

**版本冲突处理：**
- 版本兼容：共享使用
- 版本不兼容：各自加载

---

### Qiankun

Qiankun 是阿里开源的微前端框架，基于 single-spa，提供更好的开发体验和更多功能。

#### 核心特点

1. **技术栈无关**：支持 React、Vue、Angular、纯 HTML 等
2. **独立部署**：子应用独立开发和部署
3. **沙箱隔离**：JS 沙箱 + 样式隔离
4. **预加载**：支持配置预加载策略

#### 快速接入

```javascript
// 主应用 (main-app)
import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'react-app',
    entry: '//localhost:3001',
    container: '#container',
    activeRule: '/react',
    props: {
      // 传递初始数据
      userInfo: { name: '张三', role: 'admin' }
    }
  },
  {
    name: 'vue-app',
    entry: '//localhost:8080',
    container: '#container',
    activeRule: '/vue'
  }
], {
  // 生命周期钩子
  beforeLoad: (app) => console.log('before load', app.name),
  afterMount: (app) => console.log('after mount', app.name)
});

start({
  // 配置项
  sandbox: {
    strictStyleIsolation: true,  // 样式隔离
    experimentalStyleIsolation: true
  },
  prefetch: 'all'  // 预加载所有子应用
});
```

#### 子应用改造

```javascript
// React 子应用
export async function bootstrap() {
  console.log('react app bootstraped');
}

export async function mount(props) {
  ReactDOM.render(
    <App {...props} />,
    props.container
      ? props.container.querySelector('#root')
      : document.getElementById('root')
  );
}

export async function unmount(props) {
  ReactDOM.unmountComponentAtNode(
    props.container
      ? props.container.querySelector('#root')
      : document.getElementById('root')
  );
}
```

```javascript
// Vue 子应用
import Vue from 'vue';
import App from './App.vue';

let instance = null;

function render(props = {}) {
  const { container } = props;
  instance = new Vue({
    render: h => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app');
}

export async function mount(props) {
  render(props);
}

export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
}
```

#### 沙箱机制

```
┌─────────────────────────────────────────────────────────┐
│                       主应用环境                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │                  沙箱 A (React App)              │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────┐  │   │
│  │  │ 修改 window  │  │ 修改 document│  │ 样式作用域│  │   │
│  │  │   (隔离)     │  │   (隔离)    │  │ (隔离)   │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────┘  │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │                  沙箱 B (Vue App)                │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────┐  │   │
│  │  │ 修改 window  │  │ 修改 document│  │ 样式作用域│  │   │
│  │  │   (隔离)     │  │   (隔离)    │  │ (隔离)   │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────┘  │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

#### 通信机制

```javascript
// 主应用
import { initGlobalState, MicroAppStateActions } from 'qiankun';

const actions = initGlobalState({
  user: { name: '张三' },
  theme: 'dark'
});

// 修改全局状态
actions.setGlobalState({ theme: 'light' });

// 监听状态变化
actions.onGlobalStateChange((state, prev) => {
  console.log('主应用检测到变化:', state, prev);
});
```

```javascript
// 子应用
export async function mount(props) {
  // 监听全局状态
  props.onGlobalStateChange((state, prev) => {
    console.log('子应用收到:', state);
  });

  // 修改全局状态
  props.setGlobalState({ user: { name: '李四' } });
}
```

#### 微前端方案对比

| 特性 | Module Federation | Qiankun | single-spa | iframe |
|------|-------------------|---------|------------|--------|
| 技术栈 | Webpack 5 专用 | 框架无关 | 框架无关 | 浏览器原生 |
| JS 沙箱 | ❌ | ✅ | ❌ | ✅ |
| 样式隔离 | ❌ | ✅ | ❌ | ✅ |
| 预加载 | ❌ | ✅ | ❌ | ❌ |
| 公共依赖 | 自动共享 | 需配置 | 需配置 | 完全隔离 |
| 接入成本 | 中 | 低 | 中 | 极低 |
| 性能 | 好 | 好 | 好 | 一般 |

---

## Core Web Vitals 性能优化

### 什么是 Core Web Vitals

Core Web Vitals 是 Google 提出的衡量网页用户体验的核心指标，影响搜索引擎排名。

```
┌─────────────────────────────────────────────────────────┐
│                    Core Web Vitals                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   LCP (Largest Contentful Paint)                        │
│   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                      │
│   最大内容绘制时间 - 衡量加载性能                        │
│   目标: < 2.5s                                          │
│                                                         │
│   FID (First Input Delay)                               │
│   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                      │
│   首次输入延迟 - 衡量交互性                              │
│   目标: < 100ms                                         │
│   (2024年起被 INP 取代)                                 │
│                                                         │
│   CLS (Cumulative Layout Shift)                         │
│   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                      │
│   累积布局偏移 - 衡量视觉稳定性                          │
│   目标: < 0.1                                           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

### LCP (Largest Contentful Paint)

**定义**：视口内可见的最大内容元素（图片、视频、块级元素）的渲染时间。

```
时间线:
0ms    100ms   500ms   1000ms  1500ms  2000ms  2500ms
│       │       │       │       │       │       │
├───────┼───────┼───────┼───────┼───────┼───────┤
        TTFB    FCP                             LCP
        (首字节)  (首次绘制)                      (最大内容)

LCP 通常由以下元素决定:
- <img> 元素
- <image> (SVG内)
- <video> 元素（ poster 图片）
- 通过 url() 加载的背景图
- 块级元素中的文本节点
```

#### 优化策略

```html
<!-- 1. 优化图片 -->
<!-- 使用 WebP 格式，响应式图片 -->
<img
  src="hero.webp"
  srcset="hero-400.webp 400w, hero-800.webp 800w"
  sizes="(max-width: 600px) 400px, 800px"
  width="800"
  height="600"
  fetchpriority="high"  <!-- 高优先级加载 -->
  alt="Hero"
/>

<!-- 2. 预加载关键资源 -->
<link rel="preload" as="image" href="/hero.webp" fetchpriority="high">
<link rel="preconnect" href="https://cdn.example.com">
```

```javascript
// 3. 服务端渲染 (SSR) 加速首屏
// Next.js 示例
export async function getServerSideProps() {
  const data = await fetch('https://api.example.com/data');
  return { props: { data } };
}

// 4. 优化 TTFB (Time To First Byte)
// - 使用 CDN
// - 优化服务器响应时间
// - 使用缓存策略
```

```css
/* 5. 避免阻塞渲染的 CSS */
/* 内联关键 CSS */
<style>
  /* 首屏必需样式 */
  .hero { ... }
  .nav { ... }
</style>

<!-- 异步加载非关键 CSS -->
<link rel="preload" href="non-critical.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

---

### INP (Interaction to Next Paint)

**定义**：与页面进行交互（点击、触摸、键盘）到页面下一次绘制之间的延迟。2024 年 3 月取代 FID。

```javascript
// 性能观察者监控 INP
const observer = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  entries.forEach((entry) => {
    // entry.interactionId 标识交互
    // entry.duration 是交互延迟
    console.log('INP:', entry.duration);
  });
});

observer.observe({ entryTypes: ['event'] });
```

#### 优化策略

```javascript
// ❌ 错误：阻塞主线程的长任务
document.getElementById('button').addEventListener('click', () => {
  // 同步处理大量数据，阻塞 UI 响应
  const result = heavyComputation(data);
  updateUI(result);
});

// ✅ 正确：使用 Scheduler API 分片处理
document.getElementById('button').addEventListener('click', async () => {
  // 立即给出视觉反馈
  showLoading();

  // 将重计算放在下一个事件循环
  await scheduler.yield();

  const result = await heavyComputationAsync(data);
  updateUI(result);
  hideLoading();
});

// 使用 Web Worker 处理复杂计算
const worker = new Worker('worker.js');
document.getElementById('button').addEventListener('click', () => {
  worker.postMessage(data);
  worker.onmessage = (e) => updateUI(e.data);
});
```

```javascript
// React 中使用 useTransition 标记非紧急更新
import { useTransition } from 'react';

function SearchResults() {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    // 高优先级：更新输入框
    const value = e.target.value;

    // 低优先级：更新搜索结果（可中断）
    startTransition(() => {
      setQuery(value);
    });
  };

  return (
    <>
      <input onChange={handleChange} />
      {isPending && <Spinner />}
      <Results query={query} />
    </>
  );
}
```

---

### CLS (Cumulative Layout Shift)

**定义**：页面生命周期内所有意外布局偏移的累积分数。

```
布局偏移示例:

初始状态:
┌─────────────────────────┐
│     标题文字             │
│                         │
│  [图片加载中...]         │
│                         │
│  用户想点击这个按钮 → │   │
│                         │
└─────────────────────────┘

图片加载后 (CLS 发生):
┌─────────────────────────┐
│     标题文字             │
│  ┌───────────────────┐  │
│  │                   │  │
│  │     实际图片       │  │  ← 图片占据了空间
│  │                   │  │
│  └───────────────────┘  │
│                         │
│  用户想点击这个按钮 → │   │  ← 按钮位置下移
│                         │
└─────────────────────────┘

用户点错了！😠
```

#### 优化策略

```html
<!-- ✅ 为图片设置尺寸 -->
<img
  src="photo.jpg"
  width="800"
  height="600"
  style="max-width: 100%; height: auto;"
/>

<!-- ✅ 为动态内容预留空间 -->
<div style="min-height: 200px;">
  <!-- 广告或其他动态内容 -->
  <div id="ad-slot"></div>
</div>

<!-- ✅ 使用骨架屏 -->
<div class="skeleton" style="height: 150px;">
  <div class="skeleton-line"></div>
  <div class="skeleton-line"></div>
</div>
```

```css
/* ✅ 字体优化，避免 FOIT/FOUT */
@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2') format('woff2');
  font-display: swap; /* 使用备用字体，加载后替换 */
}

/* ✅ 避免在已渲染内容上方插入内容 */
.new-content {
  /* 不要这样做 */
  /* margin-top: -50px; */

  /* 正确做法：预留空间 */
  scroll-margin-top: 50px;
}
```

---

### 性能监控实战

```javascript
// 1. 使用 Web Vitals 库
import { getCLS, getFID, getFCP, getLCP, getTTFB, onINP } from 'web-vitals';

function sendToAnalytics(metric) {
  const body = JSON.stringify(metric);
  // 发送到分析平台
  fetch('/analytics', { body, method: 'POST', keepalive: true });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getLCP(sendToAnalytics);
onINP(sendToAnalytics); // INP 监控

// 2. 使用 Performance API
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('Long Task:', entry.duration);
    // 报告超过 50ms 的长任务
    if (entry.duration > 50) {
      reportLongTask(entry);
    }
  }
});

observer.observe({ entryTypes: ['longtask'] });

// 3. 资源加载监控
const resourceObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.responseStatus >= 400) {
      console.error('资源加载失败:', entry.name);
    }
  }
});

resourceObserver.observe({ entryTypes: ['resource'] });
```

#### 性能预算

```javascript
// bundle-analyzer 配置
// next.config.js
module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!dev && !isServer) {
      // 设置性能预算
      config.performance = {
        maxEntrypointSize: 250000, // 250kb
        maxAssetSize: 250000,
        hints: 'error'
      };
    }
    return config;
  }
};
```

---

## 系统稳定性

### 前端视角 - 如何保证系统稳定性

#### 稳定性建设体系

```
┌─────────────────────────────────────────────────────────┐
│                    系统稳定性建设                         │
├─────────────────────────────────────────────────────────┤
│  事前防御        事中监控           事后恢复              │
│  ├─ 代码规范    ├─ 实时监控        ├─ 自动降级           │
│  ├─ 自动化测试  ├─ 告警机制        ├─ 快速回滚           │
│  ├─ 灰度发布    ├─ 日志追踪        ├─ 故障复盘           │
│  └─ 容灾设计    └─ 用户反馈        └─ 预案优化           │
└─────────────────────────────────────────────────────────┘
```

#### 1. 事前防御

**代码质量保障**

```javascript
// 1. 类型安全（TypeScript）
interface User {
  id: number;
  name: string;
  email: string;
}

// 2. 输入校验
import { z } from 'zod';

const UserSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  email: z.string().email()
});

function createUser(data: unknown) {
  const user = UserSchema.parse(data); // 运行时校验
  return user;
}

// 3. 错误边界（React）
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <FallbackUI />;
    }
    return this.props.children;
  }
}
```

**自动化测试**

```javascript
// 单元测试
// 集成测试
// E2E 测试
// 视觉回归测试
// 性能基准测试
```

**灰度发布**

```javascript
// 按用户灰度
function isInGrayRelease(userId) {
  const grayPercent = 10; // 10% 灰度
  const hash = hashCode(userId) % 100;
  return hash < grayPercent;
}

// 按地域灰度
function isGrayRegion(region) {
  return ['北京', '上海'].includes(region);
}

// 金丝雀发布
// 1. 发布到 1% 用户
// 2. 监控 5 分钟
// 3. 无异常则发布到 10%
// 4. 逐步扩大到 100%
```

#### 2. 事中监控

**实时监控指标**

```javascript
// 核心指标监控
const metrics = {
  // 性能指标
  FCP: 1200,    // 首次内容绘制
  LCP: 2500,    // 最大内容绘制
  FID: 100,     // 首次输入延迟
  CLS: 0.1,     // 累积布局偏移
  TTFB: 600,    // 首字节时间

  // 业务指标
  errorRate: 0.01,      // 错误率 < 1%
  apiSuccessRate: 0.99, // API 成功率 > 99%
  crashRate: 0.001      // 崩溃率 < 0.1%
};
```

**异常监控**

```javascript
// 全局错误捕获
window.onerror = (msg, url, line, col, error) => {
  reportError({
    type: 'javascript',
    message: msg,
    source: url,
    line,
    column: col,
    stack: error?.stack,
    timestamp: Date.now(),
    userAgent: navigator.userAgent
  });
};

// Promise 未捕获异常
window.addEventListener('unhandledrejection', (event) => {
  reportError({
    type: 'promise',
    reason: event.reason,
    stack: event.reason?.stack
  });
});

// 资源加载失败
window.addEventListener('error', (event) => {
  if (event.target !== window) {
    reportError({
      type: 'resource',
      url: event.target.src || event.target.href,
      tagName: event.target.tagName
    });
  }
}, true);
```

**性能监控**

```javascript
// Web Vitals 监控
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  const body = JSON.stringify(metric);
  // 发送到监控平台
  navigator.sendBeacon('/analytics', body);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

#### 3. 事后恢复

**自动降级策略**

```javascript
// 1. 功能开关
const featureFlags = {
  newFeature: false,      // 关闭新功能
  enableCache: true,      // 启用缓存
  fallbackCDN: true       // 切换到备用 CDN
};

// 2. 接口降级
async function fetchData() {
  try {
    return await fetchFromPrimary();
  } catch (error) {
    // 主接口失败，降级到备用接口
    console.warn('Primary failed, using fallback');
    return await fetchFromFallback();
  }
}

// 3. 静态化降级
function renderPage() {
  try {
    return renderDynamicPage();
  } catch (error) {
    // 动态渲染失败，返回静态页面
    return renderStaticPage();
  }
}
```

**快速回滚**

```bash
# 前端版本回滚（CDN 刷新）
# 1. 将 CDN 指向上一个稳定版本
# 2. 刷新 CDN 缓存

# 服务端配合
# 1. 保留最近 N 个版本的静态资源
# 2. 配置快速回滚接口
```

---

### 如何统计长任务时间、长任务执行次数

#### 什么是长任务（Long Tasks）

```javascript
// 长任务定义：执行时间超过 50ms 的主线程任务
// 会阻塞用户交互，导致页面卡顿
```

#### 使用 PerformanceObserver 监控

```javascript
// 1. 基础监控
function observeLongTasks() {
  if (!('PerformanceObserver' in window)) return;

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      // entry.duration: 任务执行时间（毫秒）
      // entry.startTime: 任务开始时间

      console.log('长任务 detected:', {
        duration: entry.duration,      // 实际执行时间
        startTime: entry.startTime,    // 开始时间
        type: entry.entryType          // 'longtask'
      });

      // 上报数据
      reportLongTask({
        duration: entry.duration,
        startTime: entry.startTime,
        url: window.location.href
      });
    }
  });

  observer.observe({ entryTypes: ['longtask'] });
  return observer;
}

const longTaskObserver = observeLongTasks();

// 页面卸载时断开观察
window.addEventListener('beforeunload', () => {
  longTaskObserver.disconnect();
});
```

#### 完整统计方案

```javascript
class LongTaskMonitor {
  constructor(options = {}) {
    this.threshold = options.threshold || 50;  // 长任务阈值
    this.data = {
      tasks: [],          // 所有长任务
      totalCount: 0,      // 总次数
      totalDuration: 0,   // 总耗时
      maxDuration: 0,     // 最大耗时
      byUrl: {}           // 按页面统计
    };
    this.observer = null;
    this.init();
  }

  init() {
    if (!('PerformanceObserver' in window)) {
      console.warn('PerformanceObserver not supported');
      return;
    }

    this.observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.recordTask(entry);
      }
    });

    this.observer.observe({ entryTypes: ['longtask'] });
  }

  recordTask(entry) {
    const task = {
      duration: entry.duration,
      startTime: entry.startTime,
      url: window.location.href,
      timestamp: Date.now()
    };

    // 存储原始数据
    this.data.tasks.push(task);
    this.data.totalCount++;
    this.data.totalDuration += entry.duration;
    this.data.maxDuration = Math.max(this.data.maxDuration, entry.duration);

    // 按 URL 统计
    const url = window.location.pathname;
    if (!this.data.byUrl[url]) {
      this.data.byUrl[url] = {
        count: 0,
        totalDuration: 0,
        maxDuration: 0
      };
    }
    this.data.byUrl[url].count++;
    this.data.byUrl[url].totalDuration += entry.duration;
    this.data.byUrl[url].maxDuration = Math.max(
      this.data.byUrl[url].maxDuration,
      entry.duration
    );

    // 触发告警（如果超过严重阈值）
    if (entry.duration > 100) {
      this.triggerAlert(task);
    }
  }

  triggerAlert(task) {
    console.warn('严重长任务告警:', task);
    // 发送到监控系统
    navigator.sendBeacon('/api/alert', JSON.stringify({
      type: 'longtask',
      severity: 'high',
      data: task
    }));
  }

  // 获取统计报告
  getReport() {
    return {
      ...this.data,
      avgDuration: this.data.totalCount > 0
        ? this.data.totalDuration / this.data.totalCount
        : 0,
      currentUrl: window.location.pathname
    };
  }

  // 按时间段统计
  getStatsByTimeRange(startTime, endTime) {
    return this.data.tasks.filter(
      task => task.timestamp >= startTime && task.timestamp <= endTime
    );
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// 使用
const monitor = new LongTaskMonitor({ threshold: 50 });

// 定期上报
setInterval(() => {
  const report = monitor.getReport();
  navigator.sendBeacon('/api/performance/longtask', JSON.stringify(report));
}, 30000); // 每 30 秒上报
```

#### 归因分析（找出长任务来源）

```javascript
// 长任务归因分析
function analyzeLongTaskAttribution(entry) {
  // 获取长任务的归因信息
  const attribution = entry.attribution;

  if (attribution && attribution.length > 0) {
    attribution.forEach(item => {
      console.log('长任务来源:', {
        type: item.type,           // 'script', 'event', 'parse', 'compile' 等
        containerType: item.containerType,  // 'window', 'iframe', 'embed'
        containerName: item.containerName,
        containerSrc: item.containerSrc
      });
    });
  }
}

// 增强版监控
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    analyzeLongTaskAttribution(entry);

    // 分类统计
    categorizeLongTask(entry);
  }
});

function categorizeLongTask(entry) {
  const attribution = entry.attribution?.[0];
  if (!attribution) return 'unknown';

  const categories = {
    'script': '第三方脚本',
    'event': '事件处理',
    'parse': 'HTML解析',
    'compile': 'JS编译',
    'paint': '绘制',
    'style': '样式计算'
  };

  return categories[attribution.type] || '其他';
}
```

#### 优化建议

```javascript
// 1. 任务分割
function breakLongTask() {
  return new Promise(resolve => {
    requestIdleCallback(() => {
      resolve();
    });
  });
}

// 2. Web Worker 处理耗时任务
const worker = new Worker('heavy-task.js');
worker.postMessage({ data: largeData });
worker.onmessage = (e) => {
  console.log('任务完成:', e.data);
};

// 3. 时间切片（React Scheduler 原理）
function timeSlicing(tasks, chunkTime = 50) {
  let index = 0;

  function runChunk(deadline) {
    while (index < tasks.length && deadline.timeRemaining() > 0) {
      tasks[index]();
      index++;
    }

    if (index < tasks.length) {
      requestIdleCallback(runChunk);
    }
  }

  requestIdleCallback(runChunk);
}

// 4. 防抖和节流
const throttledFn = throttle(heavyFunction, 100);
const debouncedFn = debounce(heavyFunction, 300);
```

#### 可视化监控面板

```javascript
// 长任务监控面板数据
function generateDashboardData() {
  const monitor = new LongTaskMonitor();

  return {
    // 实时指标
    realtime: {
      count: monitor.data.totalCount,
      avgDuration: monitor.data.totalDuration / monitor.data.totalCount,
      maxDuration: monitor.data.maxDuration
    },

    // 趋势数据（最近 1 小时，每分钟一个点）
    trends: generateTrendData(60),

    // 页面分布
    distribution: monitor.data.byUrl,

    // 告警列表
    alerts: getRecentAlerts()
  };
}
```
