---
sidebar_position: 5
title: 后端开发知识体系
---

# 后端开发知识体系

## 编程语言

### JavaScript/Node.js

#### 核心概念

Node.js 是基于 Chrome V8 引擎的 JavaScript 运行时，具有事件驱动、非阻塞 I/O 的特点。

```javascript
// 事件循环
console.log('1. Start')

setTimeout(() => {
  console.log('2. Timeout')
}, 0)

Promise.resolve().then(() => {
  console.log('3. Promise')
})

console.log('4. End')

// 输出顺序: 1 -> 4 -> 3 -> 2
```

#### 模块系统

```javascript
// CommonJS (Node.js 默认)
const fs = require('fs')
const path = require('path')

module.exports = {
  myFunction
}

// ES Modules
import fs from 'fs'
import path from 'path'

export {
  myFunction
}

export default myClass
```

#### 异步编程

```javascript
// 回调函数
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err
  console.log(data)
})

// Promise
fs.promises.readFile('file.txt', 'utf8')
  .then(data => console.log(data))
  .catch(err => console.error(err))

// Async/Await
async function readFile() {
  try {
    const data = await fs.promises.readFile('file.txt', 'utf8')
    console.log(data)
  } catch (err) {
    console.error(err)
  }
}
```

#### Stream 流处理

```javascript
const fs = require('fs')

// 读取流
const readStream = fs.createReadStream('input.txt')

// 写入流
const writeStream = fs.createWriteStream('output.txt')

// 管道操作
readStream.pipe(writeStream)

// Transform 流
const { Transform } = require('stream')

const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase())
    callback()
  }
})

readStream.pipe(upperCaseTransform).pipe(writeStream)
```

### Java

#### 核心特性

Java 是强类型、面向对象的编程语言，具有跨平台特性。

```java
// 基本数据类型
int age = 25;
double price = 99.99;
boolean isActive = true;
String name = "John";

// 类定义
public class User {
    private String name;
    private int age;

    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Getter/Setter
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

#### 集合框架

```java
import java.util.*;

// List
List<String> list = new ArrayList<>();
list.add("Apple");
list.add("Banana");

// Map
Map<String, Integer> map = new HashMap<>();
map.put("John", 25);
map.put("Jane", 30);

// Set
Set<Integer> set = new HashSet<>();
set.add(1);
set.add(2);
```

#### 多线程

```java
// 继承 Thread 类
public class MyThread extends Thread {
    public void run() {
        System.out.println("Thread is running");
    }
}

// 实现 Runnable 接口
public class MyRunnable implements Runnable {
    public void run() {
        System.out.println("Runnable is running");
    }
}

// 线程池
ExecutorService executor = Executors.newFixedThreadPool(10);
executor.submit(new MyRunnable());
```

### Python

#### 基础语法

```python
# 变量赋值
name = "John"
age = 25
is_active = True

# 列表
fruits = ["apple", "banana", "cherry"]
fruits.append("orange")

# 字典
user = {
    "name": "John",
    "age": 25,
    "city": "New York"
}

# 函数定义
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"
```

#### 装饰器

```python
# 简单装饰器
def my_decorator(func):
    def wrapper():
        print("Before function call")
        func()
        print("After function call")
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")

# 带参数的装饰器
def repeat(times):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def say_hi():
    print("Hi!")
```

#### 异步编程

```python
import asyncio

async def fetch_data():
    print("Start fetching")
    await asyncio.sleep(2)  # 模拟 IO 操作
    print("Done fetching")
    return {"data": "some data"}

async def main():
    task1 = asyncio.create_task(fetch_data())
    task2 = asyncio.create_task(fetch_data())

    await task1
    await task2

# 运行异步代码
asyncio.run(main())
```

### Go

#### 基础语法

```go
package main

import "fmt"

// 变量声明
var name string = "John"
age := 25

// 数组与切片
numbers := [5]int{1, 2, 3, 4, 5}  // 数组
slice := []int{1, 2, 3, 4, 5}    // 切片

// Map
user := map[string]interface{}{
    "name": "John",
    "age":  25,
}

// 函数
func add(a, b int) int {
    return a + b
}

// 多返回值
func divide(a, b int) (int, error) {
    if b == 0 {
        return 0, fmt.Errorf("division by zero")
    }
    return a / b, nil
}
```

#### Goroutine 并发

```go
// Goroutine
func sayHello() {
    fmt.Println("Hello from goroutine")
}

