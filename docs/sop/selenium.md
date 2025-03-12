---
title: selenium
tags: []
categories:
  - [未分类]
date: 2023-04-04T00:49:29.000Z
updated: 2024-10-14T13:55:53.915Z
comments: false

---

<!--more-->
# selenium

## WebDriver对象

`webdriver`就是浏览器本身

```python
wd = webdriver.Edge("path to webdriver.exe") //实例化，选择对应浏览器的webdriver.exe 返回值是WebDriver对象
>>> type(wd)
>>> <class 'selenium.webdriver.edge.webdriver.WebDriver'>
```

## WebElement对象

```python
wd.get("https://www.baidu.com")
element = wd.find_element_by_id("kw")
>>> type(element)
>>> <class 'selenium.webdriver.remote.webelement.WebElement'>
```

## implicitly_wait()

程序执行的速度是很快的，有时候会超过服务器的响应时间，导致定位元素会出现报错，`NoSuchElementException`

`implicitly_wait(10)`可以隐式的设置等待描述，一但程序设置了`implicitly_wait()`那么定位元素的操作在服务器响应速度慢的时候不会立刻抛出错误，而是每隔半秒去操作，直至10秒（设置的描述）过后或者没有找到元素的时候才抛出错误

## 操纵元素

### WebElement方法

`click()`

`text`

### WebDriver方法

`send_keys()`

`quit()`

### 获取整个元素对应的HTML

要获取整个元素对应的HTML文本内容，可以使用 `element.get_attribute('outerHTML')`

如果，只是想获取某个元素 `内部` 的HTML文本内容，可以使用 `element.get_attribute('innerHTML')`

## CSS Selector

```python
find_element_by_css_selector(CSS Selector参数)
```

选择所有元素的方法是

```python
find_elements_by_css_selector(CSS Selector参数)
```

### 根据 tag名、id、class 选择元素

#### class

注意`.`

```python
elements = wd.find_elements_by_css_selector('.plant')
```

#### tag

```python
elements = wd.find_elements_by_css_selector('div')
```

#### id

注意`#`

```python
element = wd.find_element_by_css_selector('#searchtext')
```

### 选择 子元素 和 后代元素

直接子元素是父亲和儿子关系的元素，***必须相邻***

后代元素是孙子，重孙子等关系，不用相邻

#### 如果 `元素2` 是 `元素1` 的 ***直接子元素***

CSS Selector 选择子元素的语法是这样的

```python
元素1 > 元素2
```

中间用一个大于号 （我们可以理解为箭头号）

注意，最终选择的元素是 **元素2**， 并且要求这个 **元素2** 是 **元素1** 的***直接子元素***

也支持更多层级的选择， 比如

```
元素1 > 元素2 > 元素3 > 元素4
```

就是选择 `元素1` 里面的子元素 `元素2` 里面的子元素 `元素3` 里面的子元素 `元素4` ， 最终选择的元素是 **元素4**

#### 如果 `元素2` 是 `元素1` 的 ***后代元素***，

CSS Selector 选择后代元素的语法是这样的

```
元素1   元素2
```

中间是一个或者多个空格隔开

最终选择的元素是 **元素2** ， 并且要求这个 **元素2** 是 **元素1** 的***后代元素***。

也支持更多层级的选择， 比如

```
元素1   元素2   元素3  元素4
```

最终选择的元素是 **元素4**

### 其他属性

id、class 都是web元素的 ```属性``` ，因为它们是很常用的属性，所以css选择器专门提供了根据 id、class 选择的语法。

***其他属性可以根据方括号 `[]`来选择*** 

```python
element = wd.find_element_by_css_selector('[href="http://www.miitbeian.gov.cn"]')
```

### 组合使用

如果一个元素具有多个属性

```html
<div class="misc" ctype="gun">沙漠之鹰</div>
```

CSS 选择器 可以指定 选择的元素要 同时具有多个属性的限制，像这样 `div[class=misc][ctype=gun]`

### 组选择

同时选择所有class 为 plant `和` class 为 animal 的元素。

这种情况，css选择器可以 使用 `逗号` ，称之为 组选择（==**或**的关系==）

```html
.plant , .animal
```

再比如，我们要同时选择所有tag名为div的元素 `和` id为BYHY的元素，就可以像这样写

```html
div,#BYHY
```

对应的selenium代码如下

