---
title: 关于new
tags: []
categories:
  - [未分类]
date: 2023-04-04T00:49:29.000Z
updated: 2024-10-14T13:56:03.226Z
comments: false

---

<!--more-->
# 关于`new`

`new`分两种一种是常规`new`，另一种是定位`new`。

## 常规`new`

### 常规`new`的创建

`new`返回的是地址。

```c++
int * p1 = new int;//给int分配空间
char * p2 = new char[20];//给char数组分配空间
```

### 常规new的释放

常规new的释放是用`delete`，`delete`释放空间是有两种格式

```c++
int * p1 = new int;//给int分配空间
delete p1;
char * p2 = new char[20];//给char数组分配空间
delete [] p2;
```

### 常规`new`的内存

常规`new`是在堆(heap)中存放，用`delete`释放。

## 定位`new`

### 定位`new`的创建

### 定位new需要用到new标准库

```c++
#include <new>
char buffer[50];
double * p1 = new(buffer) double;
double * p2 = new(buffer) double[10];
```

定位`new`的内存

定位`new`的内存实在指定的内存中存储，上例是储存在`buffer`的内存中。

## 两者的不同

+ `delete`只能用于**指向常规`new`运算符分配的堆内存**，定位`new`在`delete`的管辖范围外

+ 常规`new`存放的内存是堆，定位`new`将内存放在指定的地方