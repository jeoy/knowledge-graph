
# JWT（JSON WEB TOKEN）

<img src="https://images2017.cnblogs.com/blog/1147658/201711/1147658-20171118202151718-1630139158.png">

## session 方案的问题
- 服务器开销
- 扩展性，负载均衡影响
- 不能防止CSRF攻击

## 优点
- 单点登录
- 前后端分离
- 兼容（相对于cookie不能跨域） 

## 构成
- header
- payloader
- signature (服务器加入自己的salt，用于之后请求验证，保证token不会被篡改)
