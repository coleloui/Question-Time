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
var timeLeft = 45
var counter = 0
var correct = 0
var incorrect = 0


questArray = [{
    question: "Who was the first player drafted by the Lightning?",
    answer1: "Roman Hamrlik",
    answer2: "John Snow",
    answer3: "Dino Ciccarelli",
    answer4: "Chris Gratton",
    correct: "Roman Hamrlik"
},{
    question: "Where did the Lightining first play?",
    answer1: "Amalie Arena",
    answer2: "Thunderdome",
    answer3: "Raymond James Stadium",
    answer4: "Florida State Fairgrounds",
    correct: "Florida State Fairgrounds"
},{
    question: "What year did the Lightning win the Stanley Cup?",
    answer1: "They have yet to win the best trophy in professions sports",
    answer2: "1999",
    answer3: "2004",
    answer4: "2014",
    correct: "2004"
},{
    question: "Who is the all time leading Goal scorer for the Lightning?",
    answer1: "Vincent Lecavalier",
    answer2: "Nikita Kucherov",
    answer3: "Steven Stamkos",
    answer4: "Martin St.Louis",
    correct: "Steven Stamkos"
},{
    question: "What goaltender has the most Shutouts in Lightning history?",
    answer1: "Ben Bishop",
    answer2: "Nikolai Khabibulin",
    answer3: "Daren Puppa",
    answer4: "Andrei Vasilevski",
    correct: "Andrei Vasilevski"
}]


function renderQuestions() {
    questionEl.textContent = questArray[counter].question
    answer1El.textContent = questArray[counter].answer1
    answer2El.textContent = questArray[counter].answer2
    answer3El.textContent = questArray[counter].answer3
    answer4El.textContent = questArray[counter].answer4
}


function timer() {

        timerInterval = setInterval(function () {
        timerEl.textContent = timeLeft + " seconds remaining";
        timeLeft--;

        if (timeLeft <= -2) {
            timerEl.textContent = "";
            clearInterval(timerInterval);
        }
    }, 1000);
    
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
        timeLeft -= 10
        console.log(timeLeft)
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
        answerEl.addEventListener("click", function(event){
            // clearInterval(timerInterval);
            if(event.target.textContent === questArray[counter].correct){
                handleCorrect()
            } else{
                handleIncorrect()}
        })
    })
}

function starting() {
    if (firstEl.style.display === "none") {
        firstEl.style.display = "block";
    } else {
        firstEl.style.display = "none";
    }
}

start.addEventListener("click", function () {
    renderQuestions()
    starting()
    timer()
})


// starting();