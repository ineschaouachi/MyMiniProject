const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    numCnss: {
        type: String,
        required: true
    },
    numCnss: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    availability: {
        type: Boolean,
        required: true
    }
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Employee', employeeSchema)