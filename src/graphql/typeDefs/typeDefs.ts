import { gql } from 'graphql-tag'; // Import gql for tagged template literals


// Import user-specific type definitions (assuming they're in a separate file)
import {typeDefs as userTypeDefs} from '../../user/user.typeDefs';


// Combine type definitions using template literals and conditional inclusion
const typeDefs = gql`
  ${userTypeDefs}
   `;

export default typeDefs; // Export the combined type definitions