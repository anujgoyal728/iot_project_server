const router = require("express").Router();
const { User } = require("../models/user");

router.get("/", async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: `User Not found ${req.params.id}` });
        }
        // Return user data
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;