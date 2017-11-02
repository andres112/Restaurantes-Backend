//Se define la estructura que tendra un usuario
//con sus atributos, esto para definir la base de datos

/**
 * @apiDefine User
 * @apiParam {object} Usuario Objeto JSON
 * @apiParam {String} Usuario._id Identificador de usuario, ignorable
 * @apiParam {String} Usuario.nombre Nombre de Usuario
 * @apiParam {String} Usuario.email Email de Usuario
 * @apiParam {String} Usuario.celular Celular de Usuario
 * @apiParam {String} Usuario.password Password del Usuario
 */

export class User{
    _id?:string;
    nombre:string;
    email:string;
    celular:string;
    password:string;
}