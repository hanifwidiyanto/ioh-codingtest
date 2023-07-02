import express from "express";
import {
  createInvoice,
  getAllInvoices,
  updateInvoiceByInvoiceNumber,
  deleteInvoiceByInvoiceNumber,
  getInvoiceByInvoiceNumber,
} from "../controllers/invoiceController.js";
import { protect } from "../middleware/auth.js";
const router = express.Router();

router.post("/", protect, createInvoice);
router.get("/", protect, getAllInvoices);
router
  .route("/:id")
  .get(protect, getInvoiceByInvoiceNumber)
  .put(protect, updateInvoiceByInvoiceNumber)
  .delete(protect, deleteInvoiceByInvoiceNumber);

export default router;
