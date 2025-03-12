---
title: bindlst
tags: []
categories:
  - [未分类]
date: 2023-04-04T00:49:29.000Z
updated: 2024-10-14T13:55:34.093Z
comments: false

---

<!--more-->
# `bind1st`和`binder2nd`

`bind1st`可以将自适应二元函数转换为一元函数

例如

```c++
f2(); //二元函数 void f2(int a, int b)
bind1st(f2, val) f1(x); //等价于f2(val, x),而f1是一个一元函数
```

```c++
bind1st(mutiplies<double>(), 2.5) f(2);
```

bind2nd与它类似，只是将常数赋给第二个参数