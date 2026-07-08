const engine = new Engine();

const telaNome = document.getElementById("telaNome");
const jogo = document.getElementById("jogo");
const botao = document.getElementById("btnEntrar");

let digitando = false;
let textoCompleto = "";
let intervaloTexto;

botao.onclick = iniciarJogo;

// ===============================
// INICIAR JOGO
// ===============================

async function iniciarJogo() {

    const nome = document.getElementById("nomeJogador").value.trim();

    if (nome === "") {
        alert("Digite seu nome.");
        return;
    }

    localStorage.setItem("jogador", nome);

    telaNome.style.display = "none";
    jogo.style.display = "block";

    const carregou = await engine.carregarCapitulo("capitulo1.json");

    if (!carregou) {
        alert("Erro ao carregar o capítulo.");
        return;
    }

    mostrarCena();
}

// ===============================
// MOSTRAR CENA
// ===============================

function mostrarCena() {

    const cena = engine.obterCenaAtual();

    document.getElementById("titulo").textContent =
        engine.obterTitulo();

   escreverTexto(
    cena.texto.join("\n\n")
);
        const nomePersonagem = document.getElementById("personagem");

if (cena.nome) {
    nomePersonagem.textContent = cena.nome;
    nomePersonagem.style.display = "inline-block";
} else {
    nomePersonagem.style.display = "none";
}

    document.getElementById("cenario").style.backgroundImage =
        `url("img/${cena.imagem}")`;

    mostrarEscolhas();
    mostrarAtributos();
}

// ===============================
// MOSTRAR ESCOLHAS
// ===============================

function mostrarEscolhas() {

    const caixa = document.getElementById("escolhas");

    caixa.innerHTML = "";

    const cena = engine.obterCenaAtual();

    if (!cena.escolhas || cena.escolhas.length === 0) {
        return;
    }

    for (const opcao of cena.escolhas) {

        const botao = document.createElement("button");

        botao.className = "opcao";

        botao.textContent = opcao.texto;

        botao.onclick = () => {

            engine.escolher(opcao);

            mostrarCena();

        };

        caixa.appendChild(botao);

    }

}

// ===============================
// MOSTRAR ATRIBUTOS
// ===============================

function mostrarAtributos() {

    const caixa = document.getElementById("atributos");

    caixa.innerHTML = "";

    const atributos = engine.obterAtributos();

    for (const nome in atributos) {

        caixa.innerHTML += `
            <p><strong>${nome.charAt(0).toUpperCase() + nome.slice(1)}:</strong> ${atributos[nome]}/10</p>
        `;

    }

}

function escreverTexto(texto) {

    const caixa = document.getElementById("texto");

    textoCompleto = texto;

    caixa.innerHTML = "";

    let i = 0;

    digitando = true;

    clearInterval(intervaloTexto);

    intervaloTexto = setInterval(() => {

        caixa.innerHTML += texto.charAt(i);

        i++;

        if (i >= texto.length) {

            clearInterval(intervaloTexto);

            digitando = false;

        }

    }, 30);

    document.getElementById("texto").onclick = () => {

    const caixa = document.getElementById("texto");


    if (digitando) {

        clearInterval(intervaloTexto);

        caixa.innerHTML = textoCompleto;

        digitando = false;

    }

};

}