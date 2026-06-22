---
sidebar_position: 8
title: Go（面试要点）
---

# Go 面试要点

## 目录
- [Go 的并发模型是什么？](#1-go-的并发模型是什么)
- [Goroutine 和线程的区别？](#2-goroutine-和线程的区别)
- [Channel 的原理和使用场景？](#3-channel-的原理和使用场景)
- [Go 的内存管理机制？](#4-go-的内存管理机制)
- [Go 的垃圾回收机制？](#5-go-的垃圾回收机制)
- [Go 的接口实现机制？](#6-go-的接口实现机制)
- [Go 的反射机制？](#7-go-的反射机制)
- [Go 的错误处理最佳实践？](#8-go-的错误处理最佳实践)
- [Go 的 Context 包使用场景？](#9-go-的-context-包使用场景)
- [Go 的 HTTP 服务启动流程？](#10-go-的-http-服务启动流程)
- [Go 的 Map 是线程安全的吗？](#11-go-的-map-是线程安全的吗)
- [Go 的 Slice 扩容机制？](#12-go-的-slice-扩容机制)
- [Go 的 GMP 调度模型？](#13-go-的-gmp-调度模型)
- [Go 的逃逸分析？](#14-go-的逃逸分析)
- [Go 的 defer 执行顺序？](#15-go-的-defer-执行顺序)

---

## 1. Go 的并发模型是什么？

### CSP 并发模型

Go 语言采用 **CSP（Communicating Sequential Processes）** 并发模型，核心思想是：

> **通过通信来共享内存，而不是通过共享内存来通信**

```go
package main

import "fmt"

func main() {
    // 创建 channel
    ch := make(chan int)

    // 启动 goroutine
    go func() {
        // 发送数据到 channel
        ch <- 42
    }()

    // 从 channel 接收数据
    value := <-ch
    fmt.Println(value) // 42
}
```

### 核心组件

| 组件 | 说明 |
|------|------|
| Goroutine | 轻量级线程，由 Go 运行时管理 |
| Channel | 用于 goroutine 间通信的管道 |
| Select | 多路复用 channel 操作 |
| Sync 包 | 提供锁、WaitGroup、Once 等同步原语 |

### 与传统多线程对比

```go
// 传统多线程（共享内存）
var counter int
var mutex sync.Mutex

func increment() {
    mutex.Lock()
    counter++
    mutex.Unlock()
}

// CSP 模型（通信）
func worker(ch chan int, result chan int) {
    sum := 0
    for v := range ch {
        sum += v
    }
    result <- sum
}
```

---

## 2. Goroutine 和线程的区别？

### 核心区别

| 特性 | Goroutine | 操作系统线程 |
|------|-----------|-------------|
| 内存占用 | 2KB 起步（可动态增长） | 通常 1-8MB |
| 创建/销毁开销 | 很小（用户态） | 较大（需要内核参与） |
| 切换开销 | 很小（用户态调度） | 较大（内核态切换） |
| 调度方式 | GMP 调度器（M:N 模型） | 内核调度 |
| 数量 | 单机可支撑 10万+ | 通常数千个 |
| 通信方式 | Channel + 共享内存 | 共享内存 + 信号 |

### Goroutine 实现原理

```go
package main

import (
    "fmt"
    "runtime"
    "sync"
)

func main() {
    // 设置使用的 CPU 核心数
    runtime.GOMAXPROCS(4)

    var wg sync.WaitGroup

    // 启动 10 万个 goroutine
    for i := 0; i < 100000; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            // 执行耗时操作
            fmt.Printf("Goroutine %d\n", id)
        }(i)
    }

    wg.Wait()
}
```

### 栈管理

```go
// Goroutine 栈是动态增长的
func recursive(n int) {
    if n <= 0 {
        return
    }
    // 使用大量栈空间
    var buf [1024]byte
    _ = buf
    recursive(n - 1)
}

// Go 运行时会自动扩展栈（初始 2KB，最大 1GB）
func main() {
    go recursive(100000) // 不会栈溢出
}
```

---

## 3. Channel 的原理和使用场景？

### Channel 底层结构

```go
// runtime 中的 hchan 结构
type hchan struct {
    qcount   uint           // 当前队列中的元素数量
    dataqsiz uint           // 循环队列的大小
    buf      unsafe.Pointer // 指向循环队列的指针
    elemsize uint16         // 元素大小
    closed   uint32         // 是否已关闭
    elemtype *_type         // 元素类型
    sendx    uint           // 发送索引
    recvx    uint           // 接收索引
    recvq    waitq          // 等待接收的 goroutine 队列
    sendq    waitq          // 等待发送的 goroutine 队列
}
```

### Channel 类型与使用

```go
package main

import "fmt"

func main() {
    // 1. 无缓冲 Channel（同步）
    unbuffered := make(chan int)
    go func() {
        unbuffered <- 1 // 阻塞，直到有接收者
    }()
    <-unbuffered // 阻塞，直到有发送者

    // 2. 有缓冲 Channel（异步）
    buffered := make(chan int, 3)
    buffered <- 1 // 不阻塞，直到缓冲区满
    buffered <- 2
    buffered <- 3
    // buffered <- 4 // 阻塞，缓冲区已满

    // 3. 单向 Channel
    var sendOnly chan<- int = buffered    // 只能发送
    var recvOnly <-chan int = buffered    // 只能接收

    sendOnly <- 1
    <-recvOnly

    // 4. 关闭 Channel
    close(buffered)

    // 安全地读取（ok 为 false 表示 channel 已关闭）
    v, ok := <-recvOnly
    fmt.Println(v, ok)
}
```

### Select 多路复用

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    ch1 := make(chan string)
    ch2 := make(chan string)

    go func() {
        time.Sleep(time.Second)
        ch1 <- "from ch1"
    }()

    go func() {
        time.Sleep(2 * time.Second)
        ch2 <- "from ch2"
    }()

    // 同时监听多个 channel
    for i := 0; i < 2; i++ {
        select {
        case msg1 := <-ch1:
            fmt.Println(msg1)
        case msg2 := <-ch2:
            fmt.Println(msg2)
        case <-time.After(3 * time.Second):
            fmt.Println("timeout")
        default:
            fmt.Println("no channel ready")
        }
    }
}
```

### 常见使用模式

```go
// 1. 工作池模式
func workerPool() {
    jobs := make(chan int, 100)
    results := make(chan int, 100)

    // 启动 3 个 worker
    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }

    // 发送 9 个任务
    for j := 1; j <= 9; j++ {
        jobs <- j
    }
    close(jobs)

    // 收集结果
    for a := 1; a <= 9; a++ {
        <-results
    }
}

func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        fmt.Printf("worker %d processing job %d\n", id, j)
        time.Sleep(time.Second)
        results <- j * 2
    }
}

// 2. 扇出/扇入模式
func fanOutFanIn() {
    in := producer(1, 2, 3, 4, 5)

    // 扇出：启动多个处理 goroutine
    c1 := square(in)
    c2 := square(in)
    c3 := square(in)

    // 扇入：合并多个 channel
    for v := range merge(c1, c2, c3) {
        fmt.Println(v)
    }
}

func producer(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        for _, n := range nums {
            out <- n
        }
        close(out)
    }()
    return out
}

func square(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        for n := range in {
            out <- n * n
        }
        close(out)
    }()
    return out
}

func merge(cs ...<-chan int) <-chan int {
    var wg sync.WaitGroup
    out := make(chan int)

    output := func(c <-chan int) {
        defer wg.Done()
        for n := range c {
            out <- n
        }
    }

    wg.Add(len(cs))
    for _, c := range cs {
        go output(c)
    }

    go func() {
        wg.Wait()
        close(out)
    }()

    return out
}
```

---

## 4. Go 的内存管理机制？

### 内存分配器

Go 使用 **TCMalloc（Thread-Caching Malloc）** 风格的内存分配器：

```go
// 内存分配层级
// 1. Tiny 对象（< 16B）：合并分配
// 2. Small 对象（16B ~ 32KB）：从 mcache/mspan 分配
// 3. Large 对象（> 32KB）：直接从 mheap 分配

package main

import "fmt"

func main() {
    // 小对象分配
    small := make([]int, 10)      // 从 mcache 分配
    fmt.Println(small)

    // 大对象分配
    large := make([]byte, 1024*1024) // 从 mheap 分配
    fmt.Println(len(large))
}
```

### 内存分配结构

```
mheap（全局堆）
    │
    ├── mcentral（中心缓存，按 span class 分类）
    │       ├── nonempty（非空 span 链表）
    │       └── empty（空 span 链表）
    │
    └── mcache（每个 P 的本地缓存）
            ├── alloc [numSpanClasses]（缓存的 span）
            └── tiny（< 16B 对象缓存）
```

### 内存对齐

```go
package main

import (
    "fmt"
    "unsafe"
)

type Example struct {
    A bool     // 1 byte
    // 3 bytes padding
    B int32    // 4 bytes
    C string   // 16 bytes (指针+长度)
}

func main() {
    e := Example{}
    fmt.Printf("Size: %d\n", unsafe.Sizeof(e))           // 24 bytes
    fmt.Printf("Align: %d\n", unsafe.Alignof(e))         // 8 bytes
    fmt.Printf("Offset B: %d\n", unsafe.Offsetof(e.B))   // 4 bytes
}

// 优化内存布局
type Optimized struct {
    C string   // 16 bytes
    B int32    // 4 bytes
    A bool     // 1 byte
    // 3 bytes padding
}
// 同样是 24 bytes，但字段按大小降序排列，更紧凑
```

---

## 5. Go 的垃圾回收机制？

### 三色标记法

Go 使用 **并发三色标记-清除** 垃圾回收算法：

```
1. 白色：未访问的对象（潜在垃圾）
2. 灰色：已访问，但引用未处理完的对象
3. 黑色：已访问，引用已处理完的对象

GC 流程：
    STW（短暂） -> Root 扫描 -> 并发标记 -> STW（短暂） -> 清理
```

### GC 调优

```go
package main

import (
    "fmt"
    "runtime"
    "runtime/debug"
)

func main() {
    // 1. 设置 GC 目标百分比（默认 100）
    // 当内存增长到 100% 时触发 GC
    debug.SetGCPercent(100)

    // 2. 强制触发 GC
    runtime.GC()

    // 3. 读取 GC 统计信息
    var m runtime.MemStats
    runtime.ReadMemStats(&m)
    fmt.Printf("GC 次数: %d\n", m.NumGC)
    fmt.Printf("上次 GC 时间: %d\n", m.LastGC)
    fmt.Printf("堆内存: %d MB\n", m.HeapAlloc/1024/1024)

    // 4. 设置内存限制（Go 1.19+）
    debug.SetMemoryLimit(10 * 1024 * 1024 * 1024) // 10GB
}
```

### 减少 GC 压力

```go
// 1. 对象池复用
var pool = sync.Pool{
    New: func() interface{} {
        return make([]byte, 1024)
    },
}

func process() {
    buf := pool.Get().([]byte)
    defer pool.Put(buf)
    // 使用 buf
}

// 2. 避免不必要的指针
// Bad：使用指针 slice，增加 GC 扫描负担
type Node struct {
    children []*Node
}

// Good：使用索引代替指针
type NodeOptimized struct {
    children []int // 存储索引而不是指针
}

// 3. 预分配内存
// Bad：多次扩容
var s []int
for i := 0; i < 1000; i++ {
    s = append(s, i)
}

// Good：预分配容量
s = make([]int, 0, 1000)
for i := 0; i < 1000; i++ {
    s = append(s, i)
}
```

---

## 6. Go 的接口实现机制？

### 隐式实现

```go
package main

// 定义接口
type Writer interface {
    Write([]byte) (int, error)
}

// 实现接口（无需显式声明）
type MyWriter struct{}

func (m MyWriter) Write(p []byte) (int, error) {
    return len(p), nil
}

func main() {
    var w Writer = MyWriter{} // 隐式实现
    w.Write([]byte("hello"))
}
```

### 接口内部结构

```go
// iface（非空接口，包含方法）
type iface struct {
    tab  *itab          // 类型信息和方法表
    data unsafe.Pointer // 实际数据指针
}

// eface（空接口 interface{}）
type eface struct {
    _type *_type        // 类型信息
    data  unsafe.Pointer // 实际数据指针
}
```

### 类型断言

```go
package main

import "fmt"

func main() {
    var i interface{} = "hello"

    // 类型断言
    s, ok := i.(string)
    if ok {
        fmt.Println(s)
    }

    // type switch
    switch v := i.(type) {
    case string:
        fmt.Printf("string: %s\n", v)
    case int:
        fmt.Printf("int: %d\n", v)
    default:
        fmt.Printf("unknown: %T\n", v)
    }
}
```

### 接口最佳实践

```go
// 1. 接口定义在消费者侧
// consumer.go
type Logger interface {
    Log(msg string)
}

type Server struct {
    logger Logger
}

// 2. 小接口优于大接口（接口分离原则）
type Reader interface {
    Read(p []byte) (n int, err error)
}

type Writer interface {
    Write(p []byte) (n int, err error)
}

type ReadWriter interface {
    Reader
    Writer
}

// 3. 空接口的使用场景
// 只在必要时使用 interface{}
func anyType(v interface{}) {
    // 处理任意类型
}
```

---

## 7. Go 的反射机制？

### reflect 包基础

```go
package main

import (
    "fmt"
    "reflect"
)

type Person struct {
    Name string `json:"name"`
    Age  int    `json:"age"`
}

func main() {
    p := Person{Name: "John", Age: 30}

    // 获取类型
    t := reflect.TypeOf(p)
    fmt.Println("Type:", t.Name()) // Person

    // 获取值
    v := reflect.ValueOf(p)
    fmt.Println("Value:", v)

    // 遍历结构体字段
    for i := 0; i < t.NumField(); i++ {
        field := t.Field(i)
        value := v.Field(i)
        fmt.Printf("Field: %s, Type: %s, Value: %v, Tag: %s\n",
            field.Name, field.Type, value, field.Tag)
    }

    // 修改值（需要指针）
    v2 := reflect.ValueOf(&p).Elem()
    v2.FieldByName("Name").SetString("Jane")
    fmt.Println(p) // {Jane 30}
}
```

### 反射使用场景

```go
// 1. JSON 序列化/反序列化
type Response struct {
    Code int         `json:"code"`
    Data interface{} `json:"data"`
}

// 2. ORM 映射
func structToMap(obj interface{}) map[string]interface{} {
    result := make(map[string]interface{})
    v := reflect.ValueOf(obj)
    t := v.Type()

    for i := 0; i < v.NumField(); i++ {
        field := t.Field(i)
        tag := field.Tag.Get("db")
        if tag != "" {
            result[tag] = v.Field(i).Interface()
        }
    }
    return result
}

// 3. 通用函数调用
func callMethod(obj interface{}, methodName string, args ...interface{}) []reflect.Value {
    v := reflect.ValueOf(obj)
    method := v.MethodByName(methodName)

    inputs := make([]reflect.Value, len(args))
    for i, arg := range args {
        inputs[i] = reflect.ValueOf(arg)
    }

    return method.Call(inputs)
}

// 4. 深拷贝
func deepCopy(dst, src interface{}) error {
    // 使用反射实现深拷贝逻辑
}
```

### 反射的性能问题

```go
// 反射的性能开销较大，避免在热路径使用

// Bad：每次使用反射
func getField(obj interface{}, fieldName string) interface{} {
    v := reflect.ValueOf(obj)
    return v.FieldByName(fieldName).Interface()
}

// Good：缓存反射结果
var fieldCache = make(map[string]int)

func getFieldCached(obj interface{}, fieldName string) interface{} {
    // 缓存字段索引，避免重复反射
}
```

---

## 8. Go 的错误处理最佳实践？

### 错误类型定义

```go
package main

import (
    "errors"
    "fmt"
)

// 1. 预定义错误
var (
    ErrNotFound   = errors.New("resource not found")
    ErrInvalidArg = errors.New("invalid argument")
    ErrInternal   = errors.New("internal error")
)

// 2. 自定义错误类型
type NotFoundError struct {
    Resource string
    ID       string
}

func (e *NotFoundError) Error() string {
    return fmt.Sprintf("%s with id %s not found", e.Resource, e.ID)
}

// 3. 使用 fmt.Errorf 包装错误
func getUser(id string) (*User, error) {
    user, err := db.Query(id)
    if err != nil {
        return nil, fmt.Errorf("get user %s: %w", id, err)
    }
    return user, nil
}
```

### 错误处理模式

```go
// 1. 错误检查链
func process() error {
    if err := step1(); err != nil {
        return fmt.Errorf("step1 failed: %w", err)
    }
    if err := step2(); err != nil {
        return fmt.Errorf("step2 failed: %w", err)
    }
    return nil
}

// 2. 错误转换（添加上下文）
type ServiceError struct {
    Code    int
    Message string
    Cause   error
}

func (e *ServiceError) Error() string {
    return e.Message
}

func (e *ServiceError) Unwrap() error {
    return e.Cause
}

// 3. 使用 errors.Is 和 errors.As
func handleError(err error) {
    if errors.Is(err, ErrNotFound) {
        // 处理未找到错误
    }

    var notFoundErr *NotFoundError
    if errors.As(err, &notFoundErr) {
        // 处理特定类型的错误
        fmt.Println(notFoundErr.Resource)
    }
}
```

### sentinel error 模式

```go
package mypkg

import "errors"

// 定义包级别的 sentinel 错误
var ErrConnectionClosed = errors.New("connection closed")

func DoSomething() error {
    // ...
    if closed {
        return ErrConnectionClosed
    }
    // ...
}

// 其他包中使用 errors.Is 判断
if errors.Is(err, mypkg.ErrConnectionClosed) {
    // 处理连接关闭
}
```

---

## 9. Go 的 Context 包使用场景？

### Context 类型

```go
package main

import (
    "context"
    "fmt"
    "time"
)

func main() {
    // 1. Background Context（根 Context）
    ctx := context.Background()

    // 2. TODO Context（临时占位）
    ctx = context.TODO()

    // 3. WithCancel（可取消）
    ctx, cancel := context.WithCancel(context.Background())
    defer cancel()

    // 4. WithTimeout（超时取消）
    ctx, cancel = context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()

    // 5. WithDeadline（截止时间点取消）
    ctx, cancel = context.WithDeadline(context.Background(), time.Now().Add(5*time.Second))
    defer cancel()

    // 6. WithValue（传递键值对）
    ctx = context.WithValue(context.Background(), "key", "value")
}
```

### Context 使用场景

```go
// 1. HTTP 请求超时控制
func fetchData(ctx context.Context, url string) ([]byte, error) {
    req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
    if err != nil {
        return nil, err
    }

    resp, err := http.DefaultClient.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    return io.ReadAll(resp.Body)
}

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
    defer cancel()

    data, err := fetchData(ctx, "https://api.example.com/data")
    if err != nil {
        // 处理超时或其他错误
    }
}

// 2. 级联取消（取消信号传播）
func process(ctx context.Context) error {
    ctx, cancel := context.WithCancel(ctx)
    defer cancel()

    // 启动多个 goroutine，共享取消信号
    go worker1(ctx)
    go worker2(ctx)

    select {
    case <-ctx.Done():
        return ctx.Err()
    case result := <-resultCh:
        return result
    }
}

// 3. 传递请求上下文（链路追踪）
type contextKey string

const traceIDKey contextKey = "traceID"

func WithTraceID(ctx context.Context, traceID string) context.Context {
    return context.WithValue(ctx, traceIDKey, traceID)
}

func GetTraceID(ctx context.Context) string {
    if id, ok := ctx.Value(traceIDKey).(string); ok {
        return id
    }
    return ""
}

// 在 HTTP 中间件中使用
func traceMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        traceID := r.Header.Get("X-Trace-ID")
        if traceID == "" {
            traceID = generateTraceID()
        }
        ctx := WithTraceID(r.Context(), traceID)
        next.ServeHTTP(w, r.WithContext(ctx))
    })
}
```

### Context 最佳实践

```go
// 1. Context 应该作为第一个参数
func DoSomething(ctx context.Context, arg string) error {
    // ...
}

// 2. 不要存储 Context 到结构体中
type BadService struct {
    ctx context.Context // 不要这样做
}

// 3. 每个函数需要时传入 Context
type GoodService struct{}

func (s *GoodService) DoSomething(ctx context.Context, arg string) error {
    // ...
}

// 4. 及时释放资源
func longRunning(ctx context.Context) {
    ticker := time.NewTicker(time.Second)
    defer ticker.Stop()

    for {
        select {
        case <-ctx.Done():
            return
        case <-ticker.C:
            // 执行工作
        }
    }
}
```

---

## 10. Go 的 HTTP 服务启动流程？

### 基础 HTTP Server

```go
package main

import (
    "fmt"
    "net/http"
)

func main() {
    // 1. 注册处理器
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprint(w, "Hello, World!")
    })

    http.HandleFunc("/user", func(w http.ResponseWriter, r *http.Request) {
        // 根据请求方法路由
        switch r.Method {
        case http.MethodGet:
            getUser(w, r)
        case http.MethodPost:
            createUser(w, r)
        default:
            http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
        }
    })

    // 2. 启动服务
    fmt.Println("Server starting on :8080")
    if err := http.ListenAndServe(":8080", nil); err != nil {
        fmt.Printf("Server error: %v\n", err)
    }
}
```

### 使用 http.Server

```go
package main

import (
    "context"
    "fmt"
    "net/http"
    "time"
)

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/", handler)

    server := &http.Server{
        Addr:         ":8080",
        Handler:      mux,
        ReadTimeout:  5 * time.Second,
        WriteTimeout: 10 * time.Second,
        IdleTimeout:  120 * time.Second,
    }

    // 优雅关闭
    go func() {
        if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
            fmt.Printf("Server error: %v\n", err)
        }
    }()

    // 等待中断信号
    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
    <-quit

    fmt.Println("Shutting down server...")

    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    defer cancel()

    if err := server.Shutdown(ctx); err != nil {
        fmt.Printf("Server forced to shutdown: %v\n", err)
    }

    fmt.Println("Server exited")
}
```

### 中间件模式

```go
package main

import (
    "log"
    "net/http"
    "time"
)

// Middleware 类型
type Middleware func(http.Handler) http.Handler

// 链式中间件
func chain(middlewares ...Middleware) Middleware {
    return func(final http.Handler) http.Handler {
        for i := len(middlewares) - 1; i >= 0; i-- {
            final = middlewares[i](final)
        }
        return final
    }
}

// Logger 中间件
func logger(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        next.ServeHTTP(w, r)
        log.Printf("%s %s %v", r.Method, r.URL.Path, time.Since(start))
    })
}

