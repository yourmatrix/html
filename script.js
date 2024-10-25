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

    // Opcional: Reproduce un sonido o animación de glitch durante el efecto.
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
        "يَةِ", // texto arabe
        "صَفْحَةٍ", // texto arabe
        "ظَاهِرَةِ", // texto arabe
        "اِحْتِمَالُ"  // texto arabe
    ];
    const randIndex = Math.floor(Math.random() * charsZalgo.length);
    return charsZalgo[randIndex];
}


function procesarComando(comando) {
    const comandos = {
        "misterio": "Un lugar oculto en los archivos...",
        "clave": "Sistemas abiertos en archivo remoto.",
        "desconocido": "Revelacion inminente.",
        "despertar": "Estas listo para ver lo que no deberias?",
        "404": "Archivo no encontrado. ¿Lo perdiste o lo ocultaste?",
        "luz": "A veces, la luz revela mas de lo que oculta.",
        "oculto": "Lo que buscas esta justo ante ti. Solo tienes que mirar mas alla de lo evidente.",
        "malware": "Acceso denegado. Sistema comprometido.",
        "control": "El control nunca fue tuyo.",
        "inverso": "Texto invertido. Usa 'revertir' para volver a la normalidad.",
        "revertir": "Texto restaurado.",
        "laberinto": "Bienvenido al laberinto. Ingresa direcciones: norte, sur, este, oeste.",
        "escape": "No puedes escapar de lo inevitable.",
        "paradoja": "Ayer te lo dije. Hoy lo olvidaste. Manana recordaras lo que nunca paso.",
        "memoria": "No es como lo recuerdas, ¿verdad? El tiempo no esta de tu lado.",
        "espera": "Esperando respuesta...",
        "eco": "Todo lo que escribas se repetira hasta que lo detengas.",
        "silencio": "El eco ha desaparecido.",
        "bucle": "Reconectando...",
        "anomalía": "El sistema se reiniciara pronto debido a una anomalia."
    };

    // Nuevos comandos para mostrar la imagen moviendose
    const comandosImagen = ["pito", "johan", "tio", "kbro", "goni", "goñi"];

    if (comandosImagen.includes(comando)) {
        mostrarImagenMoviendose();
    } else if (comando === "alonzo") {
        iniciarLaberinto();
    } else if (comando === "inverso") {
        invertirTexto(true);
    } else if (comando === "revertir") {
        invertirTexto(false);
    } else if (comando === "bucle") {
        iniciarBucle();
    } else if (comando === "eco") {
        iniciarEco();
    } else if (comando === "silencio") {
        detenerEco();
    } else if (comando === "espera") {
        esperarRespuesta();
    } else {
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
}

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

            // Generar texto zalgo o arabe aleatorio
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

function generarTextoAleatorioZalgo() {
    const charsZalgo = [
        "A̷̜̗̫̘̓̀̾̓̈́͠",
        "L̸̲̩͚̣̣͊͋̋̈̄̾̕̕͠",
        "M̶͉̺̘͉̣̝̦̋̿̍͒͠",
        "O̵̡͔͎͉̗̠̰̲̙͑̌͒̓̾̄",
        "T̴͉̩͓̥̮̣͎̟̎̇̈́͒̔̈",
        "يَةِ", // texto arabe
        "صَفْحَةٍ", // texto arabe
        "ظَاهِرَةِ", // texto arabe
        "اِحْتِمَالُ"  // texto arabe
    ];
    const randIndex = Math.floor(Math.random() * charsZalgo.length);
    return charsZalgo[randIndex];
}
