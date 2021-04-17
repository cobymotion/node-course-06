
const axios = require('axios');

class Busquedas {

    historial=[];

    constructor(){        
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

}

module.exports = Busquedas;