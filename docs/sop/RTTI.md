---
title: RTTI
tags: []
categories:
  - [未分类]
date: 2023-04-04T00:49:29.000Z
updated: 2024-10-14T13:55:28.859Z
comments: false

---

<!--more-->
# RTTI

## dynamic_cast

```c++
class Grand{...;};
class Superb : public Grand{...;};
class Magnificent ; public Superb{...;};



//pointer
Super * pm = dynamic_cast<Super *>(pg);
```

使用派生类指针指向基类的指针是不安全的。

**然而**

使用`dynamic_cast<typename *>(对象)`

相当于提出了这样一个问题：括号里的类型是否可以被安全的转化为`typename *`如果可以则返回对象的地址，若不行则返回一个空指针。

## typeod和type_info

typeid可以确定两个对象是否是一个类型。typeid可以返回一个type_info对象的引用。

```c++
typeid(Magnificent); //返回一个typeinfo对象的引用
typeid(Magnificent) == typeid(*pg); //可以利用typeid比较两个对象是否是同一个
```

`typeid(*pg).name()`typeinfo有一个name函数，通常返回内容是类名的字符串。

# 类型转换符

C语言中类型转换过于松散，所以采用更加严格的方式来进行类型转换。

* dynamic_cast
* const_cast
* static_cast
* reinterpret_cast

## const_cast

`const_cast<type-name> (expression)`

这个运算符可以删掉const标签。这个运算符原因是需要这样一个值，它在大多数情况下是常量但有时也是可以修改的

## static_cast

`static_cast<type-name>(expression)`

仅当type-name可以被隐式转换为expression的类型，或者expression可被隐式转换为type-name所属的类型时，上述转换才被允许。

## reinterpret_cast

`reinterpret_cast<type-name>(expression)`