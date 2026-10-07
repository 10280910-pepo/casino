
// ==============================
// RULETA
// ==============================

function girarRuleta() {

    const ruleta = document.getElementById("ruleta");
    const resultado = document.getElementById("resultadoRuleta");

    ruleta.classList.remove("girando");

    // Reinicia la animación
    void ruleta.offsetWidth;

    ruleta.classList.add("girando");

    const numeros = [
        "Rojo",
        "Negro",
        "Rojo",
        "Negro",
        "Rojo",
        "Negro"
    ];

    const resultadoFinal =
        numeros[Math.floor(Math.random() * numeros.length)];

    setTimeout(function () {
        resultado.textContent =
            "Resultado: " + resultadoFinal;
    }, 2000);
}


// ==============================
// MÁQUINA DE SÍMBOLOS
// ==============================

function girarSlots() {

    const simbolos = ["★", "♠", "♦", "♣", "♥"];

    const slot1 = document.getElementById("slot1");
    const slot2 = document.getElementById("slot2");
    const slot3 = document.getElementById("slot3");

    const resultado = document.getElementById("resultadoSlots");

    let contador = 0;

    const animacion = setInterval(function () {

        slot1.textContent =
            simbolos[Math.floor(Math.random() * simbolos.length)];

        slot2.textContent =
            simbolos[Math.floor(Math.random() * simbolos.length)];

        slot3.textContent =
            simbolos[Math.floor(Math.random() * simbolos.length)];

        contador++;

        if (contador >= 15) {

            clearInterval(animacion);

            if (
                slot1.textContent === slot2.textContent &&
                slot2.textContent === slot3.textContent
            ) {
                resultado.textContent =
                    "¡Tres símbolos iguales!";
            } else {
                resultado.textContent =
                    "Los símbolos son diferentes. ¡Intenta otra vez!";
            }
        }

    }, 100);
}


// ==============================
// CARTAS
// ==============================

function elegirCarta(carta) {

    const cartas = document.querySelectorAll(".carta");

    cartas.forEach(function (c) {
        c.style.pointerEvents = "none";
    });

    const valores = ["A", "K", "Q"];

    const valor =
        valores[Math.floor(Math.random() * valores.length)];

    carta.innerHTML =
        '<div style="font-size:30px;color:#111;">' + valor + '</div>';

    carta.style.background = "white";

    document.getElementById("resultadoCarta").textContent =
        "Elegiste la carta: " + valor;
}