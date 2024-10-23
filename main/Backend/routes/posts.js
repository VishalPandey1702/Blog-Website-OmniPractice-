// const express = require('express');
// const Post = require('../models/Post');
// const router = express.Router();

// // Get all posts
// router.get('/', async (req, res) => {
//   const posts = await Post.find();
//   res.json(posts);
// });

// // Create a new post
// router.post('/', async (req, res) => {
//   const { title, content, tags } = req.body;
//   const newPost = new Post({ title, content, tags });
//   await newPost.save();
//   res.json(newPost);
// });

// module.exports = router;



const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new post
router.post('/', async (req, res) => {
  const { title, content, tags } = req.body;
  const newPost = new Post({ title, content, tags });
  try {
    await newPost.save();
    res.json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a post by ID
router.put('/:id', async (req, res) => {
  const { title, content, tags } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, tags },
      { new: true } // Return the updated document
    );
    if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a post by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;