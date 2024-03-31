const mongoose = require("mongoose");

module.exports = () => {
	const connectionParams = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};
	try {
		// mongoose.connect(process.env.DB, connectionParams);
		mongoose.connect(process.env.MONGODB_URI, {
			dbName : process.env.DB_NAME,
			user : process.env.DB_USER,
			pass : process.env.DB_PASS
		})
		console.log("Connected to database successfully");
	} catch (error) {
		console.log(error);
		console.log("Could not connect database!");
	}
};