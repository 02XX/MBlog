---
title: 1024 Palindromic Number
tags:
  - PAT
  - C++
categories:
  - [PAT]
date: 2021-06-14T21:33:31.000Z
updated: 2024-10-14T13:54:27.343Z
comments: false

---
A number that will be the same when it is written forwards or backwards is known as a **Palindromic Number**. For example, 1234321 is a palindromic number. All single digit numbers are palindromic numbers.

Non-palindromic numbers can be paired with palindromic ones via a series of operations. First, the non-palindromic number is reversed and the result is added to the original number. If the result is not a palindromic number, this is repeated until it gives a palindromic number. For example, if we start from 67, we can obtain a palindromic number in 2 steps: 67 + 76 = 143, and 143 + 341 = 484.

Given any positive integer *N*, you are supposed to find its paired palindromic number and the number of steps taken to find it.
<!--more-->
### Input Specification:

Each input file contains one test case. Each case consists of two positive numbers *N* and *K*, where *N* (≤1010) is the initial number and *K* (≤100) is the maximum number of steps. The numbers are separated by a space.

### Output Specification:

For each test case, output two numbers, one in each line. The first number is the paired palindromic number of *N*, and the second number is the number of steps taken to find the palindromic number. If the palindromic number is not found after *K* steps, just output the number obtained at the *K*th step and *K* instead.

### Sample Input 1:

```shell
67 3
```

### Sample Output 1:

```shell
484
2
```

### Sample Input 2:

```shell
69 3
```

### Sample Output 2:

```shell
1353
3
```

### Steps

大数相加，除了要用`string`模拟其他没啥特别需要注意的。

大数相加代码中有一种写法会导致3个测试点不过，目前不知道为什么（待补充）。

### Code

```c++
#include<iostream>
#include<string>
#include<iomanip>
#include<vector>
#include<algorithm>
using namespace std;
string onceOperate(string originNum)
{
    string reverseNum = originNum, resultNum = "";
    reverse(originNum.begin(), originNum.end());
    int carry = 0;
    for(int i = 0; i < int(originNum.size()); i++)
    {
        int add = (originNum[i] - '0') + (reverseNum[i] - '0') + carry;
        if(add >= 10)
        {
            carry = add / 10;
            add = add % 10;
        }
        else
            carry = 0;
        //以下写法有3个测试点不过，不知道为什么
        // int c = carry;
        // int add = (originNum[i] - '0') + (reverseNum[i] - '0');
        // if(add >= 10)
        // {
        //     carry = add / 10;
        //     add = add % 10;
        // }
        // else
        //     carry = 0;
        // resultNum.insert(resultNum.begin(), add + c + '0');
        resultNum.insert(resultNum.begin(), add + '0');
    }
    if(carry > 0)
    {
        return "1" + resultNum;
    }
    else
        return resultNum;
}
bool isPalindromic(string num)
{
    int begin = 0, end = int(num.size() - 1);
    while(begin < end)
    {
        if(num[begin++] != num[end--])
            return false;
    }
    return true;
}
int main(int argc, char const *argv[])
{
    string N;
    int K;
    cin >> N >> K;
    int count = 0;
    while (!isPalindromic(N) && count < K)
    {
        N = onceOperate(N);
        count++;
    }
    cout << N << endl;
    cout << count << endl;
    return 0;
}
```