import express from "express";
import user from "../Controller/player.controller.js";


const router = express.Router()
// router.post('/', user.createSmth)

router.post('/buatPkrj', user.createPekerjaan)
router.post('/buatUser', user.createUser)
router.post('/buatPeng', user.createPenghasilan)
// router.get('/buatIncome', user.createIncome)

export default router;
