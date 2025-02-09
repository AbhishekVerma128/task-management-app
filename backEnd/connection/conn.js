const mongoose = require("mongoose");

mongoose.set("strictQuery",false)
const DB_URL = "mongodb+srv://vermaabhishek128:0155Mee002@cluster0.1exqwcj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
async function getConn (){
    await mongoose.connect(DB_URL).then(()=>{
        console.log("connected to db");
    }).catch(e =>{console.log("not connected")})
}
module.exports = getConn;