// Recovery 中间件
func recovery(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        defer func() {
            if err := recover(); err != nil {
                log.Printf("Panic: %v", err)
                http.Error(w, "Internal Server Error", http.StatusInternalServerError)
            }
        }()
        next.ServeHTTP(w, r)
    })
}

// Auth 中间件
func auth(token string) Middleware {
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            if r.Header.Get("Authorization") != "Bearer "+token {
                http.Error(w, "Unauthorized", http.StatusUnauthorized)
                return
            }
            next.ServeHTTP(w, r)
        })
    }
}

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/api/data", dataHandler)

    // 应用中间件
    handler := chain(
        recovery,
        logger,
    )(mux)

    http.ListenAndServe(":8080", handler)
}
```

---

## 11. Go 的 Map 是线程安全的吗？

### Map 的线程安全问题

```go
package main

import (
    "fmt"
    "sync"
)

// Go 的 map 不是线程安全的
// 并发读写会导致 panic: concurrent map read and map write

func main() {
    // 1. 使用 sync.RWMutex 保护 map
    type SafeMap struct {
        mu   sync.RWMutex
        data map[string]int
    }

    m := &SafeMap{data: make(map[string]int)}

    // 写操作
    m.mu.Lock()
    m.data["key"] = 1
    m.mu.Unlock()

    // 读操作
    m.mu.RLock()
    v := m.data["key"]
    m.mu.RUnlock()
    fmt.Println(v)

    // 2. 使用 sync.Map（适合特定场景）
    var sm sync.Map

    // 存储
    sm.Store("key", 1)

    // 读取
    if v, ok := sm.Load("key"); ok {
        fmt.Println(v)
    }

    // 不存在时加载
    v, _ = sm.LoadOrStore("key2", 2)
    fmt.Println(v)

    // 删除
    sm.Delete("key")

    // 遍历
    sm.Range(func(key, value interface{}) bool {
        fmt.Println(key, value)
        return true // 继续遍历
    })
}
```

### sync.Map 适用场景

```go
// sync.Map 适合以下场景：
// 1. 读多写少
// 2. 多个 goroutine 读、写、删除不同的 key
// 3. 需要并发安全的 map，但不想自己加锁

