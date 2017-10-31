//Se define la estructura que tendra un plato dentro del restaurante
//con sus atributos, esto para definir la base de datos

export class RestaurantPlate { //una clase mixta entre Restaurante y platos 
    _id: string;               //define atributos que ya se definieron en el restaurante
    nombre: string;
    direccion: string;
}

export class Plate {
    _id: string;
    nombre: string;
    categoria: string;
    precio: number;
    porciones: number;
    imagen: string;
    ingredientes: string[];
    restaurante: RestaurantPlate;
}