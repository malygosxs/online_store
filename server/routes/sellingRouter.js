const Router = require('express');
const router = new Router();
const sellingController = require('../controllers/sellingController')
//const checkRole = require('../middleware/CheckRoleMiddleware')

router.post('/', sellingController.create)
router.get('/:id', sellingController.getAllbyUser)
router.get('/:id', sellingController.getAllbyProduct)
router.delete('/:id', sellingController.delete)



module.exports = router