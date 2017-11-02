import { verify } from 'jsonwebtoken'; //verifica si un token es valido
import { Request, Response } from 'express';
import { config } from '../config/global';
import { resSuccess, resFail } from '../controllers/common/response-body';

export function verifyAuth(req: any, res: Response, next) {
    let token = req.get("Authorization");
    verify(token, config.secret, (err, data) => {
        if (err) resFail(res, 401, "Usuario no Autorizado");
        else{
            let payload:any = data; // se castea data que es tipo Object a tipo any
            req.id = payload.id; //obtiene el id de data
            next();
        }

    });
}