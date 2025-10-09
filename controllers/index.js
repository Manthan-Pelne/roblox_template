import Card from "../models/AllCard.js";
import category from "../models/category.js";
import Category from "../models/category.js";

const getAllCategories = async (req,res)=>{
  try {
      const categories = await Category.find()
      return categories
  } catch (error) {
    console.log(error)
  }
}


export const getIndex = async (req, res) => {
  try {
    const page = parseInt(req.params.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;
    const cards = await Card.find().skip(skip).limit(limit).sort({ createdAt: -1 }).populate("category");
    const trending = await Card.find().limit(12).populate("category")
    const categories = await getAllCategories(req)
    const totalTests = await Card.countDocuments();
    
    const tshirt = await Card.aggregate([
  {
    $lookup: {
      from: "categories", // collection name for Category
      localField: "category",
      foreignField: "_id",
      as: "category"
    }
  },
  { $unwind: "$category" },
  { $match: { "category.title": "t-shirts" } },
  { $sort: { createdAt: -1 } },
  { $limit: 12 }
]);
    const shirt = await Card.aggregate([
  {
    $lookup: {
      from: "categories", // collection name for Category
      localField: "category",
      foreignField: "_id",
      as: "category"
    }
  },
  { $unwind: "$category" },
  { $match: { "category.title": "shirts" } },
  { $sort: { createdAt: -1 } },
  { $limit: 12 }
]);
    const pant = await Card.aggregate([
  {
    $lookup: {
      from: "categories", // collection name for Category
      localField: "category",
      foreignField: "_id",
      as: "category"
    }
  },
  { $unwind: "$category" },
  { $match: { "category.title": "Pant" } },
  { $sort: { createdAt: -1 } },
  { $limit: 12 }
]);
    const mostdownloads = await Card.find().sort({ downloads: -1, createdAt: -1 }).limit(18).populate("category");
    // Calculate total pages
    const totalPages = Math.ceil(totalTests / limit);
    res.render("index", {
      cards,
      categories,
      trending,
      tshirt,
      shirt,
      pant,
      totalPages,
      currentPage : page,
      mostdownloads,
      imgUrl : process.env.R2_CDN_URL,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const getSingleCard = async (req, res) => {
  try {
    const slug = req.params.slug
    const page = parseInt(req.params.page) || 1;
    const limit = 18;
    const skip = (page - 1) * limit;
    const cards = await Card.find().skip(skip).limit(limit).sort({ createdAt: -1 }).populate("category");
     const categories = await getAllCategories(req)
    const totalTests = await Card.countDocuments();
    // Calculate total pages
    const totalPages = Math.ceil(totalTests / limit);
    const card = await Card.find({slug : slug }).populate("category");
       res.render("getSingleCard", {
      card,
      categories,
      cards,
      totalPages,
      currentPage : page,
      imgUrl : process.env.R2_CDN_URL,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const getExplore = async(req,res)=>{
  try {
    const page = parseInt(req.params.page) || 1;
    const limit = 18;
    const skip = (page - 1) * limit;
    const cards = await Card.find().skip(skip).limit(limit).sort({ createdAt: -1 }).populate("category");
    // const cards = await Card.find();
     const categories = await getAllCategories(req)
    const totalTests = await Card.countDocuments();
    // Calculate total pages
    const totalPages = Math.ceil(totalTests / limit);
    res.render("explore", {
      cards,
      categories,
      totalPages,
      currentPage : page,
       imgUrl : process.env.R2_CDN_URL
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

export const getCategory = async (req, res) => {
  try {
    const cat = req.params.cat;
    const page = parseInt(req.params.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;
    const catId = await category.findOne({ slug: cat });
    if (!catId) return res.status(404).send("Category not found");
    const cards = await Card.find({ category: catId._id }).sort({ createdAt: -1, _id: -1  }).skip(skip).limit(limit).populate("category");
    
    const categories = await getAllCategories(req);
    const totalTests = await Card.countDocuments({ category: catId._id });
    const totalPages = Math.ceil(totalTests / limit);

    res.render("category/_slug.html", {
      cards,
      length: cards.length,
      categories,
      totalPages,
      currentPage: page,
      categoryName: cat,
      imgUrl: process.env.R2_CDN_URL,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};



export const getAboutPage = async(req,res)=>{
try {
    const cards = await Card.find();
    const categories = await getAllCategories(req)
    res.render("about-us", {
      cards,
      categories,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

export const getContactPage = async(req,res)=>{
try {
    const categories = await getAllCategories(req)
    // res.render("terms-and-conditions", {
    // res.render("privacy-policy", {
    res.render("contact-us", {
      categories,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

export const getFaqPage = async(req,res)=>{
  try {
    const categories = await getAllCategories(req)
    res.render("faq", {
      categories,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

export const getPrivacy = async(req,res)=>{
  try {
    const categories = await getAllCategories(req)
    res.render("privacy-policy", {
      categories,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

export const getTerms = async(req,res)=>{
  try {
    const categories = await getAllCategories(req)
    res.render("terms-and-conditions", {
      categories,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}