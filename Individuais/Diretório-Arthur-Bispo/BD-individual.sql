

-- Tabela 01 - Cadastro da Empresa
CREATE TABLE cadastroEmpresa (
    idEmpresa INT PRIMARY KEY auto_increment,
    nomeEmpresa VARCHAR(70) NOT NULL,
    cnpj VARCHAR(20) UNIQUE,
    emailResponsavel VARCHAR(100) UNIQUE,
    check (emailResponsavel like '%@%')
);

-- Tabela 02 - Cadastro do Usuário
CREATE TABLE cadastroUser (
    idUser INT PRIMARY KEY auto_increment,
    nomeUser VARCHAR(45),
    cpf CHAR(11) UNIQUE NOT NULL,
    senha VARCHAR(50) not NULL,
    emailUser VARCHAR(100) UNIQUE constraint chkEmail CHECK (emailUser LIKE '%@%'),
    fkEmpresa int, Foreign Key (fkEmpresa) REFERENCES cadastroEmpresa(idEmpresa)
);

-- Tabela 03 - Dados da Dashboard recebidos do arduino
CREATE TABLE dadosDash (
    idDados INT PRIMARY KEY auto_increment,
    sensor VARCHAR(30),
    locall VARCHAR(60) NOT NULL,
    dtRegistro DATETIME,
    registro DECIMAL(2, 2) NOT NULL,
    fkUser INT,
    Foreign Key (fkUser) REFERENCES cadastroUser(idUser)
);

-- Tabela 04 - Dados dos registros enviados para o arduino

create table registro (
    idRegistro int primary key AUTO_INCREMENT,
    dtRegistro DATETIME DEFAULT CURRENT_TIMESTAMP,
    tempRegistrada DECIMAL(2, 2) not null,
    fkDados int,
    Foreign Key (fkDados) REFERENCES dadosDash (idDados)
);
