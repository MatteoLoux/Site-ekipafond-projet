const questions = [
    {
        question: "A quoi sert l'A2F ?",
        answers: [
            { text: "A sécuriser la connexion à un service", correct: true},
            { text: "A crypter des informations", correct: false},
            { text: "A avoir des réductions au mcdo", correct: false},
            { text: "A apporter des précisions sur des données", correct: false},
        ]
    },
    {
        question: "Quelles pratiques ne sont pas des Cyberattaques ?",
        answers: [
            { text: "Brute force", correct: false},
            { text: "Malware", correct: false},
            { text: "BlackList", correct: true},
            { text: "Intrusion", correct: false},
        ]
    },
    {
        question: "Quel mot de passe est le plus sécurisé ?",
        answers: [
            { text: "Au moins 10 caractères avec des caractères spéciaux et des chiffres", correct: true},
            { text: "Ma date de naissance", correct: false},
            { text: "Une suite de lettres ou de nombres", correct: false},
            { text: "Le prénom de mon père", correct: false},
        ]
    },
    {
        question: "Est-il risqué d’utiliser un Wi-Fi public gratuit ?",
        answers: [
            { text: "Ça dépend du téléphone", correct: false},
            { text: "Oui!", correct: true},
            { text: "Pas du tout, sinon on appellerait ça un non-fi", correct: false},
            { text: "Ça dépend de l’endroit", correct: false},
        ]
    },
    {
        question: "Quel outil nous permet de nous sécurisé sur internet ?",
        answers: [
            { text: "Un ordinateur puissant", correct: false},
            { text: "Il faut sécuriser avec le cadenas ", correct: false},
            { text: "Un URL", correct: false},
            { text: "Un VPN", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

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

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}

function showScore(){
    resetState();
    questionElement.innerHTML = `Votre score est de ${score} sur ${questions.length}!`;
    nextButton.innerHTML ="Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();