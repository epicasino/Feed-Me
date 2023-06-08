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

document
  .getElementById("food-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); 

// Store the list of questions
var questions = document.querySelectorAll('.question');
var currentQuestionIndex = 0;

// Function to show the current question
function showCurrentQuestion() {
  questions.forEach(function(question, index) {
    if (index === currentQuestionIndex) {
      question.style.display = 'block';
    } else {
      question.style.display = 'none';
    }
  });
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent form submission

  // Get user inputs
  var allergies = [];
  var checkboxes = document.getElementsByName('allergies');
  checkboxes.forEach(function(checkbox) {
    if (checkbox.checked) {
      allergies.push(checkbox.value);
    }
  });
  var dietRestrictions = document.getElementById('diet').value;
  var mealTime = document.getElementById('meal-time').value;
  var prepTime = document.getElementById('prep-time').value;
  var cuisine = document.getElementById('cuisine').value;

  // Perform decision-making logic
  var result = "Based on your inputs:<br>";
  result += "- Allergies: " + allergies.join(', ') + "<br>";
  result += "- Diet Restrictions: " + dietRestrictions + "<br>";
  result += "- Meal Time: " + mealTime + "<br>";
  result += "- Prep Time: " + prepTime + "<br>";
  result += "- Cuisine: " + cuisine + "<br>";
  result += "<br>Here's a suggestion: [Your suggestion goes here]";

  // Display the result
  document.getElementById('result').innerHTML = result;

  // Move to the next question
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showCurrentQuestion();
  }
}

// Attach event listener to the form submit
document.getElementById('food-form').addEventListener('submit', handleFormSubmit);

// Show the first question initially
showCurrentQuestion();});