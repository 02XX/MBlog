---
title: return
tags: []
categories:
  - [未分类]
date: 2023-04-04T00:49:29.000Z
updated: 2024-10-14T13:55:52.902Z
comments: false

---

<!--more-->
# return的打断

return代表着从当前函数返回到主函数main中，所以无论在函数中执行循环几次，只要遇见return就会停止循环返回主函数

```c++
template <class T>
int mismatch(const T& arr1, const T& arr2, int total)
{
    for (int i = 0; i < total; ++i) {
        if(arr1[i] != arr2[i]){
            return i; //只要循环中满足条件执行此语句，那么函数将会立即返回不会执行下面的语句
        }
    }
    return -1; //如果循环中一直没有遇见return那么循环将执行完毕，执行循环后的下一句。

}
```