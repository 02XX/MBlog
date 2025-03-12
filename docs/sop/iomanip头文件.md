---
title: iomanip头文件
tags: []
categories:
  - [未分类]
date: 2023-04-04T00:49:29.000Z
updated: 2024-10-14T13:55:47.739Z
comments: false

---

<!--more-->
# `iomanip`头文件

## `setw(int)`

setw()接受一个整型控制一个指定字符宽度

```c++
cout << setw(5) << 1 << endl;
cout << 11111 << endl;
```

![image-20200917003033478](/media/zero/学习/markdown/图床/结果.png)

## `setfill(char)`

```c++
cout << setw(5) << setfill('#')<< 1 << endl;
cout << 11111 << endl;
```



接受一个制定填充字符的char参数

![image-20200916163245906](/media/zero/学习/markdown/图床/结果2.png)

## `setprecision(int)`

控制精度