const questions = [
    {
        question: "Quel protocol permet de nous reconnaître auprès d'un serveur ?",
        answers: [
            { text: "Un Os", correct: true},
            { text: "L’adresse IP", correct: false},
            { text: "“J'avais une réservation au nom de Dupont”", correct: false},
            { text: "Une Backup", correct: false},
        ]
    },
    {
        question: "Quelles pratiques ne sont pas des Cyberattaques ?",
        answers: [
            { text: "KeyLogger", correct: false},
            { text: "Firewall", correct: true},
            { text: "Ransomware", correct: false},
            { text: "Spyware", correct: false},
        ]
    },
    {
        question: "Que signifie l’acronyme “RGPD”?",
        answers: [
            { text: "Règlement général du Pouvoir et de la Défense", correct: true},
            { text: "Régulation Générale des Pingouins et Dauphins ", correct: false},
            { text: "Règlement Général de la protection des Données", correct: false},
            { text: "Règlement Général du Pouvoir D’achat ", correct: false},
        ]
    },
    {
        question: "Que signifie l'acronyme VPN en cybersécurité ?",
        answers: [
            { text: "Virtual Private Network (Réseau Virutal Privé)", correct: true},
            { text: "Very Private Network (Réseau Très Privé)", correct: false},
            { text: "Virtual Public Network (Réseau Virtuel Public)", correct: false},
            { text: "Very Public Network (Réseau Très Public)", correct: false},
        ]
    },
    {
        question: "Quel est le terme utilisé pour décrire une technique qui consiste à collecter des informations sensibles en surveillant le trafic réseau, généralement au sein d'un réseau local (LAN) ?",
        answers: [
            { text: "Sniffing", correct: false},
            { text: "Hacking", correct: false},
            { text: "Spoofing", correct: false},
            { text: "Brute force", correct: true},
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