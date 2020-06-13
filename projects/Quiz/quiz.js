const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

let questions = [
    {
        question: "Which pf them is not a frameWork?",
        imgSrc: "img/html.png",
        choiceA: "Angular",
        choiceB: "Spring",
        choiceC: "Ruby",
        correct: "C"
    },
    {
        question: "An object is store in?",
        imgSrc: "img/css.png",
        choiceA: "Local Memory",
        choiceB: "Heap",
        choiceC: "HardDrive",
        correct: "B"
    },
    {
        question: "How many queues required to use it as a Stack",
        imgSrc: "img/js.png",
        choiceA: "2",
        choiceB: "3",
        choiceC: "1",
        correct: "A"
    },        
    {
        question: "Language used for Competetive programming",
        imgSrc: "img/3.png",
        choiceA: "Python",
        choiceB: "Java",
        choiceC: "C/C++",
        correct: "C"
    }    
];

// Variables
const lastQuestion = questions.length-1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10;
const guageWidth = 150;
const guageUnit = guageWidth/questionTime;
let TIMER;
let score = 0;

start.addEventListener("click",startQuiz);

//Start Quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000);
}

//render a question
function renderQuestion(){
    let q = questions[runningQuestion];

    question.innerHTML = "<p>"+ q.question +"<p>";
    qImg.innerHTML = "<image src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

//Render Progress
function renderProgress(){
    for(let qIndex=0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+qIndex+"><div>";
    }
}

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * guageUnit +"px";
        count++;
    }else{
        count = 0;
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

function checkAnswer(answer){
    if(answer == questions[runningQuestion].correct){
        score++;
        answerIsCorrect();
    }else{
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        clearInterval(TIMER);
        scoreRender();
    }
}

function answerIsCorrect(){
    document.getElementById(runningQuestion).style.background = "#0f0";
}

function answerIsWrong(){
    document.getElementById(runningQuestion).style.background = "#f00";
}

function scoreRender(){
    scoreDiv.style.display = "block";

    const scorePerCent = Math.round(100*score/questions.length);
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    scoreDiv.innerHTML = "<img scr = "+ img +">";
    scoreDiv.innerHTML += "<p>"+scorePerCent+"%</p>"
}
