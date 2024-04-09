// const fs = require('fs').promises; // Use fs.promises for cleaner async/await syntax
// const path = require('path');
// // const pathResolver = `../../entities/Todo/${element}/${element}.resolver.ts`
// const filePath = path.join(__dirname, `../src/entities/Todo/graphql/resolvers/resolvers.ts`);

// const editFileResolvers = async (arrayFileName) => {

//     const todos = `const resolvers`
//     const todoQuery = `Query: {`
//     const todoMutation = `Mutation: {`

//     let data

//     arrayFileName.forEach(async fileName => {
//         const imports = `import {${fileName}Resolver} from '../src/entities/Todo/${fileName}/${fileName}.resolvers'`
//         const queryTodo = ` ...${fileName}Resolver.Query,`
//         const mutationTodo = ` ...${fileName}Resolver.Mutation,`

//         try {
//             data = await fs.readFile(filePath, 'utf-8');
//             console.log("🚀 ~ data:", data)

//             //     // Add imports if not already present
//             if (!data.includes(imports)) {
//                 data = `\n${imports}\n${data}`;
//             }

//             //     //     // Add resolver methods to Query and Mutation if not already present

//                       data = data.replace(todoQuery, `${todoQuery}\n${queryTodo}`);
//                       data = data.replace(todoMutation, `${todoMutation}\n${mutationTodo}`);

//             //           fs.writeFile(filePath, data, 'utf-8');
//             //     //     console.log("si****", fileName)

//         } catch (err) {
//             //     //     console.error("Error reading or writing file:", err);
//         }


//     });


//     console.log("🚀 ~ data:", data)
// }

// module.exports = {
//     editFileResolvers
// }

const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, '../src/entities/Todo/graphql/resolvers/resolvers.ts');
const resolversBefore = `const resolvers = {`
const queryTodo = `Query: {`;
const mutationTodo = `Mutation: {`;

const editFileResolvers = async (arrayFileName) => {

    try {
        // Check if the file exists before reading
        await fs.access(filePath);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error(`File "${filePath}" does not exist.`);
            // Optionally handle the missing file (e.g., create it)
            return; // Exit the function if the file is missing
        } else {
            // Handle other errors
            throw err;
        }
    }




    let data = await fs.readFile(filePath, 'utf-8');

    arrayFileName.forEach(async (fileName) => {
        const imports = `import { ${fileName}Resolver } from \"../../${fileName}/${fileName}.resolver\" `



        try {

            if (!data.includes(imports)) {
                data = data.replace(resolversBefore, `\n${imports}\n\n${resolversBefore}`);
            }
            if (!data.includes(`${fileName}Resolver.Query,`)) {
                data = data.replace(queryTodo, `${queryTodo}\n...${fileName}Resolver.Query,`);
            }
            if (!data.includes(`${fileName}Resolver.Mutation`)) {
                data = data.replace(mutationTodo, `${mutationTodo}\n...${fileName}Resolver.Mutation,`);

            }



            //         await fs.writeFile(filePath, data, 'utf-8');
            //         console.log(`File ${fileName} updated successfully.`);
        } catch (err) {
            //         console.error(`Error updating file ${fileName}:`, err);
        }


        try {
            const dataReturn = await fs.writeFile(filePath, data, 'utf-8');
            //         console.log(`File ${fileName} updated successfully.`);

        } catch (error) {
            console.log("🚀 ~ arrayFileName.forEach ~ error:", error)

        }
    });
};

module.exports = {
    editFileResolvers
};