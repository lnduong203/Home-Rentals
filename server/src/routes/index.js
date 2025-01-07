import userRouter from "./user.js";
import authRouter from "./auth.js";
import listingRouter from "./listing.js";
import bookingRouter from "./booking.js";
import ratingRouter from "./rating.js";
import dashboardRouter from "./dashboard.js";
import {verifyToken} from "../app/middlewares/common/verify-token.js";
import {checkPermission} from "../app/middlewares/common/check-permission.js";

export default function router(app) {
    app.use("/user", userRouter);
    app.use("/auth", authRouter);
    app.use("/properties", listingRouter);
    app.use("/bookings", bookingRouter);
    app.use("/rating", ratingRouter);
    // app.use("/dashboard", verifyToken, checkPermission, dashboardRouter);
    app.use("/dashboard", dashboardRouter);
}
