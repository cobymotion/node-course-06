require('dotenv').config();

const { leerInput, inquirerMenu, inquirerPause, listarLugares } = require('./helpers/inquirer');
const { mostrarDatos } = require('./helpers/mensajes');
const Busquedas = require('./model/busquedas');

const main = async() => {

    let opt = 0;

    const busqueda = new Busquedas(); 
   
    do{
        const {opcion} = await inquirerMenu();  
        opt = opcion;    
        switch(opt){
            case 1: 
                const filtro = await leerInput('Proporciona el lugar'); 
                const dataLugares = await busqueda.ciudad(filtro);
                const id = await listarLugares(dataLugares);   
                if(id!=='0'){             
                    const lugarSelected = dataLugares.find( lugar => lugar.id ==id);
                    busqueda.agregarHistorial(lugarSelected.nombre);                 
                    const weather = await busqueda.getWeatherByPlace(lugarSelected.lat, lugarSelected.lng);                
                    mostrarDatos(lugarSelected, weather);
                } else                 
                    console.log('Se cancelo la operación'.red);                
            break; 
            case 2:
                busqueda.historialCapitalizado.forEach((lugar, index)=>{
                    const idx = `${index + 1}`.blue; 
                    console.log(`${idx} ${lugar}`);
                });
            break;            
        }        

        if(opt!==0) await inquirerPause();

    }while(opt!=0);
}

main();