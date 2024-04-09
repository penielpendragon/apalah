import fs from 'fs'
import crypto from 'crypto'



class user {

    static createdAt(){
        const date = new Date()
        const formatDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}` 
        return formatDate
    }

    static bacadata(namafolder){
        const bacaDir = fs.readdirSync(`./Database/${namafolder}`)
        const datas = []
        for(const file of bacaDir){
            const bacaFile = fs.readFileSync(`./Database/${namafolder}/` + file)
            const data = Buffer.from(bacaFile.toString('utf-8'))
            const bacaProfile = JSON.parse(data)
            
            datas.push(bacaProfile);
        }
        return datas
    }
    // ini buat Pekerjaan
    static createPekerjaan = (req, res, next)=>{
        //ngambil inputan dari UI/Frontend dan dibuatkan objek
        const user = req.body;
        //verif (ini sebenarnya jelek tpi apakah kita mau instal npm verif)
        if(!user.nama || !user.gaji || !user.lama_bekerja){
            return res.status(400).send("Mohon isi data berupa, nama, gaji, dan lama_bekerja")
        }
        //ini belum dibuat function biar bisa dipake di semua static
        user.createdAt = this.createdAt();
        user.id = crypto.randomInt(0, 30)
        //inibuatfile
        fs.writeFileSync('./Database/Pekerjaan/'+ user.nama+'.json',JSON.stringify(user));

        return res.status(201).json(user)
    }

    //ini buat user
    static createUser = (req, res, next)=>{
        //baca folder pekerjaan
       const datas = this.bacadata('Pekerjaan')
        //ini buat cek apakah dia udh buat di pekerjaan
        let result = 0
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
                return res.status(400).send("Mohon isi data kamu dengan benar")
            }
            //ini belum dibuat function biar bisa dipake di semua static
            data.timeStamp = this.createdAt()
            data.IdUser = crypto.randomInt(0, 30)

            fs.writeFileSync('./Database/User/'+ data.nama+'.json',JSON.stringify(data));
            return res.json(data)
        }
        return res.send("Akun kamu blum ada")
    }

    //ini buat penghasilan dengan syarat harus udh buat user
    static createPenghasilan(req,res,next){
        const datas = this.bacadata('User')
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
                return res.status(400).send("Mohon isi data kamu dengan benar")
            }
            let total = data.Income + data.penghasilanLainnya
            data.penghasilanTotal = total
            data.timeStamp = this.createdAt()
            data.PenghasilanId = crypto.randomInt(0,30)
            
            fs.writeFileSync('./Database/Penghasilan/'+ data.nama+'.json',JSON.stringify(data));
            return res.json(data)
        }
        return res.send("Akun kamu blum ada")

    } 
    static getAll(req,res,next){
        const data = req.body
        const data1 = this.bacadata('Pekerjaan')
        const data2 = this.bacadata('User')
        const data3 = this.bacadata('Penghasilan')
        const alldata = []
        for(let i= 0; i< data1.length; i++){
            if(data.nama == data1[i].nama){
                for(let j = 0; j< data2.length; j++){
                    if(data.nama == data2[j].nama){
                        for(let k = 0; k< data3.length; k++){
                            if(data.nama == data3[k].nama){  
                                alldata.push({
                                "Nama Lengkap": data1[i].nama,
                                "Gaji": data1[i].gaji,
                                "Lama Bekerja": data1[i].lama_bekerja,
                                "Id User": data2[j].IdUser,
                                "Gender": data2[j].gender,
                                "Alamat": data2[j].alamat,
                                "Nama Bank": data3[k].bank,
                                "Income": data3[k].Income,
                                "Penghasilan Lainnya": data3[k].penghasilanLainnya,
                                "Penghasilan Total": data3[k].penghasilanTotal
                                })
                                return res.json(alldata)
                            }
                        }
                        alldata.push({
                            "Nama Lengkap": data1[i].nama,
                            "Gaji": data1[i].gaji,
                            "Lama Bekerja": data1[i].lama_bekerja,
                            "Id User": data2[j].IdUser,
                            "Gender": data2[j].gender,
                            "Alamat": data2[j].alamat,
                        })
                        return res.json(alldata)
                    }
                }
                alldata.push({
                    "Nama Lengkap": data1[i].nama,
                    "Gaji": data1[i].gaji,
                    "Lama Bekerja": data1[i].lama_bekerja
                }) 
                return res.json(alldata)
            }
        } return res.send("Belum punya akun yaa? yu buat akun")
    }                  
    
}

export default user;