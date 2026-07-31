const hockeyGame =
    document.getElementById("hockeyGame");

const hockeyCanvas =
    document.getElementById("hockeyCanvas");

const hctx =
    hockeyCanvas.getContext("2d");

const rink = new Image();
rink.src = "assets/gf_day/palya.jpg";

let playerImage = null;
let botImage = null;
let playerY = 200;
let botY = 200;
let playerScore = 0;
let botScore = 0;
let gameOver = false;

let puck = {

    x: 350,
    y: 200,

    vx: 3,
    vy: 2,

    radius: 10

};

const universes = {

    heated: [

        {
            name: "Shane",
            img: "assets/gf_day/karakter1.png"
        },

        {
            name: "Ilya",
            img: "assets/gf_day/karakter2.png"
        }

    ],

    twilight: [

        {
            name: "Jacob",
            img: "assets/gf_day/karakter3.png"
        },

        {
            name: "Bella",
            img: "assets/gf_day/karakter4.png"
        },

        {
            name: "Edward",
            img: "assets/gf_day/karakter5.png"
        }

    ],

    vampire: [

        {
            name: "Elena",
            img: "assets/gf_day/karakter6.png"
        },

        {
            name: "Stefan",
            img: "assets/gf_day/karakter7.png"
        },

        {
            name: "Damon",
            img: "assets/gf_day/karakter8.png"
        }

    ]

};

const characterSelect =
    document.getElementById("characterSelect");

const startBtn =
    document.getElementById("startHockey");

document
.querySelectorAll(".universeBtn")
.forEach(btn=>{

    btn.onclick=()=>{

        characterSelect.innerHTML="";

        universes[
            btn.dataset.universe
        ].forEach(character=>{

            const img=document.createElement("img");

            img.src=character.img;

            img.width = 120;
            img.height = 140;
            img.style.objectFit = "cover";


            img.style.margin="10px";
            img.style.cursor="pointer";
            img.style.borderRadius="50%";

            img.onclick=()=>{

                document
                .querySelectorAll("#characterSelect img")
                .forEach(i=>i.style.border="none");

                img.style.border="4px solid hotpink";
                
                playerImage = new Image();
                playerImage.src = character.img;

                const others = universes[
                    btn.dataset.universe
                ].filter(c => c.name !== character.name);

                const randomBot =
                    others[Math.floor(Math.random() * others.length)];

                botImage = new Image();
                botImage.src = randomBot.img;

                startBtn.style.display="inline-block";

            };

            characterSelect.appendChild(img);

        });

    };

});

startBtn.onclick = () => {

    hockeyGame.style.display = "block";

    drawRink();
    animateHockey();

};

function drawRink() {

    hctx.clearRect(
        0,
        0,
        hockeyCanvas.width,
        hockeyCanvas.height
    );

    hctx.drawImage(

        rink,

        0,
        0,

        hockeyCanvas.width,
        hockeyCanvas.height

    );

                hctx.font = "32px Arial";
        hctx.textAlign = "center";

        hctx.lineWidth = 5;
        hctx.strokeStyle = "black";
        hctx.strokeText(
            `${playerScore} : ${botScore}`,
            hockeyCanvas.width / 2,
            40
        );

        hctx.fillStyle = "white";
        hctx.fillText(
            `${playerScore} : ${botScore}`,
            hockeyCanvas.width / 2,
            40
        );

    if (playerImage) {

    hctx.save();

    hctx.beginPath();
    hctx.arc(70, playerY, 35, 0, Math.PI * 2);
    hctx.clip();

    hctx.drawImage(
        playerImage,
        35,
        playerY - 35,
        70,
        70
    );

    hctx.restore();

    }

    if (botImage) {

    hctx.save();

    hctx.beginPath();
    hctx.arc(630, botY, 35, 0, Math.PI * 2);
    hctx.clip();

    hctx.drawImage(
        botImage,
        595,
        botY - 35,
        70,
        70
    );

    hctx.restore();

    }

    hctx.beginPath();

    hctx.arc(

        puck.x,
        puck.y,
        puck.radius,
        0,
        Math.PI * 2

    );

    hctx.fillStyle = "#111";
    hctx.fill();

    if (gameOver) {

    hctx.fillStyle = "rgba(0,0,0,0.6)";
    hctx.fillRect(
        0,
        0,
        hockeyCanvas.width,
        hockeyCanvas.height
    );

    hctx.fillStyle = "white";
    hctx.textAlign = "center";

    hctx.font = "42px Arial";

    hctx.fillText(

        playerScore > botScore ?

        "🎉 Győztél!" :

        "😔 Kikaptál",

        hockeyCanvas.width / 2,

        150

    );

    const buttonWidth = 180;
const buttonHeight = 50;

const retryButton = {

    x: 170,
    y: 270,
    w: buttonWidth,
    h: buttonHeight

};

const exitButton = {

    x: 350,
    y: 270,
    w: buttonWidth,
    h: buttonHeight

};

hctx.fillStyle = "#ff5c8a";
hctx.fillRect(
    retryButton.x,
    retryButton.y,
    retryButton.w,
    retryButton.h
);

hctx.fillRect(
    exitButton.x,
    exitButton.y,
    exitButton.w,
    exitButton.h
);

hctx.fillStyle = "white";
hctx.font = "24px Arial";

hctx.fillText(
    "Újra",
    retryButton.x + retryButton.w / 2,
    retryButton.y + 33
);

hctx.fillText(
    "Kilépés",
    exitButton.x + exitButton.w / 2,
    exitButton.y + 33
);

    hctx.font = "26px Arial";

    hctx.fillText(

        playerScore > botScore ?

        "Feloldottál egy ajándékot ❤️" :

        "Próbáld újra 😊",

        hockeyCanvas.width / 2,

        210

    );

}

}

