import "./index.html";
import "./style/index.css";

const nextButton = document.querySelector(".quiz__next");
nextButton.addEventListener("click", nextQuestion);
const quizCurrent = document.querySelector(".quiz__current");
const quizLast = document.querySelector(".quiz__last");

const quiz = [
  {
    title: "Для кого вы ищете учебное заведение?",
    questions: [
      "Себе",
      "Супругу/супруге",
      "Родственнику",
      "Коллеге",
      "Ребенку",
      "Другое",
    ],
    type: "radio",
    chosen: "",
  },
  {
    title: "",
    questions: [
      "Алушта",
      "Феодосия",
      "Ялта",
      "Севастополь",
      "Симферополь",
      "Абакан",
      "Адлер",
      "Анапа",
      "Ангарск",
      "Архангельск",
      "Астрахань",
      "Барнаул",
      "Белгород",
    ],
    type: "select",
    defaultValue: "Санкт-Петербург",
    chosen: "",
  },
  {
    title: "Какое образование уже есть?",
    questions: [
      "9 классов",
      "Колледж/техникум",
      "11 классов",
      "11 классов",
      "Училище",
      "Неоконченное высшее",
    ],
    type: "radio",
    chosen: "",
  },
  {
    title: "Куда планируете поступать?",
    questions: ["Вуз", "Колледж/техникум", "Училище"],
    type: "radio",
    chosen: "",
  },
  {
    title: "Какую форму обучения предпочитаете?",
    questions: ["Очную", "Заочную", "Дистанционную"],
    type: "radio",
    chosen: "",
  },
  {
    title: "Рассматриваете платное обучение?",
    questions: [
      "Нет, только бюджет",
      "Да, планирую учиться платно",
      "Возможны оба варианта",
    ],
    type: "radio",
    chosen: "",
  },
  {
    title: "Какая специальность интересует?",
    questions: ["Философия", "Психология", "Высшая математика"],
    defaultValue: "Любая",
    type: "select",
    chosen: "",
  },
  {
    title: "Как скоро планируете поступать?",
    questions: ["Как можно быстрее", "Месяц", "Квартал", "Полгода", "Год"],
    type: "radio",
    chosen: "",
  },
  {
    title: "Ваша подборка готова! 🥳 Куда нам отправить её?",
    questions: [
      { type: "text", value: "Как вас зовут?" },
      { type: "text", value: "Номер телефона" },
      { type: "text", value: '"E-mail"' },
    ],
    type: "form",
  },
];

let currentNumber = 0;
const quizLastNumber = quiz.length - 1;

function getStateOfQuiz() {
  quizCurrent.textContent = currentNumber + 1;
  quizLast.textContent = quizLastNumber + 1;
}

function reset() {
  const questionTitle = document.querySelector(".quiz__title");
  const quizContainer = document.querySelector(".quiz__content");
  questionTitle.innerHTML = "";
  quizContainer.innerHTML = "";
}

// Функция для загрузки вопросов и ответов на страницу (для радиокнопок) m
function loadRadioQuestion() {
  getStateOfQuiz();
  reset();

  const questionTitle = document.querySelector(".quiz__title");
  const quizContainer = document.querySelector(".quiz__content");
  const currentQuestion = quiz[currentNumber];

  questionTitle.textContent = currentQuestion.title;

  for (const item of currentQuestion.questions) {
    const radioInput = document.createElement("input");
    const label = document.createElement("label");
    const spanText = document.createElement("span");
    radioInput.type = "radio";
    radioInput.name = "answer";
    radioInput.value = item;
    spanText.textContent = item;
    label.appendChild(spanText);
    label.appendChild(radioInput);
    label.classList.add("flex-justify-between");
    quizContainer.appendChild(label);
  }
}

// Функция для загрузки вопросов и ответов на страницу (для выпадающего списка)
function loadSelectQuestion() {
  getStateOfQuiz();
  reset();

  const question = document.querySelector(".quiz__title");
  const quizContainer = document.querySelector(".quiz__content");
  const currentQ = quiz[currentNumber];

  question.textContent = currentQ.title;

  const select = document.createElement("select");

  for (const item of currentQ.questions) {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    select.appendChild(option);
  }
  quizContainer.appendChild(select);
}

function loadFormQuestion() {
  getStateOfQuiz();
  reset();

  const questionTitle = document.querySelector(".quiz__title");
  const quizContainer = document.querySelector(".quiz__content");
  const currentQuestion = quiz[currentNumber];

  questionTitle.textContent = currentQuestion.title;

  for (const item of currentQuestion.questions) {
    console.log(item);
    const inputText = document.createElement("input");
    inputText.type = item.type;
    inputText.placeholder = item.value;
    inputText.value = item.value;

    quizContainer.appendChild(inputText);
  }
}

// Функция для загрузки вопросов и ответов на страницу
function loadQuestion() {
  const currentQ = quiz[currentNumber];
  console.log(currentQ);
  if (currentQ.type === "radio") {
    loadRadioQuestion();
  } else if (currentQ.type === "select") {
    loadSelectQuestion();
  } else if (currentQ.type === "form") {
    loadFormQuestion();
  }
}

function nextQuestion() {
  currentNumber++;
  if (currentNumber >= quizLastNumber) {
    loadQuestion();
    nextButton.disabled = true;
    return;
  }
  loadQuestion();
}

loadQuestion();
