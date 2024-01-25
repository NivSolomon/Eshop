import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import {getAllProducts, getProductById} from '../controllers/productController.js';

const productRouter = express.Router();
productRouter.get('/', expressAsyncHandler(getAllProducts));
productRouter.get('/:id', expressAsyncHandler(getProductById));

export default productRouter;