const express = require('express');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { User, validateUser } = require('../models/users');

//GET ALL USERS
router.get('/', [auth, admin], async (req, res) => {
    try {
        const users = await User.find().sort({'username': 1});
        
        if(!users.length)
            return res.status(404).json('There are currently no registered users for this application');
    
        res.status(200).json(users);
    }
    catch(err) { next(err); }
});

//GET CURRENTLY LOGGED IN USER
router.get('/me', auth, async (req, res) => {
    
    try {
        const user = await User.findById({ _id: req.user._id }).select('-password');
        
        if(!user)
            return res.status(404).json('User with the given ID was not found');
        
        res.status(200).json(user);
    }
    catch(err) { 
        next(err);
    }
});

//REGISTER A USER
router.post('/', async (req, res) => {

    const { error } = validateUser(req.body);

    if (error)
        return res.status(400).json(error.details[0].message);
        
    const { username, password, repeat_password } = req.body;
    try {
        let user = await User.findOne({ username });
        
        //check if username exists
        if (user)
            return res.status(400).json("Username already exists");
        
        //check if passwords match
        if (password !== repeat_password)
            res.status(400).json("Passwords don't match");
    
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        
        //create document and save
		user = new User( {username, password:hash} )
        await user.save();
        
        //generate JWT 
        const token = user.generateAuthToken();

        //return token in HTTP header
        res.header('x-auth-token', token);
        res.status(200).json(_.pick(user, ['_id', 'username']));
    }
    catch(err) { next(err); }

});

//UPDATE USER
router.put('/:id', auth, async (req,res) => {

    const { error } = validateUser(req.body);

    if(error)
        return res.status(400).json(error.details[0].message);
    
    try {
        const { username, password } = req.body;

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await User.findByIdAndUpdate(req.params.id, {
            $set: { username, password:hash }
        }, { new: true } );

        if(!user) 
            return res.status(404).json('User with the given ID was not found');

        res.status(200).json(user);
    }
    catch(err) { 
        next(err); 
    }
});

//DELETE USER
router.delete('/:id', [auth, admin], async (req, res) => {
    
    try {
        const result = await User.deleteOne({_id: req.params.id });
        
        if(!result.n)
            return res.status(404).json('User with the given ID was not found');
        
        res.status(200).json(result);
        
    }
    catch(err) {     
        next(err);
    }

});

module.exports = router;