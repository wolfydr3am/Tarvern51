const Link = require('../models/Link');

exports.createLink = async (req, res) => {
  const { title, url, category } = req.body;

  if (!title || !url || !category) {
    return res.status(400).json({ error: 'All fields required' });
  }

  const link = await Link.create({
    title,
    url,
    category
  });

  res.json({ success: true, link });
};
