const MAX_INTENTOS = 5;
const CONTRASENA = "contraseña";
let intentos = 0;

const inputComando = document.getElementById("input-comando");
const feedback = document.getElementById("feedback");
const intentosRestantes = document.getElementById("intentos-restantes");
const pantallaNegra = document.getElementById("pantalla-negra");
const comandoContainer = document.getElementById("comando-container");
const cmdScreen = document.getElementById("cmd-screen");
const cmdLog = document.getElementById("cmd-log");
const cmdInput = document.getElementById("input-cmd");
const glitchScreen = document.getElementById("glitch-screen");
const glitchTextContainer = document.getElementById("glitch-text-container");

let bucleActivo = false; // Para el comando "bucle"

// Maneja el evento de clic en el botón de enviar
document.getElementById("btn-enviar").addEventListener("click", function () {
    const input = inputComando.value.trim().toLowerCase();
    if (input === CONTRASENA) {
        mostrarConsolaCmd();
    } else {
        intentos++;
        feedback.textContent = `Intento ${intentos} fallido.`;
        intentosRestantes.textContent = `Intentos restantes: ${MAX_INTENTOS - intentos}`;

        if (intentos >= MAX_INTENTOS) {
            activarGlitch();
        }
    }
});

// Mostrar la consola CMD después de ingresar la contraseña correcta
function mostrarConsolaCmd() {
    comandoContainer.style.display = 'none';  // Oculta el formulario de contraseña
    pantallaNegra.style.display = 'none';     // Oculta la pantalla negra inicial
    cmdScreen.classList.remove("hidden");     // Muestra la consola CMD
    cmdScreen.style.display = "flex";         // Asegura que se vea la consola

    // Maneja los comandos escritos en la consola
    cmdInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            procesarComando(cmdInput.value);
            cmdInput.value = "";
        }
    });
}

// Activar el glitch después de fallar 5 veces
function activarGlitch() {
    pantallaNegra.style.display = 'none';
    comandoContainer.style.display = 'none';
    glitchScreen.style.display = 'block';  // Muestra la pantalla de glitch

    // Llenar la pantalla con texto Zalgo o caracteres aleatorios
    const glitchInterval = setInterval(function () {
        const textoZalgo = generarTextoAleatorioZalgo();
        const glitchTexto = document.createElement("div");
        glitchTexto.textContent = textoZalgo;
        glitchTexto.style.position = "absolute";
        glitchTexto.style.color = "limegreen";
        glitchTexto.style.fontSize = "24px";
        glitchTexto.style.left = `${Math.random() * window.innerWidth}px`;
        glitchTexto.style.top = `${Math.random() * window.innerHeight}px`;
        glitchTextContainer.appendChild(glitchTexto);

        // Elimina el texto después de un tiempo
        setTimeout(() => {
            glitchTexto.remove();
        }, 1000);
    }, 200);

    // Termina el glitch después de 5 segundos
    setTimeout(function () {
        clearInterval(glitchInterval);
        glitchScreen.style.display = 'none';  // Ocultar la pantalla de glitch
        reiniciarSistema(); // Restablecer el estado después del glitch
    }, 5000);
}

// Reiniciar el sistema después del glitch
function reiniciarSistema() {
    intentos = 0;  // Reiniciar los intentos
    feedback.textContent = "";
    intentosRestantes.textContent = `Intentos restantes: ${MAX_INTENTOS}`;
    comandoContainer.style.display = 'block';  // Mostrar el campo de contraseña de nuevo
    pantallaNegra.style.display = 'block';     // Restaurar la pantalla negra
}

