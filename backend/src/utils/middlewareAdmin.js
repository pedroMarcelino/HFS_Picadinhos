import jwt, { decode } from 'jsonwebtoken';
import 'dotenv/config';

export async function middlewareAdmin(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(403).json({ msg: "access_denied" })
    }

    try {
        const secret = process.env.JWT_SECRET
        const decoded = jwt.verify(token, secret)

        console.log(decoded.role);
        if (decoded.role !== "admin") {
            return res.status(403).json({ msg: "invalid_role", source: "middlewareAdmin" })
        }
        next();

    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "invalid_token", source: "middlewareAdmin" })
    }
}