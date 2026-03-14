---
sidebar_position: 7
title: Node.js（面试要点）
---

# Node.js 面试要点

## 目录
- [Node.js的Event Loop是怎样的？](#1-nodejs的event-loop是怎样的)
- [Node.js多进程架构模型](#2-nodejs多进程架构模型)
- [Node.js内存泄漏排查](#3-nodejs内存泄漏排查)
- [Node.js的C++插件开发](#4-nodejs的c插件开发)
- [Node.js子进程与进程间通信](#5-nodejs子进程与进程间通信)
- [Node.js模块加载机制与二进制模块](#6-nodejs模块加载机制与二进制模块)
- [脚手架CLI开发流程](#7-脚手架cli开发流程)
- [文件遍历查找实现](#8-文件遍历查找实现)
- [文件上传处理](#9-文件上传处理)

---

## 1. Node.js的Event Loop是怎样的？

### Event Loop 基础

Node.js 的 Event Loop 是基于 libuv 实现的，允许 Node.js 执行非阻塞 I/O 操作。

```
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```

### 各阶段详解

```javascript
// 1. timers 阶段：执行 setTimeout 和 setInterval 回调
setTimeout(() => {
  console.log('timer');
}, 0);

// 2. pending callbacks 阶段：执行延迟到下一个循环的 I/O 回调

// 3. idle, prepare 阶段：内部使用

// 4. poll 阶段：获取新的 I/O 事件
// - 执行 I/O 回调
// - 当 poll 队列为空时，检查是否有 setImmediate

// 5. check 阶段：执行 setImmediate 回调
setImmediate(() => {
  console.log('immediate');
});

// 6. close callbacks 阶段：执行 close 事件回调
server.on('close', () => {
  console.log('server closed');
});
```

### 微任务队列

```javascript
// 微任务包括：process.nextTick 和 Promise.then/catch/finally

console.log('1. Start');

setTimeout(() => console.log('2. setTimeout'), 0);

setImmediate(() => console.log('3. setImmediate'));

Promise.resolve().then(() => {
  console.log('4. Promise 1');
  process.nextTick(() => console.log('5. nextTick 2'));
});

process.nextTick(() => {
  console.log('6. nextTick 1');
  Promise.resolve().then(() => console.log('7. Promise 2'));
});

console.log('8. End');

// 输出顺序：
// 1. Start
// 8. End
// 6. nextTick 1
// 7. Promise 2
// 4. Promise 1
// 5. nextTick 2
// 2. setTimeout
// 3. setImmediate
```

### process.nextTick vs Promise

```javascript
// process.nextTick 优先级高于 Promise
process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('Promise'));

// 输出：nextTick -> Promise
```

### setTimeout vs setImmediate

```javascript
// 在 I/O 回调中，setImmediate 总是先于 setTimeout
const fs = require('fs');

fs.readFile('file.txt', () => {
  setTimeout(() => console.log('timeout'), 0);
  setImmediate(() => console.log('immediate'));
  // 输出：immediate -> timeout
});

// 在主模块中，执行顺序不确定
setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));
// 可能：timeout -> immediate 或 immediate -> timeout
```

---

## 2. Node.js多进程架构模型

### 为什么需要多进程

Node.js 是单线程的，无法利用多核 CPU，多进程可以：
- 充分利用多核 CPU
- 实现负载均衡
- 提高应用可用性
- 隔离故障

### Cluster 模块

```javascript
const cluster = require('cluster');
const http = require('http');
const os = require('os');

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    // 自动重启
    cluster.fork();
  });
} else {
  // Workers 共享同一个 TCP 连接
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello World\n');
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}
```

### PM2 进程管理

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'my-app',
    script: './app.js',
    instances: 'max',  // 或指定数量：4
    exec_mode: 'cluster',
    watch: true,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    },
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    merge_logs: true
  }]
};
```

### 进程间通信（IPC）

```javascript
// master.js
const cluster = require('cluster');

if (cluster.isMaster) {
  const worker = cluster.fork();

  // 发送消息给 worker
  worker.send({ cmd: 'start', data: 'some data' });

  // 接收 worker 消息
  worker.on('message', (msg) => {
    console.log('Master received:', msg);
  });
}

// worker.js
process.on('message', (msg) => {
  console.log('Worker received:', msg);

  // 回复 master
  process.send({ result: 'done' });
});
```

### 工作进程池

```javascript
const { Worker } = require('worker_threads');
const os = require('os');

class WorkerPool {
  constructor(workerScript, poolSize = os.cpus().length) {
    this.workerScript = workerScript;
    this.poolSize = poolSize;
    this.workers = [];
    this.queue = [];
    this.activeWorkers = new Map();

    this.initialize();
  }

  initialize() {
    for (let i = 0; i < this.poolSize; i++) {
      this.addWorker();
    }
  }

  addWorker() {
    const worker = new Worker(this.workerScript);

    worker.on('message', (result) => {
      const { resolve } = this.activeWorkers.get(worker);
      this.activeWorkers.delete(worker);
      resolve(result);
      this.processQueue();
    });

    worker.on('error', (error) => {
      const { reject } = this.activeWorkers.get(worker);
      this.activeWorkers.delete(worker);
      reject(error);
      this.processQueue();
    });

    this.workers.push(worker);
  }

  execute(data) {
    return new Promise((resolve, reject) => {
      this.queue.push({ data, resolve, reject });
      this.processQueue();
    });
  }

  processQueue() {
    if (this.queue.length === 0) return;

    const availableWorker = this.workers.find(
      w => !this.activeWorkers.has(w)
    );

    if (!availableWorker) return;

    const { data, resolve, reject } = this.queue.shift();
    this.activeWorkers.set(availableWorker, { resolve, reject });
    availableWorker.postMessage(data);
  }

  terminate() {
    return Promise.all(this.workers.map(w => w.terminate()));
  }
}

// 使用
const pool = new WorkerPool('./calculation-worker.js', 4);
const result = await pool.execute({ n: 35 });
```

---

## 3. Node.js内存泄漏排查

### 常见内存泄漏原因

```javascript
// 1. 全局变量
function leak() {
  global.leakedData = new Array(1000000).fill('leak');
}

// 2. 闭包引用
function createClosure() {
  const largeData = new Array(1000000).fill('data');

  return function() {
    // 即使不使用 largeData，也会被保留在内存中
    console.log('closure');
  };
}

// 3. 事件监听器未移除
class Emitter {
  constructor() {
    this.emitter = new EventEmitter();
    // 错误：无限添加监听器
    this.emitter.on('data', this.handleData);
  }
}

// 4. 定时器未清理
function startTimer() {
  setInterval(() => {
    console.log('tick');
  }, 1000);
  // 没有清除定时器
}

// 5. 缓存无限增长
class Cache {
  constructor() {
    this.data = new Map();
  }

  set(key, value) {
    // 没有大小限制和淘汰策略
    this.data.set(key, value);
  }
}
```

### 内存监控

```javascript
// 查看内存使用情况
function logMemoryUsage() {
  const usage = process.memoryUsage();

  console.log({
    rss: `${(usage.rss / 1024 / 1024).toFixed(2)} MB`,      // 常驻内存
    heapTotal: `${(usage.heapTotal / 1024 / 1024).toFixed(2)} MB`, // V8总堆内存
    heapUsed: `${(usage.heapUsed / 1024 / 1024).toFixed(2)} MB`,   // V8已用堆内存
    external: `${(usage.external / 1024 / 1024).toFixed(2)} MB`,   // C++对象内存
    arrayBuffers: `${(usage.arrayBuffers / 1024 / 1024).toFixed(2)} MB` // Buffer内存
  });
}

// 定期监控
setInterval(logMemoryUsage, 5000);
```

### 使用 heapdump 分析

```javascript
const heapdump = require('heapdump');

// 生成堆快照
app.get('/heapdump', (req, res) => {
  const filename = `./heapdump-${Date.now()}.heapsnapshot`;
  heapdump.writeSnapshot(filename, (err) => {
    if (err) return res.status(500).send(err);
    res.send(`Heap dump written to ${filename}`);
  });
});
```

### 使用 Chrome DevTools

```javascript
// 1. 启动 Node.js 带上 --inspect 参数
// node --inspect-brk app.js

// 2. 在 Chrome 中打开 chrome://inspect
// 3. 点击 "Open dedicated DevTools for Node"
// 4. 使用 Memory 面板进行堆快照分析

// 代码中设置断点
const inspector = require('inspector');
inspector.open(9229, '0.0.0.0');
```

### 使用 clinic.js

```bash
# 安装
npm install -g clinic

# 医生模式：诊断性能问题
clinic doctor -- node app.js

# 火焰图模式：分析 CPU 使用
clinic flame -- node app.js

# Bubbleprof 模式：分析异步流程
clinic bubbleprof -- node app.js

# 堆分析器
clinic heap -- node app.js
```

### 内存泄漏检测代码示例

```javascript
const v8 = require('v8');

class MemoryMonitor {
  constructor(options = {}) {
    this.threshold = options.threshold || 100 * 1024 * 1024; // 100MB
    this.interval = options.interval || 60000; // 60秒
    this.snapshots = [];
    this.start();
  }

  start() {
    setInterval(() => {
      this.checkMemory();
    }, this.interval);
  }

  checkMemory() {
    const usage = process.memoryUsage();
    const heapUsedMB = Math.round(usage.heapUsed / 1024 / 1024);

    console.log(`Heap used: ${heapUsedMB} MB`);

    if (usage.heapUsed > this.threshold) {
      console.warn('Memory threshold exceeded!');
      this.takeSnapshot();
      this.analyzeGrowth();
    }

    this.snapshots.push({
      timestamp: Date.now(),
      heapUsed: usage.heapUsed
    });

    // 保留最近10个快照
    if (this.snapshots.length > 10) {
      this.snapshots.shift();
    }
  }

  analyzeGrowth() {
    if (this.snapshots.length < 2) return;

    const first = this.snapshots[0];
    const last = this.snapshots[this.snapshots.length - 1];
    const growth = last.heapUsed - first.heapUsed;
    const growthMB = Math.round(growth / 1024 / 1024);

    console.log(`Memory growth: ${growthMB} MB over ${this.snapshots.length} checks`);

    if (growth > 0) {
      console.warn('Possible memory leak detected!');
    }
  }

  takeSnapshot() {
    const snapshot = v8.writeHeapSnapshot(`./snapshot-${Date.now()}.heapsnapshot`);
    console.log('Heap snapshot taken:', snapshot);
  }
}

module.exports = MemoryMonitor;
```

---

## 4. Node.js的C++插件开发

### 为什么需要 C++ 插件

- 性能敏感的操作（图像处理、加密解密）
- 调用系统底层 API
- 复用现有的 C/C++ 库
- 计算密集型任务

### 使用 node-addon-api

```cpp
// hello.cc
#include <napi.h>

Napi::String Method(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  return Napi::String::New(env, "Hello from C++");
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "hello"),
              Napi::Function::New(env, Method));
  return exports;
}

NODE_API_MODULE(hello, Init)
```

```json
// binding.gyp
{
  "targets": [
    {
      "target_name": "hello",
      "sources": [ "hello.cc" ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")"
      ],
      "dependencies": [
        "<!(node -p \"require('node-addon-api').gyp\")"
      ],
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ]
    }
  ]
}
```

```javascript
// index.js
const hello = require('./build/Release/hello.node');

console.log(hello.hello()); // 'Hello from C++'
```

### 传递参数和返回值

```cpp
// math.cc
#include <napi.h>

Napi::Number Add(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  // 检查参数数量
  if (info.Length() < 2) {
    Napi::TypeError::New(env, "Wrong number of arguments")
        .ThrowAsJavaScriptException();
    return Napi::Number::New(env, 0);
  }

  // 检查参数类型
  if (!info[0].IsNumber() || !info[1].IsNumber()) {
    Napi::TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
    return Napi::Number::New(env, 0);
  }

  double arg0 = info[0].As<Napi::Number>().DoubleValue();
  double arg1 = info[1].As<Napi::Number>().DoubleValue();

  return Napi::Number::New(env, arg0 + arg1);
}

// 异步操作
class AsyncWorker : public Napi::AsyncWorker {
 public:
  AsyncWorker(Napi::Function& callback, int n)
      : Napi::AsyncWorker(callback), n(n) {}

  void Execute() override {
    // 在 worker 线程执行
    result = Fibonacci(n);
  }

  void OnOK() override {
    // 在主线程执行
    Napi::HandleScope scope(Env());
    Callback().Call({Env().Undefined(), Napi::Number::New(Env(), result)});
  }

 private:
  int n;
  int result;

  int Fibonacci(int n) {
    if (n <= 1) return n;
    return Fibonacci(n - 1) + Fibonacci(n - 2);
  }
};

Napi::Value FibonacciAsync(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  int n = info[0].As<Napi::Number>().Int32Value();
  Napi::Function callback = info[1].As<Napi::Function>();

  AsyncWorker* worker = new AsyncWorker(callback, n);
  worker->Queue();

  return env.Undefined();
}
```

### 使用 node-ffi（调用动态库）

```javascript
const ffi = require('ffi-napi');
const ref = require('ref-napi');

// 调用 C 标准库
const libm = ffi.Library('libm', {
  'ceil': ['double', ['double']],
  'floor': ['double', ['double']]
});

console.log(libm.ceil(1.5));  // 2
console.log(libm.floor(1.5)); // 1

// 调用自定义动态库
const myLib = ffi.Library('./mylib.so', {
  'process_data': ['int', ['pointer', 'int']],
  'get_version': ['string', []]
});

console.log(myLib.get_version());
```

---

## 5. Node.js子进程与进程间通信

### child_process 模块

```javascript
const { spawn, exec, execFile, fork } = require('child_process');

// 1. spawn - 启动新进程，流式输出
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

// 2. exec - 执行命令，缓冲输出（有大小限制）
exec('ls -lh /usr', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});

// 3. execFile - 直接执行可执行文件（不启动 shell）
execFile('node', ['--version'], (error, stdout) => {
  if (error) throw error;
  console.log(stdout);
});

// 4. fork - 专门用于创建 Node.js 子进程
const child = fork('./child.js');

child.send({ hello: 'world' });

child.on('message', (msg) => {
  console.log('Message from child:', msg);
});

child.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
```

### 进程间通信

```javascript
// parent.js
const { fork } = require('child_process');
const path = require('path');

// 创建子进程
const child = fork(path.join(__dirname, 'child.js'), [], {
  silent: false,  // 是否共享 stdio
  env: { WORKER_ID: '1' }  // 传递环境变量
});

// 发送消息
child.send({ type: 'START', data: { taskId: 123 } });

// 接收消息
child.on('message', (msg) => {
  if (msg.type === 'RESULT') {
    console.log('Received result:', msg.data);
    // 收到结果后终止子进程
    child.kill('SIGTERM');
  }
});

// 错误处理
child.on('error', (err) => {
  console.error('Child process error:', err);
});

// 进程退出
child.on('exit', (code, signal) => {
  console.log(`Child exited with code ${code}, signal ${signal}`);
});

// child.js
process.on('message', async (msg) => {
  if (msg.type === 'START') {
    // 执行耗时任务
    const result = await processTask(msg.data);

    // 发送结果给父进程
    process.send({
      type: 'RESULT',
      data: result
    });
  }
});

async function processTask(data) {
  // 模拟耗时操作
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ processed: true, taskId: data.taskId });
    }, 1000);
  });
}
```

### 进程池实现

```javascript
const { fork } = require('child_process');
const os = require('os');
const path = require('path');

