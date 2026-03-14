---
sidebar_position: 4
title: 后端开发规范
---

# 后端开发规范

## 代码风格

### 命名规范

1. **文件命名**：使用 kebab-case（小写字母+连字符）
2. **类命名**：使用 PascalCase（大驼峰）
3. **函数/变量命名**：使用 camelCase（小驼峰）
4. **常量命名**：使用 UPPER_SNAKE_CASE（大写下划线）

```
# 推荐的文件命名
user-service.js
user-controller.js
user-model.js

# 不推荐
userService.js  // 驼峰
user_service.js // 下划线
```

```javascript
// 推荐 - 类名使用 PascalCase
class UserService {}
class UserRepository {}

// 推荐 - 函数和变量使用 camelCase
const getUserInfo = () => {}
const maxCount = 100

// 推荐 - 常量使用 UPPER_SNAKE_CASE
const MAX_RETRY_COUNT = 3
const DEFAULT_TIMEOUT = 5000
```

### 目录结构

```
src/
├── controller/     # 控制器层
├── service/        # 业务逻辑层
├── repository/     # 数据访问层
├── model/          # 数据模型
├── middleware/     # 中间件
├── router/         # 路由配置
├── utils/          # 工具函数
├── config/         # 配置文件
└── types/          # 类型定义
```

## API 设计规范

### RESTful API 设计

1. 使用名词而非动词
2. 使用复数形式表示资源集合
3. 使用 HTTP 方法表示操作类型

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /users | 获取用户列表 |
| GET | /users/:id | 获取单个用户 |
| POST | /users | 创建用户 |
| PUT | /users/:id | 更新用户 |
| PATCH | /users/:id | 部分更新用户 |
| DELETE | /users/:id | 删除用户 |

### 统一响应格式

```javascript
// 成功响应
{
  "code": 0,
  "message": "success",
  "data": {
    "id": 1,
    "name": "John"
  }
}

// 错误响应
{
  "code": 1001,
  "message": "用户不存在",
  "data": null
}

// 列表响应（带分页）
{
  "code": 0,
  "message": "success",
  "data": {
    "list": [...],
    "total": 100,
    "page": 1,
    "pageSize": 10
  }
}
```

### HTTP 状态码

| 状态码 | 说明 | 使用场景 |
|--------|------|----------|
| 200 | OK | 请求成功 |
| 201 | Created | 资源创建成功 |
| 204 | No Content | 删除成功 |
| 400 | Bad Request | 请求参数错误 |
| 401 | Unauthorized | 未授权 |
| 403 | Forbidden | 禁止访问 |
| 404 | Not Found | 资源不存在 |
| 500 | Internal Server Error | 服务器错误 |

## 数据库设计规范

### 表命名

1. 使用小写字母和下划线
2. 使用复数形式
3. 添加业务前缀避免冲突

```sql
-- 推荐
user_profiles
order_items
sys_logs

-- 不推荐
UserProfile        -- 驼峰
user_profile       -- 单数
tb_user_profile    -- 避免使用 tb 前缀
```

### 业务系统前缀规范

在领域驱动设计（DDD）或微服务架构中，常用系统缩写作为数据库或表的命名前缀：

#### 核心业务系统

| 缩写 | 全称 | 中文名称 | 推荐表前缀 |
|------|------|----------|------------|
| OMS | Order Management System | 订单管理系统 | `oms_` / `order_` |
| PMS | Product Management System | 产品管理系统 | `pms_` / `product_` |
| PMS | Property Management System | 物业管理系统 | `pms_` / `property_` |
| IMS | Inventory Management System | 库存管理系统 | `ims_` / `inventory_` |
| TMS | Transaction Management System | 交易管理系统 | `tms_` / `transaction_` |
| TMS | Transport Management System | 运输管理系统 | `tms_` / `transport_` |
| SMS | Sales Management System | 销售管理系统 | `sms_` / `sales_` |
| BMS | Billing Management System | 账单管理系统 | `bms_` / `billing_` |
| FMS | Finance Management System | 财务管理系统 | `fms_` / `finance_` |
| WMS | Warehouse Management System | 仓库管理系统 | `wms_` / `warehouse_` |
| ERP | Enterprise Resource Planning | 企业资源计划 | `erp_` |

#### 用户与权限相关

