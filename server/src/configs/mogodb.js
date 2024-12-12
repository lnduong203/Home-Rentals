import mongoose from "mongoose";
import {DATABASE_URI, DB_NAME, DB_PASSWORD} from "./constants.js";

export default async function connect() {
    try {
        // await mongoose.connect(`${DATABASE_URI}/${DB_NAME}`)
        await mongoose.connect(
            `mongodb+srv://duongln203:${DB_PASSWORD}@cluster0.u9plz.mongodb.net/${DB_NAME}`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        );
        console.log("Database connection successful ");
    } catch (error) {
        console.error("Failed to connect to the database.");
        throw error;
    }
}