class ProcessPool {
  constructor(script, poolSize = os.cpus().length) {
    this.script = script;
    this.poolSize = poolSize;
    this.workers = [];
    this.queue = [];
    this.activeWorkers = new Map();

    this.initialize();
  }

  initialize() {
    for (let i = 0; i < this.poolSize; i++) {
      this.createWorker();
    }
  }

  createWorker() {
    const worker = fork(this.script);

    worker.on('message', (msg) => {
      const task = this.activeWorkers.get(worker);
      if (task) {
        this.activeWorkers.delete(worker);
        if (msg.error) {
          task.reject(new Error(msg.error));
        } else {
          task.resolve(msg.result);
        }
        this.processQueue();
      }
    });

    worker.on('error', (err) => {
      const task = this.activeWorkers.get(worker);
      if (task) {
        this.activeWorkers.delete(worker);
        task.reject(err);
        this.processQueue();
      }
      // 重启 worker
      this.removeWorker(worker);
      this.createWorker();
    });

    worker.on('exit', () => {
      this.removeWorker(worker);
      // 如果非正常退出，重新创建
      if (!worker.killed) {
        this.createWorker();
      }
    });

    this.workers.push(worker);
  }

  removeWorker(worker) {
    const index = this.workers.indexOf(worker);
    if (index > -1) {
      this.workers.splice(index, 1);
    }
  }

