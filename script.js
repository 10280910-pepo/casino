
const clock = document.getElementById('clock');

function updateClock() {
  if (!clock) return;

  clock.textContent = new Date().toLocaleTimeString('es-SV', {
    hour12: false
  });
}

updateClock();
setInterval(updateClock, 1000);

// Movimiento 3D con el mouse
const hero = document.querySelector('.hero');
const content = document.querySelector('.content');
const video = document.querySelector('.city video');

if (hero && content && video) {
  hero.addEventListener('mousemove', (event) => {
    if (window.innerWidth < 701) return;

    const rect = hero.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    content.style.transform =
      `perspective(900px) rotateY(${x * -3}deg) rotateX(${y * 2}deg)`;

    video.style.transform =
      `scale(1.06) translate(${x * -8}px, ${y * -5}px)`;
  });

  hero.addEventListener('mouseleave', () => {
    content.style.transform = '';
    video.style.transform = '';
  });
}

// Secuencia de acceso
const accessButton = document.getElementById('access');
const message = document.getElementById('message');

if (accessButton && message) {
  accessButton.addEventListener('click', () => {
    accessButton.disabled = true;
    message.textContent = 'CONECTANDO CON NEXUS...';

    setTimeout(() => {
      message.textContent =
        'ACCESO CONCEDIDO // BIENVENIDO AL SISTEMA';

      accessButton.disabled = false;
    }, 1100);
  });
}

const musica = document.getElementById("musica");
const boton = document.getElementById("botonMusica");

boton.addEventListener("click", async () => {
    if (musica.paused) {
        try {
            await musica.play();
            boton.textContent = "⏸ PAUSAR MÚSICA";
        } catch (error) {
            console.error("No se pudo reproducir la música:", error);
            boton.textContent = "ERROR AL REPRODUCIR";
        }
    } else {
        musica.pause();
        boton.textContent = "▶ REPRODUCIR MÚSICA";
    }
});

musica.addEventListener("ended", () => {
    boton.textContent = "▶ REPRODUCIR MÚSICA";
});
