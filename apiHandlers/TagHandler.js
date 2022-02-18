'use strict';

const axios = require('axios');

async function getFactByTag( request, response)  {
  const queryObject = request.query.tags
  console.log('THIS IS THE REQUEST', request.config);
  
  const config = {
    headers: { "x-api-key": `${process.env.FACT_KEY}` },
    method: 'get',
    baseURL: `https://rest.blackhistoryapi.io`,
    url: `/fact?tags=${queryObject}`
  }
  
  const factData = await axios(config);
  console.log('FACT DATA',factData.data);
  console.log('REQUEST', queryObject);
  console.log ('URL', config.url);
  
  response.status(200).send(factData.data);
}

module.exports = {
  getFactByTag: getFactByTag
};