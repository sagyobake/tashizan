'use strict';
let input_check = [];

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
