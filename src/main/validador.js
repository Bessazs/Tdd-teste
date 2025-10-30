function ehExpressaoValida(expressao) {
    const operador = ['+', '-', '*', '/']
    const isOperador = (char) => operador.includes(char);
    const primeiroCaractere = expressao[0];
    const ultimoCaractere = expressao[expressao.length - 1];

    if (isOperador(primeiroCaractere) && primeiroCaractere !== '-') {
        return false;
    }
    if (isOperador(ultimoCaractere)) {
        return false;
    }

    for (let i = 0; i < expressao.length - 1; i++) {
        const charAtual = expressao[i];
        const charProximo = expressao[i + 1];

        if (isOperador(charAtual)) {
            if (isOperador(charProximo)) {
                return false;
            }
        }
    }

    return true;
} module.exports = ehExpressaoValida;