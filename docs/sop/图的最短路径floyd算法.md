---
title: 图的最短路径floyd算法
tags:
  - C++
  - algorithm
categories:
  - [algorithm]
date: 2021-05-16T10:36:56.000Z
updated: 2024-10-14T13:56:13.803Z
comments: false

---
floyd查找最短路径的核心就是中转点。
<!--more-->
## Steps

+ 维护一个`A`矩阵记录，从`i`到`j`的最短路径。矩阵`path`记录，从`i`到`j`的中转点。

+ 初始化`A`以V<sub>0</sub>为中转点，`path`值全部置为`-1`

+ 遍历所有顶点V<sub>i</sub>，如果其他点以V<sub>i</sub>为中转点的最短路径比原来的小，则更新最短路径。

## Tips

floyd算法适用于带负权值的带权图，但是不是适用于**带负权值的边组成回路**的带权图

## Code

```C++
void showPath(Graph path, int origin, int target)
{
    if(path[origin][target] > -1)
    {
        showPath(path, origin, path[origin][target]);
        showPath(path, path[origin][target], target);
    }
    else
    {
        cout << "-->" << target;
    }
}
void floyd(Graph G, int origin, int target)
{
    //A记录最短路径 path记录最短路径的中转点
    Graph A = G, path(SIZE, vector<int>(SIZE, -1));
    //递推产生矩阵
    for(int k = 0; k < SIZE; k++) //k中转点
    {
        //检查矩阵中的所有值
        for(int row = 0; row < SIZE; row++)
        {
            for(int column = 0; column < SIZE; column++)
            {
                if(A[row][k] == INT_MAX || A[k][column] == INT_MAX) 
                    continue;
                if(A[row][column] > A[row][k] + A[k][column])
                {
                    A[row][column] = A[row][k] + A[k][column];
                    path[row][column] = k;
                }
            }
        }
    }
    cout << "最短路径长度为：" << A[origin][target] << endl;
    cout << "最短路径为: " << origin;
    showPath(path, origin, target);
}
```