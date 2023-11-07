import express from "express"
import Cart from "../dao/models/cartModel.js"

const views = express.Router();
// Ruta para la vista home
views.get("/", (req, res) => {
    res.render("home");
  });
  
  // Ruta para la vista en tiempo real
  views.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts");
  });

  views.get("/productDetail", (req, res) => {
    res.render("productDetail");
  });
  
  views.get("/cartDetail", async (req, res) => {
    try {
      const allCarts = await Cart.find().lean().exec();
      console.log(allCarts)
      res.render("cartDetail", { carts: allCarts });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al recuperar los carritos.");
    }
  });
  // app.get("/cartDetail", async (req, res) => {
  //   const cartDetail = await Cart.find().lean().exec()
  //   res.render("cartDetail", {cartDetail});
  // });
  
 
  export default views;