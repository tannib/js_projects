const currency_one = document.getElementById('currency_one')
const currency_two = document.getElementById('currency_two')
const swap = document.getElementById('swap')
const rate = document.getElementById('rate')
const input_one = document.getElementById('input_one')
const input_two = document.getElementById('input_two')

function calculate() {
    let currency_one_name = currency_one.value
    let currency_two_name = currency_two.value

    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one_name}`)
    .then(res => res.json())
    .then(data => {
        const rateValue = data.rates[currency_two_name]
        rate.innerHTML = `1 ${currency_one_name} = ${rateValue} ${currency_two_name}`
        let num = +input_one.value
        input_two.value = (num * rateValue).toFixed(2)
    })
}

function swapCurrency() {
    const temp = currency_two.value // store EUR in temp
    currency_two.value = currency_one.value // EUR became USD
    currency_one.value = temp // USD became EUR
    calculate()
}

// Event Listeners
currency_one.addEventListener('change', calculate)
currency_two.addEventListener('change', calculate)
input_one.addEventListener('input', calculate)
input_two.addEventListener('input', calculate)
swap.addEventListener('click', swapCurrency)

calculate()