| 缩写 | 全称 | 中文名称 | 推荐表前缀 |
|------|------|----------|------------|
| UMS | User Management System | 用户管理系统 | `ums_` / `user_` |
| AMS | Account Management System | 账户管理系统 | `ams_` / `account_` |
| AUTH | Authentication System | 认证授权系统 | `auth_` |
| RBAC | Role-Based Access Control | 基于角色的访问控制 | `rbac_` / `permission_` |
| SSO | Single Sign-On | 单点登录系统 | `sso_` |

#### 内容与媒体相关

| 缩写 | 全称 | 中文名称 | 推荐表前缀 |
|------|------|----------|------------|
| CMS | Content Management System | 内容管理系统 | `cms_` / `content_` |
| DMS | Document Management System | 文档管理系统 | `dms_` / `document_` |
| MMS | Media Management System | 媒体管理系统 | `mms_` / `media_` |

#### 平台与基础设施

| 缩写 | 全称 | 中文名称 | 推荐表前缀 |
|------|------|----------|------------|
| GATEWAY | API Gateway | API网关 | `gateway_` |
| SCHEDULER | Job Scheduler | 任务调度中心 | `job_` / `scheduler_` |
| CONFIG | Configuration Center | 配置中心 | `config_` |
| NOTIFICATION | Notification Center | 通知中心 | `notification_` / `message_` |
| LOG | Log Center | 日志中心 | `log_` |
| MONITOR | Monitoring System | 监控系统 | `monitor_` |
| FILE | File Service | 文件服务 | `file_` |
| SEARCH | Search Service | 搜索服务 | `search_` |

#### 特定场景

| 缩写 | 全称 | 中文名称 | 推荐表前缀 |
|------|------|----------|------------|
| LMS | Learning Management System | 学习管理系统 | `lms_` / `learning_` |
| EMS | Event Management System | 活动管理系统 | `ems_` / `event_` |
| CRM | Customer Relationship Management | 客户关系管理 | `crm_` / `customer_` |
| SCM | Supply Chain Management | 供应链管理 | `scm_` / `supply_chain_` |
| BI | Business Intelligence | 商业智能 | `bi_` / `analytics_` |
| IOT | Internet of Things | 物联网平台 | `iot_` |
| AI | Artificial Intelligence | 人工智能平台 | `ai_` |

#### 命名示例

```sql
-- 内容管理系统 (CMS)
cms_articles
cms_categories
cms_tags

-- 用户管理系统 (UMS)
ums_users
ums_roles
ums_permissions

-- 订单管理系统 (OMS)
oms_orders
oms_order_items
oms_order_status_log

-- 库存管理系统 (IMS)
ims_inventories
ims_stock_movements
ims_warehouses

-- 或直接使用业务域名（推荐）
app_users
app_orders
app_products
app_inventories
```

#### 命名最佳实践

1. **清晰无歧义**：优先使用能清晰表达业务域的全称或公认缩写
   ```sql
   -- 推荐：直接使用业务域名
   order_items
   user_profiles
   inventory_stocks

   -- 避免：使用模糊的缩写
   oms_items      -- 不够直观
   ums_profiles   -- 需要知道 UMS 含义
   ```

2. **一致性**：团队内部统一规范
   ```sql
   -- 全部使用小写英文单词
   app_users
   app_orders

   -- 或全部使用系统缩写前缀
   cms_users
   cms_orders
   ```

3. **环境区分**：使用环境前缀区分不同环境
   ```sql
   -- 开发环境
   dev_cms_articles
   dev_ums_users

   -- 生产环境
   prod_cms_articles
   prod_ums_users
   ```

4. **微服务标识**：使用 svc_ 前缀标识微服务数据库
   ```sql
   svc_user           -- 用户服务数据库
   svc_order          -- 订单服务数据库
   svc_payment        -- 支付服务数据库
   ```

5. **避免缩写冲突**：注意同一缩写的多义性
   ```sql
   -- PMS 可能是产品或物业
   -- 明确使用全称或添加区分
   pms_product_items
   pms_property_units

   -- 或直接用业务域名
   product_items
   property_units
   ```

### 字段命名

1. 使用小写字母和下划线
2. 布尔类型使用 is_ 前缀
3. 时间字段使用 _at 后缀

```sql
-- 推荐
id
user_name
is_active
created_at
updated_at

-- 不推荐
userName           -- 驼峰
active             -- 布尔值缺少前缀
createTime         -- 时间字段缺少后缀
```

### 必备字段

每个表都应包含以下字段：

