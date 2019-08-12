# Event-loop



####  setTimeout & setInterval 的机制

- setTimeout
    - <img src="https://images2015.cnblogs.com/blog/740839/201608/740839-20160815202409890-566459084.jpg" alt="">

- setInterval
    - <img src="https://images2015.cnblogs.com/blog/740839/201608/740839-20160815211436000-1289002683.jpg" alt="">
    - 看， 这里出现了两个问题
        - 跳过了605ms的第三次加入队列（因为队列里面已经有第二次， 机制会跳过这一次)
        - 第一次和第二次会连续执行，没有间隔了

图源：[深入理解定时器系列第一篇——理解setTimeout和setInterval](http://www.cnblogs.com/xiaohuochai/p/5773183.html)


### 宏任务(task) &  微任务(job)
[浏览器与node 的事件循环](https://juejin.im/post/5c337ae06fb9a049bc4cd218)


<img src="https://user-gold-cdn.xitu.io/2019/1/12/16841bad1cda741f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1" ></img>