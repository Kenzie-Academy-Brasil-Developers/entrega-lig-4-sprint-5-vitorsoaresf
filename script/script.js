// -------------------------------------VARIAVEIS--------------------------------------------------------

const main = document.getElementById('app');

// BOX QUE EXIBE O TABULEIRO
const box_tabuleiro = document.createElement('div');
box_tabuleiro.classList.add('box_tabuleiro');
main.appendChild(box_tabuleiro);

// BOX QUE EXIBE O TIMER
const box_time = document.createElement('div');

// BOX QUE EXIBE A IMAGEM DO SONIC E MARIO
const box_players = document.createElement('div');
box_players.classList.add('box_players');

// PASSWORD DA ZOACAO
const keycode = new Array(10);

// VARIAVEL PARA ARMAZENAR OS ELEMENTOS PAIS DOS DISCOS  PARA 
// REMOVER OS EFEITOS DEFAULT E INSERIR O NOVO -> SE EH PAI DE SONIC - AZUL
// SE EH PAI DO MARIO - VERMELHO
const paiDiscosAdd = [];

// VARIAVEIS DOS BOTOES DAS TELAS DE VITORIA, EMPATE E INFORMACOES
const info = document.getElementById('info');
const voltarInfo = document.getElementById('voltarInfo');
const irInfo = document.getElementById('buttonInfo');
const irRegras = document.getElementById('buttonHelp');
const regras = document.getElementById('regras');
const voltarRegras = document.getElementById('botaoRegras');

// VARIAVEIS DE SOUND DO GAME
const nicolau = new Audio("assets/musicas para o jogo/nicolau.mp3")
const botaoInicio = document.getElementById('botaoIniciar');
const inicio = document.getElementById('paiInicio');
const buttonSound = document.getElementById('buttonSound');
const buttonHelp = document.getElementById('buttonHelp');
const buttonInfo = document.getElementById('buttonInfo');
const vitoriaSonic = document.getElementById('sonicGanha');
const vitoriaMario = document.getElementById('marioGanha');
const musicaAbertura = document.getElementById('musicaAberturaDeJogo');
const musicaDeFundo = document.getElementById('musicaDeFundoJogo');
const moedaDoMario = document.getElementById('moedaDoMario');
const quedaMoeda = document.getElementById('quedaMoeda');
const moedaDoSonic = document.getElementById('moedaDoSonic');
const musicaEmpate = document.getElementById('musicaEmpate');
const comecoDaPartida = document.getElementById('comecoDaPartida');
const vozSonic = document.getElementById('vozSonic');
const vozMario = document.getElementById('vozMario');
const musicaVitoriaMario = document.getElementById('vitoriaMario');
const musicaVitoriaSonic = document.getElementById('vitoriaSonic');
const resetSonic = document.getElementById('botaoResetaSonic');
const resetMario = document.getElementById('botaoResetaMario');
const telaEmpate = document.getElementById('empate');
const resetEmpate = document.getElementById('botaoResetEmpate');
const musicaDerrota = document.getElementById('musicaDerrota');
const hellMode = document.getElementById('Coringa')
const filhoSonic = document.getElementsByClassName('filhoSonic')
const meioSonic = document.getElementsByClassName('meioSonic')
const filhoMario = document.getElementsByClassName('filhoMario')
const meioMario = document.getElementsByClassName('meioMario')
const imgSonic = document.getElementsByClassName('imgSonic')
const buraco = document.getElementById('buraco')

// VARIAVEL QUE AUXILIARA EM SABER QUAL PLAYER ESTA CORRENTE
let isPlayer1 = true

// ARAMAZENA OS DISCOS PARA A COMPARACAO SE EM ALGUMA COLUNA JA EXISTEM 
// O NUMERO MAXIMO DE DISCOS
let objCol = {
    coluna0: 0,
    coluna1: 0,
    coluna2: 0,
    coluna3: 0,
    coluna4: 0,
    coluna5: 0,
    coluna6: 0
}

// BOOLEANO PARA SETAR O VALOR DO SOUND DO JOGO
let soundOn = true

// VARIAVEL QUE GUARADA OS DISCOS NAS SUAS POSICOES PARA A COMPARACAO
let objDiscos = {}

// VARIAVEIS QUE MANIPULAM A SELECAO E DESSELECAO DOS PLAYERS
let playerNaoEstaJogando;
let desseleciona = false;



