const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res.status(200).send("welcome to the world best mern series by router!");
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, phone, password } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "email already exits" });
    }

    // hash the password

    const userCreated = await User.create({ username, email, phone, password });

    res
      .status(201)
      .json({
        msg: "registration successful",
        token: await userCreated.generateToken(),
        userID: userCreated._id.toString(),
      });
  } catch (error) {
    res.status(500).json("internal server error");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    console.log(userExist);

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // const user = await bcrypt.compare(password, userExist.password);
    const user = await userExist.comparePassword(password);

    if (user) {
      res
        .status(200)
        .json({
          msg: "Login Successful",
          token: await userExist.generateToken(),
          userID: userExist._id.toString(),
        });
    }else{
        res.status(401).json({message: "Invalid email or password"});
    }
  } catch (error) {
    res.status(500).json("internal server error");
  }
};

//to send user data - User Logic

const user = async(req, res) => {
  try {
    const userData = req.user
    console.log(userData);
    res.status(200).json({ userData});
  } catch (error) {
    console.log(`Error from the user route ${error}`);
  }
}

module.exports = { home, register, login, user};
