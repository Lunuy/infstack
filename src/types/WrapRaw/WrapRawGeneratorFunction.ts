import GetWrapRawGeneratorFunction from "./Get/GetWrapRawGeneratorFunction";

interface WrapRawGeneratorFunction {
    (get : GetWrapRawGeneratorFunction, ...args: any[]): Generator
};

export default WrapRawGeneratorFunction;