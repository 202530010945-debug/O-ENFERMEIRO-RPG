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

            location.href="mestre.html";

        },4000);

    }

}

mostrar();