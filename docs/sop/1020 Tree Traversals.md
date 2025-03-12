---
title: 1020 Tree Traversals
tags:
  - PAT
  - C++
categories:
  - [PAT]
date: 2021-05-13T23:00:53.000Z
updated: 2024-10-14T13:54:23.058Z
comments: false

---

<!--more-->
### Question

Suppose that all the keys in a binary tree are distinct positive integers. Given the postorder and inorder traversal sequences, you are supposed to output the level order traversal sequence of the corresponding binary tree.

### Input Specification:

Each input file contains one test case. For each case, the first line gives a positive integer *N* (≤30), the total number of nodes in the binary tree. The second line gives the postorder sequence and the third line gives the inorder sequence. All the numbers in a line are separated by a space.

### Output Specification:

For each test case, print in one line the level order traversal sequence of the corresponding binary tree. All the numbers in a line must be separated by exactly one space, and there must be no extra space at the end of the line.

### Sample Input:

```in
7
2 3 1 5 7 6 4
1 2 3 4 5 6 7
```

### Sample Output:

```out
4 1 6 3 5 7 2
```

---

### Steps

+ 使用递归的思想构建比较容易想出来
+ 先找到中序序列的分解线`pLine`，同时记录已经遍历的节点数`count`，这个个数便于分开后序序列。
+ 注意不能用`pLine`代替`count`若节点某一子树为空，则会出错，具体看代码中的注释。

## Code

```c++
#include<iostream>
#include<string>
#include<iomanip>
#include<vector>
#include<queue>
using namespace std;

struct node
{
    int data;
    node* lchild;
    node* rchild;
};
node* build(vector<int> &inOrder, vector<int> &postOrder, int inBegin, int inEnd, int postBegin, int postEnd)
{
    if(inBegin > inEnd || postBegin > postEnd)
    {
        return nullptr;
    }
    //找到左右子树分割线
    int pLine = inBegin;
    int count = 0;
    while(postOrder[postEnd] != inOrder[pLine])
    {
        pLine++;
        count++;
    }
    node *root = new node();
    root->data = postOrder[postEnd];
    //不能用pLine代替count,可能会越界,注释的两条为错的。比如inOrder = {1,2,3}, postOrder = {2,3,1}
    root->lchild = build(inOrder, postOrder, inBegin, pLine - 1, postBegin, postBegin + count - 1);
    // root->lchild = build(inOrder, postOrder, inBegin, pLine - 1, postBegin, pLine - 1);
    root->rchild = build(inOrder, postOrder, pLine + 1, inEnd, postBegin + count, postEnd - 1);
    // root->rchild = build(inOrder, postOrder, pLine + 1, inEnd, pLine + 1, postEnd - 1);
    return root;
}
void levelOrder(node* root, int N)
{
    queue<node*> q;
    q.push(root);
    int count = 0;
    while(!q.empty())
    {
        cout << q.front()->data;
        count++;
        if(count < N)
        {
            cout << " ";
        }

        if(q.front()->lchild != nullptr)
            q.push(q.front()->lchild);
        if(q.front()->rchild != nullptr)
            q.push(q.front()->rchild);

        q.pop();
    }
}


int main(int argc, char const *argv[])
{

    int N;
    cin >> N;
    vector<int> inOrder(N), postOrder(N);
    for (int i = 0; i < N; i++)
    {
        cin >> postOrder[i];
    }
    for (int i = 0; i < N; i++)
    {
        cin >> inOrder[i];
    }

    node* tree = build(inOrder, postOrder, 0, N - 1, 0, N - 1);
    levelOrder(tree,N);


    return 0;
}
```