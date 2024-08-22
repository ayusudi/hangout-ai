const swaggerJSDoc = require('swagger-jsdoc');

const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Hangout-AI Server',
            version: '1.0.0',
            description: 'API documentation for your Node.js application',
        },
        components: {
            securitySchemes: {
                Authorization: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'access_token',
                    value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAwMDEsImVtYWlsIjoibHV0aGZpYXJpZmluMDIyMkBnbWFpbC5jb20iLCJpYXQiOjE3MjQxNTg3Mzd9.u6t1zAOTrTS9hMnW3iLrOcNb2YePqr-_cAsDSoO3N-4'
                },
            },
        },
        security: [
            {
                Authorization: [],
            },
        ],
    },
    apis: ['./routes/*.js'],
});
module.exports = swaggerSpec;
