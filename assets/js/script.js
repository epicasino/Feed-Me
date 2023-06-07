// api keys
const edamam = {
  appId: `80462c21`,
  appKey: `eac2e3b0f2d31655e1c3859e895185e6`,
};
const mapBox = {
  token: `pk.eyJ1IjoiN2VsZXZlbm1hbmdvIiwiYSI6ImNsaWtzYjJyYjBpZzMzcXF2ejNhMzRmdHQifQ._6f_pe90uNU8Kf3uDuLbfQ`,
};

const query = {
  diet: ``,
  healthLabel: `vegetarian`,
  cuisine: `italian`,
  mealTime: ``,
  calories: ``,
  excluded: ``,
  // search: `Chicken`,
  time: ``,
};

// Will get recipes based on query variable
// https://developer.edamam.com/edamam-docs-recipe-api#/ API Reference for edamam
function requestEdamam() {
  fetch(
    `https://api.edamam.com/api/recipes/v2?type=public&cuisineType=${query.cuisine}&health=${query.healthLabel}&app_id=${edamam.appId}&app_key=${edamam.appKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
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
        }
      }
      dataParsed();
      console.log(results);
    });
};

// Will get random recipe from themealdb api
// https://www.themealdb.com/api.php api for reference
function randomRecipe() {
  fetch(`http://themealdb.com/api/json/v1/1/random.php`)
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
      console.log(`Random Recipe:`)
      console.log(recipe);
    });
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
      }
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
};

// Will get location based on IP from ipapi API -> will pass lat & lon to mapbox for suggestions
function requestLocation() {
  fetch(`https://ipapi.co/json/`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      console.log(`User Location- Lat: ${data.latitude}, Lon: ${data.longitude}`);
      requestMapBox(data.latitude, data.longitude);
    });
};

requestEdamam();
requestLocation();
randomRecipe();