// VARIAVEIS

const main = document.getElementById('app');

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

objDiscos = {}

// FUNÇÕES

const aplicacao = () => {
    novoJogo();
}

const addDisco = (event) => {
    let col = event.target.closest('.coluna');
    if (col === null || col === undefined) {
        return
    }
    const idCol = col.id;
    if (objCol[idCol] === 6) {
        console.log('NEIN!!!')
    } else {
        let celula = col.children[col.children.length - objCol[idCol] - 1];
        if (celula.lastChild === null) {
            objCol[idCol]++;
            const disco = document.createElement('div');
            if(isPlayer1){
                disco.classList.add('discoPlayer1');
                disco.id = 'discoPlayer1';
                objDiscos[`disco${idCol[6]}${objCol[idCol]}`]="Player1"
            }else{
                disco.classList.add('discoPlayer2');
                disco.id = 'discoPlayer2';
                objDiscos[`disco${idCol[6]}${objCol[idCol]}`]="Player2"
            }
            // console.log(objDiscos)
            mudaPlayer();
            celula.appendChild(disco);
            celula = col.children[col.children.length - objCol[idCol] - 1];
            validaVertical();
        }
    }
}

const criarColuna = (id, id1) => {
    const mainTag = document.getElementsByTagName('main')[0];

    const divColuna = document.createElement('div');

    mainTag.appendChild(divColuna);

    divColuna.classList.add('coluna');

    divColuna.id = 'coluna' + id;

    for (let a = 0; a < id1.length; a++) {
        const divLinha = document.createElement('div');

        divLinha.classList.add('linha');

        divColuna.appendChild(divLinha);

        divLinha.id = 'bloco' + id1[a];
    }
}

const getPlayer = () => {
    if (isPlayer1) {
        return "Player1"
    } else {
        return "Player2"
    }
}

const mudaPlayer = () => {
    isPlayer1 = !isPlayer1
}

const novoJogo = () => {
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
}

//Funções André




//Funções Daniel
// const validaVertical = () => {
//     let player1 = [];
//     let player2 = [];
//     let soma1 = 1;
//     let soma2 = 0;  
//     for (let chave in objDiscos) {
//         if (objDiscos[chave] === 'Player1') {
//             player1.push(chave[5]);
//         } else {
//             player2.push(chave[5]);
//         }
//     }
//     [0,0,0,2,5]
//     player1.sort((a,b) => a - b)
//     for (let i = 0; i < player1.length - 1; i++) {
//         if (player1[i] == player1[i + 1]) {
//             soma1++;
//             if (soma1 === 4) {
//                 console.log('ganhooouuu')
//             }
//         } else if (player1[i] !== player1[i + 1]) {
//             soma1 = 0;
//         }
//     }
//     console.log(player1) 
// }
let soma10 = 1;
let soma11 = 1;
let soma12 = 1;
let soma13 = 1;
let soma14 = 1;
let soma15 = 1;
let soma16 = 1;
let soma20 = 1;
let soma21 = 1;
let soma22 = 1;
let soma23 = 1;
let soma24 = 1;
let soma25 = 1;
let soma26 = 1; 
let col0 = [];
let col1 = [];
let col2 = [];
let col3 = [];
let col4 = [];
let col5 = [];
let col6 = []; 
const validaVertical = () => {
    for (let chave in objDiscos) {
        if (objDiscos[chave] === 'Player1') {
            if (chave[5] == 0) {
                col0.push('play1')
            }
            if (chave[5] == 1) {
                col1.push('play1')
            }
            if (chave[5] == 2) {
                col2.push('play1')
            }
            if (chave[5] == 3) {
                col3.push('play1')
            }
            if (chave[5] == 4) {
                col4.push('play1')
            }
            if (chave[5] == 5) {
                col5.push('play1')
            }
            if (chave[5] == 6) {
                col6.push('play1')
            }
        } else {
            if (chave[5] == 0) {
                col0.push('play2')
            }
            if (chave[5] == 1) {
                col1.push('play2')
            }
            if (chave[5] == 2) {
                col2.push('play2')
            }
            if (chave[5] == 3) {
                col3.push('play2')
            }
            if (chave[5] == 4) {
                col4.push('play2')
            }
            if (chave[5] == 5) {
                col5.push('play2')
            }
            if (chave[5] == 6) {
                col6.push('play2')
            }
        }
    }
    
    console.log(soma10)
    for (let i = 0; i < col0.length - 1; i++) {
        if (col0[i] == 'play1') {
            soma10++;
            soma20 = 0;
            if (soma10 === 4) {
                console.log('ganhooouuu')
            }
        } else if (col0[i] == 'play2') {
            soma20++;
            soma10 = 0;
            if (soma20 === 4) {
                console.log('ganhooouuu')
            }
        }
    }
}

//Funções Erivan



//Funções Vitor



// EVENTOS

main.addEventListener('click', addDisco);

aplicacao();