  execute(data, timeout = 30000) {
    return new Promise((resolve, reject) => {
      const task = {
        data,
        resolve,
        reject,
        timeout
      };

      this.queue.push(task);
      this.processQueue();
    });
  }

  processQueue() {
    if (this.queue.length === 0) return;

    const availableWorker = this.workers.find(
      w => !this.activeWorkers.has(w)
    );

    if (!availableWorker) return;

    const task = this.queue.shift();

    // 设置超时
    const timeoutId = setTimeout(() => {
      this.activeWorkers.delete(availableWorker);
      task.reject(new Error('Task timeout'));
      // 终止超时的 worker 并创建新的
      availableWorker.kill();
    }, task.timeout);

    // 包装 resolve/reject 以清除超时
    const originalResolve = task.resolve;
    const originalReject = task.reject;

    task.resolve = (result) => {
      clearTimeout(timeoutId);
      originalResolve(result);
    };

    task.reject = (error) => {
      clearTimeout(timeoutId);
      originalReject(error);
    };

    this.activeWorkers.set(availableWorker, task);
    availableWorker.send({ type: 'TASK', data: task.data });
  }

  terminate() {
    return Promise.all(
      this.workers.map(worker => {
        worker.killed = true;
        return new Promise((resolve) => {
          worker.on('exit', resolve);
          worker.kill('SIGTERM');
          // 强制终止
          setTimeout(() => worker.kill('SIGKILL'), 5000);
        });
      })
    );
  }
}

