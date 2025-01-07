import {getUserByEmail} from "../../services/user.service.js";

export const checkPermission = async (req, res, next) => {
    try {
        const user = await getUserByEmail(req.query.email);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        if (user.role !== "admin") {
            return res.status(403).json({message: "You don't have permission to access "});
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
};
