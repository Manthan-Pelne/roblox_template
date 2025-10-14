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

export const getSingleTemplate = async (req, res) => {
  try {
    const slug = req.params.slug
    const page = parseInt(req.params.page) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;
    const template = await Card.findOne({slug : slug }).populate("category");

    if (!template) return res.render('404.html');

    const cards = await Card.find({ category: template.category._id }).populate("category").sort({ createdAt: -1, _id: -1  }).skip(skip).limit(limit);
    const categories = await getAllCategories(req)
    const totalTests = await Card.countDocuments();
    // Calculate total pages
    const totalPages = Math.ceil(totalTests / limit);
       res.render("template/_slug.html", {
      template,
      categories,
      cards,
      totalPages,
      currentPage : page,
      imgUrl : process.env.R2_CDN_URL,
      navigation : 'template'
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const getTemplate = async(req,res)=>{
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
    res.render("template/index.html", {
      cards,
      categories,
      totalPages,
      currentPage : page,
       imgUrl : process.env.R2_CDN_URL,
      navigation : 'template'
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

export const getCategory = async (req, res) => {
  try {
    const cat = req.params.cat;
    const pageParam = req.params.page;
      if (pageParam && isNaN(pageParam)) {
      return res.status(404).render("404.html", { url: req.originalUrl });
    }

    
    const page = Math.max(parseInt(pageParam) || 1, 1);
    const limit = 6;
    const skip = (page - 1) * limit;
    const catId = await category.findOne({ slug: cat });

    if (!catId) return res.render('404.html');
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
      navigation : 'categories'
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const getAllCategory = async (req, res) => {
  try {
    
    const categories = await getAllCategories(req);

    res.render("category/index.html", {
      categories,
      navigation : 'categories'
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
      navigation : 'About us'
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
       navigation : 'Contact us'
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
       navigation : 'faq'
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
       navigation : 'privacy policy'
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
       navigation : 'terms and condition'
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

export const searchTemplate = async (req, res) => {
  try {
    const query = req.query.q?.trim().toLowerCase();
      if (!query) {
        return res.render("_include/blank/filtercard", { 
          filteredcards: [],
           query: "",
         });
      }

    // Build MongoDB query to match by name, category.title, or description
    const filteredcards = await Card.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ]
    })
    .populate({
      path: 'category',
      match: { title: { $regex: query, $options: 'i' } } // search in populated category title
    })
    .limit(20); // prevent too many results, adjust as needed

    // Remove cards where category didn’t match (populate returns null)
    const visibleCards = filteredcards.filter(c => c.category !== null || c.name || c.description);

    res.render("_include/blank/filtercard", { 
      filteredcards: visibleCards ,   
        query,
      imgUrl : process.env.R2_CDN_URL,
      });

  } catch (err) {
    console.error("Error during search:", err);
    res.status(500).json({ error: 'Search failed', details: err.message });
  }
};


export const download = async (req, res) => {
  try {
    const filePath = req.params[0]; // this gets everything after /download/
    const imageUrl = `https://pub-adea3c1c384d44aa8e5a76fd9362a6e3.r2.dev/${filePath}`;

    const response = await fetch(imageUrl);
    if (!response.ok) {
      return res.status(404).send('File not found');
    }

    const buffer = await response.arrayBuffer();

    const filename = filePath.split('/').pop(); // get last part of path
    res.set({
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Type': 'image/png'
    });
    res.send(Buffer.from(buffer));
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};