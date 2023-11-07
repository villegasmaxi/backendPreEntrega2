// app.js

import express from "express";
import handlebars from "express-handlebars";
import http from "http";
import { Server as SocketIoServer } from "socket.io"; // Importo Server con alias

import router from "./router/routes.js";
import bodyParser from "body-parser";
import ProductDao from "./dao/productDao.js";

import __dirname from './utils.js';
import mongoose from "mongoose";

import Cart from "./dao/models/cartModel.js"

const app = express();
const port = 8080;
const server = http.createServer(app); //servidor HTTP

const mongoUrl= 'mongodb+srv://villegasmaxi:lola2508@cluster0.znvh4p2.mongodb.net/?retryWrites=true&w=majority'//mongoDB-connected Atlas
//MongoDB
mongoose.connect(mongoUrl, {dbName: 'ecommerce'})
.then(()=>{
  console.log('DB mongo connected')
  //server
  server.listen(port, () => {
    console.log(`Servidor arriba en puerto ${port}`);
  });
})
.catch(e =>{
  console.error('error connecting to DB mongo')
})



const io = new SocketIoServer(server);//websockets 

io.on("connection", (socket) => {
  console.log(" IO cliente conectado");
  console.log(" ID socket Server", socket.id );
  console.log(" ID Socket cliente", socket.client.id);
    // Consulta los productos desde la base de datos y emite la lista actualizada

  socket.on("updateProducts", async () => {
    console.log('Estoy en updateProducts back');
    const products = await ProductDao.getProducts();
    //console.log('products', products);
    socket.emit("productsUpdated", products); // Emite la lista de productos actualizada 
  });

  socket.on("holaWebsocket", () => {
    console.log("hola desde server");
    socket.emit("holaConsola", { message: "hola desde server para el front" });
  });

  socket.on('createProduct', async(newProductData)=>{
    const productData = await ProductDao.addProduct(newProductData);
    console.log(productData);
  })

});

//app.use(express.static( process.cwd() + "/public"));
app.use(express.static( __dirname + "/public"));



//Define una variable global para compartir datos con las vistas

//variable global a la bd mongoAtlas

app.use((req, res, next) => {
  res.locals.db = mongoose.connection;
  next();
});


//config handlebars
app.engine("handlebars", handlebars.engine());
//app.set("views", process.cwd() + "/views");
app.set('views', __dirname + '/views');
app.set("view engine", "handlebars");


// Ruta para la vista home
// app.get("/", (req, res) => {
//   res.render("home");
// });

// // Ruta para la vista en tiempo real
// app.get("/realtimeproducts", (req, res) => {
//   res.render("realTimeProducts");
// });

// app.get("/cartDetail", async (req, res) => {
//   try {
//     const allCarts = await Cart.find().lean().exec();
//     console.log(allCarts)
//     res.render("cartDetail", { carts: allCarts });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error al recuperar los carritos.");
//   }
// });




// app.get("/cartDetail", async (req, res) => {
//   const cartDetail = await Cart.find().lean().exec()
//   res.render("cartDetail", {cartDetail});
// });

// app.get("/productDetail", (req, res) => {
//   res.render("productDetail");
// });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use("/api", router);

server;
