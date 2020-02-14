CREATE DATABASE MeuPonto

use MeuPonto

Create Table Usuario (
	Id int primary key identity,
	Nome varchar(255) not null,
	Email varchar(255) not null unique,
	Senha varchar(255) not null,
	Pis varchar(255) not null,
	IdUnidade int foreign key references Unidades(NumeroUnidade)
)

Create Table Unidades (
	NumeroUnidade int primary key,
	NomeFantasia varchar(255) not null,
	RazaoSocial varchar(255) not null default ('Serviço Nacional Aprendiz Industrial'),
	Cnpj Varchar(14) unique not null,
	Endereco varchar(255) not null unique,
	Cidade varchar(255) not null,
	Cep varchar(8) not null,
)


Create Table Comprovante (
	Id int primary key identity,
	Horario DateTime not null,
	Nsr varchar(9) not null ,
	IdUsuario int foreign key references Usuario(Id),
	Imagem text not null

);

alter table Usuario add TipoUsuario bit default 0;
 

Insert into Unidades (NumeroUnidade,NomeFantasia,Endereco,Cidade,Cep,Cnpj) values (132,'Escola Senai de Informática','Alameda Barão de Limeira, 539', 'São Paulo','01202001','03774819008189')

Insert into Usuario (Nome,Pis,IdUnidade,Email,Senha,TipoUsuario) values ('Administrador','001',132,'admeuponto@hotmail.com','123132',1)

delete from Usuario

Insert into Comprovante (Horario,IdUsuario,Nsr,Imagem) values (GETDATE(),2,'234565432','dasdsadas')


select* from Comprovante

Select * From Usuario Join Unidades on Usuario.IdUnidade = Unidades.NumeroUnidade

Select * FRom Comprovante Join Usuario on Usuario.Id = Comprovante.IdUsuario join Unidades on Usuario.IdUnidade = Unidades.NumeroUnidade
