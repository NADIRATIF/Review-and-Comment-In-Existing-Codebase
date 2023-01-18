import { Request, Response } from 'express';
import httpStatus from 'http-status';

const catchAsync = require('../utils/catchAsync');

import * as authService from '../services/auth.service';
import * as userRepository from '../repositories/user.repository';

export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await userRepository.getAllUsers();
  res.status(httpStatus.OK).send({ data: users });
});

export const getUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await userRepository.getUserById(id);
  res.status(httpStatus.OK).send({ data: post });
});

export const createUser = catchAsync(async (req: Request, res: Response) => {
  const { data } = req.body;
  const newUser = await userRepository.createUser(data);
  res.status(httpStatus.CREATED).send({ data: newUser });
});

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedUser = await userRepository.deleteUser(id);
  res.status(httpStatus.OK).send({ data: deletedUser });
});

export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data } = req.body;
  const updatedUser = await userRepository.updateUser(id, data);
  res.status(httpStatus.OK).send({ data: updatedUser });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { data } = req.body;
  try {
    const result = await authService.login(data);
    res.send(result);
  }
  catch (e) {
    res.status(httpStatus.NOT_FOUND).send({ message: e.message });
  }
});

export const getMyInformation = catchAsync(async (req: Request & {user: any}, res: Response) => {
  if (req.user) {
    res.status(httpStatus.OK).send({data: req.user._doc});
  }
  if (!req.user) {
    res.status(httpStatus.NOT_FOUND).send({message: 'Cannot find user information'});
  }
});