// -------------------------------------FUNCOES----------------------------------------------------------

const aplicacao = () => {
    musicaAbertura.play()
    musicaAbertura.loop = true
    novoJogo();
}

const addDisco = (event) => {
    let col = event.target.closest('.coluna');

    clearInterval(playerNaoEstaJogando);

    if (col === null || col === undefined) {
        return
    }

    desselecionaJogador();

    const idCol = col.id;
    if (objCol[idCol] === 6) {
        negaMovimento();
        mudaPlayer();
    } else {
        permiteMovimento();
        let celula = col.children[col.children.length - objCol[idCol] - 1];
        if (celula.lastChild === null) {
            objCol[idCol]++;
            const disco = document.createElement('div');
            if (isPlayer1) {
                disco.classList.add('discoPlayer1');
                disco.id = 'discoPlayer1';
                objDiscos[`disco${idCol[6]}${objCol[idCol]}`] = "Player1"
                moedaDoSonic.play()
            } else {
                disco.closest('div').classList.add('linha_usadaMario')
                disco.classList.add('discoPlayer2');
                disco.id = 'discoPlayer2';
                objDiscos[`disco${idCol[6]}${objCol[idCol]}`] = "Player2"
                moedaDoMario.play()
            }

            celula.appendChild(disco);


            paiDiscosAdd.push(disco);
            sincronizaAnimacoes();

            celula = col.children[col.children.length - objCol[idCol] - 1];
            if (validaHorizontal(`disco${idCol[6]}${objCol[idCol]}`) ||
                validaDiagonal(Number(idCol[6]), objCol[idCol]) ||
                validaVertical(Number(idCol[6]), objCol[idCol])
            ) {
                validaVitoria();
            }
            mudaPlayer();
        }
        if (objCol.coluna0 === 6 &&
            objCol.coluna1 === 6 &&
            objCol.coluna2 === 6 &&
            objCol.coluna3 === 6 &&
            objCol.coluna4 === 6 &&
            objCol.coluna5 === 6 &&
            objCol.coluna6 === 6
        ) {
            validaEmpate();
        }
    }

    playerNaoEstaJogando = setInterval(() => {
        desselecionaJogador();
        mudaPlayer();
    }, 15000);

}

const criarColuna = (id, id1) => {
    const divColuna = document.createElement('div');

    box_tabuleiro.appendChild(divColuna);

    divColuna.classList.add('coluna');

    divColuna.id = 'coluna' + id;

    for (let a = 0; a < id1.length; a++) {
        const divLinha = document.createElement('div');

        divLinha.classList.add('linha');
        divLinha.classList.add('linha_effect')

        divColuna.appendChild(divLinha);

        divLinha.id = 'bloco' + id1[a];
    }
}

const criaFeedbackJogadorCorrente = () => {
    const player1 = document.createElement('div');
    const player2 = document.createElement('div');

    player1.classList.add('player1');
    player2.classList.add('player2');

    player1.id = 'p1';
    player2.id = 'p2';

    box_players.appendChild(player1);
    box_players.appendChild(player2);


    main.insertBefore(box_players, main.firstChild);
}

const criaTime = () => {
    box_time.classList.add('box_time');
    main.insertBefore(box_time, main.firstChild);
}

const desselecionaJogador = () => {
    const p1 = document.getElementById('p1');
    const p2 = document.getElementById('p2');

    if (box_time.childElementCount !== 0) {
        box_time.removeChild(document.getElementById("time"));
    }

    const divTime = document.createElement('div');
    divTime.id = 'time';
    divTime.style.position = 'absolute';
    box_time.appendChild(divTime);


    if (isPlayer1) {
        p1.classList.toggle('player_desselecionado');
        divTime.classList.add('estilo_time1');
        if (desseleciona) {
            p2.classList.toggle('player_desselecionado');
            bool = false
        }
    } else {
        p2.classList.toggle('player_desselecionado');
        p1.classList.toggle('player_desselecionado');
        divTime.classList.add('estilo_time2');
        desseleciona = true;
    }
}

const diag1 = (x, y) => {
    if (getDisco(x + 1, y + 1) === getPlayer()) {
        if (getDisco(x + 2, y + 2) === getPlayer()) {
            if (getDisco(x + 3, y + 3) === getPlayer()) {
                return 3
            } else {
                return 2
            }
        } else {
            return 1
        }
    } else {
        return 0
    }
}

