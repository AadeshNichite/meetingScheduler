const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../../middleware/auth');
const {check ,validationResult } = require('express-validator');
var meetingInfo = require('../../models/meetingInfo');
var meetingModel = mongoose.model('meetingData')

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
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }    

    const{strating,endTime,meetingTitle,meetingNumber}=req.body;

    console.log('update meeting api')
    //Build profile object
    const meetingFields = {};
    meetingFields.meetingNo = req.user.id;

    //Build A rationistory Object
    meetingFields.meetings={};
    if(meetingNumber) meetingFields.meetings.id = meetingNumber;
    if(meetingTitle) meetingFields.meetings.meetingTitle = meetingTitle;
    if(strating) meetingFields.meetings.strating = strating;
    if(endTime) meetingFields.meetings.endTime = endTime;

    try {

        //see if meeting exists already
        let meeting = await meetingModel.findOne({meetingNo:req.user.id});

        if(meeting){

            let meet=meeting.meetings;

            let meetingNoToUpdate = meet.find(meetingNoToUpdate =>{
                return meetingNoToUpdate.id == req.body.meetingNumber;
            }) 

            const index = meet.indexOf(meetingNoToUpdate);

            meet.splice(index,1);

            meet.push(req.body);
            
            meeting.meetings.set(meet);

            //update
            meetingInfo = await meetingModel.findOneAndUpdate(
                { meetingNo : req.user.id },
                { $set : {'meetings':meeting.meetings}},
                { new: true , useFindAndModify: false }
            );

            return res.json(meetingInfo);

        }
        else {

            meeting = new meetingInfo(meetingFields);
            await meeting.save();
            return res.json(meeting);
            
        }

    } catch(err) {
            res.status(500).send('Server Error');
        }
    }
);


//@route    POST api/meeting/add
//@desc     update meeting
//@access   Public
router.post(
    '/add',
    [
        auth,
            [
            check('date','Please Enter a valid date')
            ]
    ],
    async(req, res) => {
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }    

        const{strating,endTime,meetingTitle}=req.body;

        //Build profile object
        const meetingFields = {};
        meetingFields.meetingNo = req.user.id;

        //Build A rationistory Object
        meetingFields.meetings={};
        if(meetingTitle) meetingFields.meetings.meetingTitle = meetingTitle;
        if(strating) meetingFields.meetings.strating = strating;
        if(endTime) meetingFields.meetings.endTime = endTime;

        try {

            //see if meeting exists already
            let meeting = await meetingModel.findOne({meetingNo:req.user.id});

            if(meeting) {
                
            //update
                meetingInfo = await meetingModel.findOneAndUpdate(
                    { meetingNo : req.user.id },
                    { $push : {"meetings":meetingFields.meetings}},
                    { new: true , useFindAndModify: false }
                );
                return res.json(meetingInfo);
            }
            else {

                meeting = new meetingModel(meetingFields);
                await meeting.save();
                return res.json(meeting);
                
            }

        } catch(err){
            res.status(500).send('Server Error');
        }
    }
);


//@route    REMOVE api/meeting
//@desc     Remove the meeting which is selected
//@access   public
router.post('/meeting',auth, async (req,res) => {

    try{

        let meeting = await meetingModel.findOne (            
             {'meetingNo':req.user.id}
        );
         
        let meet=meeting.meetings;

        let meetingNumberToDelete = meet.find(meetingNumberToDelete =>{
            return meetingNumberToDelete.id == req.body.meetingNumber
        }) 

        console.log(meetingNumberToDelete);
        // const index = meet.indexOf(meetingNumberToDelete);

        const index = meet.indexOf(meetingNumberToDelete);
        if (index > -1) {
            meet.splice(index, 1);
        }

        //update
        meetingInfo = await meetingModel.findOneAndUpdate(
            { meetingNo : req.user.id },
            { $set : {"meetings":meet}},
            { new: true , useFindAndModify: false }
        );

        return res.json(meetingInfo);

    } catch(err){

        res.send("Server error");
    }

});


//@route    GET api/meeting
//@desc     Find all meetings using Token value
//@access   public
router.get('/',auth, async (req,res) => {
   
    try{
        let meeting = await meetingModel.findOne({"meetingNo":req.user.id});
        res.json(meeting.meetings);
    } catch(err){
        res.send("Server error");
    }

});


module.exports = router;
