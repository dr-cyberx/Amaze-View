import { gql } from "apollo-server-express";
import { DocumentNode } from "graphql";
import {
  user,
  EditUser,
  createUser,
  updateUser,
  getAllUser,
} from "./users/users";

const typeDefs: DocumentNode = gql`
  type Query {
    hello: String!
    ${getAllUser}
  }

  enum Gender {
    Male
    Female
    Others
  }

  ${user}
  ${EditUser}

  type Mutation {
    ${createUser}
    ${updateUser}
  }
`;

export default typeDefs;
