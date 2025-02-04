"use strict";
let correct_array = [];
let check = 0; //縦、横の列に重複がない場合に加算されていく。
let total_array = []; //縦、横の列の合計値を持つ配列
let tai = 0; //total_array専用のインデックス
let answer_obj = {}; //ユーザの解答を入れる配列
let answer_array = []; //answer_objをソートするために用いる配列

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
        const r = getRandomIntInclusive(1, 4);
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
        console.log(array); //正解となる配列を出力  
        return array;
    } else {
        return correctCheck(array);
    }
}

correct_array = correctCheck();

const blockGenerator = (class_value, id_value, text_value, tag) => {
    const main = document.getElementById('main');
    const block = document.createElement(tag);
    block.setAttribute('class', class_value);
    block.setAttribute('id', id_value);
    block.innerText = text_value;
    main.appendChild(block);
}

for (let i = 0; i < 9; i++) {
    if (i < 3 || i % 3 === 0) {
        if (i === 0) {
            blockGenerator('hint_block', `id${i}`, '', 'div');
        } else {
            blockGenerator('hint_block', `id${i}`, total_array[tai], 'div');
            tai++;
        }
    } else {
        blockGenerator('input_block', `id_${i}`, '', 'div');
    }
    if (i === 8) {
        tai = 0;
    }
}
for (let i = 0; i < 9; i++) {
    blockGenerator('button', `b_${i}`, i + 1, 'button');
}

const close = document.getElementById('close');
const popWin = document.getElementById('popWin');

close.addEventListener('click', () => {
    popWin.style.display = 'none';
});

const checkingAnswers = () => {
    let sorted_array = []; //ユーザーの解答を正しい順序に並び替えたもの
    console.log(answer_obj);
    answer_array = Object.keys(answer_obj);
    const array = answer_array.sort();

    array.forEach(element => {
        const value = Number(answer_obj[element]);
        console.log(value);
        sorted_array.push(value);
    });

    console.log(JSON.stringify(correct_array));
    console.log(JSON.stringify(sorted_array));
    if (JSON.stringify(sorted_array) === JSON.stringify(correct_array)) {
        console.log('正解！');
        popWin.style.display = 'flex';
    }
}

let clicked_id = '';
let input_check = [];
document.addEventListener('click', (e) => {
    const element = e.target.className;
    const id = e.target.id;
    //console.log(element);
    if (element === 'button') {
        if (clicked_id !== '') {
            const button = document.getElementById(id).innerText;
            console.log(button);
            const input = document.getElementById(clicked_id);
            input.innerText = button;
            answer_obj[clicked_id] = button;
            checkingAnswers();
        }
    }
    if (element === 'input_block') {
        clicked_id = id;

        input_check.push(id);
        const last_block = document.getElementById(input_check.slice(-2)[0]);
        last_block.style.border = '1px solid';
        const block = document.getElementById(id);
        block.style.border = '3px solid';
    }
});