// 但大多数情况下，使用 map + RWMutex 性能更好

// 通用 SafeMap 实现
type SafeMap[K comparable, V any] struct {
    mu   sync.RWMutex
    data map[K]V
}

func NewSafeMap[K comparable, V any]() *SafeMap[K, V] {
    return &SafeMap[K, V]{
        data: make(map[K]V),
    }
}

func (m *SafeMap[K, V]) Get(key K) (V, bool) {
    m.mu.RLock()
    defer m.mu.RUnlock()
    v, ok := m.data[key]
    return v, ok
}

func (m *SafeMap[K, V]) Set(key K, value V) {
    m.mu.Lock()
    defer m.mu.Unlock()
    m.data[key] = value
}

func (m *SafeMap[K, V]) Delete(key K) {
    m.mu.Lock()
    defer m.mu.Unlock()
    delete(m.data, key)
}
```

---

## 12. Go 的 Slice 扩容机制？

### Slice 底层结构

```go
// runtime 中的 slice 结构
type slice struct {
    array unsafe.Pointer // 指向底层数组
    len   int            // 长度
    cap   int            // 容量
}
```

### 扩容规则

```go
package main

import "fmt"

func main() {
    // 扩容策略：
    // 1. 如果期望容量 > 当前容量的 2 倍，使用期望容量
    // 2. 如果当前容量 < 1024，新容量 = 当前容量 * 2
    // 3. 如果当前容量 >= 1024，新容量 = 当前容量 * 1.25

    // 示例 1：容量 < 1024，翻倍扩容
    s1 := make([]int, 0, 8)
    fmt.Println(cap(s1)) // 8

    s1 = append(s1, 1, 2, 3, 4, 5, 6, 7, 8, 9) // 超过容量
    fmt.Println(cap(s1)) // 16 (8 * 2)

    // 示例 2：容量 >= 1024，1.25 倍扩容
    s2 := make([]int, 1024)
    s2 = append(s2, 1)
    fmt.Println(cap(s2)) // 1280 (1024 * 1.25)

    // 示例 3：期望容量很大，直接使用期望容量
    s3 := make([]int, 0, 100)
    s3 = append(s3, make([]int, 2000)...) // 期望容量 2000 > 100*2
    fmt.Println(cap(s3)) // 2000
}
```

### 内存对齐

```go
// 扩容后的容量可能会根据元素类型进行内存对齐
func roundUpSize(size int) int {
    // 例如：对于 int 类型（8 bytes），容量会被对齐到 8 的倍数
}

