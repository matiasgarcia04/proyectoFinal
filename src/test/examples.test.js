import mongoose from "mongoose";
import { userDB } from "../services/services";
import chai from "chai";
import configObjet from "../config/dotenv";
import { createHash, isValidPassword } from "../config/bcrypt";
import supertest from "supertest";
import { request } from "express";


const expect = chai.expect
const requester= supertest('http://localhost:8080')


mongoose.connect(configObjet.mongoURL)


describe('testing de user dao',()=>{
    before(function(){
        //instancia userdb
    })
    beforeEach(function(){
        this.timeout(5000)
    })

    it('dao trae los usuarios en formato arreglo',async function(){
        const result = await userDB.get()

        expect(result).to.be.deep.equal([])
        expect(Array.isArray(result)).to.be.ok
        expect(Array.isArray(result)).to.be.equal(true)
    })
    it('el dao debe agregar un susuario',async function(){
        let mockuser={
            fisrt_name: '',
            last_name:'',
            email:'',
            password:'33',
        }
        const result =await userDB.create(mockuser)

        // assert.ok(result._id)
        expect(result).to.have.property('_id')
        expect(result).to.have.property('first_name', '')
        expect(result).to.be.an('object')
    })
})

describe('teting bcryp',()=>{
    it('debe devolver un pass hasheado',async function(){
        const password= '123456'

        const passhash = createHash(password)

        expect(passhash).to.not.equal(password)
    })
    it('test de isvalidpass',async function(){
        const password= '123456'

        const passhash = createHash(password)
        const isvalid= isValidPassword({password:passhash},password)

        expect(isvalid).to.be.true
        
    })
})

describe('test gral',()=>{
    describe('test de pets',()=>{
        it('test de endpoint post  /api/pets debe crear amscota correctamente', async ()=>{
            const petmock={
                name:'pata',
                especie:'tiburon'
            }
            const result= await requester.post('/api/pets').send(petmock)
            const {statusCode, ok, _body}= (await requester.post('/api/pets')).send(petmock)

            expect(_body.payload).to.have.property('_id')//si crea un _id
            expect(_body.payload.adopted).to.be.false//sicrea la mascota con el campo adopted en false
            expect(_body.payload).to.have.property('adopted', false)//lo mismo que arriba, hace comparacion
        })
        it('test get/api/pets', async ()=>{
            const {statusCode, ok, _body}= await requester.get('/apip/pets')
            expect(ok).to.be.true
            expect(statusCode).to.be.equal('200')
        })

    })

    describe('test avanzado de sesion', ()=>{
        let cookie
        it('debe poder registrar un usuario correctamente', async function(){
            let mockuser={
                fisrt_name: '',
                last_name:'',
                email:'',
                password:'33',
            }
            const{_body}=await requester.post('/api/session/register').send(mockuser)
            expect(_body.payload).to.be.ok
        })
        it('debe poder crear sesion', async function(){
            let mockuser={
                email:'',
                password:'33',
            }
            const response =await requester.post('/api/session/login').send(mockuser)

            const coockieresult=response.headers['set-coockie'][0]

            expect(coockieresult).to.be.ok
            cookie={
                name:coockieresult.split('=')[0],
                value:coockieresult.split('=')[1]
            }



            expect(cookie.name).to.be.ok.and.equal('codercookie')
           
        })

        it('',async()=>{
            const {_body}=await requester.get('/api/session/current').set('coockie',['${coocke.name}=${coockie.user}'])
            expect(_body.payload.email).to.be.eql('email')
        })
    })

})

describe('Pruebas de la ruta /api/user/:uid', () => {
    it('debería obtener un usuario específico', async () => {
      const userId = '123'; // Cambia esto al ID del usuario que deseas obtener
      const response = await request(app).get(`/api/user/${userId}`);
  
      // Verificar que la respuesta sea exitosa (código 200)
      expect(response.status).to.equal(200);
  
      // Verificar que la respuesta contenga los datos esperados del usuario
      expect(response.body).to.have.property('name', 'John Doe');
    });
  });