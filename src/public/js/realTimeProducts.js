const socket = io();

socket.on('server:productlist',(data)=>{
  console.log(data)

});

const form = document.querySelector('#formproducts');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.querySelector('#title').value;
  const description = document.querySelector('#description').value;
  const price = document.querySelector('#price').value;
  const thumbnail = document.querySelector('#thumbnail').value;
  const code = document.querySelector('#code').value;
  const stock = document.querySelector('#stock').value;
  const product = { title, description, price, thumbnail, code, stock };
  socket.emit('newProduct', product);


});

socket.on('server:render', async (data)=>{
  const { title, description, price, stock, code,_id } = data;
  let productslogs = document.querySelector('#products')
    let productString = `${title} - ${description} - ${price} - ${code} - ${stock}`
    if (!productslogs.innerHTML.includes(productString)) {
      productslogs.innerHTML += `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${description}</p>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Price: ${price}</li>
              <li class="list-group-item">Code: ${code}</li>
              <li class="list-group-item">Stock: ${stock}</li>
            </ul>
            <button type="button" id="${_id}" class="btn btn-danger" onclick="eliminarTarjeta(this)">Eliminar Tarjeta</button>
          </div>
        </div>
      `}


  console.log(data)
  
})


function eliminarTarjeta(button) {
 button.closest('.card').remove();
  const cardId = button.id;
  socket.emit('deleteProduct', cardId);

}

// -----------------------------------filesystem--------------------------
// socket.on('newProduct', data => {
//   let productslogs = document.querySelector('#products')
//   let product = data.products[data.products.length - 1]
//   let productString = `${product.title} - ${product.description} - ${product.price} - ${product.code} - ${product.stock}`
//   if (!productslogs.innerHTML.includes(productString)) {
//     productslogs.innerHTML += `
//       <div class="card">
//         <div class="card-body">
//           <h5 class="card-title">${product.title}</h5>
//           <p class="card-text">${product.description}</p>
//           <ul class="list-group list-group-flush">
//             <li class="list-group-item">Price: ${product.price}</li>
//             <li class="list-group-item">Code: ${product.code}</li>
//             <li class="list-group-item">Stock: ${product.stock}</li>
//           </ul>
//           <button type="button" id="${product.id}" class="btn btn-danger" onclick="eliminarTarjeta(this)">Eliminar Tarjeta</button>
//         </div>
//       </div>
//     `
//   }
//   console.log("los datos se están mostrando")
// })

// // agregar producto

// const form = document.querySelector('#formproducts');
// form.addEventListener('submit', (event) => {
//   event.preventDefault();
//   const id= Math.random().toString(30).substring(2);
//   const title = document.querySelector('#title').value;
//   const description = document.querySelector('#description').value;
//   const price = document.querySelector('#price').value;
//   const thumbnail = document.querySelector('#thumbnail').value;
//   const code = document.querySelector('#code').value;
//   const stock = document.querySelector('#stock').value;
//   const product = { id,title, description, price, thumbnail, code, stock };
//   socket.emit('newProduct', product);
// });

// // eliminar producto

// function eliminarTarjeta(button) {
//   button.closest('.card').remove();
//   const cardId = button.id;
//   socket.emit('deleteProduct', { id: cardId });
// }