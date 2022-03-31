const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

//Connect Database
connectDB();

//Using Cors
app.use(cors());

//Init Middleware( include  bodyparser through express)
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("LinkUp Backend Api Running"));


//Define Routes

//-------------------User---------------------
app.use("/user", require("./routes/User.route"));

//-------------------Jobs---------------------
app.use("/jobs", require("./routes/Jobs.route"));

//-------------------Applications---------------------
app.use("/applications", require("./routes/Applications.route"));

//-------------------OpenToWorks---------------------
app.use("/opentowork", require("./routes/OpenToWorks.route"));

//-------------------Education---------------------
app.use("/educations", require("./routes/Educations.route"));

//-------------------Experiences---------------------
app.use("/experiences", require("./routes/Experiences.route"));

//-------------------Posts---------------------
app.use("/posts", require("./routes/Posts.route"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));