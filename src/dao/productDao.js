import Product from './models/productModel.js';

class ProductDao {
  // Crear un nuevo producto
  async addProduct(productData) {
    try {
      const newProduct = new Product(productData);
      await newProduct.save();
    } catch (error) {
      throw new Error('Error al agregar el producto');
    }
  }

  // Listar todos los productos
  async getProducts() {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      throw new Error('Error al obtener la lista de productos');
    }
  }

  // Obtener un producto por ID
  async getProductById(productId) {
    try {
      const product = await Product.findById(productId);
      if (product) {
        return product;
      } else {
        throw new Error('Producto no encontrado');
      }
    } catch (error) {
      throw new Error('Error al obtener el producto');
    }
  }

  // Actualizar un producto por ID
  async updateProduct(productId, updatedData) {
    try {
      await Product.findByIdAndUpdate(productId, updatedData);
    } catch (error) {
      throw new Error('Error al actualizar el producto');
    }
  }

  // Eliminar un producto por ID
  async deleteProduct(productId) {
    try {
      await Product.findByIdAndDelete(productId);
    } catch (error) {
      throw new Error('Error al eliminar el producto');
    }
  }
}

export default ProductDao;
