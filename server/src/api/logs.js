const { Router } = require('express');

const LogEntry = require('../models/logEntry');

const router = Router();

router.get('/', async (req, res) => {
    try{
        const entries = await LogEntry.find();
        res.json(entries);   
    } 
    catch(err){
        if(err.name === "ValidationError"){
            res.status(422);
        }
        next(err);
    }
        
});

router.post('/',async (req, res, next) => {
    try {
        const logEntry = new LogEntry(req.body);
        const createdEntry = await logEntry.save();
        res.json(createdEntry);
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;