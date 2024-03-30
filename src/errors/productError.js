

const generateProductErrorInfo = (product) => {
    return `One or more properties where incomplete or not valid.
    List of require properties: 
        * title: nedds to be a String, recived ${product.title}
        * price: nedds to be a String, recived ${product.price}
        * stock: nedds to be a String, recived ${product.stock}   
    `
}

export default generateProductErrorInfo