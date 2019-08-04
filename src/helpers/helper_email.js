const nodemailer = require("nodemailer");
const path = require('path');
const templateDir = path.join(__dirname, "../Helpers", 'templates_email');
const Email = require('email-templates');
require("dotenv").config();
class EmailFunction{


    static async sendEmail(from,toEmail,title,html,token){
        var response;
     
        let transporter = nodemailer.createTransport({
        service: 'gmail',
          auth: {
            user: process.env.EMAIL, 
            pass: process.env.PASSWORD 
          }
        });
      
        const email = new Email({
            transport: transporter,
            send: true,
            preview: false,
            views: {
                options: {
                    extension: 'pug',
                },
                root: templateDir,
            },
        });
       

       await  email.send({
             template: html,
             message: {
                from: `${from}<recuperarsenhagabullanches.com>`, 
                to: toEmail,
             },
             locals: {
               name: title,
               url: "http://gabullanches.com.br?token=" +token //token
              
             }
           }).then(() => {
            response = true;
           }).catch((e) =>{
               console.log(e);
                response = false;
            });
            return response;
    }

    

}

module.exports ={EmailFunction};

