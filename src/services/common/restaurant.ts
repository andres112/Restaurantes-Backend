//Se define la estructura que tendra un restaurante
//con sus atributos, esto para definir la base de datos

export class Location { //Se define esta clase que manejara las coordenadas en un array
    type: string;
    coordinates: number[];
}

export class Table { //Se define la clase mesa
    numero: number;
    disponible: boolean;
}

export class Restaurant { //El restaurante con sus atributos
    _id?: string; //se coloca ? significa que son opcionales
    nombre: string;
    direccion: string;
    contacto: string;
    imagen: string;
    localizacion: Location; // la localizacion del restaurante
    mesas?: Table[]; // las mesas con sus respectivos atributos e identificacion
}