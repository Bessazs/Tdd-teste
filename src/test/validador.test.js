const  ehExpressaoValida = require('../main/validador.js');

// testes para começo e fim com operadores
test('Começo com operador', ()=>{
    expect( ehExpressaoValida("+1")).toBe(false);
});
test('fim com operador', ()=>{
    expect(ehExpressaoValida('1+2-')).toBe(false);
});
test("Operação  geral",()=>{
    expect(ehExpressaoValida('1 + 2 * ( 9 / 3 - 1 * 6 )')).toBe(true);
});

// testes para operadores consecutivos
test('Dois operadores iguais seguidos', () => {
    expect(ehExpressaoValida('1--2')).toBe(false);
});

test('Dois operadores diferentes seguidos', () => {
    expect(ehExpressaoValida('3-/5')).toBe(false);
});

test('Três operadores seguidos', () => {
    expect(ehExpressaoValida('1+-*2')).toBe(false);
});

// testes para parênteses 
test("Parênteses balanceados", () => {
    expect(ehExpressaoValida('(1+2)*(3-4)')).toBe(true);
})

test("Parênteses não balanceados - mais abertos", () => {
    expect(ehExpressaoValida('(((1+2) * 3-4)')).toBe(false);
})

test("Parênteses não balanceados - mais fechados", () => {
    expect(ehExpressaoValida('(1+2)) * (3-4)')).toBe(false);
});

// Testes para ver  numero, só pode vir operador ou ')'
test('Após número, parêntese de abertura é inválido', () => {
    expect(ehExpressaoValida('1(2+3)')).toBe(false);
});
test('Após número, outro número é inválido', () => {
    expect(ehExpressaoValida('12')).toBe(false); 
});
test('Após número, operador é válido', () => {
    expect(ehExpressaoValida('1+2')).toBe(true);
});
test('Após número, parêntese de fechamento é válido', () => {
    expect(ehExpressaoValida('(1)')).toBe(true);
});

test("Após número, ser diferente de número ou '('", () =>{
    expect(ehExpressaoValida('(1+)2')).toBe(false);
})

test ("Operação com espaço", () =>{
    expect(ehExpressaoValida('1 + 2')).toBe(true);
})