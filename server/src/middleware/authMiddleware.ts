import { clerkClient } from "@clerk/express";

import { Request, Response, NextFunction } from "express";

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.auth!.userId) {
    res.status(401).json({ message: "Unauthorized - you must be logged in" });
    return;
  }
  next();
};

export const requireAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth!.userId!);
    const isAdmin =
      process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "Unauthorized - you must be an admin" });
    }
    next(); 
  } catch (error) {
    next(error);
  }
};