import { faker } from "@faker-js/faker";


const generateproducts=()=>{
    return{
            id: faker.database.mongodbObjectId(),
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            thumbnail: faker.image.url(),
            code: faker.string.alphanumeric(10),
            stock: faker.string.numeric(1),
          }
    
      }

export default generateproducts