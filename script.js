'use strict';

//Seletores

const sectionPlayer1 = document.querySelector('.player--0');

const sectionPlayer2 = document.querySelector('.player--1');

const btnPlayGame = document.querySelector('.playGame');

const modalInput = document.querySelector('#divInput');

const modalError = document.querySelector('#divError');

const textError = document.querySelector('.errorP');

const overlay = document.querySelector('.overlay');

const inputNamePlayer1 = document.querySelector('.namePlayer1');

const inputNamePlayer2 = document.querySelector('.namePlayer2');

const player1 = document.querySelector('#name--0');

const scorePlayer1 = document.querySelector('#score--0');

const currentPlayer1 = document.querySelector('#current--0');

const player2 = document.querySelector('#name--1');

const scorePlayer2 = document.querySelector('#score--1');

const currentPlayer2 = document.querySelector('#current--1');

const btnRollDice = document.querySelector('.btn--roll');

const btnHold = document.querySelector('.btn--hold');

const btnNewGame = document.querySelector('.btn--new');

const diceImg = document.querySelector('.dice');

const createError = document.createElement('p');

//Functions
const setDiceImg = function (source) {
  diceImg.src = source;
};

function setActivePlayer(activePlayer) {
  if (activePlayer === 0) {
    sectionPlayer1.classList.add('player--active');
    sectionPlayer2.classList.remove('player--active');
  } else {
    sectionPlayer1.classList.remove('player--active');
    sectionPlayer2.classList.add('player--active');
  }
}

const showAuxiliarModal = function (text) {
  modalError.classList.remove('hidden');
  overlay.classList.remove('hidden');
  textError.textContent = text;
};

const instructions =
  'A cada rolada de dado, os valores que sairem (current) são somados. Se clicar em "hold", esses pontos serão somados à sua pontuação e será passada a vez. Entretanto, se o dado der 1, a vez será passada automaticamente, sem que haja incremento da pontuação. Além disso, você perderá 5 pontos! O primeiro jogador que atingir 100 pontos, vence :)';

const testScoreP2 = function () {
  if (scoreP2 >= 100) {
    sectionPlayer2.classList.add('player--winner');
    showAuxiliarModal(`Winner winner! ${namePlayer2} 🎉🎉🎉`);
    currentPlayer2.textContent = '🎉';
    console.log('funcionou');
  } else {
    current = 0;
    currentPlayer2.textContent = current;
    activePlayer = 0;
    setActivePlayer(activePlayer);
  }
};

const testScoreP1 = function () {
  if (scoreP1 >= 100) {
    sectionPlayer1.classList.add('player--winner');
    showAuxiliarModal(`Winner winner! ${namePlayer1} 🎉🎉🎉`);
    currentPlayer1.textContent = '🎉';
  } else {
    current = 0;
    currentPlayer1.textContent = current;
    activePlayer = 1;
    setActivePlayer(activePlayer);
  }
};

//Start
let namePlayer1 = '';
let namePlayer2 = '';

let diceValue;

let current = 0;

let scoreP1 = 0;

let scoreP2 = 0;

let activePlayer = 0;

//Retrieve Names
btnPlayGame.addEventListener('click', function () {
  if (!inputNamePlayer1.value || !inputNamePlayer2.value) {
    createError.textContent = 'Please, insert the players names!';
    createError.setAttribute('class', 'text');
    modalInput.insertBefore(createError, btnPlayGame);
    if (!inputNamePlayer1.value) {
      inputNamePlayer1.classList.add('borderError');
    }
    if (!inputNamePlayer2.value) {
      inputNamePlayer2.classList.add('borderError');
    }
  } else {
    namePlayer1 = inputNamePlayer1.value;
    namePlayer2 = inputNamePlayer2.value;
    console.log(namePlayer1, namePlayer2);
    createError.remove();
    modalInput.classList.add('hidden');
    overlay.classList.add('hidden');
    player1.textContent = namePlayer1;
    player2.textContent = namePlayer2;
    showAuxiliarModal(instructions);
  }
});

//New Game!
btnNewGame.addEventListener('click', function () {
  diceValue = 0;
  scoreP1 = 0;
  scoreP2 = 0;
  activePlayer = 0;
  current = 0;
  scorePlayer1.textContent = '';
  scorePlayer2.textContent = '';
  currentPlayer1.textContent = 0;
  currentPlayer2.textContent = 0;
  if (
    sectionPlayer1.classList.contains('player--winner') ||
    sectionPlayer2.classList.contains('player--winner')
  ) {
    if (sectionPlayer1.classList.contains('player--winner')) {
      sectionPlayer1.classList.remove('player--winner');
    } else if (sectionPlayer2.classList.contains('player--winner')) {
      sectionPlayer2.classList.remove('player--winner');
    }
  }

  if (sectionPlayer2.classList.contains('player--active')) {
    sectionPlayer2.classList.remove('player--active');
    sectionPlayer1.classList.add('player--active');
  }
  diceImg.src = 'misteryDice.png';
});

//Rolling the dice!
btnRollDice.addEventListener('click', function () {
  if (scoreP1 < 100 && scoreP2 < 100) {
    //Generate Dice
    diceValue = Math.trunc(Math.random() * 6) + 1;
    console.log(diceValue);
    //Alternate Img
    switch (diceValue) {
      case 1:
        setDiceImg('dice-1.png');
        break;
      case 2:
        setDiceImg('dice-2.png');
        break;
      case 3:
        setDiceImg('dice-3.png');
        break;

      case 4:
        setDiceImg('dice-4.png');
        break;

      case 5:
        setDiceImg('dice-5.png');
        break;

      case 6:
        setDiceImg('dice-6.png');
        break;
    }
    if (activePlayer === 0) {
      if (diceValue !== 1) {
        current += diceValue;
        currentPlayer1.textContent = current;
      } else {
        if (scoreP1 >= 10) {
          scoreP1 -= 5;
          scorePlayer1.textContent = scoreP1;
        } else {
          scoreP1 = 0;
          scorePlayer1.textContent = scoreP1;
        }

        current = 0;
        currentPlayer1.textContent = current;
        activePlayer = 1;
        setActivePlayer(activePlayer);
      }
    } else {
      if (diceValue !== 1) {
        current += diceValue;
        currentPlayer2.textContent = current;
      } else {
        if (scoreP2 >= 10) {
          scoreP2 -= 5;
          scorePlayer2.textContent = scoreP2;
        } else {
          scoreP2 = 0;
          scorePlayer2.textContent = scoreP2;
        }
        current = 0;
        currentPlayer2.textContent = current;
        activePlayer = 0;
        setActivePlayer(activePlayer);
      }
    }
  }
});

//Holding points
btnHold.addEventListener('click', function () {
  if (!diceValue) {
    showAuxiliarModal('Please, roll the dice at least once!');
  } else {
    if (scoreP1 < 100 && scoreP2 < 100) {
      if (activePlayer === 0) {
        scoreP1 += current;
        scorePlayer1.textContent = scoreP1;
        testScoreP1();
      } else {
        scoreP2 += current;
        scorePlayer2.textContent = scoreP2;
        testScoreP2();
      }
    }
  }
});

//Overlay
overlay.addEventListener('click', function () {
  if (!modalError.classList.contains('hidden')) {
    overlay.classList.add('hidden');
    modalError.classList.add('hidden');
  }
});
