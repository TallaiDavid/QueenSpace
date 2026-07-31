const envelope =
document.getElementById("envelope");

const letter =
document.getElementById("letterContainer");

document
.getElementById("openLetter")

.addEventListener("click",()=>{

    envelope.src =
    "assets/gf_day/boritek_nyitva.png";

    setTimeout(()=>{

        letter.classList.remove(
            "hidden"
        );

        letter.scrollIntoView({

            behavior:"smooth"

        });

    },500);

});