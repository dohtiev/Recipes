document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const recipe = JSON.parse(decodeURIComponent(urlParams.get('recipe')));
    if (!recipe) {
        window.location.href = '/';
        return;
    }

    document.title = recipe.title;
    document.getElementById('recipe-title').textContent = recipe.title;

    const ingredientsList = document.getElementById('ingredients-list');
    const ingredients = recipe.ingredients.split('|');
    ingredients.forEach(ingredient => {
        const listItem = document.createElement('li');
        listItem.classList.add('ingredient-item');
        listItem.textContent = ingredient.trim();
        ingredientsList.appendChild(listItem);
    });

    document.getElementById('recipe-servings').textContent = recipe.servings;
    document.getElementById('recipe-instructions').textContent = recipe.instructions;

    // Check if the recipe is already in favorites
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorite = favorites.some(favRecipe => favRecipe.title === recipe.title);

    const favoriteButton = document.getElementById('favorite-button');
    if (isFavorite) {
        favoriteButton.innerHTML = '<i class="fas fa-heart"></i> Remove from Favorites';
    } else {
        favoriteButton.innerHTML = '<i class="fas fa-heart"></i> Add to Favorites';
    }

    favoriteButton.addEventListener('click', () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isFavorite = favorites.some(favRecipe => favRecipe.title === recipe.title);

        if (isFavorite) {
            const updatedFavorites = favorites.filter(favRecipe => favRecipe.title !== recipe.title);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            favoriteButton.innerHTML = '<i class="fas fa-heart"></i> Add to Favorites';
        } else {
            favorites.push(recipe);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            favoriteButton.innerHTML = '<i class="fas fa-heart"></i> Remove from Favorites';
        }
    });
});

function copyLink() {
    const shareButton = document.querySelector('.share-button');
    const recipeLink = window.location.href;

    navigator.clipboard.writeText(recipeLink).then(() => {
        shareButton.innerHTML = '<i class="fas fa-check"></i> Copied';
        setTimeout(() => {
            shareButton.innerHTML = '<i class="fas fa-share-alt"></i> Share Recipe';
        }, 2000);
    }).catch(err => {
        console.log('Something went wrong', err);
    });
}
