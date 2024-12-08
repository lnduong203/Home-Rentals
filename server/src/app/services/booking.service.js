import {Booking} from "../models/Booking.js";

export const create = async (data) => {
    const newBooking = new Booking(data);
    return await newBooking.save();
};

export const getByCusomer = async (customerId) => {
    return await Booking.find({customerId}).populate("customerId listingId hostId", "-password");
};

export const details = async (id) => {
    return await Booking.findById(id).populate("customerId listingId hostId", "-password");
};
export const getBookedDates = async (listingId) => {
    const bookings = await Booking.find({listingId});
    if (bookings) {
        const bookedDates = bookings.flatMap((booking) => {
            const start = new Date(booking.startDate);
            const end = new Date(booking.endDate);
            const dates = [];
            for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
                dates.push(new Date(d));
            }
            return dates;
        });

        return bookedDates;
    }
    return false;
};

export const checkIn = async (id) => {
    return await Booking.findByIdAndUpdate(id, {isCheckIn: true});
};

export const remove = async (id) => {
    return await Booking.findByIdAndDelete(id);
}


