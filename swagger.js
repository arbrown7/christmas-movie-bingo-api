const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Holiday Movie Ratings API',
      version: '1.0.0',
      description: 'An API for tracking Christmas movie plots and ratings'
    }
  },
  apis: ['./routes/*.js', './models/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };