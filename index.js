let score = 0;
let questionNumber = 0;

//html for the question
function generateQuestion() {
    if (questionNumber < STORE.length) {
        return `<div class='question-${questionNumber}'>
            <h2>${STORE[questionNumber].question}</h2>
            <form>
                <fieldset>
                        <label class='answerChoice'>
                            <input type='radio' value='${STORE[questionNumber].choices[0]}' name='choice' required>
                            <span>${STORE[questionNumber].choices[0]}</span>
                        </label>
                        <label class='answerChoice'>
                            <input type='radio' value='${STORE[questionNumber].choices[1]}' name='choice' required>
                            <span>${STORE[questionNumber].choices[1]}</span>
                        </label>
                        <label class='answerChoice'>
                            <input type='radio' value='${STORE[questionNumber].choices[2]}' name='choice' required>
                            <span>${STORE[questionNumber].choices[2]}</span>
                        </label>
                        <label class='answerChoice'>
                            <input type='radio' value='${STORE[questionNumber].choices[3]}' name='choice' required>
                            <span>${STORE[questionNumber].choices[3]}</span>
                        </label>
                    <button type='submit' id='submitButton'>Check Your Answer</button>
                    </fieldset>
            </form>
        </div>`;
            } else {
                showResults();
                restartQuiz();
                $('.questionNumber').text(5)
    }
}



//updates the question number
function updateQuestionNumber() {
    questionNumber++;
    $('.questionNumber').text(questionNumber + 1);
}

//updates the score number
function updateScore() {
    score++;
    $('.scoreNumber').text(score)
}

//once the 'start' button is pressed 
function beginQuiz() {
    $('.startQuiz').on('click', '#startButton', function (event) {
        $('.startQuiz').remove();
        $('.questionForm').show()
        $('.questionNumber').text(1);
    })
}

//show question for the user
function showQuestion() {
    $('.questionForm').html(generateQuestion());
}

//feedback for the answer choice selected by the user
function selectedAnswer() {
    $('form').on('submit', function (event) {
        event.preventDefault();
        let selected = $('input:checked');
        let choice = selected.val();
        let answer = `${STORE[questionNumber].answer}`;
        if (choice === answer) {
            correctChoice();
            selected.parent().addClass('correct');
        } else {
            incorrectChoice();
            selected.parent().addClass('incorrect');
        }
    });
}

function correctChoice() {
    userPickedCorrectAnswer();
    updateScore();
}

function incorrectChoice() {
    userPickedIncorrectAnswer();
}

//if the correct answer is chosen by the user this function will give feedback and update the score
function userPickedCorrectAnswer() {
    let answer = `${STORE[questionNumber].answer}`;
    $('.questionForm').html(`<div>
    <img src='Images/smart dog.jpg' class='smart-dog' alt='picture of a dog wearing glasses'>
    <p class='correct'>That is Correct!</p>
    </div>
    <button type='button' id='nextButton'>Next>></button>`);
}

//if the wrong answer is chosen by the user this function will give feedback and display the correct answer
function userPickedIncorrectAnswer() {
    let answer = `${STORE[questionNumber].answer}`;
    $('.questionForm').html(`<div>
    <img src='Images/sad dog.jpg' class= 'sad-dog' alt='picture of a sad dog'>
    <p class='incorrect'>Not Quite...<br>The Correct Answer is: <span>'${answer}'</span></p>
    </div>
    <button type='button' id='nextButton'>Next>></button>`);
}

//brings up the next question for the user
function showNextQuestion() {

    $('main').on('click', '#nextButton', function (event) {
        updateQuestionNumber();
        showQuestion();
        selectedAnswer();
    });
}


//once the user has answered all the questions this function will show their final score and display a restart button
function showResults() {
    $('.questionForm').html(`<div>
        <p class='resultsFeedback'>Your Final Score is: ${score}/5</p>
        <button type='button' id='restartButton'>Restart Quiz</button>
        </div>`);
}

//brings the user back to the start quiz screen
function restartQuiz() {
    $('main').on('click', '#restartButton', function (event) {
        location.reload();
    })
}







function makeQuiz() {
    beginQuiz();
    showQuestion();
    selectedAnswer();
    showNextQuestion();
}


$(makeQuiz)

