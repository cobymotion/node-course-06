const { leerInput, inquirerMenu, inquirerPause } = require('./helpers/inquirer');

const main = async() => {

    let opt = 0;

    do{
        const {opcion} = await inquirerMenu();  
        opt = opcion;    
        switch(opt){
            case 1: 
                console.log('Opcion 1');
            break; 
            case 2:
                console.log('Opcion 2');
            break;            
        }        

        if(opt!==0) await inquirerPause();

    }while(opt!=0);
}

main();