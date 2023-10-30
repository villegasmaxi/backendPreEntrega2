
import Cart from './models/cartModel.js';

class CartDao {
  async createCart(userId) {
    try {
      const newCart = new Cart({ products: [] }); // userId, era el primer parametro de new cart
      const createdCart = await newCart.save();
      return createdCart;
    } 
    catch (error) {
      throw new Error('Error al crear el carrito');
    }
  }

  async getCartById(cartId) {
    try {
      const cart = await Cart.findById(cartId);
      if (cart) {
        return cart;
      } else {
        throw new Error('Carrito no encontrado');
      }
    } 
    catch (error) {
      throw new Error('Error al obtener el carrito');
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        throw new Error('Carrito no encontrado');
      }

      const existingProduct = cart.products.find((item) => item.productId === productId);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }

      await cart.save();
      return cart;
    } catch (error) {
      throw new Error('Error al agregar producto al carrito');
    }
  }

  // faltan otros métodos, como eliminar productos del carrito, actualizar carrito, etc.
  //probando borrar producto de carrito
   //eliminar productos de un carrito. (todavis no lo usamos)

  async removeProductFromCart(cartId, productId) {
    const cart = await this.getCartById(cartId); //this. adelante de getcart

    if (!cart) {
      return false; // Error: Carrito no encontrado
    }

    const index = cart.products.findIndex((item) => item.product.id === productId);

    if (index !== -1) {
      // Elimina el producto del carrito
      cart.products.splice(index, 1);
      this.saveCarts();
      return true;
    }

    return false; // Error: Producto no encontrado en el carrito
  }
}

export default CartDao;
