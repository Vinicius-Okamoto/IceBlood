
-- Criando a tabela Empresa
CREATE TABLE empresa (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    razaoSocial VARCHAR(45),
    nomeFantasia VARCHAR(45) NOT NULL,
    cnpj CHAR(17) NOT NULL UNIQUE,
    email VARCHAR(45) NOT NULL UNIQUE
);

-- Criando a tabela Unidade
CREATE TABLE unidade (
    idUnidade INT PRIMARY KEY AUTO_INCREMENT,
    cep CHAR(8),
    numero VARCHAR(45),
    tokenn CHAR(6),
    fkEmpresa INT,
        FOREIGN KEY(fkEmpresa) REFERENCES empresa(idEmpresa)
);

-- Criando a tabela Usuario
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
-- Criando a Tabela Camara
CREATE TABLE camara (
	idCamara INT AUTO_INCREMENT,
    fkUnidade INT, 
		PRIMARY KEY(idCamara, fkUnidade),
	camaraSetor VARCHAR(45) NOT NULL,
		FOREIGN KEY (fkUnidade) REFERENCES unidade(idUnidade)
);


-- Criando a tabela Sensor
CREATE TABLE sensor (
    idSensor INT  PRIMARY KEY AUTO_INCREMENT,
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
