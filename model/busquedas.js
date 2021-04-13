
const axios = require('axios');
const { getToken } = require('../helpers/mytoken');

class Busquedas {

    historial=[];
    token = ''; 

    constructor(){        
    }

    async loadToken(){
        this.token = await getToken(); 
    }

    get paramsMapbox(){
        return {
            'access_token':this.token,
            'limit':5,
            'language':'es'
        };
    }
    

    async ciudad(lugar ='') {
        try{
            const axiosObj = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params:this.paramsMapbox
            });
            const resp = await axiosObj.get(); 
            console.log(resp.data);

        }catch(error){
            return [];  // Retornar ciudades 
        }
    } 

}

module.exports = Busquedas;