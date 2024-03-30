import generateproducts from "../utils/fakerProducts.js"
import generateProductErrorInfo from "../errors/productError.js"
import EErrors from "../errors/enum.js"
import CustomError from "../errors/customError.js"


class mockingctrl{

generate = async (req, res, next) => {
    try {
        let products = [];
        for (let i = 0; i < 100; i++) {
            const product = generateproducts();

            if (!product.title || !product.price || !product.stock) {
                CustomError.createError({
                    name: 'Error de creación de producto',
                    cause: generateProductErrorInfo(product),
                    message: 'Error al intentar crear el producto',
                    code: EErrors.INVALID_TYPE_ERROR,
                });
            }

            products.push(product);
        }

        res.send({
            status: 'success',
            payload: products,
        });
    } catch (error) {
        next(error);
    }
};


}


export default mockingctrl
