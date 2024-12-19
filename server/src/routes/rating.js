import { Router } from "express";

import * as ratingController from "../app/controllers/rating.controller.js";

const router = Router();

router.get("/:id", ratingController.getRating);
router.post("/:listingId", ratingController.rating);

export default router;