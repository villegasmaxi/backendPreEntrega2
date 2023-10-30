//productModel.js

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  code: { type: Number, required: true, unique: true }, // Asegura que el código sea único
  status: { type: Boolean, default: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnail: { type: [String] }, // Un array de strings para las miniaturas
});

const Product = mongoose.model('Product', productSchema);

export default Product;
