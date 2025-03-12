---
title: LINQ
tags:
  - C#
categories:
  - [C#]
date: 2024-09-20T21:51:10.000Z
updated: 2024-10-14T13:55:18.274Z
comments: false

---

<!--more-->
# LINQ

## IEnumerable/Enumerable/IQueryable/Queryable

IEnumerable和IQueryable是重要的查询接口，其中IQueryable继承自IEnumerable。
其不同是IQueryable是将遇到的所有LINQ语句转为语法树后(先将lamba表达式转为LINQ的Express类再转为语法树，后由IQueryProvider进行查询)才执行查询，而IEnumerable是每当遇到有LINQ语句时查询

Enumerable和Queryable是扩展方法，实现了所有LINQ语句(LINQ语句并没有定义在接口中)

## 测试数据类型

```c#
public class People
{
    public string Name { get; set; }
    public int Age { get; set; }
    public double Height { get; set; }
    public decimal Money { get; set; }
}
public class Student : People, ICloneable
{
    public string Address { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public float GPA { get; set; }
    public long ID { get; set;}
    public bool IsStudying { get; set; }
    public List<string> Subjects { get; set; }

    public object Clone()
    {
        return new Student
        {
            Name = this.Name,
            Age = this.Age,
            Height = this.Height,
            Money = this.Money,
            Address = this.Address,
            Email = this.Email,
            Phone = this.Phone,
            GPA = this.GPA,
            ID = this.ID,
            IsStudying = this.IsStudying,
            Subjects = this.Subjects.ToList()
        };
    }
}
```

```c#
List<Student> students = new List<Student>{
    new Student { Name = "Alice", Age = 25, Address = "123 Main St", Email = "alice@example.com", Phone = "123-456-7890", Subjects = new List<string>{"Math", "Science"}, GPA = 3.8f, ID = 123456789012345L, Money = 5386721.41231232131231235m, IsStudying = true },
    new Student { Name = "Bob", Age = 30, Address = "123 Main St", Email = "bob@example.com", Phone = "987-654-3210", Subjects = new List<string>{"English", "History"}, GPA = 3.2f, ID = 123456789012346L, Money = 7891234.56m, IsStudying = false },
    new Student { Name = "Charlie", Age = 35, Address = "789 Oak St", Email = "charlie@example.com", Phone = "555-123-4567", Subjects = new List<string>{"Physics", "Chemistry"}, GPA = 3.5f, ID = 123456789012347L, Money = 1234567.89124121251251m, IsStudying = true },
    new Student { Name = "David", Age = 28, Address = "321 Pine St", Email = "david@example.com", Phone = "111-222-3333", Subjects = new List<string>{"Biology", "Geography"}, GPA = 3.9f, ID = 123456789012348L, Money = 2345678.90123123548968745986m, IsStudying = true },
    new Student { Name = "Emily", Age = 27, Address = "654 Cedar St", Email = "emily@example.com", Phone = "444-555-6666", Subjects = new List<string>{"Computer Science", "Math"}, GPA = 3.7f, ID = 123456789012349L, Money = 3456789.0102903078273849284m, IsStudying = false },
    new Student { Name = "Frank", Age = 32, Address = "987 Maple St", Email = "frank@example.com", Phone = "777-888-9999", Subjects = new List<string>{"English", "Art"}, GPA = 3.4f, ID = 123456789012350L, Money = 4567890.12m, IsStudying = true },
    new Student { Name = "Grace", Age = 29, Address = "159 Birch St", Email = "grace@example.com", Phone = "000-111-2222", Subjects = new List<string>{"History", "Geography"}, GPA = 3.6f, ID = 123456789012351L, Money = 5678901.23468548968435543m, IsStudying = false },
    new Student { Name = "Henry", Age = 31, Address = "753 Walnut St", Email = "henry@example.com", Phone = "333-444-5555", Subjects = new List<string>{"Math", "Physics"}, GPA = 3.1f, ID = 123456789012352L, Money = 6789012.34m, IsStudying = true },
    new Student { Name = "Isabella", Age = 26, Address = "246 Pineapple St", Email = "isabella@example.com", Phone = "666-777-8888", Subjects = new List<string>{"Chemistry", "Biology"}, GPA = 3.3f, ID = 123456789012353L, Money = 7890123.45908920794782397492084m, IsStudying = true },
    new Student { Name = "Jack", Age = 33, Address = "951 Orange St", Email = "jack@example.com", Phone = "999-000-1111", Subjects = new List<string>{"Computer Science", "Physics"}, GPA = 3.0f, ID = 123456789012354L, Money = 8901234.56458678947689456m, IsStudying = false }
};

```

```c#
    static string Divider(string obj, int count = 15)
    {
        return new string('=', count) + obj + new string('=', count);
    }
```

## 投影操作


| 操作       | 描述                                                                |
| ---------- | ------------------------------------------------------------------- |
| Select     | 将序列的每个元素投影到新形式中                                      |
| SelectMany | 将序列的每个元素投影到`IEnumerable<T>` 并将结果序列合并为一个序列。 |
| Zip        | 将两个序列的元素一起投影                                            |

### Select

```c#
students.Select((s,i)=>new {Index = i, Student = s.Name, Age = s.Age}).Display();
students.Select(s => new { Name = s.Name, Age = s.Age }).Display();
```

<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Index = 0, Student = Alice, Age = 25 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Index</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Student</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Index = 1, Student = Bob, Age = 30 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Index</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>Student</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>30</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Index = 2, Student = Charlie, Age = 35 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Index</td><td><div class="dni-plaintext"><pre>2</pre></div></td></tr><tr><td>Student</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Index = 3, Student = David, Age = 28 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Index</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>Student</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Index = 4, Student = Emily, Age = 27 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Index</td><td><div class="dni-plaintext"><pre>4</pre></div></td></tr><tr><td>Student</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Index = 5, Student = Frank, Age = 32 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Index</td><td><div class="dni-plaintext"><pre>5</pre></div></td></tr><tr><td>Student</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Index = 6, Student = Grace, Age = 29 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Index</td><td><div class="dni-plaintext"><pre>6</pre></div></td></tr><tr><td>Student</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Index = 7, Student = Henry, Age = 31 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Index</td><td><div class="dni-plaintext"><pre>7</pre></div></td></tr><tr><td>Student</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Index = 8, Student = Isabella, Age = 26 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Index</td><td><div class="dni-plaintext"><pre>8</pre></div></td></tr><tr><td>Student</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>9</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Index = 9, Student = Jack, Age = 33 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Index</td><td><div class="dni-plaintext"><pre>9</pre></div></td></tr><tr><td>Student</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Alice, Age = 25 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Bob, Age = 30 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>30</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Charlie, Age = 35 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = David, Age = 28 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Emily, Age = 27 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Frank, Age = 32 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Grace, Age = 29 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Henry, Age = 31 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Isabella, Age = 26 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>9</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Jack, Age = 33 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

### SelectMany

```c#
students.SelectMany(s=>s.Subjects, (s, c)=> new {s.Name, c}).Display();
students.SelectMany((s,i)=> s.Subjects.Select(sub=>i+sub), (s, c)=> new {s.Name, c}).Distinct().Display();
students.SelectMany(s=>s.Subjects).Display();
students.SelectMany((s,i)=>s.Subjects.Select(sub=>i+sub)).Display();
```

<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Alice, c = Math }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>Math</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Alice, c = Science }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>Science</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Bob, c = English }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>English</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Bob, c = History }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>History</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Charlie, c = Physics }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>Physics</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Charlie, c = Chemistry }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>Chemistry</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = David, c = Biology }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>Biology</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = David, c = Geography }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>Geography</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Emily, c = Computer Science }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>Computer Science</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>9</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Emily, c = Math }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>Math</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>10</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Frank, c = English }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>English</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>11</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Frank, c = Art }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>Art</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>12</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Grace, c = History }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>History</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>13</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Grace, c = Geography }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>Geography</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>14</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Henry, c = Math }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>Math</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>15</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Henry, c = Physics }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>Physics</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>16</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Isabella, c = Chemistry }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>Chemistry</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>17</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Isabella, c = Biology }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>Biology</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>18</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Jack, c = Computer Science }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>Computer Science</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>19</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Jack, c = Physics }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>Physics</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td colspan="2"><i>... (more)</i></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Alice, c = 0Math }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>0Math</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Alice, c = 0Science }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>0Science</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Bob, c = 1English }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>1English</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Bob, c = 1History }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>1History</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Charlie, c = 2Physics }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>2Physics</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Charlie, c = 2Chemistry }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>2Chemistry</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = David, c = 3Biology }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>3Biology</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = David, c = 3Geography }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>3Geography</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Emily, c = 4Computer Science }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>4Computer Science</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>9</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Emily, c = 4Math }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>4Math</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>10</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Frank, c = 5English }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>5English</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>11</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Frank, c = 5Art }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>5Art</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>12</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Grace, c = 6History }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>6History</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>13</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Grace, c = 6Geography }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>6Geography</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>14</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Henry, c = 7Math }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>7Math</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>15</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Henry, c = 7Physics }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>7Physics</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>16</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Isabella, c = 8Chemistry }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>8Chemistry</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>17</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Isabella, c = 8Biology }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>8Biology</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>18</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Jack, c = 9Computer Science }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>9Computer Science</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>19</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Jack, c = 9Physics }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>c</td><td><div class="dni-plaintext"><pre>9Physics</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td colspan="2"><i>... (more)</i></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<div class="dni-plaintext"><pre>[ Math, Science, English, History, Physics, Chemistry, Biology, Geography, Computer Science, Math, English, Art, History, Geography, Math, Physics, Chemistry, Biology, Computer Science, Physics ... (more) ]</pre></div><style>

