
import async from "../async";
import WrapRawAsyncFunction from "../../types/WrapRaw/WrapRawAsyncFunction";
import WrappedAsyncFunction from "../../types/Wrapped/WrappedAsyncFunction";
import GetRawAsyncFunction from "../../types/Raw/Get/GetRawAsyncFunction";

function wrappedAsync(rawAsyncFunction : WrapRawAsyncFunction) : WrappedAsyncFunction {
    const fn = function(...args : any[]) {
        return async(fn.raw, ...args);
    };
    fn.raw = function(get : GetRawAsyncFunction, ...args : any[]) {
        return rawAsyncFunction(function(f : WrappedAsyncFunction, ...args){
            return get(f.raw, ...args);
        }, ...args);
    }

    return fn;
}


export default wrappedAsync;