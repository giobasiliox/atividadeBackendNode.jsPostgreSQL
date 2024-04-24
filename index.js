const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({ mensagem: 'Servidor backend rodando com sucesso🚀' });
});

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'exercicioback',
    password: 'ds564',
    port: 7007,
});


function calcularIdade(dataNascimento) {
    const dataAtual = new Date();
    const dataNasc = new Date(dataNascimento);
    let idade = dataAtual.getFullYear() - dataNasc.getFullYear();
    const mes = dataAtual.getMonth() - dataNasc.getMonth();
    if (mes < 0 || (mes == 0 && dataAtual.getDate() < dataNasc.getDate())) {
        idade--;
    }
    return idade;
}

function acharSigno(dataNascimento) {
    const dataNasc = new Date(dataNascimento);
    const dia = dataNasc.getDate();
    const mes = dataNasc.getMonth() + 1;

    if ((mes === 1 && dia >= 20) || (mes === 2 && dia <= 18)) {
        return 'Aquário ♒';
    } else if ((mes === 2 && dia >= 19) || (mes === 3 && dia <= 20)) {
        return 'Peixes ♓';
    } else if ((mes === 3 && dia >= 21) || (mes === 4 && dia <= 19)) {
        return 'Áries ♈';
    } else if ((mes === 4 && dia >= 20) || (mes === 5 && dia <= 20)) {
        return 'Touro ♉';
    } else if ((mes === 5 && dia >= 21) || (mes === 6 && dia <= 20)) {
        return 'Gêmeos ♊';
    } else if ((mes === 6 && dia >= 21) || (mes === 7 && dia <= 22)) {
        return 'Câncer ♋';
    } else if ((mes === 7 && dia >= 23) || (mes === 8 && dia <= 22)) {
        return 'Leão ♌';
    } else if ((mes === 8 && dia >= 23) || (mes === 9 && dia <= 22)) {
        return 'Virgem ♍';
    } else if ((mes === 9 && dia >= 23) || (mes === 10 && dia <= 22)) {
        return 'Libra ♎';
    } else if ((mes === 10 && dia >= 23) || (mes === 11 && dia <= 21)) {
        return 'Escorpião ♏';
    } else if ((mes === 11 && dia >= 22) || (mes === 12 && dia <= 21)) {
        return 'Sagitário ♐';
    } else {
        return 'Capricórnio ♑';
    }
}

app.post('/usuario', async (req, res) => {
    try {
        const { nome, sobrenome, data_nascimento, email } = req.body;
        const idade = calcularIdade(data_nascimento);
        const signo = acharSigno(data_nascimento);

        await pool.query('INSERT INTO usuarios (nome, sobrenome, data_nascimento, email, idade, signo) VALUES ($1, $2, $3, $4, $5, $6)', [nome, sobrenome, data_nascimento, email, idade, signo]);

        res.status(201).send({ mensagem: 'Usúario adicionada com sucesso!' });
    } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
        res.status(500).send('Erro ao adicionar usuário');
    }
});

app.get('/usuario', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios');
        res.json({
            total: result.rowCount,
            usuarios: result.rows,
        });
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).send('Erro ao buscar usuários');
    }
});

app.get('/usuario/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            res.status(404).send({ mensagem: 'Usuário não encontrado' });
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error('Erro ao obter usuário por ID:', error);
        res.status(500).send('Erro ao obter usuário por ID');
    }
});

app.put('/usuario/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, sobrenome, data_nascimento, email } = req.body;
        const dataNascimento = new Date(data_nascimento);
        const idade = calcularIdade(dataNascimento);
        const signo = acharSigno(dataNascimento);
        await pool.query('UPDATE usuarios SET nome = $1, sobrenome = $2, data_nascimento = $3, email = $4, idade = $5, signo = $6 WHERE id = $7', [nome, sobrenome, dataNascimento, email, idade, signo, id]);

        res.send({ mensagem: 'Usuário atualizado com sucesso!' });

    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).send('Erro ao atualizar usuário');
    }
});

app.delete('/usuario/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
        res.send({ mensagem: 'Usuário removido com sucesso!' });
    } catch (error) {
        console.error('Erro ao remover usuário:', error);
        res.status(500).send('Erro ao remover usuário');
    }
});



















app.listen(PORT, () => {
    console.log('Servidor rodando na porta ${PORT} 🚀🚀');
});