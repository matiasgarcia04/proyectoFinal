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