import RawCallbackFunction from "../types/Raw/RawCallbackFunction";

function callback(rawCallbackFunction : RawCallbackFunction, ...args : any[]) {
    /*
    callbackStack : 함수 호출이 완료되면 불러야 되는 콜백들을 쌓아둠, 콜백[]
    request : 현재 호출해야 되는 함수에 대한 정보, [함수, 인수[], 콜백임?]
    */
    const callbackStack : RawCallbackFunction[] = [];  //콜백들을 넣어둠
    let request : [Function, any[], Boolean?] = [rawCallbackFunction, args]; //현재 호출해야 되는 함수
    let lastGetRequested;
    function get(getF : RawCallbackFunction, ...getArgs : any[]) { //함수가 전체 영역에 선언된 이유 : 콜백에서도 같은 get을 이용해서 요청을 할 수 있어야 하기 때문
        //get 요청이 들어오면 할 일
        lastGetRequested = true;
        request = [getF, getArgs];
        return {
            and(cb : RawCallbackFunction) {
                callbackStack.push(cb);
            }
        };
    }

    while(true) {
        lastGetRequested = false;

        const returnedValue = request[0].apply(null, [
            ...(request[2] ? [] : [get]),
            ...request[1]
        ]); //콜백을 호출해야 한다면, 그땐 get 함수를 인자로 주지 않는다.

        if(!lastGetRequested) { //순수 함수값을 반환했다.
            if(!callbackStack.length) { //이번에 호출한 함수가 마지막이다.
                return returnedValue;
            } else { //아직 마지막은 아니다.
                request = [callbackStack.pop(), [returnedValue], true];
            }
        }
    }
}

export default callback;