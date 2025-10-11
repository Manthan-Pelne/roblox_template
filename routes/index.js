import express from "express";
import { getCategory, getExplore, getIndex,getSingleCard,getFaqPage,getAboutPage,getContactPage,getPrivacy,getTerms,searchTemplate } from "../controllers/index.js";

const router = express.Router();



router.get('/', getIndex);
router.get('/fetchtemplate/:slug', getSingleCard);
// router.get("/get-single-category", getCategory)
router.get("/categories/:cat/:page?", getCategory)
router.get("/explore/:page?", getExplore)
router.get("/about-us/", getAboutPage)
router.get("/contact-us/", getContactPage)
router.get("/faq/", getFaqPage)
router.get("/privacy-policy/", getPrivacy)
router.get("/terms-and-conditions/", getTerms)
router.get("/search-query/", searchTemplate)

export default router;