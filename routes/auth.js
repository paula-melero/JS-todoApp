require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const Joi = require('joi');
const router = express.Router();
const { User } = require('../models/users');

function validate(req) {
    const schema = {
        username: Joi.string().min(3).max(30).required(),
        password: Joi.string().min(6).max(255).required(),
    };

    return Joi.validate(req, schema);
}
//GET ALL USERS
router.get('/', async (req, res) => {
    try {
        const users = await User.find().sort({'name': 1});
        
        if(!users.length)
            return res.status(404).json('There are currently no registered users for this application');
    
        res.status(200).json(users);
    }
    catch(err) { res.status(500).json(err.message); }
});

//GET ONE USER
router.get('/:id', async (req, res) => {
    
    try {
        const user = await User.findOne({ _id: req.params.id });
        
        if(!user)
            return res.status(404).json('User with the given ID was not found');
        
        res.status(200).json(user);
    }
    catch(err) { 
        if(err.name === "CastError") 
           err.message = "Invalid ID.";

        res.status(400).json(err.message);
    }
});

//LOGIN A USER
router.post('/', async (req, res) => {

    const { error } = validate(req.body);

    if (error)
        return res.status(400).json(error.details[0].message);
        
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });
        
        if (!user)
            return res.status(400).json("Invalid username or password");
        
        //password check
        const validPwd = await bcrypt.compare(password, user.password);
        
        if (!validPwd)
            return res.status(400).json("Invalid username or password");
  
        //generate JWT 
        const token = user.generateAuthToken();

        //return token in HTTP header
        res.header('x-auth-token', token);
        res.send(_.pick(user, ['_id', 'username']));
    }
    catch(err) { res.status(500).json(err.message) }

});

//UPDATE USER
router.put('/:id', async (req,res) => {

    const { error } = validate(req.body);

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
        
        if(err.name === "CastError") 
            err.message = "Invalid ID.";
        
        res.status(500).json(err.message); 
    }
});

//DELETE USER
router.delete('/:id', async (req, res) => {
    
    try {
        const result = await User.deleteOne({_id: req.params.id });
        
        if(!result.n)
            return res.status(404).json('User with the given ID was not found');
        
        res.status(200).json(result);
        
    }
    catch(err) { 
        
        if(err.name === "CastError") 
            err.message = "Invalid ID.";

        res.status(500).json(err.message); 
    }

});

module.exports = router;