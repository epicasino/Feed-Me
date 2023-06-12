// api key & id for edamam
const edamam = {
  appId: `80462c21`,
  appKey: `eac2e3b0f2d31655e1c3859e895185e6`,
};

// api token for mapbox
const mapBox = {
  token: `pk.eyJ1IjoiN2VsZXZlbm1hbmdvIiwiYSI6ImNsaWtzYjJyYjBpZzMzcXF2ejNhMzRmdHQifQ._6f_pe90uNU8Kf3uDuLbfQ`,
};

// edamam fetch url
const edamamFetch = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${edamam.appId}&app_key=${edamam.appKey}`;

// empty variable to add parameters to edamam's api fetch url
let edamamParameters = ``;

// function that will check each query object & set parameters for edamam based on user's choices
function queryFilter() {

  if (query.diet == `Vegan`) {
    edamamParameters += `&health=vegan`;
  } else if (query.diet == `Keto-Friendly`) {
    edamamParameters += `&health=keto-friendly`;
  } else if (query.diet == `Vegetarian`) {
    edamamParameters += `&health=vegetarian`;
  }

  if (query.excluded == `Tree-Nuts`) {
    edamamParameters += `&health=tree-nut-free`;
  } else if (query.excluded == `Peanuts`) {
    edamamParameters += `&health=peanut-free`;
  } else if (query.excluded == `Milk`) {
    edamamParameters += `&health=dairy-free`;
  }

  if (query.mealTime != `None`) {
    edamamParameters += `&mealType=${query.mealTime}`;
  }

  if (query.cuisine != `None`) {
    edamamParameters += `&cuisineType=${query.cuisine}`;
  }

  if (query.time == `less than 30 minutes`) {
    edamamParameters += `&time=30`;
  } else if (query.time == `more then 90 minutes`) {
    // %2B is + symbol, edamam requires the + symbol to be encoded
    edamamParameters += `&time=90%2B`;
  } else if (query.time == `30-60 minutes`) {
    edamamParameters += `&time=30-60`;
  } else {
    edamamParameters += `&time=60-90`;
  }

  if (query.calories == `more than 800`) {
    // %2B is + symbol, edamam requires the + symbol to be encoded
    edamamParameters += `&calories=800%2B`;
  } else {
    edamamParameters += `&calories=${query.calories}`;
  }
  console.log(edamamFetch + edamamParameters);
  requestEdamam();
}

// Will get recipes based on query variable
// https://developer.edamam.com/edamam-docs-recipe-api#/ API Reference for edamam

function requestEdamam() {
  fetch(edamamFetch + edamamParameters)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      let results = {
        recipes: [],
        description: `3 recipe results Based on quiz results`,
      };

      // Parsed data function, parsed data is stored in results.recipes as an array
      function dataParsed() {
        for (i = 0; i < 3; i++) {
          let recipe = {
            name: data.hits[i].recipe.label,
            cuisine: data.hits[i].recipe.cuisineType,
            image: data.hits[i].recipe.image,
            url: data.hits[i].recipe.url,
            mealType: data.hits[i].recipe.mealType,
            ingredients: data.hits[i].recipe.ingredientLines,
          };
          results.recipes.push(recipe);
        };
      };
      dataParsed();
      console.log(results);
      
      // will take every new result from current page session and push it to another array for localstorage to utilize
      let resultsLocalStorage = JSON.parse(localStorage.getItem('results')) || [];
      resultsLocalStorage.push(results);

      localStorage.setItem('results', JSON.stringify(resultsLocalStorage));
      
      resultsCard(results);
    });
}

// gets the content-box class element from html
const contentBoxEl = document.querySelector(".content-box");
const modalEl = document.querySelector(".modal");

// creates cards based on results from recipe finder
function resultsCard(results) {
  // creates div container for cards, bulma column class and justify-content flex properties set
  const cardsContainerEl = document.createElement("div");
  cardsContainerEl.setAttribute(
    "class",
    "columns is-flex is-justify-content-space-evenly"
  );

  // for loop to create 3 cards (or more but results are capped at 3)
  contentBoxEl.appendChild(cardsContainerEl);
  for (i = 0; i < results.recipes.length; i++) {
    // sets container and class attribute for card
    const cardBoxEl = document.createElement("div");
    cardBoxEl.setAttribute("class", `cardBox${i} card column is-3`);

    // sets container for image inside of cardBoxEl div container
    const cardImgDivEl = document.createElement("div");
    cardImgDivEl.setAttribute("class", "card-image");

    // figure tag created inside of cardImgDivEl div container for bulma image responsiveness
    const cardImgFigureEl = document.createElement("figure");
    cardImgFigureEl.setAttribute("class", "image is-128x128");

    // img tag w/ recipe result image url attribute created inside of cardImgFigureEl div container
    const cardImgEl = document.createElement("img");
    cardImgEl.setAttribute("src", results.recipes[i].image);

    const cardMediaEl = document.createElement("div");
    cardMediaEl.setAttribute("class", "media-content");

    // recipe title name inside of cardBoxEl div container
    const cardMediaTitleEl = document.createElement("a");
    cardMediaTitleEl.setAttribute("class", "title is-4");
    cardMediaTitleEl.setAttribute('target', '_blank');
    cardMediaTitleEl.setAttribute('href', results.recipes[i].url);

    // placeholder text (will be populated) inside of cardBoxEl div container
    const cardContentEl = document.createElement("div");
    cardContentEl.setAttribute("class", "content mt-5");

    // textcontent for above text
    cardMediaTitleEl.textContent = results.recipes[i].name;
    cardContentEl.textContent = `Ingredients: ${results.recipes[
      i
    ].ingredients.join(", ")}`;

    // appends child elements to parent elements, and those parent elements are children to cardsContainerEl parent element
    cardImgFigureEl.appendChild(cardImgEl);
    cardImgDivEl.appendChild(cardImgFigureEl);
    cardBoxEl.appendChild(cardImgDivEl);

    cardMediaEl.appendChild(cardMediaTitleEl);
    cardBoxEl.appendChild(cardMediaEl);

    cardBoxEl.appendChild(cardContentEl);

    cardsContainerEl.appendChild(cardBoxEl);

    // Event Listener to the card boxes
    cardBoxEl.addEventListener("click", (event) => {

      // grabbing elements from html that involve the modal 
      const modalCard = document.querySelector('.modal');
      const title = document.getElementById('modalTitle');
      const img = document.getElementById('modalImg');
      const content = document.getElementById('modalContent');
      const recipeUrl = document.getElementById('modalLink');

      target = event.target;

      // conditional checks to see if the user clicked on the first card, second card, third card
      if (target = cardBoxEl) {
        modalCard.setAttribute("class", "modal js-modal-trigger is-active");
        if ((target == document.querySelector(".cardBox0"))) {
          title.textContent = results.recipes[0].name;
          img.setAttribute('src', results.recipes[0].image);
          content.textContent = `Ingredients: ${results.recipes[0].ingredients.join(", ")}`;
          recipeUrl.textContent = `Here's a link to the recipe!`;
          recipeUrl.setAttribute('href', results.recipes[0].url);
        } 
        else if ((target == document.querySelector(".cardBox1"))) {
          title.textContent = results.recipes[1].name;
          img.setAttribute("src", results.recipes[1].image);
          content.textContent = `Ingredients: ${results.recipes[1].ingredients.join(", ")}`;
          recipeUrl.textContent = `Here's a link to the recipe!`;
          recipeUrl.setAttribute("href", results.recipes[1].url);
        }
        else if ((target == document.querySelector(".cardBox2"))) {
          title.textContent = results.recipes[2].name;
          img.setAttribute("src", results.recipes[2].image);
          content.textContent = `Ingredients: ${results.recipes[2].ingredients.join(", ")}`;
          recipeUrl.textContent = `Here's a link to the recipe!`;
          recipeUrl.setAttribute("href", results.recipes[2].url);
        };
      };
    });
  };
};

