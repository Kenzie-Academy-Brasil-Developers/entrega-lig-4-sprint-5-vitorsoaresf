// VARIAVEIS

const main = document.getElementById('app');
const box_tabuleiro = document.createElement('div');
box_tabuleiro.classList.add('box_tabuleiro');
main.appendChild(box_tabuleiro);
const botaoInicio = document.getElementById('botaoIniciar');
const inicio = document.getElementById('paiInicio');

let isPlayer1 = true
let objCol = {
    coluna0: 0,
    coluna1: 0,
    coluna2: 0,
    coluna3: 0,
    coluna4: 0,
    coluna5: 0,
    coluna6: 0
}

let objDiscos = {}
let playerNaoEstaJogando;
let desseleciona = false;



// FUNÇÕES

const aplicacao = () => {
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
            } else {
                disco.classList.add('discoPlayer2');
                disco.id = 'discoPlayer2';
                objDiscos[`disco${idCol[6]}${objCol[idCol]}`] = "Player2"
            }

            celula.appendChild(disco);
            celula = col.children[col.children.length - objCol[idCol] - 1];
            validaHorizontal(`disco${idCol[6]}${objCol[idCol]}`);
            validaDiagonal(Number(idCol[6]), objCol[idCol])
            validaVertical(Number(idCol[6]), objCol[idCol]);
            mudaPlayer();
        }
    }

    playerNaoEstaJogando = setInterval(() =>{
        desselecionaJogador();
        mudaPlayer();
    }, 3000);

}

const criarColuna = (id, id1) => {
    const divColuna = document.createElement('div');

    box_tabuleiro.appendChild(divColuna);

    divColuna.classList.add('coluna');

    divColuna.id = 'coluna' + id;

    for (let a = 0; a < id1.length; a++) {
        const divLinha = document.createElement('div');

        divLinha.classList.add('linha');

        divColuna.appendChild(divLinha);

        divLinha.id = 'bloco' + id1[a];
    }
}

const desselecionaJogador = () =>{
    const p1 = document.getElementById('p1');
    const p2 = document.getElementById('p2');

    if(isPlayer1){
        p1.classList.toggle('player_desselecionado');
        if(desseleciona){
            p2.classList.toggle('player_desselecionado');
            bool = false
        }
    }else{
        p2.classList.toggle('player_desselecionado');
        p1.classList.toggle('player_desselecionado');
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

const criaFeedbackJogadorCorrente = () => {
    const player1 = document.createElement('div');
    const player2 = document.createElement('div');
    const box_players = document.createElement('div');

    box_players.classList.add('box_players');
    player1.classList.add('player1');
    player2.classList.add('player2');

    player1.id = 'p1';
    player2.id = 'p2';

    box_players.appendChild(player1);
    box_players.appendChild(player2);


    main.insertBefore(box_players, main.firstChild);
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
    criaFeedbackJogadorCorrente();
}

const permiteMovimento = () => {
    const divNaoInsere = document.createElement('div');
    divNaoInsere.classList.add('insere');
    main.insertBefore(divNaoInsere, main.firstChild);
    setTimeout(() => app.removeChild(divNaoInsere), 2000);
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

const iniciar = () => {
    setTimeout(function(){ 
    inicio.style.display = 'none';
    main.style.display = 'flex' 
    }, 3000);
}


// EVENTOS

main.addEventListener('click', addDisco);
botaoInicio.addEventListener('click', iniciar);

aplicacao();