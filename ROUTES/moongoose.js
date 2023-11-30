let mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/my_one")
const userSchema={
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true,
        default:Date.now()
    },
    
}
const user=mongoose.model("haha",userSchema);
module.exports=user;