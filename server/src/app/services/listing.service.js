import {capitalizeFirstLetter} from "../../utils/handlers/capitalize.handler.js";
import {Listing} from "../models/Listing.js";

export const filter = async ({q}) => {
    q = q ? {$regex: q, $options: "i"} : null;

    const filter = {
        ...(q && {$or: [{category: q}, {type: q}, {city: q}, {province: q}, {country: q}, {title: q}]}),
    };

    return await Listing.find(filter).populate("creator", "-password -createdAt -updatedAt");
};

export const create = async ({
    creator,
    category,
    type,
    streetAddress,
    aptSuite,
    commune,
    district,
    province,
    country,
    guestCount,
    bedroomCount,
    bedCount,
    bathroomCount,
    amenities,
    title,
    listingPhotoPaths,
    description,
    highlight,
    highlightDetail,
    price,
}) => {
    const newListing = new Listing({
        creator,
        category,
        type,
        streetAddress: capitalizeFirstLetter(streetAddress),
        aptSuite: capitalizeFirstLetter(aptSuite),
        commune: capitalizeFirstLetter(commune),
        district: capitalizeFirstLetter(district),
        province: capitalizeFirstLetter(province),
        country: capitalizeFirstLetter(country),
        guestCount,
        bedroomCount,
        bedCount,
        bathroomCount,
        amenities,
        listingPhotoPaths,
        title: capitalizeFirstLetter(title),
        description,
        highlight: capitalizeFirstLetter(highlight),
        highlightDetail,
        price,
    });
    return await newListing.save();
};

export const update = async (listing,{
    creator,
    category,
    type,
    streetAddress,
    aptSuite,
    commune,
    district,
    province,
    country,
    guestCount,
    bedroomCount,
    bedCount,
    bathroomCount,
    amenities,
    title,
    listingPhotoPaths,
    description,
    highlight,
    highlightDetail,
    price,
}) => {
    return await Listing.findByIdAndUpdate(listing._id, {
        creator,
        category,
        type,
        streetAddress: capitalizeFirstLetter(streetAddress),
        aptSuite: capitalizeFirstLetter(aptSuite),
        commune: capitalizeFirstLetter(commune),
        district: capitalizeFirstLetter(district),
        province: capitalizeFirstLetter(province),
        country: capitalizeFirstLetter(country),
        guestCount,
        bedroomCount,
        bedCount,
        bathroomCount,  
        amenities,
        title: capitalizeFirstLetter(title),
        listingPhotoPaths: listingPhotoPaths ? listingPhotoPaths : listing.listingPhotoPaths,
        description,
        highlight: capitalizeFirstLetter(highlight),
        highlightDetail,
        price,
    });
};

export const details = async (id) => {
    return await Listing.findById(id).populate("creator", "-password -createdAt -updatedAt");
};

export const getByCreator = async (creatorId) => {
    return await Listing.find({creator: creatorId}).populate("creator", "-password -createdAt -updatedAt");
};

export const remove = async (id) => {
    return await Listing.findByIdAndDelete(id);
};

export const updateRating = async (listingId, ratingPoint) => {
    const listing = await Listing.findById(listingId);
    const totalRating = listing.totalRating + ratingPoint;
    const ratingCount = listing.ratingCount + 1;
    const averageRating = totalRating / ratingCount;

    return await Listing.findByIdAndUpdate(listingId, {
        totalRating,
        ratingCount,
        averageRating,
    });
}
