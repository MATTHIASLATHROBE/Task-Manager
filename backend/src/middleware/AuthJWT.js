import jwt from "jsonwebtoken";

const userToken = (userId) => {
    try{
        const token = jwt.sign({ id: userId }, process.env.JWT_TOKEN, {expiresIn: "5h"});
        return token;
    }
    catch (error) {
        console.error(error);
        throw new Error("Error generating token");
    }
};

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

export { userToken, verifyToken };