func main() {
    go sayHello()  // 启动 goroutine
    time.Sleep(time.Second)
}

// Channel 通信
func worker(ch chan int) {
    for {
        num := <-ch
        fmt.Println("Received:", num)
    }
}

func main() {
    ch := make(chan int)
    go worker(ch)

    ch <- 1
    ch <- 2
    time.Sleep(time.Second)
}
```

## 数据库

### MySQL

#### 基础操作

```sql
-- 创建数据库
CREATE DATABASE myapp DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 使用数据库
USE myapp;

-- 创建表
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    age TINYINT UNSIGNED DEFAULT 0,
    status TINYINT UNSIGNED DEFAULT 1 COMMENT '1:active, 0:inactive',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

#### 查询语句

```sql
-- 基础查询
SELECT * FROM users WHERE id = 1;

-- 条件查询
SELECT * FROM users WHERE age > 18 AND status = 1;

-- 模糊查询
SELECT * FROM users WHERE username LIKE '%john%';

-- 排序
SELECT * FROM users ORDER BY created_at DESC LIMIT 10;

-- 分组统计
SELECT status, COUNT(*) as count FROM users GROUP BY status;

-- 关联查询
SELECT u.*, o.order_count
FROM users u
LEFT JOIN (
    SELECT user_id, COUNT(*) as order_count
    FROM orders
    GROUP BY user_id
) o ON u.id = o.user_id;
```

#### 索引优化

```sql
-- 查看索引
SHOW INDEX FROM users;

-- 添加索引
ALTER TABLE users ADD INDEX idx_age_status (age, status);

-- 添加唯一索引
ALTER TABLE users ADD UNIQUE INDEX uk_email (email);

-- 删除索引
ALTER TABLE users DROP INDEX idx_age_status;

-- 查看执行计划
EXPLAIN SELECT * FROM users WHERE username = 'john';
```

#### 事务处理

```sql
-- 开启事务
START TRANSACTION;

-- 执行操作
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- 提交事务
COMMIT;

-- 或回滚
-- ROLLBACK;
```

### Redis

#### 数据类型

```bash
# String 字符串
SET user:1:name "John"
GET user:1:name
INCR counter
DECR counter

# Hash 哈希
HSET user:1 name "John" age 25
HGET user:1 name
HGETALL user:1

# List 列表
LPUSH mylist "item1"
RPUSH mylist "item2"
LRANGE mylist 0 -1

# Set 集合
SADD myset "item1" "item2"
SMEMBERS myset

# Sorted Set 有序集合
ZADD myzset 1 "one" 2 "two"
ZRANGE myzset 0 -1 WITHSCORES
```

#### 常用场景

```javascript
// 缓存
await redis.setex(`user:${id}`, 3600, JSON.stringify(userData))

// 分布式锁
async function acquireLock(lockKey, ttl = 10) {
  const result = await redis.set(lockKey, '1', 'NX', 'EX', ttl)
  return result === 'OK'
}

// 限流
async function rateLimit(userId, limit = 10, window = 60) {
  const key = `ratelimit:${userId}`
  const current = await redis.incr(key)
  if (current === 1) {
    await redis.expire(key, window)
  }
  return current <= limit
}

// 计数器
await redis.incr('article:123:views')

// 排行榜
await redis.zadd('ranking', score, userId)
const top10 = await redis.zrevrange('ranking', 0, 9, 'WITHSCORES')
```

### MongoDB

#### 基础操作

```javascript
// 插入文档
db.users.insertOne({
  name: "John",
  age: 25,
  email: "john@example.com",
  createdAt: new Date()
})

// 查询文档
db.users.find({ age: { $gte: 18 } })

// 更新文档
db.users.updateOne(
  { name: "John" },
  { $set: { age: 26 } }
)

// 删除文档
db.users.deleteOne({ name: "John" })
```

#### 聚合查询

```javascript
// 聚合管道
db.orders.aggregate([
  // 匹配条件
  { $match: { status: "completed" } },
  // 按用户分组
  {
    $group: {
      _id: "$userId",
      totalAmount: { $sum: "$amount" },
      count: { $sum: 1 }
    }
  },
  // 排序
  { $sort: { totalAmount: -1 } },
  // 限制结果数量
  { $limit: 10 }
])
```

