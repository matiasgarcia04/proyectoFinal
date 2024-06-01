import { Router } from "express";
import cartctrl from "../controllers/cartViews.routers.controller.js";

const router = Router();
const controllercart = new cartctrl();

router.get("/:cid", controllercart.getCart)

router.post("/:cid/purchase",controllercart.purchase)

export default router