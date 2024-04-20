import { Router } from "express";

import updaterol from "../controllers/updaterole.controller.js";

const router = Router();
const role = new updaterol()

// Ruta para cambiar el rol del usuario
router.put('/:uid', role.update);

export default router;