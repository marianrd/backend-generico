const express = require('express')
const router = express.Router()
const productoController = require('../controllers/productoController')

router.get('/', productoController.getAll)
router.get('/filtrar', productoController.getByFilter)
router.get('/:codigo', productoController.getByCodigo)
router.post('/', productoController.create)
router.put('/:codigo', productoController.update)
router.delete('/:codigo', productoController.remove)


module.exports = router