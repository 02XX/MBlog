---
title: cin
tags: []
categories:
  - [未分类]
date: 2023-04-04T00:49:29.000Z
updated: 2024-10-14T13:55:36.205Z
comments: false

---
C++的输入是一种流，而cin就是这种流的对象。
<!--more-->
## cin >>

```cpp
#include<string>
string str1, str2;
cin >> str1;//"abc bcd"
cin >> str2;
```

\>>是一种运算符用于cin表示将字符串插入到流中。其中cin>>在读入字符时遇到**空格**或**回车**时会终止读入字符并且不会把空格或回车符从缓冲区中去除，再次调用cin时会遇见上次缓冲区残留的空格**但是cin会将它忽略并且不将他储存在变量中**。例如str1读入的"abc",而str2读入的是"bcd"而不是"空格bcd"。

## cin.get

（１)ch = cin.get()读取一个字符

```text
char a;
a = cin.get();
```

但是它不会忽略空格，即使遇见空格也会将它读入。

（2）cin.get(char)读取一个字符

```text
char b;
cin.get(b);
```

（3）cin.get()读取空格和换行（在输入流中去除空格和换行）

```text
char a[20];//键盘输入apple pandas
(cin >> a).get()//输入流中pandas前面的空格被get()吃掉了，不会影响后续的读入
```

（3）cin.get(array, Asize)读取一行

```text
char a[20];
cin.get(a, 20);
```

其中有两个参数数组ａ和读取的最大字符个数20。从缓冲区中读入最多20格字符储存在数组ａ中。

同样它会读入空格和换行符。

## cin.getline

cin.getline读取一行。

```text
char a[20];
cin.getline(a, 20)
```

其中两个参数数组ａ和读取最大字符个数20。但是与cin.get有一点不同，**当cin.getline遇到空格或换行符时并不会将它读入而且还会把它从缓冲区中删除。**这一点很重要不要记混了。

## string的getline函数

```text
#include<string>//要使用getline（cin，string）必须包括头文件string
string str1;
getline(cin, str1);
```

string是c++风格的字符串，getline(cin, string)是在string文件中的特有函数只对string对象操作。**它与cin.getline有一点相同它不会从缓冲区读入换行符，而且会将它们从缓冲区删除。**

## cin.clear()

它不是读取字符的函数，而是清除错误标记的函数。当我们用cin读取错误时，会在缓冲区留下一个错误标记，阻止后面的cin读取。所以为了让后面的cin正常读取就需要删除错误标记。

```text
int a;
char b;
cin >> a;//键盘敲入字符'a'，它与ａ的int定义不匹配，cin不读取'a'并且会在缓冲区留下错区标记
cin >> b;//此处的cin并不会正常读入用户的下一次输入
```

**使用cin.clear()**

```text
 int a;
char b;
cin >> a;//键盘敲入字符'a'，它与ａ的int定义不匹配，cin不读取'a'并且会在缓冲区留下错区标记
cin.clear();//清除错误标记
cin >> b;//此处的cin会正常读入用户的下一次输入
```

**补充:**

**１、cin可用于条件判断句中**

首先要明确三点

（1）流的正常状态，无论是输入流和输出流都会有三个标记eofbit、badbit、failbit。当它们都为0的时候表示流是正常状态。

（2）cin在条件句中是自测来实现True和False，若cin流正常则是True反之为False。

（3）>> 操作符返回左边对象也就是cin对象

**用于while中**

```text
int a;
while(cin >> a)
{
 cout << "hello";
}
```

· 输入整数12a，cin>>从缓冲区也就是输入流中读取12不读取'a'，与int匹配，三个标记均为0，返回cin（非0值）为True执行while循环。a

· 输入a， cin>>从输入流中读取'a'与int不匹配,读取失败，failbit标记为1，'a'被留在输入流中，返回0为False不执行循环。

·输入Ctrl+z（windows的EOF）cin将eofbit和failbit设置为1，返回False。也可以用以下方法判断EOF

```text
int ch;
ch = cin.get();
if(ch != EOF)
```

**用于if中**

```text
int a;
cin >> a;
if(cin)
{
  cout << "hello";
}
```

· 输入12a，cin读取12不读取a，返回的cin对象正常（非0值），所以到if句中检测通过执行。

· 输入a，cin读取'a'与int不匹配，返回的cin异常（0值），if句中检测未通过。

· 输入Ctrl+z(windows的EOF)，返回0。

## 总结

1. **输入函数中get和getline字眼的函数读取空格和换行，而cin>>忽略。**

2. **getline字眼的函数会将空格和换行从输入流中删除，get字眼的函数不会。**

3. **cin可用于条件判断中，若成功读入返回cin对象（非0值），若读入失败或者是EOF则返回0。条件句中用cin多用于判断用户输入是否非法或者磁盘读写是否有误。**<!-- more -->---
    title: 你好世界
    date: 2021-05-10 11:46:40
    tags: C++
    ---
    <!-- more -->---
    title: 你好世界
    date: 2021-05-10 11:46:40
    tags: C++
    ---