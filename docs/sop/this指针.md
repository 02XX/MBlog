---
title: this指针
tags: []
categories:
  - [未分类]
date: 2023-04-04T00:49:29.000Z
updated: 2024-10-14T13:55:57.003Z
comments: false

---

<!--more-->
# this指针

在类中每一个成员函数都有一个this指针指向它调用对象的地址。

```c++
//头文件
#include <string>
#ifndef STUENT
#define STUDENT
class Student
{
    private:
    	std::string name;
    	double length;
    	double weight;
    public:
    	Student(); //构造函数
    	Student(std::string, double, double); //构造函数
    	~Student(); //析构函数
    	void show_name() const;
    	void show_length() const;
    	void show_weight() const;
    	const double & taller(const Student &) const; //返回身高的引用
};
#endif
```

```c++
//源代码
#include<iostream>
Student::~Student() //析构函数需要定义
{

}

Student::Student(std::string n, double l, double w)
{
    name = n;
    length = l;
    weight = w;
}
void Student::show_name() const
{
    std::cout << name << std::endl;
}
void Student::show_length() const
{
    std::cout << length << std::endl;
}
void Student::show_weight() const
{
    std::cout << weight << std::endl;
}
const double & Student::taller(const Student & s) const
{
    if (s.length > length)
    {
        std::cout << "taller is " << s.name << " length: " << s.length << std::endl;
        return s.length;
    }
    if (s.length < length)
    {
        std::cout << "taller is " << name << " length: " << length << std::endl;
        return (*this).length; //this指针指的是调用对象的地址
    }
    if (s.length == length)
    {
        std::cout << "the same length\n";
        
    }
}
```

```c++
//main函数
#include<iostream>
#include "test.h"

int main()
{
    std::cout << "Student A:\n";
    Student A = {"小明", 1.75, 90};
    A.show_name();
    A.show_length();
    A.show_weight();
    std::cout << "Student B:\n";
    Student B {"小王", 1.80, 80};
    B.show_name();
    B.show_length();
    B.show_weight();
    std::cout << "-----------------------------\n";
    B.taller(A);//在这里this指的是B对象的地址
    A.taller(B);//在这里this指的是A对象的地址
    system("pause");
    return 0;
}
```