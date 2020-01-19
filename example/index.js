
// (Actually, you shouldn't write functions like the code in this file. It's just example.)
/*
# All infstack functions
Infinite call stack!
Support multiple arguments.
It works exactly the same as a function in JS.(Support to use impure function)
Multiple raw functions can run in same call stack layer. (Raw functions of the same type are compatible each other.)
    infstack.~ => function       => get
               => other function => get
                  ...
               => return value
*/

const infstack = require("../dist/index.js");

(async () => {
    /*
    # Generator
    ⚠️ Don't use "yield" keyword except when use get function. It doesn't support yield.
    */
    function* generator_raw_fibo_1(get, n) {
        console.log(`1${" ".repeat(n)}${n}`); //To show it works like normal function
        if(n <= 2) {
            return 1;
        } else {
            return ((yield get(generator_raw_fibo_2, n-1)) + (yield get(generator_raw_fibo_2, n-2)));
        }
    }
    function* generator_raw_fibo_2(get, n) {
        console.log(`2${" ".repeat(n)}${n}`);
        if(n <= 2) {
            return 1;
        } else {
            return ((yield get(generator_raw_fibo_1, n-1)) + (yield get(generator_raw_fibo_1, n-2)));
        }
    }
    //Wrap raw function! (To look better)
    function generator_fibo(n) {
        return infstack.generator(generator_raw_fibo_1, n);
    }
    console.log("---generator---");
    console.log(`result : ${generator_fibo(5)}`);
    

    /*
    # Callback
    ⚠️ It looks like that it supports async code, but it doesn't.
    ⚠️ If you want to use async code, use infstack.async instead.
    */
    function callback_raw_gcd(get, a, b) {
        console.log(`${a} ${b}`);
        const r = a % b;
        if(r) {
            get(callback_raw_gcd, b, r).and(result => {
                return result;
            });
        } else {
            return b;
        }
    }
    function callback_gcd(a, b) {
        return infstack.callback(callback_raw_gcd, a, b);
    }
    console.log("---callback---");
    console.log(`result : ${callback_gcd(24, 42)}`);


    /*
    # Async
    Support async!
    */
    async function async_raw_lazyFactor(get, n) {
        console.log("start", n);
        if((n % 3n) === 0n) { await new Promise(solve => setTimeout(solve, 200)); }
        if(n === 1n) {
            return 1n;
        }
        const beforeN = await get(async_raw_lazyFactor, n - 1n);
        if((n % 5n) === 0n) { await new Promise(solve => setTimeout(solve, 200)); }
        console.log("end", n);
        return n * beforeN;
    }
    async function async_lazyFactor(n) {
        return (await infstack.async(async_raw_lazyFactor, n));
    }
    console.log("---async---");
    console.log(`result : ${await async_lazyFactor(15n)}`);

    
    /*
    # Infinite call stack!
    ⚠️ If javascript engine doesn't have enough memory, infstack can throw error.
    */
    console.log("---Infinite call stack test---");
    function normal_sum(n) {
        if(n === 1n) return 1n;
        return n + normal_sum(n - 1n);
    }
    function generator_sum(n) {
        return infstack.generator(function* generator_raw_sum(get, n) {
            if(n === 1n) return 1n;
            return n + (yield get(generator_raw_sum, n - 1n));
        }, n);
    }
    function callback_sum(n) {
        return infstack.callback(function callback_raw_sum(get, n) {
            if(n === 1n) return 1n;
            get(callback_raw_sum, n - 1n).and(result => {
                return n + result;
            });
        }, n);
    }
    async function async_sum(n) {
        return await infstack.async(async function async_raw_sum(get, n) {
            if(n === 1n) return 1n;
            return n + (await get(async_raw_sum, n - 1n));
        }, n);
    }
    try {
        console.log(`* js function : ${normal_sum(1000000n)}`);
    } catch(e) {
        console.log(`* js function : ${e}`);
    }
    console.log(`generator : ${generator_sum(1000000n)}`);
    console.log(`callback  : ${callback_sum(1000000n)}`);
    console.log(`async     : ${await async_sum(1000000n)}`);
})();