/* ==========================================
ربات ریاضی کلاس ششم
game.js
نسخه نهایی
========================================== */

/* ===========================
صفحات
=========================== */

const introPage = document.getElementById("introPage");
const loginPage = document.getElementById("loginPage");
const gamePage = document.getElementById("gamePage");
const finishPage = document.getElementById("finishPage");

/* ===========================
معرفی
=========================== */

const introSpeech = document.getElementById("introSpeech");
const loadingFill = document.getElementById("loadingFill");

/* ===========================
ورود
=========================== */

const studentName = document.getElementById("studentName");
const studentCode = document.getElementById("studentCode");
const loginError = document.getElementById("loginError");
const startBtn = document.getElementById("startBtn");

/* ===========================
بازی
=========================== */

const robot = document.getElementById("robot");
const speechBox = document.getElementById("speechBox");

const questionBox = document.getElementById("questionBox");
console.log(questionBox);

const answer1 = document.getElementById("answer1");
const answer2 = document.getElementById("answer2");
const answer3 = document.getElementById("answer3");
const answer4 = document.getElementById("answer4");

const currentQuestionText =
document.getElementById("currentQuestion");

const totalQuestionText =
document.getElementById("totalQuestion");

const batteryValue =
document.getElementById("batteryValue");

const starValue =
document.getElementById("starValue");

const coinValue =
document.getElementById("coinValue");

const batteryFill =
document.getElementById("batteryFill");

/* ===========================
پایان بازی
=========================== */

const resultName =
document.getElementById("resultName");

const resultCode =
document.getElementById("resultCode");

const resultDate =
document.getElementById("resultDate");

const resultTime =
document.getElementById("resultTime");

const correctCount =
document.getElementById("correctCount");

const wrongCount =
document.getElementById("wrongCount");

const resultScore =
document.getElementById("resultScore");

const resultPercent =
document.getElementById("resultPercent");

const resultBattery =
document.getElementById("resultBattery");

const resultStars =
document.getElementById("resultStars");

const resultCoins =
document.getElementById("resultCoins");

const resultMedal =
document.getElementById("resultMedal");

const finishMessage =
document.getElementById("finishMessage");

const playAgainBtn =
document.getElementById("playAgainBtn");

const screenShotBtn =
document.getElementById("screenShotBtn");

/* ===========================
صداها
=========================== */

const correctSound =
document.getElementById("correctSound");

const wrongSound =
document.getElementById("wrongSound");

const coinSound =
document.getElementById("coinSound");

const winSound =
document.getElementById("winSound");

/* موسیقی پس‌زمینه */

const backgroundMusic =
new Audio("robot background.mp3");

/* کلیک */

const buttonSound =
new Audio("button.mp3");

/* باتری */

const batterySound =
new Audio("battery.mp3");

/* ستاره */

const starSound =
new Audio("star.mp3");

/* صدای ربات */

const robotCorrect =
new Audio("robot-correct.mp3");

const robotWrong =
new Audio("robot-wrong.mp3");

const robotFinish =
new Audio("robot-finish.mp3");

const fireWorks =
new Audio("fireworks.mp3");

/* ===========================
تنظیمات صدا
=========================== */

backgroundMusic.loop = true;
backgroundMusic.volume = 0.25;

/* ===========================
متغیرها
=========================== */

let currentQuestion = 0;

let battery = 0;

let stars = 0;

let coins = 0;

let correctAnswers = 0;

let wrongAnswers = 0;

let wrongTry = 0;

let timer = null;

let minute = 40;

let second = 0;

/* ===========================
متن معرفی
=========================== */

const introMessages = [

"سلام دوست من 🌸",

"من ربات ریاضی هستم 🤖",

"امروز با هم بازی می‌کنیم.",

"آماده شو..."

];
/* ==========================================
بخش ۲
شروع برنامه + معرفی + ورود
========================================== */

window.onload = function () {

startIntro();

};

/* ==========================================
معرفی ربات
========================================== */

function startIntro() {

let percent = 0;
let messageIndex = 0;

introSpeech.innerHTML = introMessages[0];

const speechTimer = setInterval(function () {

messageIndex++;    

if (messageIndex < introMessages.length) {    

    introSpeech.innerHTML = introMessages[messageIndex];    

}

}, 1500);

const loadingTimer = setInterval(function () {

percent++;    

loadingFill.style.width = percent + "%";    

if (percent >= 100) {    

    clearInterval(speechTimer);    
    clearInterval(loadingTimer);    

    introPage.classList.add("hidden");    
    loginPage.classList.remove("hidden");    

}

}, 50);

}

/* ==========================================
ورود دانش آموز
========================================== */

startBtn.addEventListener("click", checkLogin);

function checkLogin() {

buttonSound.currentTime = 0;
buttonSound.play();

loginError.innerHTML = "";

const name = studentName.value.trim();
const code = studentCode.value.trim();

if (name === "") {

loginError.innerHTML =    
    "نام و نام خانوادگی را وارد کنید.";    

return;

}

if (code.length !== 10) {

loginError.innerHTML =    
    "کد ملی باید ۱۰ رقم باشد.";    

return;

}

loginPage.classList.add("hidden");
gamePage.classList.remove("hidden");

questionBox.style.display = "flex";
answer1.style.display = "block";
answer2.style.display = "block";
answer3.style.display = "block";
answer4.style.display = "block";

startGame();

}
/* ==========================================
بخش ۳
شروع بازی + نمایش سؤال
========================================== */

