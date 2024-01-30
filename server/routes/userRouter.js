import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import {signUp, signIn, getUserById} from '../controllers/userController.js';

const userRouter = express.Router();

// expressAsyncHandler is a middleware function used to handle asynchronous errors in Express route handlers.
userRouter.post('/signin', expressAsyncHandler(signIn));
userRouter.post('/signup', expressAsyncHandler(signUp));
userRouter.get('/:id', expressAsyncHandler(getUserById));

export default userRouter;