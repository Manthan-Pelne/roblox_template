import express from "express";
import { getIndex } from "../controllers/index.js";

const router = express.Router();

router.get('/', getIndex);
router.get("/about-us/",(req,res)=>{ res.render("about-us")})


export default router;