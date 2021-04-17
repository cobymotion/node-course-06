
const mostrarDatos = (data, weather) => 
{
    console.clear();
    console.log('\nInformación de la ciudad');
    console.log(`Ciudad: ${data.nombre}`);
    console.log(`Lat: ${data.lat}`);
    console.log(`Lng: ${data.lng}`);
    console.log(`Temperatura: ${weather.temp}`);
    console.log(`Minima: ${weather.min}`);
    console.log(`Maxima: ${weather.max}`);
    console.log(`Descripción: ${weather.desc}`);    
}

module.exports = {
    mostrarDatos
}