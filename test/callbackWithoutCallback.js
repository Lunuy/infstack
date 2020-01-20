
const infstack = require("../dist/index");

const a = infstack.wrapped.callback(function(get, n) {
    get(b, n).and(result => {
        return result;
    });
});

const b = infstack.wrapped.callback(function(get, n) {
    get(c, n);
});

const c = infstack.wrapped.callback(function(get, n) {
    return n + 3;
});

(() => {
    console.log(a(3)); //undefined
})();