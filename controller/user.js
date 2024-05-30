import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { fullname, email, password, gender } = req.body;
    const user = await User.findOne({ email: email });

    if (user)
      return res.status(404).json({
        message: "User with email already exist",
      });

    const saltPassword = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, saltPassword);

    const newUser = new User({
      fullname,
      email,
      password: hashPassword,
      username: email.split("@")[0],
      gender,
    });

    await newUser.save();

    return res.status(201).json({
      message: `${fullname} has successfully registered`,
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user)
      return res.status(404).json({
        message: "user not found",
      });

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect)
      return res.status(404).json({
        message: "Email or password incorrect",
      });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const result = {
      fullname: user.fullname,
      email: user.email,
      gender: user.gender,
      token: token,
    };
    return res.status(200).json({
      message: "Login successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};