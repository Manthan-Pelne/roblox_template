import express from "express";
import { getIndex } from "../controllers/index.js";

const router = express.Router();



router.get('/', getIndex);
router.get("/about-us/",(req,res)=>{ res.render("about-us")})
router.get("/contact-us/",(req,res)=>{ res.render("contact-us")})
router.get("/frequently-asked-questions/",(req,res)=>{ res.render("faq")})

export default router;