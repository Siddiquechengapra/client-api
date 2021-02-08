const jwt = require("jsonwebtoken");
const { setJWT, getJWT } = require("./redishelper");
const { storeUserRefreshJWT } = require("../Model/Usermodel");
const { token } = require("morgan");

exports. createJWT = async (email, _id) => {
  try {
    const accessJWT = await jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "1d", //change this to 15m
    });
    console.log("types:",typeof accessJWT,typeof _id)
    await setJWT(accessJWT, _id);

    return Promise.resolve(accessJWT);
  } catch (error) {
    return Promise.reject(error);
  }
};

exports. refreshJWT = async (email, _id) => {
  try {
    const refreshJWT = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    await storeUserRefreshJWT(_id, refreshJWT);

    return Promise.resolve(refreshJWT);
  } catch (error) {
    return Promise.reject(error);
  }
};

exports. verifyAccessJWT = (userJWT) => {
  try {
    return Promise.resolve(jwt.verify(userJWT, process.env.JWT_ACCESS_SECRET));
  } catch (error) {
    return Promise.resolve(error);
  }
};
exports. verifyRefreshJWT = (userJWT) => {
  try {
    return Promise.resolve(jwt.verify(userJWT, process.env.JWT_REFRESH_SECRET));
  } catch (error) {
    return Promise.resolve(error);
  }
};

exports.verifyAccessJWT=userJWT=>{

  return new Promise((resolve,reject)=>{
    jwt.verify(userJWT,process.env.JWT_ACCESS_SECRET,function(err,decoded){
      if(err){
        console.log("error is in verify access JWT ",err)
      }
      else{
       
        resolve(decoded)
      }
    })

  })
  
  
}


exports.verifyrefreshJWT=userJWT=>{

  return new Promise((resolve,reject)=>{
    jwt.verify(userJWT,process.env.JWT_REFRESH_SECRET,function(err,decoded){
      if(err){
        console.log("error is in verifyrefreshJWT ",err)
      }
      else{
       
        resolve(decoded)
      }
    })

  })
  
  
}

