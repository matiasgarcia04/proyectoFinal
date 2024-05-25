import mongoose from "mongoose";
import configObjet from "../config/dotenv.js";
import { createHash, isValidPassword } from "../config/bcrypt.js";
import supertest from "supertest";
import { expect } from 'chai';

const requester= supertest('http://localhost:8080')


mongoose.connect(configObjet.mongoURL)

//chekeado---------------------------------------------------
describe('teting bcryp',()=>{
    it('debe devolver un pass hasheado',async function(){
        const password= '123456'

        const passhash = createHash(password)

        expect(passhash).to.not.equal(password)
    })
    it('test de isvalidpass',async function(){
        const password= "123456"

        const passhash = createHash(password);
        console.log(passhash)
        console.log(password)
        const isvalid= isValidPassword(password, passhash)

        expect(isvalid).to.be.true
        
    })
})

describe('test gral',()=>{

    describe('test avanzado de sesion', ()=>{
       
        it('debe poder registrar un usuario correctamente', async function(){
            let mockuser={
                first_name: "testingmock",
                last_name: "testingmock",
                email: "testingmock@testingmock.com",
                age: 33,
                password: "123456"
            }
            const result =await requester.post('/api/session/register').send(mockuser)

            expect(result.status).to.equal(302);
            
        })
        it('debe poder crear sesion', async function(){
            let mockuser={
                email:'testingmock@testingmock.com',
                password:'123456',
            }
            const result =await requester.post('/api/session/login').send(mockuser)


            expect(result).to.be.ok
            expect(result.status).to.equal(302);
           
        })

        it('logout', async function(){


            const result = await requester.post('/api/session/logout').send()

            expect(result.status).to.equal(302)
        })

    })

})