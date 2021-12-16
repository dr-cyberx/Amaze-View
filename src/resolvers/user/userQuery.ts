import { isValidUser } from '../../utils/isValidUser';
import User from '../../db/schema/index';

export const user_Query = {
	hello() {
		return 'hello world';
	},
	getUser: async (_parents: any, args: any): Promise<any[] | undefined> => {
		try {
			const users = await User.find({});
			return users;
		} catch (error) {
			console.log(error);
		}
	},
	isUserAuth: async (
		_parent: any,
		args: any,
		context: any
	): Promise<boolean> => {
		try {
			if (context.token) {
				const { isValid } = await isValidUser(context.token);
				console.log('isvalid =>>> ', isValid);
				if (isValid) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		} catch (err) {
			return false;
		}
	},
};
