const Router = require('express');
const router = new Router();
const brandController = require('../controllers/brandController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole(2), brandController.create)
router.get('/', brandController.getAll)
router.delete('/:id', checkRole(2), brandController.delete)



module.exports = router