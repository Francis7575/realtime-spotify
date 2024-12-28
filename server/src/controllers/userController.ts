import { NextFunction, Request, Response } from "express";
import { User } from "../models/userModel";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUserId = req.auth!.userId;
    const user = await User.find({clerkId: {$ne: currentUserId}});
    res.status(200).json(user); 
  } catch (error) {
    next(error)
  }
};
