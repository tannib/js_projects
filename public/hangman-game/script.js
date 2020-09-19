const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const figureParts = document.querySelectorAll('.figure-part');

const words = ['inception', 'rembrandt', 'ibrahimovic', 'lakers'];
let selectedWord = words[Math.floor(Math.random() * words.length)];
console.log(selectedWord);

let correctLetters = [];
let wrongLetters = [];

// Show hidden word
const displayWord = () => {
  // Modifying the wordEl by printing the letters included into the correctLetters arr after checking if they are actually included into the arr
  wordEl.innerHTML = `
    ${selectedWord
      // Transforming the selected word from a string to arr
      .split('')
      // Mapping to the new arr in order to see if the correctLetters includes one of the letters in the selected word new arr
      .map(
        (letter) =>
          // Checking if the letter is included in the correctLetters arr
          `
      <span class="letter">
      ${correctLetters.includes(letter) ? letter : ''}
      </span>`
      )
      // Recombine the arr into a string
      .join('')}`;

  // Remaking the string into a single line
  const innerWord = wordEl.innerText.replace(/\n/g, '');

  // Checking if the innerWord is equal to the selectedWord
  if (innerWord == selectedWord) {
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
    // Part is the single svg element
    // Index is the svg element position (from 0 to 5)

    // Counting how many errors the user has made
    const errors = wrongLetters.length;

    // Checking what svg element matches that error
    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  // Checking if the user has lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Unfortunately you lost.';
    popup.style.display = 'flex';
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
  // Checking if only a letter is pressed
  if (e.code >= 'KeyA' && e.code <= 'KeyZ') {
    const letter = e.key;
    console.log(letter);

    // Checking to see if the selected word does or not include the letter pressed
    if (selectedWord.includes(letter)) {
      // if the letter is CORRECT and it wasnt pressed yet
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        // if the letter is CORRECT but it was already pressed
        showNotification();
      }
      // if the letter isnt in the selected word
    } else {
      // if the letter is WRONG and it wasnt pressed yet
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl();
      } else {
        // if the letter is WRONG and it was already pressed
        showNotification();
      }
    }
  }
});

// Restarting the game and play again
playAgainBtn.addEventListener('click', () => {
  // Emptying arrays
  correctLetters = [];
  wrongLetters = [];

  // Selecting another random word
  selectedWord = words[Math.floor(Math.random() * words.length)];

  // Update DOM
  displayWord();
  updateWrongLettersEl();
  popup.style.display = 'none';
});

displayWord();
