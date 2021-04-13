const { leerInput, inquirerMenu, inquirerPause } = require('./helpers/inquirer');
const Busquedas = require('./model/busquedas');

const main = async() => {

    let opt = 0;

    const busqueda = new Busquedas(); 
    busqueda.loadToken();
    

    do{
        const {opcion} = await inquirerMenu();  
        opt = opcion;    
        switch(opt){
            case 1: 
                const lugar = await leerInput('Proporciona el lugar'); 
                await busqueda.ciudad(lugar);

            break; 
            case 2:
                console.log('Opcion 2');
            break;            
        }        

        if(opt!==0) await inquirerPause();

    }while(opt!=0);
}

main();