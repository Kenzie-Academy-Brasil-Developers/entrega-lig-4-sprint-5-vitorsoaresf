//escrito por André
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















// escrito por Erivan
let isPlayer1 = true
function getPlayer() {
    if (isPlayer1) {
        return "Player1"
    } else {
        return "Player2"
    }
}
function mudaPlayer() {
    isPlayer1 = !isPlayer1
}











// Escrito por Vitor









































































































































// escrito por Daniel
const main = document.getElementById('app');
main.addEventListener('click', addDisco);
let linha = 1;

let objCol = {
    coluna0: 0,
    coluna1: 0,
    coluna2: 0,
    coluna3: 0,
    coluna4: 0,
    coluna5: 0,
    coluna6: 0
}

function addDisco(event) {
    let col = event.target.closest('.coluna');
    const idCol = col.id;
    if (objCol[idCol] === 6) {
        console.log('NEIN!!!')
    } else {
        let celula = col.children[col.children.length - objCol[idCol] - 1];
        if (celula.lastChild === null) {
            objCol[idCol]++;
            const disco = document.createElement('div');
            disco.classList.add('discoPlayer2');
            celula.appendChild(disco);
            celula = col.children[col.children.length - objCol[idCol] - 1];
        }
    }
}