## Web 框架

### Express.js (Node.js)

#### 基础使用

```javascript
const express = require('express')
const app = express()

// 中间件
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 路由
app.get('/api/users', async (req, res) => {
  const users = await User.findAll()
  res.json({ code: 0, data: users })
})

app.post('/api/users', async (req, res) => {
  const user = await User.create(req.body)
  res.status(201).json({ code: 0, data: user })
})

// 错误处理
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ code: 500, message: err.message })
})

app.listen(3000)
```

#### 中间件开发

```javascript
// 日志中间件
function logger(req, res, next) {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`)
  next()
}

// 认证中间件
function auth(req, res, next) {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ message: '未授权' })
  }

  try {
    const decoded = jwt.verify(token, SECRET)
    req.user = decoded
    next()
  } catch (err) {
    res.status(401).json({ message: 'Token 无效' })
  }
}

// 错误处理中间件
function errorHandler(err, req, res, next) {
  res.status(err.status || 500).json({
    code: err.code || 500,
    message: err.message
  })
}
```

### Koa.js (Node.js)

#### 核心概念

Koa 使用洋葱模型处理中间件：

```javascript
const Koa = require('koa')
const app = new Koa()

// 中间件1
app.use(async (ctx, next) => {
  console.log('1. 请求进入')
  await next()
  console.log('1. 响应返回')
})

// 中间件2
app.use(async (ctx, next) => {
  console.log('2. 请求进入')
  await next()
  console.log('2. 响应返回')
})

// 路由中间件
app.use(async (ctx, next) => {
  console.log('3. 处理业务逻辑')
  ctx.body = { message: 'Hello Koa' }
})

// 执行顺序: 1进 -> 2进 -> 3处理 -> 2出 -> 1出
```

#### 路由与控制器

```javascript
const Router = require('@koa/router')
const router = new Router()

router.get('/users', async (ctx) => {
  const users = await User.findAll()
  ctx.body = { code: 0, data: users }
})

router.get('/users/:id', async (ctx) => {
  const user = await User.findById(ctx.params.id)
  ctx.body = { code: 0, data: user }
})

router.post('/users', async (ctx) => {
  const user = await User.create(ctx.request.body)
  ctx.body = { code: 0, data: user }
})

app.use(router.routes())
```

### Spring Boot (Java)

#### 基础配置

```java
// Controller
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public Result<List<User>> list() {
        List<User> users = userService.findAll();
        return Result.success(users);
    }

    @GetMapping("/{id}")
    public Result<User> getById(@PathVariable Long id) {
        User user = userService.findById(id);
        return Result.success(user);
    }

    @PostMapping
    public Result<User> create(@RequestBody User user) {
        User created = userService.save(user);
        return Result.success(created);
    }
}

// Service
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("用户不存在"));
    }
}

// Repository
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
```

### Gin (Go)

#### 基础使用

```go
package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

type User struct {
    ID   uint   `json:"id"`
    Name string `json:"name"`
}

func main() {
    r := gin.Default()

    // 中间件
    r.Use(func(c *gin.Context) {
        c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
        c.Next()
    })

    // 路由组
    api := r.Group("/api")
    {
        api.GET("/users", getUsers)
        api.GET("/users/:id", getUser)
        api.POST("/users", createUser)
    }

    r.Run(":8080")
}

func getUsers(c *gin.Context) {
    users := []User{{ID: 1, Name: "John"}}
    c.JSON(http.StatusOK, gin.H{"code": 0, "data": users})
}

func getUser(c *gin.Context) {
    id := c.Param("id")
    // 查询用户...
    c.JSON(http.StatusOK, gin.H{"code": 0, "data": User{ID: 1, Name: "John"}})
}

func createUser(c *gin.Context) {
    var user User
    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"code": 400, "message": err.Error()})
        return
    }
    // 创建用户...
    c.JSON(http.StatusCreated, gin.H{"code": 0, "data": user})
}
```

### FastAPI (Python)

#### 基础使用

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

# 数据模型
class UserBase(BaseModel):
    name: str
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        orm_mode = True

# 路由
@app.get("/users", response_model=List[User])
async def get_users(skip: int = 0, limit: int = 10):
    users = db.query(User).offset(skip).limit(limit).all()
    return users

@app.get("/users/{user_id}", response_model=User)
async def get_user(user_id: int):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="用户不存在")
    return user

@app.post("/users", response_model=User, status_code=201)
async def create_user(user: UserCreate):
    # 创建用户逻辑
    db_user = User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
```

