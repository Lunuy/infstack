
import generator from "../generator";
import WrappedGeneratorFunction from "../../types/Wrapped/WrappedGeneratorFunction";
import WrapRawGeneratorFunction from "../../types/WrapRaw/WrapRawGeneratorFunction";
import GetRawGeneratorFunction from "../../types/Raw/Get/GetRawGeneratorFunction";
import RawGeneratorFunction from "../../types/Raw/RawGeneratorFunction";

function wrappedGenerator(rawGeneratorFunction : WrapRawGeneratorFunction) : WrappedGeneratorFunction {
    const fn = function(...args : any[]) {
        return generator(fn.raw, ...args);
    };
    fn.raw = function(get : GetRawGeneratorFunction, ...args : any[]) {
        return rawGeneratorFunction(function(f : WrappedGeneratorFunction, ...args){
            return get(f.raw, ...args);
        }, ...args);
    }

    return fn;
}


export default wrappedGenerator;