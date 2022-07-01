const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()

// Routes
const blogRoutes = require('./routes/blog')
const authRoutes = require('./routes/auth')

// App
const app = express()

// Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

// Cors
if (process.env.NODE_ENV == 'development') {
    app.use(cors({
        origin: `${process.env.CLIENT_URL}`
    }));
}

// Routes Middleware
app.use('/api/', blogRoutes)
app.use('/api/', authRoutes)

// Port 
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

// Database
mongoose
  .connect(process.env.DATABASE_LOCAL, {})
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Database Error => ", err));