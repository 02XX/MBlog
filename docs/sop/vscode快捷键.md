---
title: vscode快捷键
tags: []
categories:
  - [未分类]
date: 2023-04-04T00:49:29.000Z
updated: 2024-10-14T13:56:00.074Z
comments: false

---

<!--more-->
# vscode快捷键

所有快捷键设置：文件→首选项→键盘快捷方式 



1. 在当前行中间换行到下一行：ctrl+enter 
2. 当光标点击到某一行时，默认选中全行，可以直接复制剪切 
3. 直接删除某一行：shift+delete或者ctrl+shift+k 
4.  多行光标选择：alt+鼠标左键 
5.  自动生成html结构和meta声明：首先输入“!”，然后按tab键 
6. 标签自动补全：tab键 
7.  折叠所有代码：ctrl+k、ctrl+0 
8.  拆分编辑器：ctrl+\ 
9. 跳转行号：ctrl+G 
10. 添加函数注释：在函数上方输入“/**”，然后点击enter 
11. 格式化：alt+shift+f 
12. 注释：ctrl+/ 
13.  全部保存：ctrl+k, 然后只按s一个键 
14. 向上移动一行：alt+↑ 
15. 向下移动一行：alt+↓ 
16. 向上复制一行：alt+shift+↑ 
17. 向下复制一行：alt+shift+↓ 
18. 查找：ctrl+F 
19.  替换：ctrl+H 
20. 文件中查找：ctrl+shift+f 
21. 文件中替换：ctrl+shift+h 
22. 转到定义：F12 
23.  转到实现：ctrl+F12 
24. 打开文件夹：ctrl+k, ctrl+o 
25. 关闭文件夹：ctrl+k, 然后单按一个f 
26. 选中一段代码，通过“ctrl+[”可以左移，“ctrl+]”可以右移



### 编辑器与窗口管理

1. 打开一个新窗口： `Ctrl+Shift+N`
2. 关闭窗口： `Ctrl+Shift+W`
3. 同时打开多个编辑器（查看多个文件）
4. 新建文件 `Ctrl+N`
5. 文件之间切换 `Ctrl+Tab`
6. 切出一个新的编辑器（最多 `3` 个） `Ctrl+\`，也可以按住 `Ctrl` 鼠标点击 `Explorer` 里的文件名
7. 左中右 `3` 个编辑器的快捷键 `Ctrl+1` `Ctrl+2` `Ctrl+3`
8. `3` 个编辑器之间循环切换 `Ctrl+`
9. 编辑器换位置， `Ctrl+k`然后按 `Left`或 `Right`

### 代码编辑

#### 格式调整

1. 代码行缩进 `Ctrl+[` 、 `Ctrl+]`
2. `Ctrl+C` 、 `Ctrl+V` 复制或剪切当前行/当前选中内容
3. 代码格式化： `Shift+Alt+F`，或 `Ctrl+Shift+P` 后输入 `format code`
4. 上下移动一行： `Alt+Up` 或 `Alt+Down`
5. 向上向下复制一行： `Shift+Alt+Up` 或 `Shift+Alt+Down`
6. 在当前行下边插入一行 `Ctrl+Enter`
7. 在当前行上方插入一行 `Ctrl+Shift+Enter`

#### 光标相关

1. 移动到行首： `Home`
2. 移动到行尾： `End`
3. 移动到文件结尾： `Ctrl+End`
4. 移动到文件开头： `Ctrl+Home`
5. 移动到定义处： `F12`
6. 定义处缩略图：只看一眼而不跳转过去 `Alt+F12`
7. 移动到后半个括号： `Ctrl+Shift+]`
8. 选择从光标到行尾： `Shift+End`
9. 选择从行首到光标处： `Shift+Home`
10. 删除光标右侧的所有字： `Ctrl+Delete`
11. 扩展/缩小选取范围： `Shift+Alt+Left` 和 `Shift+Alt+Right`
12. 多行编辑(列编辑)：`Alt+Shift+鼠标左键`，`Ctrl+Alt+Down/Up`
13. 同时选中所有匹配： `Ctrl+Shift+L`
14. `Ctrl+D` 下一个匹配的也被选中 (在 sublime 中是删除当前行，后面自定义快键键中，设置与 `Ctrl+Shift+K` 互换了)
15. 回退上一个光标操作： `Ctrl+U`

#### 重构代码

1. 找到所有的引用： `Shift+F12`
2. 同时修改本文件中所有匹配的： `Ctrl+F12`
3. 重命名：比如要修改一个方法名，可以选中后按 `F2`，输入新的名字，回车，会发现所有的文件都修改了
4. 跳转到下一个 `Error` 或 `Warning`：当有多个错误时可以按 `F8` 逐个跳转
5. 查看 `diff`： 在 `explorer` 里选择文件右键 `Set file to compare`，然后需要对比的文件上右键选择 `Compare with file_name_you_chose`

#### 查找替换

1. 查找 `Ctrl+F`
2. 查找替换 `Ctrl+H`
3. 整个文件夹中查找 `Ctrl+Shift+F`

### 显示相关

1. 全屏：`F11`
2. zoomIn/zoomOut：`Ctrl +/-`
3. 侧边栏显/隐：`Ctrl+B`
4. 显示资源管理器 `Ctrl+Shift+E`
5. 显示搜索 `Ctrl+Shift+F`
6. 显示 Git `Ctrl+Shift+G`
7. 显示 Debug `Ctrl+Shift+D`
8. 显示 Output `Ctrl+Shift+U`