// npm i express mongoose dotenv multer
// npm i bcrypt and go to file auth.js
// 7XU196TsYCf48Giw
// Ankit
const express =require('express');
const app=express();
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const authRoute=require('./routes/auth');
const userRoute=require('./routes/users');
const postRoute=require('./routes/posts');
const categoryRoute=require('./routes/categories');

// to uploads image file we used multer:-
const multer=require('multer');
const path = require('path');
// to add images to database we need to install :- npm i add path in our api folder


dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")))

mongoose.connect(process.env.MONGO_URL , {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    // useCreateIndex: true
    // useFindAndModify:true
}).then(console.log("connect to mongoDb")).catch(err=>console.log(err));



// these next lines upto the comment section is the multer code to upload file
const storage=multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, "images")
    },filename:(req,file,cb)=>{
        // cb(null,req.body.name)
        cb(null,"hello.jpg")
    },
})

const upload=multer({storage: storage});
app.post("/api/upload", upload.single("file"),(req,res)=>{
    res.status(200).json("file has been uploaded");
});
// in postman do:-localhost:5000/api/upload and POST option...then "form-data">key=file>value=WIN_20230318_01_16_47_Pro.jpg  and in raw tab where grapgQL is written write it as:-{
    // "name":"myimage.jpg"    -->  .jpg has to be there and any name you want you can give
// }

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);


app.listen("5000", ()=>{
    console.log("Backend is running successfully");
})