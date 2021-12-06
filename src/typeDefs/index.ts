import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';
import {
  user,
  EditUser,
  RegisterUser,
  updateUser,
  Login,
  getAllUser,
  registerUserResponse,
} from './users/users';
import { CreatePost, getAllPost, Post } from './Post/Post';

const typeDefs: DocumentNode = gql`
  type Query {
    hello: String!
    ${getAllUser}
    ${getAllPost}
  }

  enum Gender {
    Male
    Female
    Others
  }

  ${user}
  ${EditUser}
  ${registerUserResponse}
  ${Post}

  
  type loginOutput{message: String!, shouldLogin: Boolean!, token: String}
  type updateUserResponse{
    data: User
    message: String
  }

  type Mutation {
    ${RegisterUser}
    ${updateUser}
    ${Login}
    ${CreatePost}
  }
`;

export default typeDefs;
