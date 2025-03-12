---
title: machine learning
tags:
  - machine learning
categories:
  - [machine learning]
date: 2023-04-14T16:25:58.000Z
updated: 2024-10-14T13:55:50.814Z
comments: false

---
## What's macine learning?

Field of study that qives computers the ability to learn without being explicitly programmed. Arthur Samuel (1959)
<!--more-->
## machine learning algorithms

+ supervised learning
+ unsupervised learning

### supervised learning

Learns from being given ***right answers***

#### algorithms

+ regression(回归)

Predict a number

infinitely many possible outputs

+ classification(分类)

predict categories

small number of possible outputs

### unsupervised learning

Data only comes with inputs $x$ but not output labels $y$.

Algorithm has to find ***structure*** in the data.

#### algorithms

+ clustering

Group similar data
points together

+ Anomaly detection

Find unusual data points

+ Dimensionality reduction

Compress data using fewer
numbers

## liner regression

Model: $f_{w,b}=wx+b$

w,b: parameters(or called coefficient,weights)

### cost function

squared error cost function(也称为损失函数):

$J(w,b)=\frac{1}{2m}\sum\limits_{i=1}^{m}(\hat{y^{(i)}}-y^{(i)})^{2}$

$\hat{y^{(i)}}=f_{w,b}(x^{(i)})$

也称之为残差平方和

我们要做的就是找到最小的J所对应的参数w，b使其更好的拟合training set

### gradient descent

$w=w-\alpha\cdot\frac{\partial}{\partial w}J(w,b)$

$b=b-\alpha\cdot\frac{\partial}{\partial b}J(w,b)$

>注意w，b要***同时***计算，更新后的新值要先存入temp里

其中$\alpha$称为学习率，决定迈出步伐的大小

## underfitting（欠拟合） overfitting（过拟合）

过拟合（overfitting）和欠拟合（underfitting）是机器学习中常见的两种模型训练问题，它们与模型的泛化能力有关。

1. **过拟合（Overfitting）**：
   过拟合指的是模型在训练数据上表现得很好，但在未见过的新数据上表现较差的现象。过拟合通常是因为模型过于复杂**模型容量大**，过度拟合了训练数据的噪声和细节，导致了对新数据的泛化能力不足。过拟合的模型在训练数据上表现良好，但在实际应用中可能无法正确预测新的、未见过的数据。

2. **欠拟合（Underfitting）**：
   欠拟合则是指模型在训练数据上表现较差，无法捕捉到数据的基本模式和关系。通常是因为模型过于简单，无法很好地拟合训练数据的复杂性。欠拟合的模型可能在训练数据和新数据上都表现不佳。

模型容量小，数据简单， 正常
模型容量小，数据复杂， 欠拟合
模型容量大，数据简单， 过拟合
模型容量大，数据复杂， 正常

解决过拟合和欠拟合的方法包括：

+ **过拟合的解决方法**：
  + 增加训练数据，以减少模型对噪声的过度拟合。
  + 使用正则化技术，如L1正则化和L2正则化，以降低模型复杂度。
  + 使用更简单的模型结构。
  + 采用集成学习方法，如随机森林或梯度提升树。

+ **欠拟合的解决方法**：
  + 增加模型复杂度，可以尝试使用更多的特征、更深的网络结构等。
  + 确保输入特征的正确性和有效性。
  + 增加训练迭代次数，以允许模型更好地学习训练数据的模式。
  + 考虑使用更复杂的算法或模型。

>**updating...**