const Router = require('express');
const router = new Router();
const sellingController = require('../controllers/sellingController')
//const checkRole = require('../middleware/CheckRoleMiddleware')

router.post('/', sellingController.create)
router.get('/user/:userId', sellingController.getAllbyUser)
router.get('/product/:productId', sellingController.getAllbyProduct)
router.delete('/:id', sellingController.delete)



module.exports = router