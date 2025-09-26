create database iceblood2;
use iceblood2;

-- Criando tabelas (token, empresa, filial, arduino, sensor e registro)

create table token (
idToken int primary key,
numToken int
);

create table empresa (
idEmpresa int primary key,
nomeEmpresa varchar(45) not null,
cnpj char(14) unique not null,
email varchar(50) unique not null,
fk_token int unique,
CONSTRAINT fk_empresa_token FOREIGN KEY (fk_token) REFERENCES token(idtoken),
CONSTRAINT chk_email CHECK (email LIKE '%@%')
);

create table filial (
idFilial int primary key auto_increment,
userFilial varchar(45),
senhaFilial varchar(45),
cepFilial varchar(8) not null,
enderecoFilial varchar(100) not null,
telefoneFilial varchar (20),
fk_empresa int,
CONSTRAINT fk_filial_empresa Foreign Key (fk_empresa) references empresa(idEmpresa)
);

create table camara (
idCamara int primary key auto_increment,
tipocamara varchar (20), constraint chkTipoCamara check (tipocamara in('Sangue', 'Plaqueta', 'Plasma')),
dtInstalacao date,
fk_Filial int,
Constraint fk_arduino_filial foreign key (fk_Filial) references filial(idFilial)
);

create table sensor (
idSensor int primary key auto_increment,
temperatura_min decimal (5,2) not null,
temperatura_max decimal (5,2) not null,
localizacaoSensor varchar (20),
fk_arduino INT NOT NULL,
CONSTRAINT fk_sensor_arduino FOREIGN KEY (fk_arduino) REFERENCES camara(idCamara)
);


create table registro (
idRegistro int primary key auto_increment,
temp decimal(5,2) not null,
dtHora datetime default current_timestamp

);
drop table registro;

select * from registro;