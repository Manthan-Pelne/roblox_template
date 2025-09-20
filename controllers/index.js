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
    const cards = await Card.find().skip(skip).limit(limit).sort({ createdAt: -1 });
    const trending = await Card.find().limit(12)
    const categories = await getAllCategories(req)
    const totalTests = await Card.countDocuments();
    const tshirt = await Card.find({category : { $regex: '^t-shirts$', $options: 'i' }}).sort({createdAt: -1 }).limit(6);
    const shirt = await Card.find({category : { $regex: '^shirts$', $options: 'i' }}).sort({createdAt: -1 }).limit(6);
    const pant = await Card.find({category : { $regex: '^pant$', $options: 'i' }}).sort({createdAt: -1 }).limit(6);
    const mostdownloads = await Card.find().sort({ downloads: -1, createdAt: -1 }).limit(18);
    
    // Calculate total pages
    const totalPages = Math.ceil(totalTests / limit);
    res.render("index", {
      cards,
      categories,
      trending,
      totalPages,
      currentPage : page,
      mostdownloads,
      tshirt,
      shirt,
      pant
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
    const limit = 18;
    const skip = (page - 1) * limit;
    const cards = await Card.find().skip(skip).limit(limit).sort({ createdAt: -1 });
     const categories = await getAllCategories(req)
    const totalTests = await Card.countDocuments();
    // Calculate total pages
    const totalPages = Math.ceil(totalTests / limit);
    const card = await Card.find({_id : id });
       res.render("getSingleCard", {
      card,
      categories,
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
    const limit = 30;
    const skip = (page - 1) * limit;
    const cards = await Card.find().skip(skip).limit(limit).sort({ createdAt: -1 });
    // const cards = await Card.find();
     const categories = await getAllCategories(req)
    const totalTests = await Card.countDocuments();
    // Calculate total pages
    const totalPages = Math.ceil(totalTests / limit);
    res.render("explore", {
      cards,
      categories,
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
    const cat = req.params.cat;
    const page = parseInt(req.params.page) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;
    const cards = await Card.find();
     const categories = await getAllCategories(req)
    const totalTests = await Card.countDocuments();
    // Calculate total pages
    const totalPages = Math.ceil(totalTests / limit);
    res.render("category/_slug.html", {
      cards,
      categories,
      totalPages,
      currentPage : page,
      categoryName : cat
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

// static pages 
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