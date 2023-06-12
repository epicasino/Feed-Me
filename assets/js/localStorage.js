const recentRecipeBtn = document.querySelector('#recent-recipes-btn');

recentRecipeLocalStorage = JSON.parse(localStorage.getItem("results"));

console.log(recentRecipeLocalStorage);

recentRecipeBtn.addEventListener('click', (event) => {
  // grabbing elements from html that involve the modal
  const modalCard = document.querySelector("#recent-recipes-modal");
  const modalContent = document.querySelector('#recent-recipe-modal-content');

  // sets modal element active
  modalCard.setAttribute("class", "modal js-modal-trigger is-active");
  for (i = 0; i < recentRecipeLocalStorage.length; i++) {
    for (recipe = 0; recipe < 2; recipe++) {
      // sets container and class attribute for card
      const cardBoxEl = document.createElement("div");
      cardBoxEl.setAttribute("class", `card`);

      const cardHeaderEl = document.createElement("header");
      cardHeaderEl.setAttribute("class", "card-header");

      const cardHeaderTitleEl = document.createElement("a");
      cardHeaderTitleEl.setAttribute("class", "card-header-title");
      cardHeaderTitleEl.setAttribute('target', '_blank');
      cardHeaderTitleEl.setAttribute(
        "href",
        recentRecipeLocalStorage[i].recipes[recipe].url
      );
      cardHeaderTitleEl.textContent = recentRecipeLocalStorage[i].recipes[recipe].name;
      
      const cardCuisineTextEl = document.createElement("p");
      cardCuisineTextEl.setAttribute("class", "card-header-title");
      cardCuisineTextEl.textContent = `Cuisine Type: ${recentRecipeLocalStorage[i].recipes[recipe].cuisine}`;
      
      cardBoxEl.appendChild(cardCuisineTextEl);
      cardHeaderEl.appendChild(cardHeaderTitleEl);
      cardBoxEl.appendChild(cardHeaderEl);
      modalContent.appendChild(cardBoxEl);
    };

  };
})