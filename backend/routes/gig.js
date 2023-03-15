import express from "express";
import { createGig, deleteGig, getGig, getGigs } from "../controllers/gig.js";
import { verifyToken } from "../middleware/jwt.js";
const router = express.Router();

router.post("/addgig", verifyToken, createGig);
router.delete("/deletegig/:id", verifyToken, deleteGig);
router.get("/singlegig/:id", getGig);
router.get("/allgigs", getGigs);

export default router;