// 实际例子
func main() {
    // 元素大小为 8 bytes
    s := make([]int64, 0, 5)
    s = append(s, 1, 2, 3, 4, 5, 6)
    fmt.Println(cap(s)) // 不是 10，而是 8 的倍数
}
```

### 预分配优化

```go
// Bad：多次扩容，多次内存分配和数据拷贝
func processBad(items []Item) []Result {
    var results []Result
    for _, item := range items {
        results = append(results, processItem(item))
    }
    return results
}

// Good：预分配容量
func processGood(items []Item) []Result {
    results := make([]Result, 0, len(items))
    for _, item := range items {
        results = append(results, processItem(item))
    }
    return results
}

// Best：直接按索引赋值（如果知道确切大小）
func processBest(items []Item) []Result {
    results := make([]Result, len(items))
    for i, item := range items {
        results[i] = processItem(item)
    }
    return results
}
```

---

## 13. Go 的 GMP 调度模型？

### GMP 模型简介

```
G（Goroutine）：协程，用户态轻量级线程
M（Machine）：操作系统线程，由操作系统管理
P（Processor）：逻辑处理器，包含运行 goroutine 所需的资源

关系：
- 一个 M 必须绑定一个 P 才能执行 G
- 一个 P 可以运行多个 G
- P 的数量 = GOMAXPROCS（默认 CPU 核心数）
- M 的数量可以动态增长
```

### 调度过程

```go
package main