// Genera texto Zalgo aleatorio
function generarTextoAleatorioZalgo() {
    const charsZalgo = [
        "A̷̜̗̫̘̓̀̾̓̈́͠",
        "L̸̲̩͚̣̣͊͋̋̈̄̾̕̕͠",
        "M̶͉̺̘͉̣̝̦̋̿̍͒͠",
        "O̵̡͔͎͉̗̠̰̲̙͑̌͒̓̾̄",
        "T̴͉̩͓̥̮̣͎̟̎̇̈́͒̔̈",
        "يَةِ", // texto árabe
        "صَفْحَةٍ", // texto árabe
        "ظَاهِرَةِ", // texto árabe
        "اِحْتِمَالُ"  // texto árabe
    ];
    const randIndex = Math.floor(Math.random() * charsZalgo.length);
    return charsZalgo[randIndex];
}

// Procesa los comandos escritos en la consola
function procesarComando(comando) {
    const comandos = {
        "misterio": "Un lugar oculto en los archivos...",
        "clave": "Sistemas abiertos en archivo remoto.",
        "desconocido": "Revelación inminente.",
        "despertar": "¿Estás listo para ver lo que no deberías?",
        "404": "Archivo no encontrado. ¿Lo perdiste o lo ocultaste?",
        "luz": "A veces, la luz revela más de lo que oculta.",
        "oculto": "Lo que buscas está justo ante ti. Solo tienes que mirar más allá de lo evidente.",
        "malware": "Acceso denegado. Sistema comprometido.",
        "control": "El control nunca fue tuyo.",
        "inverso": "Texto invertido. Usa 'revertir' para volver a la normalidad.",
        "revertir": "Texto restaurado.",
        "laberinto": "Bienvenido al laberinto. Ingresa direcciones: norte, sur, este, oeste.",
        "escape": "No puedes escapar de lo inevitable.",
        "paradoja": "Ayer te lo dije. Hoy lo olvidaste. Mañana recordarás lo que nunca pasó.",
        "memoria": "No es como lo recuerdas, ¿verdad? El tiempo no está de tu lado.",
        "espera": "Esperando respuesta...",
        "eco": "Todo lo que escribas se repetirá hasta que lo detengas.",
        "silencio": "El eco ha desaparecido.",
        "bucle": "Reconectando...",
        "anomalía": "El sistema se reiniciará pronto debido a una anomalía."
    };

    // Comandos para mostrar la imagen en movimiento
    const comandosImagen = ["pito", "johan", "tio", "kbro", "goni", "goñi"];

    // Comandos para mostrar otra imagen
    const comandosImagenAlternativa = ["berenjena", "gampi", "pinga"];

    // Procesa los comandos de imagen flotante
    if (comandosImagen.includes(comando)) {
        mostrarImagenMoviendose();
        return; // Salimos de la función para no procesar otros comandos
    }

    // Procesa los comandos de otra imagen
    if (comandosImagenAlternativa.includes(comando)) {
        mostrarEmojisYImagen();
        return; // Salimos de la función para no procesar otros comandos
    }

    // Procesa otros comandos de texto
    cmdLog.textContent += `> ${comando}\n`;

    if (comandos[comando]) {
        cmdLog.textContent += `${comandos[comando]}\n`;

        if (comando === "404" || comando === "malware" || comando === "control") {
            errorVisual();
        }

        if (comando === "despertar") {
            efectoVisual();
        }

        if (comando === "memoria") {
            memoriaFragmentada();
        }

        if (comando === "anomalía") {
            reinicioAnomalia();
        }
    } else {
        cmdLog.textContent += `Comando no reconocido...\n`;
    }
}

