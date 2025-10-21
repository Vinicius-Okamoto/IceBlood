CREATE DATABASE iceblood;
USE iceblood;

CREATE TABLE hospitais (
    id_hospital INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(200),
    telefone VARCHAR(20),
    email VARCHAR(100)
);

CREATE TABLE bolsas (
    id_bolsa INT PRIMARY KEY AUTO_INCREMENT,
    codigo_bolsa VARCHAR(50) NOT NULL UNIQUE,
    data_coleta DATE NOT NULL,
    data_validade DATE NOT NULL,
    id_hospital INT,
    status_bolsa VARCHAR(20) DEFAULT 'Em Armazenamento',
    FOREIGN KEY (id_hospital) REFERENCES hospitais(id_hospital),
    CONSTRAINT chk_status CHECK (status_bolsa IN ('Em Armazenamento','Em Transporte','Descartada','Utilizada'))
);

CREATE TABLE alertas (
    id_alerta INT PRIMARY KEY AUTO_INCREMENT,
    id_sensor INT,
    temperatura DECIMAL(5,2),
    limite_min DECIMAL(5,2),
    limite_max DECIMAL(5,2),
    data_hora DATETIME
);

CREATE TABLE leituras_temperatura (
    idSensor INT PRIMARY KEY,
    temperatura DECIMAL(5,2) NOT NULL,
    data_hora DATETIME,
    alertas_id_alerta INT NOT NULL,
    bolsas_id_bolsa INT NOT NULL,
    FOREIGN KEY (alertas_id_alerta) REFERENCES alertas(id_alerta),
    FOREIGN KEY (bolsas_id_bolsa) REFERENCES bolsas(id_bolsa)
);

CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    perfil VARCHAR(20) NOT NULL,
    id_hospital INT,
    FOREIGN KEY (id_hospital) REFERENCES hospitais(id_hospital),
    CONSTRAINT chk_perfil CHECK (perfil IN ('Administrador','Tecnico','Medico','Operador'))
);



