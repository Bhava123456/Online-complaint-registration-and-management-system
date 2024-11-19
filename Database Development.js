Database Development
We use MongoDB as the database for storing user and complaint details.

Setup MongoDB Models
models/User.js
Code:
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', userSchema);

models/Complaint.js
Code:
const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Complaint', complaintSchema);