## API 设计

### RESTful API

#### 设计原则

1. 使用名词表示资源
2. 使用 HTTP 方法表示操作
3. 使用 HTTP 状态码表示结果
4. 实现幂等性（GET、PUT、DELETE）

#### URL 设计

```
GET    /users          # 获取用户列表
GET    /users/{id}     # 获取单个用户
POST   /users          # 创建用户
PUT    /users/{id}     # 更新用户
PATCH  /users/{id}     # 部分更新用户
DELETE /users/{id}     # 删除用户

# 嵌套资源
GET    /users/{id}/posts           # 获取用户的文章
POST   /users/{id}/posts           # 为用户创建文章
GET    /posts/{id}/comments        # 获取文章的评论
```

### GraphQL

#### 基础概念

```graphql
# 定义类型
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
}

type Query {
  user(id: ID!): User
  users(limit: Int, offset: Int): [User!]!
}

type Mutation {
  createUser(name: String!, email: String!): User!
  updateUser(id: ID!, name: String): User!
}
```

#### 查询示例

```graphql
# 查询
query GetUser($id: ID!) {
  user(id: $id) {
    id
    name
    email
    posts {
      id
      title
    }
  }
}

# 变更
mutation CreateUser($name: String!, $email: String!) {
  createUser(name: $name, email: $email) {
    id
    name
    email
  }
}
```

## 认证与授权

### JWT 认证

```javascript
const jwt = require('jsonwebtoken')

// 生成 Token
function generateToken(user) {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  )
}

// 验证 Token
function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (err) {
    return null
  }
}

// 刷新 Token
function refreshToken(token) {
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  delete decoded.iat
  delete decoded.exp
  return jwt.sign(decoded, process.env.JWT_SECRET, { expiresIn: '24h' })
}
```

### OAuth 2.0

#### 授权码模式

```javascript
// 1. 重定向到授权页面
app.get('/auth/github', (req, res) => {
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`
  res.redirect(authUrl)
})

// 2. 接收回调
app.get('/auth/github/callback', async (req, res) => {
  const { code } = req.query

  // 3. 获取 access_token
  const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: code
  })

  const accessToken = tokenResponse.data.access_token

  // 4. 获取用户信息
  const userResponse = await axios.get('https://api.github.com/user', {
    headers: { Authorization: `Bearer ${accessToken}` }
  })

  // 5. 创建或更新用户
  const user = await upsertUser(userResponse.data)

  // 6. 生成 JWT
  const token = generateToken(user)

  res.json({ token, user })
})
```

### RBAC 权限控制

```javascript
// 角色定义
const Roles = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest'
}

// 权限定义
const Permissions = {
  USER_READ: 'user:read',
  USER_WRITE: 'user:write',
  POST_READ: 'post:read',
  POST_WRITE: 'post:write'
}

// 角色权限映射
const RolePermissions = {
  [Roles.ADMIN]: [
    Permissions.USER_READ,
    Permissions.USER_WRITE,
    Permissions.POST_READ,
    Permissions.POST_WRITE
  ],
  [Roles.USER]: [
    Permissions.USER_READ,
    Permissions.POST_READ,
    Permissions.POST_WRITE
  ],
  [Roles.GUEST]: [
    Permissions.POST_READ
  ]
}

// 权限检查中间件
function checkPermission(permission) {
  return (req, res, next) => {
    const user = req.user
    const permissions = RolePermissions[user.role] || []

    if (permissions.includes(permission)) {
      next()
    } else {
      res.status(403).json({ message: '权限不足' })
    }
  }
}

// 使用
router.get('/users', checkPermission(Permissions.USER_READ), getUsers)
router.post('/users', checkPermission(Permissions.USER_WRITE), createUser)
```

## 消息队列

### RabbitMQ

#### 基础使用

```javascript
const amqp = require('amqplib')

// 生产者
async function sendMessage(queue, message) {
  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createChannel()

  await channel.assertQueue(queue, { durable: true })
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)))

  setTimeout(() => connection.close(), 500)
}

