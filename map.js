
function start(){

const produtos = [
    { nome: 'notebook', preco: 2499, fragil: true},
    { nome: 'ipad', preco: 4199, fragil: true},
    { nome: 'copo vidro', preco: 12, fragil: true},
    { nome: 'copo plastico', preco: 17, fragil: false},
]

console.log(produtos.filter(function(p){
    return p.preco > 500 && p.fragil
}))

}

const stop = () => {
    return console.log('opa cuzao')
}

module.exports = {
    start: start,
    stop: stop
}