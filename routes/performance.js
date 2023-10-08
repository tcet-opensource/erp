import express from "express";
import performacontroller from '#controller/performance';

const router = express.Router();

router.get('/test', performacontroller)

export default router;