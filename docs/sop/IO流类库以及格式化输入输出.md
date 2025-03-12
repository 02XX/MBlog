---
title: IO流类库以及格式化输入输出
tags: []
categories:
  - [未分类]
date: 2023-04-04T00:49:29.000Z
updated: 2024-10-14T13:55:15.908Z
comments: false

---

<!--more-->
# 流类库

![流类库](流类库.jpg)


# 数据格式化

## 格式控制的函数

+ width(int)：设置输出宽度，返回 ios 对象本身。仅对下一个输出的数据一次性有效。
+ fill(char)：设置填充字符，返回 ios 对象本身。
+ precision(int)：设置浮点数的精度，返回 ios 对象本身。
+ setf(ios::fmtflags)：设置一个或多个数据格式化标志，返回 ios 对象本身。
+ unsetf(ios::fmtflags)：取消一个或多个数据格式化标志，返回 ios 对象本身。
+ 
**调用方式**

```C++
cout.setf(ios::fmtflags);
cout.unsetf(ios::fmtflags);
cout.width(int);//仅对下一个输出的数据一次性有效
cout.fill(char);
cout.precision(int);
```

## fmtflags定义的格式化标志

| 标志 | 描述 |
| --- | --- |
| `ios::boolalpha` | 用文字表示布尔值（true或false）。默认情况下，布尔值被输出为整数（1或0）。 |
| `ios::showbase` | 对于输出的整数，显示进制的前缀（如0x表示十六进制，0表示八进制）。 |
| `ios::showpos` | 在正数前面显示加号（+）。 |
| `ios::uppercase` | 将字母输出为大写字母。 |
| `ios::dec` | 设置为十进制输出格式。 |
| `ios::hex` | 设置为十六进制输出格式。 |
| `ios::oct` | 设置为八进制输出格式。 |
| `ios::left` | 左对齐输出。 |
| `ios::right` | 右对齐输出。 |
| `ios::internal` | 在输出的数字中，填充字符（空格或0）放在符号和数字之间。 |
| `ios::fixed` | 设置为固定小数点输出格式，小数点后面的位数是固定的。 |
| `ios::scientific` | 设置为科学计数法输出格式。 |
| `ios::skipws` | 跳过空格和制表符。 |
| `ios::showpoint` | 显示小数点和末尾的0。 |
| `ios::unitbuf` | 每次输出之后刷新缓冲区。 |
| `ios::adjustfield` | 格式化调整模式。有三个可能的值：`ios::left`、`ios::right`和`ios::internal`。 |
| `ios::basefield` | 进制数输出模式。有三个可能的值：`ios::dec`、`ios::hex`和`ios::oct`。 |
| `ios::floatfield` | 浮点数输出模式。有两个可能的值：`ios::fixed`和`ios::scientific`。 |

# 输入流成员函数

## cin.get(ch)与ch = cin.get()

+ 函数原型
```C++
istream& get (char& c);
istream& get (char* s, streamsize n);
istream& get (char* s, streamsize n, char delim);
```
cin.get()读取任何字符，包括空格和换行

## cin.getline()
+ 函数原型
```C++
istream& getline (char* s, streamsize n);
istream& getline (char* s, streamsize n, char delim);
```
getline从输入流中读取一行，直到遇见delim(默认换行)为止。delim也将读入但会替换为'\0'字符。输入流也没有delim。

## peek putback ignore
在C++中，peek，putback和ignore是流处理库（iostream）的函数，用于读取和操作输入输出流。

1. peek：

peek函数允许您读取输入流中下一个字符，但不会从流中删除该字符。它的语法如下：



```c
int peek();
```

例如，以下代码将从标准输入中读取一个字符，然后打印该字符和下一个字符，但不会将下一个字符从输入流中删除：



```c
char c = getchar();
cout << "Current character is: " << c << endl;
int nextChar = cin.peek();
cout << "Next character is: " << (char)nextChar << endl;
```

1. putback：

putback函数允许您将一个字符插入到输入流中。它的语法如下：



```c
int putback(char ch);
```

例如，以下代码将从标准输入中读取一个字符，然后将其插入到输入流中：



```c
char c = getchar();
cin.putback(c);
```

1. ignore：

ignore函数允许您从输入流中读取并丢弃一定数量的字符。它的语法如下：



```c
istream& ignore (streamsize n = 1, int delim = EOF);
```

例如，以下代码将从标准输入中读取一个字符，然后忽略输入流中的下一个5个字符：



```c
char c = getchar();
cin.ignore(5);
```

其中，参数n指定要忽略的字符数，而参数delim指定要忽略的字符的终止符。默认情况下，delim设置为EOF，表示忽略n个字符或输入流结束，以先到者为准。

# 输入流的错误

ios定义了一个枚举类型io_state来表示错误

1. goodbit：表示流没有错误，即流状态正常。
2. eofbit：表示已经到达输入流或输出流的文件末尾（EOF）。
3. failbit：表示发生了一个可恢复的错误，例如格式错误或类型错误，但输入或输出操作可以继续进行。
4. badbit：表示发生了一个不可恢复的错误，例如磁盘故障或内存错误，无法继续输入或输出。

同时有对应的成员函数检测是否出错

| 成员函数 | 含义 |
| --- | --- |
| `int good()` | 返回流是否处于 `ios::goodbit` 状态，即流是否正常工作。如果流没有发生错误，则返回 `true`，否则返回 `false`。 |
| `int eof()` | 返回流是否处于 `ios::eofbit` 状态，即是否到达了文件末尾。如果到达文件末尾，则返回 `true`，否则返回 `false`。 |
| `int fail()` | 返回流是否处于 `ios::failbit` 或 `ios::badbit` 状态，即是否发生了可恢复或不可恢复的错误。如果发生了这些错误，则返回 `true`，否则返回 `false`。 |
| `int bad()` | 返回流是否处于 `ios::badbit` 状态，即是否发生了不可恢复的错误。如果发生了不可恢复的错误，则返回 `true`，否则返回 `false`。 |
| `int rdstate()` | 返回流的状态标志，包括 `ios::goodbit`、`ios::eofbit`、`ios::failbit` 和 `ios::badbit`。可以使用位运算检查流是否处于各种状态。 
|`int clear(int flag = 0)` | 将流的状态设置为flag |