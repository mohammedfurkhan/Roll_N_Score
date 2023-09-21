// 'use strict';

const player0el = document.querySelector('.player--0');
const player1el = document.querySelector('.player--1');
const score0el = document.getElementById('score--0');
const score1el = document.getElementById('score--1');
let name0 = document.getElementById('name--0');
let name1 = document.getElementById('name--1');
let currentscore0 = document.getElementById('current--0');
let currentscore1 = document.getElementById('current--1');
const btnnew = document.querySelector('.btn--new');
const btnroll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');
const btnclose = document.querySelector('.close--modal');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const dicepic = document.querySelector('.dice');
const announcement = document.querySelector('.announce');

let currentScore, activeplayer, score, playing;

const init = function () {
  currentScore = 0;
  activeplayer = 0;
  score = [0, 0];
  playing = true;
  score0el.textContent = 0;
  score1el.textContent = 0;
  currentscore0.textContent = 0;
  currentscore1.textContent = 0;
  player0el.classList.remove('player--winner');
  player1el.classList.remove('player--winner');
  player0el.classList.add('player--active');
  player1el.classList.remove('player--active');
  dicepic.classList.add('hidden');
  announcement.classList.add('hidden');

  name0.value = '';
  name1.value = '';
};

init();

let switchplayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activeplayer}`).textContent =
    currentScore;
  activeplayer = activeplayer === 0 ? 1 : 0;
  player0el.classList.toggle('player--active');
  player1el.classList.toggle('player--active');
};
// alert(
//   `Roll N Score\n In Roll 'N' Score, two players take turns rolling a dice, aiming to accumulate a score without surpassing 100 points. Rolling a 'one' resets the current score, while holding the score adds it to the player's total. The first to reach or exceed 100 points wins`
// );
btnroll.addEventListener('click', function () {
  if (!name0.value || !name1.value) {
    alert('please enter the name');
    return;
  }
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    dicepic.classList.remove('hidden');
    dicepic.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore = currentScore + dice;
      document.getElementById(`current--${activeplayer}`).textContent =
        currentScore;
    } else {
      switchplayer();
    }
  }
});

btnhold.addEventListener('click', function () {
  if (!name0.value || !name1.value) {
    alert('please enter the name');
    return;
  }
  if (playing) {
    score[activeplayer] = score[activeplayer] + currentScore;
    document.getElementById(`score--${activeplayer}`).textContent =
      score[activeplayer];

    if (score[activeplayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
      dicepic.classList.add('hidden');
      announcement.classList.remove('hidden');
      announcement.textContent = `Player ${activeplayer + 1}  wins`;
    } else {
      document.querySelector('.announce').classList.add('hidden');
      switchplayer();
    }
  }
});

btnnew.addEventListener('click', init);

btnclose.addEventListener('click', function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
});

modal.addEventListener('click', function () {
  overlay.classList.remove('hidden');
  modal.classList.remove('hidden');
});
overlay.addEventListener('click', function () {
  overlay.classList.add('hidden');
  modal.classList.add('hidden');
});