.dni-code-hint {
font-style: italic;
overflow: hidden;
white-space: nowrap;
}
.dni-treeview {
white-space: nowrap;
}
.dni-treeview td {
vertical-align: top;
text-align: start;
}
details.dni-treeview {
padding-left: 1em;
}
table td {
text-align: start;
}
table tr {
vertical-align: top;
margin: 0em 0px;
}
table tr td pre
{
vertical-align: top !important;
margin: 0em 0px !important;
}
table th {
text-align: start;
}
</style>

<div class="dni-plaintext"><pre>[ 0Math, 0Science, 1English, 1History, 2Physics, 2Chemistry, 3Biology, 3Geography, 4Computer Science, 4Math, 5English, 5Art, 6History, 6Geography, 7Math, 7Physics, 8Chemistry, 8Biology, 9Computer Science, 9Physics ... (more) ]</pre></div><style>

.dni-code-hint {
font-style: italic;
overflow: hidden;
white-space: nowrap;
}
.dni-treeview {
white-space: nowrap;
}
.dni-treeview td {
vertical-align: top;
text-align: start;
}
details.dni-treeview {
padding-left: 1em;
}
table td {
text-align: start;
}
table tr {
vertical-align: top;
margin: 0em 0px;
}
table tr td pre
{
vertical-align: top !important;
margin: 0em 0px !important;
}
table th {
text-align: start;
}
</style>

### Zip

```c#
var second = students.Where(s=>s.Age > 30);
var third = students.Where(s=>s.Age < 26);
students.Zip(second).Display();
students.Zip(second, (s,c)=> new {FName=s.Name, SName=c.Name}).Display();
students.Zip(second,third).Display(); // 基于最短的序列长度生成，其他序列多余元素会被忽略
```

