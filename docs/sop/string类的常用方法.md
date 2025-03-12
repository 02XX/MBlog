---
title: string类的常用方法
tags: []
categories:
  - [未分类]
date: 2023-04-04T00:49:29.000Z
updated: 2024-10-14T13:55:55.969Z
comments: false

---

<!--more-->
# string类的常用方法

## 1 string转换为char*

### 1.1 使用`c_str()`方法

```c++
#include <string>
#include <iostream>
#include <stdio.h>

using namespace std;

int main()
{
    string strOutput = "Hello World";

    cout << "[cout] strOutput is: " << strOutput << endl;
     
    // string 转换为 char*
    const char* pszOutput = strOutput.c_str();
    
    printf("[printf] strOutput is: %s\n", pszOutput);
     
    return 0;
}
```
+ `cout`可直接输出`string`类的对象的内容；

+ 使用`c_str()`方法转换`string`类型到`char*`类型时，需要为`char*`添加` const `关键字；

+ `printf()`函数不能直接打印`string`类的对象的内容，可以通过将`string`转换为`char*`类型，再使用 `printf()`函数打印。

### 2.2 data()方法与c_str()方法

`data()`方法与`c_str()`方法相似，都返回`const char*`类型。两者区别和联系如下：

+ 在C++98版本中，c_str()返回 const char* 类型，返回的字符串会以空字符（null character）结尾；
+ 在C++98版本中，data()返回 const char* 类型，返回的字符串不以空字符（null character）结尾；
+ 在C++11版本中，c_str()与data()用法相同（Both string::data and string::c_str are synonyms and return the same value.）

## 2 计算string长度、string字符串比较


```c++
#include <string>
#include <iostream>
#define HELLOSTR "Hello World"

using namespace std;

int main()
{
    string strOutput = "Hello World";

    int nLen = strOutput.length();
     
    cout << "the length of strOutput is: " << nLen << endl;
     
    if (0 == strOutput.compare(HELLOSTR))
    {
        cout << "strOutput equal with macro HELLOSTR" << endl;
    }
     
    return 0;
}
```

+ `string`类型可直接使用`length() `方法计算字符串长度，该方法计算结果为字符串的实际长度，如本例中`"Hello World"`字符串的长度为11；

+ `string`类型可使用 `compare(const string& str) `方法进行字符串比较。

## 3 string对象判空

  可使用`empty()`方法对string类型的对象进行判空，如下：

```c++
if (str2.empty())
{
    cout << "str2 is empty." << endl;
}
```
## 4 char*、char[]转换为string
将 `char*`、`char[]` 转换为 `string` 类型时，直接进行赋值操作，将 `char*`、`char[]`的变量赋值给`string`对象即可。

+ ps：这里所说的“赋值”操作，实际上是将`char*`、`char[]` 定义的字符串的首地址赋值给 `string` 对象了。

```c++
#include <string>
#include <iostream>

using namespace std;

int main()
{
    const char* pszName = "liitdar";
    char pszCamp[] = "alliance";

    string strName;
    string strCamp;
     
    strName = pszName;
    strCamp = pszCamp;
     
    cout << "strName is: " << strName << endl;
    cout << "strCamp is: " << strCamp << endl;
     
    return 0;
}
```
## 5 string类的find方法
使用string类的find方法，在字符串中检索自字符串是否存在。

### 5.1 用法

```c++
size_t find (const string& str, size_t pos = 0) const;
size_t find (const char* s, size_t pos = 0) const;
size_t find (const char* s, size_t pos, size_t n) const;
size_t find (char c, size_t pos = 0) const;
```

### 5.2 返回值
find函数返回值：

```c++
The position of the first character of the first match. If no matches were found, the function returns string::npos.

size_t is an unsigned integral type (the same as member type string::size_type).
```

### 5.3示例代码

```c++
#include <string>
#include <iostream>

using namespace std;

int main()
{
    // 待检索的字符串
    string strOutput = "|0|1|2|";
    // 需要检索的子串
    string strObj = "|1|";

    // 子串位于字符串中的位置
    size_t nLoc = strOutput.find(strObj);
    // 如果检索到子串在字符串中，则打印子串的位置
    if (nLoc != string::npos)
    {
        cout << "nLoc is: " << nLoc << endl;
    }
     
    return 0;
}
```
## 6 string类的insert方法

```c++
#include <iostream>
#include <string>

using namespace std;

int main()
{
    string strDemo = "I am";

    strDemo.insert(4, " good.");
     
    cout << "strDemo is: " << strDemo << endl; // I am good
     
    return 0;
}
```

## 7 int类型转为string类的方法

```c++
#include <string>
#include <iostream>
#include <sstream>

using namespace std;

int main()
{
    // 方法1
    int nNum1 = 123;
    stringstream ss;

    ss << nNum1;
    string strTest1 = ss.str();
    cout << "strTest1 is: " << strTest1 << endl;
     
    /*
    string strTest2;
    strTest2 << ss;     // stringstream 未定义 << 操作符，故此句报错
    cout << "strTest2 is: " << strTest2 << endl;
    */
     
    string strTest3;
    ss >> strTest3;
    cout << "strTest3 is: " << strTest3 << endl;
     
    // 方法2
    int nNum2 = 456;
    string strTest4;
    strTest4 = to_string(nNum2);    // C++11 标准
    cout << "strTest4 is: " << strTest4 << endl;
     
    return 0;
}
```