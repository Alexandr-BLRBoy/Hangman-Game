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


