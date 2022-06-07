const Router = require('express');
const router = new Router();
const productController = require('../controllers/productController')
const checkRole = require('../middleware/CheckRoleMiddleware')

router.post('/', checkRole(2), productController.create)
router.get('/', productController.getAll)
router.get('/:id', productController.getOne)
router.get('/prices/:productId', productController.getPrices)
router.get('/deals/:productId', productController.getDeals)
router.delete('/:id', checkRole(2), productController.delete)



module.exports = router