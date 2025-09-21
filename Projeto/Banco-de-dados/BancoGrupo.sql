CREATE DATABASE iceblood;
USE iceblood;

CREATE TABLE Empresa (
    id_empresa INT AUTO_INCREMENT PRIMARY KEY,
    nome_empresa VARCHAR(150) NOT NULL,
    cnpj_empresa CHAR(14) NOT NULL,
    cep_empresa VARCHAR(15) NOT NULL,
	logradouro_empresa VARCHAR(50) NOT NULL,
	numero_empresa VARCHAR(20)NULL,
	bairro_empresa VARCHAR(30)NULL,
	cidade_empresa VARCHAR(50)NOT NULL,
	estado_empresa VARCHAR(20)NOT NULL,
	ufEmpresa_empresa CHAR(2)NOT NULL,
    dt_cadastro_empresa DATETIME,
    nome_responsavel_empresa VARCHAR(30)NOT NULL,
	email_responsavel_empresa VARCHAR(30)NOT NULL,
	CONSTRAINT chk_email_responsavel_empresa CHECK (email_email_responsavel_empresa LIKE '%@%')
);

CREATE TABLE Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome_usuario VARCHAR(100) NOT NULL,
    email_usuario VARCHAR(100) UNIQUE NOT NULL,
    senha_usuario VARCHAR(50) NOT NULL,
    cargo_usuario VARCHAR(50) NOT NULL,
    permissao_usuario VARCHAR(20) NOT NULL,
    CONSTRAINT chk_permissao_usuario CHECK (permissao_usuario IN ('Admin', 'Operador', 'Visualizador')),
	CONSTRAINT chk_email_usuario CHECK (email_usuario LIKE '%@%')
);

CREATE TABLE Arduino (
    id_arduino INT AUTO_INCREMENT PRIMARY KEY,
	id_empresa varchar (20) NOT NULL,
    camara_instalacao_arduino VARCHAR(100) NOT NULL,
    stats_arduino VARCHAR(20) NOT NULL,
    temperatura_arduino DECIMAL(5,2) NOT NULL,
    dt_hora_arduino DATETIME NOT NULL,
    CONSTRAINT chk_stats_arduino_arduino CHECK (stats_arduino IN ('Ativo', 'Inativo', 'Manutenção'))
);

/*CREATE TABLE Doador (
    id_doador INT AUTO_INCREMENT PRIMARY KEY,
    idade_doador INT NOT NULL,
    genero_doador Varchar(15),
    dt_doacao DATE NOT NULL,
    nome_doador VARCHAR(100) NOT NULL,
    cpf_doador CHAR(11) UNIQUE NOT NULL,
    tipo_sanguineo_doador CHAR(3) NOT NULL,
    dt_nascimento_doador DATE NOT NULL,
    telefone_doador VARCHAR(15) NOT NULL,
	responsavel_telefone_doador VARCHAR(15) NULL,
    CONSTRAINT chk_tipo_sanguineo_doador CHECK (tipo_sanguineo_doador IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
    CONSTRAINT chk_genero_doador CHECK(genero_doador IN ('Masculino', 'Feminino'))
);
*/


