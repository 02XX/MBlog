---
title: 1017 Queueing at Bank
tags:
  - PAT
  - C++
categories:
  - [PAT]
date: 2021-05-12T23:06:37.000Z
updated: 2024-10-14T13:54:22.043Z
comments: false

---
## Question

Suppose a bank has *K* windows open for service. There is a yellow line in front of the windows which devides the waiting area into two parts. All the customers have to wait in line behind the yellow line, until it is his/her turn to be served and there is a window available. It is assumed that no window can be occupied by a single customer for more than 1 hour.

Now given the arriving time *T* and the processing time *P* of each customer, you are supposed to tell the average waiting time of all the customers.
<!--more-->
### Input Specification:

Each input file contains one test case. For each case, the first line contains 2 numbers: *N* (≤104) - the total number of customers, and *K* (≤100) - the number of windows. Then *N* lines follow, each contains 2 times: `HH:MM:SS` - the arriving time, and *P* - the processing time in minutes of a customer. Here `HH` is in the range [00, 23], `MM` and `SS` are both in [00, 59]. **It is assumed that no two customers arrives at the same time.**

Notice that the bank opens from 08:00 to 17:00. Anyone arrives early will have to wait in line till 08:00, and anyone comes too late (at or after **17:00:01**) will not be served nor counted into the average.

### Output Specification:

For each test case, print in one line the average waiting time of all the customers, in minutes and accurate up to 1 decimal place（精确到小数点后一位）.

### Sample Input:

```in
7 3
07:55:00 16
17:00:01 2
07:59:59 15
08:01:00 60
08:00:00 30
08:00:02 2
08:03:00 10
```

### Sample Output:

```out
8.2
```

-----

## Notice

- It is assumed that no two customers arrives at the same time.

+ at or after **17:00:01**
+ 不被服务的人数不被算在总数中

## Steps

+ 记录每个窗口服务结束的时间
+ 下一个客户到达的时候选择服务结束时间最早的窗口，记为T<sub>min</sub>
  + 其中如果到达时间比结束最早的还要早，那么他就要等待**至**T<sub>min</sub>，窗口服务的时间=T<sub>min</sub>+需要服务的时间
  + 如果到达的时间比结束时间晚，那么他不需要等待，直接被服务，窗口结束时间=他到达的时间 + 需要服务的时间

## Code

```c++
#include<iostream>
#include<string>
#include<iomanip>
#include<algorithm>
#include<vector>
#include<climits>
using namespace std;
struct cus
{
    int atTime;
    int severTime;
};
int transform(string t)
{
    int HH, MM, SS;
    HH = ((t[0] - '0') * 10 + (t[1] - '0')) * 3600;
    MM = ((t[3] - '0') * 10 + (t[4] - '0')) * 60;
    SS = ((t[6] - '0') * 10 + (t[7] - '0'));
    return HH + MM + SS;
}
bool compare(cus A, cus B)
{
    return A.atTime < B.atTime;
}
double sum(vector<cus> customersTime, int K)
{
    int wait = 0;
    sort(customersTime.begin(), customersTime.end(), compare);
    //服务完后的窗口时间
    vector<int> windowsTime(K, 28800);
    for(auto customer : customersTime)
    {
        if(customer.atTime == 0)
            continue;
        //找到最早服务完的窗口
        int min = INT_MAX, index = 0;
        for(size_t i = 0; i < windowsTime.size(); i++)
        {
            if(windowsTime[i] < min)
            {
                min = windowsTime[i];
                index = i;
            }
        }
        int waitTime = min - customer.atTime;
        if(waitTime > 0) //来的比最早的窗口早
        {
            wait += waitTime;
            windowsTime[index] += customer.severTime * 60;
        }
        else //来的比最早的晚
        {
            windowsTime[index] = customer.atTime + customer.severTime * 60;
        }

    }
    return wait;
}
int main(int argc, char const *argv[])
{
    int N, K;
    cin >> N >> K;
    
    vector<cus> customersTime(N);
    vector<int> waitTime(N);
    int severPeople = 0;
    for (int i = 0; i < N; i++)
    {
        string A;
        int P;
        cin >> A >> P;
        int t = transform(A);
        // if(t < 28800)
        // {
        //     remainTime += 28800 - t;
        //     t = 28800;    
        // }
        if(t >= 61201)
        {
            continue;
        }
        customersTime[i] = cus {t, P};
        severPeople++;
    }
    
    cout << setiosflags(ios::fixed) << setprecision(1);
    cout << sum(customersTime, K) / (double(severPeople) * 60);
    return 0;
}
```