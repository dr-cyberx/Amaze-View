export const getAllPost = "getAllPost(query:String):[getPostResponse]!";

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
      user:PostPublisher,
      commentContent: String
      id: String
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
   type likeResponse{
      message: String!,
      status: Int
   }
`;

export const CreatePost = `
   CreatePost(postContent: String!, location: String!): Post
   AddLike(postId: String!): likeResponse
   AddComments(postId: String!, commentContent:String!): likeResponse
   DeletePost(PostId:String!): Post
`;
