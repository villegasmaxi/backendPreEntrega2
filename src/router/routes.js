import  Router  from "express";
import cartsMongo from "./routesCartMongo.js"
import productsMongo from './routesProductMongo.js'
import views from "./views.routes.js";


const router = Router();
router.use('/views', views);
router.use('/cartsMongo', cartsMongo);
router.use('/productsMongo', productsMongo);
router.use('/', (req, res) => {
    res.status(404).json({
      message: 'invalid api endpoint'
    })
})


export default router;