---
title: Monte Carlo
tags:
  - 计算机图形学
categories:
  - [计算机图形学]
date: 2024-09-26T22:53:45.000Z
updated: 2024-10-14T13:55:22.425Z
comments: false

---

<!--more-->
## 随机变量函数的期望

+ 连续型随机变量

$$
\mathbb{E}_p(f(x))=\int p(x)f(x)dx
$$

+ 离散型随机变量

$$
\mathbb{E}_p(f(x))=\sum p(x)f(x)dx
$$

其中:

$x \sim p(x)$

## Monte Carlo 估计

通过对 $p(x)$ 进行采样，对样本进行计算求平均，来近似估计 $\mathbb{E}(f(x))$

$$
\mathbb{E}_p(f(x))\approx\frac{1}{n}\sum_{i=1}^nf(x_i)_{x_i\sim p(x)}
$$

### 例子

$f(x)=x$ 时：

数学期望

$$
\mathbb{E}_p(x)=\int p(x)xdx
$$

Monte Carlo估计

$$
\mathbb{E}_p(x)\approx\frac{1}{n}\sum_{i=1}^nx_i
$$

## Monte Carlo 积分

对于待求积分

$$
\int_a^bf(x)dx
$$

求该积分即求 $g(x)=\frac{f(x)}{p(x)}$ 的期望，即：

$$
\mathbb{E}(g(x))=\int p(x)g(x)dx=\int p(x)\frac{f(x)}{p(x)}dx=\int_a^bf(x)dx
$$

利用Monte Carlo 方法，可得：

$$
\mathbb{E}(g(x))=\int_a^bf(x)dx\approx\frac{1}{n}\sum_{i=1}^n\frac{f(x_i)}{p(x_i)}
$$

### 例子1

当 $x\sim U(a,b)$ 时（对积分域进行均匀采样），可得:

$$
\mathbb{E}(g(x))=\int_a^bf(x)dx\approx\frac{1}{n}\sum_{i=1}^n\frac{f(x_i)}{\frac{1}{b-a}}=\frac{b-a}{n}\sum_{i=1}^nf(x_i)
$$

### 例子2

