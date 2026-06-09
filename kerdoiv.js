emailjs.init("xramZcvk8oBxW0PMf");

let currentQuestion = 0;
let score = 0;

let permissionGranted = false;

const personalAnswers = [];

const questions = [

{
    type:"text",
    question:"Mi volt eddig a legváratlanabb dolog velem kapcsolatban?"
},

{
    type:"text",
    question:"Melyik programtól félnél a legjobban, ha azt mondanám: este 6-kor indulunk, ne kérdezz semmit?"
},

{
    type:"text",
    question:"Mi volt a legkínosabb pillanatunk eddig?"
},

{
    type:"text",
    question:"Hova nem mennél el velem akkor sem, ha én fizetek mindent?"
},

{
    type:"text",
    question:"Mi az a dolog, amit szerinted még nem meséltél el nekem, pedig meglepne?"
}

];

const quizQuestions = [

{
    question:"Melyik Monster a kedvencem?",

    answers:[
        "Fehér",
        "Lila",
        "Mango Loco",
        "Sima"
    ],

    correct:0
},

{
    question:"Mi a kedvenc autómárkám?",

    answers:[
        "BMW",
        "Honda",
        "Kia",
        "Toyota"
    ],

    correct:2
},

{
    question:"Melyik programot választanám hamarabb?",

    answers:[
        "Disco",
        "Festés",
        "Autózás valahova",
        "Karaoke"
    ],

    correct:2
},

{
    question:"Mi a valószínűbb?",

    answers:[
        "Elalszom",
        "Elkések",
        "Túl korán érkezem",
        "Elfelejtem hova megyek"
    ],

    correct:2
},

{
    question:"Melyik állítás igaz rám?",

    answers:[
        "Utálom a kávét",
        "Baromi vicces vagyok",
        "Nem nézek filmeket",
        "Nem szeretek utazni"
    ],

    correct:2
}

];

let quizIndex = 0;


// START

function startQuiz(){

    document.querySelector(".hero").style.display =
    "none";

    document.getElementById("quizContainer")
    .classList.remove("hidden");

    renderPersonalQuestion();

}


// ELSŐ RÉSZ

function renderPersonalQuestion(){

    const q = questions[currentQuestion];

    document.getElementById(
        "questionTitle"
    ).textContent = q.question;

    document.getElementById(
        "questionContent"
    ).innerHTML = `
        <textarea
        id="answerBox"
        placeholder="Ide írhatod a válaszod..."></textarea>
    `;
}


function nextQuestion(){

    const answer =
    document.getElementById(
        "answerBox"
    ).value;

    if(!answer.trim()){

        alert(
            "Írj valamit 😌"
        );

        return;
    }

    personalAnswers.push(answer);

    currentQuestion++;

    if(currentQuestion < questions.length){

        renderPersonalQuestion();

    }else{

        document.getElementById(
            "popupOverlay"
        ).style.display =
        "flex";
    }

}


// EMAIL ENGEDÉLY

function sendAnswers(permission){

    permissionGranted = permission;

    document.getElementById(
        "popupOverlay"
    ).style.display =
    "none";

    if(permission){

        score += 2;

        emailjs.send(

            "service_il8609n",

            "template_jo83in7",

            {

                type:
                "Kérdőív",

                item:
                personalAnswers.join("\n\n"),

                priority:
                "Engedélyezve",

                note:
                "Kérdőív válaszok",

                link:
                "-",

                time:
                new Date()
                .toLocaleString("hu-HU")

            }

        );

    }

    renderQuizQuestion();

}


// MÁSODIK RÉSZ

function renderQuizQuestion(){

    const q =
    quizQuestions[quizIndex];

    let html = "";

    q.answers.forEach(

        (answer,index)=>{

            html += `
            <label class="option">

                <input
                type="radio"
                name="quizAnswer"
                value="${index}">

                ${answer}

            </label>
            `;
        }

    );

    document.getElementById(
        "questionTitle"
    ).textContent =
    q.question;

    document.getElementById(
        "questionContent"
    ).innerHTML =
    html;
}


// FELDOLGOZÁS

function nextQuizQuestion(){

    const selected =
    document.querySelector(
        'input[name="quizAnswer"]:checked'
    );

    if(!selected){

        alert(
            "Válassz egy opciót 😌"
        );

        return;
    }

    const selectedIndex =
    Number(selected.value);

    if(
        selectedIndex ===
        quizQuestions[quizIndex].correct
    ){

        score += 2;
    }

    quizIndex++;

    if(
        quizIndex <
        quizQuestions.length
    ){

        renderQuizQuestion();

    }else{

        showLoading();
    }

}


// GOMB CSERE

document.getElementById("nextBtn")
.addEventListener("click", () => {

    if(currentQuestion < 5){

        nextQuestion();

    }else{

        nextQuizQuestion();
    }

});

// ANIMÁCIÓ

function showLoading(){

    document.getElementById(
        "questionTitle"
    ).textContent =
    "Eredmények feldolgozása...";

    const content =
    document.getElementById(
        "questionContent"
    );

    let progress = 0;

    content.innerHTML =
    `<h2 id="progressText">0%</h2>`;

    const interval =
    setInterval(()=>{

        progress += 25;

        document.getElementById(
            "progressText"
        ).textContent =
        progress + "%";

        if(progress >= 100){

            clearInterval(interval);

            setTimeout(
                showResult,
                700
            );
        }

    },600);

}


// EREDMÉNY

function showResult(){

    let title = "";
    let reward = "";

    if(score >= 10){

        title =
        "Királynő vagy, csak a szokásos";

        reward =
        `
        • +1 extra ajándék névnapodra (amit csak akarsz <3) <br>
        • Kedvenc éttermed az országban<br>
        • Nem hisztizek h messze van, mehetünk akárhova :D
        `;

    }

    else if(score >= 7){

        title =
        "Ügyes voltál";

        reward =
        `
        • Lila Monster (amennyit csak akarsz, megvannak a források B) )<br>
        • Hoki meccsre jegyek<br>
        • Fast food mania -> 3 kedvenc helyedről rendelek neked egyszerre
        `;

    }

    else if(score >= 4){

        title =
        "Kicsit aggódom!";

        reward =
        `
        • Morális támogatás<br>
        • Egy extra próbálkozási lehetőség<br>
        • jó oké meghívlak egy mekire majd
        `;

    }

    else{

        title =
        "Pótvizsga szükséges..";

        reward =
        `
        :/<br><br>
        Hát így sajnos nem tudok adni semmit..<br><br>
        Jó, próbáld újra.<br>
        Kövire biztos jobb lesz :)
        `;
    }

    document.getElementById(
        "resultTitle"
    ).innerHTML =
    title;

    document.getElementById(
        "resultText"
    ).innerHTML =
    `
    <strong>Pontszám:</strong>
    ${score}/12
    <br><br>
    ${reward}
    `;

    document.getElementById(
        "resultOverlay"
    ).style.display =
    "flex";
}


// BEZÁRÁS

function closeResult(){

    location.reload();
}