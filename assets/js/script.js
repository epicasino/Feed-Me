const edamam = {
  appId: `80462c21`,
  appKey: `eac2e3b0f2d31655e1c3859e895185e6`,
};
const mapBox = {
  token: `pk.eyJ1IjoiN2VsZXZlbm1hbmdvIiwiYSI6ImNsaWtzYjJyYjBpZzMzcXF2ejNhMzRmdHQifQ._6f_pe90uNU8Kf3uDuLbfQ`,
};

const query = {
  diet: ``,
  healthLabel: ``,
  cuisine: ``,
  mealTime: ``,
  calories: ``,
  excluded: ``,
  search: `American`,
  time: ``,
};

// https://developer.edamam.com/edamam-docs-recipe-api#/ API Reference for edamam
// https://docs.mapbox.com/playground/search-box/?q=Starbucks&language=en&session_token=0be1d0ab-b318-4ce1-8889-299c9730f4d0 API Reference for mapbox

// Will get recipes based on query variable
function request() {
  fetch(
    `https://api.edamam.com/api/recipes/v2?type=public&q=${query.search}&cuisine=${query.cuisine}&app_id=${edamam.appId}&app_key=${edamam.appKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
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

request();
requestLocation();
