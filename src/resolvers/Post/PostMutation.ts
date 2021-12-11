import { JwtPayload, verify } from 'jsonwebtoken';
import { ApolloError } from 'apollo-server-errors';
import { isValidUser } from '../../utils/isValidUser';
import Post from '../../db/schema/Post';
import User from '../../db/schema/index';

export const PostMutation = {
	CreatePost: async (
		_parent: any,
		args: any,
		context: any
	): Promise<{
    data: unknown;
    error: boolean;
    status: number;
  }> => {
		try {
			if (context.token) {
				const resToken: string | JwtPayload = verify(
					context.token,
					`${process.env.TOKEN_STRING}`
				);

				const id = (<any>resToken).userId;

				try {
					const newPost = await new Post({
						...args,
						publisher: id,
					}).save();

					await User.findByIdAndUpdate(
						{ _id: id },
						{ $push: { posts: newPost._id } }
					);
					const user = await User.findById({ _id: id });

					const { location, likes, comments, postContent } = newPost;
					return {
						data: {
							id: newPost._id,
							location,
							likes,
							comments,
							postContent,
							publisher: user,
						},
						error: false,
						status: 200,
					};
				} catch (error) {
					return {
						data: error,
						error: true,
						status: 401,
					};
				}
			} else {
				throw new ApolloError('Access Denied', 'authentication failed');
			}
		} catch (error) {
			return {
				data: error,
				error: true,
				status: 401,
			};
		}
	},

	DeletePost: async (
		_parent: any,
		args: any,
		context: any,
	): Promise<
    | {
        data: unknown;
        error: boolean;
        status: number;
      }
    | undefined
  > => {
		try {
			if(context.token){
				const {isValid} = await isValidUser(context.token);
				if(isValid){
					const PostId = args?.PostId;
					const post = await Post.findById({ _id: PostId });
					if (post) {
						await Post.deleteOne({ _id: PostId });
						const userId = post.publisher;
						await User.findByIdAndUpdate(
							{ _id: userId },
							{ $pull: { posts: PostId } }
						);
						return {
							data: {
								id: post._id,
								postContent: post.postContent,
								publisher: async (): Promise<any> =>
									await User.findById({ _id: userId }),
							},
							error: false,
							status: 200,
						};
					}else{
						return {
							data: new ApolloError('Access Denied', 'unautharized attempt to delete'),
							error: true,
							status: 401,
						};
					}
				}else{
					return {
						data: new ApolloError('Access Denied', 'unautharized attempt to delete'),
						error: true,
						status: 401,
					};
				}
			}
			
		} catch (error) {
			return {
				data: error,
				error: true,
				status: 401,
			};
		}
	},

	AddLike: async (
		_parent: any,
		args: any,
		context: any
	): Promise<
    | {
        message: string;
        status: number;
      }
    | {
        message: ApolloError;
        status: number;
      }
  > => {
		const { postId } = args;

		try {
			if (context.token) {
				const { isValid, userId } = await isValidUser(context.token);
				if (await isValid) {

					await Post.findByIdAndUpdate(
						{ _id: postId },
						{ $push: { likes: userId } }
					);

					return {
						message: 'Like Added Successfully',
						status: 200,
					};
				}
				return {
					message: new ApolloError('inValid User', 'adding likes failed'),
					status: 404,
				};
			}
			return {
				message: new ApolloError('Access Denied', 'adding likes failed'),
				status: 404,
			};
		} catch (error) {
			return {
				message: new ApolloError('adding likes failed', `${error}`),
				status: 404,
			};
		}
	},

	AddComments: async (
		_parent: any,
		args: any,
		context: any
	): Promise<
    | {
        message: string;
        status: number;
      }
    | {
        message: ApolloError;
        status: number;
      }
  > => {
		const { postId, commentContent } = args;
		try {
			if (context.token) {
				const resToken: string | JwtPayload = verify(
					context.token,
					`${process.env.TOKEN_STRING}`
				);
				const isValidUser = await User.findById({
					_id: (<any>resToken).userId,
				});
				if (isValidUser.email || isValidUser.userName) {
					await Post.findByIdAndUpdate(
						{ _id: postId },
						{
							$push: {
								comments: { userId: (<any>resToken).userId, commentContent },
							},
						}
					);
					return {
						message: 'Comment Added Successfully',
						status: 200,
					};
				}
			}
			return {
				message: new ApolloError('Access Denied', 'adding Comment failed'),
				status: 404,
			};
		} catch (error) {
			return {
				message: new ApolloError('adding likes failed', `${error}`),
				status: 404,
			};
		}
	},
};
