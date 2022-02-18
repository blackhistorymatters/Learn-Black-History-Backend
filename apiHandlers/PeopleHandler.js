'use strict';

const axios = require('axios');

async function getFactByPeople( request, response)  {
  const queryObject = request.query.people

  const config = {
    headers: { "x-api-key": `${process.env.FACT_KEY}` },
    method: 'get',
    baseURL: `https://rest.blackhistoryapi.io`,
    url: `/fact?people=${queryObject}`
  }
  
  const factData = await axios(config);
  console.log('PEOPLE DATA',factData.data);
  
  response.status(200).send(factData.data);
}

module.exports = {
  getFactByPeople: getFactByPeople
};