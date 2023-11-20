const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();


const signUpUser = async(req,res) => {
    const{username,email,password} = req.body;

    try{
        const hashedPassword = await bcrypt.hash(password,process.env.SALTROUNDS);
        const newUser = await User.create({username,email,password:hashedPassword});
        res.status(200).send("user signed up successfully!!!");
    }catch(err){
        console.error('Error creating user:', err);
        res.status(500).json({msg:'Error occured while logging user.'});
    } 

}

const loginUser = async(req,res) => {
    const {email,password} = req.body;

    try {
        const user = await User.findOne({
            where:{
                email:email
            }
        });
        if(user === null) return res.status(404).json({msg:"Email not found"});
        const {email:dbEmail,password:dbPassword,username:dbUserName} = user['dataValues'];
        const isPasswordmatched = await bcrypt.compare(password,dbPassword);
        if(isPasswordmatched){
            const jsontoken = await jwt.sign({dbEmail,dbUserName},process.env.SECRET_TOKEN,{expiresIn:'15m'})
            console.log(jsontoken);
            res.status(200).json({msg:"User logged in successfully!!!",
                token:jsontoken,dbEmail});
        }
        else{
            res.status(401).json({msg:"Invalid Password"});
        }

      } catch (error) {
        res.status(500).json({msg:'Error occured while logging user.'});
      }
    
}

module.exports ={signUpUser,loginUser}