// const PORT=process.env.PORT||"4000";
// const HOST=process.env.HOST||"localhost";
// const http=require("http");
// const server=http.createServer((req,res)=>{
// res.end("Hello Amira");
// });
// server.listen(PORT,HOST,(res)=>{
// console.log(`server is running on http://${HOST}:${PORT}/`)
// });
// const url=require("url");
// const q=url.parse("http://localhost:4000/");
// console.log(q);
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json())
//################initialize express app#######
const express = require('express');
const app = express();
//########global middelware#########
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors =require("cors");
app.use(cors());
app.use(express.static("upload"));
//##########require modules#########
// const admin=require("./middleware/admin.js");
// app.use("",admin);
const user=require("./middleware/user.js");
app.use("",user);
// const userAuth=require("./middleware/userAuthontication.js");
// app.use("",userAuth);
const job=require("./routes/job.js");
app.use("",job);
const auth=require("./routes/auth.js");
app.use("",auth);
///////////to run app/////////////
app.listen(4000, "localhost", () => {

    console.log("server is running");
});