$(document).ready(function () {

    class Question {
        constructor(number, question, correctAnswer, wrongAns1, wrongAns2, wrongAns3,) {
            this.number = number;
            this.question = question;
            this.correctAnswer = correctAnswer;
            this.wrongAns1 = wrongAns1;
            this.wrongAns2 = wrongAns2;
            this.wrongAns3 = wrongAns3;
        };
    };
    
    let question1 = new Question(1, "What color is the sky", "blue", "green", "red", "yellow");
    let question2 = new Question(2, "Is the earth flat", "yes", "no", "maybe", "it's a cube");
    let question3 = new Question(3, "another question", "correct", "wrong", "wrong again", "still wrong");

    function displayQuestions() {
        $("#question1").text(question1.question);
        $("#q1correct-text").text(question1.correctAnswer);
        $("#q1wrong1-text").text(question1.wrongAns1);
        $("#q1wrong2-text").text(question1.wrongAns2);
        $("#q1wrong3-text").text(question1.wrongAns3);
        
        $("#question2").text(question2.question);
        $("#q2correct-text").text(question2.correctAnswer);
        $("#q2wrong1-text").text(question2.wrongAns1);
        $("#q2wrong2-text").text(question2.wrongAns2);
        $("#q2wrong3-text").text(question2.wrongAns3);

        $("#question3").text(question3.question);
        $("#q3correct-text").text(question3.correctAnswer);
        $("#q3wrong1-text").text(question3.wrongAns1);
        $("#q3wrong2-text").text(question3.wrongAns2);
        $("#q3wrong3-text").text(question3.wrongAns3);
    };
    
    displayQuestions();


    let intervalId;

    function startTimer() {

        function timer() {
            intervalId = setInterval(count, 1000);
        };

        let counter = 5;
        $("#timer").text(`Time remaining: ${counter}`);

        function count() {
            counter--;
            $("#timer").text(`Time remaining: ${counter}`);
            if (counter === 0) {
                clearInterval(intervalId);                
                $("#timer").text("Time's up!");
                setTimeout(gameEnd, 1000);
            };
        };
        timer();
    };

    startTimer();

  
    //removes question answer text and submit button, 
    //displays correct and wrong answers, and restart button.
    function gameEnd() {
        storeUserValues();
        $("#timer").text("Your results");
        //empty question/answer divs
        $("#question1").empty();
        $("#question1answers").children().css("visibility", "hidden");
        $("#question2").empty();
        $("#question2answers").children().css("visibility", "hidden");
        $("#question3").empty();
        $("#question3answers").children().css("visibility", "hidden");
        //display new divs for correct answer, wrong answer
        $("#question1").text(`Correct: ${correctAnswers} Wrong: ${wrongAnswers}`)
        //display restart button 
        $("#restart").css("visibility", "visible");
        $("#submit").css("visibility", "hidden");
    };


    $("#submit").on("click", event, function() {
        clearInterval(intervalId);
        storeUserValues();
        gameEnd();
    });
    
    
    $("#restart").on("click", event, function() {
        $("#question1answers").children().css("visibility", "visible");
        $("#question2answers").children().css("visibility", "visible");
        $("#question3answers").children().css("visibility", "visible");
        clearInterval(intervalId);
        displayQuestions();
        startTimer();
        $("#restart").css("visibility", "hidden");
        $("#submit").css("visibility", "visible");
        correctAnswers = 0;
        wrongAnswers = 0;
    });

    let correctAnswers = 0;
    let wrongAnswers = 0;

    //puts selected answers into their own variables
    function storeUserValues () {
        let userAnswer1 = getUserValues(question1answers, "q1answers");
        let userAnswer2 = getUserValues(question2answers, "q2answers");
        let userAnswer3 = getUserValues(question3answers, "q3answers");
        console.log(userAnswer1);
        console.log(userAnswer2);
        console.log(userAnswer3);

        if (userAnswer1 === "correct") {
            correctAnswers++;
        } else {
            wrongAnswers++;
        };
        if (userAnswer2 === "correct") {
            correctAnswers++;
        } else {
            wrongAnswers++;
        };
        if (userAnswer3 === "correct") {
            correctAnswers++;
        } else {
            wrongAnswers++;
        };

    }

    //gets the selected answers from the button forms
    function getUserValues(formID, name) {
        let selected;
        let options = formID.elements[name];

        for (let i = 0; i < options.length; i++) {
            if (options[i].checked) {
                selected = options[i].value;
            }
        }
        return selected;
    };

});