import GetRawCallbackFunction from "./Get/GetRawCallbackFunction";

interface RawCallbackFunction  {
    (get : GetRawCallbackFunction, ...args: any[]): any
};

export default RawCallbackFunction;