<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>(Submission#81+Student, Submission#81+Student)</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Item1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>Item2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>(Submission#81+Student, Submission#81+Student)</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Item1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>bob@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>987-654-3210</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.2</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012346</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, History ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>30</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7891234.56</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>Item2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>(Submission#81+Student, Submission#81+Student)</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Item1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>Item2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>(Submission#81+Student, Submission#81+Student)</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Item1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>Item2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ FName = Alice, SName = Charlie }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>FName</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>SName</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ FName = Bob, SName = Frank }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>FName</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>SName</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ FName = Charlie, SName = Henry }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>FName</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>SName</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ FName = David, SName = Jack }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>FName</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>SName</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>(Submission#81+Student, Submission#81+Student, Submission#81+Student)</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Item1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>Item2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>Item3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

## 聚合操作


| 操作                     | 描述                               |
| ------------------------ | ---------------------------------- |
| Aggregate                | 对序列中的元素进行累积计算         |
| Average                  | 平均值                             |
| Count/LongCount          | 返回类型为int/long的数量           |
| TryGetNonEnumeratedCount | 尝试获取集合的元素数量而不枚举集合 |
| Sum                      | 和                                 |
| Max/Min                  | 元素的最大/最小值                  |
| MaxBy/MinBy              | 最大/最小值对应的元素              |

### Aggregate

```c#
students.Aggregate("", (acc,s)=>acc + s.Name +", ", acc =>"start-> " + acc + "<-end").Display();
students.Aggregate("", (acc,s)=>acc + s.Name +", ").Display();
students.Aggregate((acc,s)=> new Student {Name = acc.Name + s.Name, Age = acc.Age*s.Age}).Display();
```

start-> Alice, Bob, Charlie, David, Emily, Frank, Grace, Henry, Isabella, Jack, <-end



Alice, Bob, Charlie, David, Emily, Frank, Grace, Henry, Isabella, Jack, 
<details open="open" class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre><null></pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre><null></pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre><null></pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre><null></pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>AliceBobCharlieDavidEmilyFrankGraceHenryIsabellaJack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>593505792</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr></tbody></table></div></details><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

### Average/Sum

```c#
students.Average(s=>s.GPA).Display();
students.Select(s=>s.GPA).Average().Display();

students.Sum(s=>s.GPA).Display();
students.Select(s=>s.GPA).Sum().Display();
```
<div class="dni-plaintext"><pre>3.45</pre></div><style>

.dni-code-hint {
font-style: italic;
overflow: hidden;
white-space: nowrap;
}
.dni-treeview {
white-space: nowrap;
}
.dni-treeview td {
vertical-align: top;
text-align: start;
}
details.dni-treeview {
padding-left: 1em;
}
table td {
text-align: start;
}
table tr {
vertical-align: top;
margin: 0em 0px;
}
table tr td pre
{
vertical-align: top !important;
margin: 0em 0px !important;
}
table th {
text-align: start;
}
</style>

<div class="dni-plaintext"><pre>3.45</pre></div><style>

.dni-code-hint {
font-style: italic;
overflow: hidden;
white-space: nowrap;
}
.dni-treeview {
white-space: nowrap;
}
.dni-treeview td {
vertical-align: top;
text-align: start;
}
details.dni-treeview {
padding-left: 1em;
}
table td {
text-align: start;
}
table tr {
vertical-align: top;
margin: 0em 0px;
}
table tr td pre
{
vertical-align: top !important;
margin: 0em 0px !important;
}
table th {
text-align: start;
}
</style>

<div class="dni-plaintext"><pre>34.5</pre></div><style>

.dni-code-hint {
font-style: italic;
overflow: hidden;
white-space: nowrap;
}
.dni-treeview {
white-space: nowrap;
}
.dni-treeview td {
vertical-align: top;
text-align: start;
}
details.dni-treeview {
padding-left: 1em;
}
table td {
text-align: start;
}
table tr {
vertical-align: top;
margin: 0em 0px;
}
table tr td pre
{
vertical-align: top !important;
margin: 0em 0px !important;
}
table th {
text-align: start;
}
</style>

<div class="dni-plaintext"><pre>34.5</pre></div><style>

.dni-code-hint {
font-style: italic;
overflow: hidden;
white-space: nowrap;
}
.dni-treeview {
white-space: nowrap;
}
.dni-treeview td {
vertical-align: top;
text-align: start;
}
details.dni-treeview {
padding-left: 1em;
}
table td {
text-align: start;
}
table tr {
vertical-align: top;
margin: 0em 0px;
}
table tr td pre
{
vertical-align: top !important;
margin: 0em 0px !important;
}
table th {
text-align: start;
}
</style>

### Count/LongCount

```c#
students.Count().Display();
students.Count(s=>s.Age > 30).Display();
students.LongCount().GetType().Display();
```
<div class="dni-plaintext"><pre>10</pre></div><style>

.dni-code-hint {
font-style: italic;
overflow: hidden;
white-space: nowrap;
}
.dni-treeview {
white-space: nowrap;
}
.dni-treeview td {
vertical-align: top;
text-align: start;
}
details.dni-treeview {
padding-left: 1em;
}
table td {
text-align: start;
}
table tr {
vertical-align: top;
margin: 0em 0px;
}
table tr td pre
{
vertical-align: top !important;
margin: 0em 0px !important;
}
table th {
text-align: start;
}
</style>

<div class="dni-plaintext"><pre>4</pre></div><style>

.dni-code-hint {
font-style: italic;
overflow: hidden;
white-space: nowrap;
}
.dni-treeview {
white-space: nowrap;
}
.dni-treeview td {
vertical-align: top;
text-align: start;
}
details.dni-treeview {
padding-left: 1em;
}
table td {
text-align: start;
}
table tr {
vertical-align: top;
margin: 0em 0px;
}
table tr td pre
{
vertical-align: top !important;
margin: 0em 0px !important;
}
table th {
text-align: start;
}
</style>

<span><a href="https://docs.microsoft.com/dotnet/api/system.int64?view=net-7.0">System.Int64</a></span>

### TryGetNonEnumeratedCount

```c#
int count;
students.TryGetNonEnumeratedCount(out count).Display();
count.Display();
```
<div class="dni-plaintext"><pre>True</pre></div><style>

.dni-code-hint {
font-style: italic;
overflow: hidden;
white-space: nowrap;
}
.dni-treeview {
white-space: nowrap;
}
.dni-treeview td {
vertical-align: top;
text-align: start;
}
details.dni-treeview {
padding-left: 1em;
}
table td {
text-align: start;
}
table tr {
vertical-align: top;
margin: 0em 0px;
}
table tr td pre
{
vertical-align: top !important;
margin: 0em 0px !important;
}
table th {
text-align: start;
}
</style>

<div class="dni-plaintext"><pre>10</pre></div><style>

.dni-code-hint {
font-style: italic;
overflow: hidden;
white-space: nowrap;
}
.dni-treeview {
white-space: nowrap;
}
.dni-treeview td {
vertical-align: top;
text-align: start;
}
details.dni-treeview {
padding-left: 1em;
}
table td {
text-align: start;
}
table tr {
vertical-align: top;
margin: 0em 0px;
}
table tr td pre
{
vertical-align: top !important;
margin: 0em 0px !important;
}
table th {
text-align: start;
}
</style>

### Max/Min/MaxBy/MinBy

```c#
students.Max(s=>s.GPA).Display();
students.Select(s=>s.GPA).Max().Display();

students.Min(s=>s.GPA).Display();
students.Select(s=>s.GPA).Min().Display();

students.MaxBy(s=>s.GPA).Display();
students.MaxBy(s=>s.GPA, Comparer<float>.Create((a,b)=>a.CompareTo(b))).Display();
students.MinBy(s=>s.GPA).Display();
students.MinBy(s=>s.GPA, Comparer<float>.Create((a,b)=>a.CompareTo(b))).Display();
```
<div class="dni-plaintext"><pre>3.9</pre></div><style>

.dni-code-hint {
font-style: italic;
overflow: hidden;
white-space: nowrap;
}
.dni-treeview {
white-space: nowrap;
}
.dni-treeview td {
vertical-align: top;
text-align: start;
}
details.dni-treeview {
padding-left: 1em;
}
table td {
text-align: start;
}
table tr {
vertical-align: top;
margin: 0em 0px;
}
table tr td pre
{
vertical-align: top !important;
margin: 0em 0px !important;
}
table th {
text-align: start;
}
</style>

<div class="dni-plaintext"><pre>3.9</pre></div><style>

.dni-code-hint {
font-style: italic;
overflow: hidden;
white-space: nowrap;
}
.dni-treeview {
white-space: nowrap;
}
.dni-treeview td {
vertical-align: top;
text-align: start;
}
details.dni-treeview {
padding-left: 1em;
}
table td {
text-align: start;
}
table tr {
vertical-align: top;
margin: 0em 0px;
}
table tr td pre
{
vertical-align: top !important;
margin: 0em 0px !important;
}
table th {
text-align: start;
}
</style>

<div class="dni-plaintext"><pre>3</pre></div><style>

.dni-code-hint {
font-style: italic;
overflow: hidden;
white-space: nowrap;
}
.dni-treeview {
white-space: nowrap;
}
.dni-treeview td {
vertical-align: top;
text-align: start;
}
details.dni-treeview {
padding-left: 1em;
}
table td {
text-align: start;
}
table tr {
vertical-align: top;
margin: 0em 0px;
}
table tr td pre
{
vertical-align: top !important;
margin: 0em 0px !important;
}
table th {
text-align: start;
}
</style>

<div class="dni-plaintext"><pre>3</pre></div><style>

.dni-code-hint {
font-style: italic;
overflow: hidden;
white-space: nowrap;
}
.dni-treeview {
white-space: nowrap;
}
.dni-treeview td {
vertical-align: top;
text-align: start;
}
details.dni-treeview {
padding-left: 1em;
}
table td {
text-align: start;
}
table tr {
vertical-align: top;
margin: 0em 0px;
}
table tr td pre
{
vertical-align: top !important;
margin: 0em 0px !important;
}
table th {
text-align: start;
}
</style>

<details open="open" class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<details open="open" class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<details open="open" class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<details open="open" class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

## 转换操作


| 操作            | 描述                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------ |
| AsEnumerable    | 转为可枚举的对象                                                                           |
| AsQueryable     | 转为可查询的对象                                                                           |
| Cast\<TResult\> | 将一个非泛型的 IEnumerable 接口转换为指定泛型类型 TResult 的泛型 IEnumerable<TResult> 接口 |
| ToArray         | 将序列转换为数组                                                                           |
| ToDictionary    | 将序列转换为字典                                                                           |
| ToHashSet       | 将序列转换为哈希集                                                                         |
| ToList          | 将序列转换为列表                                                                           |

### AsEnumerable

```c#
students.AsEnumerable().Display();
students.AsEnumerable().GetType().Display();
```
<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>bob@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>987-654-3210</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.2</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012346</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, History ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>30</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7891234.56</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>654 Cedar St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>emily@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>444-555-6666</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.7</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012349</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Math ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>3456789.0102903078273849284</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>159 Birch St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>grace@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>000-111-2222</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.6</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012351</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ History, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5678901.23468548968435543</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>9</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<span><a href="https://docs.microsoft.com/dotnet/api/system.collections.generic.list-1?view=net-7.0">System.Collections.Generic.List&lt;Submission#81+Student&gt;</a></span>

### AsQueryable

```c#
students.AsQueryable().Display();
```
<details open="open" class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student, Submission#81+Student, Submission#81+Student, Submission#81+Student, Submission#81+Student, Submission#81+Student, Submission#81+Student, Submission#81+Student, Submission#81+Student, Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>bob@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>987-654-3210</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.2</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012346</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, History ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>30</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7891234.56</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>654 Cedar St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>emily@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>444-555-6666</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.7</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012349</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Math ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>3456789.0102903078273849284</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>159 Birch St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>grace@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>000-111-2222</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.6</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012351</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ History, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5678901.23468548968435543</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>9</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

### Cast\<TResult\>

```c#

List<object> mixedList = new List<object> { new People { Name = "John", Age = 25, Height = 180.5, Money = 1000.50m }, new Student { Name = "Alice", Age = 20, Address = "123 Main St", Email = "alice@example.com", Phone = "123-456-7890", Subjects = new List<string>{"Math", "Science"}, GPA = 3.8f, ID = 123456789012345L, IsStudying = true } };
mixedList.Display();
mixedList.Cast<People>().Display();
```
<table><thead><tr><th><i>index</i></th><th><i>type</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td>Submission#81+People</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+People</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>John</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>180.5</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1000.50</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td>Submission#81+Student</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>20</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<table><thead><tr><th><i>index</i></th><th><i>type</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td>Submission#81+People</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+People</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>John</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>180.5</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1000.50</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td>Submission#81+Student</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>20</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

### ToArray/ToDictionary/ToHashSet/ToList

```c#
Divider("ToArray").Display();
students.ToArray().Display();
Divider("ToDictionary").Display();
students.ToDictionary(s=>s.Name).Display();
EqualityComparer<string> UniqueStringComparer = EqualityComparer<string>.Create((x,y)=> x==y, s=>s.GetHashCode());
//students.ToDictionary(s=>s.Address, UniqueStringComparer).Display(); //Error: Same Address
//students.ToDictionary(s=>s.Address, s=>s.Age, UniqueStringComparer).Display(); //Error: Same Address
students.ToDictionary(s=>s.Name, s=>s.Age).Display();
Divider("ToHashSet").Display();
students.ToHashSet().Display();
students.ToHashSet(EqualityComparer<Student>.Create((x,y)=>x.Address==y.Address, hash=>1)).Display();
Divider("ToList").Display();
students.ToList().Display()
```
===============ToArray===============
<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>bob@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>987-654-3210</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.2</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012346</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, History ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>30</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7891234.56</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>654 Cedar St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>emily@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>444-555-6666</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.7</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012349</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Math ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>3456789.0102903078273849284</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>159 Birch St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>grace@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>000-111-2222</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.6</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012351</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ History, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5678901.23468548968435543</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>9</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

===============ToDictionary===============
<table><thead><tr><th><i>key</i></th><th>value</th></tr></thead><tbody><tr><td><div class="dni-plaintext"><pre>Alice</pre></div></td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td><div class="dni-plaintext"><pre>Bob</pre></div></td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>bob@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>987-654-3210</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.2</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012346</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, History ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>30</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7891234.56</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td><div class="dni-plaintext"><pre>Charlie</pre></div></td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td><div class="dni-plaintext"><pre>David</pre></div></td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td><div class="dni-plaintext"><pre>Emily</pre></div></td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>654 Cedar St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>emily@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>444-555-6666</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.7</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012349</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Math ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>3456789.0102903078273849284</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td><div class="dni-plaintext"><pre>Frank</pre></div></td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td><div class="dni-plaintext"><pre>Grace</pre></div></td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>159 Birch St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>grace@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>000-111-2222</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.6</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012351</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ History, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5678901.23468548968435543</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td><div class="dni-plaintext"><pre>Henry</pre></div></td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td><div class="dni-plaintext"><pre>Isabella</pre></div></td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td><div class="dni-plaintext"><pre>Jack</pre></div></td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<table><thead><tr><th><i>key</i></th><th>value</th></tr></thead><tbody><tr><td><div class="dni-plaintext"><pre>Alice</pre></div></td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td><div class="dni-plaintext"><pre>Bob</pre></div></td><td><div class="dni-plaintext"><pre>30</pre></div></td></tr><tr><td><div class="dni-plaintext"><pre>Charlie</pre></div></td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td><div class="dni-plaintext"><pre>David</pre></div></td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td><div class="dni-plaintext"><pre>Emily</pre></div></td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr><tr><td><div class="dni-plaintext"><pre>Frank</pre></div></td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td><div class="dni-plaintext"><pre>Grace</pre></div></td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr><tr><td><div class="dni-plaintext"><pre>Henry</pre></div></td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td><div class="dni-plaintext"><pre>Isabella</pre></div></td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td><div class="dni-plaintext"><pre>Jack</pre></div></td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

===============ToHashSet===============
<details open="open" class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student, Submission#81+Student, Submission#81+Student, Submission#81+Student, Submission#81+Student, Submission#81+Student, Submission#81+Student, Submission#81+Student, Submission#81+Student, Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>10</pre></div></td></tr><tr><td>Comparer</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>System.Collections.Generic.ObjectEqualityComparer`1[Submission#81+Student]</code></span></summary><div><table><thead><tr></tr></thead><tbody></tbody></table></div></details></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>bob@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>987-654-3210</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.2</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012346</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, History ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>30</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7891234.56</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>654 Cedar St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>emily@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>444-555-6666</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.7</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012349</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Math ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>3456789.0102903078273849284</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>159 Birch St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>grace@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>000-111-2222</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.6</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012351</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ History, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5678901.23468548968435543</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>9</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<details open="open" class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student, Submission#81+Student, Submission#81+Student, Submission#81+Student, Submission#81+Student, Submission#81+Student, Submission#81+Student, Submission#81+Student, Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>9</pre></div></td></tr><tr><td>Comparer</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>System.Collections.Generic.DelegateEqualityComparer`1[Submission#81+Student]</code></span></summary><div><table><thead><tr></tr></thead><tbody></tbody></table></div></details></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>654 Cedar St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>emily@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>444-555-6666</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.7</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012349</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Math ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>3456789.0102903078273849284</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>159 Birch St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>grace@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>000-111-2222</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.6</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012351</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ History, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5678901.23468548968435543</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

===============ToList===============
<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>bob@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>987-654-3210</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.2</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012346</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, History ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>30</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7891234.56</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>654 Cedar St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>emily@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>444-555-6666</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.7</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012349</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Math ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>3456789.0102903078273849284</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>159 Birch St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>grace@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>000-111-2222</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.6</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012351</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ History, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5678901.23468548968435543</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>9</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

## 集合操作


| 操作        | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| Distinct    | 移除序列中的重复元素。                                       |
| DistinctBy  | 根据指定条件移除序列中的重复元素。                           |
| Except      | 返回存在于第一个序列但不存在于第二个序列的元素。             |
| ExceptBy    | 根据指定条件返回存在于第一个序列但不存在于第二个序列的元素。 |
| Intersect   | 返回两个序列的交集。                                         |
| IntersectBy | 根据指定条件返回两个序列的交集。                             |
| Union       | 返回两个序列的并集。                                         |
| UnionBy     | 根据指定条件返回两个序列的并集。                             |

### Distinct/DistinctBy

```c#
students.Distinct().Display();
students.Distinct(EqualityComparer<Student>.Create((x,y)=>x.Address==y.Address, hash=>1)).Display();

students.DistinctBy(s=>s.Address).Display();
students.DistinctBy(s=>s,EqualityComparer<Student>.Create((x,y)=>x.Address==y.Address, hash=>1)).Display();
```
<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>bob@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>987-654-3210</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.2</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012346</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, History ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>30</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7891234.56</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>654 Cedar St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>emily@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>444-555-6666</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.7</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012349</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Math ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>3456789.0102903078273849284</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>159 Birch St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>grace@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>000-111-2222</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.6</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012351</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ History, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5678901.23468548968435543</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>9</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>654 Cedar St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>emily@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>444-555-6666</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.7</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012349</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Math ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>3456789.0102903078273849284</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>159 Birch St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>grace@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>000-111-2222</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.6</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012351</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ History, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5678901.23468548968435543</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>654 Cedar St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>emily@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>444-555-6666</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.7</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012349</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Math ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>3456789.0102903078273849284</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>159 Birch St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>grace@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>000-111-2222</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.6</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012351</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ History, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5678901.23468548968435543</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>654 Cedar St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>emily@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>444-555-6666</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.7</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012349</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Math ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>3456789.0102903078273849284</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>159 Birch St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>grace@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>000-111-2222</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.6</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012351</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ History, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5678901.23468548968435543</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

### Union/UnionBy/Intersect/IntersectBy/Except/ExceptBy

```c#
Divider("Union").Display();
students.Union(students.Where(s=>s.Age<1)).Display();
students.Union(students.Where(s=>s.Age<1), EqualityComparer<Student>.Create((x,y)=>x.Address==y.Address, hash=>1)).Display();
Divider("UnionBy").Display();
students.UnionBy(students.Where(s=>s.Age<1), s=>s).Display();
students.UnionBy(students.Where(s=>s.Age<1), s=>s,EqualityComparer<Student>.Create((x,y)=>x.Address==y.Address, hash=>1)).Display();
Divider("Intersect").Display();
students.Intersect(students.Where(s=>s.Age<26)).Display();
students.Intersect(students.Where(s=>s.Age<26), EqualityComparer<Student>.Create((x,y)=>x.Address==y.Address, hash=>1)).Display();
Divider("IntersectBy").Display();
students.IntersectBy(students.Where(s=>s.Age<30), s=>s).Display();
students.IntersectBy(students.Where(s=>s.Age<30), s=>s,EqualityComparer<Student>.Create((x,y)=>x.Address==y.Address, hash=>1)).Display();
Divider("Except").Display();
students.Except(students.Where(s=>s.Age<30)).Display();
students.Except(students.Where(s=>s.Age<30), EqualityComparer<Student>.Create((x,y)=>x.Address==y.Address, hash=>1)).Display();
Divider("ExceptBy").Display();
students.ExceptBy(students.Where(s=>s.Age<30), s=>s).Display();
students.ExceptBy(students.Where(s=>s.Age<30), s=>s,EqualityComparer<Student>.Create((x,y)=>x.Address==y.Address, hash=>1)).Display();
```
===============Union===============
<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>bob@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>987-654-3210</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.2</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012346</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, History ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>30</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7891234.56</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>654 Cedar St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>emily@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>444-555-6666</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.7</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012349</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Math ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>3456789.0102903078273849284</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>159 Birch St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>grace@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>000-111-2222</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.6</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012351</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ History, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5678901.23468548968435543</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>9</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>654 Cedar St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>emily@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>444-555-6666</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.7</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012349</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Math ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>3456789.0102903078273849284</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>159 Birch St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>grace@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>000-111-2222</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.6</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012351</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ History, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5678901.23468548968435543</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

===============UnionBy===============
<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>bob@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>987-654-3210</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.2</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012346</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, History ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>30</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7891234.56</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>654 Cedar St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>emily@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>444-555-6666</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.7</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012349</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Math ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>3456789.0102903078273849284</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>159 Birch St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>grace@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>000-111-2222</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.6</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012351</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ History, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5678901.23468548968435543</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>9</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>654 Cedar St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>emily@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>444-555-6666</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.7</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012349</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Math ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>3456789.0102903078273849284</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>159 Birch St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>grace@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>000-111-2222</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.6</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012351</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ History, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5678901.23468548968435543</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

===============Intersect===============
<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

===============IntersectBy===============
<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>654 Cedar St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>emily@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>444-555-6666</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.7</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012349</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Math ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>3456789.0102903078273849284</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>159 Birch St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>grace@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>000-111-2222</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.6</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012351</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ History, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5678901.23468548968435543</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>654 Cedar St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>emily@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>444-555-6666</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.7</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012349</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Math ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>3456789.0102903078273849284</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>159 Birch St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>grace@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>000-111-2222</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.6</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012351</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ History, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5678901.23468548968435543</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

===============Except===============
<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>bob@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>987-654-3210</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.2</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012346</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, History ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>30</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7891234.56</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

===============ExceptBy===============
<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>bob@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>987-654-3210</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.2</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012346</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, History ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>30</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7891234.56</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

## 元素操作


| 操作               | 表述                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------ |
| ElementAt          | 获取指定索引处的元素。                                                               |
| ElementAtOrDefault | 获取指定索引处的元素，索引超出范围时返回默认值。                                     |
| First              | 获取序列中的第一个元素。                                                             |
| FirstOrDefault     | 获取序列中的第一个元素，如果序列为空则返回默认值。                                   |
| Last               | 获取序列中的最后一个元素。                                                           |
| LastOrDefault      | 获取序列中的最后一个元素，如果序列为空则返回默认值。                                 |
| Single             | 获取序列中唯一的一个元素，如果序列中有多个元素或者没有元素则抛出异常。               |
| SingleOrDefault    | 获取序列中唯一的一个元素，如果序列为空则返回默认值，如果序列中有多个元素则抛出异常。 |

### ElementAt /ElementAtOrDefault

```c#
students.ElementAt(0).Display();
students.ElementAt(Index.Start).Display();
students.ElementAtOrDefault(0).Display();
students.ElementAtOrDefault(Index.FromEnd(1)).Display();
```
<details open="open" class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<details open="open" class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<details open="open" class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<details open="open" class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

### First/FirstOrDefault

```c#
students.First().Display();
students.First(s=>s.Age>30).Display();
students.FirstOrDefault().Display();
students.FirstOrDefault(s=>s.Age>30).Display();
```
<details open="open" class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<details open="open" class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<details open="open" class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<details open="open" class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

### Last/LastOrDefault

```c#
students.Last().Display();
students.Last(s=>s.Age < 30).Display();

students.LastOrDefault().Display();
students.LastOrDefault(s=>s.Age < 30).Display();
```
<details open="open" class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<details open="open" class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<details open="open" class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<details open="open" class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

### Single/SingleOrDefault

```c#
var singleList = students.Where((s,i)=>i==1);
singleList.Single().Display();
students.Single(s=>s.Name == "Alice").Display();
singleList.SingleOrDefault().Display();
students.SingleOrDefault(s=>s.Name == "Alice").Display();
```
<details open="open" class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>bob@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>987-654-3210</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.2</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012346</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, History ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>30</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7891234.56</pre></div></td></tr></tbody></table></div></details><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<details open="open" class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<details open="open" class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>bob@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>987-654-3210</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.2</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012346</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, History ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>30</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7891234.56</pre></div></td></tr></tbody></table></div></details><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<details open="open" class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

## 筛选操作


| 操作   | 表述                       |
| ------ | -------------------------- |
| Where  | 筛选符合条件的元素         |
| OfType | 筛选序列中指定类型的元素。 |

### OfType

```c#
List<object> mixedList = new List<object> { new People { Name = "John", Age = 25, Height = 180.5, Money = 1000.50m }, new Student { Name = "Alice", Age = 20, Address = "123 Main St", Email = "alice@example.com", Phone = "123-456-7890", Subjects = new List<string>{"Math", "Science"}, GPA = 3.8f, ID = 123456789012345L, IsStudying = true } };
mixedList.OfType<Student>().Display();
```
<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>20</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

### Where

```c#
students.Where(s=>s.Age>30).Display();
students.Where((s,i)=>i < 1).Display();
```
<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

## 分组操作


| 操作      | 表述                   |
| --------- | ---------------------- |
| GroupBy   | 根据指定条件将序列分组 |
| GroupJoin | 对两个序列进行分组连接 |
| ToLookup  | 将序列转换为查找表     |

### GroupBy

```c#
students.GroupBy(s=>s.Name).Display();
students.GroupBy(s=>s.Name, EqualityComparer<string>.Default).Display();

students.GroupBy(s=>s.Name, s=>s.Address).Display();
students.GroupBy(s=>s.Name, s=>s.Address, EqualityComparer<string>.Default).Display();

students.GroupBy(s=>s.Name, (k,e)=> new {Count = e.Count(), FirstValue = e.First()}).Display();
students.GroupBy(s=>s.Name, (k,e)=> new {Count = e.Count(), FirstValue = e.First()}, EqualityComparer<string>.Default).Display();

students.GroupBy(s=>s.Name, s=>s.Subjects, (k,e)=> new {Count = e.Count(), FirstValue = e.First()}).Display();
students.GroupBy(s=>s.Name, s=>s.Subjects, (k,e)=> new {Count = e.Count(), FirstValue = e.First()}, EqualityComparer<string>.Default).Display();
```
<details open="open" class="dni-treeview"><summary><span class="dni-code-hint"><code>[ [ Submission#81+Student ], [ Submission#81+Student ], [ Submission#81+Student ], [ Submission#81+Student ], [ Submission#81+Student ], [ Submission#81+Student ], [ Submission#81+Student ], [ Submission#81+Student ], [ Submission#81+Student ], [ Submission#81+Student ] ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>bob@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>987-654-3210</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.2</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012346</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, History ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>30</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7891234.56</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>654 Cedar St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>emily@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>444-555-6666</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.7</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012349</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Math ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>3456789.0102903078273849284</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>159 Birch St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>grace@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>000-111-2222</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.6</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012351</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ History, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5678901.23468548968435543</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr><tr><td>9</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<details open="open" class="dni-treeview"><summary><span class="dni-code-hint"><code>[ [ Submission#81+Student ], [ Submission#81+Student ], [ Submission#81+Student ], [ Submission#81+Student ], [ Submission#81+Student ], [ Submission#81+Student ], [ Submission#81+Student ], [ Submission#81+Student ], [ Submission#81+Student ], [ Submission#81+Student ] ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>bob@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>987-654-3210</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.2</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012346</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, History ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>30</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7891234.56</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>654 Cedar St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>emily@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>444-555-6666</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.7</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012349</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Math ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>3456789.0102903078273849284</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>159 Birch St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>grace@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>000-111-2222</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.6</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012351</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ History, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5678901.23468548968435543</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr><tr><td>9</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<details open="open" class="dni-treeview"><summary><span class="dni-code-hint"><code>[ [ 123 Main St ], [ 123 Main St ], [ 789 Oak St ], [ 321 Pine St ], [ 654 Cedar St ], [ 987 Maple St ], [ 159 Birch St ], [ 753 Walnut St ], [ 246 Pineapple St ], [ 951 Orange St ] ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 123 Main St ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 123 Main St ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 123 Main St ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 123 Main St ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 789 Oak St ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 789 Oak St ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 321 Pine St ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 321 Pine St ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 654 Cedar St ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 654 Cedar St ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 987 Maple St ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 987 Maple St ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 159 Birch St ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 159 Birch St ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 753 Walnut St ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 753 Walnut St ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 246 Pineapple St ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 246 Pineapple St ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>9</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 951 Orange St ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 951 Orange St ]</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<details open="open" class="dni-treeview"><summary><span class="dni-code-hint"><code>[ [ 123 Main St ], [ 123 Main St ], [ 789 Oak St ], [ 321 Pine St ], [ 654 Cedar St ], [ 987 Maple St ], [ 159 Birch St ], [ 753 Walnut St ], [ 246 Pineapple St ], [ 951 Orange St ] ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 123 Main St ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 123 Main St ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 123 Main St ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 123 Main St ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 789 Oak St ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 789 Oak St ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 321 Pine St ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 321 Pine St ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 654 Cedar St ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 654 Cedar St ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 987 Maple St ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 987 Maple St ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 159 Birch St ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 159 Birch St ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 753 Walnut St ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 753 Walnut St ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 246 Pineapple St ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 246 Pineapple St ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>9</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 951 Orange St ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 951 Orange St ]</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<details open="open" class="dni-treeview"><summary><span class="dni-code-hint"><code>[ { Count = 1, FirstValue = Submission#81+Student }, { Count = 1, FirstValue = Submission#81+Student }, { Count = 1, FirstValue = Submission#81+Student }, { Count = 1, FirstValue = Submission#81+Student }, { Count = 1, FirstValue = Submission#81+Student }, { Count = 1, FirstValue = Submission#81+Student }, { Count = 1, FirstValue = Submission#81+Student }, { Count = 1, FirstValue = Submission#81+Student }, { Count = 1, FirstValue = Submission#81+Student }, { Count = 1, FirstValue = Submission#81+Student } ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = Submission#81+Student }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = Submission#81+Student }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>bob@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>987-654-3210</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.2</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012346</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, History ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>30</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7891234.56</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = Submission#81+Student }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = Submission#81+Student }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = Submission#81+Student }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>654 Cedar St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>emily@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>444-555-6666</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.7</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012349</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Math ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>3456789.0102903078273849284</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = Submission#81+Student }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = Submission#81+Student }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>159 Birch St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>grace@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>000-111-2222</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.6</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012351</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ History, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5678901.23468548968435543</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = Submission#81+Student }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = Submission#81+Student }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></div></details></td></tr><tr><td>9</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = Submission#81+Student }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<details open="open" class="dni-treeview"><summary><span class="dni-code-hint"><code>[ { Count = 1, FirstValue = Submission#81+Student }, { Count = 1, FirstValue = Submission#81+Student }, { Count = 1, FirstValue = Submission#81+Student }, { Count = 1, FirstValue = Submission#81+Student }, { Count = 1, FirstValue = Submission#81+Student }, { Count = 1, FirstValue = Submission#81+Student }, { Count = 1, FirstValue = Submission#81+Student }, { Count = 1, FirstValue = Submission#81+Student }, { Count = 1, FirstValue = Submission#81+Student }, { Count = 1, FirstValue = Submission#81+Student } ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = Submission#81+Student }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = Submission#81+Student }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>bob@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>987-654-3210</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.2</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012346</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, History ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>30</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7891234.56</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = Submission#81+Student }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = Submission#81+Student }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = Submission#81+Student }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>654 Cedar St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>emily@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>444-555-6666</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.7</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012349</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Math ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>3456789.0102903078273849284</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = Submission#81+Student }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = Submission#81+Student }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>159 Birch St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>grace@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>000-111-2222</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.6</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012351</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ History, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5678901.23468548968435543</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = Submission#81+Student }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = Submission#81+Student }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></div></details></td></tr><tr><td>9</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = Submission#81+Student }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<details open="open" class="dni-treeview"><summary><span class="dni-code-hint"><code>[ { Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] }, { Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] }, { Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] }, { Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] }, { Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] }, { Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] }, { Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] }, { Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] }, { Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] }, { Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] } ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><div class="dni-plaintext"><pre>[ English, History ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><div class="dni-plaintext"><pre>[ Computer Science, Math ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><div class="dni-plaintext"><pre>[ History, Geography ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>9</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<details open="open" class="dni-treeview"><summary><span class="dni-code-hint"><code>[ { Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] }, { Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] }, { Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] }, { Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] }, { Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] }, { Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] }, { Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] }, { Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] }, { Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] }, { Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] } ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><div class="dni-plaintext"><pre>[ English, History ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><div class="dni-plaintext"><pre>[ Computer Science, Math ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><div class="dni-plaintext"><pre>[ History, Geography ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>9</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Count = 1, FirstValue = System.Collections.Generic.List`1[System.String] }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>FirstValue</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

### GroupJoin

```c#
class Contact
{
    public int Id { get; set; }
    public string Name { get; set; } 
    public string ContactMethod { get; set; }
}
var inner = new []{
    new Contact {Id = 11,Name="Alice", ContactMethod = "QQ"},
    new Contact {Id = 11,Name="Alice", ContactMethod = "WeChat"},
    new Contact {Id = 22,Name="Blob", ContactMethod = "WeChat"},
    new Contact {Id = 33, Name="Charlie",ContactMethod = "FaceBook"}
};
students.GroupJoin(inner, s=>s.Name,i=>i.Name, (s,i)=> new {Name=s.Name, ContactCount = i.Count()}).Display();
students.GroupJoin(inner, s=>s.Name,i=>i.Name, (s,i)=> new {Name=s.Name, ContactCount = i.Count()}, EqualityComparer<string>.Default).Display();
```
<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Alice, ContactCount = 2 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>ContactCount</td><td><div class="dni-plaintext"><pre>2</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Bob, ContactCount = 0 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>ContactCount</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Charlie, ContactCount = 1 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>ContactCount</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = David, ContactCount = 0 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>ContactCount</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Emily, ContactCount = 0 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>ContactCount</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Frank, ContactCount = 0 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>ContactCount</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Grace, ContactCount = 0 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>ContactCount</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Henry, ContactCount = 0 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>ContactCount</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Isabella, ContactCount = 0 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>ContactCount</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>9</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Jack, ContactCount = 0 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>ContactCount</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Alice, ContactCount = 2 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>ContactCount</td><td><div class="dni-plaintext"><pre>2</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Bob, ContactCount = 0 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>ContactCount</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Charlie, ContactCount = 1 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>ContactCount</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = David, ContactCount = 0 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>ContactCount</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Emily, ContactCount = 0 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>ContactCount</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Frank, ContactCount = 0 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>ContactCount</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Grace, ContactCount = 0 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>ContactCount</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Henry, ContactCount = 0 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>ContactCount</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Isabella, ContactCount = 0 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>ContactCount</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>9</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Jack, ContactCount = 0 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>ContactCount</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

### ToLookup

```c#
students.ToLookup(s=>s.Name).Display();
students.ToLookup(s=>s.Name, EqualityComparer<string>.Default).Display();
students.ToLookup(s=>s.Name, s=>s.Age).Display();
students.ToLookup(s=>s.Name, s=>s.Age,EqualityComparer<string>.Default).Display();
```
<details open="open" class="dni-treeview"><summary><span class="dni-code-hint"><code>[ [ Submission#81+Student ], [ Submission#81+Student ], [ Submission#81+Student ], [ Submission#81+Student ], [ Submission#81+Student ], [ Submission#81+Student ], [ Submission#81+Student ], [ Submission#81+Student ], [ Submission#81+Student ], [ Submission#81+Student ] ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>10</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>bob@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>987-654-3210</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.2</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012346</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, History ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>30</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7891234.56</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>654 Cedar St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>emily@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>444-555-6666</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.7</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012349</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Math ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>3456789.0102903078273849284</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>159 Birch St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>grace@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>000-111-2222</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.6</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012351</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ History, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5678901.23468548968435543</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr><tr><td>9</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<details open="open" class="dni-treeview"><summary><span class="dni-code-hint"><code>[ [ Submission#81+Student ], [ Submission#81+Student ], [ Submission#81+Student ], [ Submission#81+Student ], [ Submission#81+Student ], [ Submission#81+Student ], [ Submission#81+Student ], [ Submission#81+Student ], [ Submission#81+Student ], [ Submission#81+Student ] ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>10</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>bob@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>987-654-3210</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.2</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012346</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, History ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>30</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7891234.56</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>654 Cedar St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>emily@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>444-555-6666</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.7</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012349</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Math ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>3456789.0102903078273849284</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>159 Birch St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>grace@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>000-111-2222</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.6</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012351</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ History, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5678901.23468548968435543</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr><tr><td>9</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ Submission#81+Student ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<details open="open" class="dni-treeview"><summary><span class="dni-code-hint"><code>[ [ 25 ], [ 30 ], [ 35 ], [ 28 ], [ 27 ], [ 32 ], [ 29 ], [ 31 ], [ 26 ], [ 33 ] ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>10</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 25 ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 25 ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 30 ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 30 ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 35 ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 35 ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 28 ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 28 ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 27 ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 27 ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 32 ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 32 ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 29 ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 29 ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 31 ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 31 ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 26 ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 26 ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>9</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 33 ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 33 ]</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<details open="open" class="dni-treeview"><summary><span class="dni-code-hint"><code>[ [ 25 ], [ 30 ], [ 35 ], [ 28 ], [ 27 ], [ 32 ], [ 29 ], [ 31 ], [ 26 ], [ 33 ] ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Count</td><td><div class="dni-plaintext"><pre>10</pre></div></td></tr><tr><td><i>(values)</i></td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 25 ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 25 ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 30 ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 30 ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 35 ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 35 ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 28 ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 28 ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 27 ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 27 ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 32 ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 32 ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 29 ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 29 ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 31 ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 31 ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 26 ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 26 ]</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>9</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>[ 33 ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Key</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td><i>(values)</i></td><td><div class="dni-plaintext"><pre>[ 33 ]</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table></div></details><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

## 排序操作


| Method            | Description                            |
| ----------------- | -------------------------------------- |
| OrderBy           | 对序列中的元素进行升序排序。           |
| OrderByDescending | 对序列中的元素进行降序排序。           |
| ThenBy            | 对已经排序的序列进行次级排序（升序）。 |
| ThenByDescending  | 对已经排序的序列进行次级排序（降序）。 |
| Order             | 对序列进行排序。                       |
| OrderDescending   | 对序列进行降序排序。                   |
| Reverse           | 反转序列中的元素顺序。                 |

### Order/OrderDescending/OrderBy/OrderByDescending

```c#
Divider("Order").Display();
//students.Order().Display(); //Faile: At least one object must implement IComparable
students.Order(Comparer<Student>.Create((x,y)=>x.Age-y.Age)).Display();
Divider("OrderDescending").Display();
//students.OrderDescending().Display(); //Faile: At least one object must implement IComparable
students.OrderDescending(Comparer<Student>.Create((x,y)=>x.Age-y.Age)).Display();
Divider("OrderBy").Display();
students.OrderBy(s=>s.Age).Display();
students.OrderBy(s=>s.Age, Comparer<int>.Default).Display();
Divider("OrderByDescending").Display();
students.OrderByDescending(s=>s.Age).Display();
students.OrderByDescending(s=>s.Age, Comparer<int>.Default).Display();
```
===============Order===============
<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>654 Cedar St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>emily@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>444-555-6666</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.7</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012349</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Math ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>3456789.0102903078273849284</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>159 Birch St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>grace@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>000-111-2222</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.6</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012351</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ History, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5678901.23468548968435543</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>bob@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>987-654-3210</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.2</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012346</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, History ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>30</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7891234.56</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>9</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

===============OrderDescending===============
<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>bob@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>987-654-3210</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.2</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012346</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, History ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>30</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7891234.56</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>159 Birch St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>grace@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>000-111-2222</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.6</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012351</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ History, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5678901.23468548968435543</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>654 Cedar St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>emily@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>444-555-6666</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.7</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012349</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Math ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>3456789.0102903078273849284</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>9</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

===============OrderBy===============
<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>654 Cedar St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>emily@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>444-555-6666</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.7</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012349</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Math ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>3456789.0102903078273849284</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>159 Birch St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>grace@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>000-111-2222</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.6</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012351</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ History, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5678901.23468548968435543</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>bob@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>987-654-3210</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.2</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012346</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, History ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>30</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7891234.56</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>9</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>654 Cedar St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>emily@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>444-555-6666</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.7</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012349</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Math ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>3456789.0102903078273849284</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>159 Birch St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>grace@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>000-111-2222</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.6</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012351</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ History, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5678901.23468548968435543</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>bob@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>987-654-3210</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.2</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012346</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, History ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>30</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7891234.56</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>9</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

===============OrderByDescending===============
<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>bob@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>987-654-3210</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.2</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012346</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, History ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>30</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7891234.56</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>159 Birch St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>grace@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>000-111-2222</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.6</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012351</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ History, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5678901.23468548968435543</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>654 Cedar St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>emily@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>444-555-6666</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.7</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012349</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Math ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>3456789.0102903078273849284</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>9</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>bob@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>987-654-3210</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.2</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012346</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, History ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>30</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7891234.56</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>159 Birch St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>grace@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>000-111-2222</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.6</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012351</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ History, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5678901.23468548968435543</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>654 Cedar St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>emily@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>444-555-6666</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.7</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012349</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Math ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>3456789.0102903078273849284</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>9</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

### ThenBy/ThenByDescending

```c#
students.OrderBy(s=>s.Age).ThenBy(s=>s.GPA).Display();
students.OrderBy(s=>s.Age).ThenBy(s=>s.GPA, Comparer<float>.Default).Display();
```
<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>654 Cedar St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>emily@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>444-555-6666</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.7</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012349</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Math ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>3456789.0102903078273849284</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>159 Birch St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>grace@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>000-111-2222</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.6</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012351</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ History, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5678901.23468548968435543</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>bob@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>987-654-3210</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.2</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012346</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, History ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>30</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7891234.56</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>9</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>654 Cedar St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>emily@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>444-555-6666</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.7</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012349</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Math ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>3456789.0102903078273849284</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>159 Birch St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>grace@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>000-111-2222</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.6</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012351</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ History, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5678901.23468548968435543</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>bob@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>987-654-3210</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.2</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012346</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, History ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>30</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7891234.56</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>9</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

### Reverse

```c#
var reversed = students.Select((s,i)=>new {i,s.Name}).Reverse();
reversed.Display();
```
<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 9, Name = Jack }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>9</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 8, Name = Isabella }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>8</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 7, Name = Henry }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>7</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 6, Name = Grace }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>6</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 5, Name = Frank }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>5</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 4, Name = Emily }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>4</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 3, Name = David }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 2, Name = Charlie }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>2</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 1, Name = Bob }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>9</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 0, Name = Alice }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

