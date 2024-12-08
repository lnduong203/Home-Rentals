// import {Booking} from "../models/Booking.js";
import * as bookingService from "../services/booking.service.js";

import dateFormat from "dateformat";
import querystring from "qs";
import crypto from "crypto";
import { VNPAY_HASHSECRET, VNPAY_RETURNURL, VNPAY_TMNCODE, VNPAY_URL } from "../../configs/constants.js";

export const createBooking = async (req, res) => {
    try {
        const data = req.body;
        const booking = await bookingService.create(data);

        res.status(200).json(booking);
    } catch (error) {
        console.log("error", error.message);
        res.status(500).json({ message: "Fail to create new Booking", error: error.message });
    }
};

export const bookingDetails = async (req, res) => {
    try {
        const booking = await bookingService.details(req.params.id);

        if (booking) {
            res.status(200).json(booking);
        } else {
            res.status(404).json({ message: "Booking not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch booking details", error: error.message });
    }
};

export const getBookedDates = async (req, res) => {
    try {
        const bookedDates = await bookingService.getBookedDates(req.params.listingId);
        if (bookedDates) {
            res.status(200).json(bookedDates);
        } else {
            res.status(404).json({ message: "No bookings found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch booked dates", error: error.message });
    }
};

export const checkIn = async (req, res) => {
    try {
        const booking = await bookingService.checkIn(req.params.id);
        if (booking) {
            res.status(200).json({ message: "Check in successful" });
        } else {
            res.status(404).json({ message: "Booking not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to check in", error: error.message });
    }
};

export const cancelBooking = async (req, res) => {
    try {
        const booking = await bookingService.remove(req.params.id);
        if (booking) {
            res.status(200).json({ message: "Booking cancelled" });
        } else {
            res.status(404).json({ message: "Booking not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to cancel booking", error: error.message });
    }
};

const sortObject = (obj) => {
    const sorted = {};
    const keys = Object.keys(obj).sort();
    keys.forEach((key) => {
        sorted[key] = obj[key];
    });
    return sorted;
};

export const payment = async (req, res) => {
    const ipAddr = req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;

    const tmnCode = VNPAY_TMNCODE;
    const secretKey = VNPAY_HASHSECRET;
    const vnpUrl = VNPAY_URL;
    const returnUrl = VNPAY_RETURNURL;

    const date = new Date();
    const createDate = dateFormat(date, "yyyymmddHHmmss");
    const orderId = dateFormat(date, "HHmmss");
    const amount = req.body.amount;
    const bankCode = req.body.bankCode;

    const orderInfo = req.body.orderDescription;
    const orderType = req.body.orderType;
    let locale = req.body.language;
    if (!locale) {
        locale = "vn";
    }
    const currCode = "VND";
    let vnp_Params = {};
    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    vnp_Params["vnp_Amount"] = amount * 100;
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_TxnRef"] = orderId;
    vnp_Params["vnp_OrderInfo"] = orderInfo;
    vnp_Params["vnp_OrderType"] = orderType;
    vnp_Params["vnp_Locale"] = locale;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = ipAddr;
    vnp_Params["vnp_CreateDate"] = createDate;
    if (bankCode) {
        vnp_Params["vnp_BankCode"] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    const signData = querystring.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;
    const paymentUrl = vnpUrl + "?" + querystring.stringify(vnp_Params, { encode: false });

    res.json({ paymentUrl });
};