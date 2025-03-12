---
title: STL剖析
tags: []
categories:
  - [未分类]
date: 2024-04-20T00:53:20.000Z
updated: 2024-10-14T13:55:29.925Z
comments: false

---

<!--more-->
## STL的六大组件

1. Container
2. algorithm
3. iterator
4. funtion(仿函数)
5. adapters
6. allocator

## allocator(空间配置器)

STL的容器都需要空间来存放资料，而allocator就是用来进行空间配置的

其中必不可少的接口如下

```C++
allocator::value type
allocator::pointer
allocator::const_pointer
allocator::reference
allocator::const_reference
allocator::size_type
allocator::difference_type
allocator::rebind //嵌套的模板（另一个类型U）结构体,拥有唯一成员other 例如template<typename U> struct rebind { typedef allocator<U> other; }


allocator::allocator()
allocator::~allocator()
template <class T1> allocator::allocator(const allocator<T1>&)

pointer allocator::address(reference x) const
pointer allocator::adress(const_reference x) const

pointer allocator::allocate(const allocator&)
void allocator::deallocate(pointer p, size_type n)

void allocator::construct(pointer p,const T& x)
void allocator::destroy(pointer p)
```

例如标准库中的`allocator`

```C++
/**
   * @brief  The @a standard allocator, as per [20.4].
   *
   *  See https://gcc.gnu.org/onlinedocs/libstdc++/manual/memory.html#std.util.memory.allocator
   *  for further details.
   *
   *  @tparam  _Tp  Type of allocated object.
   */
  template<typename _Tp>
    class allocator : public __allocator_base<_Tp>
    {
    public:
      typedef _Tp        value_type;
      typedef size_t     size_type;
      typedef ptrdiff_t  difference_type;
#if __cplusplus <= 201703L
      typedef _Tp*       pointer;
      typedef const _Tp* const_pointer;
      typedef _Tp&       reference;
      typedef const _Tp& const_reference;

      template<typename _Tp1>
 struct rebind
 { typedef allocator<_Tp1> other; };
#endif

#if __cplusplus >= 201103L
      // _GLIBCXX_RESOLVE_LIB_DEFECTS
      // 2103. std::allocator propagate_on_container_move_assignment
      typedef true_type propagate_on_container_move_assignment;

      typedef true_type is_always_equal;
#endif

      // _GLIBCXX_RESOLVE_LIB_DEFECTS
      // 3035. std::allocator's constructors should be constexpr
      _GLIBCXX20_CONSTEXPR
      allocator() _GLIBCXX_NOTHROW { }

      _GLIBCXX20_CONSTEXPR
      allocator(const allocator& __a) _GLIBCXX_NOTHROW
      : __allocator_base<_Tp>(__a) { }

#if __cplusplus >= 201103L
      // Avoid implicit deprecation.
      allocator& operator=(const allocator&) = default;
#endif

      template<typename _Tp1>
 _GLIBCXX20_CONSTEXPR
 allocator(const allocator<_Tp1>&) _GLIBCXX_NOTHROW { }

#if __cpp_constexpr_dynamic_alloc
      constexpr
#endif
      ~allocator() _GLIBCXX_NOTHROW { }

#if __cplusplus > 201703L
      [[nodiscard,__gnu__::__always_inline__]]
      constexpr _Tp*
      allocate(size_t __n)
      {
#ifdef __cpp_lib_is_constant_evaluated
 if (std::is_constant_evaluated())
   return static_cast<_Tp*>(::operator new(__n * sizeof(_Tp)));
#endif
 return __allocator_base<_Tp>::allocate(__n, 0);
      }

      [[__gnu__::__always_inline__]]
      constexpr void
      deallocate(_Tp* __p, size_t __n)
      {
#ifdef __cpp_lib_is_constant_evaluated
 if (std::is_constant_evaluated())
   {
     ::operator delete(__p);
     return;
   }
#endif
   __allocator_base<_Tp>::deallocate(__p, __n);
      }
#endif // C++20

      friend _GLIBCXX20_CONSTEXPR bool
      operator==(const allocator&, const allocator&) _GLIBCXX_NOTHROW
      { return true; }

#if __cpp_impl_three_way_comparison < 201907L
      friend _GLIBCXX20_CONSTEXPR bool
      operator!=(const allocator&, const allocator&) _GLIBCXX_NOTHROW
      { return false; }
#endif

      // Inherit everything else.
    };
```