var body = document.body;
var timerEl = document.getElementById("countdown");
var start = document.getElementById("start");
var firstEl = document.getElementById("begin");
var questionEl = document.getElementById("question")
var answersEl = document.querySelectorAll(".answer")
var answer1El = document.getElementById("answer1")
var answer2El = document.getElementById("answer2")
var answer3El = document.getElementById("answer3")
var answer4El = document.getElementById("answer4")
var timerInterval
var counter = 0
var correct = 0
var incorrect = 0


questArray = [{
    question: "Who was the first player drafted by the Lightning",
    answer1: "Roman Hamrlik",
    answer2: "John Snow",
    answer3: "Dino Ciccarelli",
    answer4: "Chris Gratton",
    correct: "Roman Hamerlick"
},{
    question: "Where did the Lightining first play",
    answer1: "Amalie Arena",
    answer2: "Thunderdome",
    answer3: "Raymond James Stadium",
    answer4: "Florida State Fairgrounds",
    correct: "Florida State Fairgrounds"
},{
    question: "What year did the Lightning win the Stanley Cup",
    answer1: "They have yet to win the best trophy in professions sports",
    answer2: "1999",
    answer3: "2004",
    answer4: "2014",
    correct: "2004"
},{
    question: "Where did the Lightining first play",
    answer1: "Amalie Arena",
    answer2: "Thunderdome",
    answer3: "Raymond James Stadium",
    answer4: "Florida State Fairgrounds",
    correct: "Florida State Fairgrounds"
},{
    question: "Where did the Lightining first play",
    answer1: "Amalie Arena",
    answer2: "Thunderdome",
    answer3: "Raymond James Stadium",
    answer4: "Florida State Fairgrounds",
    correct: "Florida State Fairgrounds"
}]


function renderQuestions() {
    questionEl.textContent = questArray[counter].question
    answer1El.textContent = questArray[counter].answer1
    answer2El.textContent = questArray[counter].answer2
    answer3El.textContent = questArray[counter].answer3
    answer4El.textContent = questArray[counter].answer4
    timer()
}


function timer() {
    var timeLeft = 15

        timerInterval = setInterval(function () {
        timerEl.textContent = timeLeft + " seconds remaining";
        timeLeft--;

        if (timeLeft === -1) {
            timerEl.textContent = "";
            clearInterval(timerInterval);
        }
    }, 1000);
}

function starting() {
    if (firstEl.style.display === "none") {
        firstEl.style.display = "block";
    } else {
        firstEl.style.display = "none";
    }
}

function handleCorrect(){
    console.log("you guessed correct")
    correct++
    counter++
    checker()
}

function handleIncorrect(){
    console.log("you guessed incorrect")
    incorrect++
    counter++
    checker()
}

function checker(){
    if(counter === questArray.length){
        alert("game over")
    }else{
        renderQuestions()
        // end screen
    }
}


answersEl.forEach(function(answerEl){
    // console.log(answerEl)
    answerEl.addEventListener("click", function(event){
        clearInterval(timerInterval);
        // console.log(event.target.textContent)
        // console.log(questArray[counter].correct)
        if(event.target.textContent === questArray[counter].correct){
            handleCorrect()
        } else{
            handleIncorrect()}
    })
})



start.addEventListener("click", function () {
    renderQuestions()
    starting()
})

// starting();