// Función para mostrar la imagen en movimiento
function mostrarImagenMoviendose() {
    const imagenUrl = "https://f9fff1a938.cbaul-cdnwnd.com/274989ceae8e977eab31f993f8d1154a/200000024-8002d8002f/700/91c65f78-3407-4db7-9fc4-0dbf70dc6c0b.webp";
    const imagen = document.createElement("img");
    imagen.src = imagenUrl;
    imagen.style.position = "absolute";
    imagen.style.width = "150px";
    imagen.style.zIndex = "9999";

    document.body.appendChild(imagen);

    let tiempoMovimiento = 5000; // 5 segundos de movimiento
    let tiempoInicio = Date.now();

    function moverImagen() {
        if (Date.now() - tiempoInicio < tiempoMovimiento) {
            const x = Math.random() * (window.innerWidth - imagen.width);
            const y = Math.random() * (window.innerHeight - imagen.height);

            imagen.style.left = `${x}px`;
            imagen.style.top = `${y}px`;

            // Generar texto Zalgo o árabe aleatorio
            const textoZalgo = generarTextoAleatorioZalgo();
            const divTexto = document.createElement("div");
            divTexto.textContent = textoZalgo;
            divTexto.style.position = "absolute";
            divTexto.style.top = `${y + 50}px`; // ligeramente debajo de la imagen
            divTexto.style.left = `${x + 20}px`;
            divTexto.style.color = "limegreen";
            divTexto.style.fontSize = "20px";
            divTexto.style.zIndex = "10000";
            document.body.appendChild(divTexto);

            // Eliminar texto después de un tiempo
            setTimeout(() => {
                divTexto.remove();
            }, 2000);

            requestAnimationFrame(moverImagen);
        } else {
            imagen.remove();
        }
    }

    moverImagen();
}

// Función para mostrar los emojis y la imagen
function mostrarEmojisYImagen() {
    const tiempoMovimiento = 5000; // 5 segundos
    const emoji = "🍆🍆🍆"; // Emoji de berenjena
    const cantidadEmojis = 10; // Cantidad de emojis a mostrar

    // Mover emojis aleatorios
    for (let i = 0; i < cantidadEmojis; i++) {
        const divEmoji = document.createElement("div");
        divEmoji.textContent = emoji;
        divEmoji.style.position = "absolute";
        divEmoji.style.fontSize = "30px"; // Tamaño del emoji
        divEmoji.style.zIndex = "9999";

        document.body.appendChild(divEmoji);

        // Mover el emoji a una posición aleatoria
        moverEmojiAleatorio(divEmoji, tiempoMovimiento);
    }

    // Mostrar la imagen en el mismo tiempo
    const imagenUrlAlternativa = "https://4a0152e3a4.cbaul-cdnwnd.com/4a3c4b1cd2ab02fb8561cb9536085dd0/200000009-156ae156b1/450/kbro.webp";
    const imagenAlternativa = document.createElement("img");
    imagenAlternativa.src = imagenUrlAlternativa;
    imagenAlternativa.style.position = "absolute";
    imagenAlternativa.style.width = "150px";
    imagenAlternativa.style.zIndex = "9999";

    document.body.appendChild(imagenAlternativa);

    // Posicionar la imagen en un lugar aleatorio
    const xImagen = Math.random() * (window.innerWidth - imagenAlternativa.width);
    const yImagen = Math.random() * (window.innerHeight - imagenAlternativa.height);

    imagenAlternativa.style.left = `${xImagen}px`;
    imagenAlternativa.style.top = `${yImagen}px`;

    // Eliminar la imagen y emojis después de 5 segundos
    setTimeout(() => {
        imagenAlternativa.remove();
        const emojis = document.querySelectorAll("div"); // Selecciona todos los divs de emojis
        emojis.forEach((emojiDiv) => emojiDiv.remove()); // Elimina cada div de emoji

        // Cambiar el color del texto de la consola a morado
        cambiarColorConsola("purple");
    }, tiempoMovimiento);
}

// Función para mover el emoji aleatoriamente
function moverEmojiAleatorio(divEmoji, tiempoMovimiento) {
    const tiempoInicio = Date.now();

    function mover() {
        if (Date.now() - tiempoInicio < tiempoMovimiento) {
            const x = Math.random() * (window.innerWidth - divEmoji.offsetWidth);
            const y = Math.random() * (window.innerHeight - divEmoji.offsetHeight);

            divEmoji.style.left = `${x}px`;
            divEmoji.style.top = `${y}px`;

            requestAnimationFrame(mover);
        }
    }

    mover();
}

// Función para cambiar el color del texto de la consola
function cambiarColorConsola(color) {
    cmdLog.style.color = color; // Cambia el color del texto de la consola
}
