import {Router} from "express";
import multer from "multer";
import * as userController from "../app/controllers/user.controller.js";

const router = Router();

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "public/uploads/users");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({storage});

router.get("/me/:id", userController.me);
router.post("/update-me/:id", upload.single("profileImagePath"), userController.updateProfile);
router.get("/:userId/trip-list", userController.getTripList);
router.get("/:userId/property-list", userController.getPropertyList);
router.patch("/:userId/:listingId", userController.addWishtList);
router.patch("/reset-password", userController.resetPassword);
router.post("/:id/change-password", userController.changePassword);
router.patch("/forgot-password", userController.forgotPassWord);
router.patch("/verify", userController.resetPassword);

export default router;
