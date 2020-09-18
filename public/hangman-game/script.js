const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const figureParts = document.querySelectorAll('.figure-part');

const words = ['inception', 'rembrandt', 'ibrahimovic', 'lakers'];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
const displayWord = () => {
  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(
        (letter) =>
          `
      <span class="letter">
      ${correctLetters.includes(letter) ? letter : ''}
      </span>`
      )
      .join('')}`;

  const innerWord = wordEl.innerText.replace(/\n/g, '');

  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations! You Won!';
    popup.style.display = 'flex';
  }
};

// Update the wrong letters
const updateWrongLettersEl = () => {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}`;

  // Display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  if (wrongLetters.length === figureParts.length) {
      finalMessage
  }
};

// Show notification
const showNotification = () => {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
};

// Keydown letter press
window.addEventListener('keydown', (e) => {
  if (e.code >= 'KeyA' && e.code <= 'KeyZ') {
    const letter = e.key;

    // check to see if the word does or not include the letter pressed
    if (selectedWord.includes(letter)) {
      // if the letter is CORRECT && it wasnt pressed yet
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
        // if the letter is correct but it was already pressed
      } else {
        showNotification();
      }
      // if the letter isnt in the word
    } else {
      // if the letter is WRONG && it wasnt pressed yet
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

displayWord();
