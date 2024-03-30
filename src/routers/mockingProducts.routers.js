import { Router } from "express";
import mockingctrl from "../controllers/mockingProducts.controller.js"

const router = Router();
const mockctrl = new mockingctrl();

router.get('/',mockctrl.generate);

export default router
