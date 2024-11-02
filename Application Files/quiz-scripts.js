const startBtn = document.querySelector(".start-button");
const popupinfo = document.querySelector(".poup-info");
const exitBtn = document.querySelector(".exit");
const mainBtn = document.querySelector(".clas");
const continueBtn = document.querySelector(".agree");
const quizsection = document.querySelector(".quiz-section");
const quizbox = document.querySelector(".quiz-box");
const resultbox = document.querySelector(".result-box");
const tryagain = document.querySelector(".tryagainbtn");
const homebtn = document.querySelector(".hom");
const nextbtn = document.querySelector(".next-btn");
const optionlist = document.querySelector(".option-list");

let questioncount = 0;
let questionnum = 1;
let userscore = 0;
let tabSwitchCount = 0;

// Event listener for tab switching
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    tabSwitchCount++;
  }

  if (tabSwitchCount === 2) {
    resetQuiz();
    // You can add any logic you want to show a message before redirecting
  }
});

function resetQuiz() {
  quizsection.classList.remove("active");
  resultbox.classList.remove("active");
  quizbox.classList.remove("active");
  
  // Reset the quiz state
  questioncount = 0;
  questionnum = 1;
  userscore = 0;

  // Show the main page (dashboard)
  popupinfo.classList.add("active");
  mainBtn.classList.add("active");

  // Reset tab switch count
  tabSwitchCount = 0;
}

// Start button click event
startBtn.onclick = () => {
  popupinfo.classList.add("active");
  mainBtn.classList.add("active");
};

// Exit button click event
exitBtn.onclick = () => {
  popupinfo.classList.remove("active");
  mainBtn.classList.remove("active");
};

// Continue button click event
continueBtn.onclick = () => {
  shuffleQuestions(questions);

  quizsection.classList.add("active");
  popupinfo.classList.remove("active");
  mainBtn.classList.remove("active");
  quizbox.classList.add("active");

  showquestions(0);
  questioncounter(1);
  headerscore();
};

// Try Again button click event
tryagain.onclick = () => {
  quizbox.classList.add("active");
  resultbox.classList.remove("active");
  nextbtn.classList.remove("active");
  questioncount = 0;
  questionnum = 1;
  userscore = 0;
  shuffleQuestions(questions); // Shuffle again for a fresh attempt
  showquestions(questioncount);
  questioncounter(questionnum);
  headerscore();
};

// Home button click event
homebtn.onclick = () => {
  resetQuiz();
};

// Next button click event
nextbtn.onclick = () => {
  if (questioncount < questions.length - 1) {
    questioncount++;
    showquestions(questioncount);
    questionnum++;
    questioncounter(questionnum);
    nextbtn.classList.remove("active");
  } else {
    showresultbox();
  }
};

// Shuffling questions array
function shuffleQuestions(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

// Getting questions and options from array
function showquestions(index) {
  const questiontext = document.querySelector(".question-text");
  questiontext.textContent = `${questions[index].numb}. ${questions[index].question}`;

  let optiontag = `
    <div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]}</span></div>
    <div class="option"><span>${questions[index].options[2]}</span></div>
    <div class="option"><span>${questions[index].options[3]}</span></div>`;
  
  optionlist.innerHTML = optiontag;

  const option = document.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionselected(this)");
  }
}

// Option selection and scoring
function optionselected(answer) {
  let useranswer = answer.textContent;
  let correctanswer = questions[questioncount].answer;

  let alloptions = optionlist.children.length;
  if (useranswer === correctanswer) {
    answer.classList.add("correct");
    userscore += 1;
    headerscore();
  } else {
    answer.classList.add("incorrect");

    for (let i = 0; i < alloptions; i++) {
      if (optionlist.children[i].textContent === correctanswer) {
        optionlist.children[i].setAttribute("class", "option correct");
      }
    }
  }
  for (let i = 0; i < alloptions; i++) {
    optionlist.children[i].classList.add("disabled");
  }

  nextbtn.classList.add("active");
}

// Update question counter
function questioncounter(index) {
  const questiontotal = document.querySelector(".quiz-total");
  questiontotal.textContent = `${index} of ${questions.length} questions`;
}

// Update header score
function headerscore() {
  const headerscoretext = document.querySelector(".header-score");
  headerscoretext.textContent = `Score: ${userscore} / ${questions.length}`;
}

// Show results
function showresultbox() {
  quizbox.classList.remove("active");
  resultbox.classList.add("active");

  const scoretext = document.querySelector(".score-text");
  scoretext.textContent = `Your Score ${userscore} out of ${questions.length}`;

  const circularprogress = document.querySelector(".circular-progress");
  const progressvalue = document.querySelector(".progress-value");

  let progressstratvalue = -1;
  let progressendvalue = (userscore / questions.length) * 100;
  let speed = 20;

  let progress = setInterval(() => {
    progressstratvalue++;
    progressvalue.textContent = `${progressstratvalue}%`;
    circularprogress.style.background = `conic-gradient(#00a63d ${progressstratvalue * 3.6}deg, rgba(255, 255, 255, 0.1) 0deg)`;
    if (progressstratvalue === progressendvalue) {
      clearInterval(progress);
    }
  }, speed);

  // Show the badge if the score is 10/10
  if (userscore === 10) {
    document.getElementById("perfect-score-badge").style.display = "block";
  }
}
