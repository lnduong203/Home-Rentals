// import { User } from "../models/User.js";
import {Listing} from "../models/Listing.js";
import * as listingService from "../services/listing.service.js";

export const filterListings = async (req, res) => {
    try {
        const listings = await listingService.filter(req.query);
        res.status(200).send(listings);
    } catch (error) {
        res.status(400).send({message: "Failed to fetch listings", error: error.message});
        console.log(error);
    }
};

export const createListing = async (req, res) => {
    try {
        const data = req.body;
        const listingPhotos = req.files;

        if (!listingPhotos) return res.status(400).send("No file upload");
        else data.listingPhotoPaths = listingPhotos.map((file) => file.path);

        const newListing = await listingService.create(data);
        if (newListing) return res.status(200).send(newListing);
        return res.status(400).send({message: "Failed to create listing", error: error.message});
    } catch (error) {
        console.log(error);
    }
};

export const updateListing = async (req, res) => {
    try {
        const listingPhotos = req.files;
        // console.log('listingPhotos:', listingPhotos);

        const data = req.body;
        if (listingPhotos) {
            const newListingPhotos = listingPhotos.map((file) => file.path);
            data.listingPhotoPaths = [...newListingPhotos, ...data.listingPhotos || []];
        }

        const listing = await Listing.findById(req.params.id);
        if (!listing) return res.status(400).send({message: "Listing not found"});
        const updatedListing = await listingService.update(listing, data);
        if (updatedListing) return res.status(200).send(updatedListing);
    } catch (error) {
        console.log(error);
    }
};

export const listingDetails = async (req, res) => {
    try {
        const listing = await listingService.details(req.params.id);
        res.status(200).json(listing);
    } catch (error) {
        res.status(400).json({message: "Failed to fetch listing", error: error.message});
    }
};

export const deleteListing = async (req, res) => {
    try {
        const listing = await listingService.remove(req.params.id);
        if (listing) return res.status(200).send({message: "Listing deleted successfully"});
        else return res.status(400).send({message: "Listing not found"});
    } catch (error) {
        res.status(400).send({message: "Failed to delete listing", error: error.message});
    }
};
