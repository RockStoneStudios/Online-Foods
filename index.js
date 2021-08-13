const express = require('express');
const app = express();
const {AdminRouter,VandorRouter} = require('./routes/index');
const mongoose = require('mongoose');
const DB = require('./config/index');

//Middlewares

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use('/admin',AdminRouter);
app.use('/vandor',VandorRouter);



mongoose.connect(DB.DB,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true
}).then(()=>{
    console.log('Connected Database Succesfull');
}).catch(error=>{
    console.error(error);
});
//Port
app.listen(3000,()=>{
    console.log('Starting Port . . .');
});