```sql
id              BIGINT PRIMARY KEY AUTO_INCREMENT
created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
is_deleted      TINYINT DEFAULT 0
```

### 索引规范

```sql
-- 主键索引
PRIMARY KEY (id)

-- 唯一索引
UNIQUE KEY uk_user_email (email)

-- 普通索引
KEY idx_user_name (user_name)

-- 联合索引
KEY idx_user_status_time (user_status, created_at)

-- 联合索引遵循最左前缀原则
-- 正确的索引顺序：高选择性字段放在前面
```

## 代码分层规范

### Controller 层

职责：接收请求、参数验证、调用 Service、返回响应

```javascript
// controller/user.controller.js
class UserController {
  async getUser(ctx) {
    // 1. 参数获取和验证
    const { id } = ctx.params
    if (!id || isNaN(id)) {
      return ctx.error(400, '无效的用户ID')
    }

    // 2. 调用 Service 层
    const user = await userService.getUserById(id)

    // 3. 返回响应
    if (!user) {
      return ctx.error(404, '用户不存在')
    }
    return ctx.success(user)
  }

  async createUser(ctx) {
    // 参数验证
    const { name, email } = ctx.request.body
    if (!name || !email) {
      return ctx.error(400, '缺少必要参数')
    }

    // 调用 Service
    const user = await userService.createUser({ name, email })

    // 返回响应
    return ctx.success(user, 201)
  }
}
```

### Service 层

职责：业务逻辑处理、事务控制

```javascript
// service/user.service.js
class UserService {
  async getUserById(id) {
    // 参数校验
    if (id <= 0) {
      throw new Error('无效的用户ID')
    }

    // 调用 Repository
    const user = await userRepository.findById(id)

    // 业务逻辑处理
    if (!user) {
      return null
    }

    // 返回处理后的数据（不返回敏感信息）
    const { password, ...safeUser } = user
    return safeUser
  }

  async createUser(userData) {
    // 业务规则验证
    const existingUser = await userRepository.findByEmail(userData.email)
    if (existingUser) {
      throw new Error('邮箱已被注册')
    }

    // 数据处理
    const hashedPassword = await bcrypt.hash(userData.password, 10)

    // 创建用户
    const user = await userRepository.create({
      ...userData,
      password: hashedPassword
    })

    return user
  }
}
```

### Repository 层

职责：数据库操作、数据持久化

```javascript
// repository/user.repository.js
class UserRepository {
  async findById(id) {
    return await db.query('SELECT * FROM users WHERE id = ? AND is_deleted = 0', [id])
  }

  async findByEmail(email) {
    return await db.query('SELECT * FROM users WHERE email = ? AND is_deleted = 0', [email])
  }

  async create(userData) {
    const result = await db.query('INSERT INTO users SET ?', userData)
    return await this.findById(result.insertId)
  }

  async update(id, userData) {
    await db.query('UPDATE users SET ? WHERE id = ?', [userData, id])
    return await this.findById(id)
  }

  async delete(id) {
    // 软删除
    await db.query('UPDATE users SET is_deleted = 1 WHERE id = ?', [id])
  }
}
```

## 错误处理规范

### 错误码定义

```javascript
// constants/error-codes.js
const ErrorCodes = {
  // 系统错误 1xxx
  SYSTEM_ERROR: 1000,
  DATABASE_ERROR: 1001,
  NETWORK_ERROR: 1002,

  // 参数错误 2xxx
  INVALID_PARAMS: 2000,
  MISSING_PARAM: 2001,
  INVALID_FORMAT: 2002,

  // 业务错误 3xxx
  USER_NOT_FOUND: 3001,
  USER_ALREADY_EXISTS: 3002,
  INVALID_PASSWORD: 3003,
  TOKEN_EXPIRED: 3004,
  NO_PERMISSION: 3005
}

module.exports = { ErrorCodes }
```

### 统一错误处理中间件

```javascript
// middleware/error-handler.js
const errorHandler = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.error('Error:', err)

    // 自定义业务错误
    if (err.code) {
      ctx.status = err.status || 400
      ctx.body = {
        code: err.code,
        message: err.message,
        data: null
      }
      return
    }

    // 数据库错误
    if (err.code === 'ER_DUP_ENTRY') {
      ctx.status = 400
      ctx.body = {
        code: 3002,
        message: '数据已存在',
        data: null
      }
      return
    }

    // 其他未处理错误
    ctx.status = 500
    ctx.body = {
      code: 1000,
      message: process.env.NODE_ENV === 'production' ? '系统错误' : err.message,
      data: null
    }
  }
}

module.exports = errorHandler
```

