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