module.exports = ProcessPool;
```

---

## 6. Node.js模块加载机制与二进制模块

### 模块加载流程

```javascript
// require 加载流程
// 1. 解析文件路径
// 2. 检查缓存
// 3. 加载模块
// 4. 编译执行
// 5. 缓存模块
// 6. 返回 exports

// 模块路径解析
const path = require('path');

// 1. 核心模块（如 fs, http）
const fs = require('fs');

// 2. 相对路径模块
const utils = require('./utils');

// 3. 绝对路径模块
const config = require('/home/user/project/config');

// 4. 第三方模块（从 node_modules 查找）
const lodash = require('lodash');
```

### 模块查找规则

```
require('X') 的查找顺序：

1. 如果 X 是核心模块（如 http, fs）
   - 直接返回核心模块

2. 如果 X 以 './' 或 '/' 或 '../' 开头
   - 按文件查找：X -> X.js -> X.json -> X.node
   - 按目录查找：X/package.json "main" -> X/index.js

3. 如果 X 不以路径开头
   - 从当前目录的 node_modules 查找
   - 向上级目录递归查找 node_modules
   - 直到根目录

4. 全局目录（NODE_PATH）
```

### 自定义模块加载

```javascript
const Module = require('module');
const originalLoad = Module._load;

// 自定义加载器
Module._load = function(request, parent, isMain) {
  console.log(`Loading: ${request}`);

  // 自定义处理
  if (request.startsWith('custom:')) {
    const actualPath = request.replace('custom:', '');
    // 自定义加载逻辑
    return customLoad(actualPath);
  }

  return originalLoad(request, parent, isMain);
};

