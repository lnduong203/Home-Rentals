import bcrypt from "bcryptjs";
// const salt = bcrypt.genSaltSync(10);
const salt = 10;

export function generatePassword(password) {
    return bcrypt.hashSync(password, salt);
}

export function comparePassword(password, passwordHash) {
    return bcrypt.compareSync(password, passwordHash);
}
