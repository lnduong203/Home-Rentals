import mongoose from 'mongoose';

const RatingSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    listingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing',
        required: true,
    }
    ,
    ratingPoint: {
        type: Number,
        required: true,
    },
    evaluate:{
        type: String,
        default: '',
    }
}, {
    timestamps: true,
    versionKey: false,
});

export const Rating = mongoose.model('Rating', RatingSchema);