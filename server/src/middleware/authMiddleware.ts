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
): Promise<void> => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) {
      throw new Error("ADMIN_EMAIL is not defined in .env file");
    }

    const userId = req.auth?.userId;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized - user ID not found" });
      return;
    }

    const user = await clerkClient.users.getUser(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const userEmail = user.emailAddresses?.[0]?.emailAddress;

    if (userEmail !== adminEmail) {
      res.status(403).json({ message: "Unauthorized - you must be an admin" });
      return;
    }

    next();
  } catch (error) {
    console.error("Error in requireAdmin middleware:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
