import express from "express";
import user from "../Controller/player.controller.js";



const router = express.Router()
// router.post('/', user.createSmth)

// router.get('/getAll', user.getAll.bind(user))
// router.post('/test', user.tes.bind(user))
router.post('/buatPkrj', user.createPekerjaan.bind(user))
router.post('/buatUser', user.createUser.bind(user))
router.post('/buatPeng', user.createPenghasilan.bind(user))
router.post('/getAll', user.getAll.bind(user))
// router.get('/buatIncome', user.createIncome.bind(user))

export default router;
