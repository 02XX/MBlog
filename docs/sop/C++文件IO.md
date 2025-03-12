---
title: C++文件IO
tags:
  - C++
categories:
  - [C++]
date: 2024-12-03T14:44:50.280Z
updated: 2024-12-03T14:53:05.662Z
comments: true

---

<!--more-->
## 文件读写模式

| 模式            | 说明                                                                         |
| --------------- | ---------------------------------------------------------------------------- |
| `ios::in`     | 打开文件进行读取。如果文件不存在，则无法打开。                               |
| `ios::out`    | 打开文件进行写入。如果文件不存在，则创建新文件；如果存在，则会清空文件内容。 |
| `ios::app`    | 追加写入模式。数据写入文件末尾，不会清空文件。                               |
| `ios::ate`    | 打开文件并定位到文件末尾，但可以在文件任意位置进行读写。                     |
| `ios::trunc`  | 打开文件并清空其内容。只有在`ios::out模式下有效。                            |
| `ios::binary` | 二进制模式打开文件。默认情况下，文件是以文本模式打开的。                     |

> ios::in | ios::binary：以二进制模式打开文件进行读取。
> ios::out | ios::binary：以二进制模式打开文件进行写入。
> ios::in | ios::out：以读写模式打开文件。
> ios::in | ios::out | ios::binary：以二进制读写模式打开文件。

## 文件读写常用方法

### 文本模式

```c++
#include <fstream>
#include <string>

std::ifstream inputFile("example.txt"); // 读取文件
std::ofstream outputFile("example.txt"); // 写入文件

std::string line;
// 读取一行
if (inputFile.is_open()) {
    while (std::getline(inputFile, line)) {
        std::cout << line << std::endl;
    }
    inputFile.close();
}

// 写入内容
if (outputFile.is_open()) {
    outputFile << "Hello, world!" << std::endl;
    outputFile.close();
}
```

### 二进制模式

```c++
#include <fstream>

std::ifstream inputFile("example.bin", std::ios::binary); // 读取二进制文件
std::ofstream outputFile("example.bin", std::ios::binary | std::ios::out); // 写入二进制文件

char buffer[1024];
// 读取二进制数据
if (inputFile.is_open()) {
    inputFile.read(buffer, sizeof(buffer));
    inputFile.close();
}

// 写入二进制数据
if (outputFile.is_open()) {
    outputFile.write(buffer, sizeof(buffer));
    outputFile.close();
}
```

### 随机读写

```c++
#include <fstream>
#include <iostream>

std::fstream file("example.txt", std::ios::in | std::ios::out);
if (file.is_open()) {
    // 定位到文件开头
    file.seekg(0, std::ios::beg);
    file.seekp(0, std::ios::beg);

    // 读取文件内容
    char ch;
    while (file.get(ch)) {
        std::cout << ch;
    }

    // 定位到文件末尾写入内容
    file.seekp(0, std::ios::end);
    file << "Append this line." << std::endl;

    file.close();
}
```

```c++
#include <iostream>
#include <fstream>

int main() {
    std::ifstream file("example.txt", std::ios::binary); // 以二进制模式打开
    if (file.is_open()) {
        file.seekg(0, std::ios::end);    // 将指针移动到文件末尾
        std::streampos fileSize = file.tellg(); // 获取当前位置（文件末尾）的偏移量
        file.close();

        std::cout << "File size: " << fileSize << " bytes" << std::endl;
    } else {
        std::cerr << "Failed to open the file." << std::endl;
    }
    return 0;
}
```

### 文件流的检查

```c++
#include <iostream>
#include <fstream>

std::ifstream file("example.txt");
if (file.is_open()) {
    // 检查流状态
    if (file.good()) std::cout << "Stream is good." << std::endl;
    if (file.eof()) std::cout << "End of file reached." << std::endl;
    if (file.fail()) std::cout << "Logical error on I/O operation." << std::endl;
    if (file.bad()) std::cout << "Read/write error on I/O operation." << std::endl;
    file.close();
}
```