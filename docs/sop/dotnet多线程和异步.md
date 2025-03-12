---
title: dotnet多线程和异步
tags:
  - dotnet
categories:
  - [dotnet]
date: 2024-01-29T00:19:19.000Z
updated: 2025-01-16T07:46:31.106Z
comments: false

---
介绍C#多线程和异步操作
<!--more-->
## 线程、线程池、线程安全

线程是操作系统能够进行运算调度的最小单位。通过 `System.Threading.Thread`来创建线程。每个线程有自己的执行堆栈。

线程的创建需要手动管理声明周期。而线程池是一组预先创建的线程，主要目的是减少线程创建和销毁的开销，提高系统的性能和响应速度。使用 `System.Threading.ThreadPool`类。

不同线程访问共享资源会出现竞态条件（Race Condition）、死锁（Deadlock）、数据竞争（Data Race）等问题。可以使用锁（Locking）、互斥量（Mutex）、信号量（Semaphore）等同步机制来控制对共享资源的访问。还可以用原子操作实现线程安全。

## 实现多线程的方式

1. 线程
2. 线程池
3. 异步编程
4. C#中的 `Parallel.For Parallel.ForEach Parallel.Invoke`

## Thread

### 创建

`th.Start();`开启子线程

### 结束

`th.Join();`在当前线程，等待子线程执行结束

```C#
Thread th = new Thread(() =>
{
    for (int i = 0; i < 20; i++)
    {
        Thread.Sleep(200);
        Console.WriteLine($"当前执行第{i}次");
    }
    Console.WriteLine("Thread is Finished");
});
th.Start();
Console.WriteLine("Waiting Thread");
th.Join();
Console.WriteLine("Done");
```

### 中止

`th.Interrupt();`中断子线程

其原理是在相应的线程抛出 `ThreadlnterruptedException`异常。

如果线程中包含一个 `while（true`循环，那么需要保证包含等待方法，如IO操作，`Thread.Sleep()`，来使线程有空挡时间，以便相应线程可以抛出 `ThreadlnterruptedException`异常，来进行 `Interrupt`

```C#
Thread th = new Thread(() =>
{
    try
    {
        for (int i = 0; i < 20; i++)
        {
            Thread.Sleep(200);
            Console.WriteLine($"当前执行第{i}次");
        }
    }
    catch (ThreadInterruptedException e)
    {
        Console.WriteLine("线程中止");
    }
});
th.Start();
Console.WriteLine("Waiting Thread");
Thread.Sleep(1000);
th.Interrupt();
Console.WriteLine("Done");
```

```C#
Thread th = new Thread(() =>
{
    try
    {
        while (true)
        {
            Thread.Sleep(0); //告诉CPU当先线不要管我
        }
    }
    catch (ThreadInterruptedException e)
    {
        Console.WriteLine("线程中止");
    }
    Console.WriteLine("Thread is Finished");
});

th.Start();
Console.WriteLine("Waiting Thread");
Thread.Sleep(1000);
th.Interrupt();
th.Join();
Console.WriteLine("Done");
```

`CancellationToken`令牌中止

> 后续补充

## 线程安全

### 原子操作

`Interlocked`

### 锁与信号量

#### `lock` `Monitor`

lock的底层就是Monitor

```C#
using System;
public class C {
    public void M() {
        var obj = new Object();
        lock(obj)
        {
            fun();
        };
    }
    public void fun()
    {}
}
```

等效于

```C#
using System.Diagnostics;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Security;
using System.Security.Permissions;
using System.Threading;

[assembly: CompilationRelaxations(8)]
[assembly: RuntimeCompatibility(WrapNonExceptionThrows = true)]
[assembly: Debuggable(DebuggableAttribute.DebuggingModes.Default | DebuggableAttribute.DebuggingModes.IgnoreSymbolStoreSequencePoints | DebuggableAttribute.DebuggingModes.EnableEditAndContinue | DebuggableAttribute.DebuggingModes.DisableOptimizations)]
[assembly: SecurityPermission(SecurityAction.RequestMinimum, SkipVerification = true)]
[assembly: AssemblyVersion("0.0.0.0")]
[module: UnverifiableCode]
[module: RefSafetyRules(11)]

public class C
{
    public void M()
    {
        object obj = new object();
        object obj2 = obj;
        bool lockTaken = false;
        try
        {
            Monitor.Enter(obj2, ref lockTaken);
            fun();
        }
        finally
        {
            if (lockTaken)
            {
                Monitor.Exit(obj2);
            }
        }
    }

    public void fun()
    {
    }
}
```

#### `Mutex`

