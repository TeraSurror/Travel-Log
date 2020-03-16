const mongoose = require('mongoose');

const {Schema} = mongoose;

const logEntrySchema = new Schema({
    title : {
        type : String,
        required : true
    },
    description : String, 
    comments : String,
    rating :  {
        type : Number,
        min : 0,
        max : 10,
        default : 0
    },
    image : String,
    latitude : {
        type : Number,
        required : true,
    },
    longitude : {
        type : Number,
        required : true,  
    },
    visitDate: {
        required : true,
        type : Date
    }
},{
    timestamps: true,
});

const LogEntry = mongoose.model('LogEntry', logEntrySchema);


module.exports = LogEntry;