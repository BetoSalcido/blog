const express = require('express')
const router = express.Router()
const { signup, singin, signout, requireSignin  } = require('../controllers/auth')

// Validators
const { runValidation } = require('../validators')
const { userSignUpValidator, userSignInValidator } = require('../validators/auth') 

router.post('/signup', userSignUpValidator, runValidation,  signup)
router.post('/signin', userSignInValidator, runValidation,  singin)
router.get('/signout', signout)

router.get('/secret', requireSignin, (req, res) => {
    res.json({
        message: "You have access to the secret page"
    })
})

module.exports = router;