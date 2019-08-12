

setImmediate(() => {
    console.log('setImmediate1')
})

process.nextTick(() => {
    console.log('nextTick1')
});


process.nextTick(() => {
    console.log('nextTick2')
})


setImmediate(() => {
    console.log('setImmediate2')
    process.nextTick(() => {
        console.log('nextTick3')
    });
})



setImmediate(() => {
    console.log('setImmediate3')
})

process.nextTick(() => {
    console.log('nextTick4')
});


// ------
function test() {
    console.log('start')
console.log('start')
setTimeout(() => {
    console.log('timer1')
    Promise.resolve().then(function () {
        console.log('promise1')
    })
}, 0)
setTimeout(() => {
    console.log('timer2')
    Promise.resolve().then(function () {
        console.log('promise2')
    })
}, 0)
Promise.resolve().then(function () {
    console.log('promise3')
})
console.log('end')


test()