const axios = require('axios');

module.exports = async function(context, req) {
  context.log('HTTP trigger function processed a request.');

  try {
    if (context.req.method === 'GET') {
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
    } else if (context.req.method === 'POST') {
      if (context.req.body.wakeUp) {
        context.res = {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            status: true,
            data: { wakingUp: true },
          },
        };
      }
    }
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
