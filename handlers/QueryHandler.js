'use strict';

const { triggerAsyncId } = require('async_hooks');
const axios = require('axios');
const Fact = require('./models/factModel.js');

async function getQuery(request, response) {

  verifyUser(request, async (err, user) => {
    if (err) {
      response.send("invalid key")
    } else {
      try {
        const queryObject = await Fact.find({ tags: request.query.tags,  email: user.email})
        const config = {
          headers: { "x-api-key": `${process.env.FACT_KEY}` },
          method: 'get',
          baseURL: `https://rest.blackhistoryapi.io`,
          url: `'/fact?${queryObject}'`
        }
        const queryData = await axios(config);
        console.log(queryData.data);
        response.status(200).send(queryData.data);
      } catch (error) {
        console.error(error);
        response.status.send('Sorry. We could not find the tags and people');
      }
    }
  })

}

module.exports = {
  getQuery: getQuery
};