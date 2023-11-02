import { Router } from "express";
import cartsMongo from "./routesCartMongo.js"
import productsMongo from './routesProductMongo.js'

const router = Router();

router.use('/cartsMongo', cartsMongo);
router.use('/productsMongo', productsMongo);

router.use('/', (req, res) => {
    res.status(404).json({
      message: 'invalid api endpoint'
    })
})

export default router;