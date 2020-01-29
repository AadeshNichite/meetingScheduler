const mongoose = require('mongoose');

const MeetingDataSchema = new mongoose.Schema({
    meetingNo: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'profile',
        required : true
    },
    meetings:[{
        meetingTitle:{
            type: String,
            required:true
        },
        strating: {
            type : String,
            required : true
        },
        endTime:{
            type : String,
            required : true
        }
    }]
})

module.exports = MeetingData = new mongoose.model('meetingData', MeetingDataSchema );