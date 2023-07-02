import jwt from 'jsonwebtoken'
import asyncHandler from "express-async-handler";
import User from "../models/User.js";


export const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  const secret = process.env.JWT_SECRET

  if (token) {
    try {
      const decoded = jwt.verify(token, secret);
      
      req.user = await User.findOne({
        where: {
          email: decoded.email,
        },
        attributes: ["user_id", "email"],
      });
      next()
    } catch (err) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized. no token");
  }
});


