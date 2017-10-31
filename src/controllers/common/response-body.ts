// Se hace uso de Express por lo cual se importan sus clases
// Response maneja la respuesta por parte del servidor
import { Response } from 'express';

// Clase que maneja la respuesta y el error del servidor mediante un generico
export class ResponseBody<T> { //deber ir el generico aqui para que en data no genere error
    constructor(public success: boolean,
        public data: T = null, // data de tipo generico, si inicializa en null para cuando la respuesta 
        public err: string = null) { }//no arroje nada
}

//respuestas por parte del servidor para no escribir todo esto en los otros archivos

export function resFail(res: Response,
    code: number,
    err: any) {
    res.status(code).send(new ResponseBody(false, null, err));
}

export function resSuccess<T>(res:Response,data:T = null){
    res.send(new ResponseBody(true, data));
}