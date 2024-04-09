const fs = require('fs');
const path = require('path');
const modelsDir = path.join(__dirname, "../models");
const pathBase = 'src/entities/Todo/'


const modelsGenerator = async (file) => {
    console.log("🚀 ~ modelsGenerator ~ nameFile:", file)

    let imports
    let interfaces
    let clases
    let clasesPart
    let inits
    let exports
    let todoModel
    let roles

    let typeEntity
    let typeQuery
    let Mutations




    const filePath = path.join(modelsDir, file);
    const fileName = file.slice(0, -3); // Elimina los últimos 3 caracteres (".js")


    const startFile = `import { Model, DataTypes } from 'sequelize';\n import sequelize from '../../../config/database';
    `
    const modifiedFileName = fileName.charAt(0).toUpperCase() + fileName.slice(1).toLowerCase();

    const endFile = `export default ${modifiedFileName}    ;`





    imports = startFile
    exports = endFile

    fs.readFile(filePath, 'utf8', (err, data) => {
        let role

        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        const classIndex = data.indexOf("class");
        if (classIndex !== -1) {
            const classEndIndex = data.indexOf("{", classIndex);
            if (classEndIndex !== -1) {
                const classDeclaration = data.slice(classIndex + 6, classEndIndex).trim();

                // Split classDeclaration by whitespace to get the model name
                const modelWords = classDeclaration.split(/\s+/);
                role = modelWords[0]

            }
        }
        // This is init
        const initIndex = data.indexOf("init");
        if (initIndex !== -1) {
            const initEndIndex = data.indexOf("});", initIndex);
            if (initEndIndex !== -1) {
                const initContent = data.slice(initIndex, initEndIndex + 3);

                // Use regular expression to extract elements inside init
                const elementsRegex = /init\(({.*})\);/s;
                const match = initContent.match(elementsRegex);
                if (match && match.length > 1) {
                    const elements = match[1];
                    let replacedElements = elements.replace(/DataTypes\.(STRING|DATE|BIGINT|BOOLEAN)/g, (match, type) => {
                        switch (type) {
                            case 'STRING':
                                return 'DataTypes.STRING';
                            case 'DATE':
                                return 'DataTypes.DATE';
                            case 'BIGINT':
                                return 'DataTypes.BIGINT';
                            case 'BOOLEAN':
                                return 'DataTypes.BOOLEAN';
                            default:
                                return match;
                        }
                    });

                    if (!replacedElements.includes("timestamps: false")) {
                        replacedElements = replacedElements.replace("sequelize", `sequelize,${'\n'}    timestamps: false ,${'\n'}    tableName:'${fileName}s'`);
                    }

                    const todoInit = `${role}.init(${replacedElements} )`
                    inits = todoInit

                    //interfaces 
                    const interfacesT = `export interface ${role}Attributes ${replacedElements}`

                }
            }
        }

        if (initIndex !== -1) {
            const initEndIndex = data.indexOf("});", initIndex);
            if (initEndIndex !== -1) {
                const initContent = data.slice(initIndex, initEndIndex + 3);

                // Use regular expression to extract elements inside init
                const elementsRegex = /init\(({.*})\);/s;
                const match = initContent.match(elementsRegex);
                if (match && match.length > 1) {
                    //This is inteface
                    const elements = match[1];
                    let replacedElements = elements.replace(/DataTypes\.(STRING|DATE|BIGINT|BOOLEAN)/g, (match, type) => {
                        switch (type) {
                            case 'STRING':
                                return 'string';
                            case 'DATE':
                                return 'Date';
                            case 'BIGINT':
                                return 'number';
                            case 'BOOLEAN':
                                return 'boolean';
                            default:
                                return match;
                        }
                    });

                    const roleDefinition = `, {\n    sequelize,\n    modelName: '${role}',\n  }`;
                    replacedElements = replacedElements.replace(roleDefinition, '');


                    const todoInterfaces = `\n export interface ${role}Attributes ${replacedElements}`

                    interfaces = todoInterfaces

                    let replacedElementsModels = elements.replace(/DataTypes\.(STRING|DATE|BIGINT|BOOLEAN)/g, (match, type) => {
                        switch (type) {
                            case 'STRING':
                                return 'string';
                            case 'DATE':
                                return 'date';
                            case 'BIGINT':
                                return 'number';
                            case 'BOOLEAN':
                                return 'boolean';
                            default:
                                return match;
                        }
                    });
                    replacedElementsModels = replacedElements.replace(roleDefinition, '');

                    const userObject = {};

                    // Assuming a specific format (replace with your actual format logic)
                    const parts = replacedElementsModels.split(',');

                    const dataReturnSentecnes = parts.map(item => {
                        return item.replace(/\n/g, '\npublic').replace(/:/g, '!:');
                    });



                    const dataReturnSentecness = dataReturnSentecnes.map(item => {
                        return item.split("\n");
                    })

                    const cleanedData = dataReturnSentecness.map(lines => {
                        const cleanedLines = lines.filter(line => line.trim() !== '');
                        const lastLine = cleanedLines.pop(); // Obtener y eliminar la última línea
                        const cleanedLastLine = lastLine.replace('public  }', '').trim().replace(/^\{|\s+$/g, '');
                        return [...cleanedLines, cleanedLastLine];
                    });

                    const si = cleanedData.map(item => item.filter(element => element !== "{" && element !== "}" && element !== ""));

                    const todos = si
                        .map(item => item.map(element => `\n${element}`)) // Agrega un salto de línea antes de cada elemento
                        .join(';');
                    clasesPart = `\n ${todos}`


                }
            }
        }





        if (data.includes("class")) {
            const classIndex = data.indexOf("class");
            if (classIndex !== -1) {
                const classEndIndex = data.indexOf("}", classIndex);
                if (classEndIndex !== -1) {
                    let classContent = data.slice(classIndex, classEndIndex + 1);

                    if (!classContent.includes("Model<")) {
                        classContent = classContent.replace("Model", `Model{ ${clasesPart}\n`);

                    }
                    if (!classContent.includes("Model<")) {
                        classContent = classContent.replace("Model", `Model<${role}Attributes> \n  `);
                    }

                    let modifiedDatas


                    let modifiedData = classContent.replace(/\/\*\*[\s\S]*?\*\//g, '') + ')';

                    let firstIndex = modifiedData.indexOf('models');
                    if (firstIndex !== -1) {
                        modifiedDatas = modifiedData.slice(0, firstIndex) + 'models:any' + modifiedData.slice(firstIndex + 'models'.length);
                    } else {
                        console.log("La palabra 'models' no se encontró en el string.");
                    }


                    const lastIndex = modifiedDatas.lastIndexOf('public');
                    let modifiedStr


                    if (lastIndex !== -1) {
                        // Encontrar el índice de la siguiente llave '{' después del último 'public'
                        const nextCurlyBraceIndex = modifiedDatas.indexOf('{', lastIndex);

                        if (nextCurlyBraceIndex !== -1) {
                            // Imprimir la posición de la siguiente llave '{'
                            let part1 = modifiedDatas.slice(0, nextCurlyBraceIndex);
                            let part2 = modifiedDatas.substring(nextCurlyBraceIndex + 1);

                            // Concatena las partes para obtener la cadena modificada sin el carácter en la posición 146
                            modifiedStr = part1 + part2 + '}';



                        } else {
                            console.log('No se encontró la llave "{" después del último "public".');
                        }
                    }

                    clases = modifiedStr

                    const pathBase = 'src/entities/Todo/';

                    // Obtener la ruta completa del directorio base
                    const rutaCarpeta = path.join(__dirname, '..', pathBase, fileName);

                    if (!fs.existsSync(rutaCarpeta)) {
                        fs.mkdirSync(rutaCarpeta, { recursive: true }, (error) => {
                            if (error) {
                                console.error('Error al crear la carpeta:', error);
                                return;
                            }
                            console.log('Carpeta creada exitosamente.');
                        });
                    }

                    const filePath = path.join(rutaCarpeta, `${fileName}.model.ts`);
                    const contenido = `${imports}\n ${interfaces}\n ${clases} }\n ${inits}\n ${exports}`;

                    if (!fs.existsSync(filePath)) {
                        fs.writeFile(filePath, contenido, (err) => {
                            if (err) {
                                console.error('Error al crear el archivo:', err);
                                return;
                            }
                            console.log('Archivo creado con éxito en:', filePath);
                        });
                    } else {
                        console.log('El archivo ya existe en:', filePath);
                    }


                    try {

                        const imports = `import ${modifiedFileName} from './${fileName}.model';\n`
                        const structureResolver = `\nexport const userResolver={\nQuery:{\n${fileName}: async (_: any, { id }: any) => await ${modifiedFileName}.findByPk(id),\n${fileName}s: async () => await ${modifiedFileName}.findAll(),\n},\nMutation:{\n// Define user mutations (create, update, delete)\n },\n};`
                        const todoResolver = `${imports}\n ${structureResolver}`


                        const filePathResolver = path.join(rutaCarpeta, `${fileName}.resolver.ts`);

                        if (!fs.existsSync(filePathResolver)) {
                            fs.writeFile(filePathResolver, todoResolver, (err) => {
                                if (err) {
                                    console.error('Error al crear el archivo:', err);
                                    return;
                                }
                                console.log('Archivo creado con éxito en:', filePath);
                            });
                        } else {
                            console.log('El archivo ya existe en:', filePath);
                        }



                    } catch (error) {

                    }

                    try {
                        try {
                            let textToChange = ` export interface ${modifiedFileName}Attributes `;
                            let pattern = new RegExp(textToChange.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'g');
                            typeEntity = interfaces.replace(pattern, `type ${modifiedFileName}`);

                            typeEntity = interfaces.replace(/,/g, "!");
                            typeEntity = interfaces.replace(/}/g, "!\n }");
                        } catch (error) {
                            console.log("🚀 ~ modelsGenerator ~ error:", error)
                        }

                        try {
                            typeQuery = `\ntype Query {\n${fileName}s: [${modifiedFileName}!]!\n${fileName}(id: Int!): ${modifiedFileName}\n}`
                        } catch (error) {
                            console.log("🚀 ~ modelsGenerator ~ error:", error)

                        }
                        try {


                            let textToChange = ` export interface ${modifiedFileName}Attributes `;
                            let pattern = new RegExp(textToChange.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'g');
                            const ttypeEntity = (interfaces.replace(pattern, '')).trim();



                            const ttypeEntityx = ttypeEntity.replace(/[{}]/g, '');

                            function replaceTypes(text) {
                                const replacements = {
                                    string: "String!",
                                    Date: "Date!",
                                    number: "Int!",
                                    boolean: "Boolean!",
                                };

                                const regex = new RegExp("\\b" + Object.keys(replacements).join("|") + "\\b", "g");
                                return text.replace(regex, match => replacements[match]);
                            }

                            // Example usage
                            const modifiedText = (replaceTypes(ttypeEntityx)).trim()

                            const codeWithoutSpaces = modifiedText.replace(/\n\s\s\s\s/g, '\n');

                            Mutations = `\ntype Mutation {\ncreate${modifiedFileName}(${codeWithoutSpaces}): ${modifiedFileName}\nupdate${modifiedFileName}(\nid: Int!,\n${codeWithoutSpaces}): ${modifiedFileName}\ndelete${modifiedFileName}(id: Int!): Boolean\n}`
                        } catch (error) {
                            console.log("🚀 ~ modelsGenerator ~ error:", error)

                        }
                        const todoTypeDefs =`export const typeDefs =${typeEntity}\n${typeQuery}\n${Mutations}`

                        const filePath = path.join(rutaCarpeta, `${fileName}.typeDefs.ts`);

                        if (!fs.existsSync(filePath)) {
                            fs.writeFile(filePath, todoTypeDefs, (err) => {
                                if (err) {
                                    console.error('Error al crear el archivo:', err);
                                    return;
                                }
                                console.log('Archivo creado con éxito en:', filePath);
                            });
                        } else {
                            console.log('El archivo ya existe en:', filePath);
                        }





                    } catch (error) {
                        console.log("🚀 ~ error:", error)

                    }




                }
            }
        }
        roles = role

    })








    return todoModel || "no";

}

module.exports = {
    modelsGenerator
}