import { Router } from "express";
import * as bookingController from "../app/controllers/booking.controller.js";

const router = Router();

router.post("/create", bookingController.createBooking);
router.get("/:id", bookingController.bookingDetails);
router.get("/booked-dates/:listingId", bookingController.getBookedDates);
router.patch("/check-in/:id", bookingController.checkIn);
router.delete("/cancel-booking/:id", bookingController.cancelBooking);

router.post('/payment', bookingController.payment);

export default router;
