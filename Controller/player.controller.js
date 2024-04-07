import fs from 'fs'
import crypto from 'crypto'


class user {

    //ini buat Pekerjaan
    static createPekerjaan = (req, res, next)=>{
        //ngambil inputan dari UI/Frontend dan dibuatkan objek
        const user = req.body;
        //verif (ini sebenarnya jelek tpi apakah kita mau instal npm verif)
        if(!user.nama || !user.gaji || !user.lama_bekerja){
            return res.status(400).send("Mohon isi data berupa, nama, gaji, dan lama_bekerja")
        }
        //ini belum dibuat function biar bisa dipake di semua static
        const date = new Date()
        const formatDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}` 
        user.createdAt = formatDate;
        user.id = crypto.randomInt(0, 30)
        

        //inibuatfile
        fs.writeFileSync('./Database/Pekerjaan/'+ user.nama+'.json',JSON.stringify(user));

        return res.status(201).json(user)
    }

    //ini buat user
    static createUser = (req, res, next)=>{
        //baca folder pekerjaan
        const bacaDir = fs.readdirSync('./Database/Pekerjaan')
        const datas = []
        for(const file of bacaDir){
            const bacaFile = fs.readFileSync('./Database/Pekerjaan/' + file)
            const data = Buffer.from(bacaFile.toString('utf-8'))
            const bacaProfile = JSON.parse(data)
            
            datas.push(bacaProfile);
        }
        //ini buat cek apakah dia udh buat di pekerjaan
        let result
        for(let i = 0; i < datas.length; i ++){
            const data = req.body
            if (datas[i].nama == data.nama) {
                result = 1
                break          
            }
        }
        if (result == 1){
            //klo udh baru boleh input
            const data = req.body
            if(!data.nama || !data.gender || !data.alamat){
                res.status(400).send("Mohon isi data kamu dengan benar")
            }
            //ini belum dibuat function biar bisa dipake di semua static
            const date = new Date()
            const formatDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
            data.timeStamp = formatDate
            data.IdUser = crypto.randomInt(0, 30)

            fs.writeFileSync('./Database/User/'+ data.nama+'.json',JSON.stringify(data));
            return res.json(data)
        }
        return res.send("Akun kamu blum ada")
    }

    //ini buat penghasilan dengan syarat harus udh buat user
    static createPenghasilan(req,res,next){
        const bacaDir = fs.readdirSync('./Database/User')
        const datas = []
        for(const file of bacaDir){
            const bacaFile = fs.readFileSync('./Database/User/' + file)
            const data = Buffer.from(bacaFile.toString('utf-8'))
            const bacaProfile = JSON.parse(data)
            
            datas.push(bacaProfile);
        }
        let found = false
        for(let i = 0; i < datas.length; i ++){
            const data = req.body
            if (datas[i].nama == data.nama) {
                //di filter lagi karna nama kan di pekerjaan ada juga
                if(datas[i].IdUser != null){
                    found = true
                    break
                }         
            }
        }
        if (found == true){
            const data = req.body
            if(!data.nama || !data.bank || !data.Income || !data.penghasilanLainnya){
                res.status(400).send("Mohon isi data kamu dengan benar")
            }
            let total = data.Income + data.penghasilanLainnya
            data.penghasilanTotal = total
            const date = new Date()
            const formatDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
            data.timeStamp = formatDate
            data.PenghasilanId = crypto.randomInt(0,30)
            
            fs.writeFileSync('./Database/Penghasilan/'+ data.nama+'.json',JSON.stringify(data));
            return res.json(data)
        }
        return res.send("Akun kamu blum ada")

    }                   
    
}

export default user;