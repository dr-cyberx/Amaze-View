import { gql } from "apollo-server-express";
import { DocumentNode } from "graphql";

const typeDefs: DocumentNode = gql`
  type Query {
    hello: String!
    getUser(query: String): [User]!
  }

  enum Gender {
    Male
    Female
    Others
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    userName: String!
    gender: Gender!
    age: Int!
    phoneNumber: String!
    email: String!
  }

  input EditUser {
    firstName: String
    lastName: String
    userName: String
    gender: Gender
    age: Int
    phoneNumber: String
    email: String
  }

  type Mutation {
    createUser(
      firstName: String!
      lastName: String!
      userName: String!
      gender: Gender!
      age: Int!
      phoneNumber: String!
      email: String!
    ): User!

    updateUser(id: ID!, data: EditUser): User!
  }
`;

export default typeDefs;
