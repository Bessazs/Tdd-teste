// Código de teste para validador.js

// Importa a função SUM do arquivo
const  ehExpressaoValida = require('../main/validador.js');



test('Começo com operador',()=>{
    expect( ehExpressaoValida("+1")).tobe(FALSE)
});
test('fim com operador',()=>{
    expect( ehExpressaoValida('1+2-')).tobe(FALSE)
});
test('Com operador corrreto',()=>{
    expect(ehExpressaoValida('1+2')).tobe(TRUE)
});