import (
    "fmt"
    "runtime"
    "sync"
)

func main() {
    // 设置 P 的数量
    runtime.GOMAXPROCS(4)

    var wg sync.WaitGroup
    for i := 0; i < 10; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            fmt.Printf("Goroutine %d running on thread\n", id)
        }(i)
    }
    wg.Wait()
}
```

### 调度策略

```
1. 本地队列（P.localq）：每个 P 有自己的本地队列（256 个槽位）
2. 全局队列（Global Queue）：所有 P 共享
3. 工作窃取（Work Stealing）：P 没有可运行的 G 时，从其他 P 偷取
4.  handoff 机制：阻塞的 G 会让出 P，创建新 M 或复用空闲 M
```

### 阻塞处理

```go
// 1. 系统调用阻塞
// 当 G 执行系统调用时，M 会阻塞，P 会与 M 分离，绑定到新的 M 上继续执行其他 G

// 2. 网络 I/O 阻塞
// 使用 netpoller 处理，不会阻塞 M，G 会被标记为 waiting，M 继续执行其他 G

func main() {
    // 网络 I/O 不会阻塞线程
    resp, err := http.Get("https://example.com")
    // 这期间 M 可以去执行其他 G

    // 系统调用会阻塞线程
    file, err := os.Open("file.txt")
    // 这期间 M 阻塞，但 P 会绑定到其他 M 继续工作
}
```

---

## 14. Go 的逃逸分析？

### 什么是逃逸分析

```go
package main

