const socket = io();



socket.emit('holaWebsocket')

socket.on('holaConsola',(payload)=>{
    console.log('hola desde front');
    console.log(`mensaje desde el server ${payload.message}`);
})

// Escucha eventos de WebSocket
socket.on('productsUpdated', (products) => {
    // Actualiza la lista de productos en la vista
    const productList = document.querySelector('#product-list');
    productList.innerHTML = '';
    products.forEach((product) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${product.title} - ${product.price}`;
        productList.appendChild(listItem);
    });
});

// crear un nuevo producto
const addProductForm = document.querySelector('#add-product-form');
addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(addProductForm);
    const newProductData = {
        title: formData.get('title'),
        description: formData.get('description'),
        price: parseFloat(formData.get('price')),
    };

    // Envía los datos al servidor a través de WebSocket
    socket.emit('createProduct', newProductData);
    addProductForm.reset(); // Limpia el formulario
});