const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const materialsSchema = new Schema({
    materialtype: {
        type: String,
        required: true,
    }, 
    Description: {
        type: String,
        required: true, 
    },
    organization: {
        type: String, 
    },  
    expirydate: {
        type: String,
        required: true,
    }, 
}, {
    timestamps: true
});

const Materials = mongoose.model('Materials', materialsSchema);

module.exports = Materials;