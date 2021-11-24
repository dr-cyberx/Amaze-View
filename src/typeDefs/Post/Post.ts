import { gql } from "apollo-server-express";
import { DocumentNode } from "graphql";

export const Post = `

type PostPublisher{
   id: ID!
    firstName: String
    lastName: String
    userName: String
    gender: Gender
    age: Int
    phoneNumber: String
    email: String
}
   
   type Post{
      id: ID!
      postContent: String
      publisher: PostPublisher
   }
`;

export const CreatePost = `
   CreatePost(postContent: String!,publisher: String!): Post
`;
