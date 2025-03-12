---
title: typename和class的区别
tags: []
categories:
  - [未分类]
date: 2023-04-04T00:49:29.000Z
updated: 2024-10-14T13:55:58.032Z
comments: false

---

<!--more-->
# typename和class的区别

## 作为定义模板时功能是一样的

```c++
template<class T>;
template<typename T>;
```

## 但是如果一个类含有嵌套类时

```c++
class A
{
    public:
    	class B
        {....}
    	void c(A::B a){} //错误编译器无法识别A::B是A类的数据成员还是嵌套类的类型，可能B是在A类中定义的整形，或者字符类型或者其他。
}
```



```c++
class A
{
    public:
    	class B
        {....}
    	void c(typename A::B a){} //typename告诉编译器A::B是类型而不是数据成员（A类中嵌套类的类型）
}
```