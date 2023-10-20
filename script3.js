const questions = [
    {
        question: "Quelle est la méthode d'authentification qui utilise une combinaison de quelque chose que vous savez, quelque chose que vous avez et quelque chose que vous êtes ?",
        answers: [
            { text: "Authentification Multifactorielle (MFA)", correct: true},
            { text: "Authentification unique (SSO)", correct: false},
            { text: "Authentification à deux facteurs", correct: false},
            { text: "Authentification par carte à puce", correct: false},
        ]
    },
    {
        question: " Quel type d’attaque consiste à rediriger le trafic vers un site frauduleux ?",
        answers: [
            { text: "Fishing", correct: false},
            { text: "Social Engineering", correct: false},
            { text: "Pharming", correct: true},
            { text: "Spoofing", correct: false},
        ]
    },
    {
        question: " Quel protocole de chiffrement est généralement utilisé pour sécuriser les connexions Web (HTTPS) ?",
        answers: [
            { text: "TLS/SSL", correct: true},
            { text: "MD5", correct: false},
            { text: "DES", correct: false},
            { text: "RSA", correct: false},
        ]
    },
    {
        question: "Quelle technique de cryptographie est souvent utilisée pour garantir l'intégrité des données en ajoutant une empreinte numérique à un message ??",
        answers: [
            { text: " AES (Advanced Encryption Standard)", correct: false},
            { text: "SHA-256 (Secure Hash Algorithm 256 bits)", correct: true},
            { text: "RSA (Rivest-Shamir-Adleman)", correct: false},
            { text: "HMAC (Hash-based Message Authentication Code)", correct: false},
        ]
    },
    {
        question: " A quoi servent les clés publique et privée dans le RSA ?",
        answers: [
            { text: "Permet d’ouvrir des ports", correct: false},
            { text: "Permet de contrôler un réseau. ", correct: false},
            { text: "Permet de shutdown un ordinateur.	", correct: false},
            { text: "Permet d’assurer la confidentialité et l'authenticité des communications.", correct: true},
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