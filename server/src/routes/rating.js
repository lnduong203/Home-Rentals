import { Router } from "express";

import * as ratingController from "../app/controllers/rating.controller.js";
import { verifyToken } from "../app/middlewares/common/verify-token.js";

const router = Router();

router.get("/:id", ratingController.getRating);
router.post("/:listingId", ratingController.rating);

export default router;