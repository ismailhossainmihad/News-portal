const News = require('../models/News');

// @desc    Get top 6 latest news
// @route   GET /api/news/top
// @access  Public
const getTopNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 }).limit(6).populate('author', 'name');
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all news
// @route   GET /api/news
// @access  Public
const getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 }).populate('author', 'name');
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single news by id
// @route   GET /api/news/:id
// @access  Public
const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id).populate('author', 'name email');
    if (news) {
      res.json(news);
    } else {
      res.status(404).json({ message: 'News not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a news article
// @route   POST /api/news
// @access  Private
const createNews = async (req, res) => {
  const { title, content, imageUrl } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Please include title and content' });
  }
  try {
    const news = await News.create({
      title,
      content,
      imageUrl,
      author: req.user._id,
    });
    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a news article
// @route   PUT /api/news/:id
// @access  Private
const updateNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    // Ensure user is the author
    if (news.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this news' });
    }
    news.title = req.body.title || news.title;
    news.content = req.body.content || news.content;
    news.imageUrl = req.body.imageUrl || news.imageUrl;
    const updatedNews = await news.save();
    res.json(updatedNews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a news article
// @route   DELETE /api/news/:id
// @access  Private
const deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    // Ensure user is the author
    if (news.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this news' });
    }
    await news.remove();
    res.json({ message: 'News removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTopNews,
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
};