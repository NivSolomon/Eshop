import express from 'express';
import getAllProduct from '../controllers/productController.js';

const productRouter = express.Router();
productRouter.get('/', getAllProduct);

export default productRouter;