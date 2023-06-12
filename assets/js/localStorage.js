const recentRecipeBtn = document.querySelector("#recent-recipes-btn");

recentRecipeLocalStorage = JSON.parse(localStorage.getItem("results"));

// console.log(recentRecipeLocalStorage);
let called = false;

recentRecipeBtn.addEventListener("click", (event) => {
  // grabbing elements from html that involve the modal
  const modalCard = document.querySelector("#recent-recipes-modal");
  const modalContent = document.querySelector("#recent-recipe-modal-content");

  // sets modal element active
  modalCard.setAttribute("class", "modal js-modal-trigger is-active");

  if (called) return;
  called = true;
  // for loop- will go for length of localstorage recipe array
  for (i = 0; i < recentRecipeLocalStorage.length; i++) {
    // within the for loop, another is used to get the data from each localstorage array's objects
    for (recipe = 0; recipe < 3; recipe++) {
      // sets container and class attribute for card
      const cardBoxEl = document.createElement("div");
      cardBoxEl.setAttribute("class", `card`);
      // sets header of card container
      const cardHeaderEl = document.createElement("header");
      cardHeaderEl.setAttribute("class", "card-header");
      // sets header for inside of header container
      // header-title is a link that they can click to get url of recipe data in localstorage
      const cardHeaderTitleEl = document.createElement("a");
      cardHeaderTitleEl.setAttribute("class", "card-header-title");
      cardHeaderTitleEl.setAttribute("target", "_blank");
      cardHeaderTitleEl.setAttribute(
        "href",
        recentRecipeLocalStorage[i].recipes[recipe].url
      );
      cardHeaderTitleEl.textContent =
        recentRecipeLocalStorage[i].recipes[recipe].name;

      //create element for cuisine type for each localstorage recipe
      const cardCuisineTextEl = document.createElement("p");
      cardCuisineTextEl.setAttribute("class", "card-header-title");
      cardCuisineTextEl.textContent = `Cuisine Type: ${recentRecipeLocalStorage[i].recipes[recipe].cuisine}`;

      //appending all elements to card
      cardBoxEl.appendChild(cardCuisineTextEl);
      cardHeaderEl.appendChild(cardHeaderTitleEl);
      cardBoxEl.appendChild(cardHeaderEl);
      modalContent.appendChild(cardBoxEl);
    }
  }
});
