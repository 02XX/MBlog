---
title: C++数据类型
tags: []
categories:
  - [未分类]
date: 2023-04-04T00:49:29.000Z
updated: 2024-10-14T13:55:08.367Z
comments: false

---

<!--more-->
# C++数据类型

1bit可以代表0和1，8位的内存可以有
$$
2^8 = C_8^1+C_8^2+C_8^3＋····＋Ｃ_8^8=256
$$
种组合，即0到255或者-128到127
$$
0～2^8-1或者-2^7～2^7-1
$$


## 整型

| 整型               | 大小(1 byte = 8 bit)         |
| ------------------ | ---------------------------- |
| short              | 至少16位                     |
| int                | 32位，至少与short一样长      |
| long               | 64至少32位，至少与int一样长  |
| long long          | 至少64位，且至少与long一样长 |
| unsigned short     | 无符号short                  |
| unsigned           | 无符号int                    |
| unsigned long      | 无符号long                   |
| unsigned long long | 无符号long long              |
| singned            |                              |

unsignde是unsigned int的缩写

## 浮点型

| 浮点型         | 大小                    |
| -------------- | ----------------------- |
| float          | 至少32位                |
| double         | 至少48位，且不少于float |
| long double    | 至少和double一样多      |
| unsigned short |                         |
|                |                         |
|                |                         |

## 字符型

| 字符型 | 大小 |
| ------ | ---- |
| char   | 8位  |