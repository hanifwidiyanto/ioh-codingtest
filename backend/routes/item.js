import express from "express";
import {
  createItem,
  getAllItems,
  getItemById,
  deleteItemById,
} from "../controllers/itemController.js";

const router = express.Router();

router.post("/", createItem);
router.get("/", getAllItems);
router.route("/:id").get(getItemById).delete(deleteItemById);

export default router;
