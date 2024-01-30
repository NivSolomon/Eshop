import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import {generateToken} from '../utils.js'

export const signUp = async (req, res) =>{
    const {name, email, password} = req.body;
    
    const newUser = new User({
        name: name,
        email: email,
        password: bcrypt.hashSync(password),
    });

    const user = await newUser.save();

    // we dont need the password!
    res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user),
    });
};

export const signIn = async (req, res) =>{
    const {password: passwordFromWebsite, email} = req.body;

    const user = await User.findOne({email: email});
    if(user){
        if(bcrypt.compareSync(passwordFromWebsite, user.password)){
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user),
            });
            return;
        }
    }
    res.status(401).send({message: "Invalid Password/User"});
}

export const getUserById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findById(id);
  
      if (user) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
      } else {
        res.status(404).send({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  };