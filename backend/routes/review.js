import express from "express";
import {
  createReview,
  deleteReviews,
  getReviews,
} from "../controllers/review.js";
import { verifyToken } from "../middleware/jwt.js";
const router = express.Router();

router.post("/addReview", verifyToken, createReview);
router.get("/getReviews/:gigId", getReviews);
router.delete("/deleteReviews/:reviewId", deleteReviews);

export default router;
