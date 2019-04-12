### 编译型语言和解释型语言区别
- 不由传统意义上的是否需要编译决定
- 编译语言运行需要长时间准备，词法分析，优化， 解释性语言在运行后就很快执行




### 声明提升： (跟编译无关)
- 解释器的一种执行方式： 在执行任何语句之前，解释器就已经从运行上下文创建的作用域中找到变量的值了， 分配了内存空间，默认值`undefined`

### JIT （java，js的执行前编译机制)
- 这是对解释性语言的优化策略
    - 动态升级策略: 每一个函数首先都会在解释器上执行，当这个函数变得经常被执行（hot）时，TurboFan 会将其编译为高度优化的机器码执行



### JavaScriptCore
- [深入剖析 JavaScriptCore](https://www.jianshu.com/p/e220e1f34a0b) (很长还没看)

- 执行过程：（类似于JVM) 不同于5.9版本前的V8（没有字节码)
    - 源代码-→抽象语法树-→字节码-→JIT-→本地代码
- 不同于V8的激进，JScore是渐进式的对性能优化，例如加入多层JIT编译器（如：简单JIT编译器、DFG JIT编译器、LLVM等）优化性能

### V8

<img src="https://v8.dev/_img/ignition-interpreter/ignition-pipeline.png" />
图源: [Firing up the Ignition interpreter](https://v8.dev/blog/ignition-interpreter)   
注：Node 8.0中 V8 版本为 5.8  

- [基于V8引擎的代码优化方法](https://segmentfault.com/a/1190000011289535)
- TurboFan - 现存的编译管线  
    - 相比Liftoff编译启动过程过长


- v5.9 引入 `Ignition` 解释器 (取代了full-codegen + Crankshaft的模式)
    - 新的ignition + TurboFan模式
    - 引入解释器解决直接编译成机器码太占内存的问题
    - 大致流程就跟JVM，JavaScriptCore一样了
    - [V8 Ignition：JS 引擎与字节码的不解之缘](https://yq.aliyun.com/articles/77964)


- v6.9 引入`Liftoff` - WebAssembly `baseline` 编译管线(编译器)
    - 详见[Liftoff：V8 引擎中全新的 WebAssembly baseline 编译器](https://segmentfault.com/a/1190000016284865)


- v7.4 引入`JIT-less`模式
    - 纯解释器模式，用于一些限制访问内存的场景，例如ios，智能电视



### 各个引擎之间通用技术
根据下面关键子去查找，可以了解更多的相关的虚机技术。
- 源码到中间代码
    - Recusive-descent parser：递归下降式 parser
    - Operator precedence parser：运算符优先级 parser
    - Deferred parser：延迟 parser


- 中间代码到目标代码
    - Tiered compilation：多层编译
    - Background compilation：后台编译
    - Type feedback：类型反馈
    - Type specialization：类型特化
    - SSA-form IR：静态单赋值形式