// 自定义扩展名处理
require.extensions['.txt'] = function(module, filename) {
  const content = fs.readFileSync(filename, 'utf8');
  module.exports = content;
};

// 使用
const text = require('./file.txt');
```

### 二进制模块（.node）

```javascript
// 加载 .node 文件（C++ 扩展）
const addon = require('./build/Release/myaddon.node');

// .node 文件本质上是动态链接库（.so/.dll/.dylib）
// Node.js 使用 process.dlopen() 加载

// 检查模块类型
console.log(require.extensions);
// { '.js': [Function],
//   '.json': [Function],
//   '.node': [Function: bound] }
```

### ES Modules 与 CommonJS

```javascript
// CommonJS
const fs = require('fs');
module.exports = { foo };

// ES Modules
import fs from 'fs';
import { readFile } from 'fs/promises';
export const foo = () => {};
export default main;

// 在 Node.js 中使用 ESM
// 1. 文件后缀改为 .mjs
// 2. 或在 package.json 中设置 "type": "module"

// 混合使用（ESM 导入 CJS）
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const cjsModule = require('./common.cjs');
```

---

## 7. 脚手架CLI开发流程

### CLI 基础结构

```javascript
#!/usr/bin/env node

// bin/cli.js
const { program } = require('commander');
const pkg = require('../package.json');

program
  .version(pkg.version)
  .usage('<command> [options]');

// 创建项目命令
program
  .command('create <app-name>')
  .description('创建新项目')
  .option('-t, --template <template>', '选择模板')
  .option('-f, --force', '强制覆盖')
  .action(async (name, options) => {
    const Creator = require('../lib/Creator');
    const creator = new Creator(name, options);
    await creator.create();
  });

// 添加页面命令
program
  .command('add <page-name>')
  .description('添加新页面')
  .option('-r, --router', '同时添加路由')
  .action((name, options) => {
    // 添加页面逻辑
  });

program.parse(process.argv);
```

### 完整的脚手架实现

```javascript
// lib/Creator.js
const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const download = require('download-git-repo');
const ora = require('ora');
const chalk = require('chalk');

class Creator {
  constructor(name, options) {
    this.name = name;
    this.options = options;
    this.targetDir = path.join(process.cwd(), name);
  }

  async create() {
    // 1. 检查目录是否存在
    await this.checkDirectory();

    // 2. 获取项目配置
    const answers = await this.prompt();

    // 3. 下载模板
    await this.downloadTemplate(answers.template);

    // 4. 渲染模板
    await this.renderTemplate(answers);

    // 5. 安装依赖
    if (answers.install) {
      await this.installDependencies();
    }

    // 6. 完成提示
    this.printCompletion();
  }

  async checkDirectory() {
    if (fs.existsSync(this.targetDir)) {
      if (this.options.force) {
        await fs.remove(this.targetDir);
      } else {
        const { action } = await inquirer.prompt([
          {
            name: 'action',
            type: 'list',
            message: `Target directory ${this.name} already exists. Pick an action:`,
            choices: [
              { name: 'Overwrite', value: 'overwrite' },
              { name: 'Merge', value: 'merge' },
              { name: 'Cancel', value: false }
            ]
          }
        ]);

        if (!action) {
          process.exit(1);
        } else if (action === 'overwrite') {
          await fs.remove(this.targetDir);
        }
      }
    }

    await fs.ensureDir(this.targetDir);
  }

