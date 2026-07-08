// ======================================
// O ENFERMEIRO RPG
// Mestre 3.0
// ======================================

const engine = new Engine();

// ===============================
// ELEMENTOS DA TELA
// ===============================

const titulo = document.querySelector("h1");
const narracao = document.getElementById("texto");
const escolhas = document.getElementById("escolhas");
const atributos = document.getElementById("atributos");
const cenario = document.getElementById("cenario");
const fade = document.getElementById("fade");

// Velocidade da máquina de escrever
const VELOCIDADE_TEXTO = 20;

// ===============================
// INICIAR JOGO
// ===============================

async function iniciar(){

    const carregou = await engine.carregarCapitulo("capitulo1.json");

    if(!carregou){

        alert("Erro ao carregar o capítulo.");

        return;

    }

    await atualizarTela();

}

window.onload = iniciar;

// ===============================
// ATUALIZAR TELA
// ===============================

async function atualizarTela(){

    const cena = engine.obterCenaAtual();

    if(!cena) return;

    // Fade para preto
    await fadeIn();

    // Atualiza título
    mostrarTitulo();

    // Atualiza cenário
    mostrarCenario(cena);

    // Fade de volta
    await fadeOut();

    // Limpa escolhas
    escolhas.innerHTML = "";

    // Mostra narração
    await mostrarNarracao(cena);

    // Mostra escolhas
    await mostrarEscolhas(cena);

    // Atualiza atributos
    mostrarAtributos();

}

// ===============================
// TÍTULO
// ===============================

function mostrarTitulo(){

    titulo.textContent = engine.obterTitulo();

}

// ===============================
// CENÁRIO
// ===============================

function mostrarCenario(cena){

    cenario.style.transform = "scale(1)";

    cenario.style.backgroundImage =
        `url("img/${cena.imagem}")`;

    setTimeout(()=>{

        cenario.style.transform = "scale(1.08)";

    },50);

}


// ===============================
// NARRAÇÃO
// ===============================

async function mostrarNarracao(cena){

    narracao.innerHTML = "";

    const texto = cena.texto.join("<br><br>");

    let i = 0;

    while(i < texto.length){

        // Mantém as quebras de linha
        if(texto.substring(i, i + 4) === "<br>"){

            narracao.innerHTML += "<br>";

            i += 4;

            continue;

        }

        narracao.innerHTML += texto[i];

        await esperar(VELOCIDADE_TEXTO);

        i++;

    }

}

// ===============================
// ESCOLHAS
// ===============================

async function mostrarEscolhas(cena){

    escolhas.innerHTML = "";

    if(!cena.escolhas || cena.escolhas.length === 0){

        return;

    }

    for(const opcao of cena.escolhas){

        const botao = document.createElement("button");

        botao.className = "opcao";

        botao.textContent = opcao.texto;

        botao.style.opacity = "0";

        botao.style.transform = "translateY(15px)";

        botao.onclick = async ()=>{

            engine.escolher(opcao);

            await atualizarTela();

        };

        escolhas.appendChild(botao);

        await esperar(250);

        botao.style.transition = "all .4s ease";

        botao.style.opacity = "1";

        botao.style.transform = "translateY(0)";

    }

}

// ===============================
// ATRIBUTOS
// ===============================

function mostrarAtributos(){

    atributos.innerHTML = "";

    const dados = engine.obterAtributos();

    for(const nome in dados){

        const valor = dados[nome];

        atributos.innerHTML += `

        <div class="atributo">

            <div class="nomeAtributo">

                ${capitalizar(nome)}

            </div>

            <div class="barra">

                <div
                    class="preenchimento ${nome}"
                    style="width:${valor * 10}%">
                </div>

            </div>

            <span>${valor}/10</span>

        </div>

        `;

    }

}


// ===============================
// FADE
// ===============================

function fadeIn(){

    return new Promise(resolve=>{

        fade.classList.add("ativo");

        setTimeout(resolve,800);

    });

}

function fadeOut(){

    return new Promise(resolve=>{

        fade.classList.remove("ativo");

        setTimeout(resolve,800);

    });

}

// ===============================
// UTILIDADES
// ===============================

function esperar(ms){

    return new Promise(resolve=>{

        setTimeout(resolve,ms);

    });

}

function capitalizar(texto){

    return texto.charAt(0).toUpperCase() +
           texto.slice(1);

}