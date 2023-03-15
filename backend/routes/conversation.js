import express from "express";
import {
  createConversation,
  getConversations,
  getSingleConversation,
  updateConversation,
} from "../controllers/conversation.js";
import { verifyToken } from "../middleware/jwt.js";
const router = express.Router();

router.post("/createConversation", verifyToken, createConversation);
router.get("/getConversations", verifyToken, getConversations);
router.get("/singleConversation/:id", verifyToken, getSingleConversation);
router.put("/updateConversation/:id", verifyToken, updateConversation);

export default router;
