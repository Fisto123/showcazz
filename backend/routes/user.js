import express from "express";
import { deleteUser, getUser, getUsers } from "../controllers/user.js";
import { verifyToken } from "../middleware/jwt.js";
const router = express.Router();

router.delete("/deleteuser/:id", verifyToken, deleteUser);
router.get("/getUser/:id", verifyToken, getUser);
router.get("/getUsers", verifyToken, getUsers);

export default router;