```python
elements = wd.find_elements_by_css_selector('div,#BYHY')
for element in elements:
    print(element.text)
```

### 按次序选择元素

```html
    <body>  
       <div id='t1'>
           <h3> 唐诗 </h3>
           <span>李白</span>
           <p>静夜思</p>
           <span>杜甫</span>
           <p>春夜喜雨</p>              
       </div>      
        
       <div id='t2'>
           <h3> 宋词 </h3>
           <span>苏轼</span>
           <p>赤壁怀古</p>
           <p>明月几时有</p>
           <p>江城子·乙卯正月二十日夜记梦</p>
           <p>蝶恋花·春景</p>
           <span>辛弃疾</span>
           <p>京口北固亭怀古</p>
           <p>青玉案·元夕</p>
           <p>西江月·夜行黄沙道中</p>
       </div>             

    </body>
```

我们可以指定选择的元素 `是父元素的第几个子节点`

==**使用 `nth-child`**==

比如，

我们要选择 唐诗 和宋词 的第一个 作者，

也就是说 选择的是 第2个子元素，并且是span类型

所以这样可以这样写 `span:nth-child(2)` ，

如果你不加节点类型限制，直接这样写 `:nth-child(2)`

就是选择所有位置为第2个的所有元素，不管是什么类型

也可以反过来， 选择的是父元素的 `倒数第几个子节点` ，

==**使用 `nth-last-child`**==

比如：

```html
p:nth-last-child(1)
```

就是选择第倒数第1个子元素，并且是p元素

我们可以指定选择的元素 是父元素的第几个 `某类型的` 子节点

==**使用 `nth-of-type`**==

比如，

我们要选择 唐诗 和宋词 的第一个 作者，

可以像上面那样思考：选择的是 第2个子元素，并且是span类型

所以这样可以这样写 `span:nth-child(2)` ，

还可以这样思考，选择的是 `第1个span类型` 的子元素

所以也可以这样写 `span:nth-of-type(1)`

当然也可以反过来， 选择父元素的 `倒数第几个某类型` 的子节点

==**使用 `nth-last-of-type`**==

像这样

```html
p:nth-last-of-type(2)
```

如果要选择的是父元素的 `偶数节点`，

==**使用 `nth-child(even)`**==

比如

```html
p:nth-child(even)
```

如果要选择的是父元素的 `奇数节点`，使用 `nth-child(odd)`

```html
p:nth-child(odd)
```

如果要选择的是父元素的 `某类型偶数节点`，使用 ==**`nth-of-type(even)`**==

如果要选择的是父元素的 `某类型奇数节点`，使用 ==**`nth-of-type(odd)`**==

## frame切换

在html语法中，frame 元素 或者iframe元素的内部 会包含一个 **被嵌入的** 另一份html文档。

在我们使用selenium打开一个网页是， 我们的操作范围 缺省是当前的 html ， 并不包含被嵌入的html文档里面的内容。

如果我们要 操作 被嵌入的 html 文档 中的元素， 就必须 `切换操作范围` 到 被嵌入的文档中。

`wd.switch_to.frame(frame_reference)`

其中， frame_reference 可以是 frame 元素的属性 name 或者 ID 。

如果我们已经切换到某个iframe里面进行操作了，那么后续选择和操作界面元素 就都是在这个frame里面进行的。

这时候，如果我们又需要操作 主html（我们把最外部的html称之为主html） 里面的元素了呢？

**怎么切换回原来的主html呢？**

很简单，写如下代码即可

```py
wd.switch_to.default_content()
```

## 窗口切换

如果我们要到新的窗口里面操作，该怎么做呢？

可以使用Webdriver对象的switch_to属性的 window方法，如下所示：

```py
wd.switch_to.window(handle)
```

其中，参数handle需要传入什么呢？

WebDriver对象有window_handles 属性，这是一个列表对象， 里面包括了当前浏览器里面**所有的窗口句柄**。

所谓句柄，大家可以想象成对应网页窗口的一个ID

那么我们就可以通过 类似下面的代码，

```python
for handle in wd.window_handles:
    # 先切换到该窗口
    wd.switch_to.window(handle)
    # 得到该窗口的标题栏字符串，判断是不是我们要操作的那个窗口
    if 'Bing' in wd.title:
        # 如果是，那么这时候WebDriver对象就是对应的该该窗口，正好，跳出循环，
        break
```

