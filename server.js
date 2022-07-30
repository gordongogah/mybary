//checking connection  

if(process.env.NODE_ENV !=='production'){
    require('dotenv').config();
}
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index')

//set the view engine

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// setting layout 
app.set('layouts', '/layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

// setting up mongoose database

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', error=>console.error((error)))
db.once('open', ()=> console.log('Connected to Mongoose'))

app.use('/', indexRouter)

//setting server port to listen from
app.listen(process.env.PORT || 3000);