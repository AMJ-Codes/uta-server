const router = require("express").Router();
const { UniqueConstraintError } = require("sequelize/lib/errors");
const { UserModel } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Register endpoint
router.post("/register", async (req, res) => {

    let { email, passwordhash } = req.body.user;
    try {
        const User = await UserModel.create({
            email,
            passwordhash: bcrypt.hashSync(passwordhash, 13),
        });

        let token = jwt.sign({id: User.id, email: User.email}, process.env.JWT_SECRET, {expiresIn: '7d'});
    
        res.status(201).json({
            message: "User successfully registered",
            user: User,
            sessionToken: token
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email already in use",
            });
        } else {
            res.status(500).json({
                message: "Failed to register user",
            });
        }
    }   
});

// Login endpoint
router.post("/login", async (req, res) => {

    let { email, passwordhash } = req.body.user;

    try {
        const loginUser = await UserModel.findOne({
            where: {
                email: email,
            },
        });

        if (loginUser) {

            let passwordComparison = await bcrypt.compare(passwordhash, loginUser.passwordhash);

            if (passwordComparison) {
                let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: '7d'});

                res.status(200).json({
                    user: loginUser,
                    message: "User successfully logged in!",
                    sessionToken: token
                });
            } else {
                res.status(401).json({
                    message: "Incorrect email or password"
                });
            }
        } else {
            res.status(401).json({
                message: "Incorrect email or password"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Failed to log user in."
        })
    }
    
});

module.exports = router;