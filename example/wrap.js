
const infstack = require("../dist/index").wrapped;

const gen_factor = infstack.generator(function*(get, n) {
    if(n === 1n) return 1n;
    return n * (yield get(gen_factor, n - 1n));
});

const cb_factor = infstack.callback(function(get, n) {
    if(n === 1n) return 1n;
    get(cb_factor, n - 1n).and(result => {
        return n * result;
    });
});

const as_factor = infstack.async(async function(get, n) {
    if(n === 1n) return 1n;
    return n * (await get(as_factor, n - 1n));
});

(async () => {
    console.log(gen_factor(80000n));
    console.log(cb_factor(80000n));
    console.log(await as_factor(80000n));
})();