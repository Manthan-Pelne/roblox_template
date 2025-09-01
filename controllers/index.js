import Card from "../models/allCard.js";


export const getIndex = async (req, res) => {
  try {

    const cards = await Card.find()
    res.render("index", {
      cards,
      location: null,
      error: null
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
  
};


