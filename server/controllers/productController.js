import User from '../models/User.js'
import Product from '../models/Product.js'
import Data from '../data.js'


const getAllProduct = async (req, res) =>{
    const products = await Product.find();
    res.send(products);
}

export default getAllProduct;