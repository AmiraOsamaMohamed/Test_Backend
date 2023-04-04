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
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
const jobs=require("./routes/admin.js");
app.use("",jobs);
app.listen(4000, "localhost", () => {

    console.log("server is running");
});