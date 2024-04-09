const typeDef = async (className, file, interfaceModel) => {

  // // export const typeDefs = 

  // `

  // type User {
  //    id: Int!
  //    name: String!
  //    email: String!
  //  }

  //  type Query {
  //    users: [User!]!
  //    user(id: Int!): User
  //  }

  //  type Mutation {
  //    createUser(name: String!, email: String!, password: String!): User
  //    updateUser(id: Int!, name: String!, email: String!): User
  //    deleteUser(id: Int!): Boolean
  //  }

  //  `

  const fileName = file.slice(0, -3); // Elimina los últimos 3 caracteres (".js")

  let typeEntity
  let typeQuery
  let Mutations
  let typeStructure

  const typeEntityFuntion = (modifiedFileName) => {
    try {


      let textToChange = ` export interface ${modifiedFileName}Attributes `;
      let pattern = new RegExp(textToChange.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'g');

      typeEntity = interfaces.replace(pattern, `type ${modifiedFileName}`);
      typeEntity = typeEntity.replace(/\n\s\s\s\s/g, '\n');
      typeEntity = typeEntity.replace(/,/g, "!")
      // typeEntity = typeEntity.replace(/([^,{}]*)(,|\n\s*})/g, (match, p1, p2) => `${p1}!${p2}`); // Add ! before the last , or \n }

      return typeEntity

    } catch (error) {
      console.log("🚀 ~ modelsGenerator ~ error:", error)
    }
  }
  const typeQueryFuntion = (modifiedFileNames, fileNames) => {

    try {
      typeQuery = `\ntype Query {\n${fileNames}s: [${modifiedFileNames}!]!\n${fileNames}(id: Int!): ${modifiedFileNames}\n}`
      return typeQuery
    } catch (error) {
      console.log("🚀 ~ modelsGenerator ~ error:", error)

    }
  }

  const typeMytationFuntion = (modifiedFileName, interfaces) => {
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
      return Mutations
    } catch (error) {
      console.log("🚀 ~ modelsGenerator ~ error:", error)

    }
  }


  const typeEntityTodo = typeEntityFuntion(className)

  const typeQuerys = typeQueryFuntion(className, fileName)

  const typeMytation = typeMytationFuntion(className, interfaceModel)

  const todoTypeDefs = `export const typeDefs = \`${typeEntityTodo}\n${typeQuerys}\n${typeMytation}\``

  const fileNameAndExtentionTypeDef = `${fileName}.typeDefs.ts`;


  typeStructure = {
    typeEntityTodo,
    typeQuerys,
    typeMytation,
    todoTypeDefs,
    fileNameAndExtentionTypeDef
  }

  return typeStructure

}
module.exports = {
  typeDef
}