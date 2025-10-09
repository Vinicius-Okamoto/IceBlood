show databases;
create DATABASE iceblood;
use iceblood;
SHOW TABLES;

-- Criando a tabela Empresa
CREATE TABLE empresa (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    razaoSocial VARCHAR(45),
    nomeFantasia VARCHAR(45) NOT NULL,
    cnpj CHAR(17) NOT NULL UNIQUE,
    email VARCHAR(45) NOT NULL UNIQUE
);

--Criando a tabela Unidade
CREATE TABLE unidade (
    idUnidade INT AUTO_INCREMENT,
    fkEmpresa INT,
        PRIMARY KEY(idUnidade, fkEmpresa),
    cep CHAR(8),
    numero VARCHAR(45),
    tokenn CHAR(6),
        FOREIGN KEY(fkEmpresa) REFERENCES empresa(idEmpresa)
);

--Criando a tabela Usuario
CREATE TABLE usuario (
    idUsuario INT AUTO_INCREMENT,
    fkUnidade INT,
        PRIMARY KEY(idUsuario, fkUnidade),
    nome VARCHAR(45),
    sobrenome VARCHAR(45),
    cpf CHAR(11) NOT NULL UNIQUE,
    email VARCHAR(45) NOT NULL UNIQUE,
    senha VARCHAR(45),
        FOREIGN KEY (fkUnidade) REFERENCES unidade(idUnidade)
);

-- Criando a tabela Sensor
CREATE TABLE sensor (
    idSensor INT AUTO_INCREMENT,
    fkUnidade INT,
        PRIMARY KEY(idSensor, fkUnidade),
    camaraSetor VARCHAR(45) NOT NULL,
        FOREIGN KEY (fKUnidade) REFERENCES unidade(idUnidade)
);

-- Criando a tabela Registro
CREATE TABLE registro (
    idRegisto INT PRIMARY KEY AUTO_INCREMENT,
    temperatura DECIMAL(4,2),
    dtHora DATETIME,
    fkSensor INT,
        FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor)
);

-- Inserindo dados na tabela EMPRESA
INSERT INTO empresa (razaoSocial, nomeFantasia, cnpj, email) VALUES
('BioSafe Monitoramento Hospitalar LTDA', 'BioSafe', '27654321000110', 'suporte@biosafe.com.br');

-- Inserindo dados na tabela UNIDADE
INSERT INTO unidade (fkEmpresa, cep, numero, tokenn) VALUES
(1, '01310940', '101', 'HT123A'),
(1, '04547001', '55', 'HT987B'),
(1, '02047000', '300', 'BS654C');

-- Inserindo dados na tabela USUARIO
INSERT INTO usuario (fkUnidade, nome, sobrenome, cpf, email, senha) VALUES
(1, 'Rafael', 'Costa', '23456789012', 'rafael.costa@biosafe.com.br', 'abc123'),
(1, 'Mariana', 'Lopes', '34567890123', 'mariana.lopes@biosafe.com.br', 'pass123'),
(1, 'Thiago', 'Santos', '45678901234', 'thiago.santos@biosafe.com.br', 'biosafe2025');

-- Inserindo dados na tabela SENSOR
INSERT INTO sensor (fkUnidade, camaraSetor) VALUES
(1, 'Hospital Central - Camara Principal');


