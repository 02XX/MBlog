---
title: Linux服务管理
tags: []
categories:
  - [未分类]
date: 2023-04-04T00:49:29.000Z
updated: 2024-10-14T13:55:21.304Z
comments: false

---

<!--more-->
# Linux服务和进程管理

## 服务分类

![](E:\markdown\图床\Linux服务分类.png)

* 整个linux系统是由rpm安装的，所以rpm包安装的跟Linux本身默认值一样

* 独立的服务是直接运行在内存中，响应速度快，但耗费资源

* xinetd服务本身是独立的，但是它可以管理其他的服务。它管理的服务不占用内存，但是它本身占用内存。不耗费资源，但响应速度慢

## 查看已安装服务

```bash
#RPM包安装的服务,查看服务的自启动状态
chkconfig --list
#源码包安装的服务
一般是/usr/local/
```

rpm包安装的位置是默认位置，源码包是自定义目录。service启动命令搜索的是/etc/rc/d/init.d/中的服务，源码包安装的服务是不会写入这个目录里

## RPM包安装的服务管理

## 独立服务的管理

### rpm安装的默认位置

```bash
/etc/init.d/ 	 #启动独立服务脚本的位置
/etc/sysconfig/  #初始化环境配置文件位置
/etc/ 			#配置文件位置
/etc/xinetd.conf #xinetd服务的启动脚本
/etc/xinetd.d/   #基于xinetd服务的启动脚本
/var/lib/ 		#服务产生的数据放在这里
/var/log/ 		#日志
```

### 独立服务的启动

```bash
/etc/init.d/独立服务的名字 start|stop|status|restart| #method1
service 独立服务的名字 start|stop||status #method2,service是rad hat系列专有，service实际上是到/etc/init.d/目录下搜索服务
systemctl [OPTIONS...] {COMMAND} #method3
```

### 独立服务的自启动

```bash
chkconfig [--level 运行级别] [独立服务名] [on|off] #method 1
/etc/rc.d/rc.local #method 2修改这个文件,将启动命令写入此文件/etc/init.d/httpd start
ntsysv #method 3 red hat专有命令
```

### 基于xinetd服务（不常用了）

```bash
yum -y install xinetd #安装xinetd服务
```

## 查看系统中的所有进程

```bash
ps -aux #查看系统中所有进程，使用BSD操作系统格式
ps -le #查看系统中所有进程，使用LINUX标准命令格式
```

## 查看系统健康状态

```bash
top [option]
	-d 秒数：指定top命令几秒更新，默认3秒
在top命令交互模式中可以执行的命令
? or h：显示交互模式的帮助
P：以CPU使用率排序，默认
M：以内存使用率排序
N：以PID排序
q：退出
```

## 查看进程树

```bash
pstree [option]
	   -p：显示进程PID
	   -u：显示进程所属用户
```

## 终止进程

```bash
kill -l #查看可用进程信号
kill [option] PID #以信号代号的功能来操作进程
```

![](E:\markdown\图床\kill进程信号.png)

```bash
killall [option][sign] 进程名字
		-i：交互式，询问是否杀死某个进程
		-I：忽略进程名大小写
```

```bash
pkill  [option][sign] 进程名字
		-t 终端号：按终端号将用户踢出
```

## 将进程放入后台和恢复

1. 在进程执行后加&，**此方法放入后台是还会运行在后台**
2. 在执行进程时，按ctrl+z，**此方法在后台是暂停的**

```bash
jobs #查看后台
jobs -l #显示后台PID
```

```bash
fg %工作号 #恢复到前台
bg %工作好 #重新放入后台
```