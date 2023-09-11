const express = require('express')
const router = express.Router()
const {obtenerInventory, addInventory, deleteInventory, findById, updateInventory} = require('../resources/inventory')

router.get('/inventory', async (req, res) => {
    const inventario = await obtenerInventory()
    // console.log(inventario);
    res.render ('inventory', {'title': 'Inventario', 'data':inventario})
})

router.get('/add', async(req, res) => {
    const inventario = await obtenerInventory()
    res.render('addInventory', {'title': 'Agregar inventario', 'data':inventario})
  })

router.post('/add', async(req,res)=>{
    const {id_product, name, price, number, description, brand} = req.body

    
  // Agregar el nuevo registro al objeto 'data'
    data = {
    id_product: id_product,
    name: name,
    price: Number(price),
    number: Number(number),
    description: description,
    brand: brand
  };

  console.log(data);
  const addInventario = await addInventory(data)

  
  res.redirect('/inventory')
})

router.get('/:id', async(req, res)=>{
  console.log('entro');
  const id_product = req.params.id;
  console.log(id_product);
  const inventario = await findById(id_product);
  console.log(inventario);
  res.render ('updateInventory', {'title': 'Actualizar', datos:inventario.findById})

})


router.get('/delete/:id', async(req, res) => {
    
    console.log('borrar');
          const id_product = req.params.id;
          console.log(id_product);
          
        const inventario = await deleteInventory(id_product) 
      res.redirect('/inventory')
  
  });

  router.post('/:id', async(req,res)=>{
    const id = req.params.id;
    console.log(id);
    const {id_product, name, price, number, description, brand} = req.body

    
  // Agregar el nuevo registro al objeto 'data'
    data = {
    id_product: id_product,
    name: name,
    price: Number(price),
    number: Number(number),
    description: description,
    brand: brand
  };

  console.log(data);
  const updateInventario = await updateInventory(id, data)

  
  res.redirect('/inventory')
})
  
module.exports = router