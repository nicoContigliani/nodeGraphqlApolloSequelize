const fs = require('fs');
const path = require('path');

const createFile = async (todoArrayForFile) => {

    const todo = todoArrayForFile.map(item => {
        const filePath = path.join(item.paths, `${item.file}`);

         if (!fs.existsSync(filePath)) {
             fs.writeFile(filePath, item.todo, (err) => {
                 if (err) {
                     console.error('Error al crear el archivo:', err);
                     return;
                 }
                 console.log('Archivo creado con éxito en:', filePath);
             });
         } else {
             console.log('El archivo ya existe en:', filePath);
         }

    })





}

module.exports = {
    createFile
}