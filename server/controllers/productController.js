import Product from '../models/Product.js'

const getAllProducts = async (req, res) =>{
    const products = await Product.find();
    res.send(products);
}

const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product was not found" });
    }
  };
const getProductByToken = async (req, res) => {

    const {token} = req.params;
    const product = await Product.findOne({token: token});
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product was not found" });
    }
  };

export {getAllProducts, getProductById, getProductByToken};