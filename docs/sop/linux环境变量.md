---
title: linux环境变量
tags: []
categories:
  - [未分类]
date: 2023-04-04T00:49:29.000Z
updated: 2024-10-14T13:55:49.815Z
comments: false

---

<!--more-->
# Linux环境变量

## 环境变量

用户自定义变量只在当前的Shell中生效，而环境变量会在当前Shell和这个Shell的所有子Shell当中生效。如果把环境变量写入相应的配置文件，那么这个环境变量就会在所有的Shell中生效

### 设置环境变量

```bash
export name=value #设置环境变量
env #查看环境变量
unset 变量名 #删除变量
```

使用**set**查看变量（不止环境变量），env只能看环境变量

使用**pstree**查看当前所在的shell

```bash
name=ali #父级shell的本地变量
export sex=male #所有shell的环境变量（全局变量）
bash #创建子shell
age=18 #子shell的本地变量
```

在父级shell中只能看到name和sex，在子shell中只能看到age和sex

### PATH

PATH是系统命令查找的路径

PATH叠加

```bash
PATH="$PATH":变量路径
```

## 环境变量配置文件

```bash
#系统的环境变量配置文件
/etc/profile
/etc/profile.d/*.sh
/etc/bashrc
#用户的环境变量配置文件
~/.bash_profile  #~代表home目录
~/.bashrc
```

**让配置文件生效**

```bash
source 配置文件 #让配置文件生效
或
. 配置文件
```

## 环境变量文件调用顺序

**登录用户的调用顺序**

![](E:\markdown\图床\linux环境变量调用顺序.png)

`/etc/bashrc`中的PATH设置是在no login shell 的情况下生效

## 其他配置文件

```bash
~/.bash_logout #注销时生效的环境变量配置文件 默认是空
~bash_history  #历史命令的保存文件，注销时才会将内存的信息写进去或者使用命令立刻让内存中的历史命令写入文件
/etc/issue #登录欢迎信息,本地生效
/etc/issue.net #远程终端登录欢迎信息，是否显示信息有/etc/ssh/sshd_config决定，加入Banner /etc/issue.net才能显示
/etc/motd #不管本地登录还是远程登录都可以显示此欢迎信息
```

欢迎信息，只能在**本地终端欢迎信息使用**

| 转义符 | 作用                         |
| ------ | ---------------------------- |
| `\d`   | 显示当前系统日期             |
| `\s`   | 显示操作系统名称             |
| `\l`   | 显示登录的终端号             |
| `\m`   | 显示硬件体系结构如i386、i686 |
| `\n`   | 显示主机名                   |
| `\o`   | 显示域名                     |
| `\r`   | 显示内核版本                 |
| `\t`   | 显示当前系统时间             |
| `\u`   | 显示当前登录用户的序列号     |