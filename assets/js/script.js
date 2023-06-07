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
  cuisine: `Italian`,
  mealTime: ``,
  calories: ``,
  excluded: ``,
  // search: `Chicken`,
  time: ``,
};

// https://developer.edamam.com/edamam-docs-recipe-api#/ API Reference for edamam
// https://docs.mapbox.com/playground/search-box/?q=Starbucks&language=en&session_token=0be1d0ab-b318-4ce1-8889-299c9730f4d0 API Reference for mapbox

// Will get recipes based on query variable
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
}

// Will make location suggestions based on user's lat & lon
function requestMapBox(lat, lon) {
  fetch(
    `https://api.mapbox.com/search/searchbox/v1/suggest?q=${query.search}&language=en&proximity=${lon},${lat}&session_token=4f1f177e-055c-11ee-a904-2eb5a363657c&access_token=${mapBox.token}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

// Will get location based on IP from ipapi API -> will pass lat & lon to mapbox for suggestions
function requestLocation() {
  fetch(`https://ipapi.co/json/`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(`Lat: ${data.latitude}, Lon: ${data.longitude}`);
      requestMapBox(data.latitude, data.longitude);
    });
}

requestEdamam();
requestLocation();
