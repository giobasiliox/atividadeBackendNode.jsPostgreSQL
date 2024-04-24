CREATE TABLE usuarios (
    id SERIAL  PRIMARY KEY ,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(130) NOT NULL,
    data_nascimento DATE NOT NULL,
    email VARCHAR(100) NOT NULL,
    idade INTEGER NOT NULL,
    signo VARCHAR(50) NOT NULL
);

"nome": "Giovana",
"sobrenome": "Basílio",
"data_nascimento": "2007-03-05",
"email": "giobasiliox@gmail.com"

"nome": "Maria",
"sobrenome": "Ferreira",
"data_nascimento": "1969-09-21",
"email": "marizinha02@gmail.com"

"nome": "João",
"sobrenome": "Silva",
"data_nascimento": "1999-12-15",
"email": "silvajoao@gmail.com"

"nome": "Pedro",
"sobrenome": "Fernandes",
"data_nascimento": "2000-01-01",
"email": "pedrinhofer@gmail.com"

