CREATE DATABASE iceblood;
USE iceblood;

CREATE TABLE empresa(
idEmpresa INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
nome_empresa VARCHAR(40) NOT NULL,
cnpj CHAR(14) NOT NULL,
email VARCHAR(40),
senha VARCHAR(40),
dtCadastro DATE NOT NULL
);

CREATE TABLE logradouro(
idLogradouro INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
rua VARCHAR(40) NOT NULL,
cep VARCHAR(40) NOT NULL,
numero CHAR(5) NOT NULL,
fkEmpresa INT,
CONSTRAINT fkLogEmpresa
FOREIGN KEY (fkEmpresa)
REFERENCES empresa (idEmpresa)
);

CREATE TABLE usuario(
idUsuario INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
nome VARCHAR(40) NOT NULL,
cpf CHAR(11) NOT NULL,
nivelAcesso tinyint NOT NULL,
fkEmpresa INT,
CONSTRAINT fkUserEmpresa
FOREIGN KEY (fkEmpresa)
REFERENCES empresa (idEmpresa)
);

CREATE TABLE camara(
idCamara INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
tipoBolsa VARCHAR(40) NOT NULL,
fkEmpresa INT,
CONSTRAINT fkCamEmpresa
FOREIGN KEY (fkEmpresa)
REFERENCES empresa (idEmpresa)
);

CREATE TABLE arduino(
idArduino INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
numCamara INT,
fkCamara INT,
CONSTRAINT fkArdCamara
FOREIGN KEY (fkCamara)
REFERENCES camara(idCamara)
);

CREATE TABLE sensor(
idSensor INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
instalacaoCamara INT, 
statusManutencao TINYiNT,
captura DECIMAL,
dtCaptura DATETIME,
fkArduino INT,
CONSTRAINT fkArdSensor
FOREIGN KEY (fkArduino)
REFERENCES arduino (idArduino)
);


CREATE TABLE alerta(
idAlerta INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
gravidade VARCHAR(15),
fkSensor INT,
CONSTRAINT fKAlertSensor
FOREIGN KEY (fkSensor)
REFERENCES sensor(idSensor)
);

