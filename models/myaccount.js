const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const myaccountSchema = new Schema({
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
    email: {
        type: String,
        required: true
    }, 
    organization: {
        type: String,
        required: true
    }, 
    addressline1: {
        type: String,
        required: true
    }, 
    addressline2: {
        type: String,
    },
    addresscity: {
        type: String,
        required: true
    },
    addressstate: {
        type: String,
        required: true
    },
    addresszip: {
        type: Number,
        required: true
    },
    addresscountry: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    } 
}, {
    timestamps: true
});

const Myaccount = mongoose.model('Myaccount', myaccountSchema);

module.exports = Myaccount;