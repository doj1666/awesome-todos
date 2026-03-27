const { ObjectId } = require("mongodb");
const express = require("express");
const router = express.Router();
const { getCollection } = require("./models/index");

// GET /todos
router.get("/todos", async (req, res) => {
  try {
    const collection = getCollection();
    const todos = await collection.find({}).toArray();
    res.status(200).json(todos);
  } catch (error) {
    console.error("GET todos error:", error);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// POST /todos
router.post("/todos", async (req, res) => {
  try {
    const collection = getCollection();
    let { todo } = req.body; if (!todo || todo.trim().length === 0) {
      return res.status(400).json({ error: "Todo text required" });
    }
    todo = String(todo).trim();
  
    const newTodo = await collection.insertOne({ todo, status: false });
  
    res.status(201).json({ todo, status: false, _id: newTodo.insertedId });
  } catch (error) {
    console.error("POST todo error:", error);
    res.status(500).json({ error: "Failed to create todo" });
  }
});
// DELETE /todos/:id
router.delete("/todos/:id", async (req, res) => {
  try {
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);
  
    const deletedTodo = await collection.deleteOne({ _id });
    if (deletedTodo.deletedCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("DELETE todo error:", error);
    res.status(500).json({ error: "Failed to delete todo" });
  }
});


// PUT /todos/:id
router.put("/todos/:id", async (req, res) => {
  try {
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);
    const { status } = req.body;

    if (typeof status !== "boolean") {
        return res.status(400).json({ error: "Status must be boolean" });
    }
  
    const updatedTodo = await collection.updateOne({ _id }, { $set: { status: !status } });
    if (updatedTodo.matchedCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("PUT todo error:", error);
    res.status(500).json({ error: "Failed to update todo" });
  }
});
module.exports = router;