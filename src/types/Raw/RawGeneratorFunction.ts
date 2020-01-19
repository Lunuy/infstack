import GetRawGeneratorFunction from "./Get/GetRawGeneratorFunction";

interface RawGeneratorFunction {
    (get : GetRawGeneratorFunction, ...args: any[]): Generator
};

export default RawGeneratorFunction;