
import jwt from "jsonwebtoken";

// Generate JWT token
const userToken = (user) => {
    try {
        const token = jwt.sign(
            {
                _id: user._id,
                name: user.name,
                isAdmin: user.isAdmin
            },
            process.env.JWT_TOKEN,
            { expiresIn: "5h" }
        );

        return token;

    } catch (error) {
        console.error(error);
        throw new Error("Error generating token");
    }
};


// Verify JWT token
const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "Please login first"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_TOKEN);

        req.user = decoded;

        next();

    } catch (error) {
        console.error("JWT verification error:", error.message);

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};


// Verify admin privileges
const verifyAdmin = (req, res, next) => {

    if (!req.user?.isAdmin) {
        return res.status(403).json({
            message: "Access denied. Admin privileges required."
        });
    }

    next();
};


export { userToken, verifyToken, verifyAdmin };
