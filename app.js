//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do numero secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'escolha um numero entre 1 e max';

let max = 10;
let min = 1;
let listasNumerosSecretosJaSorteados = [];
let numeroSecreto = gerarNumeroAleatorio(max, min);
let tentativas = 1;

function verificarChute() {
    let chute = document.querySelector('input').value;
    //console.log(chute == numeroSecreto);
    if(chute == numeroSecreto) {
        exibirTextotela('h1', 'vc acertou');
        let msgTentativas = `vc acertou com ${tentativas} tentativas`;
        exibirTextotela('p', msgTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else if(chute < numeroSecreto) {
        exibirTextotela('p', 'escolha um numero maior');
        limparCampo();
    } else {
        exibirTextotela('p', 'escolha um numero menor');
        limparCampo();
    }
    tentativas++;
}

function exibirTextotela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function exibirMsgInicial() {
    exibirTextotela('h1', 'Jogo do numero secreto');
    exibirTextotela('p', 'escolha um numero entre 1 e 10');
}

exibirMsgInicial();

function gerarNumeroAleatorio(max, min) {
    let numeroEscolhido = parseInt(Math.random() * max + min);

    if(listasNumerosSecretosJaSorteados.length == max) {
        listasNumerosSecretosJaSorteados = [];
    }
    if(listasNumerosSecretosJaSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio()
    } else {
        listasNumerosSecretosJaSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    limparCampo();
    tentativas = 1;
    numeroSecreto = gerarNumeroAleatorio();
    exibirMsgInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}