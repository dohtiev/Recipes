document.getElementById('search-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = document.getElementById('search-input').value;
    const recipeList = document.getElementById('recipe-list');
    const popularRecipes = document.getElementById('popular-recipes');
    const popularSection = document.getElementById('popular-section');
    const noRecipesMessage = document.getElementById('no-recipes');
    const favoritesSection = document.getElementById('favorites-section');
    try {
        const response = await fetch(`https://api.api-ninjas.com/v1/recipe?query=${query}`, {
            headers: { 'X-Api-Key': window.API_KEY }
        });
        const data = await response.json();

        recipeList.innerHTML = '';
        if (data.length > 0) {
            popularSection.style.display = 'none';
            favoritesSection.style.display = 'none';
            recipeList.style.display = 'block';
            noRecipesMessage.style.display = 'none';
            data.forEach(recipe => {
                const listItem = document.createElement('li');
                listItem.classList.add('recipe-item');
                const link = document.createElement('a');
                link.href = `recipe.html?recipe=${encodeURIComponent(JSON.stringify(recipe))}`;
                link.classList.add('recipe-link');
                link.textContent = `${recipe.title} (${recipe.servings})`;
                listItem.appendChild(link);
                recipeList.appendChild(listItem);
            });
        } else {
            recipeList.style.display = 'none';
            noRecipesMessage.style.display = 'block';
            popularSection.style.display = 'none';
            favoritesSection.style.display = 'none';
        }
    } catch (error) {
        console.error('Error fetching recipes:', error);
        recipeList.style.display = 'none';
        popularSection.style.display = 'none';
        noRecipesMessage.style.display = 'block';
        favoritesSection.style.display = 'none';
    }
});

function loadFavorites() {
    const favoritesSection = document.getElementById('favorites-section');
    const favoritesList = document.getElementById('favorites-recipes');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    favoritesList.innerHTML = '';
    if (favorites.length > 0) {
        favorites.forEach(recipe => {
            const listItem = document.createElement('li');
            listItem.classList.add('recipe-item');
            const link = document.createElement('a');
            link.href = `recipe.html?recipe=${encodeURIComponent(JSON.stringify(recipe))}`;
            link.classList.add('recipe-link');
            link.textContent = `${recipe.title} (${recipe.servings})`;
            listItem.appendChild(link);
            favoritesList.appendChild(listItem);
        });
    } else {
        favoritesSection.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', loadFavorites);