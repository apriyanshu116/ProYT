import { Router } from "express";
import { registerUser, 
    loginUser, 
    logoutUser, 
    refreshAccessToken, 
    changeCurrentPassword, 
    getCurrentUser, 
    updateAccountDetails, 
    updateUserAvatar, 
    updateUserCoverImage, 
    getUserChannelProfile, 
    getWatchHistory 
} from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import multer from "multer";


const router = Router()
// Register user
router.route("/register").post
    (
        upload.fields([
            {
                name: "avatar",
                maxCount: 1
            },
            {
                name: "coverImage",
                maxCount: 1
            }
        ]),
        registerUser
    )

// login user
router
.route("/login")
.post(loginUser)
// Logout user withsecured routes
router
.route("/logout")
.post(verifyJWT, logoutUser)
// Refresh access token 
router
.route("/refresh-token")
.post(refreshAccessToken)
// change password 
router
.route("/change-password")
.post(verifyJWT, changeCurrentPassword)
// get current user
router
.route("/current-user")
.get(verifyJWT, getCurrentUser)
// update account
router
.route("/update-account")
.patch(verifyJWT, updateAccountDetails)
// change avatar
router
.route("/avatar")
.patch(verifyJWT, upload
.single("avatar"), updateUserAvatar)
// update cover image 
router
.route("/cover-image")
.patch(verifyJWT, upload
.single("coverImage"), updateUserCoverImage)

// getting user channel profile
router
.route("/c/:username")
.get(verifyJWT, getUserChannelProfile)
// watch history
router
.route("/history")
.get(verifyJWT, getWatchHistory)
export default router