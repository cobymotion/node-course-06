const fs = require('fs')
const archivo = './tokens.txt';

const getToken = async() => {

    if(!fs.existsSync(archivo)){
        console.log("No hay token");
        return null; 
    }

    const data = fs.readFileSync(archivo,{encoding:'utf-8'});     
    return data; 
}

module.exports = {
    getToken
}