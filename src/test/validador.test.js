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

test('',)