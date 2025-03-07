import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from '../utils/nodemailer.js';
import { validate } from '../helpers/utilities.js';
import { registerUserSchema } from '../validation/user.js';

export const registerUser = async (req, res) => {
  try {
    const validatedData = await validate(req.body, registerUserSchema);
    const { fullname, email, password, gender, phoneNumber } = validatedData;
    const user = await User.findOne({ email });

    if (user)
      return res.status(404).json({
        message: "User with email already exist",
      });

    const saltPassword =  bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, saltPassword);

    const newUser = new User({
      fullname,
      email,
      password: hashPassword,
      username: email.split("@")[0],
      gender,
      phoneNumber
    });

    await newUser.save();

    const message = `Your registration on DOG CONNECT was successful`;

    sendEmail({
      email: newUser.email,
      subject: "Account creation sucess",
      message
    });

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
    const user = await User.findOne({ email });

    console.log(email, password);

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
      { id: user._id, name: user.name, email: user.email, username: user.username },
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

export const findUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({username: username });
  
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    return res.status(200).json({
      message: `Hi ${user.fullname.split(' ')[0]}`,
      data: user
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const findOwners = async (req, res) => {
  const allOwners = await User.find();

  if (allOwners.length === 0) {
    return res.status(404).json({
      message: 'No owner found'
    })
  }

  res.status(200).json({
    message: 'All dog owners',
    data: allOwners
  });
};
