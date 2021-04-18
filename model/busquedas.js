const fs = require('fs');
const axios = require('axios');

class Busquedas {

    historial=[];
    dbPath = './db/database.json';

    constructor(){   
        this.leerDB();     
    }

    
    get paramsMapbox(){
        return {
            'access_token':process.env.MAPBOX_KEY,
            'limit':5,
            'language':'es'
        };
    }
    
    get paramsWeather(){
        return {
            appid:process.env.OPENWEATHER,            
            lang:'es',
            units:'metric'
        };
    }

    get historialCapitalizado() {
        return this.historial.map((nombre) => {
             return nombre.toLocaleUpperCase();
        });
    }

    async ciudad(lugar ='') {
        
        try{
            const axiosObj = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params:this.paramsMapbox
            });
            const resp = await axiosObj.get();                     
            return resp.data.features.map( lugar => ({
                id:lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            })); 

        }catch(error){
            return [];  // Retornar ciudades 
        }
    }
    
    async getWeatherByPlace(lat, lon)
    {
        try {
            const axiosObj = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsWeather, lat, lon }
            });
            const resp = await axiosObj.get(); 
            const {weather,main} = resp.data;                     
            return {
                desc:weather[0].description,
                min:main.temp_min,  
                max:main.temp_max,
                temp:main.temp                 
            }; 
        } catch (error) {
            console.log(error); 
        }
    }

    agregarHistorial(lugar = ''){
        if(this.historial.includes(lugar.toLocaleLowerCase())){
            return; 
        }
        this.historial.unshift(lugar.toLocaleLowerCase());
        this.guardarDB();
    }

    guardarDB() {
        const payload = {
            historial:this.historial
        }; 

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerDB() {
        if(!fs.existsSync(this.dbPath)){
            return null; 
        }
        const info = fs.readFileSync(this.dbPath,{encoding:'utf-8'}); 
        const data = JSON.parse(info);
        this.historial = data.historial;        
    }
}

module.exports = Busquedas;