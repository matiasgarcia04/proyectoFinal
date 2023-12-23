import fs from "fs";

function idun(){
    let id = Math.random().toString(30).substring(2);
        return id;
}



class cartManager{
    constructor(){
        this.path = 'src/mockProducts/Cart.Json';
    }
    async readfile(){
                try {
                    const dataCarts=await fs.promises.readFile(this.path,'utf-8')
                    return JSON.parse(dataCarts)
                } catch (error) {
                    return []
                }
            };
    async createcart(){
        try {
            const carts= await this.readfile();
            let newCart = {
                                id: idun(),
                                products: []
                            };
                            carts.push(newCart);
            await fs.promises.writeFile(this.path, JSON.stringify(carts,null,2),'utf-8');
            return newCart;
        } catch (error) {
            console.log(error);
        }
    }
    async getCartById(cid){
        try {
            const carts= await this.readfile();
            for (let i = 0; i < carts.length; i++){
                if (carts[i].id === cid){
                    return carts[i];
                }   
            } 
            console.log("Not found");
        } catch (error) {
            console.log(error);
        }
    }
 
    async addProduct(cid,pid){
        try {
            const carts = await this.readfile();
            const cartIndex = carts.findIndex(cart => cart.id === cid);
            if (cartIndex === -1) {
                return 'no existe';
            }
            const productIndex = carts[cartIndex].products.findIndex(product => product.id === pid);
            if (productIndex === -1) {
                carts[cartIndex].products.push({
                    "id": pid,
                    "quantity": 1
                });
            } else {
                carts[cartIndex].products[productIndex].quantity++;
            }
            await fs.promises.writeFile(this.path, JSON.stringify(carts,null,2),'utf-8');
            return 'producto agregado';
        } catch (error) {
            console.log(error);
            return 'error';
        }
    }
}

export default cartManager