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
      location: String
      likes:  [String]!
      comments: [String]!
      publisher: PostPublisher
   }
   type commentResponse{
      id:String,
      commentContent: String
   }
   type getPostResponse{
      id: ID!
      postContent: String
      likes:  [String]!
      comments: [commentResponse]!
      location: String
      publisher: PostPublisher
   }

   type Post{
      data : PostType
      error: Boolean!
      status: Int! 
   }
`;

export const CreatePost = `
   CreatePost(postContent: String!, location: String!,publisher: String!): Post
   AddLike(postId: String!, userId:String!): String
   AddComment(postId: String!, userId:String!, commentContent:String!): String
   DeletePost(PostId:String!): Post
`;
