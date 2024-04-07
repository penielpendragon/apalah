import fs from 'fs'
import crypto from 'crypto'
import { ALL } from 'dns'
import { profile } from 'console'
import { Readline } from 'readline'


class user {
    // static getAll = (req, res, next)=>{
    //     const isi = []
    //     const filename = fs.readdirSync('./Database')
    //     for( const file of filename){
    //         const baca = fs.readFileSync('./Database/' + file)
    //         const data = Buffer.from(baca.toString('utf-8'));
    //         const user = JSON.parse(data)
    
    //         //membuat kolom waktu mengakses
    //         const date = new Date()
    //         const formatDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}` 
    //         user.accessAt = formatDate;
    
    //         isi.push(user);
    //     }
    //     return res.status(201).json(isi)
    // }

    // static createSmth = (req, res, next)=>{
    //     const user = req.body;
    //     if(!user.name || !user.email || !user.nim || !user.hobby){
    //         return res.status(400).send("Mohon isi data dengan lengkap")
            
    //     }
    //     const date = new Date()
    //     const formatDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}` 
    //     user.createdAt = formatDate;
    //     user.selamat = "NAH GITU DONG"
    //     user.id = crypto.randomUUID();

    //     fs.writeFileSync('./Database/'+ user.name+ '.json' , JSON.stringify(user));

    //     return res.status(201).json(user)
    // }
    
    // static bacaFolder(namaFolder, res) {
    //     const bacaDir = fs.readdirSync('./Database/' + namaFolder)
    //     const array = []
    //     for(const file of bacaDir){
    //         const bacaFile = fs.readFileSync('./Database/' + namaFolder + '/' + file)
    //         const data = Buffer.from(bacaFile.toString('utf-8'))
    //         const bacaProfile = JSON.parse(data)
            
    //         array.push(bacaProfile);
    //     }
    //     return res.json(array)
        
    // }
    
    static createPekerjaan = (req, res, next)=>{
        const user = req.body;
        if(!user.nama || !user.gaji || !user.lama_bekerja){
            return res.status(400).send("Mohon isi data berupa, nama, gaji, dan lama_bekerja")
        }
        const date = new Date()
        const formatDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}` 
        user.createdAt = formatDate;
        user.id = crypto.randomUUID();

        fs.writeFileSync('./Database/Pekerjaan/'+ user.nama+'.json',JSON.stringify(user));

        return res.status(201).json(user)
    }
    

    static createUser = (req, res, next)=>{
        const bacaDir = fs.readdirSync('./Database/Pekerjaan')
        const datas = []
        for(const file of bacaDir){
            const bacaFile = fs.readFileSync('./Database/Pekerjaan/' + file)
            const data = Buffer.from(bacaFile.toString('utf-8'))
            const bacaProfile = JSON.parse(data)
            
            datas.push(bacaProfile);
        }
        let result
        for(let i = 0; i < datas.length; i ++){
            const data = req.body
            if (datas[i].nama == data.nama) {
                result = 1
                break          
            }
        }
        if (result == 1){
            const data = req.body
            if(!data.nama || !data.gender || !data.alamat){
                res.status(400).send("Mohon isi data kamu dengan benar")
            }
            const date = new Date()
            const formatDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
            data.timeStamp = formatDate
            data.IdUser = crypto.randomUUID()

            fs.writeFileSync('./Database/User/'+ data.nama+'.json',JSON.stringify(data));
            return res.json(data)
        }
        return res.send("Akun kamu blum ada")
    }

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
                if(data[i].IdUser != null){
                    found = true
                    break
                }         
            }
        }
        if (found == true){
            const data = req.body
            if(!data.name || !data.bank || !data.Income || !data.penghasilanLainnya){
                res.status(400).send("Mohon isi data kamu dengan benar")
            }
            let total = data.Income + data.penghasilanLainnya
            data.penghasilanTotal = total
            const date = new Date()
            const formatDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
            data.timeStamp = formatDate
            
            fs.writeFileSync('./Database/Penghasilan/'+ data.name+'.json',JSON.stringify(data));
            return res.json(data)
        }
        return res.send("Akun kamu blum ada")

    }                   
    
}

export default user;