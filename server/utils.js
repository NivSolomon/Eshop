import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

// our secret key locate in the .env file
// the token will be invalid in 7 days after generating him
export const generateToken = ({_id, name, email}) => {
    return jwt.sign({_id: _id, name: name, email: email}, process.env.JWT_PW, {expiresIn: '7d'});
}

export const isAuth = (req, res, next) => {
    const auth = req.headers.authorization;
    if(auth){
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_PW, (error, decode) => {
            if(error) res.status(401).send({message: error.message});
            else{
                req.user = decode;
                next();
            }
        })
    }
    else{
        res.status(401).send({message: "No Token"});
    }
}

export const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: 587,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};
