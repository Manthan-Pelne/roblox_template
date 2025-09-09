import Card from "../models/AllCard.js";




export const getIndex = async (req, res) => {
  try {
    const page = parseInt(req.params.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;
    const cards = await Card.find().skip(skip).limit(limit).sort({ createdAt: -1 });
    const trending = await Card.find().limit(12)
    //console.log("trending",trending)
    const totalTests = await Card.countDocuments();
    // Calculate total pages
    const totalPages = Math.ceil(totalTests / limit);
    res.render("index", {
      cards,
      trending,
      totalPages,
      currentPage : page
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const getSingleCard = async (req, res) => {
  try {
    const id = req.params.id
     const page = parseInt(req.params.page) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;
    const cards = await Card.find().skip(skip).limit(limit).sort({ createdAt: -1 });
    const totalTests = await Card.countDocuments();
    // Calculate total pages
    const totalPages = Math.ceil(totalTests / limit);
    const card = await Card.find({_id : id });
       res.render("getSingleCard", {
      card,
      cards,
      totalPages,
      currentPage : page
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};


export const getExplore = async(req,res)=>{
  try {
    const page = parseInt(req.params.page) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;
    const cards = await Card.find().skip(skip).limit(limit).sort({ createdAt: -1 });
    const totalTests = await Card.countDocuments();
    // Calculate total pages
    const totalPages = Math.ceil(totalTests / limit);
    res.render("explore", {
      cards,
      totalPages,
      currentPage : page
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}


export const getCategory = async(req,res)=>{
  try {
    const page = parseInt(req.params.page) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;
    const cards = await Card.find().skip(skip).limit(limit).sort({ createdAt: -1 });
    const totalTests = await Card.countDocuments();
    // Calculate total pages
    const totalPages = Math.ceil(totalTests / limit);
    res.render("singleCategoryPage", {
      cards,
      totalPages,
      currentPage : page
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}