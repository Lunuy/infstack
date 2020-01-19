import RawGeneratorFunction from "../RawGeneratorFunction";
import ResultGetRawGeneratorFunction from "./Result/ResultGetRawGeneratorFunction";

interface GetRawGeneratorFunction {
    (rawGeneratorFunction : RawGeneratorFunction, ...args: any[]): ResultGetRawGeneratorFunction
};

export default GetRawGeneratorFunction;