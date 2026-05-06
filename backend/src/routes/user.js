import {Router} from "express"
import { getProfile, login, register, userLogOut } from "../controllers/user.js";

const router=Router(); // create router instance

//POST api/user/signup
router.post('/signup',register); // register new user

//POST api/user/login
router.post('/login',login); // login user & set auth cookie

//Get user profile
router.get("/profile",getProfile); // fetch logged-in user details

//post logous
router.post("/logout",userLogOut) // logout user & clear cookie

export default router; // export router