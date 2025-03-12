---
title: IO
tags: []
categories:
  - [未分类]
date: 2023-04-04T00:51:23.000Z
updated: 2024-10-14T13:55:14.844Z
comments: false

---

<!--more-->
# I/O

## 输出

```c++
#include<fstream>
ofstream fout;
fout.open("???.txt");
//ofstream fout("???.txt")
```

## 输入

```C++
#include<fstream>
ifstream fin;
fin.open("???.txt");
//ifstream fin("???.txt")
```

输入与输出都是缓冲的

fin有一个管理的输入缓冲区，fout有输出缓冲区

## 关闭

当输入和输出流对象过期（例如程序终止）时，与文件的链接自动关闭。也可以用close关闭

```c++
fout.close();
fin.close();
```

关闭并不会删除流，而是切断流与文件的连接

## 流状态

流类都是从ios_base继承了一个流状态成员

* 打开不存在的文件进行输入时，设置failbit位

##  检查文件是否打开和`isopen()`



```c++
fin.open("???.txt");
if(fin.fail())
{
    ......;
}
```

```c++
fin.open("???.txt");
if(!fin)
{
    ......;
}
```

```c++
fin.open("???.txt");
if(!fin.is_open())
{
    ......;
}
```

## 命令行处理

```c++
int main(int argc, char* argv[])
```

argc是命令行中的参数个数包括命令行本身。argv指向一个指向char的指针，argv[0]是一个指针指向存储的第一个命令行字符。

## 文件模式

![文件模式](/media/zero/学习/markdown/图床/文件模式.png)

```c++
fout.open("???.txt", ios_base::out|ios_base::app); //在文件尾追加
```

## 内核格式化

sstream头文件

```c++
#include<sstream>
#include<string>
#include<iostream>
int main()
{
    using namespace std;
    ostringstream outstr;
    string naem;
    cin >> name;
    outstr << naem;//不会打印出来
    cout << outstr.str() //显示打印出来
    
}
```

str()返回一个被初始化为缓冲区内容的字符串对象，str可以“冻结”对象，这样便不能写入信息

```C++
istringstream instr(lit);
```

 istringstream 类允许使用istream方法族读取 istringstream 对象中的数据，istringstream对象可以使用string对象进行初始化。

  假设facts是一个string对象，则要创建与该字符串相关联的istringstream对象，可以这样编写:
  istringstream instr(facts);  // use facts to initialize stream

  这样便可以使用istream方法读取instr中的数据。
  例如，如果instr包含大量字符格式的整数，则可以这样读取它们:
  ```c++
int n;
int sum = 0;
while (instr >> n)
	sum += n;
  ```
简而言之，istringstream 和 ostringstream 类使得能够使用 istream 和 ostream 类的方法来管理存储在字符串中的字符数据。