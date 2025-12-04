CREATE DATABASE iceblood;
USE iceblood;

-- Criando a tabela Cliente
CREATE TABLE cliente (
	idCliente INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(45) NOT NULL,
    mensagem VARCHAR(150)
);

-- Criando a tabela Empresa
CREATE TABLE empresa (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    razaoSocial VARCHAR(45),
    nomeFantasia VARCHAR(45) NOT NULL,
    cnpj CHAR(14) NOT NULL UNIQUE
);

-- Criando a tabela Unidade
CREATE TABLE unidade (
	idUnidade INT PRIMARY KEY AUTO_INCREMENT,
    token CHAR(6) NOT NULL,
    nomeUnidade VARCHAR(45) NOT NULL,
    cnpj CHAR(14) NOT NULL UNIQUE,
    cep CHAR(8),
    numero VARCHAR(45),
    fkEmpresa INT,
        FOREIGN KEY(fkEmpresa) REFERENCES empresa(idEmpresa)
);

-- Criando a tabela Usuario
CREATE TABLE usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    fkUnidade INT,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL UNIQUE,
    senha VARCHAR(45) NOT NULL,
        FOREIGN KEY (fkUnidade) REFERENCES unidade(idUnidade)
);

-- Criando a Tabela Camara
CREATE TABLE camara (
	idCamara INT AUTO_INCREMENT PRIMARY KEY,
    fkUnidade INT NOT NULL, 
	camaraSetor VARCHAR(45) NOT NULL,
		FOREIGN KEY (fkUnidade) REFERENCES unidade(idUnidade)
);

-- Criando a tabela Sensor
CREATE TABLE sensor (
    idSensor INT  PRIMARY KEY AUTO_INCREMENT,
    tempMax DECIMAL (4,2),
    tempMin DECIMAL (4,2),
	fkCamara INT,
        FOREIGN KEY (fKCamara) REFERENCES camara(idCamara)
);

-- Criando a tabela Registro
CREATE TABLE registro (
    idRegistro INT PRIMARY KEY AUTO_INCREMENT,
    temperatura DECIMAL(4,2),
    dtHora DATETIME,
    fkSensor INT,
        FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor)
);

-- Inserindo dados na tabela EMPRESA
INSERT INTO empresa (razaoSocial, nomeFantasia, cnpj) VALUES
('BioSafe Monitoramento Hospitalar LTDA', 'BioSafe', '27654321000110');

-- Inserindo dados na tabela UNIDADE
INSERT INTO unidade (token, nomeUnidade, cnpj, cep, numero, fkEmpresa) VALUES
('HT123A', 'Unidade 01', '27654321000111', '01310940', '101', 1),
('HT987B', 'Unidade 02', '27654321000112', '04547001', '55', 1),
('BS654C', 'Unidade 03', '27654321000113', '02047000', '300', 1);

-- Inserindo dados na tabela CAMARA
INSERT INTO camara (fkUnidade, camaraSetor) VALUES
(1, 'Hospital Central - Camara Principal'),
(2, 'Hospital Central - Sala 01'),
(3, 'Hospital Central - Sala 02');

-- Inserindo dados na tabela SENSOR
INSERT INTO sensor(fkCamara, tempMax, tempMin) VALUES
(1, 6.0, 2.0),
(2, 6.0, 2.0),
(3, 6.0, 2.0);

-- Inserindo usuários de suporte
INSERT INTO usuario(fkUnidade, nome, email, senha) VALUES
(NULL, 'Matheus Queiroz', 'matheusqueiroz@gmail.com', 'matheus123'),
(NULL, 'Vinicius Yudi', 'viniciusyudi@gmail.com', 'vinicius123'),
(NULL, 'Carlos Tevez', 'carlostevez@gmail.com', 'carlos123');

-- VIEW USUARIO CORRIGIDA
CREATE VIEW vwUsuario AS 
	SELECT 
        u.idUsuario AS id,
        u.nome AS nomeUsuario,
        u.email AS emailUsuario,
        u.senha AS senhaUsuario,
        u.fkUnidade,
        un.token AS tokenUnidade,
        un.fkEmpresa AS empresaId
    FROM usuario u
    JOIN unidade un ON u.fkUnidade = un.idUnidade
    JOIN empresa e ON un.fkEmpresa = e.idEmpresa;

-- VIEW DASHBOARD CORRIGIDA
CREATE VIEW vwDashboard AS
SELECT
    r.idRegistro,
    r.temperatura AS tempAtual,
    r.dtHora AS dtHoraAtual,
    s.idSensor,
    s.tempMin,
    s.tempMax,
    c.idCamara,
    c.camaraSetor,
    u.token AS unidadeToken,
    u.nomeUnidade,
    us.nome AS nomeUsuario
FROM registro r
JOIN sensor s   ON r.fkSensor = s.idSensor
JOIN camara c   ON s.fkCamara = c.idCamara
JOIN unidade u  ON c.fkUnidade = u.idUnidade
JOIN usuario us ON us.fkUnidade = u.idUnidade
ORDER BY r.dtHora;