// 消费者
async function consumeMessages(queue, handler) {
  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createChannel()

  await channel.assertQueue(queue, { durable: true })
  channel.prefetch(1)

  channel.consume(queue, async (msg) => {
    try {
      const content = JSON.parse(msg.content.toString())
      await handler(content)
      channel.ack(msg)
    } catch (err) {
      channel.nack(msg, false, false)
    }
  })
}
```

### Kafka

#### 基础使用

```javascript
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
})

// 生产者
const producer = kafka.producer()

async function sendMessage(topic, message) {
  await producer.connect()
  await producer.send({
    topic: topic,
    messages: [{ value: JSON.stringify(message) }]
  })
  await producer.disconnect()
}

// 消费者
const consumer = kafka.consumer({ groupId: 'test-group' })

async function consumeMessages(topic, handler) {
  await consumer.connect()
  await consumer.subscribe({ topic: topic, fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = JSON.parse(message.value.toString())
      await handler(value)
    }
  })
}
```

## 微服务架构

### 服务注册与发现

```javascript
// consul 服务注册
const Consul = require('consul')

const consul = new Consul({
  host: 'localhost',
  port: 8500
})

// 注册服务
async function registerService() {
  await consul.agent.service.register({
    name: 'user-service',
    address: 'localhost',
    port: 3000,
    check: {
      http: 'http://localhost:3000/health',
      interval: '10s'
    }
  })
}

// 发现服务
async function discoverService(serviceName) {
  const services = await consul.agent.service.list()
  const instances = Object.values(services)
    .filter(s => s.Service === serviceName)

  return instances[Math.floor(Math.random() * instances.length)]
}
```

### 服务间通信

```javascript
// REST 通信
const axios = require('axios')
const consul = require('consul')()

async function callService(serviceName, path, data) {
  const instances = await consul.agent.service.list()
  const service = Object.values(instances).find(s => s.Service === serviceName)

  const url = `http://${service.Address}:${service.Port}${path}`
  const response = await axios.post(url, data)

  return response.data
}

// gRPC 通信
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const packageDefinition = protoLoader.loadSync('user.proto')
const userProto = grpc.loadPackageDefinition(packageDefinition).user

const client = new userProto.UserService(
  'localhost:50051',
  grpc.credentials.createInsecure()
)

client.getUser({ id: 1 }, (err, response) => {
  console.log(response)
})
```

## 性能优化

### 数据库优化

```sql
-- 添加索引
CREATE INDEX idx_user_email ON users(email);

-- 使用覆盖索引
CREATE INDEX idx_user_covering ON users(name, age, email);

-- 分区表
CREATE TABLE orders (
    id BIGINT,
    created_at DATETIME,
    -- ...
) PARTITION BY RANGE (YEAR(created_at)) (
    PARTITION p2020 VALUES LESS THAN (2021),
    PARTITION p2021 VALUES LESS THAN (2022),
    PARTITION p2022 VALUES LESS THAN (2023)
);

-- 读写分离
-- 主库写，从库读
```

### 缓存策略

```javascript
// 多级缓存
async function getUser(id) {
  // L1: 内存缓存
  let user = memoryCache.get(`user:${id}`)
  if (user) return user

  // L2: Redis 缓存
  user = await redis.get(`user:${id}`)
  if (user) {
    memoryCache.set(`user:${id}`, user)
    return JSON.parse(user)
  }

  // L3: 数据库
  user = await db.query('SELECT * FROM users WHERE id = ?', [id])

  // 回写缓存
  await redis.setex(`user:${id}`, 3600, JSON.stringify(user))
  memoryCache.set(`user:${id}`, user)

  return user
}
```

### 连接池

```javascript
// 数据库连接池
const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'myapp',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

// Redis 连接池
const redis = require('redis')

const redisPool = redis.createClient({
  host: 'localhost',
  port: 6379,
  maxRetriesPerRequest: 3,
  enableReadyCheck: true
})
```

## 监控与日志

### 日志收集

```javascript
const winston = require('winston')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }))
}
```

### 性能监控

```javascript
// Prometheus 指标
const promClient = require('prom-client')

const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'code']
})

app.use((req, res, next) => {
  const start = Date.now()

  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000
    httpRequestDuration
      .labels(req.method, req.route?.path || req.path, res.statusCode)
      .observe(duration)
  })

  next()
})
```

以上是后端开发的核心知识体系，涵盖了编程语言、数据库、框架、API 设计、认证授权、消息队列、微服务和性能优化等方面。随着技术的不断发展，需要持续学习和实践。