CREATE TABLE Bolsa_Sangue (
    id_bolsa INT AUTO_INCREMENT PRIMARY KEY, 
    tipo_sanguineo_bolsa CHAR(3) NOT NULL,
    validade_bolsa DATE NOT NULL,
    dt_doacao_bolsa DATETIME,
    quantidade_ml_bolsa INT NOT NULL,
    stats_bolsa VARCHAR(20) NOT NULL,
    CONSTRAINT chk_tipo_sanguineo_bolsa CHECK (tipo_sanguineo_bolsa IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
	CONSTRAINT chk_stats_bolsa CHECK (stats_bolsa IN ('Armazenada', 'Transfundida', 'Vencida'))
);

CREATE TABLE Alerta (
    id_alerta INT AUTO_INCREMENT PRIMARY KEY,
    id_arduino INT NOT NULL, 
    gravidade_alerta VARCHAR (30),
    dt_hora_alerta DATETIME NOT NULL,
    status_manutenção VARCHAR(20) NOT NULL,
	CONSTRAINT chk_tipo_gravidade_alerta CHECK (gravidade_alerta IN ('Baixa','Alta')),
	CONSTRAINT chk_status_manutenção CHECK (status_manutenção IN ('Acionado', 'Resolvido'))
);



INSERT INTO Empresa 
(nome_empresa, cnpj_empresa, cep_empresa, logradouro_empresa, numero_empresa, bairro_empresa, cidade_empresa, estado_empresa, ufEmpresa_empresa, dt_cadastro_empresa, nome_responsavel_empresa, email_responsavel_empresa) 
VALUES
('Homocentro Cruz Azul', '38657298000180', '13424-052', 'Rua Alexandre Fleming', '1425', 'Centro', 'Campinas', 'São Paulo', 'SP', '2023-04-12', 'Joelma da Conceição Cruz', 'hemocruzazul@hotmail.com.br'),
('Hospital de Taipas', '57054046000100', '06654-726', 'Rua Rabat', '1526', 'Taipas', 'São Paulo', 'São Paulo', 'SP', '2025-08-10', 'Paulo Henrique Carino Luques', 'hosptaipas@hotmail.com.br'),
('Homocentro RP', '18317618000480', '09750-360', 'Rua Tasman', '1230', 'Centro', 'Ribeirão Preto', 'São Paulo', 'SP', '2020-08-21', 'Levi Borner Bilé', 'hemocentrorp@gmail.com'),
('Hospital Santa Tech', '23417618000481', '06815-400', 'Avenida Paulista', '1432', 'Bela Vista', 'São Paulo', 'São Paulo', 'SP', '2022-09-08', 'José Antônio Figueiredo', 'hopsst@.com.br'),
('Accenture', '18317618000145', '13342-021', 'Alameda das Glicínias', '1727', 'Jardins', 'São Paulo', 'São Paulo', 'SP', '2018-06-01', 'Fellipe Tavares Annunziato', 'eletronicos.marques@geradornv.com.br');

INSERT INTO Usuario 
(nome_usuario, email_usuario, senha_usuario, cargo_usuario, permissao_usuario) 
VALUES  
('Roger', 'rogerelias@gmail.com','#elias1234', 'Médico', 'Admin'),
('Victor', 'victorgui@gmail.com','#guimaraes', 'Enfermeiro', 'Visualizador'),
('Maria', 'maria157s@gmail.com','ma2234', 'Médica', 'Operador'),
('Robson', 'robson177@gmail.com','robb@', 'Médico', 'Admin');

INSERT INTO Doador 
(nome_doador, cpf_doador, tipo_sanguineo_doador, dt_nascimento_doador, telefone_doador) 
VALUES 
('Victor', '02543688910', 'AB-', '2001-03-28', '11-95922-0305'),
('Alexandre', '12765933604', 'A+', '1994-03-01', '21-96478-5612'),
('Gabriel', '65434578911', 'B+', '1983-05-17', '16-98941-9836'),
('Giovanna', '47825697705', 'A+', '1990-06-08', '75-96564-8223');

INSERT INTO Alerta 
(id_arduino, gravidade_alerta, dt_hora_alerta, status_manutenção) 
VALUES
(1,'Alta','2025-04-09', 'Resolvido'),
(2,'Baixa','2025-07-27', 'Resolvido'),
(3,'Alta','2025-06-13','Resolvido'),
(4,'Alta','2025-09-04', 'Acionado');

INSERT INTO Arduino 
(id_empresa, camara_instalacao_arduino, stats_arduino, temperatura_arduino, dt_hora_arduino) 
VALUES
(2,'sala 01, segundo andar','Ativo', 5,'2025-10-02'),
(2,'sala 113, sétimo andar','Manutenção', 6,'2024-03-23'),
(1,'sala marte','Inativo', 4,'2023-04-17'),
(1,'sala venus','Manutenção', 3,'2025-04-16'),
(3,'sala Paulista','Ativo', 4,'2024-07-18'),
(3,'sala Masp','Inativo', 7,'2025-08-15');

INSERT INTO Bolsa_Sangue
(tipo_sanguineo_bolsa, validade_bolsa, dt_doacao_bolsa, quantidade_ml_bolsa, stats_bolsa) 
VALUES
('A+', '2026-05-20', '2025-04-02', 200, 'Armazenada'),
('A+', '2026-08-20', '2025-08-26', 500, 'Transfundida'),
('A-', '2026-04-20', '2025-10-15', 500, 'Vencida'),
('AB+', '2026-07-20', '2025-11-20', 200, 'Armazenada'),
('O-', '2026-06-20', '2025-09-25', 250, 'Transfundida');

-- SELECT NA TABELA EMPRESA USANDO 'AS'
SELECT
    id_empresa AS 'Id Empresa',
    nome_empresa AS 'Nome da Empresa',
    cnpj_empresa AS 'CNPJ',
    cep_empresa AS 'CEP',
    logradouro_empresa AS 'Logradouro',
    numero_empresa  AS 'Número',
    bairro_empresa AS 'Bairro',
    cidade_empresa  AS 'Cidade',
    estado_empresa AS 'Estado',
    ufEmpresa_empresa AS 'UF',
    dt_cadastro_empresa AS 'Data de Cadastro',
    nome_responsavel_empresa AS 'Nome do Responsável',
    email_responsavel_empresa AS 'E-mail do Responsável'
FROM Empresa;

CREATE TABLE Doador (
    id_doador INT AUTO_INCREMENT PRIMARY KEY,
    idade_doador INT NOT NULL,
    genero_doador Varchar(15),
    dt_doacao DATE NOT NULL,
    nome_doador VARCHAR(100) NOT NULL,
    cpf_doador CHAR(11) UNIQUE NOT NULL,
    tipo_sanguineo_doador CHAR(3) NOT NULL,
    dt_nascimento_doador DATE NOT NULL,
    telefone_doador VARCHAR(15) NOT NULL,
	responsavel_telefone_doador VARCHAR(15) NULL,
    CONSTRAINT chk_tipo_sanguineo_doador CHECK (tipo_sanguineo_doador IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
    CONSTRAINT chk_genero_doador CHECK(genero_doador IN ('Masculino', 'Feminino'))
);

INSERT INTO Doador (idade_doador, genero_doador, dt_doacao, nome_doador, cpf_doador, tipo_sanguineo_doador, dt_nascimento_doador, telefone_doador, responsavel_telefone_doador)
VALUES
(25, 'Masculino', '2025-01-10', 'João Silva', '12345678901', 'O+', '2000-05-10', '11999998888', NULL),
(30, 'Feminino', '2025-02-15', 'Maria Oliveira', '23456789012', 'A-', '1995-08-22', '11988887777', '11955556666'),
(40, 'Masculino', '2025-03-20', 'Carlos Souza', '34567890123', 'B+', '1985-03-15', '11977776666', NULL),
(36, 'Feminino', '2025-04-05', 'Ana Santos', '45678901234', 'AB-', '1997-11-02', '11966665555', NULL),
(35, 'Masculino', '2025-05-18', 'Pedro Lima', '56789012345', 'A+', '1990-09-09', '11955554444', NULL),
(42, 'Feminino', '2025-06-25', 'Juliana Costa', '67890123456', 'O-', '2003-01-19', '11944443333', NULL);

SELECT idade_doador, dt_doacao, genero_doador
FROM Doador
WHERE genero_doador ='feminino'
ORDER BY idade_doador ASC;


/*
Ketellyn Santos – 01252079
Maria Eduarda Lima – 01252088
Pablo Cordeiro - 01252114
Rafael Souza Alcântara - 012520115
Robson Guilherme do Ouro – 01252120
Roger Elias Aparecido – 01252049
Victor Guimarães Souza - 012520112
*/
