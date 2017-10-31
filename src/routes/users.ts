
import { Router } from 'express';
//importa las variables agrupadas en index de la carpeta users
import { login, signin } from '../controllers/users/index';

//define constante para manejar las rutas
const users: Router = Router();

//se hacen las peticiones http en donde se asignas las rutas a seguir dentro del controlador
//se definen los paths para cada servicio web 
users.post("/login", login);
users.post("/signin", signin);
//hay que tener cuidado con el orden de las rutas ya que se ejecutan de arriba hacia abajo

export default users;
