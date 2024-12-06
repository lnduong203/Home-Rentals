import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        hostId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        listingId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Listing",
        },
        startDate: {
            type: String,
            required: true,
        },
        endDate: {
            type: String,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        isCheckIn: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const Booking = mongoose.model("Booking", bookingSchema);
