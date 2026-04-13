const db = require('../config/db');


// CREATE ITEM
exports.createItem = async (req, res) => {

  try {

    const { title, description } = req.body;

    await db.query(
      'INSERT INTO items (user_id, title, description) VALUES (?, ?, ?)',
      [req.user.id, title, description]
    );

    res.json({
      message: "Item created successfully"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};



// GET ITEMS
exports.getItems = async (req, res) => {

  try {

    const [items] = await db.query(
      'SELECT * FROM items WHERE user_id = ?',
      [req.user.id]
    );

    res.json(items);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};



// UPDATE ITEM
exports.updateItem = async (req, res) => {

  try {

    const { id } = req.params;
    const { title, description } = req.body;

    await db.query(
      'UPDATE items SET title=?, description=? WHERE id=? AND user_id=?',
      [title, description, id, req.user.id]
    );

    res.json({
      message: "Item updated successfully"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};



// DELETE ITEM
exports.deleteItem = async (req, res) => {

  try {

    const { id } = req.params;

    await db.query(
      'DELETE FROM items WHERE id=? AND user_id=?',
      [id, req.user.id]
    );

    res.json({
      message: "Item deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};