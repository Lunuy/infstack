
import WrappedGeneratorFunction from "../../Wrapped/WrappedGeneratorFunction";
import ResultGetRawGeneratorFunction from "../../Raw/Get/Result/ResultGetRawGeneratorFunction";

interface GetWrapRawGeneratorFunction {
    (rawGeneratorFunction : WrappedGeneratorFunction, ...args: any[]): ResultGetRawGeneratorFunction
};

export default GetWrapRawGeneratorFunction;