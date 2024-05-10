const mongoose = require('mongoose');

// Define User schema
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    role: {
        type: String,
        enum: ['admin', 'user'], // Allowed values for role
        default: 'user' // Default role is user
    }
});

// Create User model
const User = mongoose.model('User', userSchema);

module.exports = User;
