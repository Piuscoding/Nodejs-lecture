require('dotenv').config();
const express = require('express');

const connectToDB = require('./database/db');
const authRoutes = require('./routes/auth-routes')
const homeRoutes = require('./routes/home-routes')
const adminRoutes = require('./routes/admin-routes')
const uploadImageRoutes = require("./routes/image-routes");
//connect db
connectToDB();

const app = express();
// https://github.com/Mrepo2/signalminingBTC-
//middlewares
app.use(express.json());
// use authroute
app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/image", uploadImageRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`server is running ${PORT}`)
})