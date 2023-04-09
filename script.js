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

const showAuxiliarModal = function (text) {
  modalError.classList.remove('hidden');
  overlay.classList.remove('hidden');
  textError.textContent = text;
};

const instructions =
  'A cada rolada de dado, os valores que sairem (current) são somados. Se clicar em "hold", esses pontos serão somados à sua pontuação e será passada a vez. Entretanto, se o dado der 1, a vez será passada automaticamente, sem que haja incremento da pontuação. Além disso, você perderá 5 pontos! O primeiro jogador que atingir 100 pontos, vence :)';

const setActivePlayer = function () {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  sectionPlayer1.classList.toggle(`player--active`);
  sectionPlayer2.classList.toggle(`player--active`);
};

//Start
let namePlayer1 = '';
let namePlayer2 = '';

let diceValue;

let current = 0;

const scores = [0, 0];

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
  scores[0] = 0;
  scores[1] = 0;
  activePlayer = 0;
  current = 0;
  scorePlayer1.textContent = '';
  scorePlayer2.textContent = '';
  currentPlayer1.textContent = 0;
  currentPlayer2.textContent = 0;
  if (
    sectionPlayer1.classList.contains(`player--winner`) ||
    sectionPlayer2.classList.contains(`player--winner`)
  ) {
    sectionPlayer1.classList.remove(`player--winner`);
    sectionPlayer2.classList.remove(`player--winner`);
  }

  if (sectionPlayer2.classList.contains(`player--active`)) {
    sectionPlayer2.classList.toggle(`player--active`);
    sectionPlayer1.classList.toggle(`player--active`);
  }

  diceImg.src = 'misteryDice.png';
});

//Rolling the dice!
btnRollDice.addEventListener('click', function () {
  if (scores[0] < 100 && scores[1] < 100) {
    //Generate Dice
    diceValue = Math.trunc(Math.random() * 6) + 1;
    console.log(diceValue);
    //Alternate Img
    diceImg.src = `dice-${diceValue}.png`;

    if (diceValue !== 1) {
      current += diceValue;
      document.querySelector(`#current--${activePlayer}`).textContent = current;
    } else {
      if (scores[activePlayer] >= 10) {
        scores[activePlayer] -= 5;
      } else {
        scores[activePlayer] = 0;
      }
      document.querySelector(`#score--${activePlayer}`).textContent =
        scores[activePlayer];
      current = 0;
      document.querySelector(`#current--${activePlayer}`).textContent = current;
      setActivePlayer();
    }
  }
});

//Holding points
btnHold.addEventListener('click', function () {
  if (!diceValue) {
    showAuxiliarModal('Please, roll the dice at least once!');
  } else {
    if (scores[0] < 100 && scores[1] < 100) {
      scores[activePlayer] += current;
      document.querySelector(`#score--${activePlayer}`).textContent =
        scores[activePlayer];
      if (scores[activePlayer] >= 100) {
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.toggle(`player--winner`);
        showAuxiliarModal(
          `Winner Winner! ${
            activePlayer === 0 ? namePlayer1 : namePlayer2
          } 🎉🎉🎉`
        );
        document.querySelector(`#current--${activePlayer}`).textContent = `🎉`;
      } else {
        current = 0;
        document.querySelector(`#current--${activePlayer}`).textContent =
          current;
        setActivePlayer();
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
