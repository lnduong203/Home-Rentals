import * as userService from "../services/user.service.js";
import * as bookingService from "../services/booking.service.js";
import * as listingService from "../services/listing.service.js";
import {compareEmail, hashEmail, sendMail} from "../../utils/helpers/mail.helper.js";

// import {APP_URL_API} from "../../configs/constants.js";

export const me = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        console.log("Failed to fetch user", error.message);
        res.status(500).send("Failed to fetch user");
    }
};

export const updateProfile = async (req, res) => {
    try {
        const profileImagePath = req.file;
        if (profileImagePath) req.body.profileImagePath = profileImagePath.path;

        const currentUser = await userService.getUserById(req.params.id);
        const updatedUser = await userService.update(currentUser, req.body);
        res.status(200).send(updatedUser);
    } catch (error) {
        console.log("Failed to update profile", error.message);
        res.status(500).send("Failed to update profile");
    }
};

export const changePassword = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (user) {
            const {currentPassword, newPassword} = req.body;
            const checkMatchPass = await userService.changePassword(user, currentPassword, newPassword);
            if (!checkMatchPass) {
                res.status(400).json({message: "Current password is incorrect"});
            } else {
                res.status(200).json({message: "Password changed successfully"});
            }
        } else {
            res.status(404).json({message: "User not found"});
        }
    } catch (error) {
        console.log("Failed to change password", error.message);
        res.status(500).send("Failed to change password");
    }
};

export const getTripList = async (req, res) => {
    try {
        const {userId} = req.params;
        const trips = await bookingService.getByCusomer(userId);
        res.status(200).json(trips);
    } catch (error) {
        console.log("Failed to fetch trip list", error.message);
        res.status(400).send("Failed to fetch trip list");
    }
};

export const addWishtList = async (req, res) => {
    try {
        const {userId, listingId} = req.params;
        const user = await userService.getUserById(userId);
        const listing = await listingService.details(listingId);

        const favoriteListing = await user.wishList.find((list) => list._id.toString() === listingId);
        if (favoriteListing) {
            user.wishList = user.wishList.filter((list) => list._id.toString() !== listingId);
            await user.save();
            res.status(200).json({message: "Removed from wish list", whishList: user.wishList});
        } else {
            user.wishList.push(listing);
            await user.save();
            res.status(200).json({message: "Added to wish list", wishList: user.wishList});
        }
    } catch (error) {
        console.log("Failed to add to wish list", error.message);
        res.status(400).send("Failed to add to wish list");
    }
};

export const getPropertyList = async (req, res) => {
    try {
        const {userId} = req.params;
        const properties = await listingService.getByCreator(userId);
        res.status(200).json(properties);
    } catch (error) {
        console.log("Failed to fetch property list", error.message);
        res.status(400).send("Failed to fetch property list");
    }
};
export const forgotPassWord = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await userService.getUserByEmail(email);
        if (user) {
            let data = {
                email,
                hashEmail: hashEmail(email),
                name: user.lastName,
            };
            await sendMail(email, "Reset Password", "forgot-password", {data});
            res.status(200).json({message: `Email sent successfully to ${email}`});
        } else {
            res.status(400).json({message: `Email ${email} no exist`});
        }
    } catch (error) {
        console.log("Failed to send email", error.message);
        res.status(400).send("Failed to send email");
    }
};

export const resetPassword = async (req, res) => {
    try {
        const {email, token} = req.query;
        const hashedEmail = hashEmail(email);
        const verifyToken = compareEmail(hashedEmail, token);

        if (verifyToken) {
            const user = await userService.getUserByEmail(email);
            await userService.resetPassword(user, req.body.password);
            res.status(200).json({message: "Password reset successfully"});
        } else {
            res.status(400).json({message: "Token verification failed"});
        }
    } catch (error) {
        console.log("Failed to reset password", error.message);
        res.status(400).send("Failed to reset password");
    }
};
