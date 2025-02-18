import express from "express";
import upload from "../middlewares/multer.js";
import { login, register, logout, getUser, editProfile, followOrUnfollow, getProfile, getSuggestedUsers} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);

router.route('/:id/profile').get(isAuthenticated, getProfile);
router.route('/profile/edit').post(isAuthenticated, upload.single('profilePhoto'), editProfile);
router.route('/suggested').get(isAuthenticated, getSuggestedUsers);
router.route('/followorunfollow/:id').post(isAuthenticated, followOrUnfollow);

export default router;
