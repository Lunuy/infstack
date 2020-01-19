
import RawGeneratorFunction from "../Raw/RawGeneratorFunction";

interface WrappedGeneratorFunction {
    (...args : any[]) : any
    raw: RawGeneratorFunction
}

export default WrappedGeneratorFunction;