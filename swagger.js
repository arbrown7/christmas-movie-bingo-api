const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Holiday Movie Ratings API',
      version: '1.0.0',
      description: 'An API for tracking Christmas movie plots and ratings'
    },
    servers: [
      {
        url: 'https://christmas-movie-bingo-api.onrender.com',
        //url: 'http://localhost:3000', //comment this out before committing
      },
    ],
  },
  apis: ['./routes/*.js', './models/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };