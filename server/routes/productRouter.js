import express from 'express';
import getAllProducts from '../controllers/productController.js';

const productRouter = express.Router();
productRouter.get('/', getAllProducts);

export default productRouter;