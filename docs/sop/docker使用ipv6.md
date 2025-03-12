---
title: docker使用ipv6
tags: []
categories:
  - [未分类]
date: 2023-04-04T00:49:29.000Z
updated: 2024-10-14T13:55:42.507Z
comments: false

---

<!--more-->
# docker使用ipv6

开启ipv6首先按照官方文档修改/etc/docker/daemon.json

然后创建自己的docker网络

```
docker network create --driver bridge --ipam-driver default --subnet 172.80.80.0/24 --gateway 172.80.80.1 --ipv6 --subnet a:b:c:d::/64 --gateway a:b:c:d::1 mynet
```

随后使用`--network network_name`参数使容器连接到这个网络

`docker run -d -p 8080:8080 --network mynet --name STRING IMAGE`