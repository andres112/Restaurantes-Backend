//Servicio Rest para la control de usuarios

//se importa tanto Con que es el singleton por defecto de db-connections
//y DBConnection que es el tipo de la clase que alla se maneja
import { Con, DBConnection } from './db-connection';
import { Collection } from 'mongodb';
//Se importa el tipo de la clase que se manejara en este servicio
import { User } from './common/user';

export class UserService {

    // se crea un metodo para definir la conexion a la coleccion users en la base de datos
    get db(): Collection<User> { //con Collection <User> se asegura que solo se retornen objetos de ese tipo
        return this.con.db.collection("users");
    }

    //constructor con parametro con acceso privado, lo cual lo convierte en atributo de la clase
    constructor(private con: DBConnection) { }

    // definicion de metodo para login acpeta emai y pass
    login(email: string, pass: string) {
        //retorna lo que encuntra en la base de datos pasando esos parametros
        return this.db.findOne({
            email: email,
            password: pass
        });
    }

    // definicion de metodo para signin acpeta objeto de tipo usuario
    signin(user: User) {
        // retorna lo que encuentre con el email de ese usuario
        return this.db.findOne({ email: user.email })
            .then(usr => {
                //pero antes si el usuario retornado es null inserta esos datos en la base de datos
                if (usr == null) {
                    return this.db.insertOne(user);
                }
                //sino retorna un mensaje diciendo que el usuario ya existe
                else {
                    return Promise.reject("Usuario ya existente");
                }
            });
    }

}

//crea singleton para este servicio user
export const userService = new UserService(Con);