### 自定义错误类

```javascript
// utils/custom-error.js
class CustomError extends Error {
  constructor(code, message, status = 400) {
    super(message)
    this.code = code
    this.status = status
    this.name = 'CustomError'
  }
}

class NotFoundError extends CustomError {
  constructor(message = '资源不存在') {
    super(3001, message, 404)
    this.name = 'NotFoundError'
  }
}

class BadRequestError extends CustomError {
  constructor(message = '请求参数错误') {
    super(2000, message, 400)
    this.name = 'BadRequestError'
  }
}

module.exports = {
  CustomError,
  NotFoundError,
  BadRequestError
}
```

## 安全规范

### 输入验证

```javascript
// 使用 Joi 或 Yup 进行参数验证
const Joi = require('joi')

const userSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).required(),
  age: Joi.number().integer().min(18).max(120).optional()
})

async function createUser(ctx) {
  const { error, value } = userSchema.validate(ctx.request.body)

  if (error) {
    return ctx.error(400, error.details[0].message)
  }

  // 使用验证后的 value
  const user = await userService.createUser(value)
  return ctx.success(user)
}
```

### SQL 注入防护

```javascript
// 使用参数化查询
// 推荐
const user = await db.query('SELECT * FROM users WHERE id = ?', [id])

// 不推荐 - 容易发生 SQL 注入
const user = await db.query(`SELECT * FROM users WHERE id = ${id}`)

// 使用 ORM
const user = await User.findOne({ where: { id } })
```

### XSS 防护

```javascript
// 对用户输入进行转义
const escapeHtml = (str) => {
  return str.replace(/[&<>"']/g, (tag) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[tag]))
}

// 或使用专业的库
const xss = require('xss')
const safeHtml = xss(userInput)
```

### 敏感数据处理

```javascript
// 密码加密
const bcrypt = require('bcrypt')

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword)
}

// Token 生成与验证
const jwt = require('jsonwebtoken')

function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '24h'
  })
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET)
}

// 敏感字段不返回
const { password, salt, ...safeUser } = user
```

## 日志规范

### 日志级别

```javascript
const logger = {
  error: (msg, meta) => {
    // 错误级别：系统错误、异常
    console.error(`[ERROR] ${new Date().toISOString()} - ${msg}`, meta)
  },
  warn: (msg, meta) => {
    // 警告级别：业务异常、可恢复的错误
    console.warn(`[WARN] ${new Date().toISOString()} - ${msg}`, meta)
  },
  info: (msg, meta) => {
    // 信息级别：关键业务流程
    console.info(`[INFO] ${new Date().toISOString()} - ${msg}`, meta)
  },
  debug: (msg, meta) => {
    // 调试级别：开发调试信息
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[DEBUG] ${new Date().toISOString()} - ${msg}`, meta)
    }
  }
}
```

### 日志内容

```javascript
// 请求日志
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const duration = Date.now() - start

  logger.info('HTTP Request', {
    method: ctx.method,
    url: ctx.url,
    status: ctx.status,
    duration: `${duration}ms`,
    ip: ctx.ip
  })
})

// 业务日志
logger.info('User Login', {
  userId: user.id,
  ip: ctx.ip,
  userAgent: ctx.get('user-agent')
})

// 错误日志
logger.error('Database Error', {
  error: err.message,
  stack: err.stack,
  query: err.sql
})
```

## 配置管理

### 环境变量

```javascript
// config/.env.development
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=myapp_dev
REDIS_HOST=localhost
REDIS_PORT=6379

// config/.env.production
NODE_ENV=production
PORT=8080
DB_HOST=prod-db.example.com
DB_PORT=3306
DB_NAME=myapp_prod
REDIS_HOST=prod-redis.example.com
REDIS_PORT=6379
```

### 配置文件

```javascript
// config/index.js
require('dotenv').config()

module.exports = {
  // 应用配置
  app: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development'
  },

  // 数据库配置
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'myapp'
  },

  // Redis 配置
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || ''
  },

  // JWT 配置
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  }
}
```

## 性能优化规范

### 数据库优化

```javascript
// 使用连接池
const pool = mysql.createPool({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0
})

