let atributos = {
    coragem: 0,
    prudencia: 0,
    compaixao: 0,
    curiosidade: 0,
    responsabilidade: 0,
    ambicao: 0,
    consciencia: 0,
    honestidade: 0,
    determinacao: 0,
    resiliencia: 0
};
let capitulo;
let cenaAtual = 0;

const narracao = document.getElementById("narracao");
const titulo = document.getElementById("titulo");
const escolhas = document.getElementById("escolhas");
const botao = document.getElementById("proximaCena");

fetch("dados/capitulo1.json")
.then(resposta => resposta.json())
.then(dados => {

    capitulo = dados;

    titulo.textContent = capitulo.titulo;

    carregarCena(0);

});


function carregarCena(id){

    const cena = capitulo.cenas.find(c => c.id === id);

    if(!cena){
        console.log("Cena não encontrada:", id);
        return;
    }


    narracao.innerHTML = "";
    escolhas.innerHTML = "";

    cenaAtual = id;


    let textoAtual = 0;


    function mostrarTexto(){

        if(textoAtual < cena.texto.length){

            narracao.innerHTML += `<p>${cena.texto[textoAtual]}</p>`;

            textoAtual++;

        }else{

            mostrarEscolhas(cena);

        }

    }


    botao.disabled = false;
    botao.textContent = "Continuar";

    botao.onclick = mostrarTexto;


    mostrarTexto();

}



function mostrarEscolhas(cena){

    escolhas.innerHTML = "";


    if(cena.finalCapitulo){

    botao.disabled = false;
    botao.textContent = "Continuar para o Capítulo 2";

    botao.onclick = () => {
      

        carregarCapitulo2();

    };

    return;

}

if(cena.escolhas.length === 0){

    botao.textContent = "Fim do Capítulo";

    return;

}


    cena.escolhas.forEach((opcao, indice)=>{


        const botaoEscolha = document.createElement("button");

        botaoEscolha.className = "opcao";

        botaoEscolha.textContent =
        `${String.fromCharCode(65 + indice)} - ${opcao.texto}`;


   botaoEscolha.onclick = () => {

    if(opcao.atributo){
        atributos[opcao.atributo] += opcao.valor;
    }

    carregarCena(opcao.proximaCena);

};


    });


    botao.disabled = true;

}


function carregarCapitulo2(){

    fetch("dados/capitulo2.json")

    .then(resposta => resposta.json())

    .then(dados => {

        capitulo = dados;

        titulo.textContent = capitulo.titulo;

        carregarCena(capitulo.cenas[0].id);

    });

}