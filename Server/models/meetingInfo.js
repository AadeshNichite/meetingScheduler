const mongoose = require('mongoose');

const MeetingDataSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    Start: {
        type : String,
        required : true
    },
    End:{
        type : String,
        required : true
    },
    peopleForThisMeeting:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'profile'
    }],
    creatorOfMeeting:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'profile',
        required:true
    }
})

module.exports = MeetingData = new mongoose.model('meetingData', MeetingDataSchema );