## 分区操作


| 草嘴      | 描述                             |
| --------- | -------------------------------- |
| Skip      | 跳过指定数量的元素。             |
| SkipLast  | 跳过序列中的最后指定数量的元素。 |
| SkipWhile | 一直跳过元素直到条件为false      |
| Take      | 取出指定数量的元素。             |
| TakeLast  | 取出序列中的最后指定数量的元素。 |
| TakeWhile | 一直取元素直到条件为false        |
| Chunk     | 将序列分割成多个大小相等的块。   |

### Skip/SkipLast/SkipWhile

```c#
students.Skip(1).Display();
students.SkipLast(1).Display();
students//.OrderBy(s=>s.Age)
.SkipWhile(s=>s.Age<=30).Display(); //跳过<=30岁的, 直到遇见了第一个>30岁的为止
students//.OrderBy(s=>s.Age)
.SkipWhile((s,i)=>i < 8).Display();
```
<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>bob@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>987-654-3210</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.2</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012346</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, History ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>30</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7891234.56</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>654 Cedar St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>emily@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>444-555-6666</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.7</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012349</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Math ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>3456789.0102903078273849284</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>159 Birch St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>grace@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>000-111-2222</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.6</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012351</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ History, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5678901.23468548968435543</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>bob@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>987-654-3210</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.2</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012346</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, History ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>30</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7891234.56</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>654 Cedar St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>emily@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>444-555-6666</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.7</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012349</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Math ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>3456789.0102903078273849284</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>159 Birch St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>grace@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>000-111-2222</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.6</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012351</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ History, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5678901.23468548968435543</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>654 Cedar St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>emily@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>444-555-6666</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.7</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012349</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Math ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>3456789.0102903078273849284</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>159 Birch St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>grace@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>000-111-2222</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.6</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012351</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ History, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5678901.23468548968435543</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

