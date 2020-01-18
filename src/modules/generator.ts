
function generator(f : GeneratorFunction, ...args : any[]) {
    /*
    generatorStack : next를 호출할 generator들을 쌓아놓음, 제너레이터[]
    callbackValue : 현재 next를 호출할때 반환해줄 값
    */
    const generatorStack : Generator[] = [f.call(null, get, ...args)];  //콜백들을 넣어둠
    let callbackValue : any; //next 해서 반환해줄 값
    let lastGetRequested;
    function get(getF : GeneratorFunction, ...getArgs : any[]) {
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


/*
업데이트될 generator 유사 방식 :
yield 사용 가능 generator.(리얼 generator용 generator).

계산하다가 멈추고 계산하다가 멈추고 하면 될듯.
자체적인 next를 만들던지 그냥 얘 전체를 generator로 하던지.
*/