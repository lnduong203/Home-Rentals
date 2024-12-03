// import { User } from "../models/User.js";
import * as listingService from "../services/listing.service.js";


export const filterListings = async (req, res) => {
    try {
        const listings = await listingService.filter(req.query);
        res.status(200).send(listings);
       
    } catch (error) {
       res.status(400).send({message: 'Failed to fetch listings', error: error.message});
       console.log(error);
    }
};

export const searchListings = async (req, res) => {
    const {search} = req.params;
    try {
        let listings = []; 
    } catch (error) {
        
    }
}


export const createListing = async (req, res) => {
    try {
        const data = req.body;
        const listingPhotos = req.files;

        
        if(!listingPhotos) return res.status(400).send('No file upload')
        else data.listingPhotoPaths = listingPhotos.map(file => file.path)
        
        const newListing = await listingService.create(data);
        if(newListing) return res.status(200).send(newListing);
        return res.status(400).send({message: 'Failed to create listing', error: error.message});

    } catch (error) {
        console.log(error);
        
    }
};

export const listingDetails = async (req, res) => {
    try {
        const listing = await listingService.details(req.params.id);
        res.status(200).json(listing);
    } catch (error) {
       res.status(400).json({message: 'Failed to fetch listing', error: error.message});
        
    }
   
}
