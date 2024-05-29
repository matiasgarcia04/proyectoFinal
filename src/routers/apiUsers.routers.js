import { Router } from "express";
import { uploader } from "../utils/multer.js";
import filesload from "../controllers/apiuserdocuments.js";

import updaterol from "../controllers/updaterole.controller.js";

const router = Router();
const role = new updaterol()
const fileload = new filesload()

router.post('/:uid/documents', uploader.single('documents'), fileload.documents);

router.post('/:uid/products', uploader.single('products'), fileload.products);

router.post('/:uid/profile', uploader.single('profile'), fileload.profile);

router.put('/premium/:uid', role.update);

export default router;