
type AsyncFunction = ((...args : any[]) => Promise<any>);
type RawAsyncFunction = AsyncFunction

async function async(f : RawAsyncFunction, ...args : any[]) {

    /*
    promiseStack : async function들을 호출한 후 받은 Promise들을 쌓아둠, 프로미스[]
    solveStack : get 호출시 반환한 Promise들의 solve 함수들을 쌓아둠, 솔브[]
    request : 현재 새롭게 호출할 async function에 대한 정보, [함수, 인수[], 솔브인가?]
    */
    const promiseStack : Promise<any>[] = [];
    const solveStack : Function[] = [];  //solve들을 넣어둠
    let request : [Function, any[]] = [f, args];
    let lastGetRequested;
    let getRequestPromiseSolve : Function;
    let getRequestPromiseSolved;
    function get(getF : AsyncFunction, ...getArgs : any[]) {
        if(getRequestPromiseSolve) { //딴걸 기다리다가 get했다.
            getRequestPromiseSolved = true;
            getRequestPromiseSolve();
        } else { //그냥 바로 get했다.
            lastGetRequested = true;
        }
        request = [getF, getArgs];
        return new Promise(solve => {solveStack.push(solve);});
    }

    request = [f, args];

    while(true) {
        lastGetRequested = false;
        getRequestPromiseSolve = undefined;
        getRequestPromiseSolved = false;

        if(request) {
            const requestCopy = request;
            request = undefined;
            promiseStack.push(requestCopy[0].call(null, get, ...requestCopy[1]));
        }
        const promise = promiseStack[promiseStack.length-1];

        if((!lastGetRequested)) { //promise가 다른걸 기다리고 있거나 리턴이 됬다
            const getRequestPromise = new Promise(solve => {getRequestPromiseSolve = solve});
            const returnedValue = await Promise.race([promise, getRequestPromise]); //리턴이 됬으면 promise가 먼저 해결되고, 리턴이 안됬으면 getRequestPromise가 먼저 해결됨.
            if(!getRequestPromiseSolved) { //get 요청을 새롭게 안 보냄. 순수 값임!
                promiseStack.pop(); //그러면 이 Promise는 필요 없음.
                if(!solveStack.length) { //이번에 호출한 함수가 마지막이다.
                    return returnedValue;
                } else { //아직 마지막은 아니다.
                    solveStack.pop()(returnedValue); //마지막 solve를 호출함
                }
            }
        }
    }
}

export default async;