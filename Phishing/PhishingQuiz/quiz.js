const questions = [
    {
      questionText: "Which is true about Phishing?",
      answers: [
        {text: "It's Great", correct: false},
        {text: "It's legal", correct: false},
        {text: "It's illegal", correct: true},
        {text: "It's expensive", correct: false},
      ]  
    }, 
    {
        questionText: "If you fall for a phishing scam, what should you do to limit the damage?",
      answers: [
        {text: "Delete the phishing email.", correct: false},
        {text: "Change any compromised passwords.", correct: true},
        {text: "Unplug the computer. This will get rid of any malware.", correct: false},
        {text: "Nothing", correct: false},
      ]   
    }
]; //The above code is where I create and add the questions. 

//This is selecting the HTML elements
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextbutton = document.getElementById("next-button");

//These variables, keep track of the users current progress and position in the quiz 
let currentQuestionIndex = 0;
let score = 0;

//This function starts the quiz and also resets the question index and score.
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextbutton.innerHTML = "Next";
    showQuestion();
}
//This function displays the current question with the four listed answers
function showQuestion(){
    resetState(); //This clears any previous answers and also hides the 'next button'.
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.questionText;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){ // This function clears the previous question answers and hides the 'next' button.
    nextbutton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target; //This gets the clicked button from the html element.
    const isCorrect = selectedBtn.dataset.correct === "true"; //this checks if the answer selected is correct
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++; //increases the overall score if the button selected is correct.
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextbutton.style.display = "block"; //this shows the 'next' button.
    }

function showScore(){ //this shows the final score at the end of the quiz.
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextbutton.innerHTML = "Play Again";
    nextbutton.style.display = "block"; //this changes the css style of the nextbutton to make it visible and shows the 'play again' button
}

    function handleNextButton(){  //this is triggered when the 'next' button  is clicked.
        currentQuestionIndex++; //this increments the question index, moving from question to question.
        if (currentQuestionIndex < questions.length){  //if the index is less than the size of the questions array, it means there are more questions to follow. So it calls the showQuestion function
            showQuestion();

        }else{ // If the index is not less than the question array it calls the show score function.
            showScore();
        }
    }

    nextbutton.addEventListener("click", ()=>{  //if the index is less than the question array it calls the nextbutton function
        if(currentQuestionIndex < questions.length){
            handleNextButton();
        }else{ //if false it restarts the quiz
                startQuiz();
            }
        
    })

startQuiz(); //starts the quiz