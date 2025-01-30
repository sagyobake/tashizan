function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // 上限を含み、下限も含む
}

const questionGenerator = (array, hint_array) => {
    console.log(array);
    console.log(hint_array);
    let beside = 0;
    let vertical_array = [];
    let hint_array_index = 3;
    for (let i = 1; i <= array.length; i++) {
        //console.log(array[i]);
        beside += array[i - 1];
        if (i % 2 === 0) {
            console.log(beside);
            console.log(hint_array[hint_array_index]);
            document.getElementById(hint_array[hint_array_index]).innerText =
                beside;
            beside = 0;
            hint_array_index++;

            vertical_array.push(array[i - 1]);
        }
    }
    console.log(vertical_array + " vertical");
};

const squareGenerator = () => {
    const main = document.getElementById("main");
    let array = [];
    let hint_array = [];
    for (let i = 0; i < 9; i++) {
        if (i % 3 === 0 || i < 3) {
            const div = document.createElement("div");
            div.setAttribute("id", `id_${i}`);
            hint_array.push(`id_${i}`);
            div.classList.add("hint_square");
            main.appendChild(div);
        } else {
            const input = document.createElement("input");
            input.setAttribute("id", `id_${i}`);
            input.classList.add("input_square");
            input.maxLength = 1;
            input.type = "number";
            input.pattern = "^[0-9]+$";
            array.push(getRandomIntInclusive(1, 9));
            main.appendChild(input);
        }
    }

    //console.log(array);
    questionGenerator(array, hint_array);
};

squareGenerator();
