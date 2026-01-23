const Link = require('../models/Link');

exports.createLink = async (req, res) => {
  try {
    let { title, url, directUrl, category } = req.body;

    if (!title || !url || !directUrl || !category) {
      return res.status(400).json({ error: 'All fields required' });
    }

    // --- STEP 1: Duplicate Prevention ---
    // Check if this specific destination link was already created recently
    const existingLink = await Link.findOne({ directUrl: directUrl }).sort({ createdAt: -1 });
    
    if (existingLink) {
      console.log(`[Tavern] Duplicate detected. Returning existing link for: ${title}`);
      return res.json({ success: true, link: existingLink });
    }

    // --- STEP 2: Suffix Logic ---
    if (category !== 'OF-Models') {
      const initials = title
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();

      const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const count = await Link.countDocuments({ 
        title: { $regex: new RegExp(`^${escapedTitle}`, 'i') } 
      });

      title = `${title} - ${initials}${count + 1}`;
    }

    const link = await Link.create({
      title,
      url,
      directUrl,
      category
    });

    res.json({ success: true, link });
  } catch (error) {
    console.error("Create Link Error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};