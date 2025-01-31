let array = [];
let answer_object = {};
let answer_array = [];

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // 上限を含み、下限も含む
}

const questionGenerator = (array, hint_array) => {
    console.log(array);
    console.log(hint_array);
    let beside = 0;
    let vertical = 0;
    let hint_array_index = 3;
    let vertical_index = 1;
    for (let i = 1; i <= array.length; i++) {
        //console.log(array[i]);
        beside += array[i - 1];
        if (i % 2 === 0) {
            //console.log(beside);
            //console.log(hint_array[hint_array_index]);
            document.getElementById(hint_array[hint_array_index]).innerText =
                beside;
            beside = 0;
            hint_array_index++;
        }

        if (i <= 2) {
            //console.log(array[i - 1]);
            for (let j = 0; j < 2; j++) {
                vertical = array[i - 1] + array[i - 1 + 2];
            }

            document.getElementById(hint_array[vertical_index]).innerText =
                vertical;

            vertical_index++;
        }
    }
};

const checkingDuplication = (input_id, n) => {
    let r = getRandomIntInclusive(1, n);

    if (input_id % 2 === 0 && r === Number(array[input_id - 2])) {
        console.log(r);
        return checkingDuplication(input_id, n);
    } else if (input_id > 2 && r === Number(array[input_id - 3])) {
        console.log(r);
        return checkingDuplication(input_id, n);
    } else {
        console.log(r);
        return r;
    }
};

const squareGenerator = () => {
    const main = document.getElementById("main");
    let hint_array = [];

    let input_id = 0;
    let input_n = 1;

    for (let i = 0; i < 9; i++) {
        if (i % 3 === 0 || i < 3) {
            const div = document.createElement("div");
            div.setAttribute("id", `id_${i}`);
            hint_array.push(`id_${i}`);
            div.classList.add("hint_square");
            main.appendChild(div);
        } else {
            const input = document.createElement("input");

            input.setAttribute("id", `id_${input_id}`);
            input_id++;

            input.classList.add("input_square");
            input.maxLength = 1;
            input.type = "number";
            input.pattern = "^[0-9]+$";
            main.appendChild(input);

            const r = checkingDuplication(input_id, 9);
            //console.log(r);

            array.push(r);

            input_n++;
        }
    }

    //console.log(array);
    questionGenerator(array, hint_array);
};

squareGenerator();

const checkAnswer = (e) => {
    const n = e.target.value;
    const index = Number(e.target.id.slice(-1));

    console.log(n);
    console.log(e.target.id);
    console.log(index);

    answer_array[index] = n;
    console.log(answer_array);

    if (array.toString() === answer_array.toString()) {
        console.log("正解");
        const popup = document.getElementById("correct_popup");
        popup.style.display = "block";
    }
};

//どれかの入力欄に入力されているときに発生
window.addEventListener("input", checkAnswer);
