"use strict";
let input_check = [];

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // 上限を含み、下限も含む
}

class QuestionGenerator {
    squareGenerator(class_value, id_value) {
        const main = document.getElementById('main');
        const square = document.createElement('div');
        square.setAttribute('class', class_value);
        square.setAttribute('id', id_value);
        main.appendChild(square);
    }
}

for (let i = 0; i < 9; i++) {
    const q = new QuestionGenerator();
    let class_value = '';
    let id_value = `id_${i}`;
    if (i < 3 || i % 3 === 0) {
        class_value = 'hint_square';
    } else {
        class_value = 'input_square';
    }
    q.squareGenerator(class_value, id_value);
}


document.addEventListener('click', (e) => {
    const id = e.target.id;
    const class_name = e.target.className;
    console.log(id);
    console.log(class_name);

    if (class_name === 'input_square') {
        input_check.push(id);
        console.log(input_check);
        const last_square = document.getElementById(input_check.slice(-2)[0]);
        last_square.style.border = '1px solid';
        const square = document.getElementById(id);
        square.style.border = '3px solid';
    }
})