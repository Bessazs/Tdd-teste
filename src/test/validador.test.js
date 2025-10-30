const  ehExpressaoValida = require('../main/validador.js');

// testes para começo e fim com operadores
test('Começo com operador', ()=>{
    expect( ehExpressaoValida("+1")).toBe(false);
});
test('fim com operador', ()=>{
    expect(ehExpressaoValida('1+2-')).toBe(false);
});
test('Com operador corrrecleato',()=>{
    expect(ehExpressaoValida('1+2')).toBe(true);
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

