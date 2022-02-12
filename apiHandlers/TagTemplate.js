'use strict';

const axios = require('axios');

async function getTagList( request, response)  {
  const config = {
    headers: { "x-api-key": `${process.env.FACT_KEY}` },
    method: 'get',
    baseURL: `https://rest.blackhistoryapi.io`,
    url: '/template/tags'
  }
  
  const tagListData = await axios(config);
  console.log(tagListData.data);
  
  response.status(200).send(tagListData.data);
}

module.exports = {
  getTagList: getTagList
};