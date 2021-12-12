/* eslint-disable no-mixed-spaces-and-tabs */
import { ApolloError } from 'apollo-server-core';
import { isValidUser } from '../../utils/isValidUser';
import User from '../../db/schema/index';
import Post from '../../db/schema/Post';

export const Post_Query = {
	getAllPost: async (
		_parent: any,
		{ offset, limit }: any,
		context: any
	): Promise<
    | {
        id: string;
        postContent: string;
        location: string;
        publisher: () => Promise<any>;
      }[]
    | undefined
  > => {
		try {
			if (context.token) {
				const isAuth: Promise<{ isValid: boolean; userId: any }> = isValidUser(
					context.token
				);
				try {
					if (await isAuth) {
						const res = await Post.find({})
							.skip(offset)
							.limit(limit)
							.sort([['updatedAt', -1]]);
						if (res) {
							const data: {
                id: any;
                postContent: any;
                likes: any;
                comments: () => Promise<any>;
                location: any;
                publisher: () => Promise<any>;
              }[] = await Promise.all(
              	res.map((item: any) => ({
              		id: item._id,
              		postContent: item.postContent,
              		likes: item.likes,
              		comments: async () =>
              			await item.comments.map((d: any) => ({
              				commentContent: d.commentContent,
              				user: async () => await User.findById({ _id: d.userId }),
              				id: d._id,
              			})),
              		location: item.location,
              		publisher: async () =>
              			await User.findById({ _id: item.publisher }),
              	}))
              );
							return data;
						}
					}
				} catch (error) {
					throw new ApolloError(
						'failed to get Posts',
						'findAll Post query failed'
					);
				}
			} else {
				throw new ApolloError('Access denied 1', 'getAllpost failed');
			}
		} catch (err) {
			throw new ApolloError('Access denied 1', 'getAllpost failed');
		}
	},
	getCommentsByPostId: async (
		_parents: any,
		args: any,
		context: any
	): Promise<
    | {
        status: number;
        message: string;
        comments: any;
      }
    | {
        status: number;
        message: ApolloError;
        comments: null;
      }
  > => {
		try {
			if (context.token) {
				const isAuth: Promise<{ isValid: boolean; userId: any }> = isValidUser(
					context.token
				);
				if (await isAuth) {
					const comments = await Post.findById({ _id: args.postId });

					if (comments.postContent) {
						const commentResp = await comments?.comments.map(
							(item: {
                userId: string;
                commentContent: string;
                _id: string;
              }) => ({
								user: async () => {
									const data = await User.findById({ _id: item.userId });
									const resUser = {
										id: data._id,
										firstName: data.firstName,
										lastName: data.lastName,
										userName: data.userName,
										gender: data.gender,
										age: data.age,
										phoneNumber: data.phoneNumber,
										email: data.email,
									};
									return resUser;
								},
								commentContent: item.commentContent,
								commentId: item._id,
							})
						);
						return {
							status: 200,
							message: 'fetched successfully',
							comments: commentResp,
						};
					} else {
						return {
							status: 401,
							message: new ApolloError('Post not found', 'invalid Post id'),
							comments: null,
						};
					}
				}
				return {
					status: 401,
					message: new ApolloError('Access Denied', 'unauthorized req'),
					comments: null,
				};
			} else {
				return {
					status: 401,
					message: new ApolloError('Access Denied', 'unauthorized req'),
					comments: null,
				};
			}
		} catch (err) {
			return {
				status: 401,
				message: new ApolloError('unknown error', `${err}`),
				comments: null,
			};
		}
	},
};
