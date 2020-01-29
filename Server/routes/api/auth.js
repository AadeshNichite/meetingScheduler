const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check ,validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config =require('config');
const bcrypt =require('bcryptjs');
const Profile = require('../../models/profile');

//@route    GET api/auth
//@desc     Find profile using Token value
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

//@route    POST api/auth
//@desc     Authenticate user & get token
//@access   Public
router.post(
    '/', 
    [
        check('email','Please Enter a valid name').not().isEmpty(),
        check('password','Password is required').exists(),
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }    
        const{email, password}=req.body;
        console.log(req.body);
        console.log(email);
        try{
            //see if user exists
            let user = await Profile.findOne({email});

            if(!user){
                return res
                .status(400)
                .json({ errors : [{msg :'Invalid Credentials'}]})
            }

            const isMatch = await bcrypt.compare(password,user.password);
            console.log("here")
            if(!isMatch)
            {
                return res
                .status(400)
                .json({ errors : [{msg :'Invalid Credentials'}]})
            }

            //Return jsonwebtoken
            const payload ={
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtsecret'),
                {expiresIn: 3600},
                (err,token) =>{
                    if(err) throw  err;
                    res.json({token,error:false})
                } 
            )

        } catch(err) {
            console.error(err.message);
            res.status(500).json({message:'Server Error',error:true});
        }
    }
);

module.exports = router;