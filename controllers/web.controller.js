const Link = require('../models/Link');

exports.home = async (req, res) => {
  const links = await Link.find()
    .sort({ createdAt: -1 })
    .limit(10);

  res.render('pages/index', { links });
};

exports.search = async (req, res) => {
  const q = req.query.q || '';

  const links = await Link.find({
    $text: { $search: q }
  });

  res.render('pages/search', { links, q });
};

exports.category = async (req, res) => {
  const category = req.params.name;

  const links = await Link.find({ category })
    .sort({ createdAt: -1 });

  res.render('pages/category', { links, category });
};
