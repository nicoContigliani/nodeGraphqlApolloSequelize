const resolvers = async (nameModel, fileName) => {




    const imports = `import ${nameModel} from './${fileName}.model'; \n`
    const structureResolver = `
   
   export const ${fileName}Resolver = {
    Query: {
        ${nameModel}: async (_: any, { id }: any) => await ${nameModel}.findByPk(id),
        ${nameModel}s: async () => await ${nameModel}.findAll(),
    },
    Mutation: {
        // Define user mutations (create, update, delete)
    },
};
   
`
    const todoResolver = `${imports} ${structureResolver}`
    const fileNameAndExtentionResolver = `${fileName}.resolver.ts`;

    const resolvers = {
        todoResolver,
        fileNameAndExtentionResolver
    }
    return resolvers

}
module.exports = { resolvers }