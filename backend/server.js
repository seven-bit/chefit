const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const chefs = require("./routes/api/chefs");

const app = express();
// Bodyparser middleware
mongoose.set('useFindAndModify', false);
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
// DB Config
const db = require("./config/keys.js").url;
// Connect to MongoDB
mongoose.connect(db,{ 
	useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected "))
  .catch(err => console.log(err));

	// Passport middleware
	app.use(passport.initialize());
	// Passport config
	require("./config/passport")(passport);
	// Routes
	
	app.use("/api/users", users);
	app.use("/api/chefs", chefs);

	// require('./api/users')(app);

  const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there

  app.listen(port, () => console.log(`Server up and running on port ${port} !`));