function startGame(){

currentQuestion = 0;

correctAnswers = 0;
wrongAnswers = 0;

battery = 0;
stars = 0;
coins = 0;

wrongTry = 0;

batteryValue.innerHTML = "0%";
starValue.innerHTML = "0";
coinValue.innerHTML = "0";

batteryFill.style.width = "0%";

speechBox.innerHTML = "شروع کنیم 🌸";

robot.src = "robot.png";

backgroundMusic.currentTime = 0;

backgroundMusic.play().catch(()=>{});

currentQuestion = 0;

questions[0] = questions[0];

showQuestion();
startTimer();
}

/* ==========================================
نمایش سؤال
========================================== */

function showQuestion(){

    wrongTry = 0;

    const q = questions[currentQuestion];

    questionBox.textContent = q.question;
    questionBox.style.background = "yellow";

    answer1.textContent = q.options[0];
    answer2.textContent = q.options[1];
    answer3.textContent = q.options[2];
    answer4.textContent = q.options[3];

    if(q.options.length == 2){

        answer3.style.display = "none";
        answer4.style.display = "none";

    }else{

        answer3.style.display = "block";
        answer4.style.display = "block";

    }

    questionBox.style.color = "black";
    questionBox.style.fontSize = "28px";

    answer1.style.color = "white";
    answer2.style.color = "white";
    answer3.style.color = "white";
    answer4.style.color = "white";

    robot.src = "robot.png";
}
/* ==========================================
بخش ۴
بررسی پاسخ
========================================== */

answer1.addEventListener("click", function () {
checkAnswer(0);
});

answer2.addEventListener("click", function () {
checkAnswer(1);
});

answer3.addEventListener("click", function () {
checkAnswer(2);
});

answer4.addEventListener("click", function () {
checkAnswer(3);
});

function checkAnswer(selected){

buttonSound.currentTime = 0;
buttonSound.play();

const q = questions[currentQuestion];

/* ===========================
پاسخ صحیح
=========================== */

if(selected === q.answer){

wrongTry = 0;    

correctAnswers++;    

battery = Math.min(100, battery + 5);    
stars++;    
coins += 10;    

batteryValue.innerHTML = battery + "%";    
starValue.innerHTML = stars;    
coinValue.innerHTML = coins;    

batteryFill.style.width = battery + "%";    

correctSound.currentTime = 0;    
correctSound.play();    

coinSound.currentTime = 0;    
coinSound.play();    

batterySound.currentTime = 0;    
batterySound.play();    

starSound.currentTime = 0;    
starSound.play();    

robotCorrect.currentTime = 0;    
robotCorrect.play();    

speechBox.innerHTML = "آفرین 🌸";    

setTimeout(function(){

    currentQuestion++;

    if(currentQuestion < questions.length){

        showQuestion();

    }else{

        finishGame();

    }

},500);
}

/* ===========================
پاسخ غلط
=========================== */

else{

wrongTry++;

wrongAnswers++;

if(wrongTry == 1){

    robotWrong.currentTime = 0;
    robotWrong.play();

}

else{

    currentQuestion++;

    if(currentQuestion < questions.length){

        showQuestion();

    }else{

        finishGame();

    }

}

}

}
/* ==========================================
بخش ۵
تایمر + پایان بازی
========================================== */

function startTimer(){

clearInterval(timer);

minute = 40;
second = 0;

const timerText = document.getElementById("timerText");

if(!timerText) return;

timerText.innerHTML = "40:00";

timer = setInterval(function(){

if(second === 0){    

    if(minute === 0){    

        clearInterval(timer);    

        finishGame();    

        return;    

    }    

    minute--;    
    second = 59;    

}else{    

    second--;    

}    

const s = second < 10 ? "0"+second : second;    

timerText.innerHTML = minute + ":" + s;

},1000);

}

/* ==========================================
پایان بازی
========================================== */

function finishGame(){

clearInterval(timer);

backgroundMusic.pause();

robotFinish.currentTime = 0;
robotFinish.play();

fireWorks.currentTime = 0;
fireWorks.play();

gamePage.classList.add("hidden");
finishPage.classList.remove("hidden");

resultName.innerHTML = studentName.value;
resultCode.innerHTML = studentCode.value;

correctCount.innerHTML = correctAnswers;
wrongCount.innerHTML = wrongAnswers;

resultBattery.innerHTML = battery + "%";
resultStars.innerHTML = stars;
resultCoins.innerHTML = coins;

const score = correctAnswers * 5;

resultScore.innerHTML = score;

const percent =
Math.round((correctAnswers/questions.length)*100);

resultPercent.innerHTML = percent + "%";

if(percent >= 90){

resultMedal.src = "medal-gold.png";    
finishMessage.innerHTML = "عالی بود 🌸";

}

else if(percent >= 70){

resultMedal.src = "medal-silver.png";    
finishMessage.innerHTML = "خیلی خوب بود 🌸";

}

else{

resultMedal.src = "medal-bronze.png";    
finishMessage.innerHTML = "آفرین، ادامه بده 🌸";

}

const now = new Date();

resultDate.innerHTML =
now.toLocaleDateString("fa-IR");

resultTime.innerHTML =
now.toLocaleTimeString("fa-IR");

}

/* ==========================================
دکمه‌ها
========================================== */

playAgainBtn.addEventListener("click",function(){

location.reload();

});

screenShotBtn.addEventListener("click",function(){

alert("در نسخه بعدی فعال می‌شود.");

});
/* ==========================================
بخش ۶
پایان بازی + دکمه‌ها
========================================== */
