const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requrested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTION'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).setDefaultEncoding({});
    }

    next();
});

//Quando o sistema não entrar em nenhuma rota, esse será o caminho escolhido (caminho do error 404).
app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

//Esse é quem recebe o next acima e dispara o erro em forma de mensagem.
app.use((erro, req, res, next)=> {
    res.status(erro.status || 500);
    return res.send({
        erro:{
            mensagem: erro.message
        }
    })
});

module.exports=app;