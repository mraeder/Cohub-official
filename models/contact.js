const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const contactSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        unique: true
    },
    lastname: {
        type: String,
        required: true,
        unique: true
    },
    phonenum: {
        type: Number,
        required: true 
    },
    email: {
        type: String,
        required: true
    },
    contactauth: {
        type: String,
        required: true
    },
    contactpref: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true 
    }
}, {
    timestamps: true
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;