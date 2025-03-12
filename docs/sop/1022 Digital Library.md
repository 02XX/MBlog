---
title: 1022 Digital Library
tags:
  - PAT
  - C++
categories:
  - [PAT]
date: 2021-06-07T23:30:19.000Z
updated: 2024-10-14T13:54:25.248Z
comments: false

---
A Digital Library contains millions of books, stored according to their titles, authors, key words of their abstracts, publishers, and published years. Each book is assigned an unique 7-digit number as its ID. Given any query from a reader, you are supposed to output the resulting books, sorted in increasing order of their ID's.
<!--more-->
### Input Specification:

Each input file contains one test case. For each case, the first line contains a positive integer *N* (≤104) which is the total number of books. Then *N* blocks follow, each contains the information of a book in 6 lines:

- Line #1: the 7-digit ID number;
- Line #2: the book title -- a string of no more than 80 characters;
- Line #3: the author -- a string of no more than 80 characters;
- Line #4: the key words -- each word is a string of no more than 10 characters without any white space, and the keywords are separated by exactly one space;
- Line #5: the publisher -- a string of no more than 80 characters;
- Line #6: the published year -- a 4-digit number which is in the range [1000, 3000].

It is assumed that each book belongs to one author only, and contains no more than 5 key words; there are no more than 1000 distinct key words in total; and there are no more than 1000 distinct publishers.

After the book information, there is a line containing a positive integer *M* (≤1000) which is the number of user's search queries. Then *M* lines follow, each in one of the formats shown below:

- 1: a book title
- 2: name of an author
- 3: a key word
- 4: name of a publisher
- 5: a 4-digit number representing the year

### Output Specification:

For each query, first print the original query in a line, then output the resulting book ID's in increasing order, each occupying a line. If no book is found, print `Not Found` instead.

### Sample Input:

```in
3
1111111
The Testing Book
Yue Chen
test code debug sort keywords
ZUCS Print
2011
3333333
Another Testing Book
Yue Chen
test code sort keywords
ZUCS Print2
2012
2222222
The Testing Book
CYLL
keywords debug book
ZUCS Print2
2011
6
1: The Testing Book
2: Yue Chen
3: keywords
4: ZUCS Print
5: 2011
3: blablabla
```

### Sample Output:

```out
1: The Testing Book
1111111
2222222
2: Yue Chen
1111111
3333333
3: keywords
1111111
2222222
3333333
4: ZUCS Print
1111111
5: 2011
1111111
2222222
3: blablabla
Not Found
```

### Steps

建立map来一一对应

### Notice

+ `Input Specification`中`keywords`的IO操作
+ 使用`set`来记录`ID`其优点是元素是独一无二的，其次元素是有序的，省略了排序的过程
+ 注意`ID`要用`string`来存储，否则`00001`这种`ID`会存储成`1`导致后面测试点不过(大坑)

### Code

```c++
#include<iostream>
#include<string>
#include<iomanip>
#include<map>
#include<set>
#include<vector>
#include<algorithm>
using namespace std;
vector<string> split(string keyWords)
{
    vector<string> kw;
    string subString = "";
    for(auto x : keyWords)
    {
        if(x != ' ')
        {
            subString += x;
        }
        else
        {
            kw.push_back(subString);
            subString = "";
        }
    }
    kw.push_back(subString);
    return kw;
}
pair<int, string> getQ(string q)
{
    string flag, question;
    flag = q.substr(0,1);
    question = q.substr(3, int(q.size()));
    return {flag[0] - '0', question};
}
bool cmp(int a, int b)
{
    return a < b;
}
// map<string, vector<int>> bookTitle, author, keyWords, publisher, year;
vector<map<string, set<string>>> l(5);
int main(int argc, char const *argv[])
{
    int number; cin >> number;
    for(int i = 0; i < number; i++)
    {
        string iD;
        string bT, aT, kW, pL, yE;
        cin >> iD;
        cin.get();
        getline(cin, bT);
        getline(cin, aT);
        getline(cin, kW);
        getline(cin, pL);
        getline(cin, yE);
        l[0][bT].insert(iD);
        l[1][aT].insert(iD);
        vector<string> subKw = split(kW);
        for(auto x : subKw)
        {
            l[2][x].insert(iD);
        }
        l[3][pL].insert(iD);
        l[4][yE].insert(iD);
    }
    int q; cin >> q;
    cin.get();
    vector<pair<int, string>> query(q);
    string temp;
    for(int i = 0; i < q; i++)
    {
        getline(cin, temp);
        query[i] = getQ(temp);
    }
    for(auto x : query)
    {
        int flag = x.first; string q = x.second;
        cout << flag << ": " << q << endl;
        if(l[flag - 1].find(q) != l[flag - 1].end())
        {
            // sort(l[flag - 1][q].begin(), l[flag - 1][q].end(), cmp);
            for(auto y : l[flag - 1][q])
            {
                if(l[flag - 1].find(q) != l[flag - 1].end())
                {
                    cout << y << endl;
                }  
            }
        }
        else
        {
            cout << "Not Found\n";
        }  
    }
    return 0;
}
```