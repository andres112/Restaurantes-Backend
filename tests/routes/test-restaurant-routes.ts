import * as mocha from 'mocha';//framework para hacer las pruebas describe after
import * as superTest from 'superTest';
import { SuperTest, Test } from 'supertest'; //clase superTest y Test
import * as chai from 'chai';//comparaciones o afirmaciones de forma mas humana should, eventually
import * as chaiAsPromised from 'chai-as-promised'; //Manejar los resultados como promesas

import app from '../../src/app'; //importa el app.ts
import { InsertBody, TableUpdateBody } from '../../src/controllers/restaurants/index';
import { User } from '../../src/services/common/user';

describe("Restaurant Route", function () {

    let request: SuperTest<Test>;

    let id: string;
    let usr: User = {
        nombre: "Andres",
        celular: "0123456789",
        email: "andres.dorado90@gmail.com",
        password: "12345"
    };

    before(function () {
        chai.should();
        chai.use(chaiAsPromised);
        request = superTest(app);
        //tener en cuenta con **superTest**, se le hacen modificaciones a la base de datos real
        //Por lo tanto se deben reestablecer sus datos al finalizar las pruebas
    });

    //Inician las pruebas

    it.skip("Signin new User", function () {

        return request.post("/api/v1/users/signin")
            .set("Content-Type", "application/json") //fijo el contenido de la cabecera de la peticion
            .send(usr) //envia un objeto en el body del requerimiento
            .expect(200)
            .should.eventually
            .property("body")
            .property("success").true;
    });

    it("Loging User", function () {
        return request.post("/api/v1/users/login")
        .set("Content-Type", "application/json") //fijo el contenido de la cabecera de la peticion
        .send({email:usr.email, password:usr.password}) //envia un objeto en el body del requerimiento
        .expect(200)
        .should.eventually
        .property("body")
        .property("success").true;
    });

    //it.skip me salta esas pruebas 
    //it.only se ejecuta solamente
    it("Get Empty Restaurants", function () { //solo se pueden utilizar fucntion y no lambdas
        return request.get("/api/v1/restaurants")
            .expect(200)
            .should.eventually //eventually retorna un objeto de tipo Response
            .property("body") //el cuerpo de lo que retorna 
            .property("data") //el dato de lo que retorna toda respuesta tiene tres partes success, data y error
            .to.deep.equal([]); //to.deep comparacion a profundidad y evita la igualdad exacta
    });

    it("Insert Restaurant", function () {
        let res1: InsertBody = {
            tablesNumber: 10,
            restaurant: {
                nombre: "Carantanta",
                contacto: "8123456",
                direccion: "parque carantanta",
                imagen: "http://",
                localizacion: {
                    type: "Point", //Point debe ser con P mayuscula
                    coordinates: [-76.601915, 2.452995]
                }
            }
        }
        return request.post("/api/v1/restaurants")
            .set("Content-Type", "application/json") //fijo el contenido de la cabecera de la peticion
            .send(res1) //envia un objeto en el body del requerimiento
            .expect(200)
            .should.eventually
            .property("body")
            .property("success").true; //evalua el campo succes de la respuesta que sea igual a true
    });

    it("Get all Restaurants", function () {
        return request.get("/api/v1/restaurants")
            .expect(200)
            .should.eventually
            .property("body")
            .property("data")
            .to.have.lengthOf(1);//El to.have no es necesario, solamente para que sea mas comprensible

    });

    it("Get all", function (done) { //al adicionar el done se maneja asincrono
        request.get("/api/v1/restaurants") //como se ejecuta el done() no se debe retornar nada
            .expect(200)
            .then(res => {
                id = res.body.data[0]._id;
                res.body.data.should.to.have.lengthOf(1);

                done();
            })
            .catch(err => done(err));

    });

    it("Get by Location", function () {
        return request.get("/api/v1/restaurants/point") //se agrega esta ruta, ya que fue definida en restaurant de route
            .query({ lat: 2.452403, lon: -76.598183, km: 1 })
            .expect(200)
            .should.eventually
            .property("body")
            .property("data")
            .to.have.lengthOf(1);
    });

    it("Get by Location Out", function () {
        return request.get("/api/v1/restaurants/point")
            .query({ lat: 2.441717, lon: -76.606712, km: 1 })
            .expect(200)
            .should.eventually
            .property("body")
            .property("data")
            .to.have.lengthOf(0);
    });

    it("Get Tables", function () {
        return request.get("/api/v1/restaurants/" + id + "/tables")
            .expect(200)
            .should.eventually
            .property("body")
            .property("data")
            .to.have.lengthOf(10);//como se definio arriba
    });

    it("Update Avaliable Table", function () {
        let body: TableUpdateBody = { table: 4, available: false };

        return request.put("/api/v1/restaurants/" + id + "/tables") //ingreso el id que ya se saco en Get all
            .set("Content-Type", "application/json")
            .send(body)
            .should.eventually
            .property("body")
            .property("success").true;
    });

    it("Get Available Tables", function () {
        return request.get("/api/v1/restaurants/" + id + "/tables/available") //ingreso el id que ya se saco en Get all
            .expect(200)
            .should.eventually
            .property("body")
            .property("data")
            .to.have.lengthOf(9);
    });
    it("Delete Restaurant", function () {
        return request.delete("/api/v1/restaurants/" + id)
            .expect(200)
            .should.eventually
            .property("body")
            .property("success").true;
    });

});