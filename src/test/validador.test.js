const  ehExpressaoValida = require('../main/validador.js');



test('Começo com operador', ()=>{
    expect( ehExpressaoValida("+1")).toBe(false);
});
test('fim com operador', ()=>{
    expect(ehExpressaoValida('1+2-')).toBe(false);
});
test('Com operador corrrecleato',()=>{
    expect(ehExpressaoValida('1+2')).toBe(true);
});

test('Dois operadores iguais seguidos', () => {
    expect(ehExpressaoValida('1--2')).toBe(false);
});

test('Dois operadores diferentes seguidos', () => {
    expect(ehExpressaoValida('3-/5')).toBe(false);
});

test('Três operadores seguidos', () => {
    expect(ehExpressaoValida('1+-*2')).toBe(false);
});