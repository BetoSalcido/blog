const User = require('../models/user')
const shortId = require('shortid');
const user = require('../models/user');
const jwt = require('jsonwebtoken')
const { expressjwt: expressJwt } = require('express-jwt');

exports.signup =  (req, res) => {
    User.findOne({email: req.body.email}).exec((error, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is taken'
            })
        }

        const { name, email, password } = req.body
        let userName  = shortId.generate()
        let profile = `${process.env.CLIENT_URL}/profile/${userName}`
        let newUser = new User({ name, email, password, profile, userName})

        newUser.save((err, success) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json({user: success})
        })
    })
};

exports.singin = (req, res) => {
    const userEmail = req.body.email
    const password = req.body.password

    // Check if user exist
    User.findOne({ userEmail }).exec((error, user) => {
        if (error || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup'
            })
        } 

        // Authenticate
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Email and password do not match'
            })
        }

        // Generate a token and send to client
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, { expiresIn: '1d'})
        res.cookie('token', token, {expiresIn: '1d'})
        const { _id, userName, name, email, role } = user

        return res.json({
            token,
            user:  { _id, userName, name, email, role }
        })

    })
}

exports.signout = (req, res) => {
    res.clearCookie('token')
    res.json({
        message: 'Signout success'
    })
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth",
  });