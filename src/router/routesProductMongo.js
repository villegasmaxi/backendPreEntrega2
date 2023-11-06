import express from 'express';
import productDao from "../dao/productDao.js"
import Product from "../dao/models/productModel.js"

const routerProductsMongo = express.Router();


// Ruta para listar productos con filtros y paginación
routerProductsMongo.get('/', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    const skip = (page - 1) * limit;
    const filter = {};

    if (query) {
      filter.category = query; // Filtro por categoría
    }

    const sortOrder = sort === 'desc' ? -1 : 1;
    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);
    const products = await Product.find(filter)
      .sort({ price: sortOrder })
      .limit(parseInt(limit))
      .skip(skip);

    const result = {
      status: 'success',
      payload: products,
      totalPages,
      prevPage: page > 1 ? parseInt(page) - 1 : null,
      nextPage: page < totalPages ? parseInt(page) + 1 : null,
      page: parseInt(page),
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      prevLink: page > 1 ? `/productsMongo?limit=${limit}&page=${parseInt(page) - 1}&sort=${sort}&query=${query}` : null,
      nextLink: page < totalPages ? `/productsMongo?limit=${limit}&page=${parseInt(page) + 1}&sort=${sort}&query=${query}` : null,
    };

    res.json(result);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener la lista de productos' });
  }
});



//Listar todos los productos
// routerProductsMongo.get('/', async (req, res) => {
//   try {
//     const products = await productDao.getProducts();
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ error: 'Error al obtener la lista de productos' });
//   }
// });


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
