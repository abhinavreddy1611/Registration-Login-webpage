const express=require("express");
const router=express.Router();
const userModel=require("./moongoose");
const bcrypt=require("bcrypt");
const passport=require("passport");
function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect("/users/login")
    }
}
router.get("/",(req,res)=>{
    res.send("Welocme to the browser");
})
router.get("/login",(req,res)=>{
    successs=req.flash("success_msg");
    let login_errors=req.flash("error");
    console.log(login_errors);
    if(successs===undefined && login_errors===undefined){
        res.render("login",{title:"Longin",IsloggedIn:"",loginerrors:""});
    }
    else if(login_errors===undefined){
        res.render("login",{title:"Longin",IsloggedIn:successs,loginerrors:""});
    }
    else{
        res.render("login",{title:"Longin",IsloggedIn:successs,loginerrors:login_errors});
    }
})
router.get("/register",(req,res)=>{
    res.render("register",{title:"login"});
})
router.post("/register",async (req,res)=>{
    const{name,email,password,password2}=req.body;
    let errors=[];
    if(!name || !email || !password || !password2){
       errors.push({msg:"Please fill in all fields"});
    }
    if(password!=password2){
        errors.push({msg:"Passwords do not match"})

    }
    if(password.length<6){
        errors.push({mssg:"Password shpuld be atleast 6"})
    }
    if(errors.length>0){
        res.render("register",{
            errors,
            name,
            email,password,
            password2
            ,
            title:"faailed"
        })
    }
    else{
      let k= await userModel.findOne({
         email:email
        });
        if(k===null){
            const newUser=new userModel({
                name,
                email,
                password
            });
    
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if(err) throw err;
                    newUser.password=hash;
                    newUser.save().then(
                        
                        user=>{
                            req.flash("success_msg","You are now registered");
                            res.redirect("/users/login")})
                    }
                )})
            
            
            

        
        }
        else{
            errors.push({msg:"email is already registerd"});
            res.render("register",{
                errors,
                name,
                email,password,
                password2,
                title:"faailed"
            })

            
        }
    }
})
//login Handle
router.post("/login",(req,res,next)=>{
passport.authenticate("local",{
successRedirect:"/dashboard",
failureRedirect:"/users/login",
failureFlash:true

})(req,res,next);
})
router.get("/DashBoard",isAuthenticated,(req,res)=>{

})

module.exports=router;