'use strict';

const innerPCG = filterFunc => selecteds => k => options => function* () {
    if (k === 0) {
        yield selecteds
        return
    }
    for (const i of options.keys()) {
        yield* innerPCG(filterFunc)(
            [...selecteds, options[i]])(k - 1)(filterFunc(i)(options)
            );
    }
}();
const repPermFilter = i => options => options
const repPermG = innerPCG(repPermFilter)([]);

const numList = [...Array(3)].map((_, i) => i);
//const numList = [...Array(2)].map((_, i) => i);
const all_pattern = [...repPermG(4)(numList)];

