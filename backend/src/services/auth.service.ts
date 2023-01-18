import httpStatus from 'http-status';

import { generateToken } from '../utils/jwtOperation';
import { ApiError } from '../utils/ApiError';

import { User } from '../models/User';
import { IUser } from '../resources/interfaces';

export const login = async (userData: Omit<IUser, 'id'>) => {
  const { username, password } = userData;
  const user = await User.findOne({username});
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isPasswordMatch = await user.isPasswordMatch(password);
  if (isPasswordMatch) {
    const token = await generateToken(user);
    return {token, user};
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'Wrong Password');
  }
};
