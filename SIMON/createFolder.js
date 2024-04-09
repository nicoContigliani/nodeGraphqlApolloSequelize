const fs = require('fs');
const path = require('path');

const createFolder = async (rutaCarpeta) => {
    if ( !fs.existsSync(rutaCarpeta)) {
         fs.mkdirSync(rutaCarpeta, { recursive: true }, (error) => {
            if (error) {
                console.error('Error al crear la carpeta:', error);
                return;
            }
            console.log('Carpeta creada exitosamente.');
        });
    }
}

module.exports = {
    createFolder
}