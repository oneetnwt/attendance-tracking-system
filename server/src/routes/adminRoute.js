import { Router } from "express";
import { addUser } from '../controllers/adminController.js'

const router = Router();

router.post('/add-user', addUser)

export default router;