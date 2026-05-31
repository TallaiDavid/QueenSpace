(function(){

    emailjs.init(
        "xramZcvk8oBxW0PMf"
    );

})();

function showPopup(message){

    document.getElementById(
        "popupText"
    ).textContent = message;

    document.getElementById(
        "popupOverlay"
    ).style.display = "flex";
}

function closePopup(){

    document.getElementById(
        "popupOverlay"
    ).style.display = "none";
}

function sendFoodRequest(){

    const food =
        document.getElementById(
            "foodRequest"
        ).value;

    const priority =
        document.getElementById(
            "foodPriority"
        ).value;

    if(!priority){

        showPopup(
            "Válassz sürgősséget 😌"
        );

        return;
    }

    if(!food.trim()){

        showPopup(
            "Írd le mit szeretnél enni 😌"
        );

        return;
    }

    emailjs.send(

        "service_il8609n",

        "template_jo83in7",

        {

            time:
            new Date().toLocaleString("hu-HU"),

            type:
            "Kajarendelés",

            item:
            food,

            priority:
            priority,

            note:
            "Étel rendelési igény",

            link:
            "-"

        }

    )

    .then(() => {

        showPopup(
            "🍔 A gyomor vészjelzését fogadtuk. A kérelmet továbbítottuk."
        );

        document.getElementById(
            "foodRequest"
        ).value = "";

        document.getElementById(
            "foodPriority"
        ).selectedIndex = 0;

    })

    .catch(error => {

        console.error(error);

        showPopup(
            "❌ Hiba történt az üzenet küldésekor."
        );

    });

}