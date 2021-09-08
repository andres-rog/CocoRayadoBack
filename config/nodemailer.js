const nodemailer = require('nodemailer')

const smtpTransporter = nodemailer.createTransport(smtpTransport({
    service:"Gmail",
    auth:{
      user:process.env.EMAIL,
      pass:process.env.PASS
    }
}));

router.post('/send-mail',async(req,res)=>{

});

//Notificacion de 10 favoritos
exports.favs10mail = (email, recipe) =>{
    try{
        await smtpTransporter.sendMail({
          from:"CocoRayado <kudoxk17@gmail.com>",
          to:email,
          subject: `Tu receta le encanta a la comunidad!`,
          html: `
            <h1>${recipe} ha obtenido 10 favoritos!</h1>
            `
        });
        return res.json({msg:"Email sent!"});
    }
    catch(error){
        return res.status(400).json({error});
    }
}

//Notificacion de 100 favoritos
exports.favs100mail = (email, recipe) =>{
    try{
        await smtpTransporter.sendMail({
          from:"CocoRayado <kudoxk17@gmail.com>",
          to:email,
          subject: `Tu receta le encanta a la comunidad!`,
          html: `
            <h1>${recipe} ha obtenido 100 favoritos!</h1>
            `
        });
        return res.json({msg:"Email sent!"});
    }
    catch(error){
        return res.status(400).json({error});
    }
}

//Notificacion de 1000 favoritos
exports.favs1000mail = (email, recipe) =>{
    try{
        await smtpTransporter.sendMail({
          from:"CocoRayado <kudoxk17@gmail.com>",
          to:email,
          subject: `Tu receta le facina a la comunidad!`,
          html: `
            <h1>${recipe} ha obtenido 1000 favoritos!</h1>
            `
        });
        return res.json({msg:"Email sent!"});
      }
      catch(error){
        return res.status(400).json({error});
      }
}