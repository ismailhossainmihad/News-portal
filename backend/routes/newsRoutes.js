const express = require('express');
const router = express.Router();
const {
  getTopNews,
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} = require('../controllers/newsController');
const { protect } = require('../middleware/authMiddleware');

// Top 6 news
router.get('/top', getTopNews);

// All news
router.get('/', getAllNews);

// Single news
router.get('/:id', getNewsById);

// Create news
router.post('/', protect, createNews);

// Update news
router.put('/:id', protect, updateNews);

// Delete news
router.delete('/:id', protect, deleteNews);

module.exports = router;