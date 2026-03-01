export function quickSort(array, campo) {
    if (array.length < 2) return array;

    const menores = [];
    const maiores = [];
    const iguais = [];
    const indicePivo = Math.floor(array.length / 2);

    let pivo = array[indicePivo][campo];

    if (typeof pivo === 'string') {
        pivo = pivo.toLowerCase().trim();
    }


    for (let i = 0; i < array.length; i++) {
       
        let valorAtual = array[i][campo];

        if (typeof valorAtual === 'string') {
            valorAtual = valorAtual.toLowerCase().trim();
        }

        if (valorAtual < pivo) {
            menores.push(array[i]);
        } 
        else if (valorAtual > pivo) {
            maiores.push(array[i]);
        } 
        else {
            iguais.push(array[i]);
        }
    }

    return [ ...quickSort(menores, campo), ...iguais, ...quickSort(maiores, campo)];
}