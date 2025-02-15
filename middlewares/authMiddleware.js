const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.body.id = decoded.id;
        next();
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Auth API",
            error
        });
    }
};

module.exports = authMiddleware;