import { JwtPayload, verify } from 'jsonwebtoken';
import User from '../db/schema/index';

export const isValidUser = async (token: any): Promise<boolean> => {
	try {
		if (token) {
			const resToken: string | JwtPayload = await verify(
				token,
				`${process.env.TOKEN_STRING}`
			);
			const isValidUser = await User.findById({
				_id: (<any>resToken).userId,
			});
			if (isValidUser.email || isValidUser.userName) {
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
};
