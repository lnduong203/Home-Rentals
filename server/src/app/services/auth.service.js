import {User} from "../models/User.js";
import {JWT_SECRET} from "../../configs/constants.js";
import jwt from "jsonwebtoken";
import {comparePassword, generatePassword} from "../../utils/helpers/password.helper.js";
import {capitalizeFirstLetter} from "../../utils/handlers/capitalize.handler.js";
// import {capitalizeFirstLetter} from "../../middlewares/handlers/capitalize.handler.js";

export const checkValidLogin = async (email, password) => {
    const user = await User.findOne({email});

    if (user) {
        const validPassword = comparePassword(password, user.password);
        if (validPassword) {
            const token = jwt.sign({id: user._id}, JWT_SECRET);
            delete user.password;

            return {user, token};
        }
        return false;
    }
};

export const register = async ({firstName, lastName, email, password}) => {
    const user = new User({
        firstName: capitalizeFirstLetter(firstName),
        lastName: capitalizeFirstLetter(lastName),
        email,
        isActive: true,
        password: generatePassword(password),
    });
    return await user.save();
};

export const googleLogin = async ({sub, email, given_name, family_name, picture}) => {
    let user = await User.findOne({googleId: sub});
    if (!user) {
        user = new User({
            googleId: sub,
            email,
            firstName: capitalizeFirstLetter(given_name),
            lastName: capitalizeFirstLetter(family_name),
            // password: generatePassword(email),
            isActive: true,
            profileImagePath: picture,
        });
        await user.save();
    }
    return user;
};

export const facebookLogin = async ({email, id, first_name, last_name, picture}) => {
    let user = await User.findOne({facebookId: id});
    if (!user) {
        user = new User({
            facebookId: id,
            email,
            firstName: capitalizeFirstLetter(first_name),
            lastName: capitalizeFirstLetter(last_name),
            password: generatePassword(email),
            isActive: true,
            profileImagePath: picture.data.url,
        });
        await user.save();
    }
    return user;
};