// 逃逸分析：编译器决定变量分配在栈上还是堆上
// 原则：如果变量在函数返回后仍然被引用，则分配到堆上（逃逸）

type User struct {
    Name string
    Age  int
}

// 发生逃逸：返回指针
func newUser(name string, age int) *User {
    u := User{Name: name, Age: age}
    return &u // u 逃逸到堆上
}

// 不发生逃逸：只返回值
func getUser(name string, age int) User {
    u := User{Name: name, Age: age}
    return u // u 分配在栈上
}

// 发生逃逸：变量被闭包引用
func closure() func() int {
    x := 0
    return func() int {
        x++ // x 逃逸到堆上
        return x
    }
}

// 发生逃逸：变量太大
func largeArray() {
    // 大数组会逃逸到堆上
    arr := make([]int, 1000000) // 逃逸
    _ = arr
}

// 发生逃逸：接口类型
func interfaceEscape() interface{} {
    x := 42
    return x // x 逃逸（装箱成 interface{}）
}
```

### 查看逃逸分析

```bash
# 查看逃逸分析结果
go build -gcflags="-m" main.go

# 输出示例：
# ./main.go:11:6: can inline newUser
# ./main.go:12:9: &u escapes to heap
```

### 避免逃逸

```go
// 1. 避免返回指针（除非必要）
// Bad
func createConfig() *Config {
    return &Config{}
}

