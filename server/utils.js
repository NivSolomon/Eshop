import jwt from 'jsonwebtoken';

// our secret key locate in the .env file
export const generateToken = ({_id, name, email}) => {
    return jwt.sign({_id: _id, name: name, email: email}, process.env.JWT_PW, {expiresIn: '7d'});
}