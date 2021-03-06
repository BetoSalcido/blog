const mongoose = require('mongoose')
const cryto = require('crypto')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        trim: true,
        required: true,
        max: 32,
        unique: true,
        index: true,
        lowercase: true
    },
    name: {
        type: String,
        trim: true,
        required: true,
        max: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    profile: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: String,
    about: {
        type: String
    },
    role: {
        type: String,
        trim: true
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    resetPasswordLink: {
        data: String,
        default: ''
    }
}, {timestamps: true})

userSchema.virtual('password')
    .set(function(password) {
        // Create a temporarity var¡aible called _password
        this._password = password

        // Generate salt
        this.salt = this.makeSalt()

        // encryptPassword
        this.hashedPassword = this.encryptPassword(password)
    })
    .get(function() {
        return this._password
    })

userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) == this.hashedPassword 
    },
    encryptPassword: function(password) {
        if (!password) { return ''}

        try {
            return cryto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')

        } catch (error) {
            return ''
        }
    },
    makeSalt: function() {
        return Math.round(new Date().valueOf() * Math.random()) + ''
    }
}

module.exports = mongoose.model('User', userSchema)