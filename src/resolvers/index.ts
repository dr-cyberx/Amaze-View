import { user_Mutation_Operations } from "./user/userMutations";
import { PostMutation } from "./Post/PostMutation";
import { user_Query } from "./user/userQuery";

const resolvers = {
  Query: {
    ...user_Query,
  },

  Mutation: {
    ...user_Mutation_Operations,
    ...PostMutation,
  },
};

export default resolvers;
