const mysql = require('../mysql').pool;

exports.getProdutos = (req, res, next) => {
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({ error: error }) }
        conn.query(

            "SELECT * FROM produtos;",

            (error, result, field)=>{
                if(error){return res.status(500).send({ error: error }) }
                const response = {
                    quantidade: result.length,
                    produtos: result.map(prod => {
                        return{
                            id_produto: prod.id_produto,
                            nome: prod.nome,
                            preco: prod.preco,
                            imagem_produto: prod.imagem_produto,
                            request:{
                                tipo: 'GET',
                                descricao: 'Retorna os detalhes do produto listado',
                                url: 'http://localhost:3000/produtos/'+ prod.id_produto
                            }
                        }
                    })
                }
                return res.status(200).send(response);

            }
        )
    })
};

exports.postProdutos = (req, res, next) => {
    console.log(req.file);
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({ error: error }) }
        conn.query(

            "INSERT INTO produtos (nome, preco, imagem_produto) VALUES (?,?,?)",

            [req.body.nome, req.body.preco, req.file.path],

            (error, result, field)=>{
                conn.release();
                if(error){return res.status(500).send({ error: error }) }  
                const response = {
                    mensagem: 'Produto inserido com sucesso',
                    produtoCriado: {
                        id_produto: result.id_produto,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        imagem_produto: req.file.path,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos os produtos',
                            url: 'http://localhost:3000/produtos'
                        }
                    }
                }
                return res.status(201).send(response);
            }
        )
    });    
};

exports.getSingleProduto = (req, res, next) => {
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({ error: error }) }
        conn.query(

            "SELECT * FROM produtos WHERE id_produto = ?;",

            [req.params.id_produto],

            (error, result, field)=>{
                if(error){return res.status(500).send({ error: error }) }

                if(result.length == 0){
                    return res.status(404).send({
                        mensagem: 'Produto não encontrado!'
                    })
                }

                const response = {
                    produto: {
                        id_produto: result[0].id_produto,
                        nome: result[0].nome,
                        preco: result[0].preco,
                        imagem_produto: result[0].imagem_produto,
                        request:{
                            tipo: 'GET',
                            descricao: 'Retorna todos os produtos',
                            url: 'http://localhost:3000/produtos'
                        }
                    }                            
                }
                return res.status(200).send(response); 
            }
        )
    })   
};

exports.patchProduto = (req, res, next) => {
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({ error: error }) }
        conn.query(

            "UPDATE produtos SET nome = ?, preco = ? WHERE id_produto = ?",

            [req.body.nome, req.body.preco, req.body.id_produto],

            (error, result, field)=>{
                conn.release();

                if(error){return res.status(500).send({ error: error }) }     
                const response = {
                    mensagem: 'Produto alterado com sucesso',
                    produtoAlterado: {
                        id_produto: req.body.id_produto,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna os detalhes do produto listado',
                            url: 'http://localhost:3000/produtos/' + req.body.id_produto
                        }
                    }
                }
                return res.status(202).send(response);
            }
        )
    });
};

exports.deleteProduto = (req, res, next) => {
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({ error: error }) }

        conn.query(

            "DELETE FROM produtos WHERE id_produto = ?",

            [req.body.id_produto],

            (error, result, field)=>{
                conn.release();

                if(error){return res.status(500).send({ error: error }) }     
                const response = {
                    mensagem: 'Produto removido com sucesso',
                    request: {
                        tipo: 'POST',
                        descricao: 'Insere um produto',
                        url: 'http://localhost:3000/produtos',
                        body: {
                            nome: 'STRING',
                            preco: 'NUMBER'
                        }
                    }
                }
                res.status(201).send(response);
            }
        )
    });
};