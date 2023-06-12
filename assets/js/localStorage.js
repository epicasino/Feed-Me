const recentRecipeBtn = document.querySelector('#recent-recipes-btn');

recentRecipeLocalStorage = JSON.parse(localStorage.getItem("results"));

console.log(recentRecipeLocalStorage);

recentRecipeBtn.addEventListener('click', (event) => {
  // grabbing elements from html that involve the modal
  const modalCard = document.querySelector("#recent-recipes-modal");
  const title = document.querySelector("#recent-recipe-modal-title");
  const modalContent = title.querySelector('.modal-content');

  // sets modal element active
  modalCard.setAttribute("class", "modal js-modal-trigger is-active");

  for (i = 0; i < recentRecipeLocalStorage.length; i++) {

  }
})