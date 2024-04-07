import http from 'http'
import express from 'express'
import player from './Routes/player.route.js'

const app = express()
const port = 8000
//middleware
app.use(express.json());
//routes
app.use('/user', player)
app.get('/ping', (req, res, next)=>{
    return res.status(200).json({
        nama:"peniel",
        hobi:"memasak",
        umur:200000
    })
})

const server = http.createServer(app)
server.listen(port, () => {
    console.log( `Listening on ${port}...` )
})