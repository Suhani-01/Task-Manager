import {Router} from "express"
import { getProfile, login, register, userLogOut } from "../controllers/user.js";

const router=Router();

//POST api/user/signup
router.post('/signup',register);

//POST api/user/login
router.post('/login',login);

//Get user profile
router.get("/profile",getProfile);

//post logous
router.post("/logout",userLogOut)

export default router;