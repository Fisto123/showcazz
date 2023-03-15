import express from "express";
import { confirm, getOrder, Intent } from "../controllers/order.js";
import { verifyToken } from "../middleware/jwt.js";
const router = express.Router();

//router.post("/addOrder/:gigId", verifyToken, createOrder);
router.get("/getOrder", verifyToken, getOrder);
router.post("/create-payment-intent/:id", verifyToken, Intent);
router.put("/update_payment", verifyToken, confirm);

export default router;
