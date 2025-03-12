---
title: 1023 Have Fun with Numbers
tags:
  - PAT
  - C++
categories:
  - [PAT]
date: 2021-06-09T21:54:18.000Z
updated: 2024-10-14T13:54:26.302Z
comments: false

---
Notice that the number 123456789 is a 9-digit number consisting exactly the numbers from 1 to 9, with no duplication. Double it we will obtain 246913578, which happens to be another 9-digit number consisting exactly the numbers from 1 to 9, only in a different permutation. Check to see the result if we double it again!

Now you are suppose to check if there are more numbers with this property. That is, double a given number with *k* digits, you are to tell if the resulting number consists of only a permutation of the digits in the original number.
<!--more-->
### Input Specification:

Each input contains one test case. Each case contains one positive integer with no more than 20 digits.

### Output Specification:

For each test case, first print in a line "Yes" if doubling the input number gives a number that consists of only a permutation of the digits in the original number, or "No" if not. Then in the next line, print the doubled number.

### Sample Input:

```in
1234567899
```

### Sample Output:

```out
Yes
2469135798
```

### Steps

主要难点在于使用`long long`会爆，要使用`string`模拟大数加减。

双倍之后的数字要和原数字个数一致。

### Code

```c++
#include<iostream>
#include<string>
#include<iomanip>
#include<vector>
#include<algorithm>
using namespace std;
// string Double(string originNum)
// {
//     vector<int> carry(originNum.size(), 0);
//     string resultNum = "";
//     for(int i = int(originNum.size()) - 1; i >= 0; i--)
//     {
//         carry[i] = (originNum[i] - '0') * 2;
//     }
//     for(int i = 0; i < int(originNum.size()); i++)
//     {
//         if(carry[i + 1] >= 10 && (i+1) < int(originNum.size()))
//         {
//             int onePlace = (carry[i] % 10) + 1;
//             resultNum += (onePlace + '0');
//         }
//         else
//         {
//             int onePlace = (carry[i] % 10);
//             resultNum += (onePlace + '0');
//         }
//     }
//     if(carry[0] >= 10) 
//     {
//         resultNum.insert(resultNum.begin(), '1');
//     }
//     return resultNum;
// }
string doubleNum(string originNum)
{
    string resultNum = "";
    reverse(originNum.begin(), originNum.end());
    int carry = 0;
    for(char x : originNum)
    {
        int doubleCurrent = (x - '0') * 2 + carry;
        if(doubleCurrent >= 10)
        {
            carry = 1;
            doubleCurrent = doubleCurrent % 10;
        }
        else 
            carry = 0;
        resultNum.insert(resultNum.begin(), doubleCurrent + '0');
    }
    if(carry == 1)
        return "1" + resultNum;
    else
        return resultNum;
}
int main(int argc, char const *argv[])
{
    string originNum;
    cin >> originNum;
    string num = doubleNum(originNum);

    vector<int> n1(10,0), n2(10,0);
    for(auto x : originNum)
    {
        n1[x - '0']++;
    }

    for(auto x : num)
    {
        n2[x - '0']++;
    }
    int flag = 1;
    for(int i = 0; i < 10; i++)
    {
        if(n1[i] != n2[i])
        {
            flag = 0;
            break;
        }
    }
    if(flag == 1) cout << "Yes\n";
    else cout << "No\n";

    cout << num;

    
    return 0;
}
```