### Chunk

```c#
students.Select((s,i)=>new {i,s.Name}).Chunk(2).Display();
```
<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 0, Name = Alice }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 1, Name = Bob }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr><tr><td>1</td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 2, Name = Charlie }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>2</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 3, Name = David }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr><tr><td>2</td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 4, Name = Emily }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>4</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 5, Name = Frank }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>5</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr><tr><td>3</td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 6, Name = Grace }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>6</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 7, Name = Henry }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>7</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr><tr><td>4</td><td><table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 8, Name = Isabella }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>8</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 9, Name = Jack }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>9</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

### Take/TakeLast/TakeWhile

```c#
students.Select((s,i)=> new {i,s.Name}).Take(2).Display();
students.Select((s,i)=> new {i,s.Name}).Take(Range.StartAt(3)).Display();

students.Select((s,i)=> new {i,s.Name}).TakeLast(2).Display();

students.Select((s,i)=> new {i,s.Name,s.Age}).OrderBy(s=>s.Age).TakeWhile(s=>s.Age<28).Display(); //按顺序取, 直到条件为false为止
students.Select((s,i)=> new {i,s.Name,s.Age}).OrderBy(s=>s.Age).TakeWhile((s,i)=>i < 2).Display(); 
```
<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 0, Name = Alice }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 1, Name = Bob }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 3, Name = David }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 4, Name = Emily }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>4</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 5, Name = Frank }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>5</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 6, Name = Grace }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>6</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 7, Name = Henry }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>7</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 8, Name = Isabella }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>8</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 9, Name = Jack }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>9</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 8, Name = Isabella }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>8</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 9, Name = Jack }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>9</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 0, Name = Alice, Age = 25 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 8, Name = Isabella, Age = 26 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>8</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 4, Name = Emily, Age = 27 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>4</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 0, Name = Alice, Age = 25 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 8, Name = Isabella, Age = 26 }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>8</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

