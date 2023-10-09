const express = require('express');
const router = express.Router()

const User = require('../models/User');

const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken")

const bcrypt = require("bcryptjs");
const jwtSecret = "HelloIamtheAuthorofThisWebPage"
//sign up

router.post("/createuser", [
    // username must be an email
    body('email', 'Enter Valid email').isEmail(),
    // password must be at least 5 chars long
    body('name', 'Enter Valid Name').isLength({ min: 3 }),
    body('password', 'Incorrect Password').isLength({ min: 5 })],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password,salt)
        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true })
        } catch (error) {
            console.log(error);
            res.json({ success: false })

        }
    })

//login


router.post("/loginuser", [
    // username must be an email
    body('email', 'Enter Valid email').isEmail(),
    // password must be at least 5 chars long
    body('password', 'Incorrect Password').isLength({ min: 5 })], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Try login with currect Credentials" });
            }
            
            const pwtCompare = await bcrypt.compare(req.body.password,userData.password)
            if (!pwtCompare) {
                return res.status(400).json({ errors: "Try login with currect Credentials" });
            }
            const data = {
                user :{
                    id:userData.id
                }
            }
            const authToken = jwt.sign(jwt, jwtSecret) 
            return res.json({ success: true, authToken:authToken });

        } catch (error) {
            console.log(error);
            res.json({ success: false })

        }
    })

module.exports = router;