import bcrypt from "bcryptjs"
import User from "../models/User.js";
import { generateToken, getAndAuthUser } from "../service/auth.js";

export const register = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    email = email.toLowerCase().trim(); // 👈 normalize

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed
    });

    return res.status(201).json({
      message: "Account Created Successfully"
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email.toLowerCase().trim(); // 👈 same here

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Email does not exist" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true, //document.cookie frontend ko access nahi hogi
      secure: true, //imp to work with sameSite :none
      sameSite:"none", //taaki kisi b domain pr cookie chli jaae ,by default vo bhs same domain pr bhejta hai
    });

    return res.status(200).json({
      message: "Logged in successfully",
      id: user._id,
      name: user.name,
      email,
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


export const getProfile=async(req,res)=>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"You need to log in first"
            })
        }
        const verify=getAndAuthUser(req.cookies.token);
        const user = await User.findById(verify.id).select("name email createdAt");

        if(!verify){
            return res.status(404).json({
                message:"User not found"
            });
        }
        return res.status(200).json(user)
    }catch(err){
        return res.status(500).json({message:"Server Error"});
    }
}

export const userLogOut=async(req,res)=>{
    try{
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
        });
        return res.status(200).json({message:"Logout successfull"})
    }catch(err){
        return res(500).json({message:"Something went wrong"})
    }
}

