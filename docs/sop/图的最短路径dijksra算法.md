---
title: 图的最短路径dijksra算法
tags:
  - C++
  - algorithm
categories:
  - [algorithm]
date: 2021-05-16T09:51:08.000Z
updated: 2024-10-14T13:56:12.662Z
comments: false

---
dijksra也是贪婪算法的一种
<!--more-->
## Steps

维护数组`path`、`dist`和集和`S`，其中`path`记录最短路径上每个顶点的前驱顶点（若有记录顶点编号，若无记录-1），`dist`记录到每个节点的最短路径长度（若有记录距离，若无记录∞），集和`S`记录已经确定最短路径的顶点。

每次都选取从当前顶点出发距离最近的顶点，并更新`dist`，`path`

## Tips

dijksra适用于有向图，无向图和带权图，但是不适用于带**负权值**的带权图

## Code

```C++
void dijsktra(Graph G, int origin, int target)
{
    set<int> S {0};
    //初始化dist, path
    vector<int> dist(SIZE, INT_MAX), path(SIZE, -1);
    for(int i = 0; i < SIZE; i++)
    {
        if(G[origin][i] != INT_MAX)
        {
            dist[i] = G[origin][i];
            path[i] = origin;
        }
    }
    //记录父顶点
    int father = origin;
    while(S.size() < SIZE)
    {
        //找出从当前节点出发的最小路径长度，即dist的最小值
        int minPath = INT_MAX, minNode = -1;
        for(int i = 0; i < SIZE; i++)
        {
            if(S.find(i) == S.end() && dist[i] < minPath)
            {
                minNode = i; 
                minPath = dist[i];
            }     
        }
        father = minNode;
        //加入集和
        S.insert(minNode);
        //找到当前顶点的邻接顶点， 记录路径长度，并更新dist,path
        for(int i = 0; i < SIZE; i++)
        {
            if(S.find(i) == S.end() && G[minNode][i] != INT_MAX && (dist[minNode] + G[minNode][i]) < dist[i])
            {
                dist[i] = dist[minNode] + G[minNode][i];
                path[i] = minNode; 
            }
        }
    }
    cout << "从" << origin << "到" << target << "的最短路径长度为: " << dist[target] << endl; 
    cout << "最短带权路径为: ";
    int i = target;
    while(path[i] != -1)
    {
        cout << i << "<--";
        i = path[i];
    }
    cout << origin;
}
```