import RawGeneratorFunction from "../types/Raw/RawGeneratorFunction";
import GetRawGeneratorFunction from "../types/Raw/Get/GetRawGeneratorFunction";

function generator(rawGeneratorFunction : RawGeneratorFunction, ...args : any[]) {
    /*
    generatorStack : next를 호출할 generator들을 쌓아놓음, 제너레이터[]
    callbackValue : 현재 next를 호출할때 반환해줄 값
    */
    const generatorStack : Generator[] = [rawGeneratorFunction.call(null, get, ...args)];  //콜백들을 넣어둠
    let callbackValue : any; //next 해서 반환해줄 값
    let lastGetRequested;
    function get(getF : RawGeneratorFunction, ...getArgs : any[]) {
        lastGetRequested = true;
        generatorStack.push(getF.call(null, get, ...getArgs));
    }


    while(true) {
        lastGetRequested = false;

        const lastGenerator = generatorStack[generatorStack.length-1];
        const returnedObj = lastGenerator.next(callbackValue);

        if(!lastGetRequested) { //순수 함수값을 반환했다.
            generatorStack.pop(); //그렇다면 generator는 종료됬으니 제거
            if(!generatorStack.length) { //이번에 호출한 함수가 마지막이다.
                return returnedObj.value;
            } else { //아직 마지막은 아니다.
                callbackValue = returnedObj.value;
            }
        }
    }
}

export default generator;