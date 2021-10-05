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
        negaMovimento();
    } else {
        permiteMovimento();
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

            celula.appendChild(disco);
            celula = col.children[col.children.length - objCol[idCol] - 1];
            validaHorizontal(`disco${idCol[6]}${objCol[idCol]}`);
            validaDiagonal(Number(idCol[6]),objCol[idCol])
            validaVertical(Number(idCol[6]), objCol[idCol]);
            mudaPlayer();
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

const negaMovimento = () =>{
    const divNaoInsere = document.createElement('div');
    divNaoInsere.classList.add('naoinsere');
    main.insertBefore(divNaoInsere,main.firstChild);
    setTimeout(()=> app.removeChild(divNaoInsere),2000);
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

const permiteMovimento = () =>{
    const divNaoInsere = document.createElement('div');
    divNaoInsere.classList.add('insere');
    main.insertBefore(divNaoInsere,main.firstChild);
    setTimeout(()=> app.removeChild(divNaoInsere),2000);
}

//Funções André

const validaHorizontal = (posicao) => {
    let pos = posicao.split('')
    let jogadorDaVez = objDiscos[posicao]       
    let alterado = parseInt(pos[5])
    
    if (objDiscos['disco' + (alterado - 1) + pos[6]] == jogadorDaVez){
        if (objDiscos['disco' + (alterado - 2) + pos[6]] == jogadorDaVez){
            if (objDiscos['disco' + (alterado - 3) + pos[6]] == jogadorDaVez){                    
                console.log(jogadorDaVez)
                return true;
            }
            else if (objDiscos['disco' + (alterado + 1) + pos[6]] == jogadorDaVez){
                console.log(jogadorDaVez)
                return true;
            }
        }
        else if (objDiscos['disco' + (alterado + 1) + pos[6]] == jogadorDaVez) {
            if (objDiscos['disco' + (alterado + 2) + pos[6]] == jogadorDaVez){
                console.log(jogadorDaVez)
                return true;
            }
        } 
    }
    else if (objDiscos['disco' + (alterado + 1) + pos[6]] == jogadorDaVez){
        if (objDiscos['disco' + (alterado + 2) + pos[6]] == jogadorDaVez){
            if (objDiscos['disco' + (alterado + 3) + pos[6]] == jogadorDaVez){                    
                console.log(jogadorDaVez)
                return true;
            }
            else if (objDiscos['disco' + (alterado - 1) + pos[6]] == jogadorDaVez){
                console.log(jogadorDaVez)
                return true;
            }
        }
        else if (objDiscos['disco' + (alterado - 1) + pos[6]] == jogadorDaVez) {
            if (objDiscos['disco' + (alterado - 2) + pos[6]] == jogadorDaVez){
                console.log(jogadorDaVez)
                return true;
            }
        } 
    }    
}


//Funções Daniel
const validaVertical = (x, y) => {
    if (objDiscos[`disco${x}${y}`] === getPlayer() && objDiscos[`disco${x}${y-1}`] === getPlayer() && 
        objDiscos[`disco${x}${y-2}`] === getPlayer() && objDiscos[`disco${x}${y-3}`] === getPlayer()) {
            console.log('ganhou lek')
            return true
        }
    return false
}

//Funções Erivan
function validaDiagonal(x,y){
    if(diag1(x,y)+diag3(x,y)>2){
        console.log("GG IZI")
        return true
    }
    if(diag2(x,y)+diag4(x,y)>2){
        console.log("GG IZI")
        return true
    }
    return false
}
function diag1(x, y) {
    if(getDisco(x+1,y+1)===getPlayer()){
        if(getDisco(x+2,y+2)===getPlayer()){
            if(getDisco(x+3,y+3)===getPlayer()){
                return 3
            }else{
                return 2
            }
        }else{
            return 1
        }
    }else{
        return 0
    }
}
function diag2(x,y){
    if(getDisco(x+1,y-1)===getPlayer()){
        if(getDisco(x+2,y-2)===getPlayer()){
            if(getDisco(x+3,y-3)===getPlayer()){
                return 3
            }else{
                return 2
            }
        }else{
            return 1
        }
    }else{
        return 0
    }
}
function diag3(x,y){
    if(getDisco(x-1,y-1)===getPlayer()){
        if(getDisco(x-2,y-2)===getPlayer()){
            if(getDisco(x-3,y-3)===getPlayer()){
                return 3
            }else{
                return 2
            }
        }else{
            return 1
        }
    }else{
        return 0
    }
}
function diag4(x,y){
    if(getDisco(x-1,y+1)===getPlayer()){
        if(getDisco(x-2,y+2)===getPlayer()){
            if(getDisco(x-3,y+3)===getPlayer()){
                return 3
            }else{
                return 2
            }
        }else{
            return 1
        }
    }else{
        return 0
    }
}
function getDisco (x,y){
    return objDiscos[`disco${x}${y}`]
}


//Funções Vitor



// EVENTOS

main.addEventListener('click', addDisco);

aplicacao();
