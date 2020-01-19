import RawAsyncFunction from "../Raw/RawAsyncFunction";

interface WrappedAsyncFunction {
    (...args : any[]) : Promise<any>
    raw: RawAsyncFunction
}

export default WrappedAsyncFunction;