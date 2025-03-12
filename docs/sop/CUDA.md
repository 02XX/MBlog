---
title: CUDA
tags:
  - CUDA
  - 计算机图形学
categories:
  - [CUDA]
date: 2024-09-23T13:30:46.000Z
updated: 2024-10-14T13:55:10.599Z
comments: false

---

<!--more-->
## `cooperative_groups`

* **`cg::this_thread_block()`** 用于线程块级别的操作（管理一个线程块内部的线程）。`cg::this_thread_block()::thread_index()`是当前块的线程索引(形状与线程块的定义有关)。`cg::this_thread_block()::thread_rank()`是当前块的线程的排名(以block为起始)。
* **`cg::this_grid()`** 用于网格级别的操作（管理多个线程块中的所有线程）。`cg::this_grid()::block_index()` `cg::this_grid()::block_rank()` `cg::this_grid().thread_rank()`
* **`cg::this_thread()`** 用于单个线程的操作（管理当前线程）。