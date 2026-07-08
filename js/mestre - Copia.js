const engine = new Engine();

console.log("Engine iniciado!");

engine.carregarCapitulo("capitulo1.json");


setTimeout(() => {

    document.querySelector("h1").innerHTML = engine.capitulo.titulo;

  let cena = engine.obterCenaAtual();

let texto = cena.texto.join("<br><br>");

    document.getElementById("texto").innerHTML = texto;

    let areaEscolhas = document.getElementById("escolhas");

    cena.escolhas.forEach(escolha => {

        let botao = document.createElement("button");

        botao.innerHTML = escolha.texto;

        botao.onclick = function(){

            console.log("Escolha feita.");
            console.log(escolha.texto);

            engine.atributos[escolha.atributo] += escolha.valor;

            mostrarAtributos();

            areaEscolhas.innerHTML = "";
        };

        areaEscolhas.appendChild(botao);

    });


    mostrarAtributos();


}, 1000);


function mostrarAtributos(){

    let painel = document.getElementById("atributos");

    painel.innerHTML = "";

    for(let atributo in engine.atributos){

        painel.innerHTML += 
        atributo + ": " + engine.atributos[atributo] + "<br>";

    }

}