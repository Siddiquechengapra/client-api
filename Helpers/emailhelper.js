const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'benton.stanton@ethereal.email',
        pass: 'Vyprp8XR7dbXGTTYHE'
    }
});

const send = (info) => {
  return new Promise(async (resolve, reject) => {

      // send mail with defined transport object
      try{
        let result = await transporter.sendMail(info);
    

        console.log("Message sent: %s", result.messageId)
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result));
       
        resolve(result);
      }
      catch(error){
          console.log("error of  carsf",error)
            reject(error)
      }
      
      

    
  });
};

const emailProcessor = ({ email, pin, type }) => {
    console.log("inside processor : ")
  let info = "";
  switch (type) {
      
    case "request-new-password":
        console.log("inside switch 1")
      info = {
        from: '"CMR Company" <abe.kohler59@ethereal.email>', // sender address
        to: `${email}`, // list of receivers
        subject: "Password rest Pin", // Subject line
        text:
          "Here is your password rest pin" +
          pin +
          " This pin will expires in 1day", // plain text body
        html: `<b>Hello </b>
      Here is your pin 
      <b>${pin} </b>
      This pin will expires in 1day
      <p></p>`, // html body
      };
      console.log("sending info ",info)

      return send(info);
      break;

    case "update-password-success":
      info = {
        from: '"CMR Company" <abe.kohler59@ethereal.email>', // sender address
        to: `${email}`, // list of receivers
        subject: "Password updated", // Subject line
        text: "Your new password has been update", // plain text body
        html: `<b>Hello </b>
       
      <p>Your new password has been update</p>`, // html body
      };

      send(info);
      break;

    default:
      break;
  }
};

module.exports = { emailProcessor };