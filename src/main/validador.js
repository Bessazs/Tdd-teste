function ehExpressaoValida(expressao) {
  const operadores = ["+", "-", "*", "/"];

  // função que verifica se o caractere é um operador
  const isOperador = (char) => operadores.includes(char);

  // verifica o primeiro e o último caractere
  const primeiroCaractere = expressao[0];
  const ultimoCaractere = expressao[expressao.length - 1];

  if (isOperador(primeiroCaractere) && primeiroCaractere !== "-") {
    return false;
  }
  if (isOperador(ultimoCaractere)) {
    return false;
  }

  // verifica operadores consecutivos
  for (let i = 0; i < expressao.length - 1; i++) {
    const charAtual = expressao[i];
    const charProximo = expressao[i + 1];

    if (isOperador(charAtual)) {
      if (isOperador(charProximo)) {
        return false;
      }
    }
  }

  // verifica parênteses balanceados
  let contadorParenteses = 0;
  for (let char of expressao) {
    if (char === "(") {
      contadorParenteses++;
    } else if (char === ")") {
      contadorParenteses--;
    }

    // se o contador for negativo retornamos falso e interrompemos o loop
    if (contadorParenteses < 0) {
      return false;
    }
  }

  // se o contador de parentes não for igual a zero, a expressão não está balanceada
  if (contadorParenteses !== 0) {
    return false;
  }

  return true;
}
module.exports = ehExpressaoValida;
