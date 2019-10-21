[source](https://github.com/mcuking/JSBridge#loadurl)

### native 调用 Js
- loadUrl
- evaluate Javascript


### js调用native
**上下文(api)注入**
    - 将一个实力对象通过webview提供的方法注入到js全局上下文，供js调用。
    - addJavascriptInterface(android)， JSContext, scriptMessageHandler (IOS)

```java
// 将 NativeMethods 类下面的提供给 js 的方法转换成 hashMap
JSBridge.register("JSBridge", NativeMethods.class);
// 将 JSBridge 的实例对象注入到 js 全局上下文中，名字为 _jsbridge，该实例对象下有 call 方法
mWebView.addJavascriptInterface(new JSBridge(mWebView), "_jsbridge");
```

```javascript
  if (window._jsbridge) {
    window._jsbridge.call(method, JSON.stringify(args));
  }
```

**拦截url Scheme**
> "jsbridge://methodName?{"data": arg, "cbName": cbName}"
**拦截 prompt alert confirm**

```javascript
function callNative(methodName, arg, cb) {
    ...
    const url = 'jsbridge://' + method + '?' + JSON.stringify(args);
    prompt(url);
}
```