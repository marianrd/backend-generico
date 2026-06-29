const express = require('express')
const router = express.Router()
const platoController = require('../controllers/platoController')

router.get('/', platoController.getAll)
router.get('/buscar', platoController.buscar)
router.get('/categoria/:nombre', platoController.getByCategoria)
router.get('/precio/:min-:max', platoController.getByPrecio)
router.get('/:id', platoController.getById)
router.post('/', platoController.create)
router.put('/:id', platoController.update)
router.delete('/:id', platoController.remove)

module.exports = router