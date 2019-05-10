
function sleep (millisecond) {
        return new Promise(function (resovle, reject) {
            setTimeout(function () {
                resovle('wake');
            }, millisecond);
        });
    }

    async function run (node) {
        if (node > 10) {
            return;
        }
        let res = null;
 		console.log('start');
        await sleep(1200);
        console.log('end');

    }
run(0)
