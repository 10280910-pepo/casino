document.addEventListener("DOMContentLoaded", () => {

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");
    const header = document.getElementById("header");
    const hero = document.getElementById("inicio");


    /* =========================
       CREAR ANIMACIÓN LETRA
       POR LETRA
    ========================= */

    function prepareLetters() {

        const elements = document.querySelectorAll(".letters");

        elements.forEach(element => {

            const text = element.textContent.trim();

            element.innerHTML = "";

            [...text].forEach((character, index) => {

                const letter = document.createElement("span");

                letter.classList.add("letter");

                letter.style.setProperty("--i", index);

                if (character === " ") {
                    letter.innerHTML = "&nbsp;";
                } else {
                    letter.textContent = character;
                }

                element.appendChild(letter);
            });

        });

    }

    prepareLetters();


    /* =========================
       REPETIR ANIMACIÓN
    ========================= */

    function replaySection(section) {

        if (!section) return;

        section.classList.remove("visible");

        /* Quita movimiento anterior de las cartas */
        const cards = section.querySelectorAll(".card");

        cards.forEach(card => {
            card.classList.remove("floating");
        });

        /* Obliga al navegador a reiniciar la animación */
        void section.offsetWidth;

        section.classList.add("visible");


        /* Las cartas empiezan a flotar después de repartirse */

        if (section.id === "inicio") {

            setTimeout(() => {

                if (section.classList.contains("visible")) {

                    cards.forEach(card => {
                        card.classList.add("floating");
                    });

                }

            }, 1900);
        }

    }


    /* =========================
       ANIMACIÓN INICIAL
    ========================= */

    setTimeout(() => {
        replaySection(hero);
    }, 200);


    /* =========================
       DETECTAR CAMBIO DE SECCIÓN
    ========================= */

    let activeSection = null;

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting &&
                    entry.intersectionRatio >= 0.45
                ) {

                    const section = entry.target;

                    if (activeSection !== section) {

                        activeSection = section;

                        replaySection(section);
                    }
                }

            });

        },
        {
            threshold: [0.45]
        }
    );


    sections.forEach(section => {
        observer.observe(section);
    });


    /* =========================
       MENÚ
    ========================= */

    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            const targetId = link.getAttribute("href");

            const target = document.querySelector(targetId);

            if (!target) return;


            target.scrollIntoView({
                behavior: "smooth"
            });


            /* Reproduce la animación al cambiar */
            setTimeout(() => {

                activeSection = target;

                replaySection(target);

            }, 500);

        });

    });


    /* =========================
       HEADER AL HACER SCROLL
    ========================= */

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {
            header.classList.add("small");
        } else {
            header.classList.remove("small");
        }

    });


    /* =========================
       BOTÓN DESCUBRIR
    ========================= */

    const discoverBtn = document.getElementById("discoverBtn");

    if (discoverBtn) {

        discoverBtn.addEventListener("click", () => {

            const juego = document.getElementById("juego");

            juego.scrollIntoView({
                behavior: "smooth"
            });

        });

    }


    /* =========================
       EFECTO EXTRA AL MOVER
       EL MOUSE SOBRE LAS CARTAS
    ========================= */

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        card.addEventListener("mousemove", event => {

            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 12;
            const rotateY = (centerX - x) / 12;

            card.style.filter =
                `brightness(1.08)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.filter = "brightness(1)";

        });

    });

});