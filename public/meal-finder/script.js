const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const resultHeading = document.getElementById('result-heading');
const mealsEl = document.getElementById('meals');
const single_mealEl = document.getElementById('single-meal');

// Searching meal and fetch from API
const searchMeal = (e) => {
  e.preventDefault();

  // Clearing single meal
  single_mealEl.innerHTML = '';

  // Getting search term
  const term = search.value;

  // Checking if input field isnt empty
  if (term.trim() !== '') {
    // Fetching api
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Changing result heading
        resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;
        // Checking if there's a meal with the name the user searched
        if (data.meals === null) {
          // If there isnt
          resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`;
        } else {
          // Mapping through the meals got from the fetch and displaying on the page
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
            <div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
            </div>
          </div>
          `
            )
            .join('');
        }
      });

    // Clear search text
    search.value = '';
  } else {
    // If input field is empty:
    alert('Please enter a search term');
  }
};

// Fetching meal by ID
const getMealById = (mealID) => {
  // Fetching API
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
};

// Fetch random meal from API
const getRandomMeal = () => {
  // Clearing meals and heading
  mealsEl.innerHTML = '';
  resultHeading.innerHTML = '';

  // Fetching API
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
};

// Adding meal to DOM
const addMealToDOM = (meal) => {
  const ingredients = [];

  // Push ingredients and measurements into the new ingredients arr
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  // Adding meal to DOM
  single_mealEl.innerHTML = `
  <div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
    <div class="single-meal-info">
      ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
      ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
    </div>
    <div class="main">
      <p>${meal.strInstructions}</p>
      <h2>Ingredients</h2>
      <ul>
        ${ingredients.map((ing) => `<li>${ing}</li>`).join('')}
      </ul>
    </div>
  </div>
  `;
};

// Event Listeners
submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);

mealsEl.addEventListener('click', (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealid');
    getMealById(mealID);
  }
});
