// Marqueurs de personnalisation (grader)
var playerAlias = "elmnaouriw";
var sessionSeed = "2026-02-24";

// Étape 2 - Données de quiz
var questions = [
  {
    question: "Quel mot clé déclare une variable modifiable ?",
    choices: ["const", "let", "return"],
    answer: "let",
  },
  {
    question: "Quelle méthode attache un événement click ?",
    choices: ["appendChild", "addEventListener", "querySelector"],
    answer: "addEventListener",
  },
  {
    question: "Quelle propriété modifie le texte d'un élément ?",
    choices: ["textContent", "innerWidth", "nodeName"],
    answer: "textContent",
  },
];

// Étape 3 - État du jeu
var currentIndex = 0;
var score = 0;
var hasAnswered = false;

// DOM
var questionText = document.getElementById("questionText");
var scoreText = document.getElementById("scoreText");
var feedbackText = document.getElementById("feedbackText");
var answerButtons = document.querySelectorAll(".answer-btn");
var startBtn = document.getElementById("startBtn");
var nextBtn = document.getElementById("nextBtn");

function resetGame() {
  currentIndex = 0;
  score = 0;
  hasAnswered = false;
}

// Étape 4 - Affichage d'une question
function renderQuestion() {
  var currentQuestion = questions[currentIndex];
  var index;
  var button;

  questionText.textContent = currentQuestion.question;

  for (index = 0; index < answerButtons.length; index = index + 1) {
    button = answerButtons[index];
    button.textContent = currentQuestion.choices[index];
    button.disabled = false; // ✅ réactivation boutons (G3)
    button.style.display = "block";
    button.classList.remove("good");
    button.classList.remove("bad");
  }

  scoreText.textContent = "Score: " + String(score);
  feedbackText.textContent = "";
}

// Étape 5 - Vérification d'une réponse
function checkAnswer(selectedValue, button) {
  var correctAnswer;
  var i;

  if (hasAnswered) return;

  correctAnswer = questions[currentIndex].answer;
  hasAnswered = true;

  if (selectedValue === correctAnswer) {
    score = score + 1;
    button.classList.add("good");
    feedbackText.textContent = "Bonne réponse";
  } else {
    button.classList.add("bad");
    feedbackText.textContent = "Mauvaise réponse. Bonne réponse: " + correctAnswer;
  }

  scoreText.textContent = "Score: " + String(score);

  for (i = 0; i < answerButtons.length; i = i + 1) {
    answerButtons[i].disabled = true; // anti double-clic
  }
}

// Étape 6 - Navigation des questions
function goToNextQuestion() {
  currentIndex = currentIndex + 1;

  if (currentIndex < questions.length) {
    hasAnswered = false;
    renderQuestion();
    return;
  }

  showEndScreen();
}

// Étape 7 - Fin de quiz
function showEndScreen() {
  var i;

  questionText.textContent = "Quiz terminé";
  feedbackText.textContent =
    "Score final: " + String(score) + " / " + String(questions.length);

  for (i = 0; i < answerButtons.length; i = i + 1) {
    answerButtons[i].style.display = "none";
  }

  nextBtn.style.display = "none";
  startBtn.textContent = "Rejouer";
  startBtn.style.display = "inline-block";
}

// Boutons
function startGame() {
  resetGame();
  nextBtn.style.display = "inline-block";
  startBtn.style.display = "inline-block";
  renderQuestion();
}

startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", goToNextQuestion);

// Clics réponses
answerButtons[0].addEventListener("click", function () {
  checkAnswer(answerButtons[0].textContent, answerButtons[0]);
});
answerButtons[1].addEventListener("click", function () {
  checkAnswer(answerButtons[1].textContent, answerButtons[1]);
});
answerButtons[2].addEventListener("click", function () {
  checkAnswer(answerButtons[2].textContent, answerButtons[2]);
});

// État initial
scoreText.textContent = "Score: 0";