import WrappedAsyncFunction from "../../Wrapped/WrappedAsyncFunction";
import ResultGetRawAsyncFunction from "../../Raw/Get/Result/ResultGetRawAsyncFunction";

interface GetWrapRawAsyncFunction {
    (rawAsyncFunction : WrappedAsyncFunction, ...args: any[]): ResultGetRawAsyncFunction
};

export default GetWrapRawAsyncFunction;