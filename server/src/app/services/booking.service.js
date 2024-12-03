import { Booking } from "../models/Booking.js";

export const create = async (data) => {
    const newBooking = new Booking(data);
    return await newBooking.save();
}

export const getByCusomer = async ( customerId ) => {
    return await Booking.find({ customerId }).populate('customerId listingId hostId', '-password');

}