---
title: string
tags: []
categories:
  - [未分类]
date: 2023-04-04T00:49:29.000Z
updated: 2024-10-14T13:55:54.924Z
comments: false

---

<!--more-->
# string

| 构造函数 | 描述 |
| :-------------------------------- | :----------------------------------------------------------- |
| string(const char *s)             | 将string 对象初始化为s 指向的NBTS                            |
| string (size_ type n , char c)    | 创建一个包含n个元素的string对象，其中每个元素都别初始化为字符c |
| string(const string & str)        | 将一个string对象初始化为string对象str                        |
| string()                          | 默认构造函数                                                 |
| string(const char* s,size_type n) | 将string对象初始化为s指向的NBTS的前n个字符，即使超过了NBTS结尾 |
| template<class Iter> string(Iter begin, Iter end) | 将string 对象初始化为区间[begin, end)内的字符， 其中begin 和end 的行为就像指 针， 用千指定位置， 范围包括begin 在内， 但不包括end |
| string(const string & str, string size_type pos=0, size_type = npos) | 将一个string对象初始化为对象str中从位置pos开始到结尾的字符，或从位置pos开始的n个字符 |
| string(string && str) noexcept | 这是C++11 新增的， 它将一个string 对象初始化为string 对象str, 并可能修改str（移动构造函数） |
| string(initializer_list<char> il) | 这是C++11 新增的， 它将一个string 对象初始化为初始化列表il 中的字符 |

## 移动构造函数

`string(string && str)` 

创建一个str的副本但与复制构造函数不同，他不保证str视为const

## `string(initializer_list<char> il)`

它使得列表初始化语句用于string类

`string a = {'a', 'b', 'c'};`

`string a {'a', 'b', 'c'};`

合法

## string类输入

string 版本的 getline( ）函数从输入中读取字符， 并将其存储到目标 string 中，直到发生下列三种情况

* 到达文件尾，在这种情况下，输入流的 eofbit 将被设置， 这意味着方法 fail( ）和 eot())都将返回true;
* 遇到分界字符（默认为\n)，在这种情况下， 将把分界字符从输入流中删除， 但不存储它；
* 读取的字符数达到最大允许值 (string::npos 和可供分配的内存字节数中较小的下， 将设置输入流的 failbit, 这意味着方法 fail() 将返回 true。

## string类的方法

* `size_type find(const string* str, size_type pos = 0)const`

从字符串的 pos 位置开始， 查找子字符串 str。如果找到， 则返回该子字符串首次出现时其首字符的索引； 否则， 返回 string : : npos 

* `size_type find(const char* str, size_type pos = 0)const`

从字符串的 pos 位置开始， 查找子字符串 s。如果找到， 则返回该子字符串首次出现时其首字符的索引；否则， 返回 string :: npos 

* `size_type find(const char* s, size_type pos = 0, size_type n)`

从字符串的 pos 位置开始， 查找 s 的前 n 个字符组成的子字符串。 如果找到， 则返回该子字符串首次出现时其首字符的索引； 否则， 返回 string : : npos 

* `size_type find(char ch, size_type pos = 0)const`

从字符串的 pos 位置开始， 查找字符 ch。如果找到， 则返回该字符首次出现的位置；否则， 返回 string : : npos 

* `refind()`

查找字符串或字符最后一次出现的位置

* `find_first_of()`

查找参数中任何一个字符串首次出现的位置

* `find_last_of()`

查找参数中任何一个字符串最后一次出现的位置

* `find_first_not_of()`

查找第一个不包含在参数中的字符

* `find_last_not_of()`
* `capacity()`

返回当前分配给字符串的内存块的大小

* `reserve()`

请求内存块的最小的长度

.......................

## 智能指针模板类

`unique_ptr<typename> p(new typename)`

`shared_ptr<typename> p(new typename)`

```c++
void a()
{
    string * b = new string("adw");
    if(bad())
        throw bad_name();
    delete b;
}
```

常规指针遇到throw会停止，并不会执行throw后面的代码，执行站解退只会释放指针本身的内存而它指向的对象内存不会被释放，造成内存泄漏。

智能指针模板定义了类似指针的对象，他们是一个类模板，包含析构函数。所以当程序遇到throw的时候，执行栈解退的时候，自动调用析构函数，释放内存。