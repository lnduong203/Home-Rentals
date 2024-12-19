import {Rating} from "../models/Rating.js";

export const filter = async (id) => {
    return await Rating.find({listingId: id})
        .populate("customerId", "email firstName lastName profileImagePath")
        .populate("listingId");
};

export const create = async ({customerId, listingId, ratingPoint, evaluate}) => {
    const rating = new Rating({
        customerId,
        listingId,
        ratingPoint,
        evaluate,
    });
    await rating.save();
    return rating;
};
