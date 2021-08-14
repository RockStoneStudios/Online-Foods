const app = require('./services/PortConnect');
const DB = require('./services/DatabaseConnected');


const Inithialize = async()=>{
    
   
  app.listen(3000,()=>{
    console.log('Starting Port');
   });
}

Inithialize();