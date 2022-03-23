const Router = require('express');
const router = new Router();
const productRouter = require('./productRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')
const sellingRouter = require('./sellingRouter')
const purchaseRouter = require('./purchaseRouter')


router.use('/brand', brandRouter);
router.use('/type', typeRouter);
router.use('/product', productRouter);
router.use('/user', userRouter);
router.use('/selling', sellingRouter);
router.use('/purchase', purchaseRouter);



module.exports = router