上面代码的用意就是：

我们依次获取 wd.window_handles 里面的所有 句柄 对象， 并且调用 wd.switch_to.window(handle) 方法，切入到每个窗口，

然后检查里面该窗口对象的属性（可以是标题栏，地址栏），判断是不是我们要操作的那个窗口，如果是，就跳出循环。

同样的，如果我们在新窗口 操作结束后， 还要回到原来的窗口，该怎么办？

我们可以仍然使用上面的方法，依次切入窗口，然后根据 标题栏 之类的属性值判断。

还有更省事的方法。

因为我们一开始就在 原来的窗口里面，我们知道 进入新窗口操作完后，还要回来，可以事先 保存该老窗口的 句柄，使用如下方法

```python
# mainWindow变量保存当前窗口的句柄
mainWindow = wd.current_window_handle
```

切换到新窗口操作完后，就可以直接像下面这样，将driver对应的对象返回到原来的窗口

```python
#通过前面保存的老窗口的句柄，自己切换到老窗口
wd.switch_to.window(mainWindow)
```

## 选择框

### radio框

radio框选择选项，直接用WebElement的click方法，模拟用户点击就可以了。

比如, 我们要在下面的html中：

- 先打印当前选中的老师名字
- 再选择 小雷老师

```html
<div id="s_radio">
  <input type="radio" name="teacher" value="小江老师">小江老师<br>
  <input type="radio" name="teacher" value="小雷老师">小雷老师<br>
  <input type="radio" name="teacher" value="小凯老师" checked="checked">小凯老师
</div>
```

对应的代码如下

```python
# 获取当前选中的元素
element = wd.find_element_by_css_selector(
  '#s_radio input[checked=checked]')
print('当前选中的是: ' + element.get_attribute('value'))

# 点选 小雷老师
wd.find_element_by_css_selector(
  '#s_radio input[value="小雷老师"]').click()
```

### checkbox框

对checkbox进行选择，也是直接用 WebElement 的 click 方法，模拟用户点击选择。

需要注意的是，要选中checkbox的一个选项，必须 `先获取当前该复选框的状态` ，如果该选项已经勾选了，就不能再点击。否则反而会取消选择。

比如, 我们要在下面的html中：选中 小雷老师

```html
<div id="s_checkbox">
  <input type="checkbox" name="teacher" value="小江老师">小江老师<br>
  <input type="checkbox" name="teacher" value="小雷老师">小雷老师<br>
  <input type="checkbox" name="teacher" value="小凯老师" checked="checked">小凯老师
</div>
```

我们的思路可以是这样：

- 先把 已经选中的选项全部点击一下，确保都是未选状态
- 再点击 小雷老师

示例代码

```python
# 先把 已经选中的选项全部点击一下
elements = wd.find_elements_by_css_selector(
  '#s_checkbox input[checked="checked"]')

for element in elements:
    element.click()

# 再点击 小雷老师
wd.find_element_by_css_selector(
  "#s_checkbox input[value='小雷老师']").click()
```

### select框

radio框及checkbox框都是input元素，只是里面的type不同而已。

select框 则是一个新的select标签，大家可以对照浏览器网页内容查看一下

对于Select 选择框， Selenium 专门提供了一个 ==**`Select类`**== 进行操作。

Select类 提供了如下的方法

- select_by_value

根据选项的 `value属性值` ，选择元素。

比如，下面的HTML，

```html
<option value="foo">Bar</option>
```

就可以根据 foo 这个值选择该选项，

```py
s.select_by_value('foo')
```

- select_by_index

根据选项的 `次序` （从0开始），选择元素

- select_by_visible_text

根据选项的 `可见文本` ，选择元素。

比如，下面的HTML，

```html
<option value="foo">Bar</option>
```

就可以根据 Bar 这个内容，选择该选项

```py
s.select_by_visible_text('Bar')
```

- deselect_by_value

根据选项的value属性值， `去除` 选中元素

- deselect_by_index

根据选项的次序，`去除` 选中元素

- deselect_by_visible_text

根据选项的可见文本，`去除` 选中元素

- deselect_all

`去除` 选中所有元素

### Select单选框

对于 select单选框，操作比较简单：

不管原来选的是什么，直接用Select方法选择即可。

例如，选择示例里面的小雷老师，示例代码如下

