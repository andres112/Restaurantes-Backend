//controlador de User service para el metodo de login

//se realiza el import del singleton donde se accede al servicio de user
import { userService } from '../../services/user-service';
// import de la clase que maneja la respuesta por parte de express
import { ResponseBody } from '../common/response-body';
// clases para manejar la peticion y la respuesta a este servicio
import { Request, Response } from 'express';

//interfaz que maneja los datos necesarios para genrar el proceso de login
// esta interfaz se genera para definir los tipos de entrada deben ser string y solo email y password
export interface LoginBody {//el export en este caso es para las pruebas
    email: string;
    password: string;
} //con esta interfaz se castea el body del request

//se define la funcion de control de login
export function login(req: Request, res: Response, next) {
    let body: LoginBody = req.body; //body es lo que viene en la peticion Post por parte del cliente
    //Se utiliza el service de users .login
    userService.login(body.email, body.password)
        .then(result => {
            //el resultado trae del servicio que a su vez consulta la BD los datos del usuario 
            if (result) res.send(new ResponseBody(true));
            else res.send(new ResponseBody(false));
        })
        //se captura algun error por parte del servidor
        .catch(err => res.status(500)
            .send(new ResponseBody(false, null, err)));
}