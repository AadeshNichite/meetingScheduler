const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check ,validationResult } = require('express-validator');
let meetingInfo = require('../../models/meetingInfo');

//@route    POST api/meeting
//@desc     Add new meeting , if it is present then push new meeting into array.
//@access   Public
router.post(
    '/',
    [
        auth,
            [
            check('date','Please Enter a valid date')
            ]
    ],
    async(req, res) => {
    let errors = validationResult(req);
    console.log("here");
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }    

    const{meetingPeople,date,strating,endTime,meetingNo,meetingTitle}=req.body;


    //Build profile object
    const meetingFields = {};
    meetingFields.meetingNo = req.user.id;

    //Build A rationistory Object
    meetingFields.meetings={}
    if(meetingTitle) meetingFields.meetings.meetingTitle = meetingTitle;
    if(date) meetingFields.meetings.date = date;
    if(strating) meetingFields.meetings.strating = strating;
    if(endTime) meetingFields.meetings.endTime = endTime;

    //Build A history Object
    meetingFields.meetings.meetingPeople={}
    if(meetingPeople) meetingFields.meetings.meetingPeople = meetingPeople;

    try{

    //see if meeting exists already
    let meeting = await meetingInfo.findOne({meetingNo:req.user.id});


    if(meeting){
       //update
        // meetingInfo = await meetingInfo.findOneAndUpdate(
        //     { meetingNo: req.user.id },
        //     { $set : {"meeting.meetings":meetingFields.meetings}},
    
        
        meetingInfo = await meetingInfo.findOneAndUpdate(
            { "meetingNo": req.user.id },
            { $push : {"meetings":meetingFields.meetings} },
            { new: true , useFindAndModify: false }
        );

        return res.json(meetingInfo);
    }
    else{

        meeting = new meetingInfo(meetingFields);
        await meeting.save();
        return res.json(meeting);
        
    }

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});




//@route    POST api/meeting/updateMeeting
//@desc     update meeting
//@access   Public
router.post(
    '/updateMeeting',
    [
        auth,
            [
            check('date','Please Enter a valid date')
            ]
    ],
    async(req, res) => {
    let errors = validationResult(req);
    console.log("here");
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }    

    const{meetingPeople,date,strating,endTime,meetingNo,nestedMeetingNo,meetingTitle}=req.body;


    //Build profile object
    const meetingFields = {};
    meetingFields.meetingNo = req.user.id;

    //Build A rationistory Object
    meetingFields.meetings={};
    if(meetingTitle) meetingFields.meetings.meetingTitle = meetingTitle;
    if(date) meetingFields.meetings.date = date;
    if(strating) meetingFields.meetings.strating = strating;
    if(endTime) meetingFields.meetings.endTime = endTime;

    //Build A history Object
    meetingFields.meetings.meetingPeople={}
    if(meetingPeople) meetingFields.meetings.meetingPeople = meetingPeople;

    try{

    //see if meeting exists already
    let meeting = await meetingInfo.findOne({meetingNo:req.user.id});


    if(meeting){
        
       //update
        meetingInfo = await meetingInfo.findOneAndUpdate(
            { meetingNo : req.user.id , 'meeting.meetings.id' : nestedMeetingNo  },
            { $set : {"meetings":meetingFields.meetings}},
            { new: true , useFindAndModify: false }
        );
        return res.json(meetingInfo);
    }
    else{

        meeting = new meetingInfo(meetingFields);
        await meeting.save();
        return res.json(meeting);
        
     }

    }catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }

});

//@route    GET api/meeting
//@desc     Find meet using Token value
//@access   Public
router.get('/',auth, async (req,res) => {
    // console.log(req,res);
    try{
        const user = await Profile.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.log(err.message);
        res.json(500).send("Server error");
    }

});














module.exports = router;
