// #########################################################################################################################
// #######################Creado por Nicolás Contigliani####################################################################
// ######################################################################################################################### 

//structure 
//Read folder model 
//if exist folder read file, if exist file not create 
//create folder nameModel  
//In that folder create file 
//---entities.model.ts
//---entities.resolvers.ts
//---entities.typeDefs.ts
const createFolderBase = 'src/entities/Todo/'

const resolversModule = require('../SIMON/resolver')
const modelsGenerators = require('../SIMON/model')

const fs = require('fs');
const path = require('path');
const { typeDef } = require('./typeDef');
const { createFolder } = require('./createFolder');
const { createFile } = require('./createFile');
const { createGraphql } = require('./createGraphql');
const { editFile, editFileResolvers } = require('./editFileResolvers');
const modelsDir = path.join(__dirname, "../models");

const dirBase = path.join(__dirname)
const graphQlFolders = path.join(__dirname, '../src/entities/Todo/graphql/')
const graphQlResolverFolders = path.join(__dirname, '../src/entities/Todo/graphql/resolvers/')
const graphQlTypeDefsFolders = path.join(__dirname, '../src/entities/Todo/graphql/typeDefs/')

const arrayFileName = []
fs.readdir(modelsDir, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    const dataCreateFileResolverEnty = `const resolvers = {\nQuery: {\n//...entityResolver.Query,\n},\nMutation: {\n//...entityResolver.Mutation,\n},\n};\nexport default resolvers;`
    const dataCreateFileTypeDefsEnty = `import { gql } from 'graphql-tag';\nconst typeDefs = gql\`\`;\nexport default typeDefs; `


    const todoArrayForFileGraph = [
        {
            todo: dataCreateFileResolverEnty,
            file: `resolvers.ts`,
            paths: graphQlResolverFolders
        },
        {
            todo: dataCreateFileTypeDefsEnty,
            file: `typeDefs.ts`,
            paths: graphQlTypeDefsFolders
        }

    ]

    const createGraphQLStructure = async () => {
        const todoAbouGraphQLFolder = await createFolder(graphQlFolders)
        const todoAboutResolverFolder = await createFolder(graphQlResolverFolders)
        const todoAbouTypeDefsFolder = await createFolder(graphQlTypeDefsFolders)
        const todoAboutModelFile = await createFile(todoArrayForFileGraph)
    }

    createGraphQLStructure()



    files.forEach(file => {
        if (file !== "index.js") {

            const filePath = path.join(modelsDir, file);
            const fileName = file.slice(0, -3); // Elimina los últimos 3 caracteres (".js")
            const pathBase = 'src/entities/Todo/';

            arrayFileName.push(fileName)


            // Obtener la ruta completa del directorio base
            const rutaCarpeta = path.join(__dirname, '..', pathBase, fileName);

            try {
                const todo = async () => {
                    const {
                        fileContent,
                        className,
                        interfaces,
                        classData,
                        sequelizeModel,
                        fileNameAndExtentionModel,
                        todoModel,
                        basicInterfaceStructure
                    } = await modelsGenerators.modelsGenerator(file)
                    const {
                        todoResolver,
                        fileNameAndExtentionResolver
                    } = await resolversModule.resolvers(className, fileName)
                    const {
                        typeEntityTodo,
                        typeQuerys,
                        typeMytation,
                        todoTypeDefs,
                        fileNameAndExtentionTypeDef
                    } = await typeDef(className, file, basicInterfaceStructure)

                    const todoArrayForFile = [
                        {
                            todo: todoModel,
                            file: fileNameAndExtentionModel,
                            paths: rutaCarpeta
                        },
                        {
                            todo: todoResolver,
                            file: fileNameAndExtentionResolver,
                            paths: rutaCarpeta
                        },
                        {
                            todo: todoTypeDefs,
                            file: fileNameAndExtentionTypeDef,
                            paths: rutaCarpeta
                        }
                    ]

                    const todoAboutModelFolder = await createFolder(rutaCarpeta)

                    const todoAboutModelFile = await createFile(todoArrayForFile)

                    const {
                        resolversFolder,
                        typeDefsFolder,
                        folderGeneralGraphql,
                        fileGraphqlPath,
                        fileResolverPath,
                        dataCreateFileResolverEnty
                    } = await createGraphql(file, fileName, rutaCarpeta)
                    const pathResolver = `../../entities/Todo/${fileName}/${fileName}.resolver.ts`
                    // const dataReturnResolverFileEdit = await editFileResolvers(pathResolver, fileName)


                }

                todo()




            } catch (error) {
                console.log("🚀 ~ fs.readdir ~ error:", error)

            }

        }
    })

    const createResolverFuntion = async () => {


        const dataReturnResolverFileEdit = await editFileResolvers(arrayFileName)


    }
    createResolverFuntion()

})

