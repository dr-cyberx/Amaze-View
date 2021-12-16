import { ApolloError } from 'apollo-server-core';
import jwt from 'jsonwebtoken';


import User from '../../db/schema/index';

export const user_Mutation_Operations = {
	RegisterUser: async (
		_parents: any,
		args: any
	): Promise<{
    data: any;
    token: string;
    message: string;
  }> => {
		try {
			const res = await User.findOne({ userName: args.userName });
			if (res) {
				return {
					data: new ApolloError(
						'User already exist',
						'user registration failed'
					),
					token: '',
					message: 'User already exist',
				};
			}
			const user = await new User(args);
			user.save();

			const token = jwt.sign(
				{ userId: user._id },
				`${process.env.TOKEN_STRING}`
			);

			return { data: user, token, message: 'Register Successfully' };
		} catch (error) {
			console.log(error);
			return { data: null, token: '', message: 'failed to Register' };
		}
	},

	updateUser: async (
		_parents: any,
		args: any,
		context: any
	): Promise<
    | {
        data: any;
        message: string;
      }
    | undefined
  > => {
		try {
			if (context.token) {
				const { id, data } = args;
				try {
					const checkUser = await User.findById(id);
					if (checkUser) {
						await User.findByIdAndUpdate(id, data, { lean: true });
						const updatedUser = await User.findById(id);
						return {
							data: { id: updatedUser._doc._id, ...updatedUser._doc },
							message: 'User Updated Successfully',
						};
					}
				} catch (error) {
					throw new ApolloError('user not found!', 'PERSISTED_QUERY_NOT_FOUND');
				}
			} else {
				return {
					data: new ApolloError('validation failed!', 'User updation failed'),
					message: 'validation failed',
				};
			}
		} catch (error) {
			console.log(error);
			return {
				data: new ApolloError('validation failed!', 'User updation failed'),
				message: 'validation failed',
			};
		}
	},

	Login: async (
		_parents: any,
		args: any
	): Promise<{
    message: string;
    shouldLogin: boolean;
    token: string;
  }> => {
		const { email, userName, password } = args;

		if ((!email || !userName) && !password) {
			return {
				message: 'enter valid Login Creds',
				shouldLogin: false,
				token: '',
			};
		}

		const checkUser = email
			? await User.findOne({ email })
			: await User.findOne({ userName });

		console.log(checkUser);

		if (!checkUser) {
			return { message: 'user not found', shouldLogin: false, token: '' };
		}

		try {
			await checkUser.comparePassword(password);

			const token = await jwt.sign(
				{ userId: checkUser._id },
				`${process.env.TOKEN_STRING}`
			);

			return {
				message: 'logged in successfully',
				shouldLogin: true,
				token,
			};
		} catch (error) {
			return {
				message: 'enter valid Login Creds',
				shouldLogin: false,
				token: '',
			};
		}
	},

};
