---
title: Shangri-La of CPP - Template Metaprogramming(TMP)
date: 2025-05-20
tags:
- "CPP"
- "template"
- "metaprogramming"
categories:
- "program"
---

C++程序员生活在两个世界里, 区别在于是否使用`template metaprogramming`(TMP).

C++ programmers live in two worlds, which are different depending on whether they use `template metaprogramming`(TMP) or not.

一个世界是几乎不使用TMP, 另一个世界几乎用TMP完成95%的代码.

In one world, programmers almost never use TMP. In the other world, programmers use TMP for about 95% of their code.

这篇文章是写给第一个世界C++程序员的TMP使用技术简介.

This article is a short introduction to TMP for C++ programmers in the first world (who do not use TMP often).

我们先使用TMP实现一个简单的程序, 你可以思考下如果不使用TMP应该如何实现.

Let's start with a simple example using TMP. You can think about how you would write it without TMP.

然后我会讨论TMP实现的优势, 以及使用到的编程范式.

After that, I will talk about the benefits of TMP and the programming concept it uses.

## A simple TMP Example

1. 给数组增加`sum()`成员函数, 而且只有当数组存储的类型可以add时才输出结果

    Add a `sum()` member function to an array class, and only return the sum() result when the stored type can be added.
2. 支持通过不同的`allocator`获取内存.

    Support getting memory by different `allocators`.

```cpp
    #include <type_traits>
    #include <iostream>
    // --------- Traits: check if type T is addable ---------
    template<typename, typename = void>
    struct is_addable : std::false_type {
    };

    template<typename T>
    struct is_addable<T, std::void_t<decltype(std::declval<T>() + std::declval<T>())> >
            : std::true_type {
    };

    // --------- Policy: different allocator strategy ---------
    template<typename T>
    struct DefaultAllocator {
        T *allocate(size_t n) { return new T[n]; }
        void deallocate(T *ptr) { delete[] ptr; }
    };

    template<typename T>
    struct LoggingAllocator {
        T *allocate(size_t n) {
            std::cout << "Allocating " << n << " elements\n";
            return new T[n];
        }

        void deallocate(T *ptr) {
            std::cout << "Deallocating\n";
            delete[] ptr;
        }
    };

    // --------- CRTP: provide sum() function for derived classes ---------
    template<typename Derived, typename T>
    class Summable {
    public:
        // --------- SFINAE: enable sum() only when T is addable ---------
        template<typename U = T>
        auto sum() const
            -> std::enable_if_t<is_addable<U>::value, U> {

            const auto &d = static_cast<const Derived &>(*this);
            U result = U();
            for (size_t i = 0; i < d.size(); ++i) {
                result = result + d[i];
            }
            return result;
        }
    };

    // --------- host class ---------
    template<
        typename T,
        template<class> class AllocPolicy = DefaultAllocator
    >
    class MyVector : public Summable<MyVector<T, AllocPolicy>, T> {
    private:
        size_t n_;
        T *data_;
        AllocPolicy<T> allocator_;

    public:
        MyVector(size_t n)
            : n_(n), data_(allocator_.allocate(n)) {
        }

        ~MyVector() {
            allocator_.deallocate(data_);
        }

        T &operator[](size_t i) { return data_[i]; }
        const T &operator[](size_t i) const { return data_[i]; }
        size_t size() const { return n_; }
    };

    int main() {
        MyVector<int, LoggingAllocator> v(3);
        v[0] = 1;
        v[1] = 2;
        v[2] = 3;
        // SFINAE control MyVector<T> have member function sum() only when T is addable
        std::cout << "Sum of int: " << v.sum() << std::endl;
        // OUTPUT: Sum of int: 6

        MyVector<std::string, LoggingAllocator> vs(2);
        vs[0] = "hello, ";
        vs[1] = "world";
        std::cout << "Sum of string: " << vs.sum() << std::endl;
        // OUTPUT: Sum of string: hello, world

        struct NotAddable { };
        MyVector<NotAddable> nv(2);
        // nv.sum(); // Compiler error, because NotAddable can not add.
    }
```

## Why we use TMP

除了template本身的一些特性之外, 这里使用TMP的最主要原因就是: `为了代码运行速度更快`.

Besides some features of template, the main reason for using TMP here is: `to make your code run faster`.

速度更快的原因如下:

The speed advantage exists because:

1. 所有的type, function call在编译时就已经确认了, 没有virtual table

    All types and function calls are decided at compile time, so there is no virtual table.
2. 编译器有足够的context可以进行性能优化

    The compiler has enough context to optimize performance.

## The typical concept used in TMP

在上边的例子里, 使用的4个概念涵盖了大部分TMP的使用方法, 他们是 Traits/Policy/CRTP/SFINAE

In the example above, 4 important concepts cover most TMP use cases. They are: Traits, Policy, CRTP, and SFINAE.

1. `Traits`: 提供static value表示T的一些特性

    `Traits`: Provide static values that describe properties of type T.
2. `Policy`: 提供API的多种实现

    `Policy`: Offer different ways (APIs) to do a task.
3. `CRTP`: 不用Virtual table也能实现多态

    `CRTP`: Allow polymorphism without a virtual table.
4. `SFINAE`: 实现根据 T 生成不同的function

    `SFINAE`: Create different functions depending on the type T.

In the end. Good luck with your adventure into the world of C++ Template Metaprogramming!  ;D
