import bcrypt from "bcryptjs"
import User from "../models/User.js";
import { generateToken, getAndAuthUser } from "../service/auth.js";

// REGISTER → create new user
export const register = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    email = email.toLowerCase().trim(); // normalize email (avoid duplicates like ABC@gmail vs abc@gmail)

    const exist = await User.findOne({ email }); // check if user already exists
    if (exist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10); // hash password for security

    const user = await User.create({
      name,
      email,
      password: hashed // store hashed password (never plain)
    });

    return res.status(201).json({
      message: "Account Created Successfully"
    });

  } catch (err) {
    res.status(500).json({ message: err.message }); // server error
  }
};

// LOGIN → authenticate user
export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = email.toLowerCase().trim(); // normalize email again

    const user = await User.findOne({ email }); // find user by email

    if (!user) {
      return res.status(400).json({ message: "Email does not exist" });
    }

    const match = await bcrypt.compare(password, user.password); // compare entered password with hashed one
    if (!match) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    const token = generateToken(user); // create auth token (JWT)

    res.cookie("token", token, {
      httpOnly: true, // frontend JS can't access cookie (security)
      secure: true, // required for HTTPS + sameSite:none
      sameSite:"none", // allow cross-domain cookies
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


// GET PROFILE → get logged-in user details
export const getProfile=async(req,res)=>{
    try{
        const token = req.cookies.token; // read token from cookies

        if(!token){
            return res.status(401).json({
                message:"You need to log in first"
            })
        }

        const verify=getAndAuthUser(req.cookies.token); // decode & verify token

        const user = await User.findById(verify.id).select("name email createdAt"); // fetch limited fields

        if(!verify){
            return res.status(404).json({
                message:"User not found"
            });
        }

        return res.status(200).json(user) // send user profile

    }catch(err){
        return res.status(500).json({message:"Server Error"});
    }
}


// LOGOUT → clear auth cookie
export const userLogOut=async(req,res)=>{
    try{
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite:"none",
        }); // remove token cookie from browser

        return res.status(200).json({message:"Logout successfull"})

    }catch(err){
        return res(500).json({message:"Something went wrong"})
    }
}