//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function (req, res) {
    res.render("Home");
});

app.post("/", function (req, res) {
    const limiteInferior = req.body.limiteInf;
    const limiteSuperior = req.body.limiteSup;

    // Declaração de variáveis
    let numero = [];
    let expressao = [];
    let soma = [];
    let divisao = [];
    let teste = [];
    let avaliacao = [];
    let contador = 0;
    let posicaoVetor = 0;
    let message = "";

    for (let n = limiteInferior; n <= limiteSuperior; n++) {
        numero.push(Number(n));
        expressao.push("(" + String(numero[posicaoVetor]) + ") + (" + String(numero[posicaoVetor] + 1) + ") + (" + String(numero[posicaoVetor] + 2) + ")");
        soma.push((numero[posicaoVetor]) + (numero[posicaoVetor] + 1) + (numero[posicaoVetor] + 2));
        divisao.push(soma[posicaoVetor] / 3);
        teste.push(divisao[posicaoVetor] - Math.floor(divisao[posicaoVetor]));
    
        // Verifica se o resto da subtração é zero
        if (soma[posicaoVetor] % 3 == 0) {
            avaliacao.push(true);
        } else {
            avaliacao.push(false);
            contador++;
        }

        posicaoVetor++;
    }

    if (contador == 0) {
        message = "Todos os valores testados confirmam a proposição.";
    } else {
        message = "Ao menos um valor testado não confirma a proposição.";
    }

    res.render("Resultado", {numeroJS: numero, expressaoJS: expressao, somaJS: soma, divisaoJS: divisao, testeJS: teste, avaliacaoJS: avaliacao, comprimentoJS: posicaoVetor, messageJS: message});
});


app.listen(process.env.PORT || 3000, function() {
    console.log("Server started succesfully.");
});