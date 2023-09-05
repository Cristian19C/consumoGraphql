const axios = require('axios');


const url = 'http://localhost:3000/';


async function obtenerInventory() {
  try {
      const response = await axios.post(url, {
          query: "{inventories{id_product,name, price, number, description, brand}}"
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


module.exports.obtenerInventory = obtenerInventory;

