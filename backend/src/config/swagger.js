import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'HFS Picadinhos API',
            version: '1.0.0',
            description: 'API do projeto HFS Picadinhos'
        },
        servers: [
            {
                url: 'http://localhost:3000'
            }
        ]
    },
    apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;