```python
# 导入Select类
from selenium.webdriver.support.ui import Select

# 创建Select对象
select = Select(wd.find_element_by_id("ss_single"))

# 通过 Select 对象选中小雷老师
select.select_by_visible_text("小雷老师")
```

### Select多选框

对于select多选框，要选中某几个选项，要注意去掉原来已经选中的选项。

例如，我们选择示例多选框中的 小雷老师 和 小凯老师

可以用select类 的deselect_all方法，清除所有 已经选中 的选项。

然后再通过 select_by_visible_text方法 选择 小雷老师 和 小凯老师。

示例代码如下：

```python
# 导入Select类
from selenium.webdriver.support.ui import Select

# 创建Select对象
select = Select(wd.find_element_by_id("ss_multi"))

# 清除所有 已经选中 的选项
select.deselect_all()

# 选择小雷老师 和 小凯老师
select.select_by_visible_text("小雷老师")
select.select_by_visible_text("小凯老师")
```

## ActionChains

动作模拟

比如：比如 鼠标右键点击、双击、移动鼠标到某个元素、鼠标拖拽等。

这些操作，可以通过 Selenium 提供的 `ActionChains` 类来实现。

**`from selenium.webdriver.common.action_chains import ActionChains`**



```python
from selenium import webdriver

driver = webdriver.Chrome(r'f:\chromedriver.exe')
driver.implicitly_wait(5)

driver.get('https://www.baidu.com/')

from selenium.webdriver.common.action_chains import ActionChains

ac = ActionChains(driver)

# 鼠标移动到 元素上
ac.move_to_element(
    driver.find_element_by_css_selector('[name="tj_briicon"]')
).perform()
```

==**一定要有`perform()`**==

## 冻结网页

`setTimeout(function(){debugger}, 5000)`

表示在 5000毫秒后，执行 debugger 命令

执行该命令会 浏览器会进入debug状态。 debug状态有个特性， 界面被冻住， 不管我们怎么点击界面都不会触发事件。

## 弹出对话框

### Alert

Alert 弹出框，目的就是显示通知信息，只需用户看完信息后，点击 OK（确定） 就可以了。

那么，自动化的时候，代码怎么模拟用户点击 OK 按钮呢？

selenium提供如下方法进行操作

```py
driver.switch_to.alert.accept()
```

注意：如果我们不去点击它，页面的其它元素是不能操作的。 {: .notice–info}



如果程序要获取弹出对话框中的信息内容， 可以通过 如下代码

```py
driver.switch_to.alert.text
```



示例代码如下

```py
from selenium import webdriver
driver = webdriver.Chrome()
driver.implicitly_wait(5)
driver.get('http://cdn1.python3.vip/files/selenium/test4.html')


# --- alert ---
driver.find_element_by_id('b1').click()

# 打印 弹出框 提示信息
print(driver.switch_to.alert.text) 

# 点击 OK 按钮
driver.switch_to.alert.accept()
```

### Confirm

Confirm弹出框，主要是让用户确认是否要进行某个操作。

比如：当管理员在网站上选择删除某个账号时，就可能会弹出 Confirm弹出框， 要求确认是否确定要删除。

Confirm弹出框 有两个选择供用户选择，分别是 OK 和 Cancel， 分别代表 确定 和 取消 操作。

那么，自动化的时候，代码怎么模拟用户点击 OK 或者 Cancel 按钮呢？

selenium提供如下方法进行操作

如果我们想点击 OK 按钮， 还是用刚才的 accept方法，如下

```py
driver.switch_to.alert.accept()
```

如果我们想点击 Cancel 按钮， 可以用 dismiss方法，如下

```py
driver.switch_to.alert.dismiss()
```



示例代码如下

```py
from selenium import webdriver
driver = webdriver.Chrome()
driver.implicitly_wait(5)
driver.get('http://cdn1.python3.vip/files/selenium/test4.html')

# --- confirm ---
driver.find_element_by_id('b2').click()

# 打印 弹出框 提示信息
print(driver.switch_to.alert.text)

# 点击 OK 按钮 
driver.switch_to.alert.accept()

driver.find_element_by_id('b2').click()

# 点击 取消 按钮
driver.switch_to.alert.dismiss()
```

### Prompt

出现 Prompt 弹出框 是需要用户输入一些信息，提交上去。

比如：当管理员在网站上选择给某个账号延期时，就可能会弹出 Prompt 弹出框， 要求输入延期多长时间。

可以调用如下方法

```py
driver.switch_to.alert.send_keys()
```



示例代码如下

```py
from selenium import webdriver
driver = webdriver.Chrome()
driver.implicitly_wait(5)
driver.get('http://cdn1.python3.vip/files/selenium/test4.html')


# --- prompt ---
driver.find_element_by_id('b3').click()

# 获取 alert 对象
alert = driver.switch_to.alert

# 打印 弹出框 提示信息
print(alert.text)

# 输入信息，并且点击 OK 按钮 提交
alert.send_keys('web自动化 - selenium')
alert.accept()

# 点击 Cancel 按钮 取消
driver.find_element_by_id('b3').click()
alert = driver.switch_to.alert
alert.dismiss()
```

**注意** ： 有些弹窗并非浏览器的alert 窗口，而是**html元素**，这种对话框，只需要通过之前介绍的选择器选中并进行相应的操作就可以了。 {: .notice–info}

## 窗口大小

有时间我们需要获取窗口的属性和相应的信息，并对窗口进行控制

- 获取窗口大小

```py
driver.get_window_size()
```

- 改变窗口大小

```py
driver.set_window_size(x, y)
```

## 获取当前窗口标题

浏览网页的时候，我们的窗口标题是不断变化的，可以使用WebDriver的title属性来获取当前窗口的标题栏字符串。

```py
driver.title
```

## 获取当前窗口URL地址

```py
driver.current_url
```

例如，访问网易，并获取当前窗口的标题和URL

```py
from selenium import  webdriver

driver = webdriver.Chrome()
driver.implicitly_wait(5)

# 打开网站
driver.get('https://www.163.com')

# 获取网站标题栏文本
print(driver.title) 

# 获取网站地址栏文本
print(driver.current_url) 
```

## 截屏

有的时候，我们需要把浏览器屏幕内容保存为图片文件。

比如，做自动化测试时，一个测试用例检查点发现错误，我们可以截屏为文件，以便测试结束时进行人工核查。

可以使用 WebDriver 的 get_screenshot_as_file方法来截屏并保存为图片。

```py
from selenium import  webdriver

driver = webdriver.Chrome()
driver.implicitly_wait(5)

# 打开网站
driver.get('https://www.baidu.com/')

# 截屏保存为图片文件
driver.get_screenshot_as_file('1.png')
```

## 手机模式

我们可以通过 `desired_capabilities` 参数，指定以手机模式打开chrome浏览器

参考代码，如下

```py
from selenium import webdriver

mobile_emulation = { "deviceName": "Nexus 5" }

chrome_options = webdriver.ChromeOptions()

chrome_options.add_experimental_option("mobileEmulation", mobile_emulation)

driver = webdriver.Chrome( desired_capabilities = chrome_options.to_capabilities())

driver.get('http://www.baidu.com')

input()
driver.quit()
```

## 上传文件

有时候，网站操作需要上传文件。

比如，著名的在线图片压缩网站： https://tinypng.com/

通常，网站页面上传文件的功能，是通过 `type` 属性 为 `file` 的 HTML `input` 元素实现的。

如下所示：

```html
<input type="file" multiple="multiple">
```

使用selenium自动化上传文件，我们只需要定位到该input元素，然后通过 send_keys 方法传入要上传的文件路径即可。

如下所示：

```py
# 先定位到上传文件的 input 元素
ele = wd.find_element_by_css_selector('input[type=file]')

# 再调用 WebElement 对象的 send_keys 方法
ele.send_keys(r'h:\g02.png')
```



如果需要上传多个文件，可以多次调用send_keys，如下

```py
ele = wd.find_element_by_css_selector('input[type=file]')
ele.send_keys(r'h:\g01.png')
ele.send_keys(r'h:\g02.png')
```

## Xpath

## Xpath语法简介

前面我们学习了CSS 选择元素。

大家可以发现非常灵活、强大。

还有一种 灵活、强大 的选择元素的方式，就是使用 `Xpath` 表达式。

XPath (XML Path Language) 是由国际标准化组织W3C指定的，用来在 XML 和 HTML 文档中选择节点的语言。

目前主流浏览器 (chrome、firefox，edge，safari) 都支持XPath语法，xpath有 1 和 2 两个版本，目前浏览器支持的是 xpath 1的语法。

