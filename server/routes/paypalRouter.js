import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { createPayPalOrder } from '../controllers/paypalController.js';

const paypalRouter = express.Router();
paypalRouter.post('/create-paypal-order', expressAsyncHandler(createPayPalOrder));

export default paypalRouter;