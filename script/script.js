//escrito por André
















// escrito por Erivan
let isPlayer1 = true
function getPlayer(){
    if(isPlayer1){
        return "Player1"
    }else{
        return "Player2"
    }
}
function mudaPlayer(){
    isPlayer1=!isPlayer1
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

function addDisco (event) {
    let col = event.target.closest('.coluna');
    const idCol = col.id;
    if (objCol[idCol] === 6) {
        console.log('NEIN!!!')
    } else {
        let celula = col.children[col.children.length-objCol[idCol]-1];
        if (celula.lastChild === null) {
            objCol[idCol]++;
            const disco = document.createElement('div');
            disco.classList.add('disco');
            celula.appendChild(disco);
            celula = col.children[col.children.length-objCol[idCol]-1];
        }
    }
}