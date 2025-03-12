---
title: decltype关键字的坑
tags: []
categories:
  - [未分类]
date: 2023-04-04T00:49:29.000Z
updated: 2024-10-14T13:55:41.450Z
comments: false

---

<!--more-->
# decltype关键字的坑

## a为变量

返回a的变量类型

## a为左值表达式（注意）

返回a的变量类型的引用

## a为右值表达式

返回a的变量类型

## 代码示例

```c++
int i=42,*p=&i,&r=i;
decltype(r+0) b//正确，r+0为右值表达式，b是int
decltype(r) b//错误，r是变量，b是int&，未初始化错误
decltype(*p) b//错误，*p是左值表达式，b是int&
```

`decltype(*p)`返回的是一个引用，**严格来说`*p`返回的就是引用**。





## 错误示例

```c++
#include <iostream>
#include <cmath>
#include <string>

using namespace std;
template <class T>
auto max5(T * a) -> decltype(a[0]);//a[0]是一个左值，所以decltype(a[0])和decltype(*a)返回的是一个int&
int main()
{
    int x[5] {5, 6, 3, 8, 9};
    double y[5] {2.0, 3.6, 5.9, 1.5, 7.9};
    int a = max5(x);
    cout << a;
    system("pause");
    return 0;
}


template <class T>
auto max5(T * a) -> decltype(a[0])
{
    T max = a[0];
    for (int i = 0; i < 5; i++)
    {
        if (max < a[i])
        {
            max = a[i];
        }       
    }
    return max;
}
```

## 改正后

```c++
#include <iostream>
#include <cmath>
#include <string>

using namespace std;
template <class T>
auto max5(T * a) -> decltype(a[0]+a[2]);//a[0]+a[2]是一个右值表达式，decltype返回其类型
int main()
{
    int x[5] {5, 6, 3, 8, 9};
    double y[5] {2.0, 3.6, 5.9, 1.5, 7.9};
    int a = max5(x);
    cout << a;
    system("pause");
    return 0;
}


template <class T>
auto max5(T * a) -> decltype(a[0]+a[2])
{
    T max = a[0];
    for (int i = 0; i < 5; i++)
    {
        if (max < a[i])
        {
            max = a[i];
        }       
    }
    return max;
}
```