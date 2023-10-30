import express from 'express';
import ProductDao from '../dao/productDao.js'; // Importa el Dao de productos

const routerProductsMongo = express.Router();
const productDao = new ProductDao(); // Crea una instancia del Dao de productos

// Listar todos los productos
routerProductsMongo.get('/', async (req, res) => {
  try {
    const products = await productDao.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la lista de productos' });
  }
});

// Obtener un producto por ID
routerProductsMongo.get('/:pid', async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productDao.getProductById(pid);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

// Agregar un nuevo producto
routerProductsMongo.post('/', async (req, res) => {
  const productData = req.body;
  try {
    const newProduct = await productDao.addProduct(productData);
    res.json({ message: 'Producto agregado con éxito', product: newProduct });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto' });
  }
});

// Actualizar un producto por ID
routerProductsMongo.put('/:pid', async (req, res) => {
  const { pid } = req.params;
  const updatedData = req.body;
  try {
    const updatedProduct = await productDao.updateProduct(pid, updatedData);
    res.json({ message: 'Producto actualizado con éxito', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

// Eliminar un producto por ID
routerProductsMongo.delete('/:pid', async (req, res) => {
  const { pid } = req.params;
  try {
    const deletedProduct = await productDao.deleteProduct(pid);
    res.json({ message: 'Producto eliminado con éxito', product: deletedProduct });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

export default routerProductsMongo;
