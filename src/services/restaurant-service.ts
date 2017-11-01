import { Con, DBConnection } from './db-connection';
//importa ObjectID para manejar los datos que se envian a mongo para ser buscados 
// a traves de metodos de comparacion com delete o update
import { Collection, ObjectID } from 'mongodb';
//Se importan las dos clases de la estructura de restaurante
import { Restaurant, Table } from './common/restaurant';

class RestaurantService {

    private get db(): Collection<Restaurant> {
        return this.con.db.collection("restaurants")
    }

    constructor(private con: DBConnection) { }

    insert(res: Restaurant) {
        return this.db.insertOne(res);
    }

    insertWithTables(res: Restaurant, numbertables: number) {
        let tables: Table[] = []; //variable tables de tipo array de Table con atributos numero_id y dispon
        for (let i = 0; i < numbertables; i++) {
            tables.push({ numero: i + 1, disponible: true }) //ingresa todas las mesas al restaurante
        }
        res.mesas = tables; // se le adicionan al atributo tipo mesas del restaurante
        return this.db.insertOne(res); // se retorna el ingreso del restaurante con sus mesas a la BD
    }

    //Actualiza un restaurante
    update(id: string, res: Restaurant) {
        return this.db.updateOne({ _id: new ObjectID(id) },
            { $set: res });
    }

    //Elimina un restaurante
    delete(id: string) {
        return this.db.deleteOne({ _id: new ObjectID(id) })
    }

    //Define la paginacion para mostrar al usuario 
    //skip cantidad de elementos a no tener en cuenta iniciando desde el elemento 0
    //limit cantidad de elementos a mostrar en pantalla
    all(skip: number = 0, limit: number = 0) {
        return this.db.find()
            .skip(skip)
            .limit(limit)
            .toArray();
    }

    //metodo para consultar segun coordenadas y radio en km
    allByLocation(lon: number, lat: number, km: number = 1) {
        // retorna segun los parametros de localizacion de restaurantes
        return this.db.find({
            localizacion: {
                $geoWithin: {
                    $centerSphere: [[lon, lat], km / 6378.1]
                }
            }
        })
            .toArray();
    }

    //metodo para retornar las mesas por id de restaurante
    tablesByRestaurant(id: string) {
        return this.db.findOne({ _id: new ObjectID(id) })
            .then(res => {
                // retorna una promesa que es el manejo asincrono de una respuesta
                //si son muchos datos, el programa sigue funcionando mientras retorna el resultado
                return Promise.resolve(res.mesas);
            });
    }

    //metodo para retornar si la mesa esta disponible
    tablesByAvailable(id: string) {
        return this.db.aggregate([
            { $match: { _id: new ObjectID(id) } },
            { $project: { mesas: 1 } },
            { $unwind: "$mesas" },
            { $match: { "mesas.disponible": true } },
            { $group: { _id: "$_id", mesas: { $push: "$mesas" } } }
            //$group agrupa los resultados de las mesas disponibles en un nuevo documento
        ])
            .toArray()
            .then(res => {
                //retorna la primera mesa disponible
                return Promise.resolve(res[0].mesas)
            });
    }

    // Metodo para actualizar las mesas en su disponibilidad
    tableUpdate(id: string, table: number, available: boolean) {
        return this.db.updateOne({
            _id: new ObjectID(id),
            "mesas.numero": table
        },
            {
                $set: {
                    "mesas.$.disponible": available
                }
            });
    }

}

//Singleton de servicio de Restaurantes
export const restaurantService = new RestaurantService(Con);