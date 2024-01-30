import Token from "../models/token.js";
import { sendEmail } from "../utils.js";
import crypto from "crypto";
import Joi from "joi";
import User from "../models/User.js";
import bcrypt from 'bcryptjs'



const sendPasswordResetLink = async (req, res) => {
    try {
        const schema = Joi.object({ email: Joi.string().email().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).send("user with given email doesn't exist");

        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
        await sendEmail(user.email, "Password reset", link);

        res.send("password reset link sent to your email account");
    } catch (error) {
        res.send("An error occurred");
        console.log(error);
    }
}

const resetPassword = async (req, res) => {
    try {
        const schema = Joi.object({ password: Joi.string().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findById(req.params.userId);

        if (!user) return res.status(400).send("invalid link or expired");
        const token = await Token.findOneAndDelete({
            userId: user._id.toString(),
            token: req.params.token,
        });

        if (!token) return res.status(400).send("Invalid link or expired");
        user.password = bcrypt.hashSync(req.body.password);
        await user.save();
        // await token.remove(); // happaned in findOneAndDelete
        res.send("password reset successfully.");
    } catch (error) {
        res.send("An error occurred");
        console.log(error);
    }
}

export {sendPasswordResetLink, resetPassword}
