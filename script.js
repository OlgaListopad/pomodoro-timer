//Функция для добавления незначащих нулей
function format(val) {
    if (val < 10) {
        return `0${val}`
    }
    return val;
}

let timer = document.querySelector("#pomodoro-time");
let timeArray = timer.textContent.split(":"); //разбиваем строку timer на минуты и секунды
let minutes = parseInt(timeArray[0]);
let seconds = parseInt(timeArray[1]);
let totalSeconds = minutes * 60 + seconds; //вычисляем общее количество секунд

//Переменная для хранения идентификатора интервала
let timerId;


const startBtn = document.querySelector("#start");
startBtn.addEventListener("click", function() {
    if (this.innerHTML === "stop") {
        //Если текст, в кнопке, равен "stop", 
        //то останавливаем таймер
        clearInterval(timerId);
        this.innerHTML = "start"; //меняем текст на "start"
    } else {
        //Если текст равен "start", 
        //то запускаем таймер с помощью setInterval
        timerId = setInterval(() => {
            totalSeconds--;
            minutes = Math.floor(totalSeconds / 60);
            seconds = totalSeconds % 60;

            timer.textContent = `${format(minutes)}:${format(seconds)}`;
            //когда таймер дойдет до нуля, он должен сброситься 
            //в начальное состояние: **25:00** и текст на кнопке снова **start**
            if (totalSeconds === 0) {
                clearInterval(timerId);
                timer.textContent = "25:00";
                startBtn.innerHTML = "start";
                minutes = 25;
                seconds = 0;
                totalSeconds = minutes * 60 + seconds;
            }
        }, 1);
        this.innerHTML = "stop"; //меняем текст на "stop"
    }
});

//Отдельные переменные, которые хранят время для каждого режима
let pomodoroTime = "25:00";
let breakTime = "05:00";
timer.textContent = pomodoroTime; //устанавливаем начальное время для pomodoro

const pomodoroBtn = document.querySelector("#pomodoro");
const breakBtn = document.querySelector("#break");

//При клике на кнопки "Pomodoro" или "Break" 
//меняем активный класс у кнопок, устанавливаем 
//соответствующее время для таймера

pomodoroBtn.addEventListener("click", function() {
    clearInterval(timerId);
    timer.textContent = pomodoroTime;
    //меняем активный класс у кнопок
    pomodoroBtn.classList.add("active");
    breakBtn.classList.remove("active");
    //устанавливаем время для pomodoro

});

breakBtn.addEventListener("click", function() {
    clearInterval(timerId);
    timer.textContent = breakTime;
    //меняем активный класс у кнопок
    breakBtn.classList.add("active");
    pomodoroBtn.classList.remove("active");
    //устанавливаем время для break
});

const resetBtn = document.querySelector("#reset");
//при нажатии на кнопку сброса таймер будет 
//сбрасываться в начальное значение для текущего режима
resetBtn.addEventListener("click", function() {
    clearInterval(timerId);
    //проверяем, какой режим был выбран по активному классу кнопок
    if (pomodoroBtn.classList.contains("active")) {
        timer.textContent = pomodoroTime;
    } else if (breakBtn.classList.contains("active")) {
        timer.textContent = breakTime;
    }
});