  async prompt() {
    return inquirer.prompt([
      {
        name: 'template',
        type: 'list',
        message: '请选择项目模板:',
        choices: [
          { name: 'Vue 3 + TypeScript', value: 'vue3-ts' },
          { name: 'React + TypeScript', value: 'react-ts' },
          { name: 'Node.js + Express', value: 'node-express' }
        ]
      },
      {
        name: 'description',
        type: 'input',
        message: '项目描述:'
      },
      {
        name: 'author',
        type: 'input',
        message: '作者:'
      },
      {
        name: 'install',
        type: 'confirm',
        message: '是否立即安装依赖?',
        default: true
      }
    ]);
  }

  async downloadTemplate(template) {
    const spinner = ora('正在下载模板...').start();

    const templates = {
      'vue3-ts': 'direct:https://github.com/vuejs/vue-next-webpack-preview#master',
      'react-ts': 'direct:https://github.com/microsoft/TypeScript-React-Starter#master',
      'node-express': 'direct:https://github.com/expressjs/express#master'
    };

    return new Promise((resolve, reject) => {
      download(templates[template], this.targetDir, { clone: true }, (err) => {
        if (err) {
          spinner.fail('下载失败');
          reject(err);
        } else {
          spinner.succeed('下载成功');
          resolve();
        }
      });
    });
  }

  async renderTemplate(answers) {
    const pkgPath = path.join(this.targetDir, 'package.json');

    if (fs.existsSync(pkgPath)) {
      const pkg = await fs.readJson(pkgPath);
      pkg.name = this.name;
      pkg.description = answers.description;
      pkg.author = answers.author;
      await fs.writeJson(pkgPath, pkg, { spaces: 2 });
    }
  }

  async installDependencies() {
    const spinner = ora('正在安装依赖...').start();

    const { execa } = await import('execa');

    try {
      await execa('npm', ['install'], {
        cwd: this.targetDir,
        stdio: 'inherit'
      });
      spinner.succeed('依赖安装成功');
    } catch (error) {
      spinner.fail('依赖安装失败');
      console.log(chalk.yellow('请手动运行 npm install'));
    }
  }

  printCompletion() {
    console.log();
    console.log(chalk.green('✨ 项目创建成功!'));
    console.log();
    console.log(chalk.cyan('  cd ' + this.name));
    console.log(chalk.cyan('  npm run dev'));
    console.log();
  }
}

module.exports = Creator;
```

### package.json 配置

```json
{
  "name": "my-cli",
  "version": "1.0.0",
  "description": "My CLI tool",
  "bin": {
    "my-cli": "./bin/cli.js"
  },
  "scripts": {
    "test": "jest"
  },
  "dependencies": {
    "commander": "^9.0.0",
    "inquirer": "^8.0.0",
    "download-git-repo": "^3.0.2",
    "ora": "^5.0.0",
    "chalk": "^4.0.0",
    "fs-extra": "^10.0.0"
  },
  "engines": {
    "node": ">=14.0.0"
  }
}
```

---

## 8. 文件遍历查找实现

### 基础文件遍历

```javascript
const fs = require('fs').promises;
const path = require('path');

// 递归遍历目录
async function walkDir(dir, callback) {
  const files = await fs.readdir(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      await walkDir(filePath, callback);
    } else {
      await callback(filePath, stat);
    }
  }
}

// 使用
walkDir('./src', (filePath, stat) => {
  console.log(filePath, stat.size);
});
```

### 带过滤的文件查找

```javascript
const fs = require('fs').promises;
const path = require('path');

class FileFinder {
  constructor(options = {}) {
    this.include = options.include || [];
    this.exclude = options.exclude || ['node_modules', '.git', 'dist'];
    this.extensions = options.extensions || [];
    this.maxDepth = options.maxDepth || Infinity;
  }

  async find(rootDir, currentDepth = 0) {
    if (currentDepth > this.maxDepth) {
      return [];
    }

    const results = [];
    const entries = await fs.readdir(rootDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(rootDir, entry.name);

      // 检查排除规则
      if (this.shouldExclude(entry.name)) {
        continue;
      }

      if (entry.isDirectory()) {
        // 递归查找子目录
        const subResults = await this.find(fullPath, currentDepth + 1);
        results.push(...subResults);
      } else if (entry.isFile()) {
        // 检查文件扩展名
        if (this.shouldInclude(entry.name)) {
          results.push(fullPath);
        }
      }
    }

    return results;
  }

