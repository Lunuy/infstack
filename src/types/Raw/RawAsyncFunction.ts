
import GetRawAsyncFunction from "./Get/GetRawAsyncFunction";

interface RawAsyncFunction {
    (get : GetRawAsyncFunction, ...args: any[]): Promise<any>
};

export default RawAsyncFunction;