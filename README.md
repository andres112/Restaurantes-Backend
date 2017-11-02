# restaurantes v1.0.0

Backend para restaurantes y platos

- [Usuarios](#usuarios)
	- [Inicio de Sesion](#inicio-de-sesion)
	- [Registro de Usuarios](#registro-de-usuarios)
	


# Usuarios

## Inicio de Sesion



	POST /api/v1/login


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Credenciales			| Object			|  <p>Objeto JSON</p>							|
| Credenciales.email			| String			|  <p>Email de Usuario</p>							|
| Credenciales.password			| String			|  <p>Password de Usuario</p>							|

## Registro de Usuarios



	POST /api/v1/users/signin


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Usuario			| object			|  <p>Objeto JSON</p>							|
| Usuario._id			| String			|  <p>Identificador de usuario, ignorable</p>							|
| Usuario.nombre			| String			|  <p>Nombre de Usuario</p>							|
| Usuario.email			| String			|  <p>Email de Usuario</p>							|
| Usuario.celular			| String			|  <p>Celular de Usuario</p>							|
| Usuario.password			| String			|  <p>Password del Usuario</p>							|


