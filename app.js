
/*
    Our Main Module which drives all the modules
*/

const express = require('express');
const public = require('./publicHandler');
const admin = require('./adminHandler');
const adoption = require('./adoptionhandler');

const config = {
    port : 3000,
    projectName : 'Little Angels'
}

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public/`));

app.use('/', public);
app.use('/admin', admin);
app.use('/adoption', adoption);

app.listen(config.port, ()=>{
    console.log(`Listening ${config.projectName} at ${config.port}`)
})