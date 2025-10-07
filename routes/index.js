import express from "express";
import { getCategory, getExplore, getIndex,getSingleCard,getFaqPage,getAboutPage,getContactPage,getPrivacy,getTerms } from "../controllers/index.js";

const router = express.Router();



router.get('/', getIndex);
router.get('/fetchtemplate/:id', getSingleCard);
// router.get("/get-single-category", getCategory)
router.get("/categories/:cat", getCategory)
router.get("/explore/:page?", getExplore)
router.get("/about-us/", getAboutPage)
router.get("/contact-us/", getContactPage)
router.get("/faq/", getFaqPage)
router.get("/privacy-policy/", getPrivacy)
router.get("/terms-and-conditions/", getTerms)

export default router;