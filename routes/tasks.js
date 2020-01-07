const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Task, validateTask } = require('../models/tasks');

//GET ALL TASKS FOR AUTH USER
router.get('/', auth, async (req, res, next) => {
    try {
        const tasks = await Task
        .find({createdBy: req.user._id})
        .select('-createdBy')
        .sort({'date': -1});
        
        if(!tasks.length)
            return res.status(404).json('There are no tasks to do');
    
        res.status(200).json(tasks);
    }
    catch(err) { next(err); }
    
});

//GET ONE TASK
router.get('/:id', auth, async (req, res) => {
    
    try {

        const task = await Task.findOne({ _id: req.params.id });
            if(!task)
                return res.status(404).json('Task with the given ID was not found');
        res.status(200).json(task);
    }
    catch(err) {
        next(err);
    }
});

//CREATE TASK FOR AUTH USER
router.post('/', auth, async (req, res) => {

    const { error } = validateTask(req.body);

    if(error)
        return res.status(400).json(error.details[0].message);
    
    //create object with req values
    const { title, description } = req.body;
    const task = new Task({ title, description, createdBy: req.user._id });
    
    //save to db
    try {
        const dbResult = await task.save();
        res.status(200).json(dbResult);
    }
    catch(err) { next(err); }

});

//UPDATE TASK
router.put('/:id', auth, async (req,res) => {

    const { error } = validateTask(req.body);

    if(error)
        return res.status(400).json(error.details[0].message);
    
    try {

        const { title, description } = req.body;
        
        const validTaskId = await Task.findById(req.params.id);

        if(!validTaskId) 
            return res.status(404).json('Task with the given ID was not found');

        console.log(req.user._id);
        const task = await Task.findOneAndUpdate({ 
            _id: req.params.id, 
            createdBy: req.user._id
        }, {
            $set: { title, description }
        }, { new: true } );
        
        if(!task) 
            return res.status(401).json('Access denied. Cannot edit task with given ID.');

        res.status(200).json(task);
    }
    catch(err) {
        next(err);
    }

});

//DELETE TASK
router.delete('/:id', auth, async (req, res) => {
    
    try {
        const result = await Task.deleteOne({_id: req.params.id });
        
        if(!result.n)
            return res.status(404).json('Task with the given ID was not found');
        
        res.status(200).json(result);
        
    }
    catch(err) { 
        next(err); 
    }

});

module.exports = router;