'use strict';

const axios = require('axios');

async function getPeopleList( request, response)  {
  const config = {
    headers: { "x-api-key": `${process.env.FACT_KEY}` },
    method: 'get',
    baseURL: `https://rest.blackhistoryapi.io`,
    url: '/template/people'
  }
  
  const peopleListData = await axios(config);
  console.log(peopleListData.data);
  
  response.status(200).send(peopleListData.data);
}

module.exports = {
  getPeopleList: getPeopleList
};