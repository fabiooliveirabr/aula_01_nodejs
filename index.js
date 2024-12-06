//Importações
const db = require('./conexao');
const express = require('express');

//Criar a aplicação JavaScript com servidor Express
const app = express();
app.use(express.json());

//Criar a rota para consultar todos os usuários
app.get('/usuarios', (req, res) => {
    const sql = "SELECT * FROM tb_usuarios";
    db.query(sql, (erro, resultados) => {
        if(erro){
            console.log("Falha ao consultar usuários");
            return res.json({ mensagem: "Falha ao consultar usuários" });
        }
        return res.json(resultados);
    });    
});// Fim da rota para consultar todos os usuários

//Criar a rota para consultar um usuário pelo ID
app.get('/usuarios/:codigo', (req, res) => {
    const id_informado = req.params.codigo;
    const sql = "SELECT * FROM tb_usuarios WHERE id_usuario = ?";
    db.query(sql, [id_informado], (erro, resultados) => {
        if(erro){
            console.log("Falha ao consultar usuário");
            return res.json({ mensagem: "Falha ao consultar usuário"+erro.message});
        }
        //Contar a quantidade de linhas de resultados
        if(resultados.length == 0){
            return res.json({mensagem: "Usuário não encontrado"});
        }else{
            return res.json(resultados);
        }
    });
});//Fim da rota para consultar um usuário pelo ID



//Criar a rota para consultar todos os clientes
app.get('/clientes', (req, res) => {
    const sql = "SELECT * FROM tb_clientes";
    db.query(sql, (erro, resultados) => {
        if(erro){
            console.log("Falha ao consultar");
            return res.json({ mensagem: "Falha ao consultar: "+erro.message });
        }
        return res.json(resultados);
    });    
});// Fim da rota para consultar todos os clientes

//Criar rota para cadastrar usuario via post
app.post('/cad_usuario', (req, res) => {
    const {login_informado, senha_informada} = req.body;
    const sql = "INSERT INTO tb_usuarios (login_usuario, senha_usuario) VALUES (?, ?)";
    db.query(sql, [login_informado, senha_informada], (erro, resultados)=>{
        if(erro){
            console.log("Falha ao cadastrar");
            return res.json({ mensagem: "Falha ao cadastrar: "+erro.message});
        }else{
            console.log("Cadastrado com sucesso");
            return res.json({ mensagem: "Cadastrado com sucesso" });
        }
    });
});//Fim da rota para cadastrar usuario via post


//Rodar o servidor
const porta = 3001;
app.listen(porta, () => {
    console.log("Servidor executando na porta de nº "+porta);
});

