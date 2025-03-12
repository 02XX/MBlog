---
title: 重载运算符时第二个参数问题(加const)
tags: []
categories:
  - [未分类]
date: 2023-04-04T00:49:29.000Z
updated: 2024-10-14T13:56:59.477Z
comments: false

---

<!--more-->
# 重载<<运算符时第二个参数问题(加const)

```c++
friend std::ostream& operator(std::ostream& os, const typename& a); //const
```

这里必须加上const，输出的东西是不能修改的。

但是如果参数列表`(std::ostream& os, typename a)`也是可以的，这里会调用typename类的复制构造函数，不会对原来对象造成影响。



# 总结

第二个参数必须写成

1. const typename& a

   或

2. typename a