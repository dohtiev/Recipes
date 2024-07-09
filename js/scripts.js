document.getElementById('search-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = document.getElementById('search-input').value;
    const recipeList = document.getElementById('recipe-list');
    const noRecipesMessage = document.getElementById('no-recipes');

    try {
        const response = await fetch(`https://api.api-ninjas.com/v1/recipe?query=${query}`, {
            headers: { 'X-Api-Key': 'YW1hDeolgH2EW3yRtEGiDw==shmwg9WZvwAj6PBT' }
        });
        const data = await response.json();

        recipeList.innerHTML = '';
        if (data.length > 0) {
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
            noRecipesMessage.style.display = 'block';
        }
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
});
