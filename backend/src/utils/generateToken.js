import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, "okasok83847jmfdkmas29-90d", {
        expiresIn: '15d',
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // MS
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        sameSite: "strict", // CSRF attacks cross-site requesst fogery attacks
        secure: process.env.NODE_ENV !== 'development' 
    });
}

export default generateTokenAndSetCookie;