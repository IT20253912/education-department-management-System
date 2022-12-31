const express = require("express");
const dotenv = require("dotenv");
const logger = require("pino")();
const mongoose = require("mongoose");
const cors = require("cors");
const bcryptjs = require("bcryptjs");



const jwt = require("jsonwebtoken");
const JWT_SECRET = "fggfsdftdsfdsftyfevdtedv()hbdhudvdvcdvyd";





const expressSession = require("express-session");

const app = express();
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.set("trust proxy", 1);
const sessSettings = expressSession({
  path: "/",
  secret: "oursecret",
  resave: true,
  saveUninitialized: true,
  cookie: {
    sameSite: false,
    secure: false,
    maxAge: 360000,
  },
});

app.use(sessSettings);
const PORT = process.env.PORT || 8000;
//const DB_URL = 'mongodb+srv://sliit:sliit@result.ugqdtec.mongodb.net/result?retryWrites=true&w=majority'

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  logger.info(" Mongodb connected successfully");
});

app.get("/", (req, res) => {
  res.status(200).json({ messsage: "Server is running!" });
});

app.use("/api/student", require("./routes/StudentRoutes"));




require("./userDetails")
const User=mongoose.model("UserInfo");
app.post("/register",async(req,res)=>{
  const {fname, lname, email, password } = req.body;
  
  const encryptedPassword = await bcryptjs.hash(password,10);
  try {
    const oldUser = await User.findOne({email});

    if(oldUser) {
      return res.send({error: "User Exists"});
    }

    await User.create({
      fname,
      lname,
      email,
      password:encryptedPassword,
    });
    res.send({status:"ok"});

  }catch (error) {
    res.send({ status:"error"});
  }
});



app.post("/login-user",async(req,res) => {
  const { email, password } = req.body;

  const user = await User.findOne({email});
  if(!user) {
    return res.send({error: "User Not Found"});
  }
  if(await bcryptjs.compare(password,user.password)){
    const token = jwt.sign({email:user.email}, JWT_SECRET);

    if(res.status(201)) {
      return res.json({status:"ok",data: token});
    }else{
      return res.json({error: "error"});

    }
  }
  res.json({ status:"error", error:"invalide password"});

});


app.post("/userData",async(req,res)=>{
  const { token } = req.body;
  try{
    const user = jwt.verify(token, JWT_SECRET);
    console.log(user);

    const useremail = user.email;
    User.findOne({ email:useremail})
      .than((data) => {
        res.send({status: "ok", data:data});
      })
      .catch((error)=>{
        res.send({status:"error",data:error});
      });

  }catch(error){}

});





app.listen(PORT, () => {
  logger.info(`Server is running on PORT: ${PORT}`);
});




