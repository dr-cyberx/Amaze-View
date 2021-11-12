import { gql } from "apollo-server-express";
import { DocumentNode } from "graphql";
import {
  user,
  EditUser,
  RegisterUser,
  updateUser,
  Login,
  getAllUser,
  registerUserResponse,
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
  ${registerUserResponse}
  
  type loginOutput{message: String!, shouldLogin: Boolean!, token: String}

  type Mutation {
    ${RegisterUser}
    ${updateUser}
    ${Login}
  }
`;

export default typeDefs;
