const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const dummyT = [
  { id: 1, text: 'Flower', amount: -20 },
  { id: 2, text: 'Salary', amount: 300 },
  { id: 3, text: 'Book', amount: -10 },
  { id: 4, text: 'Camera', amount: 150 },
];

let transactions = dummyT;

// Add transaction
const addTransaction = (e) => {
  e.preventDefault();
  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amoout');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(transaction);

    addTransactionsDOM(transaction);

    updateValues();

    text.value = '';
    amount.value = '';
  }
};

// Generate random ID
const generateID = () => {
  return Math.floor(Math.random * 100000000);
};

// Add transactions to DOM list
const addTransactionsDOM = (transaction) => {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  // Creating the single transaction
  const item = document.createElement('li');

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
  ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>`;

  list.appendChild(item);
};

// Update balance, income and expense
const updateValues = () => {
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
};



// Init app
const init = () => {
  list.innerHTML = '';
  transactions.forEach(addTransactionsDOM);
  updateValues();
};

init();

// Event Listeners
form.addEventListener('submit', addTransaction);
