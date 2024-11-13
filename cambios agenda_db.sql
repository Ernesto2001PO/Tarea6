

ALTER TABLE usuario
add column imagenId int,
 ADD CONSTRAINT fk_usuario_imagen FOREIGN KEY (imagenId) REFERENCES imagen(imagenId);



create table direccionesContactos(
direccionescontactoId int primary key auto_increment,
contactoId int,
direccion varchar(250),
foreign key (contactoId) references contacto(contactoId)
);




insert into direccionesContactos(direccionescontactosId,contactoId,direccion)
values
(1,"av 123"),
(1,"av 4345");












