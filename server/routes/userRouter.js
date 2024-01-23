import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import {signUp, signIn} from '../controllers/userController.js';

const userRouter = express.Router();

// expressAsyncHandler is a middleware function used to handle asynchronous errors in Express route handlers.
userRouter.post('/signin', expressAsyncHandler(signIn));
userRouter.post('/signup', expressAsyncHandler(signUp));

export default userRouter;