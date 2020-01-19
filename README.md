Infstack
=================

# Infstack
Infstack makes javascript be able to use infinite call stack and recursive function.
It works exactly the same as a function in JS,
that means it supports to use impure function.   
   
⚠️ Caution for very heavy function : If javascript engine doesn't have enough memory, it can throw error.

## Install
```bash
npm install infstack
```
```js
const infstack = require("infstack");
```


## Methods
There are several ways to use infinite call stack :
### Generator
Request a function call, and pause code until the function returns using "yield" keyword of generator function.
Good performance, recommended for general functions.
### Callback
Request a function call, and get returned value with callback. Best performance, but hard to code complex code.
### Async
Request a function call, and pause code until the function returns using "await" keyword of async function.
Bad performance, high memory usage, but this is not big problem because it is used to execute async function.


## Usage

### Generator
#### infstack.generator(rawGeneratorFunction, ...args)
This function executes rawGeneratorFunction with args and return result value.
#### RawGeneratorFunction, function*(get, ...args) => {}
RawGeneratorFunction is a GeneratorFunction like this :
```js
// This function return sum from 1 to n.
function* raw_sum(get, n) {
    if(n === 1) {
        return 1;
    }
    return n + (yield get(raw_sum, n - 1));
}
```
##### yield get(rawGeneratorFunction, ...args)
This code executes rawGeneratorFunction with args and return result value.
You must use this code when you want to call rawGeneratorFunction(self or other).
#### Cautions
You can't use rawGeneratorFunction as GeneratorFunction, don't use yield keyword except when use "yield get(...)" code.

### Callback
#### infstack.callback(rawCallbackFunction, ...args)
This function excutes rawCallbackFunction with args and return result value.
#### RawCallbackFunction, function(get, ...args) => {}
RawCallbackFunction is a Function like this :
```js
// This function return sum from 1 to n.
function* raw_sum(get, n) {
    if(n === 1) {
        return 1;
    }
    get(raw_sum, n - 1).and(result => {
        return n + result;
    });
}
```
##### get(rawCallbackFunction, ...args)
This function executes rawCallbackFunction with args.
You must use this function when you want to call rawCallbackFunction(self or other).
###### .and(callback)
This function executes callback with result value of called rawCallbackFunction.
#### Cautions
You can't use rawCallbackFunction like async function.

### Async
#### infstack.async(rawAsyncFunction, ...args)
This function excutes rawAsyncFunction with args and return result value. (async)
#### RawAsyncFunction, async function(get, ...args) => {}
RawAsyncFunction is a AsyncFunction like this :
```js
// This function return sum from 1 to n.
async function raw_sum(get, n) {
    if(n === 1) {
        return 1;
    }
    return n + (await get(result, n - 1));
}
```
##### await get(rawAsyncFunction, ...args)
This code executes rawAsyncFunction with args and return result value.
You must use this code when you want to call rawAsyncFunction(self or other).
#### Comment
You can use rawAsyncFunction as AsyncFunction, you can use await keyword.

### Wrap
You can use wrapped functions for your convenience.
```js
const sum = infstack.wrapped.generator(function*(get, n) {
    if(n === 1n) return 1n;
    return n + (yield get(sum, n - 1n));
});
console.log(sum(1000000n));
```

## Example
```js
const infstack = require("infstack");

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
```

