 const express = require('express');
const app = express();
const {dbConnect} = require('./config/dbConnect')
const AuthRoutes = require('./routes/AuthRoutes')
const TodoRoutes = require('./routes/TodoRoutes')

const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require('cors');
dotenv.config();
dbConnect();
app.get("/test",(req,res)=>{
    res.send("running")
})
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"*"
}))
app.use("/", AuthRoutes)
app.use("/", TodoRoutes)





const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log(`app is running on port ${PORT}`);
})