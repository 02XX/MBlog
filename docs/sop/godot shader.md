---
title: godot shader
categories: GameEngine
tags:
- godot
- shader
date: 2025-04-18T04:51:13.068Z
updated: 2025-04-18T04:51:13.068Z
---

## 内置变量

godot shader中不同阶段的内置变量

`void vertex()` NORMAL VERTEX VIEW_MATRIX MODEL_VIEW_MATRIX

`void fragment()` ALBEDO METALLIC ROUGHNESS VIEW

`void light()` LIGHT LIGHT_COLOR LIGHT_IS_DIRECTIONAL

>NORMAL VIEW都是在视图空间下的，因此构建的TBN矩阵是将normal从切线空间转到视图空间