---
title: Qt工具链
tags:
  - Qt
categories:
  - [Qt]
date: 2023-04-04T00:49:29.000Z
updated: 2024-10-14T13:55:23.475Z
comments: false

---

<!--more-->
#### assistant

qt助手，手册

#### qmake

qt构建

#### designer

设计

#### uic

ui文件转化

#### rcc

qt资源编译器

#### moc

qt元对象编译器

#### qtcreater

# 2QT程序编译流程

## 2.1构建工程

`qmake -project` 需要在工程文件`.pro`中添加构建选项`QT += ...`

## 2.2创建Makefile

`qmake`

## 2.3编译链接

`make`

## 2.4完成

# 3父窗口

## 3.1父窗口类

QWidget,QMainWindow,QDialog

如果子窗口的创建是通过`new`来创建的且指定了父窗口，则不用显示执行`delete`父窗口的析构函数会自动执行，只要保证父窗口被正常销毁就不会发生内存泄漏

# 4信号和槽

## 4.1使用

使用QObject的静态成员函数connect函数

## 4.2注意

信号和槽的参数要一致，或槽的参数缺省，或信号的参数多于槽也可以

+ 一个信号可以多个槽
+ 多个信号可以一个槽
+ 两个信号可以直接链接（信号级联）