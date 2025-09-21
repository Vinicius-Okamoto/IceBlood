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
