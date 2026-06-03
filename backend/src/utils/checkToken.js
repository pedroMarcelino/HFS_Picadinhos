import jwt from 'jsonwebtoken';
import 'dotenv/config';

export function checkToken(req, res, next) {
    const authHeader = req.headers['authorization']
    //primeira parte dps do = verifica se tem algo na var 
    // se tiver ele da o split pq vai chegar algo com
    //  "barrer asd1231adsd@213" e pega so a segunda parte 
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({ msg: "access_denied" })
    }

    try {

        const secret = process.env.JWT_SECRET
        jwt.verify(token, secret)
        console.log('token_verified');
        next();

    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "invalid_token" })
    }
}