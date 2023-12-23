import fs from "fs";

function idun(){
    let id = Math.random().toString(30).substring(2);
        return id;
}

class Product {
    constructor(title, description,price,thumbnail,code,stock){
        this.id=idun();
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.status=true;
    }
}


class ProductManager {
    constructor(){
        this.path = 'src/mockProducts/Products.Json';
        this.products = [];
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            if (!title || !description || !price || !thumbnail || !code || !stock) {
                return console.log("Error: Todos los campos son obligatorios");
            }
            if (fs.existsSync(this.path)) {
                    const data = await fs.promises.readFile(this.path, 'utf-8');
                    this.products = JSON.parse(data);
                    const existProduct = this.products.find(Product => Product.code === code);
                if (existProduct) {
                    return console.log("Error: El código ya existe");
                }
            }
                this.products.push(new Product(title, description, price, thumbnail, code, stock));
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
                console.log("Producto agregado con éxito");
        }   catch (error) {
                console.log(error);
            }
    }
 
    getProducts(){try {
        const productData = fs.readFileSync (this.path, 'utf-8');
        const productJs =  JSON.parse(productData);
            return productJs;
        }   catch (error) {
                return [];
            }
        
    }

    async getProductById(id){
        try {
            {
                const productData = fs.readFileSync (this.path, 'utf-8');
                const products=JSON.parse(productData);
                for (let i = 0; i < products.length; i++){
                    if (products[i].id === id){
                        return products[i];
                    }   
                }   
                console.log("Not found");
            }
        }   catch (error) {
            console.log(error);
            }
    }

    updateProduct = async (id, newValues) => {
        const products = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        const index = products.findIndex(product => product.id === id);
        if (index === -1) {
            return console.log("Not found");
        }
        Object.assign(products[index], newValues);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        console.log("Producto actualizado");
    }
    async deleteProduct(id){
        try {
            const productData = fs.readFileSync (this.path, 'utf-8');
            const productList =  JSON.parse(productData);
            const productIndex = productList.findIndex(prod => prod.id === id);
            if (productIndex === -1) {
                return console.log('no encontrado');
            }
            productList.splice(productIndex,1)
             fs.promises.writeFile(this.path, JSON.stringify(productList, null, 2))
                return console.log('producto borrado con exito');

        }   catch (error) {
            console.log(error);
            }
    }
}

export default ProductManager