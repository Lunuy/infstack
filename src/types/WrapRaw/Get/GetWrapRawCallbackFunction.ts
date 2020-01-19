import WrappedCallbackFunction from "../../Wrapped/WrappedCallbackFunction";
import ResultGetRawCallbackFunction from "../../Raw/Get/Result/ResultGetRawCallbackFunction";

interface GetWrapRawCallbackFunction {
    (rawCallbackFunction : WrappedCallbackFunction, ...args: any[]): ResultGetRawCallbackFunction
};

export default GetWrapRawCallbackFunction;