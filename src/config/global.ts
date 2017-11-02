//documento genrico de configuracion donde van conexiones a bases de datos
//enlaces a servicios web externos
//consumo de apis de terceros

export const config = {
    database:{
        host:"mongodb://localhost",
        port:27017,
        database:"restauranteDB"
    },

    secret :'R35taurant35' //define clave para encriptar lo que va en el login
}