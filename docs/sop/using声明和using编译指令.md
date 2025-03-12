---
title: using声明和using编译指令
tags: []
categories:
  - [未分类]
date: 2023-04-04T00:49:29.000Z
updated: 2024-10-14T13:55:59.069Z
comments: false

---

<!--more-->
# using声明和using编译指令

## using声明

在代码中使用using声明相当于定义比变量

```c++
namespace n1
{
    int x = 5;
}
int main()
{
    using n1::x;//这里相当于int x = 5;
    int x = 5;//出错，双定义
}
```

## using编译指令

在代码块中使用using编译指令，则它其中的变量是全局的，**但作用域是根据using编译指令的位置确定。**

```c++
namespace n1
{
    int x = 5;
}
int main()
{
    using namespace n1;
    int x = 5;//正确，局部变量覆盖全局变量
    
}
```

## 注意using编译指令的作用域

```c++
namespace n1
{
    int x = 5;
}
using namespace n1;//作用域是整个文件
int main()
{
    
    int x = 5;//正确，局部变量覆盖全局变量
    
}
```



```c++
namespace n1
{
    int x = 5;
}
int main()
{
    using namespace n1;//作用域是main()函数
    int x = 5;//正确，局部变量覆盖全局变量
    
}
```