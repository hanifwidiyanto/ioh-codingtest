import asyncHandler from "express-async-handler";
import Invoice from "../models/Invoice.js";
import InvoiceItem from "../models/InvoiceItem.js";
import Item from "../models/Item.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

// @desc    Create new invoice
// route    POST /api/invoices
// @access  Private
export const createInvoice = asyncHandler(async (req, res) => {
  const { items } = req.body;
  const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);

  const invoice_number = uuidv4().substr(0, 8);

  const now = new Date();
  const oneDay = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const due_date = Math.floor(oneDay.getTime() / 1000);

  const itemIds = items.map((item) => item.item_id);
  const existingItems = await Item.findAll({ where: { item_id: itemIds } });
  const existingItemIds = existingItems.map((item) => item.item_id);

  const nonExistingItemIds = itemIds.filter(
    (itemId) => !existingItemIds.includes(itemId)
  );

  if (nonExistingItemIds.length > 0) {
    res.status(400);
    throw new Error(`Item ID ${nonExistingItemIds.join(", ")} do not exist`);
  }

  let total_price = 0;
  for (const item of items) {
    const itemData = existingItems.find(
      (item) => item.item_id === item.item_id
    );
    total_price += itemData.price * item.quantity;
  }

  const invoice = await Invoice.create({
    invoice_number,
    due_date,
    total_price,
    user_id: decoded.id,
  });

  for (const item of items) {
    await InvoiceItem.create({
      invoice_id: invoice.invoice_id,
      item_id: item.item_id,
      quantity_item: item.quantity,
    });
  }

  return res.status(201).json({ invoice });
});

// @desc    Get all invoices
// route    GET /api/invoices
// @access  Private
export const getAllInvoices = asyncHandler(async (req, res) => {
  const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const { count, rows } = await Invoice.findAndCountAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: {
      model: InvoiceItem,
      attributes: {
        exclude: ["createdAt", "updatedAt", "invoice_id", "item_id"],
      },
      include: {
        model: Item,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    },
    where: {
      user_id: decoded.id,
    },
    limit,
    offset,
  });

  const totalPages = Math.floor((Math.ceil(count / limit) + 1) / 2);

  return res.status(200).json({ invoices: rows, totalPages });
});

// @desc    Get invoice by Invoice Number
// route    GET /api/invoices/:id
// @access  Private
export const getInvoiceByInvoiceNumber = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);

  const invoice = await Invoice.findOne({
    where: { invoice_number: id, user_id: decoded.id },
    include: {
      model: InvoiceItem,
      include: Item,
    },
  });

  if (!invoice) {
    return res.status(404).json({ message: "Invoice not found" });
  }

  return res.status(200).json({ invoice });
});


// @desc    Update invoice by Invoice Number
// route    PUT /api/invoices/:id
// @access  Private
export const updateInvoiceByInvoiceNumber = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { invoice_number, due_date, items } = req.body;
  const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);

  const invoice = await Invoice.findOne({
    where: { invoice_number: id, user_id: decoded.id },
  });

  if (!invoice) {
    return res.status(404).json({ message: "Invoice not found" });
  }

  let total_price = 0;
  const invoiceItems = [];

  for (const item of items) {
    const itemData = await Item.findByPk(item.item_id);
    total_price += itemData.price * item.quantity;
    invoiceItems.push({
      invoice_id: invoice.invoice_id,
      item_id: item.item_id,
      quantity_item: item.quantity,
    });
  }

  await Invoice.update(
    { invoice_number, due_date, total_price },
    { where: { invoice_number: id, user_id: decoded.id } }
  );

  await InvoiceItem.destroy({ where: { invoice_id: invoice.invoice_id } });

  await InvoiceItem.bulkCreate(invoiceItems);

  return res.status(200).json({ message: "Invoice updated successfully" });
});

// @desc    Delete invoice by Invoice Number
// route    DELETE /api/invoices/:id
// @access  Private
export const deleteInvoiceByInvoiceNumber = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
  
  const invoice = await Invoice.findOne({
    where: { invoice_number: id, user_id: decoded.id },
  });
  console.log(invoice)
  if (!invoice) {
    return res.status(404).json({ message: "Invoice not found" });
  }

  await Invoice.destroy({ where: { invoice_number: id, user_id: decoded.id } });
  await InvoiceItem.destroy({ where: { invoice_id: invoice.invoice_id } });

  return res.status(200).json({ message: "Invoice deleted successfully" });
});
