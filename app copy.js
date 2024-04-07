import http from 'http'
import fs from 'fs'

// const vb = fs.writeFile('./profile', 'Halooo')
// const port = 8000
// const serverP = http.createServer((req, res)=>{
//     let apaIni = ''
//     req.on('data',(chunk)=>{
//         apaIni = apaIni+Buffer.from(chunk).toString()
//     })
//     req.on('end', ()=>{
//         console.log(apaIni)
//         const tes = JSON.parse(apaIni);
//         tes.ipk = 90
//         tes.sapa = "Haloo"
//         // const peniel = {
//         //     nama: "Peniel",
//         //     kelas: "MTN 4-4",
//         //     crush: "Febriola",
//         //     persenKeterima:0.20,
//         //     status:"hidup"
//         // }; 
//         res.setHeader("Content-Type", "application/json")
//         return res.end(JSON.stringify(tes))
//     })
// })
serverP.listen(port,()=>{
    console.log("YeaY udh kehubung nich")
})