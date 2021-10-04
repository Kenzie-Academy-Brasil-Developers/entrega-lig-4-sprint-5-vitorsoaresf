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

for (let i = 0; i <= 6; i++){
    let l = []
    let newI = ''
    let newJ = ''
    for (let j = 0; j <= 5; j++){
        newI = i.toString();
        newJ = j.toString();
        l.push(newI + newJ)
    }
    criarColuna(i,l)
}















// escrito por Erivan













// Escrito por Vitor









































































































































// escrito por Daniel