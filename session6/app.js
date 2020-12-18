/*const chalk = require ('chalk');
console.log(chalk.blue('Nouran'))*/
//console.log(process.argv)
customers = []
const yargs = require('yargs')
yargs.command({
    command :'add',
    describe: 'add new Customer',
    builder :{
customerName :{
   
   demandOption:true,
      type: 'string'
},
customerJob :{
    
      type: 'string'
},
customerBalance :{
    
      type: 'number'
},
handler: function(argv){
    
    customers.push({
        customerName:argv.customerName,
        customerJob:argv.customerJob,
        customerBalance:argv.customerBalance


    })
}


    }

    })
    yargs.parse()
    console.log(customers)