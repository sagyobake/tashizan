"use strict";
let input_check = [];
let correct_array = [];
let test_array = [];
let source_array = [1, 1, 1, 1];

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // 上限を含み、下限も含む
}

class QuestionGenerator {
    blockGenerator(class_value, id_value, text_value) {
        const main = document.getElementById('main');
        const block = document.createElement('div');
        block.setAttribute('class', class_value);
        block.setAttribute('id', id_value);
        block.innerText = text_value;
        main.appendChild(block);
    }
    hintGenerator(i) {
        if (i !== 0) {
            const r = getRandomIntInclusive(3, 17);
            correct_array.push(r);
            return r;
        } else {
            return '';
        }
    }
}

for (let i = 0; i < 9; i++) {
    const q = new QuestionGenerator();
    let class_value = '';
    let id_value = `id_${i}`;
    let text_value = '';
    if (i < 3 || i % 3 === 0) {
        class_value = 'hint_block';
        text_value = q.hintGenerator(i);
    } else {
        class_value = 'input_block';
    }
    q.blockGenerator(class_value, id_value, text_value);
}

console.log(correct_array);
console.log(source_array);

const questionChecker = () => {

    for (let i = 0; i < 2; i++) {
        const vertical = source_array[i] + source_array[i + 2];
        test_array.push(vertical);
    }
    for (let i = 0; i <= 2; i += 2) {
        const beside = source_array[i] + source_array[i + 1];
        test_array.push(beside);
    }
}
questionChecker();
console.log(test_array);

document.addEventListener('click', (e) => {
    const id = e.target.id;
    const class_name = e.target.className;
    console.log(id);
    console.log(class_name);

    if (class_name === 'input_block') {
        input_check.push(id);
        console.log(input_check);
        const last_block = document.getElementById(input_check.slice(-2)[0]);
        last_block.style.border = '1px solid';
        const block = document.getElementById(id);
        block.style.border = '3px solid';
    }
})
