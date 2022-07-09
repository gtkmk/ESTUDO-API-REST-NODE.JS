const express = require('express');
const router = express.Router();

const PedidosController = require('../controllers/pedidos-controller')

//Retorna todos os pedidos
router.get(
    '/',
    PedidosController.getPedidos
);

//Insere um pedido
router.post(
    '/',
    PedidosController.postPedidos
);

//Retorna sobre um pedido
router.get(
    '/:id_pedido', 
    PedidosController.getSinglePedido
);

//Altera um pedido
router.patch(
    '/', 
    PedidosController.patchPedido
);

//Deleta um pedido
router.delete(
    '/',
    PedidosController.deletePedido
);

module.exports = router;