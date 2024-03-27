const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const customerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["m", "f"]
    },
    number: {
        type: String,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Hashing mechanism - pre-save hook
customerSchema.pre('save', async function(next) {
    const customer = this;
    // Hash the password only if it has been modified or new
    if (!customer.isModified('password')) return next();
    try {
        // Generate salt
        const salt = await bcrypt.genSalt(10);
        // Hash the password with the salt
        const hashPassword = await bcrypt.hash(customer.password, salt);
        // Override the plain password with the hashed password
        customer.password = hashPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

// Method to compare password
customerSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        // Use bcrypt's compare function to compare the candidate password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
}

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
