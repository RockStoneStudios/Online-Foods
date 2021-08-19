const app = require('./services/PortConnect');
const DB = require('./services/DatabaseConnected');
const config = require('./config/index');

const Inithialize = async()=>{
    
   
  app.listen(config.PORT,()=>{
    console.log('Starting Port');
   });
}

Inithialize();