import asyncHandler from 'express-async-handler';
import Item from '../models/Item.js';

// @desc    Create new item
// route    POST /api/items/
// @access  Public
export const createItem = asyncHandler(async (req, res) => {
  const { item_name, price } = req.body;
  const newItem = await Item.create({ item_name, price });

  return res.status(201).json({ message: 'Item Created', item: newItem });
});

// @desc    Get all items
// route    GET /api/items
// @access  Public
export const getAllItems = asyncHandler(async (req, res) => {
  const items = await Item.findAll({
    attributes: ['item_id', 'item_name', 'price'],
  });

  return res.status(200).json({ items });
});

// @desc    Get item by id
// route    GET /api/items/:id
// @access  Public
export const getItemById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await Item.findByPk(id, {
    attributes: ['item_id', 'item_name', 'price'],
  });

  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  return res.status(200).json({ item });
});

// @desc    Delete item by id
// route    DELETE /api/items/:id
// @access  Public
export const deleteItemById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const item = await Item.findByPk(id, {
    attributes: ['item_id', 'item_name', 'price'],
  });

  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  await item.destroy();

  return res.status(204).json({ message: 'Item Deleted' });
});
