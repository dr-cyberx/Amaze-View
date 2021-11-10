export const getAllUser = `getUser(query: String): [User]!`;

export const user = `type User {
    id: ID!
    firstName: String!
    lastName: String!
    userName: String!
    gender: Gender!
    age: Int!
    phoneNumber: String!
    email: String!
  }`;

export const EditUser = `
    input EditUser {
    firstName: String
    lastName: String
    userName: String
    gender: Gender
    age: Int
    phoneNumber: String
    email: String
  }
`;

export const createUser = `
    createUser(
    firstName: String!
    lastName: String!
    userName: String!
    gender: Gender!
    age: Int!
    phoneNumber: String!
    email: String!
  ): User!
`;

export const updateUser = `updateUser(id: ID!, data: EditUser): User!`;