#### `Seamphore`

`public sealed class Semaphore : System.Threading.WaitHandle`
`Semaphore(Int32, Int32, String)`

初始化 Semaphore 类的新实例，并指定初始入口数和最大并发入口数，可以选择指定系统信号量对象的名称。可以在 `进程`之间共享

`Semaphore semaphore = new Semaphore(initialCount:3,maximumCount:3);`
maximumCount最大并发入口数量，initialCount初始入口数量。第一个3代表现在入口占了3个，剩下0个。

`seamphore.WaitOne()`等待信号量

`seamphore.Release()`释放信号量

`seamphore.Dispose()`销毁信号量

#### `WaitHandle`

+ ManualResetEvent
+ AutoResetEvent

#### `ReaderWriterLock`（读写锁）

#### 以上操作的轻量型(Slim)

1. SemaphoreSlim
2. ManualResetEventSlim
3. ReaderWriterLockSlim

#### C#内置的线程安全相关

1. 线程安全单例 `Lazy`
2. 线程安全的集合类型 `System.Collections.Concurrent`
3. 阻塞集合 `BlockingCollection`
4. 通道 `Channel`
5. 原子操作 `InterLock`
6. 周期任务 `PeriodicTimer`

##### 线程安全单例 `Lazy<T>`

`Lazy<T>`类允许在需要时延迟实例化对象，同时确保只有一个实例被创建。这对于需要在应用程序中共享的对象非常有用。

```C#
public class Singleton
{
    private static readonly Lazy<Singleton> instance = new Lazy<Singleton>(() => new Singleton());

    public static Singleton Instance => instance.Value;

    private Singleton()
    {
        // Private constructor to prevent instantiation.
    }
}
```

##### 阻塞集合

`BlockingCollection<T>`是一个封装了其他集合的类，它提供了在集合中添加和移除元素时进行线程同步的功能。

```C#
using System.Collections.Concurrent;
using System.Threading.Tasks;

BlockingCollection<int> collection = new BlockingCollection<int>();

// 生产者
Task.Run(() =>
{
    for (int i = 0; i < 10; i++)
    {
        collection.Add(i);
    }
    collection.CompleteAdding(); // 标记添加完成
});

// 消费者
Task.Run(() =>
{
    foreach (var item in collection.GetConsumingEnumerable())
    {
        Console.WriteLine(item);
    }
});
```

##### Channel

```C#
using System.Threading.Channels;

Channel<int> channel = Channel.CreateUnbounded<int>();

// 生产者
Task.Run(async () =>
{
    for (int i = 0; i < 10; i++)
    {
        await channel.Writer.WriteAsync(i);
    }
    channel.Writer.Complete();
});

// 消费者
Task.Run(async () =>
{
    await foreach (var item in channel.Reader.ReadAllAsync())
    {
        Console.WriteLine(item);
    }
});
```

##### 原子操作

```C#
using System.Threading;

int value = 0;
Interlocked.Increment(ref value); // 原子增加
```

##### 周期任务

`PeriodicTimer`是自定义实现周期性任务的概念，可以使用 Timer 类或自定义的定时器实现。

```C#
using System;
using System.Threading;

public class PeriodicTimer
{
    private Timer timer;

    public PeriodicTimer(int interval)
    {
        timer = new Timer(TimerCallback, null, 0, interval);
    }

    private void TimerCallback(object state)
    {
        // 执行周期性任务
        Console.WriteLine($"Task executed at {DateTime.Now}");
    }

    public void Dispose()
    {
        timer.Dispose();
    }
}

// 使用示例
using System.Threading;

using (var timer = new PeriodicTimer(1000)) // 每秒执行一次
{
    Thread.Sleep(5000); // 等待5秒钟
}

```

## async与await

### 异步任务

await可以等待一个Task，并释放当前线程，而把await后续的执行注册到Task的continuation中(OnComplete回调)当Task执行结束后会调用回调函数执行后续的代码。

至于后续代码如何执行取决于 `TaskScheduler` ，如果有同步上下文(例如WPF程序等)，那么Task结束后会回到原有进程(UI线程)执行await后面的代码。如果没有同步上下文，那么Task结束后会在新线程中执行回调（因为他默认使用ThreadPoolTaskScheduler）

### async Task

使用async修饰的Task，C#会把他包装成一个异步状态机，并 `返回`由 `AsyncTaskMethodBuilder` 创建的 `Task`（执行异步状态机的movenext函数）

### 任务调度器

Task由任务调度器进行执行，一般任务调度器使用线程池，对于每一个Task进行入队然后执行结束后执行回调。