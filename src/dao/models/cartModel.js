//cartModel.js

import mongoose from 'mongoose';

// const cartSchema = new mongoose.Schema({
//   //userId: { type: String, required: true },
//   products: [{ productId: String, quantity: Number }],
// });

// const Cart = mongoose.model('Cart', cartSchema);

// export default Cart;

const cartSchema = new mongoose.Schema({
  //userId: { type: String, required: true },
  products: [{  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,}],
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;