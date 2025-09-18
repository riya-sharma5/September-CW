import jwt from 'jsonwebtoken';
const secret = "Riya$123";
function setUser(student) {
    return jwt.sign(student, secret);
}
function getUser(token) {
    if (!token)
        return null;
    return jwt.verify(token, secret);
}
module.exports = {
    setUser,
    getUser,
};
//# sourceMappingURL=auth.js.map