---
title: linux cut printf awk sed
tags: []
categories:
  - [未分类]
date: 2023-04-04T00:49:29.000Z
updated: 2024-10-14T13:55:48.755Z
comments: false

---

<!--more-->
# 字符串截取

```bash
cut [option] filename
	-f 列号：提取第几列
	-d "分隔符"：按照指定分隔符分割列 " "会识别空格
```

```bash
printf '输出类型输出格式' 输出内容
		%ns：输出字符串，n代表输出几个字符
		&ni：输出整数，n是输出几个数字
		&m.nf：位数和小数点位数，输出m位数，n个小数，(m-n)个整数
```

```awk
awk '条件1{动作1}条件2{动作2}······' 文件名
```

```bash
sed [option] '[action]' 文件名
	-n		 a\
			c\
			i\
			d
			p
             s
	-e
	-i
```