const diag2 = (x, y) => {
    if (getDisco(x + 1, y - 1) === getPlayer()) {
        if (getDisco(x + 2, y - 2) === getPlayer()) {
            if (getDisco(x + 3, y - 3) === getPlayer()) {
                return 3
            } else {
                return 2
            }
        } else {
            return 1
        }
    } else {
        return 0
    }
}

const diag3 = (x, y) => {
    if (getDisco(x - 1, y - 1) === getPlayer()) {
        if (getDisco(x - 2, y - 2) === getPlayer()) {
            if (getDisco(x - 3, y - 3) === getPlayer()) {
                return 3
            } else {
                return 2
            }
        } else {
            return 1
        }
    } else {
        return 0
    }
}

const diag4 = (x, y) => {
    if (getDisco(x - 1, y + 1) === getPlayer()) {
        if (getDisco(x - 2, y + 2) === getPlayer()) {
            if (getDisco(x - 3, y + 3) === getPlayer()) {
                return 3
            } else {
                return 2
            }
        } else {
            return 1
        }
    } else {
        return 0
    }
}

const getDisco = (x, y) => {
    return objDiscos[`disco${x}${y}`]
}

const getPlayer = () => {
    if (isPlayer1) {
        return "Player1"
    } else {
        return "Player2"
    }
}

const huehuehue = (event) => {
    keycode.shift()
    keycode.push(event.key)
    console.log(keycode.join())
    if (keycode.join() === 'ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,B,A') {
        nicolau.play();
    }
}

const INFERNO = () => {
    main.classList.add("hell")
    box_tabuleiro.classList.add("hell")
    cells = document.getElementsByClassName("linha")
    for (let i = 0; i < cells.length; i++) {
        cells[i].classList.add("hell")
    }
    vitoriaSonic.classList.add("hell")
    vitoriaMario.classList.add("hell")
    filhoSonic.classList.add("hell")
    meioSonic.classList.add("hell")
    filhoMario.classList.add("hell")
    meioMario.classList.add("hell")
    imgSonic.src = "assets/img/niccor.png"

    quedaMoeda.src = "assets/musicas para o jogo/Risada do coring.mp3"
    musicaDeFundo.src = "assets/musicas para o jogo/ERA   Amen.mp3"
    comecoDaPartida.src = ""
    musicaEmpate.src = "assets/musicas para o jogo/musica inferno.mp3"
    musicaVitoriaSonic.src = "assets/musicas para o jogo/musica inferno.mp3"
    musicaVitoriaMario.src = "assets/musicas para o jogo/Música Angelica.mp3"
    vozMario.src = ""
    vozSonic.src = "assets/musicas para o jogo/nicolau.mp3"
    moedaDoMario.src = 'assets/musicas para o jogo/bola de fogo.mp3'
    moedaDoSonic.src = 'assets/musicas para o jogo/bola de fogo.mp3'
    moedaDoMario.play()
}

const iniciar = () => {
    setTimeout(function () {
        inicio.style.display = 'none';
        main.style.display = 'flex'
        comecoDaPartida.play();
        musicaDeFundo.play();
        musicaDeFundo.loop = true;
    }, 3000);

    musicaAbertura.pause();
    quedaMoeda.play();
    const moeda = document.createElement('div')
    moeda.classList.add('moeda')
    buraco.appendChild(moeda)
}

const irParaInfo = () => {
    main.style.display = 'none';
    info.style.display = 'flex';
}

const irParaRegras = () => {
    main.style.display = 'none';
    regras.style.display = 'block';
}

const mudaPlayer = () => {
    isPlayer1 = !isPlayer1
}

const negaMovimento = () => {
    const divNaoInsere = document.createElement('div');
    divNaoInsere.classList.add('naoinsere');
    main.insertBefore(divNaoInsere, main.firstChild);
    setTimeout(() => app.removeChild(divNaoInsere), 2000);
}

const novoJogo = () => {
    box_tabuleiro.style.width = '100%';
    for (let i = 0; i <= 6; i++) {
        let l = []
        let newI = ''
        let newJ = ''
        for (let j = 0; j <= 5; j++) {
            newI = i.toString();
            newJ = j.toString();
            l.push(newI + newJ)
        }
        criarColuna(i, l)
    }
    criaTime();
    criaFeedbackJogadorCorrente();
    musicaVitoriaMario.pause();
    musicaVitoriaSonic.pause();
    musicaDerrota.pause();
}

