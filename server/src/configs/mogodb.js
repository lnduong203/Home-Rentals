import mongoose from "mongoose";
import {DATABASE_URI, DB_NAME} from "./constants.js";

export default async function connect() {
    try {
        await mongoose.connect(`${DATABASE_URI}/${DB_NAME}`)
        // await mongoose.connect(`mongodb+srv://duongln203:ngocduong03@cluster0.u9plz.mongodb.net/${DB_NAME}`, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
            
        // });
        console.log("Database connection successful ");
    } catch (error) {
        console.error("Failed to connect to the database.");
        throw error;
    }
}
