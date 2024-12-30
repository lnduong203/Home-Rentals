import {User} from "../models/User.js";
import {capitalizeFirstLetter} from "../../utils/handlers/capitalize.handler.js";
import {comparePassword, generatePassword} from "../../utils/helpers/password.helper.js";
const noAvatar = "/public/uploads/users/no-avatar.jpg";

export const getUserById = async (id) => {
    return await User.findById(id);
};

export const getUserByEmail = async (email) => {
    return await User.findOne({email});
};

export const filter = async ({q}) => {
    let regex = q ? new RegExp(q, "i") : null;

    const filter = {
        ...(regex && {
            $or: [{name: regex}, {email: regex}, {role: regex}],
        }),
    };
    return await User.find(filter, "-password ");
};

export const update = async (currentUser, {firstName, lastName, email, profileImagePath, newPassword}) => {
    currentUser.firstName = firstName ? capitalizeFirstLetter(firstName) : currentUser.firstName;
    currentUser.lastName = lastName ? capitalizeFirstLetter(lastName) : currentUser.lastName;
    currentUser.email = email ? email.toLowerCase() : currentUser.email;
    // if (profileImagePath) currentUser.profileImagePath = profileImagePath;
    currentUser.profileImagePath = profileImagePath ? profileImagePath : noAvatar;

    if (newPassword) {
        currentUser.password = generatePassword(newPassword);
    }

    return await currentUser.save();
};

export const updateStatus = async (userId, {status}) => {
    return await User.findByIdAndUpdate(userId, {isActive: status });
};

export const changePassword = async (user, currentPassword, newPassword) => {
    const checkMatchPass = await comparePassword(currentPassword, user.password);

    if (!checkMatchPass) {
        return false;
    } else {
        user.password = generatePassword(newPassword);
        await user.save();
        return user;
    }
};

export const resetPassword = async (user, newPassword) => {
    user.password = generatePassword(newPassword);
    await user.save();
    return user;
};
