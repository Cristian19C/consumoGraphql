const axios = require('axios');


const url = 'http://localhost:3000/';


async function obtenerInventory() {
  try {
      const response = await axios.post(url, {
          query: "{inventories{_id, id_product,name, price, number, description, brand}}"
      },
          {
              headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
              }
          });

      //console.log(response.data.data)
      return response.data.data.inventories
  } catch (error) {
      // console.log(error);
  }
}

// async function findById(id_product) {
//     try {
//         const response = await axios.post(url+id_product, {
//             query: "{findById{id_product}}"
//         },
//             {
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Accept": "application/json"
//                 }
//             });
  
//         //console.log(response.data.data)
//         return response.data.data.inventories
//     } catch (error) {
//         // console.log(error);
//     }
// }
async function deleteInventory(id_product) {
    console.log(id_product);
    try {
        const response = await axios.post(
            url,
            {
                query:`mutation DeleteInventory($idProduct: String!) {
                    deleteInventory(id_product: $idProduct)
                  }`
                ,variables: {
                    
                "idProduct": id_product
                      
                }
            
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            }
        );

        const success = response.state === true;
        return success;
        // console.log(response.data);
       
    } catch (error) {

        console.error(error);
    }
}




async function addInventory(material) {
    try {
        const response = await axios.post(
            url,
            {
                query:`mutation CreateInventory($input: InventoryInput) {
                    createInventory(input: $input) {
                      id_product
                      name
                      price
                      number
                      description
                      brand
                    }
                  }` 
            ,variables: {
                "input": {
                    "brand": material.brand,
                    "description": material.description,
                    "id_product": material.id_product,
                    "name": material.name,
                    "number": material.number,
                    "price": material.price
                  }
                },
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            }
        );
        console.log(response.data);
        //console.log(country);
    } catch (error) {

        console.error(error);
    }
}



module.exports.obtenerInventory = obtenerInventory;
module.exports.addInventory = addInventory;
module.exports.deleteInventory = deleteInventory;

