import { JwtPayload, verify } from 'jsonwebtoken';
import User from '../db/schema/index';

export const isValidUser = async (
	token: any
): Promise<{
  isValid: boolean;
  userId: any;
}> => {
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
				return { isValid: true, userId: (<any>resToken).userId };
			} else {
				return { isValid: false, userId: null };
			}
		} else {
			return { isValid: false, userId: null };
		}
	} catch (err) {
		return { isValid: false, userId: null };
	}
};
