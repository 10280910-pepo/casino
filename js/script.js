
document.addEventListener("DOMContentLoaded", () => {
    // Cierra el menú de Bootstrap al seleccionar una sección.
    const menu = document.getElementById("menu");
    const links = document.querySelectorAll("#menu .nav-link");

    links.forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth < 992 && menu.classList.contains("show")) {
                bootstrap.Collapse.getOrCreateInstance(menu).hide();
            }
        });
    });

    // Efecto suave en las tarjetas al entrar en pantalla.
    const cards = document.querySelectorAll(
        ".feature-card, .character-card, .atmosphere-card, .intro-panel"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        cards.forEach((card) => {
            card.classList.add("reveal");
            observer.observe(card);
        });
    }
});

/* =====================================
   CAMBIO DE IDIOMA CON JSON
===================================== */

const languageToggle = document.getElementById("languageToggle");

let idiomaActual = "es";
let traducciones = {};

fetch("./traducciones.json")
    .then(function (respuesta) {

        return respuesta.json();
    })
    .then(function (datos) {
        traducciones = datos;
        cambiarIdioma("es");
        console.log("Traducciones cargadas correctamente");
    });

function cambiarIdioma(idioma) {
    idiomaActual = idioma;

    document.querySelectorAll("[data-i18n]").forEach(function (elemento) {
        const clave = elemento.getAttribute("data-i18n");
        const texto = traducciones[idioma]?.[clave];

        if (texto !== undefined) {
            elemento.textContent = texto;
        }
    });

    document.documentElement.lang = idioma;

    if (languageToggle) {
        languageToggle.textContent = idioma === "es" ? "EN" : "ES";
    }
}

if (languageToggle) {
    languageToggle.addEventListener("click", function () {
        const nuevoIdioma = idiomaActual === "es" ? "en" : "es";
        cambiarIdioma(nuevoIdioma);
    });
}
