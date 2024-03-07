import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import {getAllProducts, getCategories, getProductById, getProductByToken, getProductsByQuery} from '../controllers/productController.js';

const productRouter = express.Router();
productRouter.get('/', expressAsyncHandler(getAllProducts));
productRouter.get('/categories', expressAsyncHandler(getCategories));
productRouter.get('/search', expressAsyncHandler(getProductsByQuery));
productRouter.get('/:id', expressAsyncHandler(getProductById));
productRouter.get('/token/:token', expressAsyncHandler(getProductByToken));

export default productRouter;