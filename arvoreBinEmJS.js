const ler = require('readline-sync')


const arvore = {
    raiz: null
}

function criaNo(valor){
    return {
        valor: valor,
        esq: null,
        dir: null
    }
}

function insereNo(valor, raiz){
    let percorre = raiz

    if(valor == percorre.valor){
        return console.log('valor ja inserido na arvore')
    }

    if(valor > percorre.valor){
        if(percorre.dir == null){
            console.log(`inserindo a direita de ${percorre.valor}`)
            percorre.dir = criaNo(valor)
        }
        else{
            insereNo(valor, percorre.dir, percorre.valor)
        }
    }
    else{
        if(percorre.esq == null){
            console.log(`inserindo a esquerda de ${percorre.valor}`)
            percorre.esq = criaNo(valor)
        }
        else{
            insereNo(valor, percorre.esq)
        }
    }
}

function buscaNo(valor, raiz){
    let percorre = raiz

    if(percorre.valor == valor){
        console.log('valor encontrado!')
        return percorre
    }

    if(valor > percorre.valor){
        if(percorre.dir == null){
            return ('valor nao encontrado')
        }
        else{
            buscaNo(valor, percorre.dir)
        }
    }
    else{
        if(percorre.esq == null){
            return console.log('valor nao encontrado')
        }
        else{
            buscaNo(valor, percorre.esq)
        }
    }
}

function mostraArvore(raiz){
    if(raiz.esq){
        mostraArvore(raiz.esq)
    }
    
    console.log(raiz.valor)

    if(raiz.dir){
        mostraArvore(raiz.dir)
    }
}

function buscaNoremovido(valor, raiz){
    let percorre = raiz

    while(1){
        if(valor > percorre.valor){
            if(percorre.dir.valor == valor)
                return percorre

            else if(percorre.dir){
               percorre = percorre.dir               
            }

            else{
                console.log('valor nao encontrado')
                return null
            }
        }
        else{
            if(percorre.esq.valor == valor)
                return percorre

            else if(percorre.esq){
               percorre = percorre.esq               
            }

            else{
                console.log('valor nao encontrado')
                return null
            }
        }
    }
}

function buscarSubs(serRemovido){
    let percorre = serRemovido
    let anterior = percorre

    if(!percorre.esq && !percorre.dir){
        return percorre
    }

    if(percorre.esq){
        percorre = percorre.esq

        if(!percorre.dir){
            anterior.esq = percorre.esq
            return percorre
        }

        while(percorre.dir){
            anterior = percorre
            percorre = percorre.dir
        }
        anterior.dir = percorre.esq
        percorre.esq = anterior
        return percorre
    }

    if(percorre.dir){
        percorre = percorre.dir

        if(!percorre.esq){
            anterior.dir = percorre.dir
            return percorre
        }

        while(percorre.esq){
            anterior = percorre
            percorre = percorre.esq
        }
        anterior.esq = percorre.dir
        percorre.dir = anterior
        return percorre
    }
}

function removerArvore(valor, raiz){
    
    let serRemovido = buscaNoremovido(valor, raiz)

    if(serRemovido){
    console.log(serRemovido.valor)

        if(serRemovido.valor < valor){
            let serColocadoNoLugar = buscarSubs(serRemovido.dir)
            console.log(serColocadoNoLugar.valor)
            if(serColocadoNoLugar.valor == valor){
                serRemovido.dir = null
            }
            else
                serRemovido.dir = serColocadoNoLugar
        }
        else if(serRemovido.valor > valor){
            let serColocadoNoLugar = buscarSubs(serRemovido.esq)
            console.log(serColocadoNoLugar.valor)
            if(serColocadoNoLugar.valor == valor){
                serRemovido.esq = null
            }
            else
                serRemovido.esq = serColocadoNoLugar
        }
    }
}

let valor = ler.question("Digite o valor desejado a ser inserido: ")
valor = parseInt(valor)
let novoNo = criaNo(valor)
arvore.raiz = novoNo
let operacao = 0

while(operacao != -1){
    operacao = ler.question("1 para inserir, 2 para buscar na arvore, -1 para parar, 3 para mostrar e 4 para remover: ")
    if(operacao == 1){
        valor = ler.question("Digite o valor desejado a ser inserido: ")
        valor = parseInt(valor)
        console.log(typeof valor)
        insereNo(valor, arvore.raiz)
    }

    else if(operacao == 2){
        valor = ler.question("Digite o valor desejado a ser buscado: ")
        valor = parseInt(valor)
        buscaNo(valor, arvore.raiz)
    }

    else if(operacao == 3){
        mostraArvore(arvore.raiz)
    }

    else if(operacao == 4){
        valor = ler.question("Digite o valor desejado a ser removido: ")
        valor = parseInt(valor)
        removerArvore(valor, arvore.raiz)
    }
}

mostraArvore(arvore.raiz)