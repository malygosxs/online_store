const Router = require('express');
const router = new Router();
const purchaseController = require('../controllers/purchaseController')
//const checkRole = require('../middleware/CheckRoleMiddleware')

router.post('/', purchaseController.create)
router.get('/:id', purchaseController.getAllbyUser)
router.get('/:id', purchaseController.getAllbyProduct)
router.delete('/:id', purchaseController.delete)



module.exports = router