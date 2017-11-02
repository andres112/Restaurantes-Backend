import * as socketIo from 'socket.io';
import { Server } from 'http'

//se requiere inicializar el servidor
export class TableIoService {

    tables: SocketIO.Namespace; //namespace es la ruta del path

    init(server: Server) { //inicia el servidor
        let io = socketIo(server); //le asigno a io la inicializacion de un servidor de sockets

        this.tables = io.of("socket/tables"); //permite utilizar diferentes rutas de conexion socket
        //internas al servidor por paths

        //io.on("connection", (socket) => { //socket representaria un usuario
        this.tables.on("connection", (socket) => {

            socket.on("subscribe", (id) => {
                socket.join(id); //para que los clientes solo que se encuentran en la conexion socket
            });

            socket.on("unsubscribe", (id) => {
                socket.leave(id);
            });

            // setInterval(() => {
            //     available.to("mesas") //si esta dispobible en mesas envia 
            //         .emit("disponibilidad",
            //         { mesa: 2, disponibilidad: true })
            // }, 1000);

            // socket.emit("saludo", { hola: "Hola, como estas?" }) //nombre del evento, mensaje que se desea enviar
            // socket.on("mensaje", (data) => { //lo que le envia el cliente con el id mensaje
            //     console.log(JSON.stringify(data));
            // });
        });

        // setInterval(()=>{
        //     io.emit("molestar", {msg:"Hola, conteste!"})
        // }, 1000); // emite un mensaje al cliente cada segundo
    }

    changeAvailable(id: string, table: number, available: boolean) {
        this.tables.to(id)
            .emit("available",
            { mesa: table, dispobible: available });
    }
}

export const tableIO = new TableIoService();