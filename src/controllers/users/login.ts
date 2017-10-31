import { userService } from '../../services/user-service';
import { ResponseBody } from '../common/response-body';
import { Request, Response } from 'express';

export interface LoginBody {
    email: string;
    password: string;
}

export function login(req: Request, res: Response, next) {
    let body: LoginBody = req.body;
    userService.login(body.email, body.password)
        .then(result => {
            if (result) res.send(new ResponseBody(true));
            else res.send(new ResponseBody(false));
        })
        .catch(err => res.status(500)
            .send(new ResponseBody(false, null, err)));
}