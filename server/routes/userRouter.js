import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import {signUp, signIn} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/signin', expressAsyncHandler(signIn));
userRouter.post('/signup', expressAsyncHandler(signUp));

export default userRouter;