  shouldExclude(name) {
    return this.exclude.some(pattern => {
      if (typeof pattern === 'string') {
        return name === pattern || name.includes(pattern);
      }
      if (pattern instanceof RegExp) {
        return pattern.test(name);
      }
      return false;
    });
  }

  shouldInclude(name) {
    if (this.extensions.length === 0) {
      return true;
    }

    const ext = path.extname(name);
    return this.extensions.includes(ext);
  }
}

// 使用
const finder = new FileFinder({
  extensions: ['.js', '.ts'],
  exclude: ['node_modules', 'dist', /\.test\./],
  maxDepth: 5
});

finder.find('./src').then(files => {
  console.log(`Found ${files.length} files`);
});
```

### 流式文件查找（大目录）

```javascript
const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');

class FileStream extends Readable {
  constructor(rootDir, options = {}) {
    super({ objectMode: true });
    this.rootDir = rootDir;
    this.exclude = options.exclude || ['node_modules', '.git'];
    this.extensions = options.extensions || [];
    this.dirsToProcess = [rootDir];
    this.processing = 0;
  }

  _read() {
    if (this.dirsToProcess.length === 0 && this.processing === 0) {
      this.push(null);
      return;
    }

    while (this.dirsToProcess.length > 0) {
      const dir = this.dirsToProcess.shift();
      this.processDirectory(dir);
    }
  }

  processDirectory(dir) {
    this.processing++;

    fs.readdir(dir, { withFileTypes: true }, (err, entries) => {
      this.processing--;

      if (err) {
        this.emit('error', err);
        return;
      }

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (this.shouldExclude(entry.name)) {
          continue;
        }

        if (entry.isDirectory()) {
          this.dirsToProcess.push(fullPath);
        } else if (entry.isFile() && this.shouldInclude(entry.name)) {
          this.push(fullPath);
        }
      }

      if (this.dirsToProcess.length === 0 && this.processing === 0) {
        this.push(null);
      }
    });
  }

  shouldExclude(name) {
    return this.exclude.some(p => name === p || name.includes(p));
  }

  shouldInclude(name) {
    if (this.extensions.length === 0) return true;
    return this.extensions.includes(path.extname(name));
  }
}

// 使用
const fileStream = new FileStream('./src', {
  extensions: ['.js'],
  exclude: ['node_modules']
});

fileStream.on('data', file => {
  console.log(file);
});

fileStream.on('end', () => {
  console.log('Done');
});
```

### 文件内容搜索

```javascript
const fs = require('fs').promises;
const path = require('path');
const { createReadStream } = require('fs');
const readline = require('readline');

async function searchInFiles(dir, pattern, options = {}) {
  const results = [];
  const extensions = options.extensions || ['.js', '.ts', '.json'];

  async function search(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory() && !['node_modules', '.git'].includes(entry.name)) {
        await search(fullPath);
      } else if (entry.isFile() && extensions.includes(path.extname(entry.name))) {
        const matches = await searchInFile(fullPath, pattern);
        if (matches.length > 0) {
          results.push({ file: fullPath, matches });
        }
      }
    }
  }

  await search(dir);
  return results;
}

async function searchInFile(filePath, pattern) {
  const matches = [];
  const fileStream = createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let lineNumber = 0;
  const regex = new RegExp(pattern, 'g');

  for await (const line of rl) {
    lineNumber++;
    if (regex.test(line)) {
      matches.push({
        line: lineNumber,
        content: line.trim()
      });
    }
  }

  return matches;
}

// 使用
searchInFiles('./src', 'console\.log')
  .then(results => {
    results.forEach(({ file, matches }) => {
      console.log(`\n${file}:`);
      matches.forEach(m => console.log(`  Line ${m.line}: ${m.content}`));
    });
  });
```

---

## 9. 文件上传处理

### 基础文件上传

```javascript
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// 配置存储
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// 文件过滤
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: fileFilter
});

// 单文件上传
app.post('/upload/single', upload.single('file'), (req, res) => {
  res.json({
    message: 'File uploaded successfully',
    file: req.file
  });
});

// 多文件上传
app.post('/upload/multiple', upload.array('files', 10), (req, res) => {
  res.json({
    message: 'Files uploaded successfully',
    files: req.files
  });
});

// 错误处理
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File too large' });
    }
  }
  res.status(400).json({ message: error.message });
});
```

### 大文件分片上传

```javascript
const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(express.json());

const UPLOAD_DIR = './uploads';
const TEMP_DIR = './temp';

