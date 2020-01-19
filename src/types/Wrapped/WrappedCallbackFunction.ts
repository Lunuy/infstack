
import RawCallbackFunction from "../Raw/RawCallbackFunction";

interface WrappedCallbackFunction {
    (...args : any[]) : any
    raw: RawCallbackFunction
}

export default WrappedCallbackFunction;