hockeyCanvas.addEventListener("mousemove", (e) => {

    const rect = hockeyCanvas.getBoundingClientRect();

    playerY = e.clientY - rect.top;

    playerY = Math.max(35, Math.min(365, playerY));

    drawRink();

});

function animateHockey() {

    if (gameOver) {

    drawRink();
    return;

    }

    if (botY < puck.y - 8) {

    botY += 2.5;

    } else if (botY > puck.y + 8) {

        botY -= 2.5;

    }

    botY = Math.max(35, Math.min(365, botY));

    puck.x += puck.vx;
    puck.y += puck.vy;

        const dxPlayer = puck.x - 70;
    const dyPlayer = puck.y - playerY;

    const distPlayer = Math.sqrt(
        dxPlayer * dxPlayer +
        dyPlayer * dyPlayer
    );

    if (distPlayer < 45) {

        puck.vx = Math.abs(puck.vx) + 0.5;

        puck.vy += dyPlayer * 0.08;

    }
        const dxBot = puck.x - 630;
    const dyBot = puck.y - botY;

    const distBot = Math.sqrt(
        dxBot * dxBot +
        dyBot * dyBot
    );

    if (distBot < 45) {

        puck.vx = -Math.abs(puck.vx) - 0.5;

        puck.vy += dyBot * 0.08;

    }

    if (
        puck.y < puck.radius ||
        puck.y > hockeyCanvas.height - puck.radius
    ) {

        puck.vy *= -1;

    }

    if (puck.x < 0) {

    botScore++;

    resetPuck();

    }

    if (puck.x > hockeyCanvas.width) {

        playerScore++;

        resetPuck();

    }

    drawRink();

    requestAnimationFrame(animateHockey);

}

function resetPuck() {

    puck.x = hockeyCanvas.width / 2;
    puck.y = hockeyCanvas.height / 2;

    puck.vx = Math.random() < 0.5 ? 3 : -3;
    puck.vy = (Math.random() * 4) - 2;

    if (playerScore >= 5 || botScore >= 5) {

    gameOver = true;

    }
}

hockeyCanvas.addEventListener("click", (e) => {

    if (!gameOver) return;

    const rect = hockeyCanvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Újra

    if (
        x >= 170 &&
        x <= 350 &&
        y >= 270 &&
        y <= 320
    ) {

        playerScore = 0;
        botScore = 0;

        gameOver = false;

        resetPuck();

        animateHockey();

        return;

    }

    // Kilépés

    if (
        x >= 350 &&
        x <= 530 &&
        y >= 270 &&
        y <= 320
    ) {

        hockeyGame.style.display = "none";

        startBtn.style.display = "inline-block";

        playerScore = 0;
        botScore = 0;

        gameOver = false;

        resetPuck();

    }

});