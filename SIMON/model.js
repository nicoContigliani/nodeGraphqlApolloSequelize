const fs = require('fs');
const path = require('path');
const modelsDir = path.join(__dirname, "../models");
const pathBase = 'src/entities/Todo/'


const modelsGenerator = async (file) => {
    let basicInterfaceStructure
    const filePath = path.join(modelsDir, file);
    const fileName = file.slice(0, -3); // Remove ".js" extension


    const pathBase = 'src/entities/Todo/';

    // Obtener la ruta completa del directorio base
    const rutaCarpeta = path.join(__dirname, '..', pathBase, fileName);


    let modelStructure

    // Example parsing class name function
    const parseClassName = (content) => {
        // Implement your logic to extract class name from content
        return content.charAt(0).toUpperCase() + content.slice(1).toLowerCase();

    };

    // Example generating interfaces function
    const generateInterfaces = (content, className) => {
        let interfacesInit
        // Implement your logic to generate interfaces
        const initIndex = content.indexOf("init");
        if (initIndex !== -1) {
            const initEndIndex = content.indexOf("});", initIndex);
            if (initEndIndex !== -1) {
                const initContent = content.slice(initIndex, initEndIndex + 3);

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


                    interfacesInit = `${className}.init(${replacedElements} )`
                    //interfaces 
                    const interfacesT = `export interface ${className}Attributes ${replacedElements}`

                }
            }
        }
        return interfacesInit
    };

    const generateInterfaceModel = (content, className) => {

        const initIndex = content.indexOf("init");
        if (initIndex !== -1) {
            const initEndIndex = content.indexOf("});", initIndex);
            if (initEndIndex !== -1) {
                const initContent = content.slice(initIndex, initEndIndex + 3);

                //     // Use regular expression to extract elements inside init
                const elementsRegex = /init\(({.*})\);/s;
                const match = initContent.match(elementsRegex);
                if (match && match.length > 1) {
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

                    // La expresión regular para encontrar la parte específica que deseas reemplazar
                    let regex = new RegExp(`}, {[^]*modelName: '${className}',`);

                    // Realizar el reemplazo
                    let codeSnippet = replacedElements.replace(regex, '');
                    let textoModificado = codeSnippet.replace(/:/g, "?:");

                    basicInterfaceStructure = textoModificado
                    const interfacesT = `export interface ${className}Attributes ${basicInterfaceStructure}`


                    return interfacesT


                }
            }
        }






    }



    //class part 
    const dataClass = (content, className) => {
        let clasesPart
        let classReturn

        const initIndex = content.indexOf("init");


        if (initIndex !== -1) {
            const initEndIndex = content.indexOf("});", initIndex);
            if (initEndIndex !== -1) {
                const initContent = content.slice(initIndex, initEndIndex + 3);

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

                    const roleDefinition = `, {\n    sequelize,\n    modelName: '${className}',\n  }`;
                    replacedElements = replacedElements.replace(roleDefinition, '');


                    const todoInterfaces = `\n export interface ${className}Attributes ${replacedElements}`

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

        if (content.includes("class")) {

            const classIndexs = content.indexOf("class");

            if (classIndexs !== -1) {
                const classEndIndex = content.indexOf("}", classIndexs);
                if (classEndIndex !== -1) {
                    let classContent = content.slice(classIndexs, classEndIndex + 1);

                    if (!classContent.includes("Model<")) {
                        classContent = classContent.replace("Model", `Model{ ${clasesPart}\n`);

                    }
                    if (!classContent.includes("Model<")) {
                        classContent = classContent.replace("Model", `Model<${className}Attributes> \n  `);
                    }

                    let modifiedDatas


                    let modifiedData = classContent.replace(/\/\*\*[\s\S]*?\*\//g, '') + ')';

                    let firstIndex = modifiedData.indexOf('models');
                    if (firstIndex !== -1) {
                        modifiedDatas = modifiedData.slice(0, firstIndex) + 'models:any' + modifiedData.slice(firstIndex + 'models'.length);

                        modifiedDatas = modifiedDatas.replace(/\n\s\s\s\s\s\s/g, '\n');



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

                            classReturn = modifiedStr


                        } else {
                            console.log('No se encontró la llave "{" después del último "public".');
                        }
                    }
                }
            }
        }
        return classReturn
    }

    // Example generating Sequelize model function
    const generateSequelizeModel = (fileContent, className, fileName) => {
        // Implement your logic to generate Sequelize model

        const initIndex = fileContent.indexOf("init");
        if (initIndex !== -1) {
            const initEndIndex = fileContent.indexOf("});", initIndex);
            if (initEndIndex !== -1) {
                const initContent = fileContent.slice(initIndex, initEndIndex + 3);

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
                        replacedElementss = replacedElements.replace("sequelize", `sequelize,${'\n'}timestamps: false ,${'\n'}tableName:'${fileName}s'`);
                        replacedElements = replacedElementss.replace(/\n\s\s\s\s/g, '\n');

                    }

                    const todoInit = `${className}.init(${replacedElements} )`
                    inits = todoInit
                    return todoInit
                    //interfaces 
                    const interfacesT = `export interface ${className}Attributes ${replacedElements}`

                }
            }
        }



    };

    // Example writing to file function
    const writeToFile = (fileName, interfaces, sequelizeModel) => {
        // Implement your logic to write TypeScript files
    };



    try {
        try {
            //     // Read file contents
            const fileContent = fs.readFileSync(filePath, 'utf8');

            //     // Parse class declaration using parseClassName function
            const className = parseClassName(fileName);

            // Generate interfaces
            const interfaces = generateInterfaces(fileContent, className);

            //     // Generate Sequelize model

            const classData = dataClass(fileContent, className)


            const sequelizeModel = generateSequelizeModel(fileContent, className, fileName);


            const todoInterface = generateInterfaceModel(fileContent, className)


            const imports = `import { Model, DataTypes } from 'sequelize';\n import sequelize from '../,,/../../../../config/database';`
            const exports = `export default ${className};`

            const fileNameAndExtentionModel = `${fileName}.model.ts`

         

            const todoModel = `${imports}\n${todoInterface}\n${classData}}\n${sequelizeModel}\n${exports}`;

            modelStructure = {
                fileContent,
                className,
                interfaces,
                classData,
                sequelizeModel,
                fileNameAndExtentionModel,
                todoModel,
                basicInterfaceStructure

            }

            //     // Write TypeScript files
            //     writeToFile(fileName, interfaces, sequelizeModel);
        } catch (error) {
            //     console.error('Error generating models:', error);
        }
    } catch (error) {
        console.error('Error generating models:', error);
    }
    return modelStructure
}


module.exports = {
    modelsGenerator
}