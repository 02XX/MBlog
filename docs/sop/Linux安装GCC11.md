---
title: Linux安装GCC11
tags:
  - gcc
categories:
  - [compiler]
date: 2022-01-05T23:04:42.000Z
updated: 2024-10-14T13:55:20.246Z
comments: false

---

<!--more-->
在linux编译gcc11只需以下几步

## 1 下载gcc源码

git clone https://github.com/gcc-mirror/gcc.git

或者从镜像站获取比如清华镜像站：git clone https://mirrors.tuna.tsinghua.edu.cn/git/gcc.git

## 2 下载prerequisites
```shell
cd gcc
./contrib/download_prerequisites
```
 这一步会自动下载所需的依赖包，结束之后可能会报错。这时返回gcc的根目录看是否有`gmp isl mpc mpfr`这几个压缩包，若有则不必理会报错，若无则需要手动下载。

## 3 configure
```shell
mkdir build && cd build
../configure configure -v --build=x86_64-linux-gnu --host=x86_64-linux-gnu --target=x86_64-linux-gnu --prefix=/usr/local/gcc12 --enable-checking=release --enable-languages=c,c++ --disable-multilib 
```

## 4 make and install
```shell
make -j16 //make 开启漫长的等待
make install //insatll
```

## 5 使用新的gcc
在`/etc/environment`添加一下字段
```shell
PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/usr/local/gcc12/bin"
```