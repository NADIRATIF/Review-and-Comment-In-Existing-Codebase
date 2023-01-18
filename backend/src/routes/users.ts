import { Router } from 'express';

import * as UserController from '../controllers/user.controller';

const router = Router();
const authJWT = require('../middlewares/authJWT');

router.post('/create', UserController.createUser);
router.post('/sign-in', UserController.login);
router.get('/get-all', authJWT, UserController.getAllUsers);
router.get('/get/:id', authJWT, UserController.getUser);
router.put('/update/:id', authJWT, UserController.updateUser);
router.delete('/delete/:id', authJWT, UserController.deleteUser);
router.get('/me', authJWT, UserController.getMyInformation);

export default router;
