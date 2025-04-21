---
title: Think Programming - Insights from My Coding Journey
date: 2025-02-04
tags:
- "program"
- "think"
categories:
- "program"
---

> Note: The main content is first written in Chinese, with the English translation (by AI) following below.

## Chinese Version

我编写商业软件到现在有10年的时间.

使用过的编程语言(按掌握程度排序): C/C++, Python, Python(machine learn), F#, Golang, Scala, Clojure, JavaScript 

使用过的编程范式: Object-Oriented (OO), Functional Programming (FP)

实现过的软件项目: 低延迟TCP/UDP Server side Framework, 高并发订单系统, 利用machine learning实现的高性能预测系统等等

我计划在这篇文章里记录一下我对编程的一些思考, 而且这些想法随着我解决更复杂问题, 积累更多的经验后也会有些变化, 因此我会不断更新这篇文章.

### 1. 自顶向下编程

有两种编程理念, 一种是自底向上, 一种是自顶向下.

`自低向上`: 先实现很多小的函数, 然后使用这些小函数组成很复杂的功能. 在很多讲lisp的书里, 经常会讲如何实践自底向上的编程思想.

`自顶向下`: 从使用者的角度, 先写完框架/函数API, 最后才是具体代码实现.

我赞同`使用很多小的函数组成很复杂的功能`这个编程思路, 但是在我的编程实践里, 我认为自顶向下才更容易写出高质量的代码.

举个例子:
假如我们要写一个网站,用来展示在不同的网站上,同一款汽车的最新销售信息, 方便用户选择最优的网站去购买汽车

如果使用`自底向上`的思路, 我们会依次实现这些代码
1. 设计数据结构
2. 去不同网站拉取数据的的代码
3. 实现数据CRUD的代码
4. 实现前端与后端数据交互的api
5. 前端代码

但是如果使用`自顶向下`的思路, 我们会先写/画出框架, 然后依据框架给出API, 并不需要立刻实现具体代码逻辑.

1. 先画出大概的网页布局, 确定需要展示什么数据, 如何展示
2. 写出前端基本页面, 假设后端已经可以提供相应数据
```python
    for exg in [exgA, exgB, exgC]:
            car_infos = reqest_backend(exg, car_ids)
            // display car_info of the [exg, car_id] in html

```
3. 后端根据前端的需要提供API接口, 不需要实现代码逻辑, 假设已经可以取到数据
```python
    def request_car_info(exg:str, car_ids:List[str]) -> List[CarInfo]:
        if exg == "exg_A":
            return [exg_A.get_car_info(car) for car in car_ids] 
        elif exg == "exg_B":
            return [exg_B.get_car_info(car) for car in car_ids]
        else :
            return []
        
    class ExgA:
        self.get_car_info (car_id:str) -> CarInfo:
            pass // 在这个阶段并不需要实现函数逻辑, 可以给出Mock data

    class ExgB:
        self.get_car_info (car_id:str) -> CarInfo:
        pass
            

```
4. 让前后端跑起来, 让使用者看看是不是他们想要的结果, 依据反馈来决定是否要更改页面, 重复1-4的循环, 直到实现最小可交付的版本, 此时大部分api应该都只是返回Mock data, 并没有真正实现. 

5. 分别实现1-4中需要的函数, 在实现每一个函数的过程中仍然可是进一步采用自顶向下的方式完成, 先实现Sub-API函数接口, 接口和数据结构清晰之后再实现具体逻辑.

以上就是一个典型的自顶向下实现一个软件工程的例子, 在每个阶段里, 我都会尽量从使用者的角度出发, 只想我需要什么功能, 由哪些函数来提供这些功能, 函数接口应该是什么, 并不需要这些函数想如何实现, 我只是假设未来的我有足够的能力实现它, 先关注当下.

通过这种方式实现的代码, 不仅从使用者的角度来看逻辑非常流畅, 其他 Developer 在维护代码时候也不会因为上下文增加心智负担, 因为在每一个代码逻辑层面抽象水平都是一致的, 都是是使用了一些函数提供的功能组合成了一个更高级的功能.

