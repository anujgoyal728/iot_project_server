require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const getDataRoutes = require("./routes/getData");
const {User} = require("./models/user")

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/fetchData", getDataRoutes)
app.get("/api/fetchData/getuserData/:id", async (req, res) => {
    try{
        //await User.findOne({ email: req.body.email });
        const user = await User.findOne({ user_id: req.params.id});
        if (!user) {
            return res.status(404).json({ message: `User Not found  in 1${req.params.id}` });
        }
        // Return user data
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));