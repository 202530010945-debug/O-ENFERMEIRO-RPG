// ======================================
// O ENFERMEIRO RPG
// Engine 3.0
// ======================================

class Engine {

    constructor(){

        this.capitulo = null;

        this.cenaAtual = 0;

        this.eventos = [];

        this.atributos = {

            moral:5,
            paciencia:5,
            consciencia:5,
            ambicao:5,
            medo:5,
            prudencia:5

        };

    }


    // ==========================
    // CARREGAR CAPÍTULO
    // ==========================

    async carregarCapitulo(nomeArquivo){

        try{

            const resposta = await fetch("dados/" + nomeArquivo);

            if(!resposta.ok){

                throw new Error("Capítulo não encontrado.");

            }

            this.capitulo = await resposta.json();

            this.cenaAtual = 0;

            return true;

        }

        catch(erro){

            console.error(erro);

            return false;

        }

    }


    // ==========================
    // CENA ATUAL
    // ==========================

    obterCenaAtual(){

        if(!this.capitulo) return null;

        return this.capitulo.cenas[this.cenaAtual];

    }


    // ==========================
    // TÍTULO
    // ==========================

    obterTitulo(){

        return this.capitulo.titulo;

    }


    // ==========================
    // ATRIBUTOS
    // ==========================

    obterAtributos(){

        return this.atributos;

    }


    alterarAtributo(nome, valor){

        if(this.atributos[nome] == undefined) return;

        this.atributos[nome] += valor;

        if(this.atributos[nome] < 0)
            this.atributos[nome] = 0;

        if(this.atributos[nome] > 10)
            this.atributos[nome] = 10;

    }


    // ==========================
    // ESCOLHAS
    // ==========================

    escolher(opcao){

        if(opcao.atributo){

            this.alterarAtributo(
                opcao.atributo,
                opcao.valor
            );

        }

        if(opcao.evento){

            this.eventos.push(opcao.evento);

        }

        this.cenaAtual = opcao.proximaCena;

    }


    // ==========================
    // EVENTOS
    // ==========================

    possuiEvento(nome){

        return this.eventos.includes(nome);

    }


    // ==========================
    // FIM DO CAPÍTULO
    // ==========================

    terminouCapitulo(){

        const cena = this.obterCenaAtual();

        if(!cena) return true;

        return cena.escolhas.length == 0;

    }

}