这就是我推荐的`自顶向下编程`方法

### 2. OO VS FP

接下来我想讨论一下 OO 和 FP. 先说结论:

> 只使用任何一个都不能写出能快速交付, 同时又容易维护的代码工程. 
> 
> 我们需要结合这两种编程模式的优点, 谨慎使用这些思想工具, 尤其是OO, 如果过度使用OO的一些编程思想, 例如: 继承, 代码会很快变得难以理解和维护.

未完待续...


## English version

I have been developing commercial software for 10 years.

Programming languages I have used (in order of proficiency):
C/C++, Python, Python (machine learning), F#, Golang, Scala, Clojure, JavaScript

Programming paradigms I have experience with:
Object-Oriented (OO), Functional Programming (FP)

Software projects I have built:
low-latency TCP/UDP server-side framework, high-concurrency order system, high-performance prediction system using machine learning, and more.

In this article, I want to share some of my thoughts about programming. These ideas may change as I solve more complex problems and gain more experience, so I will keep updating this article over time.

### 1. Top-Down Programming

There are two main programming approaches: bottom-up and top-down.

`Bottom-up`: This means you implement many small functions first, and then combine them to create more complex features. Many books about Lisp focus on bottom-up programming.

`Top-down`: You start from the user’s point of view. First, you write the framework or function APIs, and only implement the detailed logic at the end.

I agree that `using many small functions to build complicated features` is a good idea. But in my own experience, top-down programming helps me write higher quality code more easily.

Let me give an example:

Suppose we want to build a website to show the latest sales information for a particular car from different online platforms, making it easier for users to compare and choose the best website to buy from.

If we use the `bottom-up approach`, we might:
1. Design the data structures
2. Write code to fetch data from each website
3. Implement CRUD (Create, Read, Update, Delete) functions for the data
4. Create APIs for communication between the frontend and backend
5. Write the frontend code

But with the `top-down` approach, we might:

1. First sketch out the main webpage layout, decide what data to show, and how to present it.
2. Write basic frontend pages, assuming the backend is already able to provide the needed data
```python
    for exg in [exgA, exgB, exgC]:
        car_infos = request_backend(exg, car_ids)
        // display car_info of the [exg, car_id] in html
```
3. For the backend, provide APIs according to what the frontend needs. We don’t need to implement the logic yet—just assume the data is available.
```python
    def request_car_info(exg: str, car_ids: List[str]) -> List[CarInfo]:
        if exg == "exg_A":
            return [exg_A.get_car_info(car) for car in car_ids]
        elif exg == "exg_B":
            return [exg_B.get_car_info(car) for car in car_ids]
        else:
            return []

    class ExgA:
        def get_car_info(self, car_id: str) -> CarInfo:
            pass  # at this stage, just use mock data

    class ExgB:
        def get_car_info(self, car_id: str) -> CarInfo:
            pass
```
    
4. Make the frontend and backend run together. Let the users try it and see if it fits their needs. Adjust according to feedback. Repeat steps 1-4 until a basic version is ready. Most APIs at this stage just return mock data and don’t have real implementations yet.

5. Then implement each function required by steps 1-4. You can still use the top-down way within each function: first design the sub-APIs and data structures, then fill in the logic after the interfaces are clear.

This is a typical top-down software engineering example. At each stage, I always try to think from the user’s point of view: What features do I need? Which functions should provide them? What should these APIs look like? I do not worry about how to implement each function yet. I just assume I can do it later and focus on the current step.

Code written this way flows naturally from the user's perspective. Other developers who maintain the code will not feel confused or have to keep a lot of context in mind, because each level of code has a consistent level of abstraction - it's always about combining functions to create higher-level features.

This is why I recommend the `top-down programming` method.

### 2. OO VS FP

Now I want to talk briefly about Object-Oriented (OO) and Functional Programming (FP). My conclusion is: 

> using either approach alone won't help you write code that's both quick to deliver and easy to maintain.
> 
> We need to combine the best of both worlds and use these ideas carefully. This is especially true for OO - overusing OO concepts (for example: inheritance) can quickly make code hard to understand and maintain.

To be continued…