const permiteMovimento = () => {
    const divNaoInsere = document.createElement('div');
    divNaoInsere.classList.add('insere');
    main.insertBefore(divNaoInsere, main.firstChild);
    setTimeout(() => app.removeChild(divNaoInsere), 2000);
}

const resetaSonic = () => {
    const linhas = document.getElementsByClassName('linha');
    linhas.innerHTML = '';
    box_time.innerHTML = '';
    box_players.innerHTML = '';
    box_tabuleiro.innerHTML = '';

    isPlayer1 = true
    objCol = {
        coluna0: 0,
        coluna1: 0,
        coluna2: 0,
        coluna3: 0,
        coluna4: 0,
        coluna5: 0,
        coluna6: 0
    }
    objDiscos = {}
    playerNaoEstaJogando;
    desseleciona = false;

    clearInterval();
    vitoriaSonic.style.display = 'none'
    main.style.display = 'flex';

    novoJogo();
    musicaDeFundo.currentTime = 0;
    musicaDeFundo.play();
}

const resetaMario = () => {
    const linhas = document.getElementsByClassName('linha');
    linhas.innerHTML = '';
    box_time.innerHTML = '';
    box_players.innerHTML = '';
    box_tabuleiro.innerHTML = '';

    isPlayer1 = true
    objCol = {
        coluna0: 0,
        coluna1: 0,
        coluna2: 0,
        coluna3: 0,
        coluna4: 0,
        coluna5: 0,
        coluna6: 0
    }
    objDiscos = {}
    playerNaoEstaJogando;
    desseleciona = false;

    clearInterval();
    vitoriaMario.style.display = 'none'
    main.style.display = 'flex';

    novoJogo(); musicaDeFundo.currentTime = 0;
    musicaDeFundo.play();
}

const resetaEmpate = () => {
    const linhas = document.getElementsByClassName('linha');
    linhas.innerHTML = '';
    box_time.innerHTML = '';
    box_players.innerHTML = '';
    box_tabuleiro.innerHTML = '';

    isPlayer1 = true
    objCol = {
        coluna0: 0,
        coluna1: 0,
        coluna2: 0,
        coluna3: 0,
        coluna4: 0,
        coluna5: 0,
        coluna6: 0
    }
    objDiscos = {}
    playerNaoEstaJogando;
    desseleciona = false;

    clearInterval();
    telaEmpate.style.display = 'none'
    main.style.display = 'flex';

    novoJogo();
    musicaDeFundo.currentTime = 0;
    musicaDeFundo.play();
}

const soundToggle = () => {
    soundOn = !soundOn
    if (soundOn) {
        buttonSound.innerHTML = '<i class="fas fa-volume-up"></i>'
        musicaDeFundo.play()
        moedaDoMario.volume = 1
        moedaDoSonic.volume = 1
    } else {
        buttonSound.innerHTML = '<i class="fas fa-volume-mute"></i>'
        musicaDeFundo.pause()
        moedaDoMario.volume = 0
        moedaDoSonic.volume = 0
    }
}

const sincronizaAnimacoes = () => {
    console.log(paiDiscosAdd)

    for (let i = 0; i < paiDiscosAdd.length; i++) {
        if (paiDiscosAdd[i].id === 'discoPlayer1') {
            paiDiscosAdd[i].closest('.linha').classList.remove('linha_effect');
            paiDiscosAdd[i].closest('.linha').classList.remove('linha_Sonic');
        }
        else {
            paiDiscosAdd[i].closest('.linha').classList.remove('linha_effect');
            paiDiscosAdd[i].closest('.linha').classList.remove('linha_Mario');
        }
    }

    for (let i = 0; i < paiDiscosAdd.length; i++) {
        if (paiDiscosAdd[i].id === 'discoPlayer1') {
            paiDiscosAdd[i].closest('.linha').classList.add('linha_Sonic');
        }
        else {
            paiDiscosAdd[i].closest('.linha').classList.add('linha_Mario');
        }
    }
}

