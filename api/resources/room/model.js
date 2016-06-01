const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    dateCreated : { type:Date, default:Date.now },
    name        : String,
    isPrivate   : Boolean,
    password    : String

});

mongoose.model('Room', schema);