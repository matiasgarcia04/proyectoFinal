
const socket = io();

socket.on('newProduct', data => {
  let productslogs = document.querySelector('#products')
  let product = data.products[data.products.length - 1]
  let productString = `${product.title} - ${product.description} - ${product.price} - ${product.code} - ${product.stock}`
  if (!productslogs.innerHTML.includes(productString)) {
    productslogs.innerHTML += `<li>${productString}</li>`
  }
  console.log("los datos se están mostrando")
})