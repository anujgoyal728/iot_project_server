const router = require("express").Router();
const jwt = require('jsonwebtoken');
const { User } = require("../models/user");

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized failed in 1' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        req.userId = decoded; // Assuming you're storing the user ID in the token payload
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized failed in 2' });
    }
};


router.get("/", verifyToken, async (req, res) => {
	try {
        const user = await User.findById(req.userId); // Fetch user data based on user ID
        if (!user) {
            return res.status(404).json({ message: `User Not found ${req.userId}` });
        }
        // Return user data
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;