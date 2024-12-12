import {Router} from "express";
import multer from "multer";
// import path from "node:path"

import * as listingController from "../app/controllers/listing.controller.js";

const router = Router();

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "public/uploads/homes");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({storage});

router.get("/", listingController.filterListings);
router.post("/create", upload.array("listingPhotos"), listingController.createListing);
router.get("/:id", listingController.listingDetails);
router.put("/:id/update", upload.array("listingPhotos"), listingController.updateListing);
router.delete("/:id/delete", listingController.deleteListing);

export default router;
