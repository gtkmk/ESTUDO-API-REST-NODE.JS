const express = require('express');
const router = express.Router();

//Retorna todos os produtos
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retorna os produtos'
    });
});

//Insere um produto
router.post('/', (req, res, next) => {

    const produto = {
        nome: req.body.nome,
        preco: req.body.preco
    };
    res.status(201).send({
        mensagem: 'Insere um produto',
        produtoCriado: produto
    });
});

//Retorna sobre um produto
router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto

    if(id === 'especial'){
        res.status(201).send({
            mensagem: 'Vc achou o id especial!',
            id: id
        });
    }else{
        res.status(201).send({
            mensagem: 'Usando o GET de um produto generico'
        });
    }    
});

//Altera um produto
router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Produto alterado'
    });
});

//Deleta um produto
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Produto deletado'
    });
});

module.exports = router;