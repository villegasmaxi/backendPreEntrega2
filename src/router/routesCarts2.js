//continuacion de routesCart

// Obtener productos en un carrito
// routerCart.get('/:cid/products', (req, res) => {
//   const { cid } = req.params;
//   const products = cartManager.getProductsInCart(parseInt(cid));
//   res.json(products);
// });

// Eliminar un producto de un carrito
// routerCart.delete('/:cid/product/:pid', (req, res) => {
//   const { cid, pid } = req.params;
//   const success = cartManager.removeProductFromCart(parseInt(cid), parseInt(pid));
//   if (success) {
//     res.json({ message: 'Producto eliminado del carrito con éxito' });
//   } else {
//     res.status(404).json({ error: 'Carrito o producto no encontrado en el carrito' });
//   }
// });