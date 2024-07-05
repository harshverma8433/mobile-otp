import express from "express";
import passport from "passport";
import userController from "../controllers/user.controller.js";

const router = express.Router();

router.post('/signUp', userController.SignUp);

router.post('/signIn', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
        if (!user) {
            return res.status(203).json({ message: info.message });
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(203).json({ message: "Login failed" });
            }
            return res.status(200).json({ message: "Login successful", user });
        });
    })(req, res, next);
});

export default router;