// 初始化上传
app.post('/upload/init', async (req, res) => {
  const { filename, totalChunks, fileSize } = req.body;
  const uploadId = Date.now().toString(36) + Math.random().toString(36).substr(2);

  const tempDir = path.join(TEMP_DIR, uploadId);
  await fs.mkdir(tempDir, { recursive: true });

  res.json({
    uploadId,
    chunkSize: 1024 * 1024, // 1MB per chunk
    message: 'Upload initialized'
  });
});

// 上传分片
app.post('/upload/chunk/:uploadId', async (req, res) => {
  const { uploadId } = req.params;
  const { chunkIndex } = req.query;
  const tempDir = path.join(TEMP_DIR, uploadId);

  // 保存分片
  const chunkPath = path.join(tempDir, `chunk-${chunkIndex}`);

  const chunks = [];
  req.on('data', chunk => chunks.push(chunk));
  req.on('end', async () => {
    const buffer = Buffer.concat(chunks);
    await fs.writeFile(chunkPath, buffer);
    res.json({ message: `Chunk ${chunkIndex} uploaded` });
  });
});

// 合并分片
app.post('/upload/merge/:uploadId', async (req, res) => {
  const { uploadId } = req.params;
  const { filename, totalChunks } = req.body;

  const tempDir = path.join(TEMP_DIR, uploadId);
  const finalPath = path.join(UPLOAD_DIR, filename);

  try {
    // 按顺序合并分片
    const writeStream = await fs.open(finalPath, 'w');

    for (let i = 0; i < totalChunks; i++) {
      const chunkPath = path.join(tempDir, `chunk-${i}`);
      const chunk = await fs.readFile(chunkPath);
      await writeStream.write(chunk);
    }

    await writeStream.close();

    // 清理临时文件
    await fs.rm(tempDir, { recursive: true, force: true });

    res.json({ message: 'File merged successfully', path: finalPath });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 前端配合
const uploadChunk = async (file, uploadId, chunkIndex, chunkSize) => {
  const start = chunkIndex * chunkSize;
  const end = Math.min(start + chunkSize, file.size);
  const chunk = file.slice(start, end);

  const response = await fetch(`/upload/chunk/${uploadId}?chunkIndex=${chunkIndex}`, {
    method: 'POST',
    body: chunk
  });

  return response.json();
};
```

### 流式文件上传（不使用 Multer）

```javascript
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/upload' && req.method === 'POST') {
    const filename = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    const filepath = path.join(__dirname, 'uploads', filename);

    const writeStream = fs.createWriteStream(filepath);

    req.on('data', chunk => {
      writeStream.write(chunk);
    });

    req.on('end', () => {
      writeStream.end();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Upload successful', filename }));
    });

    req.on('error', (err) => {
      writeStream.destroy();
      fs.unlink(filepath, () => {});
      res.writeHead(500);
      res.end(JSON.stringify({ error: err.message }));
    });
  }
});

server.listen(3000);
```

### 上传到云存储（OSS/S3）

```javascript
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const multer = require('multer');

const s3Client = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// 直接上传到 S3
const uploadToS3 = async (fileBuffer, filename, contentType) => {
  const command = new PutObjectCommand({
    Bucket: 'my-bucket',
    Key: filename,
    Body: fileBuffer,
    ContentType: contentType
  });

  await s3Client.send(command);
  return `https://my-bucket.s3.amazonaws.com/${filename}`;
};

// 大文件分片上传
const multipartUpload = async (fileStream, filename, contentType) => {
  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: 'my-bucket',
      Key: filename,
      Body: fileStream,
      ContentType: contentType
    },
    queueSize: 4, // 并发上传数
    partSize: 5 * 1024 * 1024 // 每个分片 5MB
  });

  upload.on('httpUploadProgress', (progress) => {
    console.log(`Uploaded ${progress.loaded}/${progress.total}`);
  });

  const result = await upload.done();
  return result.Location;
};

// Express 路由
app.post('/upload/s3', upload.single('file'), async (req, res) => {
  try {
    const url = await uploadToS3(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype
    );
    res.json({ url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

---

## 面试常问

1. **Node.js 的 Event Loop 与浏览器有什么不同？**
   - Node.js 有 6 个阶段，宏任务分为多个队列
   - process.nextTick 优先级高于 Promise

2. **如何处理 CPU 密集型任务？**
   - 使用 Worker Threads
   - 使用子进程
   - 使用进程池

3. **Node.js 如何实现热更新？**
   - cluster 模块自动重启
   - PM2 等进程管理器
   - 使用 require.cache 清除缓存

4. **如何设计一个高可用的 Node.js 服务？**
   - 多进程架构
   - 负载均衡
   - 健康检查
   - 优雅关闭
   - 错误处理

5. **Node.js 的 Stream 有什么优势？**
   - 内存效率高
   - 响应速度快
   - 适合处理大文件
