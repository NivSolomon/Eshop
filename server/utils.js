import jwt from 'jsonwebtoken';

// our secret key locate in the .env file
// the token will be invalid in 7 days after generating him
export const generateToken = ({_id, name, email}) => {
    return jwt.sign({_id: _id, name: name, email: email}, process.env.JWT_PW, {expiresIn: '7d'});
}
