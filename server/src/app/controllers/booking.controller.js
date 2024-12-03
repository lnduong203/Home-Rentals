import * as bookingService from "../services/booking.service.js";

export const createBooking = async (req, res) => {
    try {
        const data = req.body;
        const booking = await bookingService.create(data);

        res.status(200).json(booking);
    } catch (error) {
        console.log("error", error.message);
        res.status(500).json({message: "Fail to create new Booking", error: error.message});
    }
};


