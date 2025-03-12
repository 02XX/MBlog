---
title: cin的补充
tags: []
categories:
  - [未分类]
date: 2023-04-04T00:49:29.000Z
updated: 2024-10-14T13:55:37.266Z
comments: false

---

<!--more-->
# cin的补充

## >>

连续读入有效的字符，直到遇见非有效部分（例如：空格，回车，或者不同于>>后类型的其他类型值），并把这些字符转换为需要的类型

```c++
int a;
cin >> a;
```

```bash
-123 ;    //只读入-123
-123
;         //只读入-123
-123Z;		//只读入-123,Z不是整型不算有效字符
```

**以上字符连续抽取有效部分直到无效部分停止，并且把-123字符转换为-123整型（int）**

**Z将留在输入流，下一个cin将从Z开始读取，而-123将会被cin转换为整型被赋给a.**

**如果cin遇到非有效字符并不会读入，并且cin返回0（false）**

## 错误输入

cin和cout对象包含一个描述流状态的数据成员（从ios_base）继承过来的。流状态是iostate类型，iostate是bitmask类型。流状态由三个ios_base元素组成:eofit、badfit、failbit，每个元素都是一位，可以是1或0

* **cin未能读取预期的字符时，cin将状态位设置failbit**
* **cin读取到文件尾，cin将状态位设置eofbit**
* **cin试图读取不可读取的文件或磁盘I/O失败是，cin将状态位设置badbit**

## 流状态

![image-20200916170654580](E:\markdown\图床\image-20200916170654580.png)

**`claear(iostate s = 0)`**

默认清除三个状态位。当有参数时，它清除三个位，并将参数的位设置进去

```c++
clear(); //清除三个位
clear(eofbit); //设置eofit，清除其他位
```

**`setstate(iostate s)`**

设置s位，其他位保持不变

```c++
setstate(eofbit); //设置eofit,其余位不变
```

## `clear()`

clear虽然能重置状态位，但是并不能消除流中的错误字符。

消除的方法如下

1. `isspace()`

cctype函数。如果参数是空白字符时返回true

```c++
while(!isspace(cin.get()))
    continue;
```



2. `cin.get`

```c++
while(cin.get())
    continue;
```

## `get()`

get函数常用重载

```C++
std::istream &std::istream::get(char &__c);
int std::istream::get()
```

![get的重载](/media/zero/学习/markdown/图床/get的重载.png)

## `getline()、get()、ignore()`

- ![getline和get，igrnore](E:\markdown\图床\getline和get，igrnore.png)

`istream & ignore(int = 1, int = EOF)`

ignore读取指定的字符或读取到文件尾