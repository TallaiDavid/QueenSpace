const canvas = document.getElementById("plinkoCanvas");
const ctx = canvas.getContext("2d");

const game = {

    pegs: [],
    slots: [],
    ball: null,
    targetX: null,
    lastPeg: null,
    pathOffset: 0,
    selectedSlot: null,
    reward: null,

    speed: 4,
    animationId: null,
    rows: 8,
    pegRadius: 6,

    init() {

        this.createBoard();
       

        document
            .getElementById("dropBall")
            .addEventListener("click", () => {

                if (this.ball) return;
                this.ball = {

                    x: canvas.width / 2,
                    y: 40,
                    radius: 12

                };
                this.targetX = canvas.width / 2;
                this.lastPeg = null;
                this.pathOffset = 0;
                this.selectedSlot = Math.floor(Math.random() * this.slots.length);
                this.draw();
                this.animationId = requestAnimationFrame(() => this.animate());

            });

    },

    createBoard() {

        this.pegs = [];
        this.slots = [];

        const startY = 90;
        const rowGap = 60;
        const gap = 55;

        for (let row = 0; row < this.rows; row++) {

            const count = row + 2;

            const width = (count - 1) * gap;

            const startX =
                canvas.width / 2 -
                width / 2;

            for (let i = 0; i < count; i++) {

                this.pegs.push({

                    x: startX + i * gap,
                    y: startY + row * rowGap,
                    row: row

                });

            }

        }

        const slotWidth = canvas.width / 6;

        const icons = [

            "Utalok pénzt",
            "Virág Lego",
            "Nogger jégkrém",
            "Starbucks reggeli",
            "Szerelem Gyros",
            "Nádas vendéglő"

        ];

        for (let i = 0; i < 6; i++) {

            this.slots.push({

                x: i * slotWidth,
                width: slotWidth,
                icon: icons[i]

            });

        }

    },

    draw() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        //--------------------------------

        ctx.fillStyle = "white";

        this.pegs.forEach(peg => {

            ctx.beginPath();

            ctx.arc(

                peg.x,
                peg.y,
                this.pegRadius,
                0,
                Math.PI * 2

            );

            ctx.fill();

        });

        //--------------------------------

        ctx.strokeStyle = "white";
        ctx.lineWidth = 3;

        this.slots.forEach(slot => {

            ctx.beginPath();

            ctx.moveTo(
                slot.x,
                canvas.height - 90
            );

            ctx.lineTo(
                slot.x,
                canvas.height
            );

            ctx.stroke();

            ctx.fillStyle = "white";
        ctx.font = "18px Arial";
        ctx.textAlign = "center";

        const words = slot.icon.split(" ");

        if (words.length === 1) {

            ctx.fillText(
                slot.icon,
                slot.x + slot.width / 2,
                canvas.height - 20
            );

        } else {

            const first = words.slice(0, Math.ceil(words.length / 2)).join(" ");
            const second = words.slice(Math.ceil(words.length / 2)).join(" ");

            ctx.fillText(
                first,
                slot.x + slot.width / 2,
                canvas.height - 38
            );

            ctx.fillText(
                second,
                slot.x + slot.width / 2,
                canvas.height - 16
            );

        }

        });

        //--------------------------------

        if (this.ball) {

            ctx.beginPath();

            ctx.arc(

                this.ball.x,
                this.ball.y,
                this.ball.radius,
                0,
                Math.PI * 2

            );

            ctx.fillStyle = "#ff4f7d";
            ctx.fill();

            ctx.fillStyle = "white";
            ctx.font = "12px Arial";
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";

            ctx.fillText(

                "❤",

                this.ball.x,

                this.ball.y + 1

            );

        }

        if (this.reward) {

        ctx.fillStyle = "white";
        ctx.font = "28px Arial";
        ctx.textAlign = "center";

        ctx.fillText(
            "Nyeremény: " + this.reward,
            canvas.width / 2,
            40
        );

}

    },


animate() {

    if (!this.ball) return;

    this.ball.y += this.speed;
    this.ball.x += (this.targetX - this.ball.x) * 0.15;

    this.pegs.forEach(peg => {

    if (peg === this.lastPeg) return;

    if (
        Math.abs(this.ball.y - peg.y) < this.speed &&
        Math.abs(this.ball.x - peg.x) < 20
    ) {

        this.lastPeg = peg;

       const targetCenter =
        this.slots[this.selectedSlot].x +
        this.slots[this.selectedSlot].width / 2;

        this.targetX += (targetCenter - this.targetX) * 0.08;

    }

    });

    if (this.ball.y > canvas.height - this.ball.radius ) {

       this.ball.y = canvas.height - this.ball.radius;
        let closestSlot = this.slots[0];

        this.slots.forEach(slot => {

            const center = slot.x + slot.width / 2;

            if (
                Math.abs(this.ball.x - center) <
                Math.abs(this.ball.x - (closestSlot.x + closestSlot.width / 2))
            ) {
                closestSlot = slot;
            }

        });

    this.reward = closestSlot.icon;
       cancelAnimationFrame(this.animationId);

        this.animationId = null;
        this.ball = null;

    }

    this.draw();

    this.animationId = requestAnimationFrame(() => this.animate());

}
};

game.init();

