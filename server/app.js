if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}
const express = require("express")
const cors = require("cors")
const morgan = require('morgan');
const app = express()

const swaggerSpec = require('./swagger');

const PORT = process.env.PORT || 3001

const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes/routes');

app.use(cors())
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const swaggerDocs = require('swagger-ui-express');
app.use('/docs', swaggerDocs.serve, swaggerDocs.setup(swaggerSpec));

app.use(router);

app.use(errorHandler)

app.listen(PORT, () => console.log(`port ${PORT}`))