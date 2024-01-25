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

export {getAllProducts, getProductById};