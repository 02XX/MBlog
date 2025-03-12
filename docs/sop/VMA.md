---
title: VMA
tags:
  - 计算机图形学
categories:
  - [计算机图形学]
date: 2024-12-22T07:36:12.247Z
updated: 2024-12-22T08:06:52.491Z
comments: true

---

<!--more-->
## VMA

| 标志位                                                       | 含义                                                                                                       |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| VMA_ALLOCATION_CREATE_DEDICATED_MEMORY_BIT                   | 为分配创建专属的内存块,适用于特殊的大型资源,如用作附件的全屏图像                                           |
| VMA_ALLOCATION_CREATE_NEVER_ALLOCATE_BIT                     | 只从现有的VkDeviceMemory块分配,不创建新块。如果无法在现有块中进行新分配,则分配失败                         |
| VMA_ALLOCATION_CREATE_MAPPED_BIT                             | 使用将被永久映射的内存,并检索指向它的指针                                                                  |
| VMA_ALLOCATION_CREATE_USER_DATA_COPY_STRING_BIT              | 将VmaAllocationCreateInfo::pUserData视为指向以null结尾的字符串的指针 (已弃用,建议改用vmaSetAllocationName) |
| VMA_ALLOCATION_CREATE_UPPER_ADDRESS_BIT                      | 在双堆栈池的上层堆栈中创建分配 (仅适用于使用VMA_POOL_CREATE_LINEAR_ALGORITHM_BIT标志创建的自定义池)        |
| VMA_ALLOCATION_CREATE_DONT_BIND_BIT                          | 创建缓冲区/图像和分配,但不将它们绑定在一起                                                                 |
| VMA_ALLOCATION_CREATE_WITHIN_BUDGET_BIT                      | 仅当分配所需的额外设备内存(如果有)不超过内存预算时,才创建分配                                              |
| VMA_ALLOCATION_CREATE_CAN_ALIAS_BIT                          | 如果分配的内存将有别名资源,请设置此标志                                                                    |
| VMA_ALLOCATION_CREATE_HOST_ACCESS_SEQUENTIAL_WRITE_BIT       | 请求映射分配的可能性,并声明映射的内存将只按顺序写入                                                        |
| VMA_ALLOCATION_CREATE_HOST_ACCESS_RANDOM_BIT                 | 请求映射分配的可能性,并声明映射的内存可以随机读取、写入和访问                                              |
| VMA_ALLOCATION_CREATE_HOST_ACCESS_ALLOW_TRANSFER_INSTEAD_BIT | 即使请求主机访问,也可以选择不可见的内存类型,如果它可以提高性能                                             |
| VMA_ALLOCATION_CREATE_STRATEGY_MIN_MEMORY_BIT                | 选择最小可能的空闲范围进行分配,以最小化内存使用和碎片                                                      |
| VMA_ALLOCATION_CREATE_STRATEGY_MIN_TIME_BIT                  | 为分配选择第一个合适的空闲范围,以最小化分配时间                                                            |
| VMA_ALLOCATION_CREATE_STRATEGY_MIN_OFFSET_BIT                | 始终在可用空间中选择最低偏移量的分配策略                                                                   |
| VMA_ALLOCATION_CREATE_STRATEGY_BEST_FIT_BIT                  | VMA_ALLOCATION_CREATE_STRATEGY_MIN_MEMORY_BIT的别名                                                        |
| VMA_ALLOCATION_CREATE_STRATEGY_FIRST_FIT_BIT                 | VMA_ALLOCATION_CREATE_STRATEGY_MIN_TIME_BIT的别名                                                          |