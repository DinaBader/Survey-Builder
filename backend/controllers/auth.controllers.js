const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login=async (req,res)=>{
    const {userName,password}=req.body;

    //check for user
    const user= await User.findOne({userName});
    //not found 
    if(!user) res.status(400).send({message:"Invalid username/password"});

    //check for password if found
    const isValidPassword = await bcrypt.compare(password,user.password);
    if(!isValidPassword) res.status(400).send({message:"Invalid username/password"});

    const {password: hashedPassword ,...userDetails}=user.toJSON();
    //generate jwt token
    const token = jwt.sign(
        {
            ...userDetails,
        },
        process.env.JWT_SECRET,{
            expiresIn: "2 days"
        }
    );
    res.status(200).send({
        user: userDetails,
        token,
      });
}

const register = async (req, res) => {
    const { userName, password, firstName, lastName , email ,Role} = req.body;
    if (!userName || !password || !firstName || !lastName || !email || !Role) {
      res.status(400).send({ message: "all fields are required" });
    }
  
    try {  
      const user = new User({
        userName,
        password,
        firstName,
        lastName,
        email,
        Role
      });
  
      await user.save();
      const { password: hashedPassword, ...userDetails } = user.toJSON();
      const token = jwt.sign(
        {
          ...userDetails,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "2 days",
        }
      );
      res.status(200).send({ user:userDetails,token });
      return;
    } catch (e) {
      console.error(e)
      res.status(500).send({ error: e });
    }
  };
  
  module.exports = {
    login,
    register,
  };