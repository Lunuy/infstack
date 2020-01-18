const infstack = require("../dist/");

function normal_sum(n) {
    if(n === 1n) return 1n;
    return n + normal_sum(n - 1n);
}

//Generator (Sync)
function* generator_raw_sum(get, n) {
    if(n === 1n) return 1n;
    return n + (yield get(generator_raw_sum, n - 1n));
}
function generator_sum(n) {
    return infstack.generator(generator_raw_sum, n);
}

//Callback (Sync)
function callback_raw_sum(get, n) {
    if(n === 1n) return 1n;
    get(callback_raw_sum, n - 1n).and(result => {
        return n + result;
    });
}
function callback_sum(n) {
    return infstack.callback(callback_raw_sum, n);
}

//Async (Async)
async function async_raw_sum(get, n) {
    if(n === 1n) return 1n;
    return n + (await get(async_raw_sum, n - 1n));
}
async function async_sum(n) {
    return await infstack.async(async_raw_sum, n);
}

//3 results all : 500000500000
console.log(generator_sum(1000000n));
console.log(callback_sum(1000000n));
(async () => {
    console.log(await async_sum(1000000n));
})();