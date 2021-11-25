export const getAllPost = `getAllPost(query:String):[getPostResponse]!`;

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
   type PostType{
      id: ID!
      postContent: String
      publisher: PostPublisher
   }
   type getPostResponse{
      id: ID!
      postContent: String
      publisher: PostPublisher
   }
   type Post{
      data : PostType
      error: Boolean!
      status: Int! 
   }
`;

export const CreatePost = `
   CreatePost(postContent: String!,publisher: String!): Post
   DeletePost(PostId:String!): Post
`;
