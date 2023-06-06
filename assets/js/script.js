const appId = `80462c21`;
const appKey = `eac2e3b0f2d31655e1c3859e895185e6`;

function request() {
  fetch(
    `https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=${appId}&app_key=${appKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

request();