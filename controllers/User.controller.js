const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const config = require("config");

//get User details
const getUserDetails = async (req, res) => {
  try {
    //get user details
    //-password : dont return the pasword
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate({ path: "education", model: "Education" })
      .populate({ path: "experience", model: "Experience" })
      .populate({ path: "posts", model: "Posts" })
      .populate({ path: "applicationList", model: "Application" })
      .populate({ path: "jobList", model: "Jobs" });
    res.json(user);
  } catch {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

//Authenticate admin and get token
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    //See if user Exist
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    //match the user email and password

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    //Return jsonwebtoken

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    //Something wrong with the server
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

//Register User
const registerUser = async (req, res) => {
  const { firstName, lastName, phoneNumber, profileImageURL, email, password } =
    req.body;

  try {
    //See if user Exist
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exist" }] });
    }

    //create a Site User instance
    user = new User({
      firstName,
      lastName,
      phoneNumber,
      profileImageURL,
      email,
      password,
    });

    //Encrypt Password

    //10 is enogh..if you want more secured.user a value more than 10
    const salt = await bcrypt.genSalt(10);

    //hashing password
    user.password = await bcrypt.hash(password, salt);

    //Return jsonwebtoken
    const payload = {
      user: {
        email: user.email,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        //save user to the database
        user.token = token;
        return user
          .save()
          .then((registeredUser) => {
            return res.json(registeredUser);
          })
          .catch((error) => {
            return res.json(error);
          });
      }
    );
  } catch (err) {
    //Something wrong with the server
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

const deleteUserPermenently = async (request, response) => {
  return await User.findByIdAndDelete(request.params.userId)
    .then((user) => {
      return response.json(user);
    })
    .catch((error) => {
      return response.json(error);
    });
};

module.exports = {
  getUserDetails,
  loginUser,
  registerUser,
  deleteUserPermenently,
};
