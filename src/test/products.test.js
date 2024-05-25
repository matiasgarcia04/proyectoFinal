import mongoose from "mongoose";
import configObjet from "../config/dotenv.js";
import supertest from "supertest";
import { expect } from 'chai';

const requester= supertest('http://localhost:8080')


mongoose.connect(configObjet.mongoURL)

describe('test general de productos',()=>{

    // it('debe poder obtener los productos', async function(){
    //     const result = await requester.get('/api/products/')
    //         expect(result.ok).to.be.true
    //         expect(result.status).to.equal(200)
    // })

    // it('debe crear un producto correctamente', async function(){
    //     let mockproduct=  {
    //         title: "prueba de supertest",
    //         description: "probando supertest",
    //         price: 10000,
    //         thumbnail: "nno hay",
    //         code: "prueba",
    //         stock: 100
    //       }
    //     const result= await requester.post('/api/products/').send(mockproduct)
        
    //     expect(result.ok).to.be.true
    //     expect(result.status).to.equal(201)


    // })

    it('debe borrar el producto elegido', async function(){
        const pid= '664c42267df743112489c2a8' //pid del mock

        const result= await requester.delete(`/api/products/${pid}`)

        expect(result.ok).to.be.true
        expect(result.status).to.equal(200)

    })


})