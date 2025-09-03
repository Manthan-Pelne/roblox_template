import Card from "../models/allCard.js";



export const getIndex = async (req, res) => {
  try {
    const page = parseInt(req.params.page) || 1;
    const limit = 8;
    const skip = (page - 1) * limit;
    const cards = await Card.find().skip(skip).limit(limit).sort({ createdAt: -1 });
    const totalTests = await Card.countDocuments();
    // Calculate total pages
    const totalPages = Math.ceil(totalTests / limit);
    res.render("index", {
      cards,
      totalPages,
      currentPage : page
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const getTemplate = async (req, res) => {
  try {
    const id = req.params.id
    const cards = await Card.find({code : id });
    console.log(id)
    console.log(cards)
     res.json({ cards });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};



