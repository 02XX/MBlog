---
title: 关于delete的执行过程和delete后应该做的事情
tags: []
categories:
  - [未分类]
date: 2023-04-04T00:49:29.000Z
updated: 2024-10-14T13:56:02.194Z
comments: false

---

<!--more-->
# 关于new后delete的执行过程和delete后应该做的事情

## delete的机理

`delete object`

会调用object的析构函数

## delete后应该做的事

创建指针本身就会占用内存

delete只是释放了指针指向对象的内存，而它本身还在。

这个指针也就成了悬空指针。

**所以**

delete后应该把这个指针本身设置为nulllptr、

```c++
int　* p = new int(4);
delete p;
p = nullptr;
```

## 但是在类中的情况

类中执行delete一般是在析构函数中执行而且是最后一段代码，执行析构函数就代表着退出了作用域，所以一般可以不设置nullptr