// The initial count is 1
let count = 1;

// Create main
const createMain = () => {
    const main = document.createElement('main');
    main.classList.add('main');
    document.body.append(main);

    return main;
}
const mainBlock = createMain();

// Hangman container
const containerHangMan = document.createElement('div');
containerHangMan.classList.add('container_hangman');
mainBlock.appendChild(containerHangMan);

const hangmanGame = document.createElement('div');
hangmanGame.classList.add('hangman_game');                //Hangman game container
containerHangMan.appendChild(hangmanGame);

const hangmanKeyboards = document.createElement('div');
hangmanKeyboards.classList.add('hangman_keyboards');      // Hangman info container
containerHangMan.appendChild(hangmanKeyboards);

// Add img Hangman
const createHangmanPics = (arr) => {
    const hangmanWrapper = document.querySelector('.hangman_game');
    arr.forEach(element => {
        const img = document.createElement('img');
        img.classList.add(element.className);
        img.src = element.srcPics;
        img.alt = 'picture';
        hangmanWrapper.appendChild(img);
    });

}
createHangmanPics(arrayHangmanBody);

// Add title Hangman
const hangmanTitle = document.createElement('h4');
hangmanTitle.classList.add('hangman_title');
hangmanTitle.textContent = 'Hangman Game';  //Hangman  game title
hangmanGame.appendChild(hangmanTitle);

// Create ul-List
const createList = () => {
    const listWords = document.createElement('ul');
    listWords.classList.add('hangmanGame__list');  //List Words
    hangmanKeyboards.appendChild(listWords);

    return listWords;
}
const listWords = createList();

// Create li-List Item
const createListItem = (list, length) => {

    for (let i = 1; i <= length; i++) {

        const listItem = document.createElement('li');
        listItem.classList.add('hangmanGame__list_item');  //List item
        list.appendChild(listItem);
    }
}

// Create question block
const createElemQuestion = () => {
    const question = document.createElement('p');
    question.classList.add('question_game');
    hangmanKeyboards.appendChild(question);

    return question;
}
const returnQuestion = createElemQuestion();

// Create attempts block
const createAttempts = () => {
    const attempts = document.createElement('p');
    attempts.classList.add('attempts_games');
    attempts.innerHTML = `Incorrect guesses: <span>0 / 6</span>`; //Attempts block
    hangmanKeyboards.appendChild(attempts);

    return attempts;
}
const returnAttempt = createAttempts();

// Create keyboard container
const createKeyboardContainer = () => {
    const keyboardsContainer = document.createElement('div');
    keyboardsContainer.classList.add('keyboards__container'); //Keyboards Container
    hangmanKeyboards.appendChild(keyboardsContainer);

    return keyboardsContainer;
}
const keyboardContainer = createKeyboardContainer();

// Create keyboard buttons
const createKeyboard = (container) => {
    for (let i = 97; i <= 122; i++) {
        const keyboardsBtn = document.createElement('button');
        keyboardsBtn.type = 'button';
        keyboardsBtn.classList.add('keyboards__button');
        keyboardsBtn.innerText = String.fromCharCode(i); // Keyboard
        container.appendChild(keyboardsBtn);
    }
}
createKeyboard(keyboardContainer);

// Random questions
const getRandomQuestion = (question) => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    console.log('correct answer: ', word);
    question.innerHTML = 'Hint: ' + `<b>${hint}</b>`;
    createListItem(listWords, word.length);

    return word;
}
const answer = getRandomQuestion(returnQuestion);





