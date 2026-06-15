import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { User } from '../model/User.js';

//middleware que checa o token no usuario 
export async function checkToken(req, res, next) {
    const authHeader = req.headers['authorization']
    //primeira parte dps do = verifica se tem algo na var 
    // se tiver ele da o split pq vai chegar algo com
    //  "barrer asd1231adsd@213" e pega so a segunda parte 
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(403).json({ msg: "access_denied", source: "checkToken" })
    }

    try {
        const secret = process.env.JWT_SECRET
        const decoded = jwt.verify(token, secret)
        console.log('token_verified');
        next();

    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "invalid_token", source: "checkToken" })
    }
}