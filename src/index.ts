
import generator from "./modules/generator";
import callback from "./modules/callback";
import async from "./modules/async";

import wrappedGenerator from "./modules/wrapped/generator";
import wrappedCallback from "./modules/wrapped/callback";
import wrappedAsync from "./modules/wrapped/async";

const wrapped = {
    generator: wrappedGenerator,
    callback: wrappedCallback,
    async: wrappedAsync
};

export {
    generator,
    callback,
    async,
    wrapped
};

/*
# 모든 기능들
모든 기능들은 비순수함수에서의 처리도 정상적으로 가능하게, 즉 일반적인 JS의 함수와 정확히 똑같이 작동하도록 제작되었습니다.
단 this같은 호출 위치에 따라 상대적일 수 있는 요소가 함수에 사용되는 경우 bind 함수를 이용해 결속시켜줄 필요가 있습니다.

# generator
동기적으로 데이터를 처리합니다.
generator의 yield 기능을 이용합니다.

# callback
동기적으로 데이터를 처리합니다.
콜백 함수를 이용합니다.

# async
비동기적으로 데이터를 처리합니다.
await를 이용합니다.
*/

/*
아마도 업데이트될 generator 유사 방식 :
yield 사용 가능 generator.(리얼 generator용 generator).

계산하다가 멈추고 계산하다가 멈추고 하면 될듯.
자체적인 next를 만들던지 그냥 얘 전체를 generator로 하던지.
*/