const LocalStrategy = require("passport-local").Strategy;
const mongoose=require("mongoose");
const bcrypt= require("bcrypt");


const userModel=require("../ROUTES/moongoose");
module.exports=function (passport){

passport.use(
new LocalStrategy({usernameField:"email"}, async (email,password,done)=>{

//Match the user;

let user=await userModel.findOne({email:email});
if(user===null){
    return done(null,false,{message:"Sorry you are not registered!"})
}
else{

    bcrypt.compare(password,user.password,(err,isMatch)=>{
        if(err) {
            throw err;
        }
        if(isMatch){
            return done(null,user)
        }
        else{
            return done(null,false,{message:"Please provide a valid username/password"});
        }

    });

}

})



);
passport.serializeUser(function(user,done) {
    done(null,user.id);
});
    passport.deserializeUser(async function(id, done){
        try {
            const user = await userModel.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
    



}