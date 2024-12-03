import {Router} from "express";
// import multer from "multer";
import * as authController from "../app/controllers/auth.controller.js";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/google-login", authController.googleLogin);
router.post("/facebook-login", authController.facebookLogin);

export default router;
