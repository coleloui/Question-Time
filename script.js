var body = document.body;
var timerEl = document.getElementById("countdown");
var start = document.getElementById("start");
var firstEl = document.getElementById("begin");
var view = document.getElementById("view");
var container = document.getElementById("container");
var questionEl = document.getElementById("question");
var answersEl = document.querySelectorAll(".answer");
var answer1El = document.getElementById("answer1");
var answer2El = document.getElementById("answer2");
var answer3El = document.getElementById("answer3");
var answer4El = document.getElementById("answer4");
var scoreScreen = document.getElementById("scorescreen");
var result = document.getElementById("result");
var tryAgain = document.getElementById("tryagain");
var userInput = document.getElementById("userText");
var placeForm = document.getElementById("place");
var finisherList = document.getElementById("finishers");
var clear = document.getElementById("clear");
var timerInterval;
var timeLeft = 60;
var counter = 0;
var correct = 0;
var incorrect = 0;
var finishers = [];

container.style.display = "none";
scoreScreen.style.display = "none";

questArray = [
  {
    question: "Who was the first player drafted by the Lightning?",
    answer1: "Roman Hamrlik",
    answer2: "John Snow",
    answer3: "Dino Ciccarelli",
    answer4: "Chris Gratton",
    correct: "Roman Hamrlik",
  },
  {
    question: "Where did the Lightining first play?",
    answer1: "Amalie Arena",
    answer2: "Thunderdome",
    answer3: "Raymond James Stadium",
    answer4: "Florida State Fairgrounds",
    correct: "Florida State Fairgrounds",
  },
  {
    question: "What year did the Lightning win the Stanley Cup?",
    answer1: "They have yet to win the best trophy in professions sports",
    answer2: "1999",
    answer3: "2004",
    answer4: "2014",
    correct: "2004",
  },
  {
    question: "Who is the all time leading Goal scorer for the Lightning?",
    answer1: "Vincent Lecavalier",
    answer2: "Nikita Kucherov",
    answer3: "Steven Stamkos",
    answer4: "Martin St.Louis",
    correct: "Steven Stamkos",
  },
  {
    question: "What goaltender has the most Shutouts in Lightning history?",
    answer1: "Ben Bishop",
    answer2: "Nikolai Khabibulin",
    answer3: "Daren Puppa",
    answer4: "Andrei Vasilevski",
    correct: "Andrei Vasilevski",
  },
];

function renderQuestions() {
  questionEl.textContent = questArray[counter].question;
  answer1El.textContent = questArray[counter].answer1;
  answer2El.textContent = questArray[counter].answer2;
  answer3El.textContent = questArray[counter].answer3;
  answer4El.textContent = questArray[counter].answer4;
}

function timer() {
  timerInterval = setInterval(function () {
    timerEl.textContent = timeLeft + " seconds remaining";
    timeLeft--;

    if (correct == 0 && incorrect == 0 && timeLeft <= -2) {
      alert("You must answer at least one question.");
      clearInterval(timerInterval);
      reset();
      screen1();
      starting();
    }

    if (counter > 0 && timeLeft <= -2) {
      timerEl.textContent = "";
      clearInterval(timerInterval);
      screen1();
      score();
      renderScore();
    }
  }, 1000);
}

function handleCorrect() {
  alert("You got the answer correct!");
  correct++;
  counter++;
  checker();
}

function handleIncorrect() {
  alert("You got that answer wrong.");
  incorrect++;
  counter++;
  timeLeft -= 10;
  checker();
}

function checker() {
  if (counter === questArray.length) {
    clearInterval(timerInterval);
    screen1();
    score();
    renderScore();
  } else renderQuestions();
}

function renderScore() {
  var storedFinishers = JSON.parse(localStorage.getItem("finishers"));

  if (storedFinishers !== null) {
    finishers = storedFinishers;
  }
  renderFinishers();
  hello();
}

function renderFinishers() {
  finisherList.innerHTML = "";
  result.textContent =
    "You got " + correct + " correct and " + incorrect + " wrong!";

  for (let x = 0; x < finishers.length; x++) {
    var finisher = finishers[x];

    var li = document.createElement("li");
    li.textContent = finisher;
    finisherList.appendChild(li);
  }
}

function storeFinishers() {
  localStorage.setItem("finishers", JSON.stringify(finishers));
}

function reset() {
  if (
    (timeLeft <= -2,
    counter != 0 || (correct == 0 && incorrect == 0 && timeLeft <= -2))
  ) {
    timeLeft = 60;
    correct = 0;
    incorrect = 0;
    counter = 0;
    clearInterval(timerInterval);
  }
}

function starting() {
  if (firstEl.style.display === "none") {
    firstEl.style.display = "block";
  } else {
    firstEl.style.display = "none";
  }
}

function screen1() {
  if (container.style.display === "none") {
    container.style.display = "block";
  } else {
    container.style.display = "none";
  }
}

function score() {
  if (scoreScreen.style.display === "none") {
    scoreScreen.style.display = "block";
  } else {
    scoreScreen.style.display = "none";
  }
}

start.addEventListener("click", function () {
  timer();
  renderQuestions();
  starting();
  screen1();
  reset();
});

view.addEventListener("click", function () {
  starting();
  score();
});

answersEl.forEach(function (answerEl) {
  answerEl.addEventListener("click", function (event) {
    event.preventDefault();
    if (event.target.textContent === questArray[counter].correct) {
      handleCorrect();
    } else handleIncorrect();
  });
});

placeForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var finalScore = timeLeft + correct;
  var userText = userInput.value;
  var userScore = userText + " - " + finalScore;

  if (userText === "") {
    return;
  }

  if (correct == 0 && incorrect == 0 && timeLeft == 60) {
    return;
  }
  finishers.push(userScore);
  userInput.value = "";

  storeFinishers();
  renderFinishers();
});

clear.addEventListener("click", function (event) {
  event.preventDefault();
  event.stopImmediatePropagation();

  if (event.target.matches("button") === true) {
    finishers = [];
    storeFinishers();
    renderFinishers();
  }
});

tryAgain.addEventListener("click", function (event) {
  event.preventDefault();
  event.stopPropagation();

  if (event.target.matches("button")) {
    score();
    starting();
    reset();
  }
});
