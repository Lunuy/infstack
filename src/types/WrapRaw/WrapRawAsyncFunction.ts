import GetWrapRawAsyncFunction from "./Get/GetWrapRawAsyncFunction";

interface WrapRawAsyncFunction {
    (get : GetWrapRawAsyncFunction, ...args: any[]): Promise<any>
};

export default WrapRawAsyncFunction;