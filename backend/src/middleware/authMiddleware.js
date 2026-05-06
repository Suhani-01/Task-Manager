import jwt from 'jsonwebtoken';
import { getAndAuthUser } from '../service/auth.js';

const protect = (req, res, next) => {
    // Get token from cookies
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "You need to login first" });
    }

    try {
        // Validate token → returns user data
        const decoded = getAndAuthUser(token);
        
        // Attach user to request → available in req.user
        req.user = decoded;
        
        // Pass control to next middleware/route
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};

export default protect;