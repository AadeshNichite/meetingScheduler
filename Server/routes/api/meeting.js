const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../../middleware/auth');
const {check ,validationResult } = require('express-validator');
var meetingInfo = require('../../models/meetingInfo');
var meetingModel = mongoose.model('meetingData');
const Profile = require('../../models/profile');
let profileModel = mongoose.model('profile');
let ObjectId = require('mongodb').ObjectId;  

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

        const{start,end,title,id}=req.body;

        //Build profile object
        const meetingFields = {};
        meetingFields.Start = start;
        meetingFields.End = end;
        meetingFields.title = title;
        meetingFields.creatorOfMeeting = req.user.id;

        //Build A rationistory Object
        meetingFields.peopleForThisMeeting=[];

        if(id) meetingFields.peopleForThisMeeting = id.map(data=>{return data._id});
    
        try {

            const meeting = new meetingModel(meetingFields);

            // console.log(meeting)

            const meetingIdInfo = await meeting.save();

            console.log(meetingIdInfo._id);

            //update
            profileInfo = await profileModel.findOneAndUpdate(
                { '_id' : req.user.id },
                { $push : {'meetingsCreatedByHim':meeting._id}},
                { new: true , useFindAndModify: false }
            );

            return res.json({'id':meetingIdInfo._id,'msg':"success"});

        } catch(err){

            res.status(500).send('Server Error');
        }
    }
);


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

    const{start,end,title,id,meetingNumber}=req.body;

    console.log('update meeting api')

    //Build meeting object
    const meetingFields = {};
    meetingFields.Start = start;
    meetingFields.End = end;
    meetingFields.title = title;
    meetingFields.creatorOfMeeting = req.user.id;

    //Build A rationistory Object
    meetingFields.peopleForThisMeeting=[];

    if(id) meetingFields.peopleForThisMeeting = id.map(data=>{return data._id});

    try {

        //see if meeting exists already
        let meeting = await meetingModel.findOneAndUpdate(
            {'_id':meetingNumber},
            { $set : { 
                'Start':meetingFields.Start,
                'End':meetingFields.End,
                'title':meetingFields.title,
                'peopleForThisMeeting':meetingFields.peopleForThisMeeting
            }},
            { new: true , useFindAndModify: false }
        );

        console.log(meeting);

        return res.json({'id':meeting._id,'msg':"success"});


    } catch(err) {
            res.status(500).send('Server Error');
        }
    }
);


//@route    REMOVE api/meeting
//@desc     Remove the meeting which is selected
//@access   public
router.post('/meeting',auth, async (req,res) => {

    try{

       let deleteOne = {'_id':req.body.meetingNumber}
       await Promise.all([meetingModel.deleteOne( deleteOne )] )
       return res.json({msg:"success"});

    } catch(err){

        res.send("Server error");
    }

});


//@route    GET api/meeting
//@desc     Find all meetings using Token value
//@access   public
router.get('/',auth, async (req,res) => {
   
    let id = req.user.id; 
    let o_id = new ObjectId(id);
    console.log(o_id)
    try{
        let meeting = await meetingModel.find({
            'creatorOfMeeting': req.user.id
        });
        // res.json(meeting.meetingsCreatedByHim);
        console.log(meeting);
    } catch(err){
        res.send("Server error");
    }

});

//@route    GET api/meeting
//@desc     Find all meetings using Token value
//@access   public
router.get('/meetingsForMe',auth, async (req,res) => {
   
    let id = req.user.id; 
    let o_id = new ObjectId(id);
  
    try{
        let meeting = await meetingModel.find({
            'peopleForThisMeeting':{$in: [o_id]}
        }).populate('creatorOfMeeting','name').populate('peopleForThisMeeting','name');
        res.json(meeting);
    } catch(err){
        console.log(err)
        res.send("Server error");
    }

});

module.exports = router;
