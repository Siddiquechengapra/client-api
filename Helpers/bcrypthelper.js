const bcrypt= require("bcrypt")
const saltrounds=10

exports. hashpassword=plainpassword=>{
    return new Promise((resolve)=>{
        resolve(bcrypt.hashSync(plainpassword,saltrounds))
    })
}
