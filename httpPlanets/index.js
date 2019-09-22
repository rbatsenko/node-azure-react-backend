const axios = require('axios');

module.exports = async function(context, req) {
  context.log('HTTP trigger function processed a request.');

  try {
    const response = await axios.get('https://swapi.co/api/planets/');
    const requestDate = new Date();
    const formattedDate = `${requestDate.getDate()}.${requestDate.getMonth()}.${requestDate.getFullYear()}@${requestDate.getHours()}:${requestDate.getMinutes()}:${requestDate.getSeconds()}:${requestDate.getMilliseconds()}`;
    context.log(`Fetched planets from SWAPI at ${formattedDate}`);
    context.res = {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        status: true,
        data: response.data.results,
      },
    };
  } catch (error) {
    context.log(error);
    context.res = {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        status: false,
        body: 'There was a server error. Please try again',
        error: error,
      },
    };
  }
};
