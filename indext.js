const hoursValue = document.querySelector(".j-timer_hours");
const minutesValue = document.querySelector(".j-timer_minutes");
const secondsValue = document.querySelector(".j-timer_seconds");

const btnStart = document.querySelector(".j-btn_start");
const btnPause = document.querySelector(".j-btn_pause");
const btnReset = document.querySelector(".j-btn_reset");

const puaseTitle = document.querySelector(".pause");

// **** пакуем в "массив" нужные кнопки
// **** итерируемся по всем кнопкам, изменяющим время. Вешаем listener.
let operationButtons = document.getElementsByClassName("j-operation_btn");
for (var i = 0; i < operationButtons.length; i++) {
  operationButtons[i].addEventListener("click", onOperationButtonClick);
}
let addOperationButtons = document.getElementsByClassName("j-add_btn");
for (var i = 0; i < addOperationButtons.length; i++) {
  addOperationButtons[i].addEventListener("click", onAddOperationButtonClick);
}
// ****Переменные
let time = 0;
const reset = 0;
let nIntervalId = null;

// **** добавление 0 к однозначным числам
const numberConverter = (value) => {
  if (value < 10) {
    return `0${value}`;
  } else {
    return `${value}`;
  }
};
// ----переделать!
const changeTimerTime = () => {
  const hours = Math.floor(time / 60 / 60);
  const minutes = Math.floor((time - hours * 60 ** 2) / 60);
  const seconds = time - hours * 60 ** 2 - minutes * 60;

  hoursValue.innerHTML = numberConverter(hours);
  minutesValue.innerHTML = numberConverter(minutes);
  secondsValue.innerHTML = numberConverter(seconds);
};
//**** */ функция - "ну, нажали и наверное что-то должно произойти?".
// Да, запускается агрегатор операций на первый ряд кнопок
// сплитим и выводим числа в качество переменной
function onOperationButtonClick(e) {
  let clickedElement = e.currentTarget;
  let operation = clickedElement.innerHTML.split(" ");
  makeOperation(operation[0]); //срока 69
  console.log(operation[0]);
}
// агрегатор операций на первый ряд кнопок
function addOperation(value) {
  if (value === "h") {
    time = time + 60 ** 2;
  } else if (value === "m") {
    time = time + 60;
  } else if (value === "s") {
    time = time + 1;
  }
  changeTimerTime();
  console.log(time);
}
// агрегатор операций на второй ряд кнопок
function onAddOperationButtonClick(e) {
  let clickedElement = e.currentTarget;
  let operation = clickedElement.innerHTML.slice([0]);
  makeAddOperation(operation[0]);
}
// функция будет принимать параметр из makeAddOperation(addValue) и прокидавать его в формулу(внутри) для расчета
function operationChange(value) {
  pauseTimer();
  time = value * 60;
  changeTimerTime();
  return time;
}
//**** */ функция - "что(!) делать, когда нажали на кнопку?" - агрегатор операций.
//**** */ Действие привязано к innerHTML
function makeOperation(operationValue) {
  operationChange(operationValue); //вот это поворот))сжал 3 кнопки
}
function makeAddOperation(addValue) {
  addOperation(addValue); //eще три кнопки
}

btnReset.addEventListener("click", () => {
  operationChange(reset)//reset - переменная, есть выше;
  puaseTitle.classList.remove("show");
});

const pauseTimer = () => {
  if (nIntervalId) {
    clearInterval(nIntervalId);
    puaseTitle.classList.add("show");
    nIntervalId = null;
  }
};
function start() {
  puaseTitle.classList.remove("show");
  if (!nIntervalId && time > 0) {
    nIntervalId = setInterval(() => {
      if (time > 0) {
        time = time - 1;
        changeTimerTime();
      } else {
        clearInterval(nIntervalId);
        alert("Finish");
        nIntervalId = null;
      }
    }, 1000);
  }
}

btnStart.addEventListener("click", start);

btnPause.addEventListener("click", pauseTimer);
