/**
 * Constantes para operadores e símbolos.
 */
const OPERADORES = ['+', '-', '*', '/'];
const DIGITOS = /^\d+$/;

/**
 * Funções auxiliares para clareza e refatoração (Regra 3, 4, 5).
 */

// Verifica se um caractere é um operador válido
const isOperador = (char) => OPERADORES.includes(char);

// Verifica se um caractere é um dígito (simplificado para apenas um caractere)
// No loop principal, usaremos um regex mais robusto.
const isDigito = (char) => char >= '0' && char <= '9';


/**
 * Valida se uma expressão matemática é válida de acordo com as regras do projeto.
 * @param {string} expressao - A string contendo a expressão.
 * @returns {boolean} True se for válida, False caso contrário.
 */
export function ehExpressaoValida(expressao) {
    // 1. Regra 6: Espaços devem ser ignorados.
    const expressaoSemEspacos = expressao.replace(/\s/g, "");

    // Expressão vazia não é válida
    if (expressaoSemEspacos.length === 0) {
        return false;
    }

    // 2. Regra 3: Não pode começar ou terminar com um operador.
    const primeiroCaractere = expressaoSemEspacos[0];
    const ultimoCaractere = expressaoSemEspacos[expressaoSemEspacos.length - 1];

    // O negativo inicial é aceito, então verificamos exceto para '-' no início
    if (isOperador(primeiroCaractere) && primeiroCaractere !== '-') {
        return false;
    }
    if (isOperador(ultimoCaractere)) {
        return false;
    }

    // 3. Regra 1: Parênteses devem estar corretamente balanceados.
    let balanceamentoParenteses = 0;
    for (let i = 0; i < expressaoSemEspacos.length; i++) {
        const char = expressaoSemEspacos[i];
        if (char === '(') {
            balanceamentoParenteses++;
        } else if (char === ')') {
            balanceamentoParenteses--;
        }
        // Se o contador for negativo, fechamos um parêntese que não foi aberto
        if (balanceamentoParenteses < 0) {
            return false;
        }
    }
    // No final, deve ser zero
    if (balanceamentoParenteses !== 0) {
        return false;
    }

    // 4. Regras 2, 4, 5: Análise de Sequência de Tokens (Estado)
    // Usamos um estado para rastrear o que é esperado em seguida.
    // Estado 'NUMBER': Espera-se um número ou ')'
    // Estado 'OPERATOR': Espera-se um operador ou '('
    
    // O estado inicial espera um número ou '(', mas como o '-' inicial é aceito,
    // o estado inicial pode ser mais flexível, mas vamos começar com o que é 'esperado'
    // após o primeiro caractere válido (número ou '(' ou operador unário '-').
    
    // Simplificando o token (números inteiros positivos), vamos iterar caractere a caractere
    
    let esperandoNumeroOuParentesesAberto = true; // Começa esperando número ou '('

    for (let i = 0; i < expressaoSemEspacos.length; i++) {
        const char = expressaoSemEspacos[i];
        
        // Se for um dígito (parte de um número)
        if (isDigito(char)) {
            // Se estava esperando um operador ou ')' (estado 'OPERATOR'), o dígito é um erro.
            // Exceção: O dígito é parte de um número que já está sendo lido.
            // Para simplificar a lógica de tokens, focamos nas transições:
            
            // Se estamos esperando um operador/fechamento (esperandoNumeroOuParentesesAberto é false),
            // mas encontramos um dígito, significa que há um número seguido de outro número
            // sem operador (ex: 1 2, ou aqui: 1(2 - erro de dígito após número/parêntese fechado
            // sem operador).
            // MAS: A regra 4 diz: Após um NÚMERO, só pode vir: operador OU ')'.
            // Se estamos aqui, o dígito **inicia** um novo token, o que é um erro.
            // Se char é um dígito, e esperamos um operador, é um erro.
            if (!esperandoNumeroOuParentesesAberto) {
                // Caso simples para lidar com números multicaracteres, avançamos o índice.
                // Enquanto o próximo char for um dígito, avançamos o índice.
                while (i < expressaoSemEspacos.length && isDigito(expressaoSemEspacos[i])) {
                    i++;
                }
                i--; // Volta um para o loop for funcionar corretamente
                // Após o número, o próximo deve ser operador ou ')'.
                esperandoNumeroOuParentesesAberto = false;
                continue; // Passa para a próxima iteração
            }
            
            // Se estamos esperando um número (esperandoNumeroOuParentesesAberto é true),
            // encontramos um dígito. Lemos o número inteiro e avançamos o índice.
            while (i < expressaoSemEspacos.length && isDigito(expressaoSemEspacos[i])) {
                i++;
            }
            i--; // Volta um para o loop for funcionar corretamente
            // Após ler o número, o próximo token deve ser um operador ou ')' (Regra 4)
            esperandoNumeroOuParentesesAberto = false;
            
        // Se for um operador
        } else if (isOperador(char)) {
            // Regra 2: Não pode haver dois ou mais operadores seguidos.
            // Isso é checado pela transição de estado: se esperamos um número e encontramos um operador
            // (exceto o unário '-' ou '+'), é um erro.
            
            // Regra 5: Após um operador, só pode vir: número ou '('.
            if (!esperandoNumeroOuParentesesAberto && char !== '(') {
                 // Estávamos esperando um operador (false) e encontramos outro operador (Regra 2)
                 // Ex: 1++2 ou 1+*2
                 return false;
            }
            
            // Se estamos esperando um número (true) e encontramos um operador, é válido
            // apenas se for o operador unário no início ou após '('.
            if (esperandoNumeroOuParentesesAberto && i !== 0 && expressaoSemEspacos[i - 1] !== '(') {
                // Ex: +(1) ou 1(+-2)
                return false; 
            }
            
            // Após um operador válido, o próximo deve ser um número ou '(' (Regra 5)
            esperandoNumeroOuParentesesAberto = true;
            
        // Se for parêntese de abertura
        } else if (char === '(') {
            // Regra 5: '(' só pode vir após um operador ou no início.
            // Se estamos esperando um operador/fechamento (false) e encontramos '(', é erro (Ex: 1() ou 1(2+3) - 1(
            if (!esperandoNumeroOuParentesesAberto) {
                return false; 
            }
            
            // Após '(', o próximo deve ser um número ou outro '(' (ou '-' unário).
            esperandoNumeroOuParentesesAberto = true;
            
        // Se for parêntese de fechamento
        } else if (char === ')') {
            // Regra 4: ')' só pode vir após um número ou outro ')'.
            // Se estamos esperando um número/abertura (true) e encontramos ')', é erro. (Ex: () ou ( + 1)
            if (esperandoNumeroOuParentesesAberto) {
                return false;
            }
            
            // Após ')', o próximo token deve ser um operador ou outro ')' (Regra 4)
            esperandoNumeroOuParentesesAberto = false;
            
        // Se for qualquer outro caractere, é inválido
        } else {
            return false;
        }
    }

    // Se passou por todas as verificações, a expressão é válida
    return true;
}