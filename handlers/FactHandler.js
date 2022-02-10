'use strict';

const axios = require('axios');

async function getFact( request, response)  {
  const config = {
    headers: { "x-api-key": `${process.env.FACT_KEY}` },
    method: 'get',
    baseURL: `https://rest.blackhistoryapi.io`,
    url: '/facts'
  }
  
  const factData = await axios(config);
  console.log(factData.data);
  
  response.status(200).send(factData.data);
}

module.exports = {
  getFact: getFact
};