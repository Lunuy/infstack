
import WrapRawCallbackFunction from "../../types/WrapRaw/WrapRawCallbackFunction";
import WrappedCallbackFunction from "../../types/Wrapped/WrappedCallbackFunction";
import callback from "../callback";
import GetRawCallbackFunction from "../../types/Raw/Get/GetRawCallbackFunction";

function wrappedCallback(rawCallbackFunction : WrapRawCallbackFunction) : WrappedCallbackFunction {
    const fn = function(...args : any[]) {
        return callback(fn.raw, ...args);
    };
    fn.raw = function(get : GetRawCallbackFunction, ...args : any[]) {
        return rawCallbackFunction(function(f : WrappedCallbackFunction, ...args){
            return get(f.raw, ...args);
        }, ...args);
    }

    return fn;
}


export default wrappedCallback;