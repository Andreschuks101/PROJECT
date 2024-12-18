const dotenv = require("dotenv");
dotenv.config();
const sequelize = require("./config/sequelize");
const express = require("express");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());
const User = require("./models/user");

// To register a new user
app.post("/register", async(req, res) => {
   try {
    // Accept inpt from the body
    const {name, email, password, role} = req.body;
    //check if all fields are filled
    if(!name || !email || !password || !role){
        return res.status(400).json({message: "Please input all fields correctly"})
    }
    const userExists = await User.findOne({where : {email}});
    if(userExists){
        return res.status(401).json({message: "The user with this email already exists"})
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {name, email, password: hashedPassword, role};
    await User.create(newUser);
    res.status(201).json({message: "User created successfully"});

   } catch (error) {
    console.log(error);
   }
});





app.listen(3000, async () => {
    try {
        await sequelize.sync();
        console.log(`The server is running on port 3000`);
    } catch (error) {
        console.log(error)
    }
});