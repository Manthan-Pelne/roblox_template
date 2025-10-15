import express from "express";
import { getCategory, getAllCategory ,getTemplate, getSingleTemplate , getIndex,getFaqPage,getAboutPage,getContactPage,getPrivacy,getTerms,searchTemplate,download } from "../controllers/index.js";

const router = express.Router();



router.get('/', getIndex);
router.get('/template/:slug', getSingleTemplate);
// router.get("/get-single-category", getCategory)
router.get("/categories/", getAllCategory)
router.get("/categories/:cat/:page?", getCategory)
router.get("/template/:page?", getTemplate)
router.get("/about-us/", getAboutPage)
router.get("/contact-us/", getContactPage)
router.get("/faq/", getFaqPage)
router.get("/privacy-policy/", getPrivacy)
router.get("/terms-and-conditions/", getTerms)
router.get("/search-query/", searchTemplate)
router.get("/download/:id/*", download)
router.get('*', (req, res) => res.render('404.html'));



export default router;