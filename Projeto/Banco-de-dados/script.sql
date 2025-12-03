create database iceblood;
use iceblood;

-- Criando a tabela Cliente
CREATE TABLE cliente (
	idCliente INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(45) NOT NULL UNIQUE,
    mensagem VARCHAR(150)
);

-- Criando a tabela Empresa
CREATE TABLE empresa (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    razaoSocial VARCHAR(45),
    nomeFantasia VARCHAR(45) NOT NULL,
    cnpj CHAR(14) NOT NULL UNIQUE,
    email VARCHAR(45) NOT NULL UNIQUE
);

-- Criando a tabela Unidade
CREATE TABLE unidade (
    token CHAR(6) PRIMARY KEY,
    nomeUnidade VARCHAR(45) NOT NULL,
    cep CHAR(8),
    numero VARCHAR(45),
    fkEmpresa INT,
        FOREIGN KEY(fkEmpresa) REFERENCES empresa(idEmpresa)
);

-- Criando a tabela Usuario
CREATE TABLE usuario (
    idUsuario INT AUTO_INCREMENT,
    fkUnidade CHAR(6),
        PRIMARY KEY(idUsuario, fkUnidade),
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL UNIQUE,
    senha VARCHAR(45) NOT NULL,
        FOREIGN KEY (fkUnidade) REFERENCES unidade(token)
);
-- Criando a Tabela Camara
CREATE TABLE camara (
	idCamara INT AUTO_INCREMENT,
    fkUnidade CHAR(6), 
		PRIMARY KEY(idCamara, fkUnidade),
	camaraSetor VARCHAR(45) NOT NULL,
		FOREIGN KEY (fkUnidade) REFERENCES unidade(token)
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
INSERT INTO unidade (token, nomeUnidade, cep, numero, fkEmpresa) VALUES
('HT123A', 'Unidade 01', '01310940', '101', 1),
('HT987B', 'Unidade 02', '04547001', '55', 1),
('BS654C', 'Unidade 03', '02047000', '300', 1);

-- Inserindo dados na tabela CAMARA
INSERT INTO camara (fkUnidade, camaraSetor) VALUES
('HT123A', 'Hospital Central - Camara Principal'),
('HT123A', 'Hospital Central - Sala 01'),
('HT123A', 'Hospital Central - Sala 02');

-- Inserindo dados na tabela SENSOR
INSERT INTO sensor(fkCamara, tempMax, tempMin) VALUES
(1, 6.0, 2.0),
(2, 6.0, 2.0),
(3, 6.0, 2.0);


create view vwUsuario as 
	SELECT 
            u.idUsuario as id,
            u.nome as nomeUsuario,
            u.email as emailUsuario,
            u.senha as senhaUsuario,
            u.fkUnidade,
            un.token AS tokenUnidade,
            un.fkEmpresa AS empresaId
        FROM usuario u
        JOIN unidade un ON u.fkUnidade = un.token
        JOIN empresa e ON un.fkEmpresa = e.idEmpresa;
	
CREATE VIEW vwDashboard AS
SELECT
    r.idRegisto as idRegistro,
    r.temperatura as tempAtual,
    r.dtHora as dtHoraAtual,
    s.idSensor as idSensor,
    s.tempMin as tempMin,
    s.tempMax as tempMax,
    c.idCamara as idCamara,
    c.camaraSetor as camaraSetor,
    u.token as unidadeToken,
    u.nomeUnidade as nomeUnidade,
    us.nome as nomeUsuario
FROM registro r
JOIN sensor s   ON r.fkSensor = s.idSensor
JOIN camara c   ON s.fkCamara = c.idCamara
JOIN unidade u  ON c.fkUnidade = u.token
JOIN usuario us ON u.token = us.fkUnidade
ORDER BY r.dtHora;

SELECT * FROM vwDashboard WHERE unidadeToken = ${token} AND idCamara = ${idCamara};

        
