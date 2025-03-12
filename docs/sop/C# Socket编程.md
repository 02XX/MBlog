---
title: C# Socket编程
tags:
  - C#
  - Socket
categories:
  - [C#]
date: 2023-10-08T20:04:15.000Z
updated: 2024-10-14T13:55:04.130Z
comments: false

---
C#中socket的API用法
<!--more-->
## Socket的send和receive

操作系统维护发送与接受缓冲区，对用户不可见。send函数返回只代表成功把数据写入发送缓冲区（默认8KB），对方可能还没收到数据，若发送缓冲区满了，send就会阻塞。同理receive。

## 异步和多路复用

socket的send和receive方法都是阻塞方法，这种方法写客户端和服务端也是同步模式。如果发生阻塞，主线程就会卡住不动，降低体验感。因此提出了异步和多路复用的方法。

### 异步

异步采用两个函数这两个函数与同步函数对应。例如同步是Send，异步是BeginSend,EndSend。

异步是在主线程之外又开了一个线程，这两个线程不能直接通信，需要全局变量进行中转。

具体构造函数查看微软官方文档，下同。

### Poll状态检测

异步方法容易造成线程问题。因此采用poll状态检测。

在Send和Receive同步方法前进行一次if判断，如果可读则Receive，如果可写则Send，如果Error则处理连接失败。

## 多路复用

一直poll会对cpu造成很大压力，因为没有收到数据主线程也会一直循环。所以有了select多路复用技术。

select对checklist的所有socket进行状态检测，返回可读或可写或错误（参数）的socket，当没有可读或可写或错误时程序会**阻塞**不占用CPU内存。

## 粘包与半包

何为粘包和半包（注意传输层的单位是报文段segment，只是大家都这么叫）

原因：TCP是基于流式传输的

### 粘包

TCP连接会维护发送缓冲区和接受缓冲区，如果发送方send的数据小于接收方的接受缓冲区的大小，同时接收方不及时的receive数据或者发送发send太快，就会造成粘包。

### 半包

发送方send数据的大小大于发送缓冲区的大小，或者大于一个mss就会造成半包(拆包)。

### 解决方法

1. 发送端给每个数据包添加包首部，首部长度应该至少包含数据包的长度，一般是2字节或4字节

2. 固定每次发送的报文长度：可以用`System.IO`命名空间下的`BinaryReader`和`BinaryWriter`，例如

```c#
   TcpClient client = new TcpClient(ip,port);
   NetworkStream networkStream = client.GetStream();
   BinaryWriter bw = new BinaryWriter(networkStream, Encoding.UTF8);
   bw.Write(35);
```

3. 约定好包的边界，添加首部尾部标识，如特殊字符

## 大小端问题

计算机不同数据的存储方式也不同，有的是大端存储有的是小端存储。所以从缓冲区取出的数据有可能是错的。

### 解决办法

1. 使用Reverse()兼容大小端编码
2. 手动还原数值

## TCP的参数

### SendBufferSize和ReceiveBufferSize

系统发送和接受缓冲区

### NoDelay

TCP默认开启Nagle算法。发送方发送很小数据包时，并不会立马发送而是积攒到一定大小，再发送，提高网络传输效率。如果对网络的实时

性有要求，一定要关闭Nagle算法`socket.NoDelay = true`

### TTL

网络层将数据包发给目标，是经过路由器存储转发的。ttl是设置的最大跳数默认为64，防止数据在网络中形成环路，无线循环。但是偏远地区的用户**接受不到数据时**可以将ttl设置的大一些。

### ReuseAddress

端口复用。当进程关闭时TCP并不是同时关闭的，因为TCP的关闭需要经历四次挥手。因此再次打开程序时会产生端口正在使用，这种情况必须等待一段时间才能再起成功启动。而一些对时间要求严格的服务器（服务器崩溃后应该立刻再次重启）不允许发生这种情况，因此会设置端口复用。`socket.SetSocketOption(SocketOptionLevel.Socket, SocketOptionName.ReuseAddress, true)`
但是也存在隐患，当再次重启后可能收到上一次连接的数据包，可能发生意想不到的后果。

### LingerState

当socket调用close()关闭连接时，会立马清空缓冲区的数据，这对于服务器而言收到客户端发来的fin包并不立马close()而是等待发送完数据再close()

`socket.LingerState = new LingerOption(true, 10)`

第二个参数是超时时间，若这个时间服务器还没将缓冲区数据发完，依然会进入close()

## 值得注意的异常

ObjectDisposedException socket已经关闭引发的异常。

## 心跳机制

TCP有自己的心跳机制。如果客户端在某些条件下不能发送fin包，例如网线断了，没信号等情况，这时服务器会一直认为客户端在连接，占用系统资源。因此需要心跳机制KeepAlive来确定。

`Socket.SetSocketOption(SocketOptionLevel.SocketOptionName.KeepAlive)`

但是由于TCP默认的心跳机制很鸡肋，时间太长，一般是2个小时。因此一般都自己实现心跳机制，客户端每隔指定时间向服务器发送PING消息，服务器接受后发送PONG回应，同时服务器记录客户端最后一次发送PING的时间，若很久没收到下一次PING则会认为客户端断开连接，并释放资源。

当然也是有优缺点的，可以及时发现断开客户端并释放资源，但是当连接正常时又会占用不必要的带宽。