// 批量操作
async function createUsers(users) {
  // 推荐 - 批量插入
  await db.query('INSERT INTO users (name, email) VALUES ?', [
    users.map(u => [u.name, u.email])
  ])

  // 不推荐 - 循环插入
  for (const user of users) {
    await db.query('INSERT INTO users SET ?', user)
  }
}

// 分页查询
async function getUsers(page = 1, pageSize = 10) {
  const offset = (page - 1) * pageSize
  const list = await db.query(
    'SELECT * FROM users LIMIT ? OFFSET ?',
    [pageSize, offset]
  )
  const total = await db.query('SELECT COUNT(*) as total FROM users')
  return { list, total: total[0].total }
}
```

### 缓存策略

```javascript
// Redis 缓存封装
const redis = require('redis')
const client = redis.createClient(config.redis)

class CacheService {
  // 获取缓存
  async get(key) {
    const data = await client.get(key)
    return data ? JSON.parse(data) : null
  }

  // 设置缓存
  async set(key, value, ttl = 3600) {
    await client.setex(key, ttl, JSON.stringify(value))
  }

  // 删除缓存
  async del(key) {
    await client.del(key)
  }

  // 获取或设置
  async getOrSet(key, fn, ttl = 3600) {
    let data = await this.get(key)
    if (!data) {
      data = await fn()
      await this.set(key, data, ttl)
    }
    return data
  }
}

// 使用示例
async function getUserById(id) {
  const cacheKey = `user:${id}`
  return await cacheService.getOrSet(
    cacheKey,
    async () => await userRepository.findById(id),
    3600
  )
}
```

## 测试规范

### 单元测试

```javascript
// test/service/user.test.js
const { expect } = require('chai')
const userService = require('../../service/user.service')

describe('UserService', () => {
  describe('getUserById', () => {
    it('should return user when valid id provided', async () => {
      const user = await userService.getUserById(1)
      expect(user).to.be.an('object')
      expect(user.id).to.equal(1)
    })

    it('should return null when user not found', async () => {
      const user = await userService.getUserById(99999)
      expect(user).to.be.null
    })

    it('should throw error when invalid id provided', async () => {
      try {
        await userService.getUserById(-1)
        expect.fail('Should throw error')
      } catch (err) {
        expect(err.message).to.equal('无效的用户ID')
      }
    })
  })
})
```

### API 测试

```javascript
// test/api/user.test.js
const request = require('supertest')
const app = require('../../app')

describe('User API', () => {
  describe('GET /api/users/:id', () => {
    it('should return user when valid id', async () => {
      const res = await request(app)
        .get('/api/users/1')
        .expect(200)

      expect(res.body.code).to.equal(0)
      expect(res.body.data).to.be.an('object')
      expect(res.body.data.id).to.equal(1)
    })

    it('should return 404 when user not found', async () => {
      const res = await request(app)
        .get('/api/users/99999')
        .expect(200)

      expect(res.body.code).to.equal(3001)
    })
  })
})
```

## 文档规范

### API 文档

使用 Swagger/OpenAPI 规范编写 API 文档：

```javascript
// swagger.js
const swaggerJsdoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '用户管理 API',
      version: '1.0.0',
      description: '用户管理系统接口文档'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: '开发环境'
      },
      {
        url: 'https://api.example.com',
        description: '生产环境'
      }
    ]
  },
  apis: ['./routes/*.js']
}

const swaggerSpec = swaggerJsdoc(options)
```

```javascript
// routes/user.routes.js
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: 获取用户信息
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 用户ID
 *     responses:
 *       200:
 *         description: 成功返回用户信息
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: 用户不存在
 */
router.get('/users/:id', userController.getUser)
```

### 代码注释规范

```javascript
/**
 * 用户服务类
 * @class UserService
 * @description 提供用户相关的业务逻辑处理
 */
