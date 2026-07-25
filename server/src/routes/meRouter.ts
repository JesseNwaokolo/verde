import { Router } from "express";
import { getAuth } from "@clerk/express";
import { getLocalUser } from "../lib/user.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { userId, isAuthenticated } = getAuth(req);
    if (!isAuthenticated || !userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await getLocalUser(userId);

    res.json({ user });
  } catch (e) {
    next(e);
  }
});

export default router;
