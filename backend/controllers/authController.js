import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import { authService } from "../services/auth.service.js";
import { bcryptService } from "../services/bcyrpt.service.js";
import jwt from "jsonwebtoken";

// @desc    Create New Account
// route    POST /api/users/register
// @access  Public
export const register = asyncHandler(async (req, res) => {
  const { body } = req;

  if (body.password === body.confPassword) {
    const userExists = await User.findOne({
      where: {
        email: body.email,
      },
    });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      email: body.email,
      password: body.password,
    });

    const token = authService().issue({
      id: user.user_id,
      email: user.email,
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      // sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });


    res.status(201).json({ token, user });
  } else {
    res.status(400);
    throw new Error("Passwords don't match");
  }
});

// @desc    Auth user/set token
// route    POST /api/users/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    const user = await User.findOne({
      where: {
        email,
      },
      attributes: ["user_id", "email", "password"],
    });

    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }

    const isPasswordMatch = await bcryptService().comparePassword(
      password,
      user.password
    );

    if (!isPasswordMatch) {
      res.status(401);
      throw new Error("Incorrect password");
    }

    const token = authService().issue({
      id: user.user_id,
      email: user.email,
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      // sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ token, user });
  } else {
    res.status(400);
    throw new Error("Email or Password is Missing");
  }
});

// @desc    Check Is User Has Login
// route    PUT /api/users/check
// @access  Private
export const isAuth = asyncHandler(async (req, res) => {
  console.log(req.cookies.jwt)
  const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
  const users = await User.findOne({
    attributes: ["user_id", "email", "password"],
    where: {
      email: decoded.email,
    },
  });

  return res.status(200).json({message:"User has logged in", users });
});

// @desc    Logout User / Delete set token
// route    POST /api/users/logout
// @access  Public
export const logout = asyncHandler((req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    message: "User logged out",
  });
});

// @desc    Update user profile
// route    PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const { body } = req;
  const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);

  const user = await User.findOne({
    where: {
      email: decoded.email,
    },
  });
  if (user) {
    user.email = body.email || user.email;
  }
  if (body.password) {
    user.password = body.password;
  }

  const updatedUser = await user.save();

  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    message: "Profil updated, please login again.",
    updatedUser,
  });
});

// @desc    View user profile
// route    GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);

  const users = await User.findOne({
    attributes: ["user_id", "email", "password"],
    where: {
      email: decoded.email,
    },
  });

  return res.status(200).json({ users });
});