既然已经有了CSS，为什么还要学习 Xpath呢？ 因为

- 有些场景 用 css 选择web 元素 很麻烦，而xpath 却比较方便。
- 另外 Xpath 还有其他领域会使用到，比如 爬虫框架 Scrapy， 手机App框架 Appium。

按F12打开调试窗口，点击 Elements标签。

要验证 Xpath 语法是否能成功选择元素，也可以像 验证 CSS 语法那样，按组合键 Ctrl + F ，就会出现 搜索框

xpath 语法中，整个HTML文档根节点用’/‘表示，如果我们想选择的是根节点下面的html节点，则可以在搜索框输入

```
/html
```

如果输入下面的表达式

```
/html/body/div
```

这个表达式表示选择html下面的body下面的div元素。

注意 `/` 有点像 CSS中的 `>` , 表示直接子节点关系。

### 绝对路径选择

从根节点开始的，到某个节点，每层都依次写下来，每层之间用 `/` 分隔的表达式，就是某元素的 `绝对路径`

上面的xpath表达式 `/html/body/div` ，就是一个绝对路径的xpath表达式， 等价于 css表达式 `html>body>div`

自动化程序要使用Xpath来选择web元素，应该调用 WebDriver对象的方法 `find_element_by_xpath` 或者 `find_elements_by_xpath`，像这样：

```py
elements = driver.find_elements_by_xpath("/html/body/div")
```

### 相对路径选择

有的时候，我们需要选择网页中某个元素， `不管它在什么位置` 。

比如，选择示例页面的所有标签名为 `div` 的元素，如果使用css表达式，直接写一个 `div` 就行了。

那xpath怎么实现同样的功能呢？ xpath需要前面加 `//` , 表示从当前节点往下寻找所有的后代元素,不管它在什么位置。

所以xpath表达式，应该这样写： `//div`

‘//’ 符号也可以继续加在后面,比如，要选择 所有的 div 元素里面的 所有的 p 元素 ，不管div 在什么位置，也不管p元素在div下面的什么位置，则可以这样写 `//div//p`

对应的自动化程序如下

```py
elements = driver.find_elements_by_xpath("//div//p")
```

如果使用CSS选择器，对应代码如下

```py
elements = driver.find_elements_by_css_selector("div p")
```

如果，要选择 所有的 div 元素里面的 直接子节点 p ， xpath，就应该这样写了 `//div/p`

如果使用CSS选择器，则为 `div > p`

### 通配符

如果要选择所有div节点的所有直接子节点，可以使用表达式 `//div/*`

```
*` 是一个通配符，对应任意节点名的元素，等价于CSS选择器 `div > *
```

代码如下：

```py
elements = driver.find_elements_by_xpath("//div/*")
for element in elements:
    print(element.get_attribute('outerHTML'))
```

## 根据属性选择

Xpath 可以根据属性来选择元素。

根据属性来选择元素 是通过 这种格式来的 `[@属性名='属性值']`

注意：

- 属性名注意前面有个@
- 属性值一定要用引号， 可以是单引号，也可以是双引号

### 根据id属性选择

选择 id 为 west 的元素，可以这样 `//*[@id='west']`

### 根据class属性选择

选择所有 select 元素中 class为 single_choice 的元素，可以这样 `//select[@class='single_choice']`

如果一个元素class 有多个，比如

```html
<p id="beijing" class='capital huge-city'>
    北京    
</p>
```

如果要选 它， 对应的 xpath 就应该是 `//p[@class="capital huge-city"]`

不能只写一个属性，像这样 `//p[@class="capital"]` 则不行

### 根据其他属性

同样的道理，我们也可以利用其它的属性选择

比如选择 具有multiple属性的所有页面元素 ，可以这样 `//*[@multiple]`

### 属性值包含字符串

要选择 style属性值 包含 color 字符串的 页面元素 ，可以这样 `//*[contains(@style,'color')]`

要选择 style属性值 以 color 字符串 `开头` 的 页面元素 ，可以这样 `//*[starts-with(@style,'color')]`

要选择 style属性值 以 某个 字符串 结尾 的 页面元素 ，大家可以推测是 `//*[ends-with(@style,'color')]`， 但是，很遗憾，这是xpath 2.0 的语法 ，目前浏览器都不支持

## 按次序选择

