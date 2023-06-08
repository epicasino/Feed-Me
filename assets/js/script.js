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

var formEl = document.getElementById("food-form")
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
      var cuisine = document.querySelector(
        'input[name="cuisine"]:checked'
      ).value;

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
  }
);
