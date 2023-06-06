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
  search: `chicken`,
  time: ``,
};
// https://developer.edamam.com/edamam-docs-recipe-api#/ API Reference for edamam
// https://docs.mapbox.com/playground/search-box/?q=Starbucks&language=en&session_token=0be1d0ab-b318-4ce1-8889-299c9730f4d0 API Reference for mapbox

function request() {
  fetch(
    `https://api.edamam.com/api/recipes/v2?type=public&q=${query.search}&cuisine=${query.cuisine}&app_id=${edamam.appId}&app_key=${edamam.appKey}`
  )
    .then( function (response) {
      return response.json();
    })
    .then( function (data) {
      console.log(data);
    });
};

function requestMapBox() {
  fetch(
    `https://api.mapbox.com/search/searchbox/v1/suggest?q=${query.search}&language=en&session_token=0be1d0ab-b318-4ce1-8889-299c9730f4d0&access_token=${mapBox.token}`
  )
    .then( function (response) {
      return response.json();
    })
    .then ( function (data) {
      console.log(data);
    });
};



request();
requestMapBox();