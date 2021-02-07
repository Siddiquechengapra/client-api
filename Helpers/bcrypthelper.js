const bcrypt= require("bcrypt")
const saltrounds=10

exports. hashpassword=plainpassword=>{
    return new Promise((resolve)=>{
        resolve(bcrypt.hashSync(plainpassword,saltrounds))
    })
}

exports.comparepassword=(plainpassword,passfromdb)=>{
    return new Promise((resolve,reject)=>{

        bcrypt.compare(plainpassword,passfromdb ,function(err,result){
                if(err){
                    reject(err)
                }

                resolve(result)
        })

    })
}
