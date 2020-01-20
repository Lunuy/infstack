
const infstack = require("../dist/index");
const { performance } = require('perf_hooks');

const wrapped_gen_factor = infstack.wrapped.generator(function*(get, n) {
    if(n === 1n) return 1n;
    return n * (yield get(wrapped_gen_factor, n - 1n));
});

const gen_factor = function(n){
    return infstack.generator(function* raw_factor(get, n) {
        if(n === 1n) return 1n;
        return n * (yield get(raw_factor, n - 1n));
    }, n);
};

const wrapped_cb_factor = infstack.wrapped.callback(function(get, n) {
    if(n === 1n) return 1n;
    get(wrapped_cb_factor, n - 1n).and(result => {
        return n * result;
    });
});

const cb_factor = function(n) {
    return infstack.callback(function raw_factor(get, n) {
        if(n === 1n) return 1n;
        get(raw_factor, n - 1n).and(result => {
            return n * result;
        });
    }, n)
};

const wrapped_as_factor = infstack.wrapped.async(async function(get, n) {
    if(n === 1n) return 1n;
    return n * (await get(wrapped_as_factor, n - 1n));
});

const as_factor = async function(n) {
    return await infstack.async(async function raw_factor(get, n) {
        if(n === 1n) return 1n;
        return n * (await get(raw_factor, n - 1n));
    }, n);
};

const factor = function(n) {
    if(n === 1n) return 1n;
    return n * factor(n - 1n);
}

const n = 500n;
const r = 10000;

(async () => {
    const times = {
        wrapped_gen:0,
        gen:0,
        wrapped_cb:0,
        cb:0,
        wrapped_as:0,
        as:0,
        normal:0
    };
    for(let i = 1; i <= r; i++) {
        const beforeTime = performance.now();
        wrapped_gen_factor(n);
        times.wrapped_gen += performance.now() - beforeTime;
    }
    for(let i = 1; i <= r; i++) {
        const beforeTime = performance.now();
        gen_factor(n);
        times.gen += performance.now() - beforeTime;
    }
    for(let i = 1; i <= r; i++) {
        const beforeTime = performance.now();
        wrapped_cb_factor(n);
        times.wrapped_cb += performance.now() - beforeTime;
    }
    for(let i = 1; i <= r; i++) {
        const beforeTime = performance.now();
        cb_factor(n);
        times.cb += performance.now() - beforeTime;
    }
    for(let i = 1; i <= r; i++) {
        const beforeTime = performance.now();
        await wrapped_as_factor(n);
        times.wrapped_as += performance.now() - beforeTime;
    }
    for(let i = 1; i <= r; i++) {
        const beforeTime = performance.now();
        await as_factor(n);
        times.as += performance.now() - beforeTime;
    }
    for(let i = 1; i <= r; i++) {
        const beforeTime = performance.now();
        factor(n);
        times.normal += performance.now() - beforeTime;
    }
    console.log(times);
})();