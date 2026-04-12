const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const {
  createItem,
  getItems,
  updateItem,
  deleteItem
} = require('../controllers/itemController');


// CREATE
router.post('/', authMiddleware, createItem);


// READ
router.get('/', authMiddleware, getItems);


// UPDATE
router.put('/:id', authMiddleware, updateItem);


// DELETE
router.delete('/:id', authMiddleware, deleteItem);


module.exports = router;