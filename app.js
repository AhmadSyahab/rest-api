const express = require('express')
const app = express();
const morgan = require('morgan')


const bodyParser = require('body-parser')
const User = require('./routers/users') 
 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', User);
app.use(morgan('dev'));



app.listen(3000);