$$
f(x,y)=
\left\{
    \begin{array}{cccc}
    1& x^2+y^2 \le 1\\
    0 & otherwise
    \end{array}
\right.
$$

积分

$$
\iint_{D}f(x,y)dxdy
$$

对积分区域D进行均匀采样 $p(x,y)=\frac{1}{D}$

$$
\iint_{D}f(x,y)dxdy = \iint_{D}\frac{f(x,y)}{p(x)}p(x)dxdy \approx \frac{D}{n}\sum_{i=1}^n\sum_{j=1}^nf(x_i,y_j)
$$

可以用该公式估算 $\pi$

![pi估计](./monte-carlo/pi.png)

> 一维、二维随机采样
>
> + 一维
>   一维随机采样，是对曲线沿线长进行均匀随即采样
>
> $$
> \frac{\int_a^xdl}{\int_a^bdl}=r
> $$
>
> 其中 $dl=\sqrt{(dx)^2+(dy)^2}=\sqrt{1+(\frac{dy}>{dx})^2} dx$
> 令 $r\sim p(x)$，可得 $x$ 的值( $x\sim p(x)$ )
>
> + 二维
>
> $$
> \frac{\int_a^xds}{\int_a^bds}=r
> $$

其中 $ds=\sqrt{(dydz)^2+(dzdx)^2+(dxdy)^2}=\sqrt{1+(\frac{dz}{dx})^2+(\frac{dz}{dy})^2}dxdy$

> 令 $r\sim p(x)$，可得 $(x,y)$ 的值( $(x,y)\sim p(x,y)$ )

## 重要性采样

> 重要性采样（Importance Sampling）是统计学中估计某一分布性质时使用的一种方法。该方法从与原分布不同的另一个分布中采样，而对原先分布的性质进行估计。

$$
\mathbb{E}(f(x))=\int p(x)f(x)dx = \int \frac{p(x)f(x)}{q(x)}q(x)dx \approx \frac{1}{n}\sum_{i=1}^n\frac{p(x)}{q(x)}f(x_i)_{x_i\sim q(x)} = \frac{1}{n}\sum_{i=1}^n\omega(x_i) f(x_i)_{x_i\sim q(x)}
$$

$q(x)$ 称为重要性分布，通过引入 $q(x)$ 来进行间接采样。 $\omega(x_i)= \frac{p(x)}{q(x)}$ 称为重要性权重。

### 例子

$$
\iint_{\Omega}cos\theta d\theta
$$

均匀采样

$$
\iint_{\Omega}cos\theta d\theta=\iint_{\Omega}\frac{cos\theta}{\frac{1}{2\pi}}\frac{1}{2\pi} d\theta\approx \frac{2\pi}{n}\sum_{i=1}^{n}cos\theta
$$

Cosine Weight重要性采样

$$
\iint_{\Omega}cos\theta d\theta=\iint_{\Omega}\frac{cos\theta}{\frac{cos\theta}{\pi}}\frac{cos\theta}{\pi} d\theta\approx \frac{\pi}{n}\sum_{i=1}^{n}1
$$

## 逆变换采样

用途：从均匀概率分布生成目标概率分布的样本（从一个分布生成另一个分布）

核心思想：若随机变量X为需要采样的样本，X服从某一分布$X\sim PDF_X=f$ 令 $Y=CDF_X(X)=F_X(X)$ 那么Y一定服从 $Y\sim U(0,1)$ 而这一过程的逆方向就是逆变换采样。

>为什么 $Y\sim U(0,1)$
> $CDF_y(Y)=P(Y\leq y)=P(F_X(X)\leq y)=P(X\leq F_X^{-1}(y))=F_X(F_X^{-1}(y))=y$
> 而在区间 $(0,1)$ 的均匀分布的CDF正是 $A\sim U(0,1), F_A(y)=y$

方法：

1. 确定目标PDF
2. 计算对应的CDF以及反函数
3. 生成均匀采样的样本，根据这些样本和反函数生成对应的样本

### 圆内均匀采样

1. 确定目标PDF
在圆内任取一块**单位**面积的PDF为 $\frac{1}{\pi R^2}$
故 $$\int_{circle} \frac{1}{\pi R^2}dA = \int_{circle} \frac{r}{\pi R^2}drd\theta = 1$$
故 $PDF(r,\theta)=\frac{r}{\pi R^2}$
2. 计算对应的CDF以及反函数
$$PDF_r(r,\theta)=\int_0^{2\pi}\frac{r}{\pi R^2}d\theta=\frac{2r}{R^2}$$
$$PDF_{\theta}(r,\theta)=\int_0^{R}\frac{r}{\pi R^2}dr=\frac{1}{2\pi}$$
$$CDF_r(r,\theta)=\int_0^{r}\frac{2r}{R^2}dr=\frac{r^2}{R^2}$$
$$CDF_{\theta}(r,\theta)=\int_0^{\theta}\frac{1}{2\pi}d\theta=\frac{\theta}{2\pi}$$
反函数
$$\xi=CDF_r(r,\theta), r = CDF^{-1}(\xi,\theta)=R\sqrt{\xi}$$
$$\eta=CDF_\theta(r,\theta), \theta = CDF^{-1}(r,\eta)=2\pi\eta$$
其中 $\xi,\eta \sim U(0,1)$

### 球面均匀采样

1. 确定目标PDF
在球面内任取一块**单位**面积的PDF为 $\frac{1}{4\pi}$
故 $$\int_{sphere} \frac{1}{4\pi}dA = \int_{sphere} \frac{1}{4\pi}\sin\theta d\theta d\phi = 1$$
故 $PDF(\theta,\pi)=\frac{1}{4\pi}\sin\theta$
2. 计算对应的CDF以及反函数
$$PDF_\theta(\theta,\pi)=\int_0^{2\pi}\frac{1}{4\pi}\sin\theta d\phi=\frac{1}{2}\sin\theta$$
$$PDF_\phi(\theta,\pi)=\int_0^{\pi}\frac{1}{4\pi}\sin\theta d\theta=\frac{1}{2\pi}$$
$$CDF_\theta(\theta,\phi)=\int_0^{\theta}\frac{1}{2}\sin\theta d\theta=\frac{1-\cos\theta}{2}$$
$$CDF_\phi(\theta,\phi)=\int_0^{\phi}\frac{1}{2\pi} d\phi=\frac{\phi}{2\pi}$$
反函数
$$\xi=CDF_\theta(\theta,\phi), \theta = CDF^{-1}(\xi,\phi)=\arccos(1-2\xi)$$
$$\eta=CDF_\theta(\theta,\phi), \phi = CDF^{-1}(\theta,\eta)=2\pi\eta$$
其中 $\xi,\eta \sim U(0,1)$

### 半球面均匀采样

1. 确定目标PDF
在球面内任取一块**单位**面积的PDF为 $\frac{1}{2\pi}$
故 $$\int_{hemisphere} \frac{1}{2\pi}dA = \int_{hemisphere} \frac{1}{2\pi}\sin\theta d\theta d\phi = 1$$
故 $PDF(\theta,\pi)=\frac{1}{2\pi}\sin\theta$
2. 计算对应的CDF以及反函数
$$PDF_\theta(\theta,\pi)=\int_0^{2\pi}\frac{1}{2\pi}\sin\theta d\phi=\sin\theta$$
$$PDF_\phi(\theta,\pi)=\int_0^{ \frac{\pi}{2} }\frac{1}{2\pi}\sin\theta d\theta=\frac{1}{2\pi}$$
$$CDF_\theta(\theta,\phi)=\int_0^{\theta}\sin\theta d\theta=1-\cos\theta$$
$$CDF_\phi(\theta,\phi)=\int_0^{\phi}\frac{1}{2\pi} d\phi=\frac{\phi}{2\pi}$$
反函数
$$\xi=CDF_\theta(\theta,\phi), \theta = CDF^{-1}(\xi,\phi)=\arccos(1-\xi)$$
$$\eta=CDF_\theta(\theta,\phi), \phi = CDF^{-1}(\theta,\eta)=2\pi\eta$$
其中 $\xi,\eta \sim U(0,1)$

### 半球面余弦权重采样

1. 确定目标PDF
令 $PDF(\theta,\phi) \propto \cos\theta$, $\int_{hemisphere}k\cos\theta dA=\int_{hemisphere}k\cos\theta\sin\theta d\theta d\phi=1$
故 $PDF(\theta,\phi)=\frac{1}{\pi}\cos\theta\sin\theta$
2. 计算对应的CDF以及反函数
$$PDF_\theta(\theta,\pi)=\int_0^{2\pi}\frac{1}{\pi}\cos\theta\sin\theta d\phi=2\sin\theta\cos\theta$$
$$PDF_\phi(\theta,\pi)=\int_0^{ \frac{\pi}{2} }\frac{1}{\pi}\cos\theta\sin\theta d\theta=\frac{1}{2\pi}$$
$$CDF_\theta(\theta,\phi)=\int_0^{\theta}2\sin\theta\cos\theta d\theta=\frac{1-\cos2\theta}{2}$$
$$CDF_\phi(\theta,\phi)=\int_0^{\phi}\frac{1}{2\pi} d\phi=\frac{\phi}{2\pi}$$
反函数
$$\xi=CDF_\theta(\theta,\phi), \theta = CDF^{-1}(\xi,\phi)=\frac{arccos(1-2\xi)}{2}$$
$$\eta=CDF_\theta(\theta,\phi), \phi = CDF^{-1}(\theta,\eta)=2\pi\eta$$
其中 $\xi,\eta \sim U(0,1)$

>从上往下看在平面上投影是均匀的，因此可以将圆内均匀分布的点投影到半球面上作为半球面余弦权重采样
