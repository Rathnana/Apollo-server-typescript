import { gql } from "apollo-server";

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    createUser(email: String!, pass: String!): String!
  }
`;

export default typeDefs