const feelingLuckyBtnEl = document.querySelector(".feeling-lucky-btn");

feelingLuckyBtnEl.addEventListener("click", randomRecipe);

// Will get random recipe from themealdb api
// https://www.themealdb.com/api.php api for reference
function randomRecipe() {
  fetch(`https://themealdb.com/api/json/v1/1/random.php`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      let recipe = {
        name: data.meals[0].strMeal,
        cuisine: data.meals[0].strArea,
        image: data.meals[0].strMealThumb,
        url: data.meals[0].strSource,
      };
      console.log(`Random Recipe:`);
      console.log(recipe);

      feelingLucky(recipe);
    });
}

// function to give a 'random' recipe
function feelingLucky(recipe) {
  feelingLuckyBtnEl.setAttribute("class", "button is-loading is-responsive is-danger");
  // 50/50 conditional, 0 = random recipe url, 1 = beef tea url
  if (Math.floor(Math.random() * 2) == 0) {
    location.assign(recipe.url);
  } else {
    location.assign(
      `https://www.epicurious.com/recipes/food/views/beef-tea-395253`
    );
  };
};

// Will make location suggestions based on user's lat & lon
// https://docs.mapbox.com/playground/search-box/?q=Starbucks&language=en&session_token=0be1d0ab-b318-4ce1-8889-299c9730f4d0 API Reference for mapbox
function requestMapBox(lat, lon) {
  fetch(
    `https://api.mapbox.com/search/searchbox/v1/suggest?q=${query.cuisine}&language=en&proximity=${lon},${lat}&limit=5&poi_category=restaurant,food&session_token=4f1f177e-055c-11ee-a904-2eb5a363657c&access_token=${mapBox.token}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      let results = {
        locations: [],
        description: `5 location suggestions from mapbox`,
      };
      function dataParsed() {
        for (i = 0; i < data.suggestions.length; i++) {
          let location = {
            name: data.suggestions[i].name,
            address: data.suggestions[i].full_address,
          };
          results.locations.push(location);
        };
      };
      dataParsed();
      console.log(results);
    });
}

// Will get location based on IP from ipapi API -> will pass lat & lon to mapbox for suggestions
function requestLocation() {
  fetch(`https://ipapi.co/json/`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      console.log(
        `User Location- Lat: ${data.latitude}, Lon: ${data.longitude}`
      );
      requestMapBox(data.latitude, data.longitude);
    });
}
