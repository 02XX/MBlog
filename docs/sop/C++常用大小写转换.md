---
title: C++常用大小写转换
tags: []
categories:
  - [未分类]
date: 2023-04-04T00:49:29.000Z
updated: 2024-10-14T13:55:07.292Z
comments: false

---

<!--more-->
# C++常用大小写转换

## string类

1. 如果使用string类，可以使用`#include <algorithm>`里的如下方法进行大小写转换；`transform(str.begin(),str.end(),str.begin(),::tolower)`，记得`::tolower`前面有`::`,　而且是`::tolower`，不是`::tolower()`

```c++
#include <iostream>
#include <algorithm>
 
using namespace std;
string s;
int main() {
    cout<<"请输入一个含大写的字符串：";
    string str;
    cin>>str;
    ///转小写
    transform(str.begin(),str.end(),str.begin(),::tolower);
    cout<<"转化为小写后为："<<str<<endl;
    transform(str.begin(),str.end(),str.begin(),::toupper);
    cout<<"转化为大写后为："<<str<<endl;
    return 0;
}
```

2. string类也可以自己手写两个转化为大写和小写`transform()`方法，如下所示：

```c++
#include <iostream>
#include <algorithm>
#include <cstring>
using namespace std;
void mytolower(string& s){
    int len=s.size();
    for(int i=0;i<len;i++){
        if(s[i]>='A'&&s[i]<='Z'){
            s[i]+=32;//+32转换为小写
            //s[i]=s[i]-'A'+'a';
        }
    }
}
void mytoupper(string& s){
    int len=s.size();
    for(int i=0;i<len;i++){
        if(s[i]>='a'&&s[i]<='z'){
            s[i]-=32;//+32转换为小写
            //s[i]=s[i]-'a'+'A';
        }
    }
}
 
int main() {
    cout<<"请输入一个含大写的字符串：";
    string str;
    cin>>str;
    ///转小写
    mytolower(str);
    cout<<"转化为小写后为："<<str<<endl;
    mytoupper(str);
    cout<<"转化为大写后为："<<str<<endl;
    return 0;
}
```

## char类

1. 如果用char数组，也可以自己手写两个转化为大写和小写方法，此种方法用到了`tolower(char c)`和`toupper(char c)`两个方法

```c++
#include <iostream>
#include <algorithm>
#include <cstring>
using namespace std;
void mytolower(char *s){
    int len=strlen(s);
    for(int i=0;i<len;i++){
        if(s[i]>='A'&&s[i]<='Z'){
            s[i]=tolower(s[i]);
            //s[i]+=32;//+32转换为小写
            //s[i]=s[i]-'A'+'a';
        }
    }
}
void mytoupper(char *s){
    int len=strlen(s);
    for(int i=0;i<len;i++){
        if(s[i]>='a'&&s[i]<='z'){
            s[i]=toupper(s[i]);
            //s[i]-=32;//+32转换为小写
            //s[i]=s[i]-'a'+'A';
        }
    }
}
 
int main() {
    cout<<"请输入一个含大写的字符串：";
    char s[201];
    gets(s);
    ///转小写
 
    mytolower(s);
    cout<<"转化为小写后为："<<s<<endl;
    mytoupper(s);
    cout<<"转化为大写后为："<<s<<endl;
    return 0;
}
```

4. 如果用char数组，也可以使用s[i]+=32或者s[i]=s[i]-'A'+'a'的形式，实现两个转化为大写和小写方法

```c++
#include <iostream>
#include <algorithm>
#include <cstring>
using namespace std;
void mytolower(char *s){
    int len=strlen(s);
    for(int i=0;i<len;i++){
        if(s[i]>='A'&&s[i]<='Z'){
            s[i]+=32;//+32转换为小写
            //s[i]=s[i]-'A'+'a';
        }
    }
}
void mytoupper(char *s){
    int len=strlen(s);
    for(int i=0;i<len;i++){
        if(s[i]>='a'&&s[i]<='z'){
            s[i]-=32;//+32转换为小写
            //s[i]=s[i]-'a'+'A';
        }
    }
}
 
int main() {
    cout<<"请输入一个含大写的字符串：";
    char s[201];
    gets(s);
    ///转小写
    mytolower(s);
    cout<<"转化为小写后为："<<s<<endl;
    mytoupper(s);
    cout<<"转化为大写后为："<<s<<endl;
    return 0;
}
```