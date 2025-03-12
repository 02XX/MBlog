---
title: 1021 Deepest Root
tags:
  - PAT
  - C++
categories:
  - [PAT]
date: 2021-05-26T22:28:45.000Z
updated: 2024-10-14T13:54:24.080Z
comments: false

---
A graph which is connected and acyclic can be considered a tree. The height of the tree depends on the selected root. Now you are supposed to find the root that results in a highest tree. Such a root is called **the deepest root**.
<!--more-->
### Input Specification:

Each input file contains one test case. For each case, the first line contains a positive integer *N* (≤104) which is the number of nodes, and hence the nodes are numbered from 1 to *N*. Then *N*−1 lines follow, each describes an edge by given the two adjacent nodes' numbers.

### Output Specification:

For each test case, print each of the deepest roots in a line. If such a root is not unique, print them in increasing order of their numbers. In case that the given graph is not a tree, print `Error: K components` where `K` is the number of connected components in the graph.

### Sample Input 1:

```shell
5
1 2
1 3
1 4
2 5
```

### Sample Output 1:

```shell
3
4
5
```

### Sample Input 2:

```shell
5
1 3
1 4
2 5
3 4
```

### Sample Output 2:

```shell
Error: 2 components
```

### Steps

直接DFS即可

### Code

```C++
#include<iostream>
#include<string>
#include<vector>
using namespace std;
typedef vector<vector<int>> Graph;

int DFSTravel(Graph &G, vector<bool>&visited);
void DFS(Graph &G, vector<bool> &visited, vector<int> &deepestNode, int v, int height,int&tempH);
int maxHeight = 0;
int main()
{
    int node; cin >> node;
    Graph G(node + 1, vector<int>(node + 1, 0));
    for(int i = 0; i < node - 1; i++)
    {
        int n1, n2; cin >> n1 >> n2;
        G[n1][n2] = G[n2][n1] = 1;
    }
    vector<bool> visited(node + 1, false);
    vector<int> deepestNode;
    int c = DFSTravel(G, visited);
    if(c > 1)
    {
        cout << "Error: "<<c <<" components";
    }
    else
    {
        for(int i = 1; i < node + 1; i++)
        {
            int height = 0, tempH = 0;
            for(int j = 1; j < node + 1; j++)
            {
                visited[j] = false;
            }
            DFS(G, visited, deepestNode, i, height, tempH);
            if(tempH > maxHeight)
            {
                maxHeight = tempH;
                deepestNode.clear();
                deepestNode.push_back(i);
            }
            else if(tempH == maxHeight)
            {
                deepestNode.push_back(i);
            }
        }
    }
    if(!deepestNode.empty())
    {
        for(int i = 0; i < int(deepestNode.size()); i++)
        {
            cout << deepestNode[i] << endl;
        }
    }
    return 0;
}


int DFSTravel(Graph &G, vector<bool>&visited)
{
    int componets = 0;
    int h = 0, t = 0;
    vector<int> d;
    for(int i = 1; i < int(visited.size()); i++)
    {
        visited[i] = false;
    }
    for(int i = 1; i < int(visited.size()); i++)
    {
        if(!visited[i])
        {
            DFS(G, visited, d, i, h, t);
            componets++;
        }
    }
    return componets;  
}

void DFS(Graph &G, vector<bool> &visited, vector<int> &deepestNode, int v, int height, int&tempH)
{
    visited[v] = true;
    height++;
    if(height > tempH)
    {
        tempH = height;
    }
    for(int i = 1; i < int(visited.size()); i++)
    {
        if(G[v][i] != 0 && !visited[i])
        {
            DFS(G, visited, deepestNode, i, height, tempH);
        }
    } 
}
```