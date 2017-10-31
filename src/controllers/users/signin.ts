import { userService } from '../../services/user-service';
//Aqui se trae la clase User, ya que es necesario modificar valores en la BD
//mientras que en el login solo es consulta
import { User } from '../../services/common/user';
import { ResponseBody } from '../common/response-body';
import { Request, Response } from 'express';

export function signin(req: Request, res: Response, next) {
    let body: User = req.body;
    userService.signin(body)
        .then(result => res.send(new ResponseBody(true)))
        .catch(err => res.status(500)
            .send(new ResponseBody(false, null, err)));
}