const validaHorizontal = (posicao) => {
    let pos = posicao.split('')
    let jogadorDaVez = objDiscos[posicao]
    let alterado = parseInt(pos[5])

    if (objDiscos['disco' + (alterado - 1) + pos[6]] == jogadorDaVez) {
        if (objDiscos['disco' + (alterado - 2) + pos[6]] == jogadorDaVez) {
            if (objDiscos['disco' + (alterado - 3) + pos[6]] == jogadorDaVez) {
                console.log('ganhou')
                return true;
            }
            else if (objDiscos['disco' + (alterado + 1) + pos[6]] == jogadorDaVez) {
                console.log('ganhou')
                return true;
            }
        }
        else if (objDiscos['disco' + (alterado + 1) + pos[6]] == jogadorDaVez) {
            if (objDiscos['disco' + (alterado + 2) + pos[6]] == jogadorDaVez) {
                console.log('ganhou')
                return true;
            }
        }
    }
    else if (objDiscos['disco' + (alterado + 1) + pos[6]] == jogadorDaVez) {
        if (objDiscos['disco' + (alterado + 2) + pos[6]] == jogadorDaVez) {
            if (objDiscos['disco' + (alterado + 3) + pos[6]] == jogadorDaVez) {
                console.log('ganhou')
                return true;
            }
            else if (objDiscos['disco' + (alterado - 1) + pos[6]] == jogadorDaVez) {
                console.log('ganhou')
                return true;
            }
        }
        else if (objDiscos['disco' + (alterado - 1) + pos[6]] == jogadorDaVez) {
            if (objDiscos['disco' + (alterado - 2) + pos[6]] == jogadorDaVez) {
                console.log('ganhou')
                return true;
            }
        }
    }
}

const validaVertical = (x, y) => {
    if (objDiscos[`disco${x}${y}`] === getPlayer() && objDiscos[`disco${x}${y - 1}`] === getPlayer() &&
        objDiscos[`disco${x}${y - 2}`] === getPlayer() && objDiscos[`disco${x}${y - 3}`] === getPlayer()) {
        console.log('ganhou')
        return true
    }
    return false
}

const validaDiagonal = (x, y) => {
    if (diag1(x, y) + diag3(x, y) > 2) {
        console.log('ganhou')
        return true
    }
    if (diag2(x, y) + diag4(x, y) > 2) {
        console.log('ganhou')
        return true
    }
    return false
}

const validaVitoria = () => {
    if (getPlayer() == 'Player1') {
        vitoriaSonic.style.display = 'block'
        main.style.display = 'none'
        musicaDeFundo.pause();
        musicaVitoriaSonic.play();
        musicaVitoriaSonic.loop = true;
        vozSonic.play();
    }
    if (getPlayer() == 'Player2') {
        vitoriaMario.style.display = 'block'
        main.style.display = 'none'
        musicaDeFundo.pause();
        musicaVitoriaMario.play();
        musicaVitoriaMario.loop = true;
        vozMario.play();
    }
}

const validaEmpate = () => {
    telaEmpate.style.display = 'block'
    main.style.display = 'none'
    musicaDeFundo.pause();
    musicaEmpate.play();
    musicaDerrota.play();
    musicaDerrota.loop = true;
}

const voltarDaInfo = () => {
    main.style.display = 'flex';
    info.style.display = 'none';
}

const voltarDasRegras = () => {
    main.style.display = 'flex';
    regras.style.display = 'none'
}


// -------------------------------------EVENTOS------------------------------------------------------------

main.addEventListener('click', addDisco);

// EVENTOS DO BOTAO DO INICIO DO  JOGO
botaoInicio.addEventListener('click', iniciar);
buttonSound.addEventListener('click', soundToggle);

// EVENTOS DOS BOTOES DE VITORIA DE ALGUM JOGADR OU EMPATE
resetSonic.addEventListener('click', resetaSonic);
resetMario.addEventListener('click', resetaMario);
resetEmpate.addEventListener('click', resetaEmpate);

// DA UMA OLHADA NESSA CALLBACK E DIGITA O QUE TA LA NIC E AUMENTA O SOM
document.addEventListener('keydown', huehuehue)

// MODO INFERNO
hellMode.addEventListener('click', INFERNO)

// EVENTOS DOS BOTOES DAS TELAS DE INFORMACOES
voltarInfo.addEventListener('click', voltarDaInfo);
irInfo.addEventListener('click', irParaInfo);
irRegras.addEventListener('click', irParaRegras);
voltarRegras.addEventListener('click', voltarDasRegras);

aplicacao();












