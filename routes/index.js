import express from "express";
import { getCategory, getExplore, getIndex,getSingleCard } from "../controllers/index.js";

const router = express.Router();



router.get('/', getIndex);
router.get('/fetchtemplate/:id', getSingleCard);
router.get("/get-single-category", getCategory)
router.get("/explore", getExplore)
router.get("/about-us/",(req,res)=>{ res.render("about-us")})
router.get("/contact-us/",(req,res)=>{ res.render("contact-us")})
router.get("/frequently-asked-questions/",(req,res)=>{ res.render("faq")})

export default router;