//require('dotenv').config();
const  mongoose  = require("mongoose");

const connectDB=async () =>{
    try{
        await mongoose.connect("mongodb+srv://vindya:vindya123@contactkeeper.pbcdj.mongodb.net/TestProject?retryWrites=true&w=majority",{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("MongoDB conection SUUCCESS");
    }catch(error){
        console.error("MongoDB conection FAIL");
        process.exit(1);
    }
};

module.exports=connectDB;