## 串联操作


| 操作    | 描述                       |
| ------- | -------------------------- |
| Append  | 在序列的末尾追加一个元素。 |
| Prepend | 在序列的开头添加一个元素。 |
| Concat  | 连接两个序列。             |

### Append/Prepend

```c#
students.Append(students.Last()).Select((s,i)=> new {i, s.Name}).TakeLast(2).Display();
students.Prepend(students.First()).Select((s,i)=> new {i, s.Name}).Take(2).Display();
```
<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 9, Name = Jack }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>9</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 10, Name = Jack }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>10</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 0, Name = Alice }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 1, Name = Alice }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>1</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

## Concat

```c#
var AgeUp25 = students.Where(s=>s.Age > 30).ToList();
var AgeNotUp25 = students.Where(s=>s.Age <= 30).ToList();
AgeUp25.Display();
AgeNotUp25.Display();

AgeNotUp25.Concat(AgeUp25).Display();
```
<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>bob@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>987-654-3210</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.2</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012346</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, History ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>30</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7891234.56</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>654 Cedar St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>emily@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>444-555-6666</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.7</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012349</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Math ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>3456789.0102903078273849284</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>159 Birch St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>grace@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>000-111-2222</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.6</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012351</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ History, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5678901.23468548968435543</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>alice@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>123-456-7890</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.8</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012345</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Science ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>25</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5386721.41231232131231235</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>123 Main St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>bob@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>987-654-3210</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.2</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012346</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, History ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Bob</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>30</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7891234.56</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>321 Pine St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>david@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>111-222-3333</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.9</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012348</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Biology, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>David</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>28</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>2345678.90123123548968745986</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>3</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>654 Cedar St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>emily@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>444-555-6666</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.7</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012349</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Math ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Emily</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>27</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>3456789.0102903078273849284</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>4</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>159 Birch St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>grace@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>000-111-2222</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.6</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012351</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ History, Geography ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Grace</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>29</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>5678901.23468548968435543</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>5</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>246 Pineapple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>isabella@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>666-777-8888</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012353</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Chemistry, Biology ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Isabella</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>26</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>7890123.4590892079478239749208</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>6</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>789 Oak St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>charlie@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>555-123-4567</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.5</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012347</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Physics, Chemistry ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>35</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>1234567.89124121251251</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>7</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>987 Maple St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>frank@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>777-888-9999</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.4</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012350</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ English, Art ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Frank</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>32</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>4567890.12</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>8</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>753 Walnut St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>henry@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>333-444-5555</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3.1</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012352</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Math, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Henry</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>31</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>6789012.34</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>9</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre>951 Orange St</pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre>jack@example.com</pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre>999-000-1111</pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>3</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>123456789012354</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre>[ Computer Science, Physics ]</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Jack</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>33</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>8901234.56458678947689456</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

