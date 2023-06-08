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
  healthLabel: `kosher`,
  cuisine: `american`,
  mealTime: ``,
  calories: ``,
  excluded: ``,
  // search: `Chicken`,
  time: ``,
};

const questionBoxEl = document.querySelector(".question-box");
const optionBoxesEl = document.querySelector(".option-boxes");

// Array for the form questions for recipe searcher api
const formQuestionsArray = [
  {
    question: `Dietary Preferences?`,
    options: [`Vegan`, `Keto-Friendly`, `Vegetarian`, `None`],
  },
  {
    question: `Allergies?`,
    // continue form array to have all questions in issues on github
  },
];

function FirstQuestion() {
  // Makes question text the first question in array
  questionBoxEl.textContent = formQuestionsArray[0].question;
  // For loop assigns option array from formQuestionsArray to the four option boxes
  for (i = 0; i < formQuestionsArray[0].options.length; i++) {
    //
    optionBoxesEl.children[i].textContent = formQuestionsArray[0].options[i];

    // WOULDNT RECOMMEND. But if you want to, here's a boilerplate for checkbox.

    // const checkBoxEl = document.createElement('input');
    // checkBoxEl.setAttribute('type', 'checkbox');
    // checkBoxEl.setAttribute('name', 'options')
    // const labelEl = document.createElement('label');
    // labelEl.setAttribute('for', 'options');
    // labelEl.textContent = formQuestionsArray[0].options[i];
    // optionBoxesEl.appendChild(checkBoxEl);
    // optionBoxesEl.appendChild(labelEl);
  }
}

FirstQuestion();

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
      resultsCard(results);
    });
}

// gets the content-box class element from html
const contentBoxEl = document.querySelector(".content-box");

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
    cardBoxEl.setAttribute("class", "card column is-3");

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
    const cardMediaTitleEl = document.createElement("p");
    cardMediaTitleEl.setAttribute("class", "title is-4");

    // placeholder text (will be populated) inside of cardBoxEl div container
    const cardContentEl = document.createElement("div");
    cardContentEl.setAttribute("class", "content");

    // textcontent for above text
    cardMediaTitleEl.textContent = results.recipes[i].name;
    cardContentEl.textContent = `placeholder`;

    // appends child elements to parent elements, and those parent elements are children to cardsContainerEl parent element
    cardImgFigureEl.appendChild(cardImgEl);
    cardImgDivEl.appendChild(cardImgFigureEl);
    cardBoxEl.appendChild(cardImgDivEl);

    cardMediaEl.appendChild(cardMediaTitleEl);
    cardBoxEl.appendChild(cardMediaEl);

    cardBoxEl.appendChild(cardContentEl);

    cardsContainerEl.appendChild(cardBoxEl);
  }
}

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
      console.log(`Random Recipe:`);
      console.log(recipe);
    });
}

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
        }
      }
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

requestEdamam();
requestLocation();
randomRecipe();

var formEl = document.getElementById("food-form");
formEl.addEventListener("submit", function (event) {
  event.preventDefault();

  // Store the list of questions
  var questions = document.querySelectorAll(".question");
  var currentQuestionIndex = 0;

  // Function to show the current question
  function showCurrentQuestion() {
    for (var i = 0; i < questions.length; i++) {
      var question = questions[i];
      if (i === currentQuestionIndex) {
        question.style.display = "block";
      } else {
        question.style.display = "none";
      }
    }
  }

  // Function to handle form submission
  function handleFormSubmit(event) {
    event.preventDefault(); // Prevent form submission

    // Get user inputs
    var allergies = [];
    var checkboxes = document.getElementsByName("allergies");
    for (var i = 0; i < checkboxes.length; i++) {
      var checkbox = checkboxes[i];
      if (checkbox.checked) {
        allergies.push(checkbox.value);
      }
    }
    var dietRestrictions = document.querySelector(
      'input[name="restrictions"]:checked'
    ).value;
    var mealTime = document.querySelector(
      'input[name="meal-time"]:checked'
    ).value;
    var prepTime = document.querySelector(
      'input[name="prep-time"]:checked'
    ).value;
    var cuisine = document.querySelector('input[name="cuisine"]:checked').value;

    // Perform decision-making logic
    var result = "Based on your inputs:<br>";
    result += "- Allergies: " + allergies.join(", ") + "<br>";
    result += "- Diet Restrictions: " + dietRestrictions + "<br>";
    result += "- Meal Time: " + mealTime + "<br>";
    result += "- Prep Time: " + prepTime + "<br>";
    result += "- Cuisine: " + cuisine + "<br>";
    result += "<br>Here's a suggestion: [Your suggestion goes here]";

    // Display the result
    document.getElementById("result").innerHTML = result;

    // Move to the next question
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showCurrentQuestion();
    }
  }

  // Attach event listener to the form submit
  document
    .getElementById("food-form")
    .addEventListener("submit", handleFormSubmit);

  // Show the first question initially
  showCurrentQuestion();
});
