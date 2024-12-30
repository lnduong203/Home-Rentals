import * as userService from "../services/user.service.js";
import * as bookingService from "../services/booking.service.js";
import * as listingService from "../services/listing.service.js";
import {
    getBookingsByMonth,
    getBookingsLastWeek,
    getCategoryStatistics,
    getTypeStatistics,
    getUserGrowth,
} from "../../utils/handlers/statisticalData.handler.js";

export const overView = async (req, res) => {
    try {
        const users = await userService.filter(req.query);
        const bookings = await bookingService.getAll();
        const listings = await listingService.filter(req.query);
        const categoryStatistics = await getCategoryStatistics(listings);
        const bookingStatistics = await getBookingsByMonth(bookings);

        res.status(200).json({
            totalUser: users.length,
            totalBooking: bookings.length,
            totalListing: listings.length,
            categoryStatistics,
            bookingStatistics,
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const listings = async (req, res) => {
    try {
        const listings = await listingService.filter(req.query);
        const typeStatistics = await getTypeStatistics(listings);

        res.status(200).json({listings, typeStatistics});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const users = async (req, res) => {
    try {
        const users = await userService.filter(req.query);
        const totalUsers = users.length;
        const newUsersToday = users?.filter(
            (user) => new Date(user.createdAt).toDateString() === new Date().toDateString(),
        ).length;
        const activeUsers = users?.filter((user) => user.isActive).length;
        const userGrowth = getUserGrowth(users);

        res.status(200).json({users, totalUsers, newUsersToday, activeUsers, userGrowth});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const bookings = async (req, res) => {
    try {
        const bookings = await bookingService.getAll();
        const bookingTypeStatistics = await getTypeStatistics(bookings);
        const bookingLastWeek = await getBookingsLastWeek(bookings);

        res.status(200).json({bookings, bookingTypeStatistics, bookingLastWeek});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
