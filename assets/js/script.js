
const query = {
  diet: ``,
  excluded: ``,
  mealTime: ``,
  time: ``,
  cuisine: ``,
  calories: ``,
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
    options: ["Tree-Nuts", "Peanuts", "Milk", "None"],
  },
  {
    question: "Mealtime?",
    options: ["Breakfast", "Lunch", "Dinner", "Snack"],
  },
  {
    question: "Prep-time?",
    options: [
      "less than 30 minutes",
      "30-60 minutes",
      "60-90 minutes",
      "more than 90 minutes",
    ],
  },
  {
    question: "Type of Cuisine?",
    options: ["Italian", "American", "Mexican", "Asian"],
  },
  {
    question: "How Many Calories?",
    options: ["50-200", "200-500", "500-800", "more than 800"],
  },
];

// this is set to be our current question index
let currentQuestionIndex = 0; // this will start at diet
// this will update our query - which is
function updateQuery(event) {
  // set the selected option by grabbing the event.target.textContent
  const selectedOption = event.target.textContent;
  // query properties, starts at diet because we set currentquestionindex to 0
  const queryProperties = [
    "diet",
    "excluded",
    "mealTime",
    "time",
    "cuisine",
    "calories",
  ];

  // basically query.diet or query.excluded - wherver you are in the currentquestionindex
  query[queryProperties[currentQuestionIndex]] = selectedOption;
  console.log(query);
  console.log(selectedOption);
  currentQuestionIndex++;
  // conditional that says as long as we still have questions, we will display the next question
  if (currentQuestionIndex < formQuestionsArray.length) {
    displayQuestion(); // displays question
  } else if (currentQuestionIndex == formQuestionsArray.length ) {
    queryFilter();
    optionBoxesEl.setAttribute('style', 'display: none');
    feelingLuckyBtnEl.setAttribute('style', 'display:none')
  };
}
function displayQuestion() {
  // will display questions in order of index position
  const currentQuestion = formQuestionsArray[currentQuestionIndex];
  // we set our html element to the current question
  questionBoxEl.textContent = currentQuestion.question;

  for (let i = 0; i < currentQuestion.options.length; i++) {
    // set the text content of the options
    optionBoxesEl.children[i].textContent = currentQuestion.options[i];
    // listen for lcick
    optionBoxesEl.children[i].addEventListener("click", updateQuery);
  }
}
displayQuestion(); // call our display question function
