import { Router } from "express";
import { Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  req.auth!.userId
  res.send("User route with GET method");
});
export default router;