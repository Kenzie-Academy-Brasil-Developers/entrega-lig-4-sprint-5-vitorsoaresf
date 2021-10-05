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
            console.log(objDiscos)
            mudaPlayer();
            celula.appendChild(disco);
            celula = col.children[col.children.length - objCol[idCol] - 1];
            validaHorizontal(celula);
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
const validaHorizontal = (celula) => {
    let player1 = 0;
    let player2 = 0;
    for(let i = 0; i <= 5; i++) {
        player1 = 0;
        player2 = 0;
        for(let j = 0; j < 6; j++){
            let position = celula;
         if (position.lastChild === null) {
            player1 = 0;
            player2 = 0;
         } else if (position.lastChild !== null) { 
                if (position.lastChild.id == 'discoPlayer1') {
                    player1++;
                    player2 = 0;
                } else if(position.lastChild.id == 'discoPlayer2') {
                    player2++;
                    player1 = 0;
                }
                if (player1 === 4){
                    console.log('1ganhou')
                } else if (player2 === 4){
                    console.log('2ganhou')
                }
            }
        }
    }  
}


//Funções Erivan



//Funções Vitor



// EVENTOS

main.addEventListener('click', addDisco);

aplicacao();
