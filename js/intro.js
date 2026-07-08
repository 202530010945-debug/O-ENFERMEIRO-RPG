const frases = [

"Rio de Janeiro, segunda metade do século XIX...",

"Toda decisão parece simples...",

"Até que seja tarde demais.",

"O ENFERMEIRO",

"Baseado no conto de Machado de Assis"

];

const texto = document.getElementById("introTexto");

let indice = 0;

function mostrar(){

    texto.style.opacity = 0;

    setTimeout(()=>{

        texto.innerHTML = frases[indice];

        texto.style.opacity = 1;

    },500);

    indice++;

    if(indice < frases.length){

        setTimeout(mostrar,3500);

    }else{

    setTimeout(()=>{

        texto.innerHTML = `

        <h1>O ENFERMEIRO RPG</h1>

        <h2>Escaneie para participar da história</h2>

        <img src="img/qrcode.pneg" class="qrcode" alt="QR Code">

        <br><br>

        <button onclick="location.href='mestre.html'">
            MODO MESTRE
        </button>

        <button onclick="location.href='publico.html'">
            MODO PÚBLICO
        </button>

        `;

    },4000);

}

}

mostrar();