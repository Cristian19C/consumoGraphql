const express = require('express')
const router = express.Router()
const {obtenerInventory} = require('../resources/inventory')

router.get('/inventory', async (req, res) => {
    const inventario = await obtenerInventory()
    // console.log(inventario);
    res.render ('inventory', {'title': 'Inventario', 'data':inventario})
})

module.exports = router