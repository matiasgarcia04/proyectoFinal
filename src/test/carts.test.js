import mongoose from "mongoose";
import configObjet from "../config/dotenv.js";
import supertest from "supertest";
import { expect } from 'chai';

const requester= supertest('http://localhost:8080')


mongoose.connect(configObjet.mongoURL)

describe('test general de apicarts',()=>{
    
    beforeEach(function(){
        this.timeout(5000)
    })

    // it('crea un carrito con exito',async function(){
    //     const result = await requester.post('/api/carts/').send()

    //     expect(result.ok).to.be.true
    //     expect(result.status).to.equal(201)
    // })

    // it('obtiene un carrito por su id',async function(){
    //     const cid= '66523ae3766e39829bc7e780'//id del carrito creado arriba

    //     const result= await requester.get(`/api/carts/${cid}`)
    //     expect(result.ok).to.be.true
    //     expect(result.status).to.equal(200)
    // })

    // it('agrega un producto al carrito',async function(){
    //     const cid = '66523ae3766e39829bc7e780'//id del carrito creado arriba
    //     const pid = '66272351daaa5e59ce5fcba3'
    //     const addprod= {
    //         quantity: 2
    //     }
    //     const result= await requester.post(`/api/carts/${cid}/products/${pid}`).send(addprod)
    //     expect(result.ok).to.be.true
    //     expect(result.status).to.equal(200)

    // })

    it('vacia el carrito',async function(){
        const cid = '66523ae3766e39829bc7e780'//id del carrito creado arriba
        const result= await requester.delete(`/api/carts/${cid}`)
        expect(result.ok).to.be.true
        expect(result.status).to.equal(200)

    })

})