import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// import fs from "fs";
// import https from "https";

import router from "./src/routes/index.js";
import {appSetting, host, port} from "./src/configs/constants.js";
import connect from "./src/configs/mogodb.js";

const app = express();

// https.createServer({key: fs.readFileSync("./server.key"), cert: fs.readFileSync("./server.crt")});

app.use(cors());

app.use(express.static("public"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// parse application/json
app.use(bodyParser.json());

//connect to mongodb
connect();

//init route
router(app);

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port} at ${appSetting} mode`);
});
