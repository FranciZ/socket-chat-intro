const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    dateCreated : { type:Date, default:Date.now },
    content     : String,
    room        : { type: String, ref:'Room'},
    type        : String

});

mongoose.model('Message', schema);