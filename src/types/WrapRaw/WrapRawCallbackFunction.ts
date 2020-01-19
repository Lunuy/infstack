import GetWrapRawCallbackFunction from "./Get/GetWrapRawCallbackFunction";

interface WrapRawCallbackFunction {
    (get : GetWrapRawCallbackFunction, ...args: any[]): any
};

export default WrapRawCallbackFunction;