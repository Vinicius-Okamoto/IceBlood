create database iceblood;
use iceblood;
create table usuario (
idusuario int primary key auto_increment,
usuario varchar(40) not null unique,
cnpj varchar (18),
email varchar (40) not null unique,
senha varchar (20) not null,
permissoes varchar (15),
nome varchar (50),
constraint chkemail check (email like '%@%')
);

create table sensor (
idsensor int primary key auto_increment,
temperatura decimal (4,2),
dataehora datetime 
);

create table empresa (
idempresa int primary key auto_increment,
nomeempresa varchar (20),
estadoempresa varchar (25),
cidadeempresa varchar (30),
complementoempresa varchar (45),
siteempresa varchar (45)
);

create table bolsa_sangue (
idbolsa INT AUTO_INCREMENT PRIMARY KEY, 
tiposanguineoabo CHAR(2) NOT NULL,
fatorrh char(1) not null,
validadebolsa DATE NOT NULL,
dtcoleta DATETIME,
constraint chk_tipo check (tiposanguineoabo in ('A','B','AB','O')),
constraint chk_rh check (fatorrh in ('+','-'))
);