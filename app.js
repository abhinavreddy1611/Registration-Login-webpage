const express=require("express");
const expressLayouts=require("express-ejs-layouts");
const mongoose=require("mongoose");
const flash=require("connect-flash");
const expressSession=require("express-session");
const passport = require("passport");
const app=express();
require('./config/passport')(passport);
app.use(expressSession({
    resave:true,
    saveUninitialized:false,
    secret:"jnssakskskmskdmskmskdm"
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash("succes_msg");
    res.locals.err_msg=req.flash("err_msg");
    next();
})
app.use(expressLayouts);
app.use(express.urlencoded({extended:false}));
app.set("view engine","ejs")
app.use("/",require("./ROUTES/index"))
app.use("/users",require("./ROUTES/users"))
const PORT= process.env.PORT || 5000;
app.listen(PORT,console.log(`Server started on port ${PORT}`));