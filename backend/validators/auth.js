const { check } = require('express-validator')

exports.userSignUpValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is requiered'),
    check('email')
        .isEmail()
        .withMessage('Mut be a valid email address'),
    check('password')
        .isLength({min:6})
        .withMessage('Password must be at least 6 characters long')
]

exports.userSignInValidator = [
    check('email')
        .isEmail()
        .withMessage('Mut be a valid email address'),
    check('password')
        .isLength({min:6})
        .withMessage('Password must be at least 6 characters long')
]