前面学过css表达式可以根据元素在父节点中的次序选择， 非常实用。

xpath也可以根据次序选择元素。 语法比css更简洁，直接在方括号中使用数字表示次序

比如

### 某类型 第几个 子元素

比如

要选择 p类型第2个的子元素，就是

```py
//p[2]
```

注意，选择的是 `p类型第2个的子元素` ， 不是 `第2个子元素，并且是p类型` 。

注意体会区别

再比如，要选取父元素为div 中的 p类型 第2个 子元素

```py
//div/p[2]
```

### 第几个子元素

也可以选择第2个子元素，不管是什么类型，采用通配符

比如 选择父元素为div的第2个子元素，不管是什么类型

```py
//div/*[2]
```

### 某类型 倒数第几个 子元素

当然也可以选取倒数第几个子元素

比如：

- 选取p类型倒数第1个子元素

```py
//p[last()]
```

- 选取p类型倒数第2个子元素

```py
//p[last()-1]
```

- 选择父元素为div中p类型倒数第3个子元素

```py
//div/p[last()-2]
```

### 范围选择

xpath还可以选择子元素的次序范围。

比如，

- 选取option类型第1到2个子元素

```py
//option[position()<=2]
```

或者

```py
//option[position()<3]
```

- 选择class属性为multi_choice的前3个子元素

```py
//*[@class='multi_choice']/*[position()<=3]
```

- 选择class属性为multi_choice的后3个子元素

```py
//*[@class='multi_choice']/*[position()>=last()-2]
```

为什么不是 `last()-3` 呢？ 因为

`last()` 本身代表最后一个元素

`last()-1` 本身代表倒数第2个元素

`last()-2` 本身代表倒数第3个元素

## 组选择、父节点、兄弟节点

### 组选择

css有组选择，可以同时使用多个表达式，多个表达式选择的结果都是要选择的元素

css 组选择，表达式之间用 **逗号** 隔开

xpath也有组选择， 是用 **竖线** 隔开多个表达式

比如，要选所有的option元素 和所有的 h4 元素，可以使用

```
//option | //h4
```

等同于CSS选择器

```
option , h4
```

再比如，要选所有的 class 为 single_choice 和 class 为 multi_choice 的元素，可以使用

```
//*[@class='single_choice'] | //*[@class='multi_choice']
```

等同于CSS选择器

```
.single_choice , .multi_choice
```

### 选择父节点

xpath可以选择父节点， 这是css做不到的。

某个元素的父节点用 `/..` 表示

比如，要选择 id 为 china 的节点的父节点，可以这样写 `//*[@id='china']/..` 。

当某个元素没有特征可以直接选择，但是它有子节点有特征， 就可以采用这种方法，先选择子节点，再指定父节点。

还可继续找上层父节点，比如 `//*[@id='china']/../../..`

### 兄弟节点选择

前面学过 css选择器，要选择某个节点的后续兄弟节点，用 **波浪线**

xpath也可以选择 后续 兄弟节点，用这样的语法 `following-sibling::`

比如，要选择 class 为 single_choice 的元素的所有后续兄弟节点 `//*[@class='single_choice']/following-sibling::*`

等同于CSS选择器 `.single_choice ~ *`

如果，要选择后续节点中的div节点， 就应该这样写 `//*[@class='single_choice']/following-sibling::div`

xpath还可以选择 `前面的` 兄弟节点，用这样的语法 `preceding-sibling::`

比如，要选择 class 为 single_choice 的元素的所有前面的兄弟节点 `//*[@class='single_choice']/preceding-sibling::*`

而CSS选择器目前还没有方法选择前面的 兄弟节点

## selenium 注意点

我们来看一个例子

我们的代码：

- 先选择示例网页中，id是china的元素
- 然后通过这个元素的WebElement对象，使用find_elements_by_xpath，选择里面的p元素，

```py
# 先寻找id是china的元素
china = wd.find_element_by_id('china')

# 再选择该元素内部的p元素
elements = china.find_elements_by_xpath('//p')

# 打印结果
for element in elements:
    print('----------------')
    print(element.get_attribute('outerHTML'))
```

运行发现，打印的 不仅仅是 china内部的p元素， 而是所有的p元素。

要在某个元素内部使用xpath选择元素， 需要 `在xpath表达式最前面加个点` 。

像这样

```py
elements = china.find_elements_by_xpath('.//p')
```