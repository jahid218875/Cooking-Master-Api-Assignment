document.getElementById('search-button').addEventListener('click', function () {
    const searchValue = document.getElementById('search-value').value
    getMeal(searchValue);
    document.getElementById('search-value').value = ''
})


const getMeal = searchMeal => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMeal}`)
        .then(res => res.json())
        .then(data => {
            const meals = data.meals

            const elements = document.getElementsByClassName('meal-box');
            while (elements.length > 0) {
                elements[0].parentNode.removeChild(elements[0]);
            }
            const mealDetails = document.getElementsByClassName('meal-details');
            while (mealDetails.length > 0) {
                mealDetails[0].parentNode.removeChild(mealDetails[0]);
            }

            meals.forEach(mealName => {
                const mealList = document.getElementById('meal-list')
                const mealBox = document.createElement('div')
                mealBox.className = 'meal-box'
                const allMeals = `<img onclick="mealDetails('${mealName.idMeal}')" src="${mealName.strMealThumb}">
                <h4 onclick="mealDetails('${mealName.idMeal}')">${mealName.strMeal}</h4>`;
                mealBox.innerHTML = allMeals;
                mealList.appendChild(mealBox);

            });
        })
        .catch(res => alert('Enter right meals name'))
}

const mealDetails = mealID => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(res => res.json())
        .then(data => {
            const meals = data.meals[0];

            const elements = document.getElementsByClassName('meal-box');
            while (elements.length > 0) {
                elements[0].parentNode.removeChild(elements[0]);
            };

            const ingredientsList = document.getElementsByClassName('ingredients-list');
            while (ingredientsList.length > 0) {
                ingredientsList[0].parentNode.removeChild(ingredientsList[0]);
            };

            const mealIngredients = document.getElementById('meal-details');
            const ingredientsDiv = document.createElement('div');
            ingredientsDiv.className = 'ingredients-list'
            const ingredients = ` <img src="${meals.strMealThumb}">
                                    <h3>${meals.strMeal}</h4>
                                    <h5>Ingredients</h3>
                <ol>
                    <li>${meals.strIngredient1}</li>
                    <li>${meals.strIngredient2}</li>
                    <li>${meals.strIngredient3}</li>
                    <li>${meals.strIngredient4}</li>
                    <li>${meals.strIngredient5}</li>
                    <li>${meals.strIngredient6}</li>
                    <li>${meals.strIngredient7}</li>
                    <li>${meals.strIngredient8}</li>
                    <li>${meals.strIngredient9}</li>
                </ol>`;
            ingredientsDiv.innerHTML = ingredients;
            mealIngredients.appendChild(ingredientsDiv)
        })
}
