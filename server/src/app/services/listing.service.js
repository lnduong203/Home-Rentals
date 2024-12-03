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
    city,
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
        streetAddress,
        aptSuite,
        city,
        province,
        country,
        guestCount,
        bedroomCount,
        bedCount,
        bathroomCount,
        amenities,
        listingPhotoPaths,
        title,
        description,
        highlight,
        highlightDetail,
        price,
    });
    return await newListing.save();
};

// export const create = async (data) => {
//     const newListing = new Listing(data);
//     return await newListing.save();
// };

export const details = async (id) => {
    return await Listing.findById(id).populate("creator", "-password -createdAt -updatedAt");
};

export const getByCreator = async (creatorId) => {
    return await Listing.find({creator: creatorId}).populate("creator", "-password -createdAt -updatedAt");
};
