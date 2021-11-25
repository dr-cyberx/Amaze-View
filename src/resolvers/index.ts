import { user_Mutation_Operations } from "./user/userMutations";
import { PostMutation } from "./Post/PostMutation";
import { user_Query } from "./user/userQuery";
import { Post_Query } from "./Post/PostQuery";

const resolvers = {
  Query: {
    ...user_Query,
    ...Post_Query,
  },

  Mutation: {
    ...user_Mutation_Operations,
    ...PostMutation,
  },
};

export default resolvers;
