import User from '../models/User.js'
import Product from '../models/Product.js'
import Data from '../data.js'


const seedData = async (req, res) =>{
    User.deleteMany();
    Product.deleteMany();

    const users = await User.insertMany(Data.users)
    const products = await Product.insertMany(Data.products)
    res.send({users, products});
}

export default seedData;