// Good
func createConfig() Config {
    return Config{}
}

// 2. 预分配 slice 容量
// Bad：append 可能导致逃逸
func process(items []int) {
    var results []int
    for _, item := range items {
        results = append(results, item*2)
    }
}

// Good
func processGood(items []int) {
    results := make([]int, 0, len(items))
    for _, item := range items {
        results = append(results, item*2)
    }
}

// 3. 避免使用 interface{} 传递值
// Bad
func doSomething(v interface{}) {
    // v 会被装箱，发生逃逸
}

// Good：使用泛型（Go 1.18+）
func doSomethingBetter[T any](v T) {
    // 避免装箱
}
```

---

## 15. Go 的 defer 执行顺序？

### defer 基本用法

```go
package main

import "fmt"

func main() {
    // defer 语句在函数返回前执行（LIFO 顺序）
    defer fmt.Println("1")
    defer fmt.Println("2")
    defer fmt.Println("3")
    fmt.Println("done")
    // 输出：
    // done
    // 3
    // 2
    // 1
}
```

### defer 执行时机

```go
package main

import "fmt"

func main() {
    // defer 在函数返回前执行，即使发生 panic
    defer fmt.Println("defer 1")

    defer func() {
        if r := recover(); r != nil {
            fmt.Println("Recovered:", r)
        }
    }()

    defer fmt.Println("defer 2")

    panic("something went wrong")

    fmt.Println("never reached")
    // 输出：
    // defer 2
    // Recovered: something went wrong
    // defer 1
}
```

### defer 参数求值

```go
package main

