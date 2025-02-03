"use strict";
let correct_array = [];
let check = 0; //縦、横の列に重複がない場合に加算されていく。
let total_array = []; //縦、横の列の合計値を持つ配列
let tai = 0; //total_array専用のインデックス

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // 上限を含み、下限も含む
}

function isDuplicated(elements) {
    // Setを使って、配列の要素を一意にする
    const setElements = new Set(elements);
    return setElements.size !== elements.length;
}

const whCheck = (array) => {
    let total = array.reduce(function (sum, element) {
        return sum + element;
    }, 0);
    total_array.push(total);
    if (isDuplicated(array) === false) {
        check++;
    }
}

const correctCheck = () => {
    let array = [];
    for (let i = 0; i < 4; i++) {
        const r = getRandomIntInclusive(1, 9);
        array.push(r);
    }
    check = 0;
    total_array = [];
    for (let i = 0; i < 2; i++) { //それぞれの縦の列に重複がないかをチェックする。
        let vertical = [];
        for (let j = i; j <= i + 2; j += 2) {
            vertical.push(array[j]);
        }
        whCheck(vertical);
    }
    for (let i = 0; i <= 2; i += 2) { //それぞれの横の列に重複がないかをチェックする。
        let beside = [];
        for (let j = 0; j < 2; j++) {
            beside.push(array[i + j]);
        }
        whCheck(beside);
    }

    //console.log(check);
    if (check === 4) {
        return array;
    } else {
        return correctCheck(array);
    }
}

correctCheck();

const blockGenerator = (class_value, id_value, text_value) => {
    const main = document.getElementById('main');
    const block = document.createElement('div');
    block.setAttribute('class', class_value);
    block.setAttribute('id', id_value);
    block.innerText = text_value;
    main.appendChild(block);
}

for (let i = 0; i < 9; i++) {
    if (i < 3 || i % 3 === 0) {
        if (i === 0) {
            blockGenerator('hint_block', `id${i}`, '');
        } else {
            blockGenerator('hint_block', `id${i}`, total_array[tai]);
            tai++;
        }
    } else {
        blockGenerator('input_block', `id${i}`, '');
    }
    if (i === 8) {
        tai = 0;
    }
}

