const Router = require('express');
const router = new Router();
const purchaseController = require('../controllers/purchaseController')
//const checkRole = require('../middleware/CheckRoleMiddleware')

router.post('/', purchaseController.create)
router.get('/user/:userId', purchaseController.getAllbyUser)
router.get('/product/:productId', purchaseController.getAllbyProduct)
router.delete('/:id', purchaseController.delete)



module.exports = router