const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()

const productRoutes = require('./routes/productRoutes')
const transactionRoutes = require('./routes/transactionRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')

app.use(cors())
app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/transactions', transactionRoutes)
app.use('/api/dashboard', dashboardRoutes)

app.get('/', (req, res) => {
  res.send('Welcome to the Lume Cashier API')
});

module.exports = app;
