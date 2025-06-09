import { Router } from "express";
import { checkRecord, getRecords } from "../controllers/attendanceController.js";

const router = Router();

router.post('/record', checkRecord)
router.get('/get-records', getRecords)

export default router;