
import ResultGetRawCallbackFunction from "./Result/ResultGetRawCallbackFunction";
import RawCallbackFunction from "../RawCallbackFunction";

interface GetRawCallbackFunction {
    (rawCallbackFunction : RawCallbackFunction, ...args: any[]): ResultGetRawCallbackFunction
};

export default GetRawCallbackFunction;