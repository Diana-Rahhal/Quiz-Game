let chosenLevel = sessionStorage.getItem('level') || 'Easy';
let questionHTML = document.querySelector(".question");
let choicesHTML = document.querySelector(".choices");
let timerHTML = document.querySelector(".timer");
let remainingQuestionsHTML = document.querySelector(".remainingQuestions");
let nextButton = document.querySelector(".footer button");
let footerHTML = document.querySelector(".footer");




let questions ={};
let questionsIndex=0;
sessionStorage.setItem("score",0);
let timer;
let timeLeft = 20;
let quizEnded = false;
let remainingQuestions;
let chosenAnswer='';

nextButton.addEventListener('click' , ()=>{assistAnswer()});




console.log(chosenLevel);

// fetch data from json

async function fetchQuestions() {
    try {
        const response = await fetch("data.json");
        const data = await response.json();
        console.log(data)
        questions = data.levels[chosenLevel].questions;
        remainingQuestions = questions.length;
        console.log(remainingQuestions)
        lunchQuiz();
        console.log(questions);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
fetchQuestions();

function lunchQuiz(){
    showQuestion();
    showSettings();
    startTimer();
}

function startTimer() {
    clearInterval(timer);
    timeLeft = 20;
    timerHTML.innerHTML = `${timeLeft} s`;
    
    timer = setInterval(() => {
        timeLeft--;
        timerHTML.innerHTML = `${timeLeft} s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            if(chosenAnswer == ''){endQuiz()}
            else{assistAnswer()}

        }
    }, 1000);
}

function showQuestion()
{
    if(timeLeft<=0 || questionsIndex >= questions.length){
        endQuiz();
        return;
    }
    questionHTML.innerHTML = questions[questionsIndex].question;

    let correctAnswer = questions[questionsIndex].answer;
    

    questions[questionsIndex].options.forEach(element => {
        let choice = document.createElement("div");
        choicesHTML.appendChild(choice);
        choice.innerHTML=element;
        if(element == correctAnswer){choice.classList.add("correct")}
        choice.addEventListener('click' , ()=>{addChosenAnswer(choice)})
        
    });
  
}

function showSettings(){

    remainingQuestionsHTML.innerHTML = `${remainingQuestions} Questions Left`;
}

function addChosenAnswer(choice){
        // loop over old chosen choices 
        // remove chosen class name if any 
        // add chosen class name to choice 
        let oldChosenDiv = document.querySelectorAll(".choices div.chosen");
        if(oldChosenDiv.length != 0){
            oldChosenDiv.forEach(element =>{element.classList.remove("chosen")})
        }

        choice.classList.add("chosen");
        chosenAnswer=choice;
        console.log(chosenAnswer)
        
}




function assistAnswer(){

    
    if(timeLeft<=0 || questionsIndex >= questions.length){
        endQuiz();
    }

    // if user clicked next without choosing an answer , alert 

    if (chosenAnswer =='') {
        alert("Please select an answer before proceeding.");
        return;
    }
    // make correct answer green 
    let CorrectchoicesDiv = document.querySelector(".choices div.correct");
    CorrectchoicesDiv.style.backgroundColor = "green";

   
    // if chosen answer != correct anwer , make it red 
    if(chosenAnswer.innerHTML != CorrectchoicesDiv.innerHTML){
        chosenAnswer.style.backgroundColor="red";
    }else{
        let temp = +sessionStorage.getItem("score")+10;
        sessionStorage.setItem("score",temp);
    }


    // increment question index 
    questionsIndex++;

    // decrement remaining questions
    remainingQuestions --;


    // empty choices div 
    //go to the next question  ( class show question fn )

    setTimeout(() => {
        choicesHTML.innerHTML="";
        showQuestion();
    }, 500);

    

    // empty chosen answer before recheking 
    chosenAnswer='';


   
}

function endQuiz(){
    footerHTML.innerHTML="";
    questionHTML.innerHTML="";
    choicesHTML.innerHTML="";

    let temp = sessionStorage.getItem("score");
    if(temp < 20){
        questionHTML.innerHTML = `Score: ${temp}<br> Hard Luck \u{1F623}`;

    }
    else{
        questionHTML.innerHTML = `Score: ${temp} <br> 🎉 Congratulations! You nailed it! 🏆🔥`;

    }
    let playAgainButton = document.createElement("div");
    playAgainButton.innerHTML="Play Again !"
    choicesHTML.appendChild(playAgainButton);
    playAgainButton.addEventListener('click', ()=>{window.location.href="index.html"})
}

