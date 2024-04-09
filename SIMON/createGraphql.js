const createGraphql = async (file, fileName, rutaCarpeta) => {
    console.log("🚀 ~ createGraphql ~ rutaCarpeta:", rutaCarpeta)
    const resolversFolder = `resolvers`
    const typeDefsFolder = `typeDefs`
    const folderGeneralGraphql = `graphql`
    const fileGraphqlPath = `../../graphqls`
    const fileResolverPath = `../../entities/${fileName}/${fileName}.resolvers`
    const dataCreateFileResolverEnty = `const resolvers = {\nQuery: {\n//...entityResolver.Query,\n},\nMutation: {\n//...entityResolver.Mutation,\n},\n};\nexport default resolvers;`


    return {
        resolversFolder,
        typeDefsFolder,
        folderGeneralGraphql,
        fileGraphqlPath,
        fileResolverPath,
        dataCreateFileResolverEnty
    }
}

module.exports = {
    createGraphql
}