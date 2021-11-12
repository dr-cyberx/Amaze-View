export const getAllUser = `getUser(query: String): [User]!`;

export const user = `type User {
    id: ID!
    firstName: String!
    lastName: String!
    userName: String!
    password: String!
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

export const registerUserResponse = `
  type registerUserResponse{
    data : User,
    token: String
  }
`;

export const RegisterUser = `
    RegisterUser(
    firstName: String!
    lastName: String!
    userName: String!
    gender: Gender!
    password:String!
    age: Int!
    phoneNumber: String!
    email: String!
  ): registerUserResponse!
`;

export const updateUser = `updateUser(id: ID!, data: EditUser): User!`;

export const Login = `Login(email: String, userName: String, password: String): loginOutput! `;
