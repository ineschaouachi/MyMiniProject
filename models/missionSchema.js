const mongoose = require('mongoose')

const missionSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },

    team: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }]
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Mission', missionSchema)