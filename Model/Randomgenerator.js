exports.randomPinnumber=len=>{
    let pin=""

    for (let i = 0; i < len; i++) {
       
      pin +=  Math.floor(Math.random() *10)
    }
    return pin
}