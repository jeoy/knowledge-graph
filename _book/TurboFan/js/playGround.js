
//实现一个函数，每隔wait秒执行func，一共执行times次

let obj = {
    a: 123,
    say(bbb, a) {
        console.log(this.a, bbb, a);
    }
}
let obj2 = {
    a: 456
}
// obj.say.apply(obj2, [9955]);

Function.prototype._apply = function() {
    let fn = this;
    let _this = arguments[0];
    let args = arguments[1]
    return fn.bind(_this)(...args);
}

// obj.say._apply(obj2, [9955]);

obj.say.bind(obj2, 222)(5555);

Function.prototype._bind = function() {
    let fn = this;
    let _this = arguments[0];
    let args = [].slice.apply(arguments, [1]);
    return (n) => {
        fn.apply(_this, args.concat(n));
    }
}

obj.say._bind(obj2, 222)(5555);
