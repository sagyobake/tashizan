class QuestionGenerator {
    squareGenerator(class_value, id_value) {
        const main = document.getElementById('main');
        const square = document.createElement('div');
        square.setAttribute('class', 'square');
        square.setAttribute('class', class_value);
        square.setAttribute('id', id_value);
        main.appendChild(square);
    }
}