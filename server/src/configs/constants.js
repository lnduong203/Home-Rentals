import {config} from "dotenv";
import path from "path";
import {fileURLToPath} from "url";

config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const host = process.env.HOST;
export const port = process.env.PORT;
export const appSetting = process.env.NODE_ENV;
export const APP_URL_API = process.env.APP_URL_API;
export const APP_URL_CLIENT = process.env.APP_URL_CLIENT;

// directory
export const SOURCE_DIR = path.dirname(__dirname);
export const APP_DIR = path.dirname(SOURCE_DIR);
export const VIEW_DIR = path.join(APP_DIR, "src", "views");

export const DATABASE_URI =
    "mongodb://" +
    (process.env.DB_PORT ? "" : "+srv") +
    process.env.DB_HOST +
    (process.env.DB_PORT ? ":" + process.env.DB_PORT : "");
export const DB_NAME = process.env.DB_NAME;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const JWT_SECRET = process.env.SECRET_KEY;

export const MAIL_HOST = process.env.MAIL_HOST;
export const MAIL_PORT = process.env.MAIL_PORT;
export const MAIL_USERNAME = process.env.MAIL_USERNAME;
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
export const MAIL_FROM_NAME = process.env.MAIL_FROM_NAME;

export const GOOGLE_CLIENT_ID = process.env.GG_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GG_CLIENT_SECRET;
export const FB_CLIENT_ID = process.env.FB_APP_ID;


export const GOONGMAP_API_KEY = process.env.GOONGMAP_API_KEY;
export const VNPAY_TMNCODE='W7VHJ28M'
export const VNPAY_HASHSECRET='2BTNURMN0BL0QTMSB9WIC1Z4XGTGPAAD'
export const VNPAY_URL='https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'
export const VNPAY_RETURNURL='http://localhost:3000/payment-return'
