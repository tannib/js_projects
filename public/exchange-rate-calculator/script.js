const currencyOneEl = document.getElementById('currency-one');
const currencyTwoEl = document.getElementById('currency-two');
const currencyOneAmount = document.getElementById('amount-one');
const currencyTwoAmount = document.getElementById('amount-two');

const swapBtn = document.getElementById('swap');
const rateEl = document.getElementById('rate');

const calculate = () => {
  let currencyOne = currencyOneEl.value;
  let currencyTwo = currencyTwoEl.value;
  fetch(
    `https://v6.exchangerate-api.com/v6/657876fff83863e28a03a461/latest/${currencyOne}`
  )
    .then((res) => res.json())
    .then((data) => {
      const rate = data.conversion_rates[currencyTwo];
      rateEl.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;

      currencyTwoAmount.value = (currencyOneAmount.value * rate).toFixed(2);
    });
};

// Event Listeners
currencyOneEl.addEventListener('change', calculate);
currencyOneAmount.addEventListener('input', calculate);
currencyTwoEl.addEventListener('change', calculate);
currencyTwoAmount.addEventListener('input', calculate);

swapBtn.addEventListener('click', () => {
  const temp = currencyOneEl.value;
  currencyOneEl.value = currencyTwoEl.value;
  currencyTwoEl.value = temp;
  calculate();
});

calculate();
