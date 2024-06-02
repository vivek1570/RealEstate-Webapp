import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createListing,
  deleteListing,
  getlist,
  updateList,
} from "../controllers/listing.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.get("/list/:id", verifyToken, getlist);
router.post("/update/:id", verifyToken, updateList);

export default router;