class UserService {
  /**
   * 根据ID获取用户信息
   * @async
   * @param {number} id - 用户ID
   * @returns {Promise<Object|null>} 用户对象或null
   * @throws {Error} 当ID无效时抛出错误
   * @example
   * const user = await userService.getUserById(1)
   */
  async getUserById(id) {
    // 实现代码...
  }
}
```

## Git 工作规范

### 分支管理

```
main          # 主分支，生产环境代码
develop       # 开发分支
feature/*     # 功能分支
hotfix/*      # 紧急修复分支
release/*     # 发布分支
```

### Commit 规范

遵循 Conventional Commits 规范：

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type 类型：**

| 类型 | 说明 | 示例 |
|------|------|------|
| feat | 新功能 | feat(user): 添加用户注册功能 |
| fix | 修复bug | fix(login): 修复登录token过期问题 |
| docs | 文档更新 | docs(api): 更新API文档 |
| style | 代码格式调整 | style: 统一代码缩进 |
| refactor | 重构代码 | refactor(service): 重构用户服务层 |
| test | 测试相关 | test(user): 添加用户模块测试 |
| chore | 构建/工具变动 | chore: 更新依赖包版本 |

**示例：**

```bash
feat(user): 添加用户头像上传功能

- 支持图片上传
- 添加图片大小限制
- 自动生成缩略图

Closes #123
```

### 代码审查清单

**功能审查：**
- [ ] 代码实现符合需求
- [ ] 边界条件处理完整
- [ ] 错误处理完善

**代码质量：**
- [ ] 命名清晰易懂
- [ ] 逻辑简洁明了
- [ ] 无重复代码
- [ ] 符合项目规范

**安全性：**
- [ ] 无SQL注入风险
- [ ] 无XSS漏洞
- [ ] 敏感数据已加密
- [ ] 权限验证完整

**测试：**
- [ ] 单元测试覆盖充分
- [ ] API测试通过
- [ ] 手动测试验证

## 部署规范

### 环境配置

```javascript
// docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
      - redis

  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_PASSWORD}
      MYSQL_DATABASE: ${DB_NAME}
    volumes:
      - db_data:/var/lib/mysql

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  db_data:
  redis_data:
```

### 健康检查

```javascript
// health check 端点
router.get('/health', async (ctx) => {
  const checks = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {}
  }

  // 检查数据库连接
  try {
    await db.query('SELECT 1')
    checks.services.database = 'ok'
  } catch (err) {
    checks.services.database = 'error'
    checks.status = 'error'
  }

  // 检查 Redis 连接
  try {
    await redis.ping()
    checks.services.redis = 'ok'
  } catch (err) {
    checks.services.redis = 'error'
    checks.status = 'error'
  }

  const status = checks.status === 'ok' ? 200 : 503
  ctx.status = status
  ctx.body = checks
})
```

### 优雅关闭

```javascript
// 优雅关闭处理
const server = app.listen(config.app.port)

const gracefulShutdown = async (signal) => {
  console.log(`Received ${signal}, closing server gracefully...`)

  // 停止接收新请求
  server.close(async () => {
    console.log('HTTP server closed')

    // 关闭数据库连接
    await db.end()

    // 关闭 Redis 连接
    await redis.quit()

    console.log('All connections closed. Exiting...')
    process.exit(0)
  })

  // 强制退出超时
  setTimeout(() => {
    console.error('Forced exit after timeout')
    process.exit(1)
  }, 10000)
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
process.on('SIGINT', () => gracefulShutdown('SIGINT'))
```

## 最佳实践总结

### DO's 推荐做法

1. **使用环境变量管理配置**
   ```javascript
   const config = {
     port: process.env.PORT || 3000
   }
   ```

2. **使用异步/await处理异步**
   ```javascript
   const user = await getUserById(id)
   ```

3. **统一的错误处理**
   ```javascript
   try {
     await operation()
   } catch (err) {
     handleError(err)
   }
   ```

4. **使用参数化查询**
   ```javascript
   db.query('SELECT * FROM users WHERE id = ?', [id])
   ```

5. **添加必要的日志**
   ```javascript
   logger.info('Operation completed', { userId, result })
   ```

### DON'Ts 避免做法

1. **不要硬编码配置**
   ```javascript
   // 避免
   const apiUrl = 'https://api.example.com'

   // 推荐
   const apiUrl = process.env.API_URL
   ```

2. **不要嵌套过深**
   ```javascript
   // 避免
   async(() => {
     async(() => {
       async(() => {
         // 太深了
       })
     })
   })
   ```

3. **不要忽略错误处理**
   ```javascript
   // 避免
   getUserById(id)

   // 推荐
   try {
     await getUserById(id)
   } catch (err) {
     // 处理错误
   }
   ```

4. **不要在循环中查询数据库**
   ```javascript
   // 避免
   for (const id of ids) {
     await getUserById(id)
   }

   // 推荐
   await getUsersByIds(ids)
   ```

5. **不要返回敏感信息**
   ```javascript
   // 避免
   return user

   // 推荐
   const { password, ...safeUser } = user
   return safeUser
   ```
