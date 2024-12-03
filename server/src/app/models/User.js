
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: function () {
                return !this.googleId && !this.facebookId;
            },
        },
        profileImagePath: {
            type: String,
            default: "public/uploads/users/no-avatar.jpg",
        },
        googleId: {
            type: String,
            unique: true,
            sparse: true, // Cho phép nhiều tài liệu có giá trị null
        },
        facebookId: {
            type: String,
            unique: true,
            sparse: true, // Cho phép nhiều tài liệu có giá trị null
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        isActive: {
            type: Boolean,
            default: false,
        },
        tripList: {
            type: Array,
            default: [],
        },
        wishList: {
            type: Array,
            default: [],
        },
        propertyList: {
            type: Array,
            default: [],
        },
        reservationList: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const User = mongoose.model("User", UserSchema);
