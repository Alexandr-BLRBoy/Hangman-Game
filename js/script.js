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

// Get Random questions
const getRandomQuestion = (question) => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    console.log('correct answer: ', word);
    question.innerHTML = 'Hint: ' + `<b>${hint}</b>`;
    createListItem(listWords, word.length);

    return word;
}
const answer = getRandomQuestion(returnQuestion);

//Open modal window
const callPopUpWindow = () => {
    const ulList = document.querySelector('.hangmanGame__list');

    return Array.from(ulList.children).every((item) => item.innerHTML);
}

// Button listener
keyboardContainer.addEventListener('click', (event) => {
    const letter = event.target.innerHTML;
    const ul = document.querySelector('.hangmanGame__list');
    const liItems = Array.from(ul.children);

    // Disabled click buttons
    const arrBtn = Array.from(keyboardContainer.children);
    for(let i = 0; i <= arrBtn.length; i++) {
        if(arrBtn[i] === event.target) {
            arrBtn[i].setAttribute('disabled', 'disabled');
            arrBtn[i].style = 'background-color: rgb(151, 141, 158);'
        }
    }

    if (answer.includes(letter)) {
        const answerArr = answer.split('');
        answerArr.map((item, index) => {

            if (item === letter) {

                liItems[index].innerHTML = letter;
                liItems[index].style = 'border-bottom: none';

            }
        })
    } else if (count <= 6) {

        returnAttempt.innerHTML = `Incorrect guesses: <span>${count} / 6</span>`;
        const className = arrayHangmanBody[count].className;
        document.querySelector(`.${className}`).style.display = 'block';
        count++;

    }

    if(callPopUpWindow()) {
        document.querySelector('.popUp_wrapper').style = 'visibility: visible';
        document.querySelector('.main').style = 'filter: blur(5px)';
    }

    if(count === (6 + 1)) {
        document.querySelector('.modal__window_container').style = 'visibility: visible';
        document.querySelector('.main').style = 'filter: blur(5px)';
    }


});

// Modal Window Play Again
const createPopUpWrapper = () => {
    const popUpWrapper = document.createElement('div');
    popUpWrapper.classList.add('popUp_wrapper');
    document.body.append(popUpWrapper);

    return popUpWrapper;
}
const popUpWrapperContainer = createPopUpWrapper();

const createPopUpContainer = (container) => {
    const popUpContainer = document.createElement('div');
    popUpContainer.classList.add('popUp_container');
    container.append(popUpContainer);

    return popUpContainer;
}
const popUpWindowContainer = createPopUpContainer(popUpWrapperContainer);

const createTitlePopup = (container) => {
    const titlePopup = document.createElement('h1');
    titlePopup.classList.add('popUp_title');
    titlePopup.innerHTML = 'Congratulations! <br><span>You win!</span></br>';
    container.appendChild(titlePopup);
}
createTitlePopup(popUpWindowContainer);

const createTextAnswer = (container) => {
    const answerQuestion = document.createElement('p');
    answerQuestion.classList.add('answer_question');
    answerQuestion.innerHTML = 'Answer: ' + `<span>${answer}</span>`;
    container.appendChild(answerQuestion);
}
createTextAnswer(popUpWindowContainer);

const createBtnPlayAgain = (container) => {
    const btnPlayAgain = document.createElement('button');
    btnPlayAgain.classList.add('btn_playAgain');
    btnPlayAgain.textContent = 'Play Again';
    btnPlayAgain.type = 'button';
    container.appendChild(btnPlayAgain);
}
createBtnPlayAgain(popUpWindowContainer);

// Button Play Again - Win
const buttonWin = document.querySelector('.btn_playAgain');

buttonWin.addEventListener('click', () => {
    location.reload();
})

// Modal window Your Lose
const createModalWindowLose = () => {
    const modalWindowContainer = document.createElement('div');
    modalWindowContainer.classList.add('modal__window_container');
    document.body.append(modalWindowContainer);

    return modalWindowContainer;
}
const modalWindowLose = createModalWindowLose();

const createModalWindowWrapper = (container) => {
    const modalWindowWrapper = document.createElement('div');
    modalWindowWrapper.classList.add('modal__window_wrapper');
    container.appendChild(modalWindowWrapper);

    return modalWindowWrapper;
}
const modalWindowWrapper = createModalWindowWrapper(modalWindowLose);

const createTitleModalWindowLose = (container) => {
    const titleModalWindow = document.createElement('h1');
    titleModalWindow.classList.add('title__modal_window');
    titleModalWindow.innerHTML = 'Game Over! <br><span>Your Lose!</span></br>';
    container.appendChild(titleModalWindow);
}
createTitleModalWindowLose(modalWindowWrapper);

const createTextAnswerModal = (container) => {
    const textAnswer = document.createElement('p');
    textAnswer.classList.add('text__answer_modal');
    textAnswer.innerHTML = 'Answer: ' + `<span>${answer}</span>`;
    container.appendChild(textAnswer);
}
createTextAnswer(modalWindowWrapper);

const createButtonModalWindow = (container) => {
    const buttonModalWindow = document.createElement('button');
    buttonModalWindow.classList.add('button__modal_window');
    buttonModalWindow.type = 'button';
    buttonModalWindow.textContent = 'Play Again';
    container.appendChild(buttonModalWindow);
}
createButtonModalWindow(modalWindowWrapper);

// Button Play Again - Lose
const buttonLose = document.querySelector('.button__modal_window');

buttonLose.addEventListener('click', () => {
    location.reload();
})




