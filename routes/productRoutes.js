const router = require('express').Router();
const controller = require('../controllers/productController');

router.get('/', controller.getAllProducts);
router.post('/', controller.addProduct);
router.put('/:id', controller.updateProduct);
router.delete('/:id', controller.deleteProduct);

module.exports = router;
