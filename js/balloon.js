const balloonCanvas = document.getElementById("balloonCanvas");
const balloonCtx = balloonCanvas.getContext("2d");

const balloons = [];
let currentReward = "";
let poppedCount = 0;

const bg = new Image();
bg.src = "assets/gf_day/hatter2.jpg";
const balloonImg = new Image();
balloonImg.src = "assets/gf_day/lufi.jpg";

function createBalloons() {

    balloons.length = 0;

    const colors = [
        "#ff5f7a",
        "#66ccff",
        "#ffd54f",
        "#9c6bff",
        "#6ee7a2",
        "#ff9d4d"
    ];

    for (let i = 0; i < 18; i++) {

        balloons.push({

              reward: [
                "Kinder tejszelet",
                "",
                "+1 starbucks kávé",
                "",
                "",
                "Új Plüss",
                "",
                "Lila Monster",
                "",
                "",
                "+1 KFC kosár",
                "",
                "",
                "Filmest",
                "",
                "",
                "McDonald's 10 ezres limit csak neked",
                ""
            ][i],

            x: 80 + Math.random() * 540,
            y: 550 + i * 120,
            radius: 35,
            color: colors[i],
            popped: false,
            speed: 0.4 + Math.random() * 0.4


        });

    }

}

function drawBalloons() {

    balloonCtx.clearRect(
        0,
        0,
        balloonCanvas.width,
        balloonCanvas.height
    );

    if (bg.complete) {

        balloonCtx.drawImage(
            bg,
            0,
            0,
            balloonCanvas.width,
            balloonCanvas.height
        );

    }

    balloons.forEach(balloon => {
        if (balloon.popped) return;
        balloonCtx.drawImage(
            balloonImg,
            balloon.x - 35,
            balloon.y - 45,
            70,
            90
        );

        balloonCtx.beginPath();

        balloonCtx.moveTo(
            balloon.x,
            balloon.y + balloon.radius
        );

        balloonCtx.lineTo(
            balloon.x,
            balloon.y + 90
        );

        balloonCtx.strokeStyle = "white";
        balloonCtx.stroke();

    });

    if (currentReward !== "") {

    balloonCtx.fillStyle = "white";
    balloonCtx.font = "28px Arial";
    balloonCtx.textAlign = "center";

    balloonCtx.fillText(
        currentReward,
        balloonCanvas.width / 2,
        45
    );

}

if (poppedCount === balloons.length) {

    balloonCtx.fillStyle = "white";
    balloonCtx.font = "32px Arial";
    balloonCtx.textAlign = "center";

    balloonCtx.fillText(
        "Vége! Frissítsd le az oldalt és próbáld újra!",
        balloonCanvas.width / 2,
        90
    );

}

}

bg.onload = () => {

    createBalloons();
    drawBalloons();

};

if (bg.complete) {

    createBalloons();
    drawBalloons();

}

function animateBalloons() {

    balloons.forEach(balloon => {

        balloon.y -= balloon.speed;

        if (balloon.y < -60) {

            balloon.y = balloonCanvas.height + 40;

        }

    });

    drawBalloons();

    requestAnimationFrame(animateBalloons);

}

animateBalloons();

balloonCanvas.addEventListener("click", (e) => {

    const rect = balloonCanvas.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    balloons.forEach(balloon => {

        if (balloon.popped) return;

        const dx = mouseX - balloon.x;
        const dy = mouseY - balloon.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= balloon.radius) {

            balloon.popped = true;
            poppedCount++;

            currentReward = balloon.reward;
            
        }

    });

});