import nodeMailer from "nodemailer";
import {MAIL_HOST, MAIL_PASSWORD, MAIL_PORT, MAIL_USERNAME, VIEW_DIR} from "../../configs/constants.js";
import {renderFile} from "ejs";
import crypto from "crypto";
import {join} from "path";

const transport = nodeMailer.createTransport({
    service: "gmail", // Hoặc sử dụng 'smtp.gmail.com' với cổng và bảo mật tương ứng
    auth: {
        user: MAIL_USERNAME,
        pass: MAIL_PASSWORD,
    },
});

export const sendMail = async (to, subject, template, data) => {
    try {
        const html = await renderFile(join(VIEW_DIR, template), data);
        await transport.sendMail({
            from: MAIL_USERNAME,
            to,
            subject,
            html,
        });
    } catch (error) {
        console.log(error);
    }
};

export function hashEmail(email) {
    return crypto.createHash("sha256").update(email).digest("hex");
}

export function compareEmail(email, emailHash) {
    return emailHash === email;
}