## 生成操作


| 操作           | 描述                                 |
| -------------- | ------------------------------------ |
| DefaultIfEmpty | 如果序列为空，则生成包含默认值的集合 |
| Empty          | 返回一个空序列。                     |
| Range          | 生成一个指定范围的整数序列           |
| Repeat         | 生成一个重复指定元素的集合           |

### DefaultIfEmpty

```c#
var emptyList = new List<Student>();
emptyList.DefaultIfEmpty().Display();
emptyList.DefaultIfEmpty(new Student {Name="Default"}).Display();
```
<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><div class="dni-plaintext"><pre><null></pre></div></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>Submission#81+Student</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Address</td><td><div class="dni-plaintext"><pre><null></pre></div></td></tr><tr><td>Email</td><td><div class="dni-plaintext"><pre><null></pre></div></td></tr><tr><td>Phone</td><td><div class="dni-plaintext"><pre><null></pre></div></td></tr><tr><td>GPA</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>ID</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>IsStudying</td><td><div class="dni-plaintext"><pre>False</pre></div></td></tr><tr><td>Subjects</td><td><div class="dni-plaintext"><pre><null></pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Default</pre></div></td></tr><tr><td>Age</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Height</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Money</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

### Empty

```c#
Enumerable.Empty<Student>().Display();
```
<details open="open" class="dni-treeview"><summary><span class="dni-code-hint"><code>[  ]</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Current</td><td><div class="dni-plaintext"><pre><null></pre></div></td></tr><tr><td>Count</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>IsReadOnly</td><td><div class="dni-plaintext"><pre>True</pre></div></td></tr><tr><td><i>(values)</i></td><td><i>(empty)</i></td></tr></tbody></table></div></details><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

### Range

```c#
Enumerable.Range(4,5).Display();
```
<div class="dni-plaintext"><pre>[ 4, 5, 6, 7, 8 ]</pre></div><style>

.dni-code-hint {
font-style: italic;
overflow: hidden;
white-space: nowrap;
}
.dni-treeview {
white-space: nowrap;
}
.dni-treeview td {
vertical-align: top;
text-align: start;
}
details.dni-treeview {
padding-left: 1em;
}
table td {
text-align: start;
}
table tr {
vertical-align: top;
margin: 0em 0px;
}
table tr td pre
{
vertical-align: top !important;
margin: 0em 0px !important;
}
table th {
text-align: start;
}
</style>

### Repeat

```c#
Enumerable.Repeat(students.Select((s,i)=>new {i,s.Name}).First(),3).Display();
```
<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 0, Name = Alice }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 0, Name = Alice }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ i = 0, Name = Alice }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>i</td><td><div class="dni-plaintext"><pre>0</pre></div></td></tr><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>

