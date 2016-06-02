const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    dateCreated : { type:Date, default:Date.now },
    room: { type:String, ref:'Room' },
    account : { type:String, ref:'Account' },
    message : { type:String, ref:'Message' },
    seen : { type:Boolean, default:false }

});

mongoose.model('Notification', schema);