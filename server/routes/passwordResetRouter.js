import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import {sendPasswordResetLink, resetPassword} from '../controllers/passwordResetController.js';

const passwordResetRouter = new express.Router();
passwordResetRouter.post("/", expressAsyncHandler(sendPasswordResetLink));
passwordResetRouter.post("/:userId/:token", expressAsyncHandler(resetPassword));

export default passwordResetRouter;