## 等值操作


| 操作          | 描述                   |
| ------------- | ---------------------- |
| SequenceEqual | 判断两个序列是否相等。 |

### SequenceEqual

```c#
var lightClone = students.Select(s=>s).ToList();
var deepClone = students.Select(s=>s.Clone() as Student).ToList();

Enumerable.SequenceEqual<Student>(students, lightClone).Display();
Enumerable.SequenceEqual<Student>(students, deepClone).Display();

Enumerable.SequenceEqual<Student>(students, lightClone,EqualityComparer<Student>.Create((x,y)=>x.ID==y.ID)).Display();
Enumerable.SequenceEqual<Student>(students, deepClone, EqualityComparer<Student>.Create((x,y)=>x.ID==y.ID)).Display();
```
<div class="dni-plaintext"><pre>True</pre></div><style>

.dni-code-hint {
font-style: italic;
overflow: hidden;
white-space: nowrap;
}
.dni-treeview {
white-space: nowrap;
}
.dni-treeview td {
vertical-align: top;
text-align: start;
}
details.dni-treeview {
padding-left: 1em;
}
table td {
text-align: start;
}
table tr {
vertical-align: top;
margin: 0em 0px;
}
table tr td pre
{
vertical-align: top !important;
margin: 0em 0px !important;
}
table th {
text-align: start;
}
</style>

<div class="dni-plaintext"><pre>False</pre></div><style>

.dni-code-hint {
font-style: italic;
overflow: hidden;
white-space: nowrap;
}
.dni-treeview {
white-space: nowrap;
}
.dni-treeview td {
vertical-align: top;
text-align: start;
}
details.dni-treeview {
padding-left: 1em;
}
table td {
text-align: start;
}
table tr {
vertical-align: top;
margin: 0em 0px;
}
table tr td pre
{
vertical-align: top !important;
margin: 0em 0px !important;
}
table th {
text-align: start;
}
</style>

<div class="dni-plaintext"><pre>True</pre></div><style>

.dni-code-hint {
font-style: italic;
overflow: hidden;
white-space: nowrap;
}
.dni-treeview {
white-space: nowrap;
}
.dni-treeview td {
vertical-align: top;
text-align: start;
}
details.dni-treeview {
padding-left: 1em;
}
table td {
text-align: start;
}
table tr {
vertical-align: top;
margin: 0em 0px;
}
table tr td pre
{
vertical-align: top !important;
margin: 0em 0px !important;
}
table th {
text-align: start;
}
</style>

<div class="dni-plaintext"><pre>True</pre></div><style>

.dni-code-hint {
font-style: italic;
overflow: hidden;
white-space: nowrap;
}
.dni-treeview {
white-space: nowrap;
}
.dni-treeview td {
vertical-align: top;
text-align: start;
}
details.dni-treeview {
padding-left: 1em;
}
table td {
text-align: start;
}
table tr {
vertical-align: top;
margin: 0em 0px;
}
table tr td pre
{
vertical-align: top !important;
margin: 0em 0px !important;
}
table th {
text-align: start;
}
</style>

## 量化操作


| 操作     | 描述                                     |
| -------- | ---------------------------------------- |
| All      | 判断序列中的所有元素是否都满足指定的条件 |
| Any      | 判断序列中是否有任何一个元素满足指定条件 |
| Contains | 判断序列是否包含指定元素                 |

### All

```c#
students.All(s=>s.Age>20).Display();
students.All(s=>s.Age>30).Display();
```
<div class="dni-plaintext"><pre>True</pre></div><style>

.dni-code-hint {
font-style: italic;
overflow: hidden;
white-space: nowrap;
}
.dni-treeview {
white-space: nowrap;
}
.dni-treeview td {
vertical-align: top;
text-align: start;
}
details.dni-treeview {
padding-left: 1em;
}
table td {
text-align: start;
}
table tr {
vertical-align: top;
margin: 0em 0px;
}
table tr td pre
{
vertical-align: top !important;
margin: 0em 0px !important;
}
table th {
text-align: start;
}
</style>

<div class="dni-plaintext"><pre>False</pre></div><style>

.dni-code-hint {
font-style: italic;
overflow: hidden;
white-space: nowrap;
}
.dni-treeview {
white-space: nowrap;
}
.dni-treeview td {
vertical-align: top;
text-align: start;
}
details.dni-treeview {
padding-left: 1em;
}
table td {
text-align: start;
}
table tr {
vertical-align: top;
margin: 0em 0px;
}
table tr td pre
{
vertical-align: top !important;
margin: 0em 0px !important;
}
table th {
text-align: start;
}
</style>

### Any

```c#
students.Any(s=>s.Age>20).Display();
students.Any(s=>s.Age>30).Display();
```
<div class="dni-plaintext"><pre>True</pre></div><style>

.dni-code-hint {
font-style: italic;
overflow: hidden;
white-space: nowrap;
}
.dni-treeview {
white-space: nowrap;
}
.dni-treeview td {
vertical-align: top;
text-align: start;
}
details.dni-treeview {
padding-left: 1em;
}
table td {
text-align: start;
}
table tr {
vertical-align: top;
margin: 0em 0px;
}
table tr td pre
{
vertical-align: top !important;
margin: 0em 0px !important;
}
table th {
text-align: start;
}
</style>

<div class="dni-plaintext"><pre>True</pre></div><style>

.dni-code-hint {
font-style: italic;
overflow: hidden;
white-space: nowrap;
}
.dni-treeview {
white-space: nowrap;
}
.dni-treeview td {
vertical-align: top;
text-align: start;
}
details.dni-treeview {
padding-left: 1em;
}
table td {
text-align: start;
}
table tr {
vertical-align: top;
margin: 0em 0px;
}
table tr td pre
{
vertical-align: top !important;
margin: 0em 0px !important;
}
table th {
text-align: start;
}
</style>

### Contains

```c#
students.Contains(students[0]).Display();
students.Contains(students[0], EqualityComparer<Student>.Create((x,y)=>false, hash=>1)).Display();
```
<div class="dni-plaintext"><pre>True</pre></div><style>

.dni-code-hint {
font-style: italic;
overflow: hidden;
white-space: nowrap;
}
.dni-treeview {
white-space: nowrap;
}
.dni-treeview td {
vertical-align: top;
text-align: start;
}
details.dni-treeview {
padding-left: 1em;
}
table td {
text-align: start;
}
table tr {
vertical-align: top;
margin: 0em 0px;
}
table tr td pre
{
vertical-align: top !important;
margin: 0em 0px !important;
}
table th {
text-align: start;
}
</style>

<div class="dni-plaintext"><pre>False</pre></div><style>

.dni-code-hint {
font-style: italic;
overflow: hidden;
white-space: nowrap;
}
.dni-treeview {
white-space: nowrap;
}
.dni-treeview td {
vertical-align: top;
text-align: start;
}
details.dni-treeview {
padding-left: 1em;
}
table td {
text-align: start;
}
table tr {
vertical-align: top;
margin: 0em 0px;
}
table tr td pre
{
vertical-align: top !important;
margin: 0em 0px !important;
}
table th {
text-align: start;
}
</style>

## 连接操作


| 操作 | 描述                 |
| ---- | -------------------- |
| Join | 对两个集合进行内连接 |

### Join

```c#
var inner = new []{
    new Contact {Id = 11,Name="Alice", ContactMethod = "QQ"},
    new Contact {Id = 11,Name="Alice", ContactMethod = "WeChat"},
    new Contact {Id = 22,Name="Blob", ContactMethod = "WeChat"},
    new Contact {Id = 33, Name="Charlie",ContactMethod = "FaceBook"}
};
students.Join(inner, s=>s.Name, i=>i.Name, (s,i)=> new {s.Name, i.ContactMethod}).Display();
```
<table><thead><tr><th><i>index</i></th><th>value</th></tr></thead><tbody><tr><td>0</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Alice, ContactMethod = QQ }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>ContactMethod</td><td><div class="dni-plaintext"><pre>QQ</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>1</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Alice, ContactMethod = WeChat }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Alice</pre></div></td></tr><tr><td>ContactMethod</td><td><div class="dni-plaintext"><pre>WeChat</pre></div></td></tr></tbody></table></div></details></td></tr><tr><td>2</td><td><details class="dni-treeview"><summary><span class="dni-code-hint"><code>{ Name = Charlie, ContactMethod = FaceBook }</code></span></summary><div><table><thead><tr></tr></thead><tbody><tr><td>Name</td><td><div class="dni-plaintext"><pre>Charlie</pre></div></td></tr><tr><td>ContactMethod</td><td><div class="dni-plaintext"><pre>FaceBook</pre></div></td></tr></tbody></table></div></details></td></tr></tbody></table><style>
.dni-code-hint {
    font-style: italic;
    overflow: hidden;
    white-space: nowrap;
}
.dni-treeview {
    white-space: nowrap;
}
.dni-treeview td {
    vertical-align: top;
    text-align: start;
}
details.dni-treeview {
    padding-left: 1em;
}
table td {
    text-align: start;
}
table tr { 
    vertical-align: top; 
    margin: 0em 0px;
}
table tr td pre 
{ 
    vertical-align: top !important; 
    margin: 0em 0px !important;
} 
table th {
    text-align: start;
}
</style>