import "fmt"

func main() {
    // defer 的参数在定义时求值
    i := 0
    defer fmt.Println(i) // 输出 0，不是 1
    i++

    // 如果需要延迟求值，使用闭包
    j := 0
    defer func() {
        fmt.Println(j) // 输出 1
    }()
    j++
}
```

### defer 常见用法

```go
package main

import (
    "fmt"
    "os"
    "sync"
)

// 1. 资源释放
func processFile(filename string) error {
    f, err := os.Open(filename)
    if err != nil {
        return err
    }
    defer f.Close() // 确保文件关闭

    // 处理文件...
    return nil
}

// 2. 解锁
func (m *Map) Get(key string) (interface{}, bool) {
    m.mu.RLock()
    defer m.mu.RUnlock()
    v, ok := m.data[key]
    return v, ok
}

// 3. 计时
func timed() func() {
    start := time.Now()
    return func() {
        fmt.Printf("took %v\n", time.Since(start))
    }
}

func operation() {
    defer timed()()
    // 执行操作
}

// 4. 修改具名返回值
func doubleSum(a, b int) (result int) {
    defer func() {
        result *= 2 // 修改返回值
    }()
    return a + b // result = a + b，然后 defer 执行
}

func main() {
    fmt.Println(doubleSum(1, 2)) // 输出 6，不是 3
}
```

### defer 性能

```go
// defer 有轻微的性能开销（约 20-30ns）
// 在热路径上大量使用时需要考虑

// 性能敏感场景可以手动释放
func processMany() {
    for i := 0; i < 1000000; i++ {
        f := openFile(i)
        process(f)
        f.Close() // 手动关闭，而不是 defer
    }
}
```

---

## 总结

Go 语言的核心面试要点：

| 主题 | 关键点 |
|------|--------|
| **并发模型** | CSP 模型、Goroutine、Channel、Select |
| **调度机制** | GMP 模型、工作窃取、阻塞处理 |
| **内存管理** | TCMalloc、三色标记 GC、逃逸分析 |
| **语言特性** | 接口隐式实现、反射、错误处理、Context |
| **数据结构** | Slice 扩容、Map 非线程安全、字符串不可变 |

掌握这些核心概念，可以帮助你更好地理解 Go 语言的设计哲学和工作原理，在实际开发中编写出高效、可靠的代码。
