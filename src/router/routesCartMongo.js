import express from 'express';
import CartDao from "../dao/cartDao.js"
import Cart from "../dao/models/cartModel.js"

const routerCartMongo = express.Router();
const cartDao = new CartDao(); // Crear una instancia de CartDao


// Crear un nuevo carrito
routerCartMongo.post('/', async (req, res) => {
  const { userId } = req.body;
  try {
    const newCart = await cartDao.createCart(userId);
    res.json(newCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
});

// Traer un carrito por ID
routerCartMongo.get('/:cid', async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await Cart.findById(cid).populate('products.productId');
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
});

// Agregar un producto a un carrito
routerCartMongo.post('/:cid/productsMongo/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    await cartDao.addProductToCart(cid, pid, quantity);
    res.json({ message: 'Producto agregado al carrito con éxito' });
  } catch (error) {
    res.status(404).json({ error: 'Carrito o producto no encontrado' });
  }
});
// Actualiza carrito con un arreglo de productos
routerCartMongo.put('/:cid', async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;
  try {
    const cart = await Cart.findByIdAndUpdate(cid, { products }, { new: true }).populate('products.productId');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el carrito' });
  }
});


// Actualizar la cantidad de ejemplares de un producto en el carrito
routerCartMongo.put('/:cid/productsMongo/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    const cart = await Cart.findById(cid);
    if (!cart) {
      res.status(404).json({ error: 'Carrito no encontrado' });
      return;
    }

    const product = cart.products.find((item) => item.productId == pid);
    if (!product) {
      res.status(404).json({ error: 'Producto no encontrado en el carrito' });
      return;
    }

    product.quantity = quantity;
    await cart.save();
    res.json({ message: 'Cantidad de producto actualizada en el carrito con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la cantidad de producto en el carrito' });
  }
});

// Eliminar un producto del carrito
routerCartMongo.delete('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const cart = await Cart.findById(cid);
    if (!cart) {
      res.status(404).json({ error: 'Carrito no encontrado' });
      return;
    }

    const index = cart.products.findIndex((item) => item.productId == pid);

    if (index !== -1) {
      cart.products.splice(index, 1);
      await cart.save();
      res.json({ message: 'Producto eliminado del carrito con éxito' });
    } else {
      res.status(404).json({ error: 'Producto no encontrado en el carrito' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
  }
});





//elimina un producto de un carrito 
routerCartMongo.delete('/:cid/productsMongo/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  try {
     await cartDao.removeProductFromCart(cid, pid);
      res.json({ message: 'Producto eliminado del carrito con éxito' });
    } catch {
      res.status(404).json({ error: 'Carrito o producto no eliminado del carrito' });
    }
});

// Eliminar todos los productos del carrito
routerCartMongo.delete('/:cid', async (req, res) => {
  const { cid } = req.params;
  try {
    await Cart.findByIdAndUpdate(cid, { products: [] });
    res.json({ message: 'Productos eliminados del carrito con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar los productos del carrito' });
  }
});

export default routerCartMongo;
