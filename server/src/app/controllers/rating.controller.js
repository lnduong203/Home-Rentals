import * as ratingService from "../services/rating.service.js";
import * as listingService from "../services/listing.service.js";

export const getRating = async (req, res) => {
    try {
        const rating = await ratingService.filter(req.params.id);
        if (!rating) return res.status(400).json({message: "Rating not found"});

        res.status(200).json(rating);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const rating = async (req, res) => {
    try {
        const {listingId} = req.params;
        const {customerId, ratingPoint, evaluate} = req.body;

        const rating = await ratingService.create({customerId, listingId, ratingPoint, evaluate});
        if (!rating) {
            return res.status(400).json({message: "Rating fail"});
        }
        await listingService.updateRating(listingId, ratingPoint);
        res.status(200).json({message: "Rating successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
};
