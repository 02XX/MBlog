---
title: nvdiffrast
tags:
  - 计算机图形学
categories:
  - [计算机图形学]
date: 2024-09-24T19:36:38.000Z
updated: 2024-10-14T13:55:51.865Z
comments: false

---

<!--more-->
## `nvdiffrast.torch.texture(_tex_, _uv_, _uv_da_=None, _mip_level_bias_=None, _mip_=None, _filter_mode_='auto', _boundary_mode_='wrap', _max_mip_level_=None)`

用于执行纹理采样。

所有输入张量必须是连续的并位于 GPU 内存中。输出张量将是连续的并位于 GPU 内存中。

参数说明：

* **tex**：纹理张量，数据类型为 `torch.float32`。对于 2D 纹理，其形状必须为 `[minibatch_size, tex_height, tex_width, tex_channels]`。对于立方体贴图纹理，其形状必须为 `[minibatch_size, 6, tex_height, tex_width, tex_channels]`，其中 `tex_width` 和 `tex_height` 必须相等。请注意，`boundary_mode` 也必须设置为 `'cube'` 以启用立方体贴图模式。支持在小批次轴上的广播。
* **uv**：包含每像素纹理坐标的张量。当采样 2D 纹理时，形状必须为 `[minibatch_size, height, width, 2]`。当采样立方体贴图纹理时，形状必须为 `[minibatch_size, height, width, 3]`。
* **uv\_da**： （可选）包含纹理坐标图像空间导数的张量。除了最后一个维度要长一倍外，其他维度与 `uv` 相同。
* **mip\_level\_bias**：（可选）每像素的 mip 层级选择偏置。如果省略了 `uv_da`，则直接决定 mip 层级。形状必须为 `[minibatch_size, height, width]`。
* **mip**：（可选）从 `texture_construct_mip()` 调用中预构建的 mipmap 堆栈，或指定自定义 mipmap 堆栈的张量列表。在指定自定义 mipmap 堆栈时，列表中的张量必须遵循与 `tex` 相同的格式，但宽度和高度必须遵循 mipmap 大小的常规规则。基础层级的纹理仍然在 `tex` 中提供，不得包含在列表中。自定义 mipmap 堆栈的梯度不会自动传播到基础纹理，但 mipmap 张量会接收自己的梯度。如果未指定 mipmap 堆栈，但所选过滤模式需要它，则将在内部构建并随后丢弃。
* **filter\_mode**：使用的纹理过滤模式。有效值包括 `'auto'`, `'nearest'`, `'linear'`, `'linear-mipmap-nearest'`, `'linear-mipmap-linear'`。模式 `'auto'` 会根据是否指定了 `uv_da` 或 `mip_level_bias` 自动选择最高质量的模式。
* **boundary\_mode**：有效值有 `'wrap'`, `'clamp'`, `'zero'`, `'cube'`。如果 `tex` 定义了立方体贴图，则必须设置为 `'cube'`。默认模式 `'wrap'` 取纹理坐标的小数部分。模式 `'clamp'` 将纹理坐标限制到边界 texel 的中心。模式 `'zero'` 虚拟地将纹理向各个方向扩展为全零值。
* **max\_mip\_level**：如果指定，将限制构建和使用的 mipmaps 数量（基于 mipmap 的过滤模式）。

返回值：

一个张量，包含纹理采样结果，形状为 `[minibatch_size, height, width, tex_channels]`。对于立方体贴图中无效的 UV 坐标（例如零向量），输出全为零，并且不传播梯度。