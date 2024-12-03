// import * as userService from "../services/user.service.js";
import {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, JWT_SECRET} from "../../configs/constants.js";
import * as authService from "../services/auth.service.js";
import {OAuth2Client} from "google-auth-library";
import jwt from "jsonwebtoken";
const client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);

export const register = async (req, res) => {
    try {
        const existingUser = await authService.checkValidLogin(req.body.email, req.body.password);
        if (existingUser) {
            return res.status(400).json({message: "User already exists"});
        }

        const newUser = await authService.register(req.body);
        res.status(200).json({message: "User registered successfully", user: newUser});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const login = async (req, res) => {
    try {
        const data = await authService.checkValidLogin(req.body.email, req.body.password);

        if (!data) {
            return res.status(400).json({message: "Invalid email or password"});
        }
        res.status(200).json({message: "User logged in successfully", user: data.user, token: data.token});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
};

const verifyToken = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: GOOGLE_CLIENT_ID,
    });
    return ticket.getPayload();
};

export const googleLogin = async (req, res) => {
    try {
        const {tokens} = await client.getToken({
            code: req.body.code,
            redirect_uri: "http://localhost:3000", // URL phải khớp với cài đặt trên Google Cloud
        });
        const {id_token} = tokens;
        const payload = await verifyToken(id_token);

        const user = await authService.googleLogin(payload);
        const tokenUser = jwt.sign({id: user._id}, JWT_SECRET);
        res.status(200).json({message: "User logged in successfully", user, token: tokenUser});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const facebookLogin = async (req, res) => {
    try {
        const {accessToken} = req.body;
        console.log("Received access token:", accessToken);

        const response = await fetch(
            `https://graph.facebook.com/me?fields=id,first_name,last_name,email,picture&access_token=${accessToken}`,
            {
                method: "GET",
            },
        );

        console.log("Facebook response status:", response.status);
        const data = await response.json();
        console.log("Facebook response data:", data);

        if (!data || !data.id) {
            return res.status(400).json({message: "Invalid Facebook token"});
        }

        const user = await authService.facebookLogin(data);
        const tokenUser = jwt.sign({id: user._id}, JWT_SECRET);
        res.status(200).json({message: "User logged in successfully", user, token: tokenUser});
    } catch (error) {
        console.error("Error during Facebook login:", error);
        res.status(500).json({message: "Internal server error"});
    }
};
