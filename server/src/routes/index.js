import userRouter from "./user.js";
import authRouter from "./auth.js";
import listingRouter from "./listing.js";
import bookingRouter from "./booking.js";
import dashboardRouter from "./dashboard.js";

export default function router(app) {
    app.use("/user", userRouter);
    app.use("/auth", authRouter);
    app.use("/properties", listingRouter);
    app.use("/bookings", bookingRouter);
    app.use("/dashboard", dashboardRouter);
    
}
