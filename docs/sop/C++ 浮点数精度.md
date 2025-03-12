---
title: C++ 浮点数精度
tags: []
categories:
  - [未分类]
date: 2023-04-04T00:49:29.000Z
updated: 2024-10-14T13:55:05.213Z
comments: false

---

<!--more-->
# C++ 浮点数精度

`ios::fixed`非科学计数

`ios::scientific`科学计数，带指针域

`setprecision()`来控制精度

注意include`iomanip`头文件

```cout<<setiosflags(ios::fixed)<<setprecision(1)```