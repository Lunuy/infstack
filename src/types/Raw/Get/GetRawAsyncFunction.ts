import RawAsyncFunction from "../RawAsyncFunction";
import ResultGetRawAsyncFunction from "./Result/ResultGetRawAsyncFunction";

interface GetRawAsyncFunction {
    (rawAsyncFunction : RawAsyncFunction, ...args: any[]): ResultGetRawAsyncFunction
};

export default GetRawAsyncFunction;